import Link from "next/link";
import Image from "next/image";
import type { Doc } from "@/lib/content";

/**
 * The direct answer to the page's question. Distinct from Key takeaways: this is
 * one self-contained paragraph a reader (or an AI answer engine) can lift whole.
 */
export function ShortAnswer({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-8 rounded-2xl border border-gold/30 bg-gold/5 p-6">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
        The short answer
      </p>
      <p className="text-lg leading-relaxed text-foreground">{children}</p>
    </div>
  );
}

/** The scannable version of the whole page. */
export function KeyTakeaways({ items }: { items: string[] }) {
  if (!items?.length) return null;
  return (
    <div className="mt-6 rounded-2xl border border-border bg-secondary/40 p-6">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-divine">
        Key takeaways
      </p>
      <ul className="list-disc space-y-1.5 pl-5 text-foreground/90">
        {items.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

/**
 * FAQ rendered as its own carded section so it stops blending into the prose.
 * Answers stay in the DOM and visible (not collapsed) so they remain easy to
 * extract for answer engines.
 */
export function FaqBlock({
  faq,
}: {
  faq: { question: string; answer: string }[];
}) {
  if (!faq?.length) return null;
  return (
    <section className="mt-14">
      <div className="mb-5 flex items-center gap-3">
        <h2 className="font-serif text-2xl font-semibold tracking-tight">
          Frequently asked questions
        </h2>
        <span className="h-px flex-1 bg-gold/40" />
      </div>
      <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
        {faq.map((f) => (
          <div key={f.question} className="p-5 sm:p-6">
            <h3 className="font-serif text-lg font-semibold text-foreground">
              {f.question}
            </h3>
            <p className="mt-2 leading-relaxed text-foreground/85">{f.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * Related reading as fixed-height image cards on a single row, so the section
 * reads as a deliberate shelf rather than ragged text boxes.
 */
export function RelatedCards({
  items,
  title = "Continue reading",
}: {
  items: Doc[];
  title?: string;
}) {
  if (!items?.length) return null;
  return (
    <section className="mt-14 border-t border-border pt-8">
      <h2 className="font-serif text-xl font-semibold">{title}</h2>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.slice(0, 3).map((r) => (
          <Link
            key={r.url}
            href={r.url}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-md"
          >
            <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-secondary">
              {r.image ? (
                <Image
                  src={r.image}
                  alt={r.imageAlt ?? r.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                />
              ) : null}
            </div>
            <div className="flex flex-1 flex-col p-4">
              <h3 className="line-clamp-2 font-serif text-base font-semibold leading-snug group-hover:text-divine">
                {r.title}
              </h3>
              {r.description ? (
                <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                  {r.description}
                </p>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/**
 * When a festival falls. Lunar dates move each year, so the page lists the years
 * it knows and marks the next one. A year we have not filled in yet shows as
 * absent rather than as a wrong date.
 */
export function FestivalDates({
  title,
  occurrences,
}: {
  title: string;
  occurrences: { year: number; date: string; note?: string }[];
}) {
  if (!occurrences?.length) return null;
  const sorted = [...occurrences].sort((a, b) => a.year - b.year);
  const today = new Date().toISOString().slice(0, 10);
  const next = sorted.find((o) => o.date >= today);

  const fmt = (iso: string) =>
    new Date(iso + "T00:00:00Z").toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });

  return (
    <section className="mt-8 rounded-2xl border border-gold/30 bg-gold/5 p-6">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
        When {title} falls
      </p>
      {next ? (
        <p className="text-lg font-medium text-foreground">
          Next: {fmt(next.date)}
          {next.note ? (
            <span className="text-muted-foreground"> ({next.note})</span>
          ) : null}
        </p>
      ) : null}
      <ul className="mt-3 space-y-1 text-sm text-foreground/85">
        {sorted.map((o) => (
          <li key={o.year} className={o.date < today ? "text-muted-foreground" : ""}>
            <span className="font-medium tabular-nums">{o.year}</span>
            {" \u00b7 "}
            {fmt(o.date)}
            {o.note ? <span className="text-muted-foreground"> ({o.note})</span> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
