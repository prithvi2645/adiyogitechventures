import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // 82 is what ScrollZoomBackdrop asks for; Next 16 requires it be declared.
    qualities: [82, 90],
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

/**
 * Source maps are only uploaded to Sentry when the org, project and auth token
 * are all present (set them in Vercel, not locally). Without them the build is
 * the plain Next.js build - errors still report, their stack traces are just
 * minified.
 */
const sentryConfigured = Boolean(
  process.env.SENTRY_ORG &&
    process.env.SENTRY_PROJECT &&
    process.env.SENTRY_AUTH_TOKEN,
);

export default sentryConfigured
  ? withSentryConfig(nextConfig, {
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      silent: !process.env.CI,
      // Also map the chunks Next.js serves from outside /_next/static/chunks.
      widenClientFileUpload: true,
      // Proxy browser events through our own origin, so ad blockers - which
      // block sentry.io outright - do not silently swallow client errors.
      tunnelRoute: "/monitoring",
      // Strips Sentry's own console logging from the client bundle.
      disableLogger: true,
    })
  : nextConfig;
