import Link from "next/link";
import Image from "next/image";
import markSrc from "../../../public/brand/logo-mark.png";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

/**
 * Brand lockup: the supplied monogram plus live typography.
 *
 * We pair the image mark with real text rather than using the full artwork
 * lockup, for three reasons:
 *   - the navy "ADIYOGI" wordmark in the source has poor contrast on our dark
 *     ground (about 1.8:1), while live text is fully legible
 *   - text stays sharp at every size and reflows on mobile
 *   - the "TECH-VENTURES" sub-line could not be cleanly recovered from the
 *     lossy JPEG mockup we were given
 *
 * If a vector or transparent-PNG original arrives, drop it in over
 * public/brand/logo-mark.png - nothing here needs to change.
 */
export function LogoMark({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={markSrc}
      alt=""
      aria-hidden="true"
      priority={priority}
      // Rendered around 40-48px; request 2x for crisp output on retina.
      sizes="96px"
      className={cn("h-10 w-auto shrink-0 select-none", className)}
    />
  );
}

export default function Logo({
  className,
  showText = true,
  priority = false,
}: {
  className?: string;
  showText?: boolean;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} - home`}
      className={cn("group flex items-center gap-3", className)}
    >
      <LogoMark
        priority={priority}
        className="transition-transform duration-700 group-hover:scale-105"
      />
      {showText ? (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[1.35rem] tracking-tight text-ash-50">
            Adiyogi
          </span>
          <span className="mt-0.5 text-[0.6rem] font-medium uppercase tracking-[0.32em] text-brand-300">
            Tech Ventures
          </span>
        </span>
      ) : null}
    </Link>
  );
}
