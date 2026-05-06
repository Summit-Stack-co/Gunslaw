/**
 * Simple per-key fixed-window rate limiter for App Router API routes.
 *
 * - In-memory (no Redis required). Each serverless instance has its own counter,
 *   which is fine for a low-traffic site as a baseline anti-abuse layer.
 * - For higher traffic or stronger guarantees, swap the `store` for Upstash Redis
 *   or Vercel KV without changing the call sites.
 */

type Bucket = {
  count: number;
  /** Epoch ms when this window resets. */
  resetAt: number;
};

const store = new Map<string, Bucket>();

/** Periodically prune expired buckets so the Map does not grow unbounded. */
function prune(now: number) {
  if (store.size < 256) return;
  for (const [key, bucket] of store) {
    if (bucket.resetAt <= now) store.delete(key);
  }
}

export type RateLimitResult = {
  ok: boolean;
  /** Seconds until the window resets (for `Retry-After`). */
  retryAfterSeconds: number;
  /** Remaining requests allowed in the current window (0+). */
  remaining: number;
};

/**
 * Increment the counter for `key` and decide whether the request is allowed.
 * Window is a fixed wall-clock window starting on first hit.
 */
export function rateLimit(
  key: string,
  options: { limit: number; windowSeconds: number },
): RateLimitResult {
  const now = Date.now();
  prune(now);

  const windowMs = options.windowSeconds * 1000;
  const existing = store.get(key);

  if (!existing || existing.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfterSeconds: options.windowSeconds, remaining: options.limit - 1 };
  }

  existing.count += 1;
  const remaining = Math.max(0, options.limit - existing.count);
  const retryAfterSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));

  if (existing.count > options.limit) {
    return { ok: false, retryAfterSeconds, remaining: 0 };
  }
  return { ok: true, retryAfterSeconds, remaining };
}

/** Best-effort client identifier from request headers. */
export function rateLimitKey(headers: Headers, route: string): string {
  const forwarded = headers.get("x-forwarded-for");
  let ip: string | null = null;
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) ip = first;
  }
  ip = ip ?? headers.get("x-real-ip") ?? headers.get("cf-connecting-ip") ?? "unknown";
  return `${route}:${ip}`;
}
