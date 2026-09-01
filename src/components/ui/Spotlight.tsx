"use client";

import { useCallback, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Wrapper that feeds the cursor position into CSS custom properties so the
 * `.spotlight` gradient in globals.css can follow the pointer. Writes straight
 * to style props rather than React state - no re-render per mousemove.
 */
export default function Spotlight({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
    },
    [],
  );

  return (
    <div onMouseMove={onMouseMove} className={cn("spotlight", className)}>
      {children}
    </div>
  );
}
