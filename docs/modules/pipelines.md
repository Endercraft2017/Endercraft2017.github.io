# Pipelines

## Inquiry (lead capture)

- **Trigger**: visitor submits a form on `/contact`, `/small-business` or `/students`
  (E-Z "early access" CTAs on `/products/e-z` lead to `/contact`).
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

## Workflow product and referral qualification

Marketing page → services acceptance brief, OTOM readiness, or proposed referral terms
→ contact intent selector → existing inquiry validation/provider adapter. Campaign codes
are bounded and carried in `lead_source`; the optional result is sent as its own email
row. A permitted individual can identify their company as `Independent marketer`.
No public inquiry accepts commission terms, registers a client's consent, creates an
order or pays commission. Kyle handles the next conversation, exact agreement, scope,
invoice and bank reconciliation. Provider acceptance does not prove mailbox receipt.
