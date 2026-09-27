/**
 * Production server for non-Vercel hosts (Railway, Render, a VPS…).
 *
 * Vercel serves this site with `vercel.json` (clean URLs + headers) and runs
 * `api/contact.js` as a serverless function. Other hosts do neither, so this
 * zero-dependency Node server reproduces that behaviour:
 *
 *   - static files from the repo root, with clean URLs (`/services` → services.html,
 *     `/services.html` → 308 to `/services`, no trailing slashes)
 *   - the same security headers as vercel.json
 *   - POST /api/contact → the unchanged Vercel-style handler in api/contact.js,
 *     wrapped with the small req.body / res.status / res.json shim it expects
 *   - 404.html for anything else
 *
 * Only public site files are served: dotfiles, node_modules, api/, lib/, scripts/,
 * Markdown specs and package files are never exposed.
 *
 * Start: `npm start` (listens on $PORT, default 3000).
 */

import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import contactHandler from "./api/contact.js";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 3000;
const MAX_BODY = 64 * 1024;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".xsl": "application/xml; charset=utf-8",
  ".woff2": "font/woff2",
};

const BLOCKED_DIRS = new Set(["node_modules", "api", "lib", "scripts", "worktrees"]);
const BLOCKED_FILES = new Set(["package.json", "package-lock.json", "server.js", "vercel.json", "README.md"]);

const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "SAMEORIGIN",
  "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
};

function isPublic(relPath) {
  if (relPath.includes("\\")) return false;
  const parts = relPath.split("/").filter(Boolean);
  if (!parts.length) return false;
  if (parts.some((p) => p.startsWith("."))) return false;
  if (BLOCKED_DIRS.has(parts[0])) return false;
  const base = parts[parts.length - 1];
  if (BLOCKED_FILES.has(base) || base.endsWith(".md")) return false;
  return Object.prototype.hasOwnProperty.call(MIME, path.extname(base).toLowerCase());
}

async function fileExists(relPath) {
  try {
    return (await stat(path.join(ROOT, relPath))).isFile();
  } catch {
    return false;
  }
}

async function sendFile(res, relPath, status = 200, method = "GET") {
  const body = await readFile(path.join(ROOT, relPath));
  const ext = path.extname(relPath).toLowerCase();
  res.writeHead(status, {
    "Content-Type": MIME[ext],
    "Content-Length": body.length,
    "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=3600",
  });
  res.end(method === "HEAD" ? undefined : body);
}

function redirect(res, location, status = 308) {
  res.writeHead(status, { Location: location });
  res.end();
}

/** Resolves a URL path to a public file, following Vercel's cleanUrls rules. */
async function resolveStatic(pathname) {
  if (pathname === "/") return "index.html";
  const rel = pathname.replace(/^\/+/, "");
  if (!path.extname(rel) && isPublic(rel + ".html") && (await fileExists(rel + ".html"))) return rel + ".html";
  if (isPublic(rel) && (await fileExists(rel))) return rel;
  return null;
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY) {
        reject(Object.assign(new Error("Payload too large"), { status: 413 }));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function parseBody(raw, contentType) {
  if (!raw) return {};
  if (contentType.includes("application/json")) {
    try { return JSON.parse(raw); } catch { return {}; }
  }
  if (contentType.includes("application/x-www-form-urlencoded")) {
    return Object.fromEntries(new URLSearchParams(raw));
  }
  return raw;
}

/** Adds the Vercel helpers api/contact.js relies on. */
function vercelify(res) {
  res.status = (code) => { res.statusCode = code; return res; };
  res.json = (data) => {
    if (!res.getHeader("Content-Type")) res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify(data));
    return res;
  };
  return res;
}

async function handleContact(req, res) {
  vercelify(res);
  try {
    if (req.method === "POST") {
      req.body = parseBody(await readRequestBody(req), String(req.headers["content-type"] || ""));
    }
    await contactHandler(req, res);
  } catch (err) {
    console.error("[api/contact]", err);
    if (!res.headersSent) res.status(err.status || 500).json({ error: "Something went wrong. Please email us directly." });
  }
}

const server = http.createServer(async (req, res) => {
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) res.setHeader(k, v);

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  } catch {
    res.writeHead(400).end();
    return;
  }
  const search = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";

  if (pathname === "/api/contact") return handleContact(req, res);

  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }

  // Clean URLs: drop trailing slashes, `.html` and `/index`.
  if (pathname.length > 1 && pathname.endsWith("/")) return redirect(res, pathname.replace(/\/+$/, "") + search);
  if (pathname.endsWith(".html")) {
    const clean = pathname.slice(0, -5).replace(/\/index$/, "") || "/";
    return redirect(res, clean + search);
  }

  try {
    // Linux hosts are case-sensitive: send /products/E-Z to /products/e-z.
    if (pathname !== pathname.toLowerCase() && (await resolveStatic(path.posix.normalize(pathname.toLowerCase())))) {
      return redirect(res, pathname.toLowerCase() + search);
    }
    const file = await resolveStatic(path.posix.normalize(pathname));
    if (file) return await sendFile(res, file, 200, req.method);
    return await sendFile(res, "404.html", 404, req.method);
  } catch (err) {
    console.error("[static]", err);
    if (!res.headersSent) res.writeHead(500).end();
  }
});

server.listen(PORT, () => {
  console.log(`AFK³ site listening on port ${PORT}`);
});
