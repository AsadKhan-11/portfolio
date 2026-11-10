import type { Metadata } from "next";

/*
  Metadata for the pages that are not case studies (the service pages and
  About), in one place so they all carry the same robots rules and social
  cards.

  Search shows about 60 characters of a title and about 155 of a description,
  and SEO audits flag anything outside 50 to 60 and 120 to 160. A page that
  falls outside either range is reported in the build log, not failed: it
  is a rule of thumb, and a failed build would keep the site from deploying.
*/
const TITLE_RANGE = [50, 60] as const;
const DESCRIPTION_RANGE = [120, 160] as const;

const outside = (text: string, [min, max]: readonly [number, number]) =>
  text.length < min || text.length > max;

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  /** The page's own path, e.g. "/about". Becomes the canonical URL. */
  path: string;
}): Metadata {
  if (outside(title, TITLE_RANGE) || outside(description, DESCRIPTION_RANGE)) {
    console.warn(
      `[seo] ${path}: title is ${title.length} characters (want ${TITLE_RANGE.join("–")}), ` +
        `description is ${description.length} (want ${DESCRIPTION_RANGE.join("–")}).`,
    );
  }

  const image = { url: "/brand/og.jpg", width: 1200, height: 630, alt: "WebForge Digital" };

  return {
    title,
    description,
    alternates: { canonical: path },
    authors: [{ name: "Asad Khan" }],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "WebForge Digital",
      url: path,
      locale: "en_US",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}
