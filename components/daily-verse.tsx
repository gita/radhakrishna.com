"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DAILY_VERSES, TRANSLATOR } from "@/lib/daily-verses";

/**
 * Today's Devotion. Rotates by day of year through the curated pool in
 * lib/daily-verses.ts, which is generated from the foundation's own Gita dataset
 * so every quote is verbatim from a named translation, never written from memory.
 */

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
    setI(dayOfYear(new Date()) % DAILY_VERSES.length);
  }, []);
  const v = DAILY_VERSES[i];

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
      <p
        className={`mt-1 text-xs ${tone === "dark" ? "text-indigo-foreground/60" : "text-muted-foreground"}`}
      >
        Translation by {TRANSLATOR}
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
