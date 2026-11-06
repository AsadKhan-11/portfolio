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
  CaseOutro,
  CasePhones,
  CaseReel,
  CaseStory,
} from "@/components/case/CaseSections";
import { CASE_STUDIES, getCaseStudy, typeInSentence, type CaseStudy } from "@/lib/caseStudies";
import { caseStudyJsonLdString } from "@/lib/caseStudyJsonLd";

/* Every case study is prerendered at build time. */
export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

const DESC_MAX = 155;

/** Cut at a word boundary — a description ending "behind t…" reads broken. */
function clamp(text: string, max = DESC_MAX) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,.;:—-]+$/, "")}…`;
}

/*
  Google renders roughly 155 characters. `summary` is a full paragraph, so
  it was being cut mid-sentence. The pitch is already written as one line
  and says the most per character, so it leads and never gets trimmed;
  everything after it is dropped a clause at a time to fit.
*/
function metaDescription(study: CaseStudy) {
  const long = `${study.pitch} ${study.type}, ${study.year} — walkthroughs, screens and the thinking behind the build.`;
  if (long.length <= DESC_MAX) return long;

  const short = `${study.pitch} ${study.type}, ${study.year}.`;
  if (short.length <= DESC_MAX) return short;

  return clamp(study.pitch);
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
    and gives the title a term with demand behind it.

    No "· WebForge Digital" suffix: Google renders about 60 characters, and
    eighteen of them spent on a brand nobody is searching either would push
    the words that matter off the end. The site name is declared on the home
    page instead, as WebSite schema, which is where Search reads it from.
  */
  const title = `${study.title} — ${typeInSentence(study)} case study`;
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
        <CaseOutro study={study} />
      </main>
      <Footer />
    </>
  );
}
