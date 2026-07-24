import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { GoldFiligree } from "@/components/motifs";

const explore = [
  {
    title: "Their Stories",
    blurb: "Raas Lila, Vrindavan, the flute, the leelas.",
    href: "/stories",
    image: "/images/sections/krishna-flute.webp",
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
    tint: "from-divine/15 to-jade/10",
  },
  {
    title: "Images & Wallpapers",
    blurb: "Original art, quote cards, HD wallpapers to share.",
    href: "/images",
    tint: "from-lotus/20 to-gold/10",
  },
  {
    title: "Daily Darshan",
    blurb: "A verse, a reflection, and a darshan each day.",
    href: "/daily-darshan",
    tint: "from-gold/15 to-primary/10",
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

const network = [
  {
    label: "Bhagavad Gita",
    note: "Read the Gita, verse by verse",
    href: "https://bhagavadgita.com",
  },
  {
    label: "Ved Vyas",
    note: "The scriptures & the foundation",
    href: "https://vedvyas.com",
  },
  {
    label: "Gita GPT",
    note: "Ask the Gita, powered by AI",
    href: "https://bhagavadgita.com/gitagpt",
  },
  {
    label: "Bhagavad Gita App",
    note: "iOS & Android",
    href: "https://bhagavadgita.com/bhagavad-gita-app",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero — art framed and unobstructed; text in its own clean zone */}
      <section className="hero-wash">
        <div className="container grid items-center gap-10 py-14 md:min-h-[86svh] md:grid-cols-2 md:gap-14 md:py-16">
          {/* Art */}
          <div className="relative order-1 md:order-2">
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-gold/20 via-transparent to-divine/20 blur-2xl" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] ring-1 ring-gold/25 shadow-[0_30px_80px_-30px_rgba(31,42,74,0.45)] sm:aspect-[3/4]">
              <Image
                src="/images/hero/radha-krishna-jhoola-portrait.webp"
                alt="Radha and Krishna together on a flower swing in a luminous Vrindavan garden at golden morning, painterly devotional art"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover object-top"
              />
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

      <GoldFiligree className="container my-8" />

      {/* Explore the world */}
      <section className="container py-14">
        <SectionHeading
          eyebrow="Explore"
          title="The world of Radha Krishna"
          sub="Stories, prayers, festivals, temples, and daily devotion, all in one place."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {explore.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-[0_22px_50px_-28px_rgba(31,42,74,0.45)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {c.image ? (
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                ) : (
                  <div
                    className={`flex h-full items-center justify-center bg-gradient-to-br ${c.tint}`}
                  >
                    <span className="font-dev text-5xl text-gold/70">ॐ</span>
                  </div>
                )}
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
        <div className="relative overflow-hidden rounded-[1.75rem] bg-indigo px-6 py-14 text-center text-indigo-foreground sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 0%, hsl(var(--gold) / 0.18), transparent 70%)",
            }}
          />
          <div className="relative mx-auto max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Today&apos;s Devotion
            </p>
            <p className="font-dev text-2xl leading-relaxed text-gold sm:text-3xl">
              श्री राधे कृष्ण
            </p>
            <p className="mt-5 font-serif text-xl italic leading-relaxed text-indigo-foreground/90 sm:text-2xl">
              &ldquo;Wherever there is Krishna, the master of all mystics, and
              wherever there is Radha, there will be beauty, victory, and
              devotion.&rdquo;
            </p>
            <div className="mt-8">
              <Button asChild variant="gold" size="lg">
                <Link href="/daily-darshan">Begin Daily Darshan</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular questions */}
      <section className="container py-14">
        <SectionHeading
          eyebrow="Popular questions"
          title="The questions people ask most"
        />
        <div className="mx-auto mt-10 grid max-w-3xl gap-2">
          {popularQuestions.map(([q, href]) => (
            <Link
              key={href}
              href={href}
              className="flex items-center justify-between gap-4 rounded-xl border border-transparent px-4 py-4 text-left transition-colors hover:border-border hover:bg-secondary/60"
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
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {network.map((n) => (
              <a
                key={n.href}
                href={n.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-gold/50"
              >
                <h3 className="font-serif text-lg font-semibold group-hover:text-divine">
                  {n.label}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{n.note}</p>
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
    <div className="text-center">
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
