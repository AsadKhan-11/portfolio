import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Faq from "@/components/Faq";
import Services from "@/components/Services";
import { PageCta } from "@/components/page/PageParts";
import {
  ServiceHero,
  ServiceIncluded,
  ServiceStack,
  ServiceSteps,
} from "@/components/service/ServiceSections";
import { ProjectsSection } from "@/components/Work";
import { SERVICES, getService } from "@/lib/services";
import { serviceJsonLd } from "@/lib/pageJsonLd";
import { projectsFor } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";

/* Every service page is prerendered at build time. */
export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return pageMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      {/* The breadcrumb trail, the page, and the service it describes. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serviceJsonLd(service) }}
      />
      <Navbar />
      <main className="flex-1 relative" style={{ zIndex: 2 }}>
        <ServiceHero s={service} />
        <ServiceIncluded s={service} />
        <ServiceSteps s={service} />
        <ServiceStack s={service} />
        <ProjectsSection
          projects={projectsFor(service.related)}
          head={{
            eyebrow: "04 · Related work",
            title: "Work like",
            em: "this",
            lede: "Projects where I've done this kind of work. Each one has a full case study: what was built, and why.",
          }}
        />
        <Services
          head={{
            eyebrow: "05 · More services",
            title: "Often paired",
            em: "with",
            lede: "Most projects use several of these at once, which is the point of hiring one person for the whole stack.",
          }}
          exclude={[service.slug]}
        />
        <Faq
          head={{
            eyebrow: "06 · FAQ",
            title: "Before you",
            em: "ask",
            lede: "The questions that come up most before a project like this starts. If yours isn't here, ask me directly.",
          }}
          items={service.faqs}
          askHref="/contact"
        />
        <PageCta from={service.slug} />
      </main>
      <Footer />
    </>
  );
}
