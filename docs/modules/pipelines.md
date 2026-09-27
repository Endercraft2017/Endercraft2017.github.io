# Pipelines

## Inquiry (lead capture)

- **Trigger**: visitor submits a form on `/contact`, `/small-business` or `/students`
  (E-Z "early access" CTAs on `/products` lead to `/contact`).
- **Stages**
  1. Page form (browser): client-side required-field check (`script.js`).
  2. Inquiry intake (`api/contact.js`): method guard → honeypot → rate limit
     (`lib/ratelimit.js`) → validation by `lead_type` → optional AI triage (business only)
     → email via Resend.
- **Data**: form fields as JSON (`lead_type`, `lead_source`, contact + project fields).
  Nothing is stored; the email is the only record.
- **Branches**: `lead_type` business vs. student; AI triage on or off (fail-open);
  JS vs. no-JS response.
- **Terminal states**: sent (200 / 303 `?sent=1`); rejected, meaning invalid (422),
  rate-limited (429) or honeypot (silent 200); send failure (5xx / 303 `?error=1`) with
  "email us directly" fallback.

## E-Z early access (planned)

- **Trigger**: visitor wants E-Z for their team.
- **Today**: routed through the Inquiry pipeline above, with no product-specific tagging.
- **Planned**: a dedicated `lead_source` (e.g. `ez_products_page`) or waitlist form that
  enters stage 2 of the Inquiry pipeline rather than bypassing it.
