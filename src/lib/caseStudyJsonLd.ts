/*
  Structured data for a case study page, as one @graph.

  What's here and why:
  - BreadcrumbList  — needs two or more items, each with position + name.
    The trail is rendered visibly in the hero as well, because Google's
    general guidelines say markup must not describe content the visitor
    cannot see.
  - Article         — the write-up itself, with `about` pointing at the
    build it describes.
  - CreativeWork    — the thing that was made, separate from the page
    about it: client, role, tech, live URL.
  - VideoObject     — one per walkthrough clip. Required: name,
    thumbnailUrl, uploadDate. Recommended and supplied: contentUrl,
    description, duration. Every one of those is also on screen, in the
    walkthrough list beside the player.

  Deliberately not here: FAQPage. Google retired the FAQ rich result in
  May 2026, so the markup no longer buys anything.
*/
import { typeInSentence, type CaseStudy, type Clip } from "./caseStudies";
import { SITE_URL, SOCIALS } from "./site";

/** Lahore, where the work is done — uploadDate wants a timezone. */
const TZ = "+05:00";
const stamp = (isoDate: string) => `${isoDate}T09:00:00${TZ}`;

const abs = (p: string) => (p.startsWith("http") ? p : `${SITE_URL}${p}`);

/** Seconds to the ISO 8601 duration Google asks for, e.g. 16 -> PT16S. */
const iso8601Duration = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `PT${m ? `${m}M` : ""}${s ? `${s}S` : m ? "" : "0S"}`;
};

const PERSON = {
  "@type": "Person",
  "@id": `${SITE_URL}/#asad-khan`,
  name: "Asad Khan",
  url: SITE_URL,
  sameAs: SOCIALS,
};

const PUBLISHER = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#webforge`,
  name: "WebForge Digital",
  url: SITE_URL,
};

function videoNode(study: CaseStudy, clip: Clip, pageUrl: string) {
  return {
    "@type": "VideoObject",
    "@id": `${pageUrl}#clip-${clip.id}`,
    /* Unique across the site: two studies both have a clip called
       "The full page". */
    name: `${study.title} — ${clip.title}`,
    description: clip.blurb,
    thumbnailUrl: [abs(clip.poster)],
    uploadDate: stamp(study.published),
    contentUrl: abs(clip.src),
    duration: iso8601Duration(clip.seconds),
    isFamilyFriendly: true,
    creator: { "@id": PERSON["@id"] },
    publisher: { "@id": PUBLISHER["@id"] },
  };
}

export function caseStudyJsonLd(study: CaseStudy) {
  const pageUrl = `${SITE_URL}/work/${study.slug}`;
  const images = [study.highlights[0]?.shot, ...study.gallery.slice(0, 3)]
    .filter(Boolean)
    .map((s) => abs(s!.src));

  const graph: Record<string, unknown>[] = [
    PERSON,
    PUBLISHER,
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Work", item: `${SITE_URL}/#work` },
        /* Last item omits `item`: Google falls back to this page's URL. */
        { "@type": "ListItem", position: 3, name: study.title },
      ],
    },
    {
      "@type": "Article",
      "@id": `${pageUrl}#article`,
      headline: `${study.title} — ${typeInSentence(study)} case study`,
      description: study.summary,
      image: images,
      datePublished: stamp(study.published),
      dateModified: stamp(study.updated ?? study.published),
      author: { "@id": PERSON["@id"] },
      publisher: { "@id": PUBLISHER["@id"] },
      mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
      about: { "@id": `${pageUrl}#project` },
      articleSection: "Case study",
      keywords: study.tags.join(", "),
      inLanguage: "en",
    },
    {
      "@type": "CreativeWork",
      "@id": `${pageUrl}#project`,
      name: study.title,
      alternateName: study.tagline,
      description: study.pitch,
      creator: { "@id": PERSON["@id"] },
      genre: study.type,
      keywords: study.tags.join(", "),
      ...(study.liveUrl ? { url: study.liveUrl } : {}),
      /*
        No dateCreated or sourceOrganization. The hero used to print a
        Role / Client / Year / Status table and no longer does, so both
        would be asserting facts the page never shows — which is exactly
        what Google's structured data policy rules out. The Article's own
        datePublished still carries the date, as page metadata rather
        than a claim about the work.
      */
    },
    ...study.clips.map((c) => videoNode(study, c, pageUrl)),
  ];

  return { "@context": "https://schema.org", "@graph": graph };
}

/** Escaped so a stray `</script>` in the copy cannot break out of the tag. */
export const caseStudyJsonLdString = (study: CaseStudy) =>
  JSON.stringify(caseStudyJsonLd(study)).replace(/</g, "\\u003c");
