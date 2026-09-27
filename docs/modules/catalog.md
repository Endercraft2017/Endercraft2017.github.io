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
