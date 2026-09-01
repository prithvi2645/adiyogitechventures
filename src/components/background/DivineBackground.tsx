import CosmicCanvas from "./CosmicCanvas";
import ScrollZoomBackdrop from "./ScrollZoomBackdrop";
import { Yantra } from "./Yantra";

/**
 * Fixed, full-viewport atmosphere that sits behind every page.
 *
 * Layer order (back to front):
 *   1. Deep radial base - the void, warmed near the horizon
 *   1b. Generated Kailash backdrop, scroll-linked slow zoom
 *   2. Breathing aurora fields - brand teal, cyan and deep navy
 *   3. Sacred geometry - a slowly rotating yantra
 *   4. Horizon glow - a rising light at the base of the viewport
 *   5. Ember particle canvas
 *   6. Vignette + fine grid + film grain
 */
export default function DivineBackground() {
  return (
    <div
      aria-hidden="true"
      className="grain pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* 1. Base gradient - never flat black */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(140% 100% at 50% 0%, #0c1c33 0%, #081525 34%, #050c17 68%, #04070e 100%)",
        }}
      />

      {/* 1b. Photographic backdrop, zoomed slowly by scroll position */}
      <ScrollZoomBackdrop />

      {/* 2. Aurora fields */}
      <div className="absolute inset-0">
        <div
          className="aurora-blob breathe-a"
          style={{
            top: "-14%",
            left: "8%",
            width: "58vw",
            height: "58vw",
            maxWidth: 900,
            maxHeight: 900,
            background:
              "radial-gradient(circle, rgba(52,187,182,0.30) 0%, rgba(21,55,107,0.14) 42%, transparent 68%)",
          }}
        />
        <div
          className="aurora-blob breathe-b"
          style={{
            top: "18%",
            right: "-12%",
            width: "52vw",
            height: "52vw",
            maxWidth: 820,
            maxHeight: 820,
            background:
              "radial-gradient(circle, rgba(89,215,205,0.20) 0%, rgba(52,187,182,0.09) 45%, transparent 70%)",
          }}
        />
        <div
          className="aurora-blob breathe-c"
          style={{
            bottom: "-18%",
            left: "26%",
            width: "62vw",
            height: "62vw",
            maxWidth: 980,
            maxHeight: 980,
            background:
              "radial-gradient(circle, rgba(21,55,107,0.34) 0%, rgba(24,99,136,0.12) 45%, transparent 72%)",
          }}
        />
        <div
          className="aurora-blob breathe-a"
          style={{
            top: "48%",
            left: "-10%",
            width: "40vw",
            height: "40vw",
            maxWidth: 620,
            maxHeight: 620,
            animationDelay: "-7s",
            background:
              "radial-gradient(circle, rgba(147,231,224,0.16) 0%, transparent 66%)",
          }}
        />
      </div>

      {/* 3. Sacred geometry */}
      <Yantra className="absolute left-1/2 top-[6%] h-[min(150vh,1500px)] w-[min(150vh,1500px)] -translate-x-1/2 opacity-[0.13] mix-blend-screen" />

      {/* 4. Horizon glow - light rising from below, like dawn over a hill */}
      <div
        className="absolute inset-x-0 bottom-0 h-[45vh]"
        style={{
          background:
            "radial-gradient(90% 130% at 50% 128%, rgba(52,187,182,0.24) 0%, rgba(24,99,136,0.09) 34%, transparent 66%)",
        }}
      />

      {/* 5. Embers */}
      <CosmicCanvas />

      {/* 6a. Fine grid - subliminal structure, keeps large areas from feeling empty */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(120% 90% at 50% 22%, #000 0%, transparent 74%)",
          WebkitMaskImage:
            "radial-gradient(120% 90% at 50% 22%, #000 0%, transparent 74%)",
        }}
      />

      {/* 6b. Vignette - focuses the eye toward the centre */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(110% 80% at 50% 40%, transparent 42%, rgba(4,7,14,0.62) 82%, rgba(4,7,14,0.92) 100%)",
        }}
      />
    </div>
  );
}
