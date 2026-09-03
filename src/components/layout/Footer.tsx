import Link from "next/link";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
import { Trishul } from "@/components/background/Yantra";
import { site } from "@/content/site";
import { services } from "@/content/services";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/[0.07]">
      {/* Warm floor light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72"
        style={{
          background:
            "radial-gradient(70% 120% at 50% 118%, rgba(52,187,182,0.16) 0%, transparent 64%)",
        }}
      />
      <Trishul
        className="pointer-events-none absolute -right-6 bottom-0 h-[26rem] text-brand-500/[0.07]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ash-400">
              {site.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {site.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 px-4 py-2 text-xs text-ash-300 transition-colors hover:border-brand-500/50 hover:text-brand-300"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-ash-500">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sm text-ash-300 transition-colors hover:text-brand-300"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-ash-500">
              Company
            </h3>
            <ul className="space-y-3">
              {[
                { label: "About us", href: "/about" },
                { label: "Our work", href: "/work" },
                { label: "Process", href: "/#process" },
                { label: "FAQ", href: "/#faq" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-ash-300 transition-colors hover:text-brand-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-ash-500">
              Get in touch
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="flex items-start gap-3 text-ash-300 transition-colors hover:text-brand-300"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-ash-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                <span>
                  {site.contact.address}
                  <br />
                  <span className="text-ash-500">{site.contact.hours}</span>
                </span>
              </li>
            </ul>

            <Link
              href="/contact"
              className="btn-ghost mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm text-ash-100"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="thread-divider my-12" />

        <div className="flex flex-col items-center justify-between gap-5 text-xs text-ash-500 sm:flex-row">
          <p>
            &copy; {year} {site.legalName}. All rights reserved.
          </p>
          <p className="font-display text-sm italic text-ash-400">
            &ldquo;Technology, offered with devotion.&rdquo;
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-ash-200">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-ash-200">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
