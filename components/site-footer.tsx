import Link from "next/link";
import Image from "next/image";
import { nav, network, social, site } from "@/lib/site";

/** Server-rendered footer. Carries the org entity graph (docs/03 §8). */
export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="container grid gap-10 py-14 md:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <Image
              src="/brand/logo.png"
              alt=""
              width={40}
              height={40}
              className="size-9 rounded-full"
            />
            <span className="font-serif text-lg font-semibold">
              Radhakrishna<span className="text-gold">.com</span>
            </span>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground">
            {site.tagline}. Stories, teachings, prayers, festivals, and temples
            of Shri Radha Krishna.
          </p>
        </div>

        <FooterCol title="Explore" links={nav} />
        <FooterCol title="Our network" links={network} external />

        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Follow
          </h3>
          <ul className="space-y-2 text-sm">
            {social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className="text-foreground/75 transition-colors hover:text-divine"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="container flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. Radhey Radhey.
          </p>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-foreground">
              About
            </Link>
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
  external,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
  external?: boolean;
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      <ul className="space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            {external ? (
              <a
                href={l.href}
                className="text-foreground/75 transition-colors hover:text-divine"
                target="_blank"
                rel="noopener noreferrer"
              >
                {l.label}
              </a>
            ) : (
              <Link
                href={l.href}
                className="text-foreground/75 transition-colors hover:text-divine"
              >
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
