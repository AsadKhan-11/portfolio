import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/lib/caseStudies";
import { SITE_URL } from "@/lib/site";

/* A static export needs metadata routes marked as built once, at build time. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  /* Newest study stands in for the home page, which lists them all. */
  const newest = CASE_STUDIES.reduce(
    (latest, c) => ((c.updated ?? c.published) > latest ? c.updated ?? c.published : latest),
    CASE_STUDIES[0]?.published ?? "2026-01-01"
  );

  return [
    { url: SITE_URL, lastModified: new Date(newest), changeFrequency: "monthly", priority: 1 },
    ...CASE_STUDIES.map((c) => ({
      url: `${SITE_URL}/work/${c.slug}`,
      lastModified: new Date(c.updated ?? c.published),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
