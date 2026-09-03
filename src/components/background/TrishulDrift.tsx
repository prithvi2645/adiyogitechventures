"use client";

import { useEffect, useState } from "react";
import { Trishul } from "./Yantra";

type Pass = {
  key: number;
  fromLeft: boolean;
  top: number; // vh
  rotate: number; // deg, resting tilt
  duration: number; // seconds to cross
};

/**
 * A single trishul that drifts slowly across the void every so often -
 * a rare, deliberate presence rather than a repeating loop. Position,
 * side, tilt and speed are randomised per pass so it never reads as
 * mechanical. Idle 20-45s between passes, on screen 30-46s.
 */
export default function TrishulDrift() {
  const [pass, setPass] = useState<Pass | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const cycle = () => {
      const duration = 30 + Math.random() * 16;
      setPass({
        key: Date.now(),
        fromLeft: Math.random() < 0.5,
        top: 14 + Math.random() * 56,
        rotate: -14 + Math.random() * 28,
        duration,
      });

      timer = setTimeout(() => {
        if (cancelled) return;
        setPass(null);
        timer = setTimeout(
          () => {
            if (!cancelled) cycle();
          },
          22000 + Math.random() * 28000,
        );
      }, duration * 1000);
    };

    timer = setTimeout(cycle, 9000 + Math.random() * 12000);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  if (!pass) return null;

  return (
    <div
      key={pass.key}
      aria-hidden="true"
      className="trishul-drift pointer-events-none absolute h-[34vh] max-h-[300px] w-auto text-brand-200"
      style={
        {
          top: `${pass.top}%`,
          [pass.fromLeft ? "left" : "right"]: "-12%",
          "--drift-rotate": `${pass.rotate}deg`,
          "--drift-x": pass.fromLeft ? "125vw" : "-125vw",
          animationDuration: `${pass.duration}s`,
        } as React.CSSProperties
      }
    >
      <Trishul className="h-full w-auto opacity-[0.1]" />
    </div>
  );
}
