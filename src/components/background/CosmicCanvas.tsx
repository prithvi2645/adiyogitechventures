"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  /** 0 = far background, 1 = close foreground. Drives size, speed and alpha. */
  depth: number;
  radius: number;
  speed: number;
  drift: number;
  phase: number;
  alpha: number;
  hue: number;
};

const EMBER_HUES = [178, 186, 192, 170, 199];

/**
 * Ambient particle field: slow-rising motes with depth parallax, plus a
 * faint starfield. Rendered with additive blending so overlapping particles
 * bloom rather than flatten - that is what sells the "lit from within" look.
 */
export default function CosmicCanvas() {
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
    let particles: Particle[] = [];
    let raf = 0;
    let running = true;

    // Pointer parallax, eased toward the real cursor for a floaty feel.
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const density = () => {
      // Scale count with area, but keep a hard ceiling so low-end phones cope.
      const area = width * height;
      return Math.min(150, Math.max(36, Math.round(area / 16000)));
    };

    const makeParticle = (seeded = false): Particle => {
      const depth = Math.random();
      return {
        x: Math.random() * width,
        y: seeded ? Math.random() * height : height + Math.random() * 120,
        depth,
        radius: 0.5 + depth * 2.1,
        speed: 0.12 + depth * 0.5,
        drift: 0.25 + Math.random() * 0.9,
        phase: Math.random() * Math.PI * 2,
        alpha: 0.14 + depth * 0.5,
        hue: EMBER_HUES[Math.floor(Math.random() * EMBER_HUES.length)],
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
      particles = Array.from({ length: density() }, () => makeParticle(true));
    };

    const drawParticle = (p: Particle, t: number) => {
      const sway = Math.sin(t * 0.0006 * p.drift + p.phase) * (8 + p.depth * 22);
      const px = p.x + sway + pointer.x * (6 + p.depth * 26);
      const py = p.y + pointer.y * (4 + p.depth * 16);

      // Twinkle: a slow sine on alpha keeps the field from looking static.
      const twinkle = 0.72 + 0.28 * Math.sin(t * 0.0011 + p.phase * 2.3);
      const a = p.alpha * twinkle;

      const glow = ctx.createRadialGradient(px, py, 0, px, py, p.radius * 6);
      glow.addColorStop(0, `hsla(${p.hue}, 96%, 72%, ${a})`);
      glow.addColorStop(0.35, `hsla(${p.hue}, 92%, 58%, ${a * 0.42})`);
      glow.addColorStop(1, `hsla(${p.hue}, 90%, 50%, 0)`);

      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(px, py, p.radius * 6, 0, Math.PI * 2);
      ctx.fill();

      // Hot core
      ctx.fillStyle = `hsla(${p.hue + 12}, 100%, 88%, ${a * 0.95})`;
      ctx.beginPath();
      ctx.arc(px, py, p.radius * 0.55, 0, Math.PI * 2);
      ctx.fill();
    };

    const frame = (t: number) => {
      if (!running) return;

      pointer.x += (pointer.tx - pointer.x) * 0.045;
      pointer.y += (pointer.ty - pointer.y) * 0.045;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      for (const p of particles) {
        p.y -= p.speed;
        if (p.y < -40) {
          Object.assign(p, makeParticle());
          p.y = height + 20;
        }
        drawParticle(p, t);
      }

      ctx.globalCompositeOperation = "source-over";
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
      ctx.globalCompositeOperation = "lighter";
      for (const p of particles) drawParticle(p, 0);
      ctx.globalCompositeOperation = "source-over";
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
