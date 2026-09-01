import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Container } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { Yantra } from "@/components/background/Yantra";
import { site } from "@/content/site";

export default function Cta() {
  return (
    <section className="relative py-28 sm:py-36">
      <Container>
        <Reveal>
          <div className="glass relative overflow-hidden rounded-[2rem] px-7 py-20 text-center sm:px-16">
            {/* Yantra watermark behind the invitation */}
            <Yantra
              className="pointer-events-none absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 opacity-[0.16] mix-blend-screen"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(60% 90% at 50% 108%, rgba(52,187,182,0.24) 0%, transparent 62%)",
              }}
            />

            <div className="relative">
              <div className="mb-6 flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-gradient-to-r from-transparent to-brand-500/70" />
                <span className="eyebrow">Shubhaarambh</span>
                <span className="h-px w-10 bg-gradient-to-l from-transparent to-brand-500/70" />
              </div>

              <h2 className="font-display text-4xl leading-[1.12] text-ash-50 sm:text-5xl lg:text-6xl">
                Let us begin
                <br />
                <span className="text-sacred italic">something worthy</span>
              </h2>

              <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-ash-300">
                Tell us what you are building. We will reply within one working
                day with honest thoughts, a rough timeline, and a real number -
                no obligation, no sales theatre.
              </p>

              <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="btn-sacred group inline-flex items-center justify-center gap-2 rounded-full px-9 py-4 text-sm font-medium text-white"
                >
                  Start your project
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="btn-ghost inline-flex items-center justify-center gap-2 rounded-full px-9 py-4 text-sm font-medium text-ash-100"
                >
                  <Mail className="h-4 w-4" />
                  Email us instead
                </a>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-xs text-ash-500">
                <span>{site.contact.hours}</span>
                <span className="hidden h-3 w-px bg-white/10 sm:block" />
                <span>Free 30-minute consultation</span>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
