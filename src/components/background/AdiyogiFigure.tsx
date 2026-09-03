"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import logoMark from "../../../public/brand/logo-mark.png";

/** How much the figure grows across a full page scroll. Kept small - this
 *  should read as a slow breath, not a zoom. */
const MAX_SCALE = 0.06;

/**
 * The full logo mark (Adiyogi form plus the upward arrow) centred inside
 * the yantra, drifting into a very slight scroll-linked zoom the same way
 * `ScrollZoomBackdrop` does for the photographic layer. Written straight to
 * `style.transform` from a rAF loop so it stays off the render path.
 *
 * Rendered at normal blending rather than mix-blend-screen: the source
 * art's opaque pixels are its dark outline tones, which a screen blend
 * washes out almost entirely against a dark backdrop - normal blending is
 * what actually keeps the form legible. `logo-mark.png` already has
 * transparent padding on every edge, so no fade mask is needed here.
 */
export default function AdiyogiFigure() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let queued = false;
    let current = 0;
    let target = 0;

    const readScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      queued = false;
    };

    const frame = () => {
      current += (target - current) * 0.08;
      const scale = 1 + current * MAX_SCALE;
      el.style.transform = `scale(${scale.toFixed(4)})`;
      raf = requestAnimationFrame(frame);
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(readScroll);
    };

    readScroll();
    current = target;
    raf = requestAnimationFrame(frame);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="absolute inset-x-0 top-[7%] flex justify-center">
      <div
        ref={ref}
        className="relative h-[min(46vh,480px)] w-[min(48vw,490px)] opacity-[0.14] will-change-transform"
        style={{ transformOrigin: "50% 30%" }}
      >
        <Image
          src={logoMark}
          alt=""
          fill
          sizes="(max-width: 768px) 48vw, 490px"
          priority={false}
          className="object-contain object-top"
        />
      </div>
    </div>
  );
}
