import Link from "next/link";
import Image from "next/image";
import { nav, site } from "@/lib/site";

/**
 * Server-rendered header. Mobile menu is a native <details> disclosure, so the
 * whole header ships zero client JS (docs/03 §4 performance budget).
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label={`${site.name} home`}
        >
          <Image
            src="/brand/morpankh.png"
            alt=""
            width={40}
            height={40}
            priority
            className="size-9 rounded-full"
          />
          <span className="font-serif text-lg font-semibold tracking-tight">
            Radhakrishna<span className="text-gold">.com</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <details className="relative lg:hidden">
          <summary
            className="flex size-10 cursor-pointer list-none items-center justify-center rounded-md border border-border text-foreground/80 [&::-webkit-details-marker]:hidden"
            aria-label="Open menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </summary>
          <nav
            className="absolute right-0 mt-2 w-56 rounded-lg border border-border bg-card p-2 shadow-lg"
            aria-label="Primary"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md px-3 py-2 text-sm font-medium text-card-foreground/80 hover:bg-secondary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
