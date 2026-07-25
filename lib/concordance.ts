import { concordance } from "#content";

export type ConcordanceClaim = (typeof concordance)[number];
export type ConcordanceTopic = ConcordanceClaim["topic"];

/**
 * The Radha Krishna Scripture Concordance (docs/01 §5, P1-4).
 *
 * A named, versioned, citable dataset: what each named text and each sampradaya
 * actually says about Radha's marriage, her husband, her identity. Nobody else
 * assembles this, which is exactly why it is worth assembling.
 *
 * Bump the version when a claim is added, corrected or relabelled, and record
 * what changed in docs/DECISIONS.md. Anyone citing a row needs to be able to say
 * which version they cited.
 */
export const CONCORDANCE_VERSION = "1.0";

/** Sort order for the "How to read it" column: nearest to scripture first. */
const LABEL_RANK: Record<ConcordanceClaim["label"], number> = {
  "explicitly in scripture": 0,
  "later devotional literature": 1,
  "taught within a tradition": 2,
  "folk legend": 3,
  "modern retelling": 4,
};

export const CLAIMS: ConcordanceClaim[] = [...concordance]
  // A YAML folded scalar keeps a trailing newline, and these render as table cells.
  .map((c) => ({ ...c, says: c.says.trim() }))
  .sort(
    (a, b) =>
      LABEL_RANK[a.label] - LABEL_RANK[b.label] ||
      a.source.localeCompare(b.source),
  );

/** Every claim on one question, scripture first. */
export function concordanceBy(topic: ConcordanceTopic): ConcordanceClaim[] {
  return CLAIMS.filter((c) => c.topic === topic);
}

export const TOPICS: { id: ConcordanceTopic; question: string }[] = [
  { id: "marriage", question: "Did Radha and Krishna marry?" },
  { id: "husband", question: "Who was Radha's husband?" },
  { id: "identity", question: "Who is Radha, and what is she said to be?" },
  { id: "rukmini", question: "How do Radha and Rukmini relate?" },
  { id: "death", question: "What do the texts say about Radha's passing?" },
];

/** Topics that actually have claims, so an empty section is never rendered. */
export function populatedTopics() {
  return TOPICS.filter((t) => concordanceBy(t.id).length > 0);
}
