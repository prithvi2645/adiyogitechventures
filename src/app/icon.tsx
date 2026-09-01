import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon: the flame mark on the void ground. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#04070e",
          borderRadius: 7,
        }}
      >
        <div
          style={{
            width: 17,
            height: 22,
            background: "linear-gradient(180deg, #eafbf9 0%, #34bbb6 45%, #186388 100%)",
            borderRadius: "50% 50% 50% 50% / 68% 68% 32% 32%",
            transform: "rotate(180deg)",
            display: "flex",
          }}
        />
      </div>
    ),
    size,
  );
}
