import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "./Section";
import Reveal from "./Reveal";

export default function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  breadcrumbs,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
}) {
  return (
    <section className="relative pb-16 pt-[calc(var(--header-h)+5rem)] sm:pb-20 sm:pt-[calc(var(--header-h)+7rem)]">
      <Container>
        {breadcrumbs?.length ? (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ash-500">
              <li>
                <Link href="/" className="transition-colors hover:text-brand-300">
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb) => (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  <ChevronRight className="h-3 w-3 text-ash-500/60" />
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-brand-300"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-ash-300">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        {eyebrow ? (
          <Reveal>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-brand-500/70" />
              <span className="eyebrow">{eyebrow}</span>
            </div>
          </Reveal>
        ) : null}

        <Reveal delay={70}>
          <h1 className="max-w-4xl font-display text-[2.6rem] leading-[1.08] text-ash-50 sm:text-6xl lg:text-[4rem]">
            {title}
            {highlight ? (
              <>
                {" "}
                <span className="text-sacred italic">{highlight}</span>
              </>
            ) : null}
          </h1>
        </Reveal>

        {description ? (
          <Reveal delay={150}>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-ash-300 sm:text-lg">
              {description}
            </p>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
