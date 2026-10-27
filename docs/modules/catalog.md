# Module catalog

Inventory of the AFK³ Solutions website as it exists today. It is a static
marketing site, so most "modules" are small; boundaries below are descriptive,
not a refactor plan.

| Module | Responsibility | Status | Files |
| --- | --- | --- | --- |
| Marketing pages | Public content: home, services hub + 3 service pages, how we work, work, about, legal, 404 | working | `*.html`, `style.css`, `script.js`, `assets/` |
| Product showcase | Hub listing AFK³'s own software products, plus one detail page per product. First product: **E-Z** (project-management SaaS; in development) | partial (marketing only, no signup flow) | `products.html` (hub, `.products`/`.product-card*` CSS), `products/e-z.html` (`.ez-*`/`.ezapp*` CSS), `assets/ez-logo.*`, E-Z promo in `services.html` |
| Campaign landing pages | Single-audience pages with their own inquiry forms | working | `small-business.html`, `students.html` |
| Inquiry intake | Validate, triage (optional AI), and email contact-form submissions | working | `api/contact.js`, form handling in `script.js` |
| Rate limiting | Per-IP limit on the inquiry endpoint (Upstash, fail-open) | working | `lib/ratelimit.js` |
| Hosting adapter | Serves the site on non-Vercel hosts (Railway): clean URLs, headers, routes `/api/contact` to the Vercel-style handler | working | `server.js` (Vercel uses `vercel.json` instead) |
| SEO | Meta/OG tags, JSON-LD, sitemap, robots | working | page `<head>`s, `sitemap.xml`, `sitemap.xsl`, `robots.txt` |

## Connections

- **Marketing / Product / Landing pages → Inquiry intake**: HTML form POST (JSON from
  `script.js`, or form-encoded without JS) to `/api/contact`. `api/contact.js` validates
  and owns the email send. Failure: 4xx/5xx JSON shown inline; no-JS gets a 303 to
  `/contact?sent=1` or `?error=1`. No retries; duplicates limited by the rate limiter.
- **Inquiry intake → Rate limiting**: direct call `checkRateLimit(key, ip)`; fail-open.
- **Hosting adapter**: also 308-redirects mixed-case paths to lowercase when the lowercase
  page exists (e.g. `/products/E-Z` → `/products/e-z`); `vercel.json` has the same redirect.
- **Hosting adapter → Inquiry intake**: direct call to the default export with Vercel-style
  `req.body` / `res.status().json()` shims. The handler is unchanged across hosts.

## Acquisition update October 2026

Product showcase now includes `/products/otom` alongside the unchanged E-Z identity.
The new `/referrals` page describes a proposed optional referral route, with no signed
terms or employment offer. `assets/lead-context.js` handles bounded, non-personal
campaign/referral codes and the first valid source within a session. Contact intake
accepts an explicit inquiry intent and optional acceptance result; structured source
values are validated before provider use. UI/API tests use synthetic data and a local
provider stub. Mailbox receipt, hosted visuals and customer comprehension remain pending.

## Visual hierarchy and motion refinement

`assets/design-polish.css` styles the home, services and products pages without changing
intake contracts. The homepage adds an authored delivery-approach schematic, preserves
equal buying-route cards, and gives OTOM/E-Z distinct product identities and conceptual
workflow strips. These diagrams are marketing illustrations, not product screenshots.

`assets/site-motion.js` uses native Web Animations and IntersectionObserver for once-only
transform/opacity entrances. All content is visible before JavaScript runs. Reduced-motion
preference changes cancel active animation, focus cancels motion on the focused card,
and hidden tabs cancel active motion. The homepage capability rail and background paths
are static instead of continuously moving. No runtime dependency was installed.

Reference review: Motion's inView/performance examples and MDN's Web Animations API,
IntersectionObserver and prefers-reduced-motion guidance. The implementation is authored
native browser code rather than vendored animation presets. Local Chromium checks passed
home/products/services at1440/390 with no axe violations, overflow or JS exceptions;
mobile navigation, no-JS routes and runtime reduced-motion cancellation were checked.
These results do not establish Railway-hosted behavior or buyer conversion.
