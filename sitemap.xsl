<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" doctype-system="about:legacy-compat" encoding="UTF-8" indent="yes" />

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>XML Sitemap — AFK³ Solutions</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="crossorigin" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800&amp;family=Inter:wght@400;500;600&amp;family=JetBrains+Mono:wght@400;500&amp;display=swap" />
        <style>
          :root {
            --bg-primary: #080B12;
            --surface: #111824;
            --surface-raised: #151E2C;
            --border: #212C3D;
            --text-primary: #F5F7FA;
            --text-secondary: #AAB5C4;
            --text-muted: #738094;
            --accent-primary: #36D7FF;
            --accent-blue: #4D7CFE;
            --accent-violet: #8B6CFF;
          }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            background: var(--bg-primary);
            color: var(--text-primary);
            font-family: "Inter", "Segoe UI", system-ui, sans-serif;
            padding: 4vw 1.5rem 5rem;
          }
          .wrap { max-width: 880px; margin: 0 auto; }
          .eyebrow {
            font-family: "JetBrains Mono", ui-monospace, monospace;
            font-size: 0.72rem;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: var(--accent-primary);
            margin: 0 0 0.75rem;
          }
          h1 {
            font-family: "Manrope", "Segoe UI", system-ui, sans-serif;
            font-weight: 800;
            font-size: clamp(1.8rem, 4vw, 2.6rem);
            letter-spacing: -0.02em;
            margin: 0 0 0.75rem;
          }
          .sub {
            color: var(--text-secondary);
            font-size: 0.98rem;
            line-height: 1.6;
            max-width: 640px;
            margin: 0 0 2.25rem;
          }
          .sub strong { color: var(--text-primary); }
          table {
            width: 100%;
            border-collapse: collapse;
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 14px;
            overflow: hidden;
          }
          thead th {
            text-align: left;
            font-family: "JetBrains Mono", ui-monospace, monospace;
            font-size: 0.68rem;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: var(--text-muted);
            background: var(--surface-raised);
            padding: 0.85rem 1.1rem;
            border-bottom: 1px solid var(--border);
          }
          tbody td {
            padding: 0.85rem 1.1rem;
            border-bottom: 1px solid var(--border);
            font-size: 0.92rem;
            vertical-align: middle;
          }
          tbody tr:last-child td { border-bottom: none; }
          tbody tr:hover { background: var(--surface-raised); }
          td.loc a {
            color: var(--text-primary);
            font-family: "JetBrains Mono", ui-monospace, monospace;
            font-size: 0.88rem;
            text-decoration: none;
            border-bottom: 1px solid transparent;
          }
          td.loc a:hover { color: var(--accent-primary); border-bottom-color: var(--accent-primary); }
          td.date { color: var(--text-secondary); font-family: "JetBrains Mono", ui-monospace, monospace; font-size: 0.85rem; white-space: nowrap; }
          .badge {
            display: inline-block;
            font-family: "JetBrains Mono", ui-monospace, monospace;
            font-size: 0.72rem;
            padding: 0.2rem 0.55rem;
            border-radius: 999px;
            border: 1px solid var(--border);
            color: var(--text-secondary);
            white-space: nowrap;
          }
          .badge--monthly { color: var(--accent-primary); border-color: rgba(54, 215, 255, 0.35); }
          .badge--yearly { color: var(--text-muted); }
          .prio { display: flex; align-items: center; gap: 0.6rem; }
          .prio__track { flex: 1; height: 5px; border-radius: 999px; background: var(--surface-raised); border: 1px solid var(--border); min-width: 60px; overflow: hidden; }
          .prio__fill { height: 100%; background: linear-gradient(90deg, var(--accent-blue), var(--accent-primary)); }
          .prio__num { font-family: "JetBrains Mono", ui-monospace, monospace; font-size: 0.82rem; color: var(--text-secondary); width: 2.2em; text-align: right; }
          footer { margin-top: 2rem; }
          footer a { color: var(--text-muted); font-size: 0.85rem; text-decoration: none; }
          footer a:hover { color: var(--accent-primary); }
          @media (max-width: 620px) {
            thead th:nth-child(3), tbody td:nth-child(3) { display: none; }
            tbody td { padding: 0.75rem 0.8rem; }
          }
        </style>
      </head>
      <body>
        <div class="wrap">
          <header>
            <p class="eyebrow">AFK³ Solutions</p>
            <h1>XML Sitemap</h1>
            <p class="sub">
              A human-readable view of this site's sitemap for search engines. <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)" /> pages</strong> indexed, most recently updated
              <strong>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <xsl:sort select="sitemap:lastmod" order="descending" data-type="text" />
                  <xsl:if test="position() = 1">
                    <xsl:value-of select="sitemap:lastmod" />
                  </xsl:if>
                </xsl:for-each>
              </strong>. Crawlers read the raw XML directly — this styling is just for us.
            </p>
          </header>
          <table>
            <thead>
              <tr>
                <th>Page</th>
                <th>Last modified</th>
                <th>Change frequency</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td class="loc">
                    <a href="{sitemap:loc}">
                      <xsl:value-of select="substring-after(sitemap:loc, 'afkcube.com')" />
                    </a>
                  </td>
                  <td class="date"><xsl:value-of select="sitemap:lastmod" /></td>
                  <td>
                    <span class="badge badge--{sitemap:changefreq}">
                      <xsl:value-of select="sitemap:changefreq" />
                    </span>
                  </td>
                  <td>
                    <div class="prio">
                      <div class="prio__track">
                        <div class="prio__fill" style="width:{sitemap:priority * 100}%"></div>
                      </div>
                      <span class="prio__num"><xsl:value-of select="sitemap:priority" /></span>
                    </div>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
          <footer>
            <a href="/">&#8592; Back to afkcube.com</a>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
