import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  CaseDecisions,
  CaseFlows,
  CaseGallery,
  CaseHero,
  CaseHighlights,
  CaseOutro,
  CasePhones,
  CaseReel,
  CaseStory,
} from "@/components/case/CaseSections";
import { CASE_STUDIES, getCaseStudy } from "@/lib/caseStudies";

/* Every case study is prerendered at build time. */
export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  const title = `${study.title} · Case study · WebForge Digital`;
  const cover = study.highlights[0].shot;
  return {
    title,
    description: study.summary,
    openGraph: {
      title,
      description: study.tagline,
      type: "article",
      images: [{ url: cover.src, width: cover.w, height: cover.h, alt: cover.alt }],
    },
    twitter: { card: "summary_large_image", title, description: study.tagline, images: [cover.src] },
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
      <Navbar />
      <main className="flex-1 relative" style={{ zIndex: 2 }}>
        <CaseHero study={study} />
        <CaseReel study={study} />
        <CaseStory study={study} />
        <CaseHighlights study={study} />
        <CaseFlows study={study} />
        <CaseGallery study={study} />
        <CasePhones study={study} />
        <CaseDecisions study={study} />
        <CaseOutro study={study} />
      </main>
      <Footer />
    </>
  );
}
