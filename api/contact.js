/**
 * POST /api/contact  — AFK³ Solutions project-inquiry handler (Vercel Serverless Function).
 *
 * Emails the submission via Resend. Optionally adds an AI triage block via the
 * Vercel AI Gateway when configured. Fails open: if AI is unavailable the email
 * still sends; if email isn't configured it returns a clear error.
 *
 * Environment variables — set in Vercel → Settings → Environment Variables,
 * never in this repo:
 *   RESEND_API_KEY              Resend API key (https://resend.com/api-keys)          [required]
 *   INQUIRY_TO                  Where inquiries land       e.g. contact@afkcube.com   [optional]
 *   INQUIRY_FROM                Verified sender e.g. "AFK3 Website <inbox@afk3.solutions>"
 *                               (use "onboarding@resend.dev" until a domain is verified) [optional]
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
    res.setHeader("Location", ok ? "/contact.html?sent=1" : "/contact.html?error=1");
    return res.status(303).end();
  };

  // Honeypot — real users never fill this hidden field. Drop silently, don't spend
  // rate-limit budget on obvious bots.
  if (body.company_url) return done(200, { ok: true });

  // Per-IP rate limit (fail-open if Upstash Redis isn't configured). Guards both
  // the AI call and the Resend send below.
  const rl = await checkRateLimit(req, "contact");
  if (!rl.ok) {
    if (rl.reset) {
      res.setHeader("Retry-After", Math.max(1, Math.ceil((rl.reset - Date.now()) / 1000)));
    }
    return done(429, {
      error: "Too many attempts. Please wait a few minutes and try again, or email contact@afkcube.com."
    });
  }

  const name = clip(body.name, MAX_SHORT);
  const email = clip(body.email, MAX_SHORT);
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

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO || "contact@afkcube.com";
  const from = process.env.INQUIRY_FROM || "AFK3 Website <onboarding@resend.dev>";
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
    ["Website", website],
    ["Country", country],
    ["Needs", need.join(", ")],
    ["Problem", problem],
    ["How they handle it today", today],
    ["Target timeline", timeline],
    ["Approximate budget", budget]
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

  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: from,
        to: [to],
        reply_to: email,
        subject: "Project inquiry — " + company,
        text: text,
        html: html
      })
    });

    if (!resp.ok) {
      const detail = await resp.text();
      console.error("Resend error", resp.status, detail);
      return done(502, { error: "Couldn't send the email right now. Please try again later." });
    }
    return done(200, { ok: true });
  } catch (err) {
    console.error("contact handler error", err);
    return done(502, { error: "Couldn't send the email right now. Please try again later." });
  }
}
