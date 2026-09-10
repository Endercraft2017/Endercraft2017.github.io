/**
 * Per-IP rate limiting for the API routes, backed by Upstash Redis.
 *
 * Fail-open: if no Redis connection is configured (or Redis is unreachable) the
 * limiter allows the request. Set these in Vercel → Settings → Environment
 * Variables to turn it on — the Vercel Marketplace "Upstash for Redis"
 * integration adds them for you:
 *
 *   UPSTASH_REDIS_REST_URL   (or KV_REST_API_URL)
 *   UPSTASH_REDIS_REST_TOKEN (or KV_REST_API_TOKEN)
 *
 * Default budget: 5 requests per 10 minutes per IP, per route key.
 */
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let _limiter = null;
let _tried = false;

function getLimiter() {
  if (_tried) return _limiter;
  _tried = true;

  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    console.warn("[ratelimit] no Upstash Redis env vars — rate limiting is OFF (fail-open)");
    return null;
  }

  try {
    _limiter = new Ratelimit({
      redis: new Redis({ url: url, token: token }),
      limiter: Ratelimit.slidingWindow(5, "10 m"),
      prefix: "afk3:rl",
      analytics: false,
      // If Redis is slow/unreachable, allow the request rather than block the form.
      timeout: 1500
    });
  } catch (err) {
    console.error("[ratelimit] init failed — rate limiting OFF", err);
    _limiter = null;
  }
  return _limiter;
}

export function clientIp(req) {
  const xff = req.headers["x-forwarded-for"];
  if (xff) return String(xff).split(",")[0].trim();
  return (
    req.headers["x-real-ip"] ||
    (req.socket && req.socket.remoteAddress) ||
    "unknown"
  );
}

/**
 * @returns {Promise<{ ok: boolean, remaining?: number, reset?: number, disabled?: boolean }>}
 *   ok:false  → over the limit (caller should return 429)
 *   disabled  → limiter not configured; request allowed
 */
export async function checkRateLimit(req, routeKey) {
  const limiter = getLimiter();
  if (!limiter) return { ok: true, disabled: true };

  try {
    const id = (routeKey || "default") + ":" + clientIp(req);
    const r = await limiter.limit(id);
    return { ok: r.success, remaining: r.remaining, reset: r.reset };
  } catch (err) {
    console.error("[ratelimit] check failed — allowing request", err);
    return { ok: true, disabled: true };
  }
}
