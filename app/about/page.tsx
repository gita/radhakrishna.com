import type { Metadata } from "next";
import { ogMeta } from "@/lib/og";
import Link from "next/link";
import { site, network } from "@/lib/site";

const description =
  "Radhakrishna.com is a project of the Ved Vyas Foundation, a non-profit devoted to making the wisdom of the Bhagavad Gita and the bhakti tradition freely available.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  ...ogMeta({
    title: "About",
    description,
    url: "/about",
    eyebrow: "about",
  }),
};

export default function AboutPage() {
  return (
    <div className="container max-w-2xl py-14 md:py-20">
      <h1 className="text-balance font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
        About this site
      </h1>

      <div className="article-prose prose prose-lg mt-8 max-w-none prose-headings:font-serif prose-headings:font-semibold">
        <p>
          Radhakrishna.com is the digital home of Shri Radha Krishna. It gathers
          their stories, prayers, festivals and temples in one place, written
          plainly and sourced to scripture.
        </p>

        <h2>Who publishes it</h2>
        <p>
          This site is a project of the{" "}
          <a
            href={site.foundation.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {site.foundation.label}
          </a>
          , a non-profit that builds free devotional resources. The same
          foundation publishes the Bhagavad Gita website and app used by readers
          around the world.
        </p>

        <h2>How the pages are written</h2>
        <p>
          Every page names its scripture by chapter and verse, so you can open
          the text and read it yourself. Where the schools differ, the page says
          whose reading you are getting. Gaudiya, Nimbarka, Vallabha, Radha
          Vallabh and Madhva teachers read the same events differently, and that
          difference is part of the answer.
        </p>
        <p>
          You will also see the difference between a Purana and a much loved
          retelling. Some of the most beautiful Radha Krishna stories come from
          later devotional literature or from the oral tradition of Braj. That
          takes nothing away from them. It tells you what kind of source you are
          holding.
        </p>
        <p>
          Where the texts are silent, the page says so rather than filling the
          gap with something confident and invented.
        </p>

        <h2>The art</h2>
        <p>
          The paintings on this site are made for it, in the spirit of Raja Ravi
          Varma and the devotional calendar art of Braj. You can see them
          together in the <Link href="/images">image gallery</Link>.
        </p>

        <h2>Our other sites</h2>
        <ul>
          {network.map((n) => (
            <li key={n.href}>
              <a href={n.href} target="_blank" rel="noopener noreferrer">
                {n.label}
              </a>
              , {n.note.toLowerCase()}
            </li>
          ))}
        </ul>

        <h2>Corrections</h2>
        <p>
          If you find a verse cited wrongly or a tradition described unfairly,
          we want to know. Scripture deserves care, and a correction is always
          welcome.
        </p>
      </div>
    </div>
  );
}
