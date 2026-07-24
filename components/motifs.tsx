import type { SVGProps } from "react";

/**
 * Reusable devotional motifs (docs/04). Pure inline SVG, currentColor-driven,
 * decorative by default (aria-hidden). Restraint over decoration.
 */

export function Peacock({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {/* Peacock feather eye — a calm brand mark */}
      <path
        d="M20 3C13 9 13 24 20 34C27 24 27 9 20 3Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <ellipse
        cx="20"
        cy="16"
        rx="4.6"
        ry="6.2"
        stroke="currentColor"
        strokeWidth="1.2"
        className="text-jade"
      />
      <circle
        cx="20"
        cy="16"
        r="2.4"
        fill="currentColor"
        className="text-gold"
      />
      <path
        d="M20 34v3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
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
