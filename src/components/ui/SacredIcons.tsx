import { cn } from "@/lib/utils";

/**
 * Compact trishul with a damru bound to the shaft - the classic Shaiva
 * pairing. Used as the header's mobile-nav icon and as the custom cursor.
 *
 * Drawn solid rather than stroked (unlike the large decorative Trishul in
 * background/Yantra.tsx) so it stays legible at 20-24px, where hairline strokes
 * disappear. Optical centre sits at x=16 so callers can translate by -50%.
 * The bead group is a separate <g id="damru-beads"> so the cursor component
 * can swing it with the pointer's horizontal velocity.
 */
export function TrishulDamru({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
      className={cn("overflow-visible", className)}
    >
      <defs>
        <linearGradient id="td-metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#eafbf9" />
          <stop offset="42%" stopColor="#59d7cd" />
          <stop offset="100%" stopColor="#168da1" />
        </linearGradient>
        <linearGradient id="td-drum" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c9f4ef" />
          <stop offset="100%" stopColor="#34bbb6" />
        </linearGradient>
      </defs>

      <g fill="url(#td-metal)">
        {/* Three prongs from one leaf shape. The outer two are rotated about
            their base so they splay outward - that splay is what reads as a
            trident rather than three flames at 24px. */}
        <path
          d="M0 -9.6C2.3 -6 2.7 -2.8 1.7 0L-1.7 0C-2.7 -2.8 -2.3 -6 0 -9.6Z"
          transform="translate(16 12.8)"
        />
        <path
          d="M0 -9.6C2.3 -6 2.7 -2.8 1.7 0L-1.7 0C-2.7 -2.8 -2.3 -6 0 -9.6Z"
          transform="translate(9.8 12.8) rotate(-24)"
        />
        <path
          d="M0 -9.6C2.3 -6 2.7 -2.8 1.7 0L-1.7 0C-2.7 -2.8 -2.3 -6 0 -9.6Z"
          transform="translate(22.2 12.8) rotate(24)"
        />
        {/* Crossbar */}
        <rect x="7.2" y="12.4" width="17.6" height="2" rx="1" />
        {/* Shaft */}
        <rect x="15.1" y="14" width="1.8" height="17" />
      </g>

      {/* Damru bound to the shaft - two cones meeting at a pinched waist */}
      <g>
        <path d="M10.6 19.6v5.6l4 -2.1v-1.4z" fill="url(#td-drum)" />
        <path d="M21.4 19.6v5.6l-4 -2.1v-1.4z" fill="url(#td-drum)" />
        <rect x="14.6" y="21.1" width="2.8" height="2" rx="0.4" fill="#eafbf9" />
        {/* Strings and striker beads - swung by the cursor component */}
        <g id="damru-beads">
          <path
            d="M16 23.1c-.9 1.7 -2 2.6 -3.2 2.9M16 23.1c.9 1.7 2 2.6 3.2 2.9"
            stroke="#93e7e0"
            strokeWidth="0.7"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="12.5" cy="26.2" r="1" fill="#eafbf9" />
          <circle cx="19.5" cy="26.2" r="1" fill="#eafbf9" />
        </g>
      </g>
    </svg>
  );
}
