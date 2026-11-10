/*
  Structured data for the service pages and About, as one @graph each, in the
  same shape the case studies use (see caseStudyJsonLd.ts).

  Each node describes something the page shows: the breadcrumb trail is
  printed at the top of the page, the Service is the page's subject, and the
  Person on the About page is the one the page is written about. Google's
  structured-data policy rules out markup for content the visitor can't see.

  Deliberately not here: FAQPage. Google retired the FAQ rich result in May
  2026, so the markup no longer buys anything.
*/
import type { ServicePage } from "./services";
import { SITE_URL, SOCIALS } from "./site";

/** Escaped so a stray `</script>` in the copy cannot break out of the tag. */
const toScript = (graph: unknown[]) =>
  JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");

const WEBSITE = { "@id": `${SITE_URL}/#website` };
const STUDIO = { "@id": `${SITE_URL}/#webforge` };
const ASAD = { "@id": `${SITE_URL}/#asad-khan` };

function breadcrumbs(url: string, trail: { name: string; item?: string }[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumbs`,
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      /* The last item omits `item`: Google falls back to this page's URL. */
      ...(t.item ? { item: t.item } : {}),
    })),
  };
}

export function serviceJsonLd(s: ServicePage) {
  const url = `${SITE_URL}/services/${s.slug}`;
  return toScript([
    breadcrumbs(url, [
      { name: "Home", item: SITE_URL },
      { name: "Services", item: `${SITE_URL}/#services` },
      { name: s.name },
    ]),
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: s.title,
      description: s.description,
      inLanguage: "en",
      isPartOf: WEBSITE,
      breadcrumb: { "@id": `${url}#breadcrumbs` },
      about: { "@id": `${url}#service` },
    },
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: s.name,
      serviceType: s.name,
      description: s.lede,
      url,
      provider: STUDIO,
      areaServed: "Worldwide",
    },
  ]);
}

export function aboutJsonLd({ title, description }: { title: string; description: string }) {
  const url = `${SITE_URL}/about`;
  return toScript([
    breadcrumbs(url, [{ name: "Home", item: SITE_URL }, { name: "About" }]),
    {
      "@type": "AboutPage",
      "@id": `${url}#webpage`,
      url,
      name: title,
      description,
      inLanguage: "en",
      isPartOf: WEBSITE,
      breadcrumb: { "@id": `${url}#breadcrumbs` },
      mainEntity: ASAD,
    },
    {
      "@type": "Person",
      ...ASAD,
      name: "Asad Khan",
      url,
      image: `${SITE_URL}/about/workspace.jpg`,
      jobTitle: "Full Stack Developer",
      description:
        "Full stack developer in Lahore, Pakistan, building websites, portals and web apps for clients worldwide.",
      address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
      worksFor: [STUDIO, { "@type": "Organization", name: "MyntorX" }],
      knowsAbout: [
        "Full stack web development",
        "React",
        "Next.js",
        "Node.js",
        "MongoDB",
        "AI integration",
        "UI and UX design",
      ],
      sameAs: SOCIALS,
    },
  ]);
}
