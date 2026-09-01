"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a numeric value up when it scrolls into view.
 * Accepts strings like "60+", "98", "4.9" - the non-numeric parts are
 * preserved and only the number animates.
 */
export default function Counter({
  value,
  suffix = "",
  duration = 1600,
}: {
  value: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = value.match(/^([\d.]+)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }

    const target = parseFloat(match[1]);
    const trailing = match[2] ?? "";
    const decimals = (match[1].split(".")[1] ?? "").length;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(el);

        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          // easeOutExpo - fast start, gentle settle
          const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
          setDisplay((target * eased).toFixed(decimals) + trailing);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix ? <span className="text-ash-400">{suffix}</span> : null}
    </span>
  );
}
