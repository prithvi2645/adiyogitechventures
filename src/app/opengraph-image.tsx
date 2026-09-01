import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const runtime = "edge";
export const alt = `${site.name} - ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social share card, generated at build/request time so it never drifts out of
 * sync with the site config. Shown by WhatsApp, LinkedIn, X, Slack etc.
 */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 84px",
          background:
            "radial-gradient(120% 100% at 20% 0%, #102338 0%, #081525 42%, #04070e 100%)",
          position: "relative",
        }}
      >
        {/* Saffron aurora */}
        <div
          style={{
            position: "absolute",
            top: -220,
            left: -140,
            width: 760,
            height: 760,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(52,187,182,0.34) 0%, rgba(52,187,182,0) 68%)",
          }}
        />
        {/* Neelkanth aurora */}
        <div
          style={{
            position: "absolute",
            bottom: -260,
            right: -160,
            width: 680,
            height: 680,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(22,141,161,0.26) 0%, rgba(22,141,161,0) 68%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 9999,
              background: "#168da1",
            }}
          />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: "#59d7cd",
            }}
          >
            Adiyogi Tech Ventures
          </div>
        </div>

        <div
          style={{
            marginTop: 34,
            fontSize: 88,
            lineHeight: 1.06,
            color: "#f7f7fa",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Digital products</span>
          <span style={{ color: "#34bbb6" }}>built with devotion</span>
        </div>

        <div
          style={{
            marginTop: 34,
            fontSize: 28,
            color: "#a8aac0",
            maxWidth: 900,
            lineHeight: 1.45,
          }}
        >
          Websites, web apps and mobile apps - designed, engineered and cared
          for by one team.
        </div>

        <div
          style={{
            marginTop: 52,
            display: "flex",
            gap: 14,
          }}
        >
          {["Next.js", "React Native", "UI/UX", "E-Commerce"].map((tag) => (
            <div
              key={tag}
              style={{
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: 9999,
                padding: "10px 24px",
                fontSize: 22,
                color: "#d3d4e0",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
