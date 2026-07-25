#!/usr/bin/env node
/**
 * Guards a formatting-only change to FAQ answers.
 *
 * Breaking a long answer into paragraphs is meant to change how it looks, never
 * what it says. Every claim in these answers was verified against scripture and
 * named sources, so a sentence quietly reworded during a reflow would undo that
 * work without anyone noticing. This snapshots each answer with whitespace
 * collapsed, which makes a paragraph break invisible to it and a changed word
 * impossible to miss.
 *
 * It reads .velite/content.json rather than parsing the MDX itself, so it checks
 * what actually ships after velite has parsed the frontmatter.
 *
 *   npm run build:content && node scripts/check-faq-text.mjs --save
 *   npm run build:content && node scripts/check-faq-text.mjs
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const SNAPSHOT = ".faq-snapshot.json";
const CONTENT = ".velite/content.json";

if (!existsSync(CONTENT)) {
  console.error(`No ${CONTENT}. Run the content build first.`);
  process.exit(2);
}

const norm = (s) => s.replace(/\s+/g, " ").trim();
const docs = Object.values(JSON.parse(readFileSync(CONTENT, "utf8")));

const current = {};
for (const doc of docs) {
  if (!doc.faq?.length) continue;
  current[doc.url] = doc.faq.map((f) => ({
    question: norm(f.question),
    answer: norm(f.answer),
  }));
}

if (process.argv.includes("--save")) {
  writeFileSync(SNAPSHOT, JSON.stringify(current, null, 2));
  const n = Object.values(current).flat().length;
  console.log(`Saved ${n} answers across ${Object.keys(current).length} pages.`);
  process.exit(0);
}

if (!existsSync(SNAPSHOT)) {
  console.error(`No ${SNAPSHOT}. Run with --save before reformatting.`);
  process.exit(2);
}

const before = JSON.parse(readFileSync(SNAPSHOT, "utf8"));
const problems = [];

for (const [url, answers] of Object.entries(before)) {
  const now = current[url];
  if (!now) {
    problems.push(`${url}: FAQ block has disappeared`);
    continue;
  }
  if (now.length !== answers.length) {
    problems.push(`${url}: had ${answers.length} answers, now has ${now.length}`);
    continue;
  }
  answers.forEach((a, i) => {
    if (now[i].question !== a.question)
      problems.push(
        `${url} Q${i + 1}: question changed\n      was: ${a.question}\n      now: ${now[i].question}`,
      );
    if (now[i].answer !== a.answer)
      problems.push(
        `${url} Q${i + 1}: answer changed\n      was: ${a.answer}\n      now: ${now[i].answer}`,
      );
  });
}

for (const url of Object.keys(current))
  if (!before[url]) problems.push(`${url}: new FAQ block, not in the snapshot`);

if (problems.length) {
  console.error(`${problems.length} FAQ answer(s) changed in wording, not just formatting:\n`);
  problems.forEach((p) => console.error("  " + p + "\n"));
  process.exit(1);
}

// The point of the reflow: report how many answers actually gained a break, and
// flag long ones still sitting in a single block.
const all = Object.values(current).flat();
let split = 0;
const stillLong = [];
for (const doc of docs) {
  for (const f of doc.faq ?? []) {
    const multi = /\n/.test(f.answer.trim());
    if (multi) split++;
    else if (norm(f.answer).split(" ").length > 55)
      stillLong.push(`${doc.url}: "${norm(f.question)}" (${norm(f.answer).split(" ").length} words)`);
  }
}

console.log(
  `All ${all.length} FAQ answers are word-for-word identical to the snapshot.\n` +
    `${split} of ${all.length} render as multiple paragraphs.`,
);
if (stillLong.length) {
  console.log(`\n${stillLong.length} answer(s) over 55 words still in one block:`);
  stillLong.forEach((s) => console.log("  " + s));
}
