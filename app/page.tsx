import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GoldFiligree, Lotus } from "@/components/motifs";

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
      {/* Hero */}
      <section className="hero-wash">
        <div className="container flex flex-col items-center py-20 text-center md:py-28">
          <Lotus className="mb-6 size-9 animate-fade-in text-gold" />
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-divine">
            The digital home of Shri Radha Krishna
          </p>
          <h1 className="max-w-3xl text-balance font-serif text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
            Experience the Divine Love of Radha Krishna
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Explore their stories, teachings, sacred prayers, bhajans, temples,
            and timeless meaning across Hindu traditions.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="divine" size="lg">
              <Link href="/radha-krishna">Explore Radha Krishna</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/daily-darshan">Begin Daily Darshan</Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <a href="https://bhagavadgita.com/gitagpt">Ask Krishna AI</a>
            </Button>
          </div>
        </div>
      </section>

      <GoldFiligree className="container my-4" />

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
