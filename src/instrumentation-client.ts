/**
 * Sentry - browser.
 *
 * The SDK is ~80 kB of the shared bundle, which is a lot to hand every visitor
 * of a marketing site, so it is loaded as a deferred chunk rather than imported
 * statically: with no NEXT_PUBLIC_SENTRY_DSN set nothing is downloaded at all,
 * and with one set it arrives off the critical path.
 *
 * The trade-off is a gap of a few hundred milliseconds after first paint during
 * which a client error is not captured. Server errors, which is where the ones
 * that matter live, are captured from the first request either way - see
 * src/instrumentation.ts.
 */
import type * as SentryClient from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
const environment = process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.NODE_ENV;

let sentry: typeof SentryClient | undefined;

if (dsn) {
  void import("@sentry/nextjs").then((mod) => {
    mod.init({
      dsn,
      environment,
      tracesSampleRate: environment === "production" ? 0.1 : 1,
      // Session replay is off deliberately: it records what visitors type into
      // the contact form. Turn it on only once /privacy says so.
      replaysSessionSampleRate: 0,
      replaysOnErrorSampleRate: 0,
      sendDefaultPii: false,
      debug: false,
    });
    sentry = mod;
  });
}

/** Instruments App Router client-side navigations, once the SDK has landed. */
export const onRouterTransitionStart: typeof SentryClient.captureRouterTransitionStart =
  (...args) => sentry?.captureRouterTransitionStart(...args);
