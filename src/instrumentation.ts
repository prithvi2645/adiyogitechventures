import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("../sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("../sentry.edge.config");
  }
}

/**
 * Next.js hands every server-side render, server action and route handler error
 * to this hook. Without a DSN, Sentry is uninitialised and this is a no-op.
 */
export const onRequestError = Sentry.captureRequestError;
