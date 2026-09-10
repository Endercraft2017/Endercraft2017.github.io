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
| `services.html` | Three service worlds, software/solutions bento, MVP, before/after |
| `how-we-work.html` | The growth problem, the AFK³ model, the six-step delivery process |
| `work.html` | Selected work — client work vs. founder/team experience |
| `about.html` | The people behind the systems, how we operate, technology |
| `contact.html` | Project inquiry form (posts to `/api/contact`) |
| `privacy.html` / `terms.html` | Legal starter templates — have these reviewed |
| `404.html` | "This workflow went off-path" page (Vercel serves it automatically) |
| `api/contact.js` | Serverless function: rate-limit → validate → AI triage → email via Resend |
| `lib/ratelimit.js` | Per-IP rate limiter (Upstash Redis, fail-open) |
| `scripts/ai-demo.mjs` | `npm run ai:demo` — checks the AI Gateway works |
| `style.css` / `script.js` | Shared across every page |
| `assets/` | `afk-mark.svg`, `favicon.svg`, `og-image.svg` |
| `.env.example` | Shape of every env var, with blank values (safe to commit) |

Nav: **Services · How We Work · Work · About** + a **Discuss a Project** button (→ `contact.html`).

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
| `INQUIRY_TO` | Which inbox receives inquiries | Recommended (default `hello@afk3.solutions`) | your address |
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
2. **Domains** → add `afk3.solutions` and complete the DNS records it gives you. This is what
   makes mail actually land in inboxes. (Skip for now by sending from `onboarding@resend.dev`.)
3. **API Keys** → create one (`re_…`).
4. Set `RESEND_API_KEY`, `INQUIRY_TO`, `INQUIRY_FROM` (see the table). Redeploy.
5. Submit the form on `/contact` — you should get the email, with the visitor's address as
   `Reply-To`.

The form degrades without JavaScript (plain POST → the function 303-redirects to
`/contact.html?sent=1`). A hidden honeypot field (`company_url`) silently drops bots.

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

1. **Domain** — replace every `https://afk3.solutions` URL in the `.html` files (including the `<link rel="canonical">` tags and the `application/ld+json` blocks), `robots.txt` and `sitemap.xml` with the real one.
2. **Email address** — `hello@afk3.solutions` is used as a placeholder throughout; set your real inbox (and the `INQUIRY_*` env vars).
3. **Social image** — `assets/og-image.svg` works and is referenced at its real `1200×630` size; export a matching PNG and point `og:image` / `twitter:image` at it for widest crawler support (many platforms don't render SVG previews).
4. **LinkedIn** — the footer link and the `sameAs` in the home-page JSON-LD both point at `https://www.linkedin.com/`; swap for the company page.
5. **Legal** — `privacy.html` / `terms.html` are generic templates; review against Australian Privacy Principles and applicable US state law.
6. **Work section** — only "AFK³ Client Work" cards imply commercial delivery. Keep "Founder & Team Experience" clearly labelled; never add fake metrics, logos or testimonials.
7. **Search consoles** — after launch, submit `sitemap.xml` in Google Search Console and Bing Webmaster Tools, and validate a page in the [Rich Results Test](https://search.google.com/test/rich-results).

## SEO

Everything is server-render-free static HTML, so it's crawlable as-is.

- **Per page:** a unique `<title>` and `<meta name="description">`, a self-referential `<link rel="canonical">`, and a `robots` directive allowing `max-image-preview:large`. `404.html` is `noindex`.
- **Social:** Open Graph + Twitter card tags on every content page (`og:locale` `en_AU`, `og:image` 1200×630 with alt text). `assets/og-image.svg` — swap for a PNG before launch (checklist #3).
- **Structured data** (`application/ld+json`): `Organization` + `WebSite` on the home page, `BreadcrumbList` on every inner page, an `ItemList` of `Service`s on `services.html`, and `AboutPage` / `ContactPage` nodes. Test with Google's [Rich Results Test](https://search.google.com/test/rich-results).
- **Crawl:** `robots.txt` allows everything except `/api/` and points at `sitemap.xml`; `sitemap.xml` lists all eight public pages with `<lastmod>` — bump those dates when a page's content changes. `.nojekyll` keeps the host from reprocessing the files.

## Accessibility & motion

- Semantic landmarks, skip link, visible focus, labelled fields, keyboard-operable menu and toggles, `aria-current` on the active nav link.
- Everything respects `prefers-reduced-motion: reduce`.
- Entrance animations are gated behind a `.js` class, so all content stays visible if the script fails to load.

## Optional: prettier URLs

Add `"cleanUrls": true` to `vercel.json` to serve `/services` instead of `/services.html` (Vercel redirects the `.html` form). If you do, update the internal links to drop `.html`; note that local `python -m http.server` won't resolve extensionless paths.
