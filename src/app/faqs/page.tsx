import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaqGroups } from "@/components/Faq";
import { PageCta, PageHero } from "@/components/page/PageParts";
import { FAQ_GROUPS } from "@/lib/faqs";
import { pageJsonLd } from "@/lib/pageJsonLd";
import { pageMetadata } from "@/lib/seo";

const TITLE = "Web Development FAQs · Pricing, Timelines and Ownership";
const DESCRIPTION =
  "Answers to the questions that come up on almost every first call: cost, timelines, working across time zones, code ownership and support after launch.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/faqs" });

export default function FaqsPage() {
  return (
    <>
      {/* The breadcrumb trail and the page. The answers are plain text in the page itself. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: pageJsonLd({
            path: "/faqs",
            title: TITLE,
            description: DESCRIPTION,
            crumbs: [{ name: "Home", path: "/" }, { name: "FAQs" }],
          }),
        }}
      />
      <Navbar />
      <main className="flex-1 relative" style={{ zIndex: 2 }}>
        <PageHero
          trail={[{ label: "Home", href: "/" }, { label: "FAQs" }]}
          eyebrow="FAQs"
          lead="Before you ask,"
          em="the answers."
          lede="The questions that come up on almost every first call, answered properly so you don't have to ask them. Each answer points to the page with the detail."
        >
          <nav aria-label="Topics" className="faq-topics">
            <ul>
              {FAQ_GROUPS.map((g) => (
                <li key={g.id}>
                  <a href={`#${g.id}`} className="tag">
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </PageHero>

        <FaqGroups />

        <PageCta copy="Something not covered here? Ask me directly. I reply within a day, with an answer or with a fixed quote once the scope is clear." />
      </main>
      <Footer />
    </>
  );
}
