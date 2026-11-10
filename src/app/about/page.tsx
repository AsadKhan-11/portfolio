import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  AboutApproach,
  AboutElsewhere,
  AboutHero,
  AboutPath,
  AboutServices,
  AboutToolkit,
  AboutWork,
  AboutZones,
} from "@/components/about/AboutSections";
import { PageCta } from "@/components/service/ServiceSections";
import { aboutJsonLd } from "@/lib/pageJsonLd";
import { pageMetadata } from "@/lib/seo";

const TITLE = "About Asad Khan · Full Stack Developer in Lahore, Pakistan";
const DESCRIPTION =
  "Asad Khan is a full stack developer in Lahore, Pakistan, building websites, portals and web apps for clients worldwide. How I work and what I build with.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      {/* The breadcrumb trail, the page, and the person it is about. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: aboutJsonLd({ title: TITLE, description: DESCRIPTION }) }}
      />
      <Navbar />
      <main className="flex-1 relative" style={{ zIndex: 2 }}>
        <AboutHero />
        <AboutApproach />
        <AboutToolkit />
        <AboutPath />
        <AboutZones />
        <AboutWork />
        <AboutServices />
        <AboutElsewhere />
        <PageCta />
      </main>
      <Footer />
    </>
  );
}
