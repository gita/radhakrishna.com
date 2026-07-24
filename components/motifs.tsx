import type { SVGProps } from "react";

/**
 * Reusable devotional motifs (docs/04). Pure inline SVG, currentColor-driven,
 * decorative by default (aria-hidden). Restraint over decoration.
 */

export function Peacock({ className, ...props }: SVGProps<SVGSVGElement>) {
  // A clean morpankh (peacock feather) — Krishna's emblem. Layered teardrop
  // eye in peacock-blue / green / gold on a slender gold stem.
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {/* stem */}
      <path
        d="M20 22.5 C 20.8 28, 19.4 32.5, 20 38"
        stroke="hsl(var(--gold))"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* outer eye — peacock blue */}
      <path
        d="M20 3 C 12.5 6.2, 10.8 15.5, 20 24 C 29.2 15.5, 27.5 6.2, 20 3 Z"
        fill="hsl(var(--divine))"
      />
      {/* mid — jade green */}
      <path
        d="M20 6.6 C 15.3 8.8, 14.2 15, 20 20.6 C 25.8 15, 24.7 8.8, 20 6.6 Z"
        fill="hsl(var(--jade))"
      />
      {/* inner — gold */}
      <path
        d="M20 10 C 17.2 11.6, 16.7 15.2, 20 18.4 C 23.3 15.2, 22.8 11.6, 20 10 Z"
        fill="hsl(var(--gold))"
      />
      {/* highlight */}
      <circle
        cx="20"
        cy="14"
        r="1.5"
        fill="hsl(var(--background))"
        opacity="0.85"
      />
    </svg>
  );
}

export function Lotus({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 32"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path
        d="M24 4c-2 6-2 12 0 20 2-8 2-14 0-20Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M24 24c-4-4-6-9-6-15 4 2 6 7 6 15Zm0 0c4-4 6-9 6-15-4 2-6 7-6 15Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M24 24c-6-2-10-5-13-10 5 0 10 3 13 10Zm0 0c6-2 10-5 13-10-5 0-10 3-13 10Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

/** A thin centered gold hairline with small flanking motifs — a section divider. */
export function GoldFiligree({ className }: { className?: string }) {
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
    >
      <span className="gold-rule" style={{ flex: 1 }} />
      <Lotus className="size-5 text-gold" />
      <span className="gold-rule" style={{ flex: 1 }} />
    </div>
  );
}
