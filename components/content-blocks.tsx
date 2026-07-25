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
  occurrences: {
    year: number;
    date: string;
    smarta?: string;
    vaishnava?: string;
    note?: string;
  }[];
}) {
  if (!occurrences?.length) return null;
  const today = new Date().toISOString().slice(0, 10);
  // Only years still ahead of us. A festival page is read to find out when the
  // next one falls, so a date that has already passed is noise, and leaving one
  // on the page makes the whole thing look stale. This filters at render, so the
  // block stays right even if nobody prunes the frontmatter.
  const sorted = [...occurrences]
    .filter((o) => (o.vaishnava ?? o.date).slice(0, 10) >= today)
    .sort((a, b) => a.year - b.year);
  if (!sorted.length) return null;
  const next = sorted.find((o) => (o.vaishnava ?? o.date).slice(0, 10) >= today);
  // The general (smarta) day leads, since that is what most visitors keep.

  // velite's isodate() yields a full ISO datetime ("2026-09-04T00:00:00.000Z"),
  // but hand-written frontmatter may be a bare "2026-09-04". Normalise to the
  // date part and read it as UTC so the day never shifts by timezone.
  const fmt = (iso: string) =>
    new Date(`${iso.slice(0, 10)}T00:00:00Z`).toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });

  // Ashtami can span midnight, in which case the smarta and vaishnava
  // sampradayas keep consecutive days. Both are correct; the page shows both
  // rather than quietly picking one.
  const split = (o: (typeof sorted)[number]) =>
    o.smarta && o.vaishnava && o.smarta !== o.vaishnava;

  return (
    <section className="mt-8 rounded-2xl border border-gold/30 bg-gold/5 p-6">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
        When {title} falls
      </p>

      {next ? (
        <div className="mb-4">
          {split(next) ? (
            <div className="space-y-2">
              <p className="text-lg font-medium text-foreground">
                {fmt(next.smarta!)}
                <span className="block text-sm font-normal text-muted-foreground">
                  Most households, the Smarta reckoning
                </span>
              </p>
              <p className="text-base font-medium text-foreground/90">
                {fmt(next.vaishnava!)}
                <span className="block text-sm font-normal text-muted-foreground">
                  Vaishnava sampradayas, and the temples of Mathura and Vrindavan
                </span>
              </p>
            </div>
          ) : (
            <p className="text-lg font-medium text-foreground">
              Next: {fmt(next.smarta ?? next.date)}
            </p>
          )}
          {next.note ? (
            <p className="mt-1 text-sm text-muted-foreground">{next.note}</p>
          ) : null}
        </div>
      ) : null}

      <p className="mt-4 border-t border-gold/20 pt-3 text-sm text-muted-foreground">
        The date moves each year with the lunar calendar. Where two days are
        shown, the tithi spans midnight: most households keep the earlier day,
        and the Vaishnava sampradayas, including ISKCON and the temples of Braj,
        keep the later one. Both are correct within their own tradition.
      </p>
    </section>
  );
}
