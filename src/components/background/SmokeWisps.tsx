"use client";

import { useEffect, useRef } from "react";

type Wisp = {
  x: number;
  y: number;
  /** 0 = far background, 1 = close foreground. Drives size, speed and alpha. */
  depth: number;
  maxSize: number;
  rise: number;
  drift: number;
  phase: number;
  life: number; // 0-1, current position in this wisp's life
  lifeSpeed: number;
  alphaPeak: number;
  warmth: number;
};

/**
 * Ambient rising mist: soft, blurred blooms of light drifting slowly
 * upward and dispersing, like incense smoke curling in still air. Purely
 * abstract - a radial gradient with no discrete outline - so it never
 * reads as a stamped-on shape the way a drawn icon can at small sizes.
 * Rendered with normal compositing so overlapping wisps stay hazy instead
 * of blowing out to solid white the way additive blending would.
 */
export default function SmokeWisps() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let wisps: Wisp[] = [];
    let raf = 0;
    let running = true;

    // Pointer parallax, eased toward the real cursor for a floaty feel.
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const density = () => {
      // These are large, soft blooms, not a field of specks - a handful
      // is enough to fill the frame without ever feeling busy.
      const area = width * height;
      return Math.min(16, Math.max(6, Math.round(area / 130000)));
    };

    const makeWisp = (seeded = false): Wisp => {
      const depth = Math.random();
      return {
        x: Math.random() * width,
        y: seeded ? Math.random() * height : height + Math.random() * 120,
        depth,
        maxSize: 70 + depth * 170,
        rise: 0.1 + depth * 0.28,
        drift: 0.15 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        life: seeded ? Math.random() : 0,
        lifeSpeed: 0.00006 + Math.random() * 0.00005,
        alphaPeak: 0.05 + depth * 0.08,
        warmth: Math.random(),
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      wisps = Array.from({ length: density() }, () => makeWisp(true));
    };

    const drawWisp = (w: Wisp, t: number) => {
      // Sway grows with life, as though the mist were dispersing outward
      // the higher it climbs.
      const sway =
        Math.sin(t * 0.00028 * w.drift + w.phase) * (14 + w.life * 46);
      const px = w.x + sway + pointer.x * (4 + w.depth * 14);
      const py = w.y + pointer.y * (2 + w.depth * 8);

      // Bell-shaped envelope: fades in, holds, fades out across its life.
      const envelope = Math.sin(Math.PI * w.life);
      const size = w.maxSize * (0.35 + 0.65 * Math.sin((Math.PI / 2) * w.life));
      const a = w.alphaPeak * envelope;

      if (a <= 0.002 || size <= 1) return;

      const r = 246 - w.warmth * 8;
      const g = 251 - w.warmth * 14;
      const b = 250 - w.warmth * 26;

      const glow = ctx.createRadialGradient(px, py, 0, px, py, size);
      glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${a})`);
      glow.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${a * 0.4})`);
      glow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(px, py, size, 0, Math.PI * 2);
      ctx.fill();
    };

    const frame = (t: number) => {
      if (!running) return;

      pointer.x += (pointer.tx - pointer.x) * 0.045;
      pointer.y += (pointer.ty - pointer.y) * 0.045;

      ctx.clearRect(0, 0, width, height);

      for (const w of wisps) {
        w.y -= w.rise;
        w.life += w.lifeSpeed * 16.7; // roughly per-frame at 60fps, dt-agnostic enough here
        if (w.life >= 1 || w.y < -w.maxSize) {
          Object.assign(w, makeWisp());
        }
        drawWisp(w, t);
      }

      raf = requestAnimationFrame(frame);
    };

    const onPointerMove = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    // Stop burning CPU when the tab is hidden.
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduceMotion) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };

    resize();

    if (reduceMotion) {
      // Draw one static frame - the texture without the movement.
      for (const w of wisps) drawWisp(w, 0);
    } else {
      raf = requestAnimationFrame(frame);
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
