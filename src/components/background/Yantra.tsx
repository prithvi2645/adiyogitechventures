import { cn } from "@/lib/utils";

/** A single lotus petal drawn as two mirrored quadratic curves. */
function petalPath(inner: number, outer: number, halfWidth: number) {
  const w = halfWidth;
  return `M 0 ${-inner}
          Q ${w} ${-(inner + outer) / 2} 0 ${-outer}
          Q ${-w} ${-(inner + outer) / 2} 0 ${-inner} Z`;
}

function Lotus({
  petals,
  inner,
  outer,
  halfWidth,
  className,
}: {
  petals: number;
  inner: number;
  outer: number;
  halfWidth: number;
  className?: string;
}) {
  return (
    <g className={className}>
      {Array.from({ length: petals }).map((_, i) => (
        <path
          key={i}
          d={petalPath(inner, outer, halfWidth)}
          transform={`rotate(${(360 / petals) * i})`}
        />
      ))}
    </g>
  );
}

/**
 * Stylised yantra: concentric rings, two lotus tiers, interlocking triangles
 * and a bindu at centre. Purely decorative - hidden from assistive tech.
 */
export function Yantra({ className }: { className?: string }) {
  const triangles = Array.from({ length: 5 }).map((_, i) => {
    const r = 132;
    const rot = i * 36;
    return (
      <polygon
        key={`up-${i}`}
        points={`0,${-r} ${r * 0.866},${r * 0.5} ${-r * 0.866},${r * 0.5}`}
        transform={`rotate(${rot})`}
      />
    );
  });

  return (
    <svg
      viewBox="-260 -260 520 520"
      aria-hidden="true"
      focusable="false"
      className={cn("overflow-visible", className)}
    >
      <defs>
        <radialGradient id="yantra-fade" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#59d7cd" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#168da1" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#168da1" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bindu-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#eafbf9" stopOpacity="1" />
          <stop offset="40%" stopColor="#59d7cd" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#168da1" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ring-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#93e7e0" stopOpacity="0.75" />
          <stop offset="50%" stopColor="#168da1" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#34bbb6" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* Outer slow ring set */}
      <g className="yantra-slow" fill="none" stroke="url(#ring-gradient)">
        <circle r="238" strokeWidth="0.6" strokeDasharray="2 9" />
        <circle r="226" strokeWidth="0.9" />
        <Lotus
          petals={16}
          inner={182}
          outer={224}
          halfWidth={26}
          className="[stroke-width:0.7]"
        />
      </g>

      {/* Mid counter-rotating tier */}
      <g className="yantra-mid" fill="none" stroke="url(#yantra-fade)">
        <circle r="176" strokeWidth="0.8" />
        <Lotus
          petals={8}
          inner={132}
          outer={174}
          halfWidth={34}
          className="[stroke-width:0.9]"
        />
        <circle r="130" strokeWidth="0.7" strokeDasharray="1 6" />
      </g>

      {/* Inner triangle mandala */}
      <g
        className="yantra-fast"
        fill="none"
        stroke="#59d7cd"
        strokeOpacity="0.34"
        strokeWidth="0.7"
      >
        {triangles}
        <circle r="70" strokeOpacity="0.5" />
        <circle r="42" strokeOpacity="0.35" strokeDasharray="1 4" />
      </g>

      {/* Bindu - the still point */}
      <circle r="26" fill="url(#bindu-glow)" className="aura-pulse" />
      <circle r="3.5" fill="#eafbf9" />
    </svg>
  );
}

/** Trishul (trident) silhouette used as a watermark motif. */
export function Trishul({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 260"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Central prong */}
      <path d="M50 6 L50 96" />
      <path d="M50 6 C44 22 42 34 44 44" />
      <path d="M50 6 C56 22 58 34 56 44" />
      {/* Side prongs */}
      <path d="M18 40 C14 62 20 82 34 92" />
      <path d="M18 40 C22 54 22 66 20 74" />
      <path d="M82 40 C86 62 80 82 66 92" />
      <path d="M82 40 C78 54 78 66 80 74" />
      {/* Crossbar and shaft */}
      <path d="M16 92 Q50 106 84 92" />
      <path d="M50 100 L50 252" />
      <path d="M38 116 Q50 124 62 116" />
      <ellipse cx="50" cy="132" rx="9" ry="5" />
    </svg>
  );
}
