import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import HeroVisual from "./HeroVisual";
import Counter from "@/components/ui/Counter";
import { Container } from "@/components/ui/Section";
import { site } from "@/content/site";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-[calc(var(--header-h)+3rem)] pb-20">
      {/* A shaft of light falling from the top left, like a temple doorway */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-1/4 -top-1/2 h-[150%] w-[70%] rotate-[18deg] opacity-40"
        style={{
          background:
            "linear-gradient(100deg, transparent 38%, rgba(147,231,224,0.10) 50%, transparent 62%)",
        }}
      />

      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-[1.08fr_1fr] lg:gap-10">
          {/* ---------- Copy ---------- */}
          <div className="max-w-2xl">
            <div
              className="glass mb-8 inline-flex items-center gap-2.5 rounded-full py-2 pl-2.5 pr-5 text-xs"
              style={{ animation: "hero-in 0.9s var(--ease-divine) both" }}
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700">
                <Sparkles className="h-3 w-3 text-white" />
              </span>
              <span className="text-ash-200">Web &amp; app studio</span>
            </div>

            <h1
              className="font-display text-[2.9rem] leading-[1.06] text-ash-50 sm:text-6xl lg:text-[4.4rem]"
              style={{ animation: "hero-in 1s 0.1s var(--ease-divine) both" }}
            >
              Digital products
              <br />
              built with{" "}
              <span className="text-sacred italic">devotion</span>
            </h1>

            <p
              className="mt-7 max-w-xl text-base leading-relaxed text-ash-300 sm:text-lg"
              style={{ animation: "hero-in 1s 0.22s var(--ease-divine) both" }}
            >
              We design and engineer websites, web applications and mobile apps
              that are genuinely fast, quietly beautiful, and built to last.
              Strategy, design, development and care &mdash; under one roof.
            </p>

            <div
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
              style={{ animation: "hero-in 1s 0.34s var(--ease-divine) both" }}
            >
              <Link
                href="/contact"
                className="btn-sacred group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-medium text-white"
              >
                Start your project
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/work"
                className="btn-ghost inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-medium text-ash-100"
              >
                See our work
              </Link>
            </div>

            {/* Trust row */}
            <div
              className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4"
              style={{ animation: "hero-in 1s 0.46s var(--ease-divine) both" }}
            >
              {/* A five-star "Rated 4.9 by our clients" badge sat here. It was
                  not measured against anything - there is no review source and
                  no testimonials - so it came out. The two claims left are
                  commitments we make, not assertions about a past we cannot
                  evidence. */}
              <p className="text-xs text-ash-400">
                <span className="text-ash-100">30 days</span> free support after
                launch
              </p>
              <div className="hidden h-4 w-px bg-white/10 sm:block" />
              <p className="text-xs text-ash-400">
                <span className="text-ash-100">100%</span> code ownership, always
              </p>
            </div>
          </div>

          {/* ---------- Visual ---------- */}
          <div style={{ animation: "hero-in 1.2s 0.3s var(--ease-divine) both" }}>
            <HeroVisual />
          </div>
        </div>

        {/* ---------- Stats strip ---------- */}
        {site.stats.length > 0 && (
        <div
          className="glass mt-24 grid grid-cols-2 gap-px overflow-hidden rounded-2xl lg:grid-cols-4"
          style={{ animation: "hero-in 1s 0.6s var(--ease-divine) both" }}
        >
          {site.stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/[0.012] px-6 py-8 text-center transition-colors duration-500 hover:bg-brand-500/[0.06]"
            >
              <div className="font-display text-4xl text-ash-50 sm:text-5xl">
                <Counter
                  value={stat.value}
                  suffix={"suffix" in stat ? (stat.suffix as string) : ""}
                />
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.16em] text-ash-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        )}
      </Container>
    </section>
  );
}
