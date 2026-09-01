/**
 * In-memory fixed-window rate limiter.
 *
 * Good enough for a single-instance deploy or a low-traffic marketing site.
 * On a multi-instance/serverless host each instance keeps its own counter, so
 * for hard guarantees swap the Map for Upstash Redis - the call signature here
 * is deliberately the same shape as @upstash/ratelimit so the swap is a
 * one-file change.
 */

type Entry = { count: number; resetAt: number };

const buckets = new Map<string, Entry>();

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5;

// Keep the map from growing without bound on a long-lived server.
function sweep(now: number) {
  if (buckets.size < 500) return;
  for (const [key, entry] of buckets) {
    if (entry.resetAt <= now) buckets.delete(key);
  }
}

export function rateLimit(identifier: string): {
  success: boolean;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now();
  sweep(now);

  const existing = buckets.get(identifier);

  if (!existing || existing.resetAt <= now) {
    const entry: Entry = { count: 1, resetAt: now + WINDOW_MS };
    buckets.set(identifier, entry);
    return { success: true, remaining: MAX_REQUESTS - 1, resetAt: entry.resetAt };
  }

  if (existing.count >= MAX_REQUESTS) {
    return { success: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return {
    success: true,
    remaining: MAX_REQUESTS - existing.count,
    resetAt: existing.resetAt,
  };
}
