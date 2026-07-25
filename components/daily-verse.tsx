"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * Today's Devotion — rotates daily through a small pool of real, correctly
 * attributed Bhagavad Gita verses. Client-side so it advances each day the
 * reader visits. The full Daily Darshan (fresh image + reflection + mantra
 * audio via a daily job) is the planned daily engine (docs/05 Phase 5).
 */
const VERSES = [
  {
    quote:
      "To those who are ever devoted and worship Me with love, I give the understanding by which they come to Me.",
    source: "Bhagavad Gita 9.22",
  },
  {
    quote:
      "Fix your mind on Me alone, rest your intellect in Me, and you will dwell in Me. Of this there is no doubt.",
    source: "Bhagavad Gita 12.8",
  },
  {
    quote:
      "Fix your mind on Me, be devoted to Me, worship Me, and offer your reverence to Me. You will surely come to Me.",
    source: "Bhagavad Gita 9.34",
  },
  {
    quote:
      "In whatever way people surrender to Me, I receive them. The path they follow, in every way, is Mine.",
    source: "Bhagavad Gita 4.11",
  },
  {
    quote:
      "For one who sees Me everywhere and sees all things in Me, I am never lost, nor is that soul ever lost to Me.",
    source: "Bhagavad Gita 6.30",
  },
  {
    quote:
      "Give up every other path and take shelter in Me alone. I will free you from all that binds you. Do not grieve.",
    source: "Bhagavad Gita 18.66",
  },
];

function dayOfYear(d: Date) {
  const start = new Date(d.getFullYear(), 0, 0);
  const diff = d.getTime() - start.getTime();
  return Math.floor(diff / 86400000);
}

/** `showCta` is off on the Daily Darshan page itself, where the button would
 *  otherwise link to the page the reader is already on. */
export function DailyVerse({
  showCta = true,
  tone = "dark",
}: { showCta?: boolean; tone?: "dark" | "light" } = {}) {
  // "dark" is the homepage panel, where the type sits on deep indigo. "light" is
  // a plain cream page, where that same light type would be unreadable.
  const quoteTone =
    tone === "dark" ? "text-indigo-foreground/90" : "text-foreground/90";
  // Render a stable verse on the server, then advance to today's on the client.
  const [i, setI] = useState(0);
  useEffect(() => {
    setI(dayOfYear(new Date()) % VERSES.length);
  }, []);
  const v = VERSES[i];

  return (
    <div className="relative mx-auto max-w-2xl">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        Today&apos;s Devotion
      </p>
      <p className="font-dev text-2xl leading-relaxed text-gold sm:text-3xl">
        श्री राधे कृष्ण
      </p>
      <p className={`mt-5 font-serif text-xl italic leading-relaxed sm:text-2xl ${quoteTone}`}>
        &ldquo;{v.quote}&rdquo;
      </p>
      <p className={`mt-4 text-sm uppercase tracking-[0.14em] ${tone === "dark" ? "text-gold/90" : "text-gold"}`}>
        {v.source}
      </p>
      {showCta ? (
        <div className="mt-8">
          <Link
            href="/daily-darshan"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-background px-7 text-base font-medium text-indigo shadow-sm transition-colors hover:bg-background/90"
          >
            Begin Daily Darshan
          </Link>
        </div>
      ) : null}
    </div>
  );
}
