import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CaseProgress from "@/components/case/CaseProgress";
import {
  CaseDecisions,
  CaseFlows,
  CaseGallery,
  CaseHero,
  CaseHighlights,
  CaseJump,
  CaseMidCta,
  CaseMore,
  CasePhones,
  CaseReel,
  CaseStory,
} from "@/components/case/CaseSections";
import { PageCta } from "@/components/page/PageParts";
import { CASE_STUDIES, getCaseStudy, typeInSentence, type CaseStudy } from "@/lib/caseStudies";
import { caseStudyJsonLdString } from "@/lib/caseStudyJsonLd";

/* Every case study is prerendered at build time. */
export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

const DESC_MAX = 155;
const TITLE_MIN = 50;
const TITLE_MAX = 60;

/** Cut at a word boundary — a description ending "behind t…" reads broken. */
function clamp(text: string, max = DESC_MAX) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,.;:—-]+$/, "")}…`;
}

/*
  Google renders roughly 155 characters, and SEO audits want 120 to 160.
  `summary` is a full paragraph, so it was being cut mid-sentence. The pitch
  is already written as one line and says the most per character, so it leads
  and never gets trimmed. After it comes the fullest ending that still fits:
  a short pitch gets the long one, and a long pitch gets a shorter one rather
  than none, which used to leave three pages under 120 characters.
*/
function metaDescription(study: CaseStudy) {
  const lead = `${study.pitch} ${study.type}, ${study.year}`;
  for (const tail of [
    " — walkthroughs, screens and the thinking behind the build.",
    " — screens and the thinking behind the build.",
    " — walkthrough and screens.",
    ".",
  ]) {
    if (lead.length + tail.length <= DESC_MAX) return lead + tail;
  }
  return clamp(study.pitch);
}

/*
  The name and what the thing is come first and are never cut. Search shows
  about 60 characters and audits want 50 to 60, so when the title is short
  the brand goes on the end to use the room, and only then. That keeps the
  earlier rule intact: the brand can never push the words people search for
  off the end of a long title.
*/
function caseTitle(study: CaseStudy) {
  const base = `${study.title} — ${typeInSentence(study)} case study`;
  if (base.length >= TITLE_MIN) return base;
  for (const brand of [" · WebForge Digital", " · WebForge"]) {
    const withBrand = base + brand;
    if (withBrand.length >= TITLE_MIN && withBrand.length <= TITLE_MAX) return withBrand;
  }
  return base;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  /*
    "Aurelle" is a name nobody searches. Saying what it is earns the click
    and gives the title a term with demand behind it. The brand is not part
    of the formula (see caseTitle): the site name is declared on the home
    page as WebSite schema, which is where Search reads it from, and it is
    only added here to fill a title that would otherwise run short.
  */
  const title = caseTitle(study);
  const cover = study.highlights[0].shot;
  const description = metaDescription(study);

  return {
    title,
    description,
    alternates: { canonical: `/work/${study.slug}` },
    authors: [{ name: "Asad Khan" }],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        /* Full-width image previews and untruncated snippets — this page
           is carried by its imagery, and nothing on it is paywalled. */
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title,
      description,
      type: "article",
      siteName: "WebForge Digital",
      url: `/work/${study.slug}`,
      locale: "en_US",
      publishedTime: study.published,
      modifiedTime: study.updated ?? study.published,
      authors: ["Asad Khan"],
      section: "Case study",
      tags: study.tags,
      images: [{ url: cover.src, width: cover.w, height: cover.h, alt: cover.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [cover.src],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <>
      {/* Breadcrumbs, the write-up, the project, and a VideoObject per clip. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: caseStudyJsonLdString(study) }}
      />
      <CaseProgress />
      <Navbar />
      <main className="flex-1 relative" style={{ zIndex: 2 }}>
        <CaseHero study={study} />
        <CaseReel study={study} />
        <CaseJump study={study} />
        <CaseStory study={study} />
        <CaseHighlights study={study} />
        <CaseFlows study={study} />
        <CaseMidCta study={study} />
        <CaseGallery study={study} />
        <CasePhones study={study} />
        <CaseDecisions study={study} />
        <CaseMore study={study} />
        <PageCta from={study.slug} />
      </main>
      <Footer />
    </>
  );
}
