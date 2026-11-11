import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Faq from "@/components/Faq";
import Packages from "@/components/Packages";
import Process from "@/components/Process";
import Services, { ServiceFit } from "@/components/Services";
import { ServicesVisual } from "@/components/page/HeroVisuals";
import { PageCta, PageHero } from "@/components/page/PageParts";
import { ProjectsSection } from "@/components/Work";
import { getFaqs } from "@/lib/faqs";
import { pageJsonLd } from "@/lib/pageJsonLd";
import { projectsFor } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";
import { SERVICES, serviceHref } from "@/lib/services";

const TITLE = "Web Development Services · AI, Apps, E-Commerce & Design";
const DESCRIPTION =
  "Six services from one developer: AI integration, chatbots, CRM automation, full-stack web apps, e-commerce and mobile apps, all quoted at a fixed price.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/services" });

/*
  The order a visitor needs it in: what is on offer, which of it is for me,
  how a project runs, proof that it works, what it costs, what people ask,
  and one clear next step. Each section is the component the home page and
  the other pages use for the same thing.
*/
export default function ServicesPage() {
  return (
    <>
      {/* The breadcrumb trail, the page, and the six services it lists. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: pageJsonLd({
            path: "/services",
            type: "CollectionPage",
            title: TITLE,
            description: DESCRIPTION,
            crumbs: [{ name: "Home", path: "/" }, { name: "Services" }],
            list: SERVICES.map((s) => ({ name: s.name, path: serviceHref(s.slug) })),
          }),
        }}
      />
      <Navbar />
      <main className="flex-1 relative" style={{ zIndex: 2 }}>
        <PageHero
          trail={[{ label: "Home", href: "/" }, { label: "Services" }]}
          eyebrow="Services"
          lead="Six services,"
          em="one developer for the whole job."
          lede="From AI features to the storefront underneath them. Most projects use several at once, which is rather the point of hiring one person for the whole stack."
          aside={<ServicesVisual />}
        >
          <Link href="/contact" className="btn btn-solid" data-cursor="Talk">
            <span>Get a fixed quote</span>
          </Link>
          <Link href="/work" className="btn">
            See the projects <FiArrowRight />
          </Link>
        </PageHero>

        <Services head={false} more={false} />

        <ServiceFit
          head={{
            eyebrow: "01 · Which one",
            title: "Not sure which",
            em: "you need?",
            lede: "Each service starts from a situation. Find the sentence that sounds like your week.",
          }}
        />

        <Process eyebrow="02 · Process" />

        <ProjectsSection
          projects={projectsFor(["ironside-gym", "vector-academy", "veloura"])}
          head={{
            eyebrow: "03 · Proof",
            title: "Recent",
            em: "work",
            lede: "Platforms where these services were used together: AI features, integrations and full-stack builds, each with a full case study.",
          }}
        />

        <Packages
          head={{
            eyebrow: "04 · Packages",
            title: "Where it fits in the",
            em: "packages",
            lede: "Fixed scope, fixed price, a clear finish line. Each service sits in one of three packages, or is scoped on its own.",
          }}
          ctaHref="/contact"
        />

        <Faq
          head={{
            eyebrow: "05 · FAQ",
            title: "Before you",
            em: "ask",
            lede: "The questions that come up most before a project starts. If yours isn't here, ask me directly.",
          }}
          items={getFaqs(["start", "timeline", "existing-code", "ai"])}
          askHref="/contact"
          raised={false}
        />

        <PageCta />
      </main>
      <Footer />
    </>
  );
}
