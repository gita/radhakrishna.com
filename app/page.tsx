import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { GoldFiligree } from "@/components/motifs";

const startHere = [
  {
    title: "Who are Radha & Krishna?",
    href: "/radha-krishna",
    blurb: "The divine couple at the heart of bhakti.",
  },
  {
    title: "Their story",
    href: "/stories",
    blurb: "From Vrindavan to the Raas Lila and beyond.",
  },
  {
    title: "The meaning of their love",
    href: "/teachings/what-radha-krishna-love-symbolizes",
    blurb: "Why their love is the soul's love for God.",
  },
  {
    title: "Why worshipped together",
    href: "/radha-krishna/why-worshipped-together",
    blurb: "Radha before Krishna, always.",
  },
];

const popularQuestions = [
  [
    "Were Radha and Krishna married?",
    "/questions/why-did-krishna-not-marry-radha",
  ],
  [
    "Why did Krishna leave Vrindavan?",
    "/questions/why-did-krishna-leave-vrindavan",
  ],
  ["Who was Radha?", "/radha"],
  ["What happened to Radha?", "/questions/how-did-radha-die"],
  [
    "Is Radha an incarnation of Lakshmi?",
    "/questions/is-radha-an-incarnation-of-lakshmi",
  ],
  [
    "What does their love symbolize?",
    "/teachings/what-radha-krishna-love-symbolizes",
  ],
];

export default function HomePage() {
  return (
    <>
      {/* Hero — immersive full-bleed leela art */}
      <section className="relative -mt-16 flex min-h-[92svh] items-end overflow-hidden">
        {/* Art-directed: portrait on phones, landscape on larger screens */}
        <Image
          src="/images/hero/radha-krishna-jhoola-portrait.webp"
          alt="Radha and Krishna together on a flower swing in a luminous Vrindavan garden at golden morning, painterly devotional art"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center sm:hidden"
        />
        <Image
          src="/images/hero/radha-krishna-jhoola.webp"
          alt=""
          fill
          sizes="100vw"
          className="hidden object-cover object-center sm:block"
        />
        {/* Scrims: soft top for the header, warm bottom for legibility */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/20 to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-t from-black/75 via-black/35 to-transparent sm:h-[60%]"
        />
        <div className="container relative z-10 pb-16 pt-28 md:pb-24">
          <div className="max-w-2xl [text-shadow:0_2px_18px_rgba(0,0,0,0.35)]">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-gold">
              The digital home of Shri Radha Krishna
            </p>
            <h1 className="text-balance font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
              Experience the Divine Love of Radha Krishna
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/85">
              Explore their stories, teachings, sacred prayers, bhajans,
              temples, and timeless meaning across Hindu traditions.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild variant="gold" size="lg">
                <Link href="/radha-krishna">Explore Radha Krishna</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="border border-white/40 bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
              >
                <Link href="/daily-darshan">Begin Daily Darshan</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-transparent text-white hover:bg-white/10"
              >
                <a href="https://bhagavadgita.com/gitagpt">Ask Krishna AI</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <GoldFiligree className="container my-10" />

      {/* Start here */}
      <section className="container py-16">
        <SectionHeading eyebrow="Start here" title="Four paths in" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {startHere.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-gold/60"
            >
              <h3 className="font-serif text-lg font-semibold text-card-foreground group-hover:text-divine">
                {card.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{card.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular questions */}
      <section className="container py-16">
        <SectionHeading
          eyebrow="Popular questions"
          title="The questions people ask most"
        />
        <div className="mx-auto mt-10 grid max-w-3xl gap-2">
          {popularQuestions.map(([q, href]) => (
            <Link
              key={href}
              href={href}
              className="flex items-center justify-between gap-4 rounded-lg border border-transparent px-4 py-3.5 text-left transition-colors hover:border-border hover:bg-secondary/60"
            >
              <span className="font-medium">{q}</span>
              <span aria-hidden className="text-gold">
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-balance font-serif text-3xl font-semibold tracking-tight">
        {title}
      </h2>
    </div>
  );
}
