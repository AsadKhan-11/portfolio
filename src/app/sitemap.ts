import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/lib/caseStudies";
import { SITE_PAGES_UPDATED } from "@/lib/nav";
import { LEGAL } from "@/lib/legal";
import { ABOUT_UPDATED } from "@/lib/profile";
import { SERVICES } from "@/lib/services";
import { SITE_URL } from "@/lib/site";

/* A static export needs metadata routes marked as built once, at build time. */
export const dynamic = "force-static";

/* ISO dates sort as text, so the newest of a list is its last when sorted. */
const newest = (dates: string[]) => [...dates].sort().at(-1)!;

export default function sitemap(): MetadataRoute.Sitemap {
  const caseDates = CASE_STUDIES.map((c) => c.updated ?? c.published);
  const serviceDates = SERVICES.map((s) => s.updated);

  /*
    Each index page changes when the pages under it do, so its date is the
    newest of theirs. The home page lists and links to everything, so it
    carries the newest date on the site.
  */
  const all = [...caseDates, ...serviceDates, ABOUT_UPDATED, SITE_PAGES_UPDATED];

  return [
    { url: SITE_URL, lastModified: new Date(newest(all)), changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE_URL}/services`,
      lastModified: new Date(newest(serviceDates)),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    ...SERVICES.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified: new Date(s.updated),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    {
      url: `${SITE_URL}/work`,
      lastModified: new Date(newest(caseDates)),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    ...CASE_STUDIES.map((c) => ({
      url: `${SITE_URL}/work/${c.slug}`,
      lastModified: new Date(c.updated ?? c.published),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/packages`,
      lastModified: new Date(SITE_PAGES_UPDATED),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(ABOUT_UPDATED),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(SITE_PAGES_UPDATED),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/faqs`,
      lastModified: new Date(SITE_PAGES_UPDATED),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/book`,
      lastModified: new Date(SITE_PAGES_UPDATED),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    ...LEGAL.map((d) => ({
      url: `${SITE_URL}/${d.slug}`,
      lastModified: new Date(d.updated),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
