import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="hero-wash">
      <div className="container flex min-h-[70svh] flex-col items-center justify-center py-20 text-center">
        <Image
          src="/brand/morpankh.png"
          alt=""
          width={72}
          height={72}
          className="mb-6 size-16 rounded-full opacity-90"
        />
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[hsl(196_74%_26%)]">
          Radhe Radhe
        </p>
        <h1 className="max-w-xl text-balance font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
          This page is still being written
        </h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          We are adding new stories, prayers, festivals, and temples every week.
          This one is on its way. Explore what is here in the meantime.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild variant="divine" size="lg">
            <Link href="/">Return home</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/daily-darshan">Begin Daily Darshan</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
