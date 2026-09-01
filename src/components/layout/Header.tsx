"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Logo from "./Logo";
import { TrishulDamru } from "@/components/ui/SacredIcons";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      const max = document.body.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(y / max, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer on navigation.
  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href.startsWith("/#")
      ? false
      : href === "/"
        ? pathname === "/"
        : pathname.startsWith(href);

  return (
    <>
      <a
        href="#main"
        className="sr-only-focusable fixed left-4 top-4 z-[60] rounded-full bg-brand-500 px-5 py-2.5 text-sm font-medium text-white"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "glass-strong border-b border-white/[0.07] shadow-[0_10px_40px_-24px_rgba(0,0,0,0.9)]"
            : "border-b border-transparent",
        )}
      >
        <div className="mx-auto flex h-[var(--header-h)] w-full max-w-7xl items-center justify-between px-5 sm:px-8">
          <Logo />

          <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "link-grow text-sm transition-colors duration-300",
                  isActive(item.href)
                    ? "text-brand-300"
                    : "text-ash-300 hover:text-ash-50",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="btn-sacred hidden items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white sm:inline-flex"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-ash-100 transition-colors hover:border-brand-500/50 lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Scroll progress - a thread of light, with the trishul riding its tip */}
        <div className="relative h-px">
          <div
            className="h-px origin-left bg-gradient-to-r from-brand-500 via-accent-400 to-brand-400 transition-transform duration-150"
            style={{ transform: `scaleX(${progress})` }}
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 transition-[left,opacity] duration-150 ease-out"
            style={{
              left: `${progress * 100}%`,
              opacity: progress > 0.008 ? 1 : 0,
            }}
          >
            {/* Centring lives on this wrapper; the bob animation on the child.
                Both on one element and the keyframe transform would clobber the
                -50% offsets. */}
            <div className="-translate-x-1/2 -translate-y-1/2">
              <div className="progress-rider relative">
                {/* Glow pooled under the tip of the line */}
                <span
                  className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full blur-md"
                  style={{ background: "rgba(52,187,182,0.55)" }}
                />
                <TrishulDamru className="relative h-7 w-7 drop-shadow-[0_0_5px_rgba(52,187,182,0.9)]" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-0 z-40 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-void/85 backdrop-blur-sm transition-opacity duration-400",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <nav
          aria-label="Mobile"
          className={cn(
            "glass-strong absolute inset-x-0 top-0 origin-top px-6 pb-10 pt-[calc(var(--header-h)+1.5rem)] transition-all duration-500 [transition-timing-function:var(--ease-divine)]",
            open
              ? "translate-y-0 opacity-100"
              : "-translate-y-6 opacity-0",
          )}
        >
          <ul className="flex flex-col">
            {site.nav.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between border-b border-white/[0.06] py-4 font-display text-2xl text-ash-100 transition-colors hover:text-brand-300"
                  style={{ transitionDelay: open ? `${i * 45}ms` : "0ms" }}
                >
                  {item.label}
                  <ArrowUpRight className="h-5 w-5 text-brand-500/70" />
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/contact"
            className="btn-sacred mt-7 flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-medium text-white"
          >
            Start a project
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          <div className="mt-7 space-y-1 text-sm text-ash-400">
            <a
              href={`mailto:${site.contact.email}`}
              className="block hover:text-brand-300"
            >
              {site.contact.email}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
