import Link from "next/link";
import Image from "next/image";
import { nav, site } from "@/lib/site";
import { MobileNav } from "@/components/mobile-nav";

/**
 * Server-rendered header. Only the mobile menu is a client component, because a
 * menu has to close when you tap away from it (docs/03 §4 performance budget).
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

        <MobileNav />
      </div>
    </header>
  );
}
