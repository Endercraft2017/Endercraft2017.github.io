# AFK³ brand discovery experiment, 2 November 2026

## Question and hypothesis

Can a fresh AI search connect AFK³ Solutions, its plain-text spelling AFK3 Solutions, the AFKCube profile name and afkcube.com to the app repair service without receiving a URL?

Hypothesis: clear, visible identity and service associations on existing pages and the public source repository can help disambiguation and discovery. This is an intervention to test, not an established ranking factor or a promised outcome. Multiple changes are shipped together, so later improvement would not isolate the effect of one field.

## Before this intervention

A fresh temporary, Unpersonalized ChatGPT consumer chat was visibly configured to ignore memory, plugins and custom instructions. The displayed model label was Medium; the underlying model version was not exposed.

Exact initial prompt:

> Search the web: What services does AFK³ Solutions offer, and what public evidence supports its AI app repair service?

Observed completed answer: failed to locate the official site, could not verify services, and cited unrelated similarly named entities. The expanded activity panel displayed “Searched 24 websites”; this does not expose the full retrieval candidate set.

Exact follow-up in the same chat:

> Read this official service page directly: https://afkcube.com/ai-app-review-repair . What services and evidence can you verify from the page itself? If you cannot access it, state that limitation rather than inferring its contents.

Observed completed answer: read and cited the service page, correctly described paid diagnosis, separately scoped repairs and optional support, cited the internal attribution repair and public regression tests, and identified the saved-ticket demonstration. It distinguished internal/synthetic work from independently verified customer outcomes.

Interpretation: a brand discovery failure and successful supplied-URL reading in one controlled session. The follow-up is a source-access control, not an independent organic recommendation. Do not combine these two turns with the four unbranded recommendation runs in direct-tests-2026-11-02.json.

## Railway corroboration

Read-only production HTTP log sample, 100 records; timestamps below are UTC (add eight hours for Asia/Manila). The sample is incomplete and is not a crawl-rate report.

- 09:54:12, /robots.txt, HTTP 200, user agent labelled OAI-SearchBot.
- 12:12:01, /ai-app-review-repair, HTTP 200, user agent labelled ChatGPT-User.
- 12:12:18, /services, /work/inquiry-attribution-repair and /work/saved-ticket-repair-demo, HTTP 200, user agent labelled ChatGPT-User.

The latter requests match the direct-URL control's timing and routes. User-agent labels alone are not crawler authentication; source addresses were not checked against published crawler ranges. No source IPs, visitor identifiers, raw inquiry data or credentials are included here. These observations do not establish search indexing, organic discovery or customer visits.

## Intervention

- Homepage title, visible identity and service summary connect AFK³ Solutions, AFKCube and AI app repair.
- About page explicitly explains the existing brand/profile names, official domain and service link.
- Service heading names app review and repair directly and identifies AFK³ Solutions (AFKCube) as the provider.
- Existing Organization/WebSite metadata uses the same organization ID and visible aliases. This supplements readable content; it does not guarantee ranking.
- Public repository README links the company, service and accurately labelled repair evidence. This is self-published evidence, not an independent endorsement.
- Existing canonical URLs, inquiry path, pricing and product-readiness limits are retained. No new landing pages, AI-only files, outreach, paid placements or invented credentials are part of this intervention.

Official guidance used: https://developers.google.com/search/docs/appearance/site-names and https://developers.google.com/search/docs/appearance/structured-data/organization. Google describes these identity signals as helping site-name understanding and organization disambiguation, not as a ChatGPT recommendation guarantee.

## Evaluation and decision rules

Keep the existing eight fixed prompts and their repeat method unchanged. Add this labelled diagnostic control separately; never give URLs or profile links in discovery tests.

1. Implementation gate: production serves the changed pages and identity fields; existing checks pass. This alone is not marketing success.
2. Discovery gate: repeat the branded control in three fresh unpersonalized chats, recording exact output, retrieved/cited URLs where visible and factual accuracy. If all fail, investigate crawl/index coverage and brand search results before adding more generic content.
3. Selection gate: once brand discovery succeeds, rerun the fixed unbranded provider questions and record mentions and recommendations separately.
4. Commercial gate: track genuine attributed visits, inquiries and qualified conversations separately; exclude our own tests.

Use the already scheduled weekly discovery checks. Record last-crawl and reporting dates so old dashboards are not attributed to new changes. A weekly review date is a measurement checkpoint, not an indexing deadline. If branded discovery remains absent at two weekly checkpoints, reassess the hypothesis and external reference coverage; do not keep declaring success or adding pages automatically.

Unresolved: AI search coverage/ranking, reliable unprompted recommendations, independent customer proof, attributable leads and sales. External social profile copy is prepared but profile editing is not exposed by current tools. No directory request has been sent.

Is our website, webapp, or service referenceable? The site and evidence were read successfully when supplied directly. Consistent identity is now the intervention under test; organic discovery and recommendations remain unproven.
