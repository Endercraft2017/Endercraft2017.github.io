# AFK³ Solutions — Website

Marketing site for **AFK³ Solutions — Automated Flow Kinetics**.
Plain HTML / CSS / JS, plus one Vercel serverless function for the contact form.
No build step.

> Helping businesses operate while you're AFK.

Built to the brief in [`AFK3_Website_Design_and_Build_Spec_V1.md`](AFK3_Website_Design_and_Build_Spec_V1.md).

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — hero, positioning strip, service overview, why AFK³, CTA |
| `services.html` | Services hub — three service-world cards linking out, FAQ |
| `custom-software.html` | Custom software service page — capabilities, solutions bento, MVP |
| `automation-ai.html` | Automation & AI service page — capabilities, before/after, why-automate |
| `managed-operations.html` | Managed operations service page — capabilities, engagement-model steps |
| `how-we-work.html` | The growth problem, the AFK³ model, the six-step delivery process |
| `work.html` | Selected work — client work vs. founder/team experience |
| `about.html` | The people behind the systems, how we operate, technology |
| `contact.html` | Project inquiry form (posts to `/api/contact`) |
| `small-business.html` | Landing page for SME traffic (ads, social, outreach) — same inquiry form, tagged `lead_type=business` / `lead_source=small_business_landing_page` |
| `students.html` | Landing page for student traffic — lightweight inquiry form (no company field), tagged `lead_type=student` / `lead_source=student_landing_page` |
| `privacy.html` / `terms.html` | Legal starter templates — have these reviewed |
| `404.html` | "This workflow went off-path" page (Vercel serves it automatically) |
| `api/contact.js` | Serverless function: rate-limit → validate → AI triage → email via Resend. Branches on `lead_type` (`business` default, or `student`) so one function backs all three inquiry forms |
| `lib/ratelimit.js` | Per-IP rate limiter (Upstash Redis, fail-open) |
| `scripts/ai-demo.mjs` | `npm run ai:demo` — checks the AI Gateway works |
| `style.css` / `script.js` | Shared across every page |
| `assets/` | `afk-mark.svg`, `favicon.svg`, `og-image.svg` (source), `og-image.png` (rendered, used by `og:image`) |
| `.env.example` | Shape of every env var, with blank values (safe to commit) |

Nav: **Services · How We Work · Work · About** + a **Discuss a Project** button (→ `/contact`).

---

# Setup

The site is static and needs **no build**. The one serverless function (`api/contact.js`)
works with **zero configuration** — it just returns a friendly "email us directly" message
until you add the environment variables below. Each variable unlocks one feature.

## Environment variables

Set these in **Vercel → your project → Settings → Environment Variables** (and, for
`vercel dev`, in a local `.env.local` — gitignored). Never commit real values.

| Variable | Unlocks | Priority | Where it comes from |
| --- | --- | --- | --- |
| `RESEND_API_KEY` | Sending the inquiry email | **Required** — form is inert without it | [resend.com](https://resend.com) → API Keys |
| `INQUIRY_TO` | Which inbox receives inquiries | Recommended (default `contact@afkcube.com`) | your address |
| `INQUIRY_FROM` | The `From:` line | Recommended | must sit on a domain **verified in Resend**; use `onboarding@resend.dev` to start |
| `AI_GATEWAY_API_KEY` | AI triage block appended to the email | Optional | Vercel → **AI Gateway → API Keys** |
| `AI_MODEL` | Which model triages | Optional (default `openai/gpt-4o-mini`) | any slug from the AI Gateway model list |
| `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` | Per-IP rate limiting on the form | Recommended for production | Vercel Marketplace → **Upstash for Redis** (auto-adds them) |

After changing env vars, **redeploy** (or `vercel env pull` + restart `vercel dev`).

## 1. Deploy to Vercel

1. The repo is already on GitHub.
2. Vercel → **Add New… → Project → Import** this repo. Framework preset **Other**, no build
   command, output directory = repo root. Deploy.
3. Every push to the default branch redeploys automatically. Your code stays on GitHub.

## 2. Email — Resend (required)

1. Create a [Resend](https://resend.com) account.
2. **Domains** → add `afkcube.com` and complete the DNS records it gives you. This is what
   makes mail actually land in inboxes. (Skip for now by sending from `onboarding@resend.dev`.)
3. **API Keys** → create one (`re_…`).
4. Set `RESEND_API_KEY`, `INQUIRY_TO`, `INQUIRY_FROM` (see the table). Redeploy.
5. Submit the form on `/contact` — you should get the email, with the visitor's address as
   `Reply-To`.

The form degrades without JavaScript (plain POST → the function 303-redirects to
`/contact?sent=1`). A hidden honeypot field (`company_url`) silently drops bots.

## 3. AI triage (optional)

When `AI_GATEWAY_API_KEY` is set, the function calls the
[Vercel AI Gateway](https://vercel.com/docs/ai-gateway) (via the `ai` SDK) and appends this
to the email you receive:

```
— AI triage —
Category: Automation & AI
Urgency: medium
Summary: <one sentence>
Suggested next step: <one sentence>
```

1. Vercel → **AI Gateway → API Keys** → create a key.
2. Set `AI_GATEWAY_API_KEY`. Leave `AI_MODEL` unset to use `openai/gpt-4o-mini`, or set it to
   another slug from the model list.
3. To bill **your own OpenAI account** instead of Vercel, add your OpenAI key as a provider
   credential **in the AI Gateway dashboard** — never in this repo.
4. Check it locally: put the key in `.env.local` and run `npm run ai:demo`.

Safety: it's time-boxed (`maxRetries: 0`, 5 s abort, 6 s hard ceiling) and fails open — any
error/timeout and the email still sends, just without the triage block. It only runs inside
`/api/contact`, never as a public endpoint.

## 4. Rate limiting (recommended)

`/api/contact` is limited to **5 requests per 10 minutes per IP** — this covers both the AI
call and the email send, so it caps spend and abuse. Over the limit → HTTP `429` and the form
shows "Too many attempts, try again in a few minutes."

1. Vercel → **Storage / Marketplace → Upstash for Redis → Add**. It auto-injects
   `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` (or the `KV_REST_API_*` names —
   both are supported).
2. Redeploy.

Fail-open: if those vars are absent or Redis is unreachable (1.5 s timeout), the form still
works, just unthrottled. To change the window, edit `Ratelimit.slidingWindow(5, "10 m")` in
`lib/ratelimit.js`.

## 5. Run locally

Static pages only (form won't send):

```bash
python -m http.server 8080          # http://localhost:8080
```

Full site incl. `/api/contact`:

```bash
npm install                         # installs ai + @upstash/* used by the function
cp .env.example .env.local          # fill in real values (gitignored)
npm i -g vercel && vercel dev       # http://localhost:3000
```

## 6. Verify

- **Email** — submit `/contact`, check the inbox.
- **AI** — `npm run ai:demo` prints model output.
- **Rate limit** — submit 6× quickly; the 6th returns 429 (needs Upstash configured).

---

## Storing a copy of every submission (not wired up yet)

Right now a submission = one email. If that email is lost or filtered, the lead is gone. To
keep an independent record, pick one and I'll add it as another fail-open step in the function:

| Option | Good for | Setup |
| --- | --- | --- |
| **Google Sheet** (via Apps Script webhook) | eyeballing a list, zero infra, no repo credentials | paste one secret URL |
| **Airtable** | a browsable table with filters/views, free 1k rows | `AIRTABLE_TOKEN` + base/table id |
| **Supabase** (Postgres) | growing this into the actual CRM / client portal later | `SUPABASE_URL` + service key |
| **Vercel Postgres / KV** | staying entirely in-platform | auto env vars |

Recommendation: **Supabase** if this should become the CRM backend; **Airtable** or a
**Google Sheet** if you just want a list you can open and scan.

## Lead scoring — what it is

A single number (or grade) attached to each inquiry so you know who to call first. It's
computed from signals already in the form:

- Budget band, timeline (`ASAP` scores higher than `Exploring`)
- Real business email vs. a free `gmail`/`outlook` address
- Whether the requested services match what AFK³ focuses on
- Country (AU / US are the target markets)
- How detailed the problem description is

Can be **rule-based** (points per signal — deterministic, free, tweakable) or **AI-assisted**
(the triage step already emits a rough `Urgency`; it can also emit `Score: 1–10`). Say which
and I'll add a `Lead score:` line to the triage block.

## Secrets — never in the repo

API keys live only in Vercel env vars (or the AI Gateway dashboard). `.env*` files are gitignored; `.env.example` shows the shape with blank values. If a key is ever pasted into a chat, commit, screenshot or log, **rotate it immediately** (Vercel: Account → Tokens; Resend / OpenAI: their API-keys page).

## Before launch — checklist

1. **Domain** — absolute URLs (canonical, OG, `application/ld+json`, `robots.txt`, `sitemap.xml`) now use `https://afkcube.com`, matching `/CNAME`. If the production domain changes, do a project-wide find/replace of `afkcube.com` and keep `/CNAME` in sync.
2. **Email address** — `contact@afkcube.com` is used site-wide (footers, `contact.html`, the home-page JSON-LD `contactPoint`, `.env.example`, the function default); confirm that inbox exists and set the `INQUIRY_*` env vars to match.
3. ~~**Social image**~~ — done: `assets/og-image.png` (rendered from `og-image.svg` at its real `1200×630` size) is now what `og:image` / `twitter:image` point at on every page.
4. **Social profiles** — once the LinkedIn / X / GitHub company profiles exist, add their URLs as `sameAs` in the home-page JSON-LD `Organization` (and to the footer if social links are added).
5. **Legal** — `privacy.html` / `terms.html` are generic templates; review against Australian Privacy Principles and applicable US state law.
6. **Work section** — only "AFK³ Client Work" cards imply commercial delivery. Keep "Founder & Team Experience" clearly labelled; never add fake metrics, logos or testimonials.
7. **Search consoles** — `sitemap.xml` is submitted in Google Search Console (done 2026-09-22). Still to do: submit to Bing Webmaster Tools, and validate a page in the [Rich Results Test](https://search.google.com/test/rich-results).
8. ~~**Analytics**~~ — done: GA4 `gtag.js` (Measurement ID `G-X6NMH9PFJN`) is wired into every page's `<head>`.

## SEO

Everything is server-render-free static HTML, so it's crawlable as-is.

- **Per page:** a unique `<title>` and `<meta name="description">`, a self-referential `<link rel="canonical">`, and a `robots` directive allowing `max-image-preview:large`. `404.html` is `noindex`.
- **Social:** Open Graph + Twitter card tags on every content page (`og:locale` `en_AU`, `og:image` 1200×630 with alt text), pointing at the rendered `assets/og-image.png`.
- **Structured data** (`application/ld+json`): `Organization` + `WebSite` on the home page, `BreadcrumbList` on every inner page, an `ItemList` of `Service`s plus a `FAQPage` on `services.html`, a standalone `Service` node on each of `custom-software.html` / `automation-ai.html` / `managed-operations.html`, and `AboutPage` / `ContactPage` nodes. Test with Google's [Rich Results Test](https://search.google.com/test/rich-results).
- **Crawl:** `robots.txt` allows everything except `/api/` and points at `sitemap.xml`; `sitemap.xml` lists all public pages with `<lastmod>` — bump those dates when a page's content changes. `.nojekyll` keeps the host from reprocessing the files.
- **Analytics:** GA4 `gtag.js` snippet on every page, Measurement ID `G-X6NMH9PFJN`.

## Accessibility & motion

- Semantic landmarks, skip link, visible focus, labelled fields, keyboard-operable menu and toggles, `aria-current` on the active nav link.
- Everything respects `prefers-reduced-motion: reduce`.
- Entrance animations are gated behind a `.js` class, so all content stays visible if the script fails to load.

## Prettier URLs

`vercel.json` sets `"cleanUrls": true`, so pages serve at `/services` instead of `/services.html` (Vercel 308-redirects any `.html` request to the clean form). Internal links, canonical/og:url tags, structured data, and `sitemap.xml` all use the extensionless paths. Note: local `python -m http.server` won't resolve extensionless paths — use `vercel dev` to preview clean URLs locally.
