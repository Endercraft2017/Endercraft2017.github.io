/**
 * POST /api/contact  — AFK³ Solutions inquiry handler (Vercel Serverless Function).
 *
 * Handles two inquiry shapes, selected by a `lead_type` field the form sends
 * ("business" — the default, used by contact.html and small-business.html —
 * or "student", used by students.html). Both branches share the same
 * honeypot, rate limit and SendFox send step; they differ in which fields are
 * required and how the email is written up. `lead_source` (e.g.
 * "small_business_landing_page", "student_landing_page") is included in the
 * email when present, for filtering by origin page.
 *
 * Emails the submission via SendFox. Optionally adds an AI triage block via the
 * Vercel AI Gateway when configured (business inquiries only). Fails open: if
 * AI is unavailable the email still sends; if email isn't configured it
 * returns a clear error.
 *
 * Environment variables — set on the existing Railway service,
 * never in this repo:
 *   SENDFOX_API_KEY              SendFox API key (https://sendfox.com/developer/docs/)          [required]
 *   INQUIRY_TO                  Where inquiries land       e.g. contact@afkcube.com   [optional]
 *   INQUIRY_FROM                Verified sender e.g. "AFK3 Website <inbox@afkcube.com>"
 *                               (use "onboarding@sendfoxmail.com" until a domain is verified) [optional]
 *   AI_GATEWAY_API_KEY          Vercel AI Gateway key — enables the AI triage block   [optional]
 *   AI_MODEL                    Gateway model slug (default "openai/gpt-4o-mini")     [optional]
 *   UPSTASH_REDIS_REST_URL  + UPSTASH_REDIS_REST_TOKEN                                [recommended]
 *   (or KV_REST_API_URL     + KV_REST_API_TOKEN)  — enables per-IP rate limiting
 */

import { checkRateLimit } from "../lib/ratelimit.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_SHORT = 300;   // single-line fields
const MAX_LONG = 5000;   // problem / today

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

function clip(value, max) {
  return String(value == null ? "" : value).trim().slice(0, max);
}

function readBody(req) {
  // Vercel parses application/json and form-encoded bodies into req.body.
  var body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  return body && typeof body === "object" ? body : {};
}

/** Sends one inquiry email via the SendFox REST API. Returns { ok }. */
async function sendInquiryEmail(apiKey, { to, from, subject, text, html, replyTo }) {
  const payload = { from: from, to: [to], subject: subject, text: text, html: html };
  if (replyTo) payload.reply_to = replyTo;
  try {
    const resp = await fetch("https://api.sendfox.com/transactional/emails", {
      method: "POST",
      signal: AbortSignal.timeout(10000),
      headers: { Authorization: "Bearer " + apiKey, "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!resp.ok) {
      // Do not log provider response bodies: they may contain inquiry data.
      console.error("SendFox request rejected", resp.status);
      return { ok: false };
    }
    const queued = await resp.json();
    return { ok: typeof queued.id === "string" && queued.id.length > 0 && queued.status === "queued" };
  } catch (err) {
    console.error("Contact email request failed");
    return { ok: false };
  }
}

/**
 * Ask the model to triage the inquiry. Returns a short string, or null if the
 * gateway isn't configured or the call fails/times out. Never throws.
 */
async function aiTriage(fields) {
  if (!process.env.AI_GATEWAY_API_KEY) return null;
  // Any slug from your AI Gateway model list works here.
  const model = process.env.AI_MODEL || "openai/gpt-4o-mini";
  try {
    const { generateText } = await import("ai");
    const { text } = await generateText({
      model: model,
      maxRetries: 0,
      abortSignal: AbortSignal.timeout(5000),
      system:
        "You triage inbound B2B project inquiries for a software, automation and " +
        "managed-operations studio. Reply with exactly these four lines, nothing else:\n" +
        "Category: <Custom Software | Automation & AI | Managed Operations | MVP | Unclear>\n" +
        "Urgency: <low | medium | high>\n" +
        "Summary: <one sentence>\n" +
        "Suggested next step: <one sentence>",
      prompt: [
        "Company: " + fields.company,
        "Country: " + (fields.country || "—"),
        "Needs selected: " + (fields.need.length ? fields.need.join(", ") : "—"),
        "Timeline: " + (fields.timeline || "—"),
        "Budget: " + (fields.budget || "—"),
        "Problem: " + fields.problem,
        "How they handle it today: " + (fields.today || "—")
      ].join("\n")
    });
    return (text || "").trim() || null;
  } catch (err) {
    console.error("AI triage skipped:", err && err.message ? err.message : err);
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const body = readBody(req);
  const wantsJson = String(req.headers["accept"] || "").indexOf("application/json") !== -1
    || String(req.headers["content-type"] || "").indexOf("application/json") !== -1;

  const done = (status, payload) => {
    if (wantsJson) return res.status(status).json(payload);
    const ok = status >= 200 && status < 300;
    res.setHeader("Location", ok ? "/contact?sent=1" : "/contact?error=1");
    return res.status(303).end();
  };

  // Honeypot — real users never fill this hidden field. Drop silently, don't spend
  // rate-limit budget on obvious bots.
  if (body.company_url) return done(200, { ok: true });

  // Per-IP rate limit (fail-open if Upstash Redis isn't configured). Guards both
  // the AI call and the SendFox send below.
  const rl = await checkRateLimit(req, "contact");
  if (!rl.ok) {
    if (rl.reset) {
      res.setHeader("Retry-After", Math.max(1, Math.ceil((rl.reset - Date.now()) / 1000)));
    }
    return done(429, {
      error: "Too many attempts. Please wait a few minutes and try again, or email contact@afkcube.com."
    });
  }

  // lead_type selects the inquiry shape. Defaults to "business" so the
  // original contact.html — which never sends this field — is unaffected.
  const leadType = clip(body.lead_type, MAX_SHORT) === "student" ? "student" : "business";
  let rawLeadSource = String(body.lead_source || '').trim();
  // A normal no-JS form still carries source codes in its same-origin Referer.
  if (rawLeadSource === 'contact_page' && req.headers.referer) {
    try {
      const referer = new URL(req.headers.referer);
      if (referer.origin === 'https://afkcube.com') {
        const source = {};
        for (const [key, short] of Object.entries({utm_source:'s',utm_medium:'m',utm_campaign:'c',ref:'r'})) {
          if (referer.searchParams.has(key)) source[short] = referer.searchParams.get(key);
        }
        if (Object.keys(source).length) { source.i = ['workflow','otom','referral'].includes(body.intent) ? body.intent : 'workflow'; rawLeadSource = JSON.stringify(source); }
      }
    } catch (_) { /* Keep the form's own source when no trusted page is available. */ }
  }
  if (rawLeadSource.length > MAX_SHORT) return done(422, { error: "Campaign details are too long." });
  if (rawLeadSource.startsWith('{')) {
    try {
      const source = JSON.parse(rawLeadSource);
      if (!source || Array.isArray(source) || typeof source !== 'object' || Object.keys(source).some(k => !['s','m','c','r','i'].includes(k) || typeof source[k] !== 'string' || !/^[A-Za-z0-9_-]{1,40}$/.test(source[k]))) throw new Error();
    } catch (_) { return done(422, { error: "Campaign details are invalid. Please check the source link." }); }
  }
  const leadSource = rawLeadSource;

  const name = clip(body.name, MAX_SHORT);
  const email = clip(body.email, MAX_SHORT);

  const apiKey = process.env.SENDFOX_API_KEY;
  const to = process.env.INQUIRY_TO || "contact@afkcube.com";
  const from = process.env.INQUIRY_FROM || "AFK3 Website <onboarding@sendfoxmail.com>";

  if (leadType === "student") {
    const school = clip(body.school, MAX_SHORT);
    const course = clip(body.course, MAX_SHORT);
    const projectType = clip(body.project_type, MAX_SHORT);
    const projectTitle = clip(body.project_title, MAX_SHORT);
    const projectStage = clip(body.project_stage, MAX_SHORT);
    const help = clip(body.help, MAX_LONG);
    const deadline = clip(body.deadline, MAX_SHORT);
    const description = clip(body.description, MAX_LONG);

    const missing = [];
    if (!name) missing.push("name");
    if (!email) missing.push("email");
    if (!projectType) missing.push("project_type");
    if (!help) missing.push("help");
    if (!description) missing.push("description");
    if (missing.length) {
      return done(422, { error: "Some required fields are missing.", fields: missing });
    }
    if (!apiKey) {
      return done(500, { error: "Email isn't configured on the server yet." });
    }

    const rows = [
      ["Name", name],
      ["Email / contact", email],
      ["School / university", school],
      ["Course / program", course],
      ["Project type", projectType],
      ["Project title / idea", projectTitle],
      ["Current stage", projectStage],
      ["What help is needed", help],
      ["Target deadline", deadline],
      ["Project description", description],
      ["Lead source", leadSource]
    ].filter(function (r) { return r[1] && String(r[1]).trim(); });

    const text = rows.map(function (r) { return r[0] + ": " + r[1]; }).join("\n");
    const html =
      '<h2 style="font-family:system-ui,sans-serif">New student project inquiry</h2>' +
      '<table style="font-family:system-ui,sans-serif;font-size:14px;border-collapse:collapse">' +
      rows.map(function (r) {
        return '<tr>' +
          '<td style="padding:4px 14px 4px 0;color:#666;vertical-align:top"><strong>' + escapeHtml(r[0]) + '</strong></td>' +
          '<td style="padding:4px 0;white-space:pre-wrap">' + escapeHtml(r[1]) + '</td></tr>';
      }).join("") +
      '</table>';

    // The "Email / Contact" field may hold a phone number, not an address —
    // only offer it as a reply-to header when it actually looks like an email.
    const replyTo = EMAIL_RE.test(email) ? email : undefined;

    const sent = await sendInquiryEmail(apiKey, {
      to: to, from: from, subject: "Student project inquiry — " + name, text: text, html: html, replyTo: replyTo
    });
    if (!sent.ok) {
      return done(502, { error: "Couldn't send the email right now. Please try again later." });
    }
    return done(200, { ok: true });
  }

  // ---- business inquiry (contact.html, small-business.html) ----
  const intent = ['workflow','otom','referral'].includes(body.intent) ? body.intent : 'workflow';
  if (String(body.acceptance_result || '').length > 500 || String(body.problem || '').length > MAX_LONG) {
    return done(422, { error: "The result or problem description is too long. Your message has not been sent." });
  }
  const acceptanceResult = clip(body.acceptance_result, 500);
  const company = clip(body.company, MAX_SHORT);
  const problem = clip(body.problem, MAX_LONG);
  const website = clip(body.website, MAX_SHORT);
  const country = clip(body.country, MAX_SHORT);
  const today = clip(body.today, MAX_LONG);
  const timeline = clip(body.timeline, MAX_SHORT);
  const budget = clip(body.budget, MAX_SHORT);
  const need = (Array.isArray(body.need) ? body.need : (body.need ? [body.need] : []))
    .slice(0, 12).map(function (v) { return clip(v, MAX_SHORT); }).filter(Boolean);

  const missing = [];
  if (!name) missing.push("name");
  if (!EMAIL_RE.test(email)) missing.push("email");
  if (!company) missing.push("company");
  if (!problem) missing.push("problem");
  if (missing.length) {
    return done(422, { error: "Some required fields are missing or invalid.", fields: missing });
  }
  if (!apiKey) {
    return done(500, { error: "Email isn't configured on the server yet." });
  }

  // Hard ceiling: never let AI delay the email past ~6s, whatever the SDK does.
  const triage = await Promise.race([
    aiTriage({ company, country, need, problem, today, timeline, budget }),
    new Promise(function (resolve) { setTimeout(function () { resolve(null); }, 6000); })
  ]).catch(function () { return null; });

  const rows = [
    ["Name", name],
    ["Business email", email],
    ["Company", company],
    ["Inquiry type", intent],
    ["Acceptance result", acceptanceResult],
    ["Website", website],
    ["Country", country],
    ["Needs", need.join(", ")],
    ["Problem", problem],
    ["How they handle it today", today],
    ["Target timeline", timeline],
    ["Approximate budget", budget],
    ["Lead source", leadSource]
  ].filter(function (r) { return r[1] && String(r[1]).trim(); });

  let text = rows.map(function (r) { return r[0] + ": " + r[1]; }).join("\n");
  let html =
    '<h2 style="font-family:system-ui,sans-serif">New project inquiry</h2>' +
    '<table style="font-family:system-ui,sans-serif;font-size:14px;border-collapse:collapse">' +
    rows.map(function (r) {
      return '<tr>' +
        '<td style="padding:4px 14px 4px 0;color:#666;vertical-align:top"><strong>' + escapeHtml(r[0]) + '</strong></td>' +
        '<td style="padding:4px 0;white-space:pre-wrap">' + escapeHtml(r[1]) + '</td></tr>';
    }).join("") +
    '</table>';

  if (triage) {
    text += "\n\n— AI triage —\n" + triage;
    html += '<h3 style="font-family:system-ui,sans-serif;margin:18px 0 4px">AI triage</h3>' +
      '<pre style="font-family:ui-monospace,monospace;font-size:13px;white-space:pre-wrap;background:#f6f8fa;padding:10px 12px;border-radius:6px">' +
      escapeHtml(triage) + '</pre>';
  }

  const sent = await sendInquiryEmail(apiKey, {
    to: to, from: from, subject: "Project inquiry — " + company, text: text, html: html, replyTo: email
  });
  if (!sent.ok) {
    return done(502, { error: "Couldn't send the email right now. Please try again later." });
  }
  return done(200, { ok: true });
}
