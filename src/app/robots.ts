import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/* A static export needs metadata routes marked as built once, at build time. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    /* /live/ holds the two apps shown in frames on the case pages: not pages to rank. */
    rules: { userAgent: "*", allow: "/", disallow: "/live/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
