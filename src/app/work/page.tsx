import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProjectsVisual } from "@/components/page/HeroVisuals";
import { InfoCards, PageCta, PageHero } from "@/components/page/PageParts";
import SectionHead from "@/components/SectionHead";
import { ProjectShowcase } from "@/components/Work";
import { CASE_STUDIES, type CaseStudy } from "@/lib/caseStudies";
import { pageJsonLd } from "@/lib/pageJsonLd";
import { toProject } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";

const TITLE = "Projects & Case Studies · Full Stack Web Development";
const DESCRIPTION =
  "Platforms and sites built by one developer: a gym platform with an AI coach, a flight-academy co-pilot, a med-spa system and more. Read each case study.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/work" });

/*
  Two shelves, split on what each case study already says about itself in its
  status line: a concept build or a self-initiated project is labelled as
  one, and everything else was built for a client. A project added later
  lands on the right shelf without anyone choosing.
*/
const isConcept = (c: CaseStudy) => /concept|self-initiated/i.test(c.status);

/*
  How a case study reads. Each page follows the same shape (the problem, what
  was built, why it works), the order a hiring decision follows, and it is
  said once here so a visitor knows what the cards lead to.
*/
const READING = [
  {
    title: "The problem",
    body: "What the business was struggling with, in a sentence or two, before anything was built.",
  },
  {
    title: "What I built",
    body: "The product in plain terms, with screens and walkthrough videos so you can see it working.",
  },
  {
    title: "Why it works",
    body: "The decisions behind it: what was chosen, what was left out, and why.",
  },
];

export default function ProjectsPage() {
  const platforms = CASE_STUDIES.filter((c) => !isConcept(c)).map(toProject);
  const concepts = CASE_STUDIES.filter(isConcept).map(toProject);

  return (
    <>
      {/* The breadcrumb trail, the page, and the list of projects on it. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: pageJsonLd({
            path: "/work",
            type: "CollectionPage",
            title: TITLE,
            description: DESCRIPTION,
            crumbs: [{ name: "Home", path: "/" }, { name: "Projects" }],
            list: CASE_STUDIES.map((c) => ({ name: c.title, path: `/work/${c.slug}` })),
          }),
        }}
      />
      <Navbar />
      <main className="flex-1 relative" style={{ zIndex: 2 }}>
        <PageHero
          trail={[{ label: "Home", href: "/" }, { label: "Projects" }]}
          eyebrow="Projects"
          lead="Selected projects,"
          em="built end to end."
          lede="Sites I have shipped, plus case studies of platforms built for confidential clients, shown with names and data changed. Each one tells the whole story: what was built, and why."
          aside={<ProjectsVisual />}
        >
          <Link href="/contact" className="btn btn-solid" data-cursor="Talk">
            <span>Start a project</span>
          </Link>
          <Link href="/services" className="btn">
            What I do <FiArrowRight />
          </Link>
        </PageHero>

        <section className="section bg-glow-bl">
          <div className="rule-top" />
          <div className="shell">
            <SectionHead
              eyebrow="All projects"
              title="Everything"
              em="I have built"
              lede="Client platforms, shown with names and data changed where a client is confidential, and self-initiated projects, each labelled. Open one to read its story."
            />
            <ProjectShowcase platforms={platforms} concepts={concepts} />
          </div>
        </section>

        <section className="section bg-glow-tr">
          <div className="rule-top" />
          <div className="shell">
            <SectionHead
              eyebrow="How to read them"
              title="Every case study"
              em="has the same shape"
              lede="Every case study is written in the same three parts, in the order you would ask the questions. Skim one in a minute, or read it to the end."
            />
            <InfoCards items={READING} columns={3} />
          </div>
        </section>

        <PageCta copy="Want something like one of these? Tell me what you're building. I reply within a day, with questions or with a fixed quote once the scope is clear." />
      </main>
      <Footer />
    </>
  );
}
