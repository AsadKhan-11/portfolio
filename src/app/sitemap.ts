import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/lib/caseStudies";
import { ABOUT_UPDATED } from "@/lib/profile";
import { SERVICES } from "@/lib/services";
import { SITE_URL } from "@/lib/site";

/* A static export needs metadata routes marked as built once, at build time. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  /*
    The newest edit anywhere stands in for the home page, which lists the
    case studies and links to every service page. ISO dates sort as text.
  */
  const newest = [
    ...CASE_STUDIES.map((c) => c.updated ?? c.published),
    ...SERVICES.map((s) => s.updated),
    ABOUT_UPDATED,
  ]
    .sort()
    .at(-1)!;

  return [
    { url: SITE_URL, lastModified: new Date(newest), changeFrequency: "monthly", priority: 1 },
    ...SERVICES.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified: new Date(s.updated),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(ABOUT_UPDATED),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    },
    ...CASE_STUDIES.map((c) => ({
      url: `${SITE_URL}/work/${c.slug}`,
      lastModified: new Date(c.updated ?? c.published),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
