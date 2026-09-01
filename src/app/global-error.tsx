"use client";

/**
 * Catches errors thrown by the root layout itself - the one place Next.js
 * cannot fall back to error.tsx. It replaces the whole document, so it renders
 * its own <html>/<body> and cannot use the header, footer or background.
 *
 * This is also where Sentry sees client-side render crashes; without it they
 * are swallowed by React's default error boundary.
 */

import { useEffect } from "react";
import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Imported lazily for the same reason as src/instrumentation-client.ts:
    // the SDK must not weigh on the bundle of a page that renders fine.
    if (!process.env.NEXT_PUBLIC_SENTRY_DSN) return;
    void import("@sentry/nextjs").then((Sentry) => {
      Sentry.captureException(error);
    });
  }, [error]);

  return (
    <html lang="en">
      <body className="antialiased">
        <section className="flex min-h-svh items-center justify-center px-6 py-32">
          <div className="mx-auto max-w-xl text-center">
            <p className="font-display text-7xl text-sacred sm:text-8xl">500</p>

            <h1 className="mt-4 font-display text-3xl text-ash-50 sm:text-4xl">
              Something went wrong
            </h1>

            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-ash-400">
              An unexpected error stopped this page from loading. It has been
              logged and we are looking into it. Try again, or write to us
              directly and we will pick it up from there.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <button
                onClick={reset}
                className="btn-sacred inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium text-white"
              >
                Try again
              </button>
              <a
                href="/"
                className="btn-ghost inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm text-ash-100"
              >
                Back to home
              </a>
            </div>

            {error.digest ? (
              <p className="mt-10 font-mono text-xs text-ash-500">
                Reference: {error.digest}
              </p>
            ) : null}
          </div>
        </section>
      </body>
    </html>
  );
}
