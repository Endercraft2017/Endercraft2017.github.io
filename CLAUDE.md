# AFK³ Solutions website

- Module catalog: `docs/modules/catalog.md` · pipeline map: `docs/modules/pipelines.md`
- Stack: static HTML/CSS/JS (no build step) + `api/contact.js` (Vercel-style handler).
- Hosting: Railway via `npm start` → `server.js`; Vercel via `vercel.json`. Keep both
  working. `server.js` mirrors `vercel.json` (clean URLs, headers), so update both together.
- Run locally: `npm install && npm start` → http://localhost:3000
- Internal links are extensionless (`/services`, not `services.html`).
- Header/footer are duplicated in every page. When adding a nav item, update all pages
  (404/privacy/terms use a reduced header without the main nav).
- No automated tests; verify with curl against `npm start` and a headless-Chrome check
  for horizontal overflow at 1440/390.
