import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  PageCta,
  ServiceFaq,
  ServiceHero,
  ServiceIncluded,
  ServiceMore,
  ServiceRelated,
  ServiceStack,
  ServiceSteps,
} from "@/components/service/ServiceSections";
import { SERVICES, getService } from "@/lib/services";
import { serviceJsonLd } from "@/lib/pageJsonLd";
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
        <ServiceRelated s={service} />
        <ServiceFaq s={service} />
        <ServiceMore s={service} />
        <PageCta />
      </main>
      <Footer />
    </>
  );
}
