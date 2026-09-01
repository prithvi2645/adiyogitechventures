import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn("relative py-24 sm:py-32", className)}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <div
            className={cn(
              "mb-5 flex items-center gap-3",
              align === "center" && "justify-center",
            )}
          >
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-brand-500/70" />
            <span className="eyebrow">{eyebrow}</span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-brand-500/70" />
          </div>
        </Reveal>
      ) : null}

      <Reveal delay={80}>
        <h2 className="font-display text-4xl leading-[1.12] text-ash-50 sm:text-5xl lg:text-[3.4rem]">
          {title}
          {highlight ? (
            <>
              {" "}
              <span className="text-sacred italic">{highlight}</span>
            </>
          ) : null}
        </h2>
      </Reveal>

      {description ? (
        <Reveal delay={160}>
          <p
            className={cn(
              "mt-6 text-base leading-relaxed text-ash-300 sm:text-lg",
              align === "center" && "mx-auto max-w-2xl",
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
