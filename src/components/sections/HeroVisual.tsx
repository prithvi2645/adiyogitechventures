"use client";

import { useEffect, useRef } from "react";

/**
 * Floating "product" mock: a browser window and a phone, tilted in 3D and
 * reacting subtly to the pointer. Everything is CSS/SVG - no screenshots to
 * license, and it stays crisp on every display.
 */
export default function HeroVisual() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const loop = () => {
      current.x += (target.x - current.x) * 0.06;
      current.y += (target.y - current.y) * 0.06;
      scene.style.transform = `perspective(1600px) rotateY(${-16 + current.x * 5}deg) rotateX(${8 - current.y * 4}deg)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const bars = [38, 62, 45, 78, 55, 92, 70];

  return (
    <div className="relative mx-auto w-full max-w-xl [perspective:1600px]">
      {/* Glow behind the scene */}
      <div
        aria-hidden="true"
        className="aura-pulse absolute inset-0 -z-10 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 55% 45%, rgba(52,187,182,0.30), rgba(22,141,161,0.14) 45%, transparent 70%)",
        }}
      />

      <div
        ref={sceneRef}
        className="relative transition-transform duration-300 [transform-style:preserve-3d] [transform:perspective(1600px)_rotateY(-16deg)_rotateX(8deg)]"
      >
        {/* Browser window */}
        <div className="glass overflow-hidden rounded-2xl">
          {/* Chrome */}
          <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.02] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <div className="ml-3 flex-1 truncate rounded-md bg-white/[0.05] px-3 py-1 text-[10px] text-ash-500">
              adiyogitechventures.vercel.app
            </div>
          </div>

          {/* Body */}
          <div className="space-y-4 p-5">
            <div className="flex items-center justify-between">
              <div className="space-y-1.5">
                <div className="h-2 w-24 rounded-full bg-white/12" />
                <div className="h-2 w-16 rounded-full bg-white/[0.07]" />
              </div>
              <div className="rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-3 py-1.5 text-[9px] font-medium text-white">
                Live
              </div>
            </div>

            {/* Metric tiles */}
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { v: "98", l: "Performance" },
                { v: "100", l: "SEO" },
                { v: "1.1s", l: "Load" },
              ].map((m) => (
                <div
                  key={m.l}
                  className="rounded-lg border border-white/[0.06] bg-white/[0.025] p-3"
                >
                  <div className="font-display text-xl text-brand-300">{m.v}</div>
                  <div className="mt-0.5 text-[8px] uppercase tracking-wider text-ash-500">
                    {m.l}
                  </div>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
              <div className="mb-3 h-1.5 w-20 rounded-full bg-white/10" />
              <div className="flex h-24 items-end gap-2">
                {bars.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm bg-gradient-to-t from-brand-700/40 via-brand-500/70 to-accent-300/90"
                    style={{
                      height: `${h}%`,
                      transformOrigin: "bottom",
                      animation: `bar-rise 1.1s ${i * 90}ms var(--ease-divine) both`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Phone, floating in front */}
        <div
          className="glass absolute -bottom-14 -left-10 w-[124px] overflow-hidden rounded-[1.6rem] p-1.5 sm:-left-16 sm:w-[148px]"
          style={{ transform: "translateZ(60px)" }}
        >
          <div className="rounded-[1.25rem] bg-gradient-to-b from-night to-void p-3">
            <div className="mx-auto mb-3 h-1 w-8 rounded-full bg-white/15" />
            <div className="space-y-2">
              <div className="h-14 rounded-lg bg-gradient-to-br from-brand-400/35 to-brand-700/40" />
              <div className="h-1.5 w-3/4 rounded-full bg-white/12" />
              <div className="h-1.5 w-1/2 rounded-full bg-white/[0.07]" />
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                <div className="h-8 rounded-md bg-white/[0.05]" />
                <div className="h-8 rounded-md bg-white/[0.05]" />
              </div>
              <div className="mt-1 h-6 rounded-full bg-gradient-to-r from-brand-500 to-brand-700" />
            </div>
          </div>
        </div>

        {/* Floating badge */}
        <div
          className="glass absolute -right-4 top-14 rounded-xl px-3.5 py-2.5 sm:-right-10"
          style={{ transform: "translateZ(90px)" }}
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[10px] font-medium text-ash-200">
              99.9% uptime
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bar-rise {
          from { transform: scaleY(0); opacity: 0; }
          to { transform: scaleY(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
