"use client";

import { useEffect, useRef } from "react";
import { TrishulDamru } from "./SacredIcons";

/** Elements that should feel "grabbable" - the damru grows over these. */
const INTERACTIVE = 'a,button,[role="button"],summary,label,select,[data-cursor="grow"]';
/** Elements where the native caret matters more than our cursor. */
const TEXT_FIELD = "input,textarea,[contenteditable='true']";

/**
 * Trishul-and-damru cursor with a trailing aura.
 *
 * Three layers, each easing at a different rate so the whole thing feels
 * weighted rather than glued to the pointer:
 *   - a wide soft aura that lags well behind (the "cursor light")
 *   - the mark itself, following closely
 *   - the damru's striker beads, swung by horizontal pointer velocity
 *
 * Safety rails, because replacing the system cursor is a real usability cost:
 *   - only runs on a fine pointer (never touch) and never under reduced motion
 *   - the native cursor is hidden by a class this component adds AFTER mount,
 *     so if JS fails or is disabled the normal cursor is untouched
 *   - text fields keep their native caret
 */
export default function CursorAura() {
  const auraRef = useRef<HTMLDivElement>(null);
  const damruRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!finePointer || reduceMotion) return;

    const aura = auraRef.current;
    const damru = damruRef.current;
    if (!aura || !damru) return;

    const beads = damru.querySelector<SVGGElement>("#damru-beads");
    const root = document.documentElement;
    root.classList.add("has-damru-cursor");

    // Start off-screen so nothing is parked at 0,0 before the first move.
    const target = { x: -200, y: -200 };
    const slow = { x: -200, y: -200 };
    const fast = { x: -200, y: -200 };

    let swing = 0;
    let swingVel = 0;
    let scale = 1;
    let targetScale = 1;
    let visible = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        visible = true;
        // Jump the followers to the pointer so they do not fly in from 0,0.
        slow.x = fast.x = e.clientX;
        slow.y = fast.y = e.clientY;
        aura.style.opacity = "1";
        damru.style.opacity = "1";
      }
    };

    const onOver = (e: PointerEvent) => {
      const el = e.target as Element | null;
      if (!el || typeof el.closest !== "function") return;

      if (el.closest(TEXT_FIELD)) {
        damru.style.opacity = "0";
        targetScale = 1;
        return;
      }
      damru.style.opacity = visible ? "1" : "0";
      targetScale = el.closest(INTERACTIVE) ? 1.35 : 1;
    };

    // Striking the drum: a hard swing plus a squash on the body. Cleared on
    // animationend rather than pointerup, so a fast click still plays in full.
    const onDown = () => {
      swingVel += 34;
      damru.classList.remove("is-struck");
      void damru.offsetWidth; // force reflow so the animation restarts
      damru.classList.add("is-struck");
    };
    const onStrikeEnd = () => damru.classList.remove("is-struck");

    const onLeave = () => {
      visible = false;
      aura.style.opacity = "0";
      damru.style.opacity = "0";
    };

    const frame = () => {
      // Aura lags furthest behind, damru follows closely.
      slow.x += (target.x - slow.x) * 0.085;
      slow.y += (target.y - slow.y) * 0.085;

      const prevX = fast.x;
      fast.x += (target.x - fast.x) * 0.26;
      fast.y += (target.y - fast.y) * 0.26;

      // Spring the beads from horizontal velocity: they trail, then settle.
      const velocity = fast.x - prevX;
      swingVel += -velocity * 1.5 - swing * 0.22;
      swingVel *= 0.86;
      swing += swingVel * 0.06;
      swing = Math.max(-34, Math.min(34, swing));

      scale += (targetScale - scale) * 0.16;

      aura.style.transform = `translate3d(${slow.x}px, ${slow.y}px, 0) translate(-50%, -50%)`;
      damru.style.transform = `translate3d(${fast.x}px, ${fast.y}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
      if (beads) beads.style.transform = `rotate(${swing.toFixed(2)}deg)`;

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    damru.addEventListener("animationend", onStrikeEnd);
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("has-damru-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      damru.removeEventListener("animationend", onStrikeEnd);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={auraRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[95] h-[360px] w-[360px] opacity-0 mix-blend-screen transition-opacity duration-500 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(52,187,182,0.13) 0%, rgba(22,141,161,0.06) 38%, transparent 68%)",
        }}
      />
      <div
        ref={damruRef}
        aria-hidden="true"
        className="damru-cursor pointer-events-none fixed left-0 top-0 z-[100] h-[26px] w-[26px] opacity-0 transition-opacity duration-300 will-change-transform"
      >
        <TrishulDamru className="h-full w-full drop-shadow-[0_0_6px_rgba(52,187,182,0.85)]" />
      </div>
    </>
  );
}
