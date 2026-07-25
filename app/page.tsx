import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { GoldFiligree } from "@/components/motifs";
import { DailyVerse } from "@/components/daily-verse";
import { network } from "@/lib/site";

const explore = [
  {
    title: "Their Stories",
    blurb: "Raas Lila, Vrindavan, the flute, the leelas.",
    href: "/stories",
    image: "/images/sections/raas-lila.webp",
  },
  {
    title: "Festivals",
    blurb: "Radhashtami, Janmashtami, Holi, Ekadashi.",
    href: "/festivals",
    image: "/images/sections/phoolon-ki-holi.webp",
  },
  {
    title: "Temples & Braj",
    blurb: "Banke Bihari, Prem Mandir, Vrindavan, Barsana.",
    href: "/temples",
    image: "/images/sections/vrindavan-temple.webp",
  },
  {
    title: "Prayers & Mantras",
    blurb: "Aartis, bhajans, stotras, with meaning and audio.",
    href: "/mantras",
    image: "/images/sections/prayers.webp",
  },
  {
    title: "Images & Wallpapers",
    blurb: "Original art, quote cards, HD wallpapers to share.",
    href: "/images",
    image: "/images/sections/nauka-vihar.webp",
  },
  {
    title: "Daily Darshan",
    blurb: "A verse, a reflection, and a darshan each day.",
    href: "/daily-darshan",
    image: "/images/sections/daily-darshan.webp",
  },
];

const popularQuestions: [string, string][] = [
  [
    "Were Radha and Krishna married?",
    "/questions/why-did-krishna-not-marry-radha",
  ],
  [
    "Why does Krishna wear a peacock feather?",
    "/questions/why-does-krishna-wear-a-peacock-feather",
  ],
  ["Who is Radha?", "/radha-krishna/who-is-radha"],
  ["What happened to Radha?", "/questions/how-did-radha-die"],
  [
    "Is Radha an incarnation of Lakshmi?",
    "/questions/is-radha-an-incarnation-of-lakshmi",
  ],
  [
    "What does their love symbolize?",
    "/radha-krishna/what-their-love-symbolizes",
  ],
];

export default function HomePage() {
  return (
    <>
      {/* Hero — art framed and unobstructed; text in its own clean zone */}
      <section className="hero-wash">
        <div className="container grid items-center gap-8 py-12 md:grid-cols-2 md:gap-10 md:py-16">
          {/* Art — a rectangle that fills the column */}
          <div className="order-1 md:order-2">
            <div className="relative">
              <div className="ambient-glow pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-tr from-gold/25 via-lotus/10 to-divine/25 blur-2xl" />
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[1.5rem] ring-1 ring-gold/25 shadow-[0_24px_60px_-28px_rgba(31,42,74,0.5)]">
                <Image
                  src="/images/hero/radha-krishna-jhoola.webp"
                  alt="Radha and Krishna together on a flower swing in a luminous Vrindavan garden at golden morning, painterly devotional art"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
          {/* Words */}
          <div className="order-2 text-center md:order-1 md:text-left">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-[hsl(196_74%_26%)]">
              The digital home of Shri Radha Krishna
            </p>
            <h1 className="text-balance font-serif text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl md:text-6xl">
              Experience the Divine Love of Radha Krishna
            </h1>
            <p className="mx-auto mt-6 max-w-md text-lg text-muted-foreground md:mx-0">
              Explore their stories, teachings, sacred prayers, bhajans,
              temples, and timeless meaning across Hindu traditions.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
              <Button asChild variant="divine" size="lg">
                <Link href="/radha-krishna">Explore Radha Krishna</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/daily-darshan">Begin Daily Darshan</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <GoldFiligree className="container my-6" />

      {/* Explore the world */}
      <section className="container py-14">
        <SectionHeading
          eyebrow="Explore"
          title="The world of Radha Krishna"
          sub="Stories, prayers, festivals, temples, and daily devotion, all in one place."
        />
        <div
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          data-reveal
        >
          {explore.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-[0_22px_50px_-28px_rgba(31,42,74,0.45)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-xl font-semibold group-hover:text-divine">
                  {c.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {c.blurb}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Today's devotion — the one rich, deep accent surface */}
      <section className="container py-8">
        <div
          className="relative overflow-hidden rounded-[1.75rem] bg-indigo px-6 py-16 text-center text-indigo-foreground sm:px-12"
          data-reveal
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 0%, hsl(var(--gold) / 0.18), transparent 70%)",
            }}
          />
          <DailyVerse />
        </div>
      </section>

      {/* Popular questions — in a proper boxed list */}
      <section className="container py-14">
        <SectionHeading
          eyebrow="Popular questions"
          title="The questions people ask most"
        />
        <div
          className="mx-auto mt-10 max-w-3xl divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
          data-reveal
        >
          {popularQuestions.map(([q, href]) => (
            <Link
              key={href}
              href={href}
              className="flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-secondary/50"
            >
              <span className="font-medium">{q}</span>
              <span aria-hidden className="text-gold">
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Explore our network */}
      <section className="border-t border-border bg-secondary/30 py-14">
        <div className="container">
          <SectionHeading
            eyebrow="Our network"
            title="Explore our other apps & sites"
          />
          <div
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            data-reveal
          >
            {network.map((n) => (
              <a
                key={n.href}
                href={n.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-[0_18px_40px_-24px_rgba(31,42,74,0.4)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-secondary/50">
                  <Image
                    src={n.image}
                    alt={n.label}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-base font-semibold group-hover:text-divine">
                    {n.label}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{n.note}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="text-center" data-reveal>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-balance font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {sub ? (
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{sub}</p>
      ) : null}
    </div>
  );
}
