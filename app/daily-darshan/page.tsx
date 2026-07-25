import type { Metadata } from "next";
import Link from "next/link";
import { docs } from "@/lib/content";
import { site, appLinks } from "@/lib/site";
import { LightboxImage } from "@/components/lightbox-image";
import { DailyVerse } from "@/components/daily-verse";

export const metadata: Metadata = {
  title: "Daily Darshan",
  description:
    "A moment of darshan for today: an image of Shri Radha Krishna and a verse to sit with. A quiet minute, every day.",
  alternates: { canonical: "/daily-darshan" },
};

/** Same day-of-year rotation the verse uses, so image and verse change together. */
function dayIndex(len: number) {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const day = Math.floor((now.getTime() - start.getTime()) / 864e5);
  return len ? day % len : 0;
}

export const revalidate = 3600;

export default function DailyDarshanPage() {
  const art = docs.filter((d) => d.image && d.type !== "hub");
  const today = art.length ? art[dayIndex(art.length)] : null;

  return (
    <div className="container max-w-3xl py-14 md:py-20">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
          Daily Darshan
        </p>
        <h1 className="mt-2 text-balance font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
          A minute with Radha Krishna
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Today&apos;s darshan and a verse to carry with you. It changes each
          day, so come back tomorrow.
        </p>
      </div>

      {today ? (
        <div className="mt-10">
          <LightboxImage
            src={today.image!}
            alt={today.imageAlt ?? today.title}
            caption={today.imageAlt}
            priority
          />
          <p className="mt-3 text-center text-sm text-muted-foreground">
            From{" "}
            <Link href={today.url} className="font-medium hover:text-divine">
              {today.title}
            </Link>
          </p>
        </div>
      ) : null}

      <div className="mt-12">
        <DailyVerse />
      </div>

      <div className="mt-12 rounded-2xl border border-gold/25 bg-gold/5 p-6 text-center">
        <h2 className="font-serif text-xl font-semibold">
          Keep the Gita with you
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Read and listen to every verse in Hindi and English, free, from the{" "}
          {site.foundation.label}.
        </p>
        <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={appLinks.ios}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics="darshan-ios"
            className="rounded-full bg-divine px-6 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            Get it on iPhone
          </a>
          <a
            href={appLinks.android}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics="darshan-android"
            className="rounded-full border border-border px-6 py-2.5 text-sm font-semibold transition-colors hover:border-gold/50 hover:text-divine"
          >
            Get it on Android
          </a>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link href="/images" className="text-sm font-medium hover:text-divine">
          Browse all the images
        </Link>
      </div>
    </div>
  );
}
