/**
 * Sentry - Edge runtime (middleware, and the /opengraph-image route).
 * Loaded by src/instrumentation.ts. No-op without a DSN - see sentry.server.config.ts.
 */
import * as Sentry from "@sentry/nextjs";

const dsn = process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV,
    tracesSampleRate: process.env.VERCEL_ENV === "production" ? 0.1 : 1,
    sendDefaultPii: false,
    debug: false,
  });
}
