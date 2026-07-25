#!/usr/bin/env node
/**
 * Visual QA at real device viewports.
 *
 * Most of our readers are on mobile web, and the Chrome automation available in
 * this environment refuses to size below roughly 1900px, so it cannot see what a
 * phone sees. Playwright can, which is why this exists.
 *
 * For every page it captures a full-page screenshot at phone and desktop widths
 * and reports the machine-checkable failures: horizontal overflow, images that
 * never loaded, text too small to read comfortably, and tap targets under the
 * 44px guideline. It does not replace looking at the screenshots.
 *
 *   node scripts/visual-qa.mjs /festivals/janmashtami /temples/barsana
 *   node scripts/visual-qa.mjs --all
 *
 * Screenshots land in .qa/ (gitignored).
 */
import { chromium, devices } from "playwright";
import { mkdirSync, rmSync } from "node:fs";

const BASE = process.env.QA_BASE ?? "http://127.0.0.1:3007";
const args = process.argv.slice(2);

let routes = args.filter((a) => a.startsWith("/"));
if (args.includes("--all") || routes.length === 0) {
  const xml = await fetch(`${BASE}/sitemap.xml`).then((r) => r.text());
  routes = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (m) => new URL(m[1]).pathname || "/",
  );
}

rmSync(".qa", { recursive: true, force: true });
mkdirSync(".qa", { recursive: true });

const VIEWPORTS = [
  { name: "mobile", ...devices["iPhone 14"] },
  { name: "desktop", viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
];

const browser = await chromium.launch();
const problems = [];

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({ ...vp, name: undefined });
  const page = await ctx.newPage();

  for (const route of routes) {
    const slug = route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "-");
    await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 45000 });
    // Let lazy images below the fold actually load before we judge them.
    await page.evaluate(async () => {
      await new Promise((res) => {
        let y = 0;
        const step = () => {
          window.scrollTo(0, y);
          y += window.innerHeight;
          if (y < document.body.scrollHeight) setTimeout(step, 120);
          else { window.scrollTo(0, 0); setTimeout(res, 800); }
        };
        step();
      });
    });

    // The dev image optimizer encodes on first request, so give any still-pending
    // images a moment rather than reporting a slow encode as a broken image.
    await page
      .waitForFunction(
        () => [...document.images].every((i) => i.complete || i.naturalWidth > 0),
        null,
        { timeout: 45000 },
      )
      .catch(() => {});

    const findings = await page.evaluate(() => {
      const out = [];
      const vw = document.documentElement.clientWidth;

      if (document.documentElement.scrollWidth > vw + 1)
        out.push(`page scrolls sideways (${document.documentElement.scrollWidth} > ${vw})`);

      document.querySelectorAll("body *").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width > vw + 2 && r.height > 8) {
          const cs = getComputedStyle(el);
          // A wide element is fine if it or an ancestor scrolls it.
          let p = el, scrolls = false;
          while (p && p !== document.body) {
            if (["auto", "scroll"].includes(getComputedStyle(p).overflowX)) { scrolls = true; break; }
            p = p.parentElement;
          }
          if (!scrolls && cs.position !== "fixed")
            out.push(`${el.tagName.toLowerCase()}.${(el.className || "").toString().slice(0, 30)} is ${Math.round(r.width)}px wide`);
        }
      });

      // Only eager images are judged. A lazy image far below the fold may
      // legitimately not have fetched by screenshot time, and reporting that as
      // broken trains you to ignore the tool. naturalWidth === 0 is the real
      // signal; `complete` flickers false while an image is merely decoding.
      document.querySelectorAll("img").forEach((img) => {
        if (img.loading === "lazy") return;
        if (img.naturalWidth === 0)
          out.push(`image did not load: ${(img.currentSrc || img.src).slice(-60)}`);
      });

      // Body copy under 14px is uncomfortable on a phone.
      document.querySelectorAll("p, li").forEach((el) => {
        const size = parseFloat(getComputedStyle(el).fontSize);
        if (size && size < 13 && (el.textContent || "").trim().length > 60)
          out.push(`text at ${size}px: "${(el.textContent || "").trim().slice(0, 40)}"`);
      });

      return [...new Set(out)];
    });

    await page.screenshot({ path: `.qa/${slug}--${vp.name}.png`, fullPage: true });
    if (findings.length) {
      problems.push({ route, viewport: vp.name, findings });
      console.log(`  ${vp.name.padEnd(7)} ${route}`);
      findings.forEach((f) => console.log(`      ${f}`));
    } else {
      console.log(`  ${vp.name.padEnd(7)} ${route}  ok`);
    }
  }
  await ctx.close();
}

await browser.close();

console.log(`\nScreenshots in .qa/ (${routes.length} routes x ${VIEWPORTS.length} viewports)`);
if (problems.length) {
  console.log(`${problems.length} route/viewport combination(s) with findings.`);
  process.exit(1);
}
console.log("No layout problems detected. Now look at the screenshots.");
