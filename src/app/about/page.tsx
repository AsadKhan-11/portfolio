import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Band from "@/components/Band";
import Experience from "@/components/Experience";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Toolkit from "@/components/Toolkit";
import { AboutHero, AboutStory } from "@/components/about/AboutSections";
import { PageCta } from "@/components/page/PageParts";
import { ProjectsSection } from "@/components/Work";
import { aboutJsonLd } from "@/lib/pageJsonLd";
import { projectsFor } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";

const TITLE = "About Asad Khan · Full Stack Developer in Lahore, Pakistan";
const DESCRIPTION =
  "Asad Khan is a full stack developer in Lahore, Pakistan, building websites, portals and web apps for clients worldwide. How I work and what I build with.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/about",
});

/*
  An About page answers, in order: who is this, can I trust them, what do they
  do, how do they work, and how do I reach them. The first screen says who
  (a name, a photo, a line about the work) and the story under it says it at
  length, the figures and the comparison say why to trust it, then the
  toolkit, the career, the projects and the services say what, and the
  location and the closing call to action say how.
  Every section is the component the home page and the other pages use for
  the same thing.
*/
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
        <AboutStory />
        <Stats />
        <Band ctaHref="/contact" />
        <Toolkit
          head={{
            eyebrow: "02 · Toolkit",
            title: "What I build",
            em: "with",
            lede: "The MERN stack (MongoDB, Express, React and Node.js) is the backbone of most projects, plus whatever else the job needs.",
          }}
        />
        <Experience eyebrow="03 · Path" />
        <ProjectsSection
          projects={projectsFor(["ironside-gym", "vector-academy", "veloura"])}
          head={{
            eyebrow: "04 · Work",
            title: "Selected",
            em: "work",
            lede: "A few of the platforms and sites I've built. Each has a full case study: what was built, and why.",
          }}
        />
        <Services
          head={{
            eyebrow: "05 · Services",
            title: "What I",
            em: "do",
            lede: "Six things I get hired for, from AI features to the storefront underneath them. Most projects use several at once.",
          }}
        />
        <PageCta />
      </main>
      <Footer />
    </>
  );
}
