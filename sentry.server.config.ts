/**
 * Sentry - Node.js server runtime (server components, server actions, route handlers).
 * Loaded by src/instrumentation.ts.
 *
 * With no SENTRY_DSN set this is a no-op, so local development and any deploy
 * that has not been wired to Sentry yet behave exactly as before.
 */
import * as Sentry from "@sentry/nextjs";

const dsn = process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV,
    // Full trace sampling in preview, 10% in production - a marketing site's
    // traffic does not need more and the free tier quota is finite.
    tracesSampleRate: process.env.VERCEL_ENV === "production" ? 0.1 : 1,
    sendDefaultPii: false,
    debug: false,
  });
}
