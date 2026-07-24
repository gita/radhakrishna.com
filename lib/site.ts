/**
 * Single source of truth for site metadata, navigation, and the org network.
 * Sitemap, metadata, JSON-LD, header, and footer all derive from here so they never drift.
 * Canonical domain = radhakrishna.com (docs/WORKING-LOG.md). Never emit .net URLs.
 */

export const site = {
  name: "Radhakrishna",
  domain: "radhakrishna.com",
  url: "https://radhakrishna.com",
  title: "Radhakrishna.com · The Divine Love of Radha Krishna",
  foundation: { label: "Ved Vyas Foundation", href: "https://vedvyas.com" },
  tagline: "The digital home of Shri Radha Krishna",
  description:
    "Explore the stories, teachings, sacred prayers, bhajans, festivals, and temples of Radha Krishna, explained with real scripture and shown with beautiful, original art.",
  locale: "en",
} as const;

/** Primary navigation (docs/02 §8). */
export const nav = [
  { label: "Radha Krishna", href: "/radha-krishna" },
  { label: "Stories", href: "/stories" },
  { label: "Questions", href: "/questions" },
  { label: "Prayers", href: "/mantras" },
  { label: "Festivals", href: "/festivals" },
  { label: "Temples", href: "/temples" },
  { label: "Images", href: "/images" },
  { label: "Daily Darshan", href: "/daily-darshan" },
] as const;

/**
 * The org network (docs/03 §8, DECISIONS Q5). URLs confirmed from bg-frontend.
 * Hanuman Chalisa URL pending founder confirmation.
 */
export const network = [
  {
    label: "Bhagavad Gita",
    note: "Read the Gita, verse by verse",
    href: "https://bhagavadgita.com",
    image: "/shots/bhagavad-gita.webp",
  },
  {
    label: "Gita GPT",
    note: "Ask the Gita, powered by AI",
    href: "https://bhagavadgita.com/gitagpt",
    image: "/shots/gitagpt.webp",
  },
  {
    label: "Bhagavad Gita App",
    note: "Read and listen, on iOS and Android",
    href: "https://bhagavadgita.com/bhagavad-gita-app",
    image: "/shots/gita-app.webp",
  },
  {
    label: "Hanuman Chalisa",
    note: "Chant along, with meaning",
    href: "https://vedvyas.com",
    image: "/shots/hanuman-chalisa.webp",
  },
] as const;

/** App store links (used on the app pages / footer). */
export const appLinks = {
  ios: "https://apps.apple.com/us/app/bhagavad-gita-hindi-english/id1602895635",
  android:
    "https://play.google.com/store/apps/details?id=com.gitainitiative.bhagavadgita",
} as const;

export const social = [
  { label: "Pinterest", href: "https://www.pinterest.com/" },
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "YouTube", href: "https://www.youtube.com/" },
] as const;
