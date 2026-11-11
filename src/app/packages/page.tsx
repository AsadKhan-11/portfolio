import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Band from "@/components/Band";
import Faq from "@/components/Faq";
import Packages, { PackageCompare } from "@/components/Packages";
import { IncludedList, PricingFlow } from "@/components/page/PackageSections";
import { PackagesVisual } from "@/components/page/HeroVisuals";
import { PageCta, PageHero } from "@/components/page/PageParts";
import SectionHead from "@/components/SectionHead";
import { getFaqs } from "@/lib/faqs";
import { PACKAGES } from "@/lib/packages";
import { pageJsonLd } from "@/lib/pageJsonLd";
import { pageMetadata } from "@/lib/seo";

const TITLE = "Web Development Packages & Pricing · Fixed-Price Projects";
const DESCRIPTION = `Three fixed-price packages for websites, web apps and AI-powered builds, from $${Math.min(
  ...PACKAGES.map((p) => p.price),
).toLocaleString("en-US")}. See what each includes, how long it takes and how pricing works.`;

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/packages" });

/*
  What comes with every package. Each line restates something the rest of
  the site already promises (the FAQ, the process, the stats strip), so this
  page and those cannot say different things.
*/
const INCLUDED = [
  {
    title: "A fixed quote first",
    body: "After we've talked through what you need, I quote a fixed price, so there are no surprises halfway through.",
  },
  {
    title: "A staging link from day one",
    body: "You can open a working version any day of the week and watch it come together, instead of waiting for a reveal.",
  },
  {
    title: "A handover you can act on",
    body: "Deployment, monitoring and a handover that leaves nothing depending on me to keep it running.",
  },
  {
    title: "30 days of support",
    body: "Anything that surfaces after launch gets looked at during the 30 days that follow. After that, ongoing work is at an agreed rate, with no retainer to sign.",
  },
  {
    title: "You own the code",
    body: "The repository, the assets and any accounts set up for the project are yours once the final invoice is settled.",
  },
  {
    title: "A reply within a day",
    body: "Questions, feedback and change requests usually get an answer within a day.",
  },
];

/*
  How the price is arrived at. Showing a starting price and how it moves is
  what a buyer weighing a quote looks for first; hiding it sends them to a
  competitor who doesn't (Nielsen Norman Group's B2B research).
*/
const PRICING = [
  {
    title: "One-off, not monthly",
    body: "Each price is a one-off project cost. There's no subscription, and no retainer you're obliged to sign.",
  },
  {
    title: "From means from",
    body: "A package is a starting point. The final price is fixed once I know exactly what you need, and you get it before any work starts.",
  },
  {
    title: "Custom when it needs to be",
    body: "Bigger scope, unusual integrations, or a build that doesn't fit a tier? We scope it together, and the price is set once I know what you need, not before.",
  },
];

export default function PackagesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: pageJsonLd({
            path: "/packages",
            title: TITLE,
            description: DESCRIPTION,
            crumbs: [{ name: "Home", path: "/" }, { name: "Packages" }],
          }),
        }}
      />
      <Navbar />
      <main className="flex-1 relative" style={{ zIndex: 2 }}>
        <PageHero
          trail={[{ label: "Home", href: "/" }, { label: "Packages" }]}
          eyebrow="Packages"
          lead="Fixed scope, fixed price,"
          em="a clear finish line."
          lede="Pick the package that matches where you're starting from, or use it as a starting point for a conversation. Each one says what's in it and how long it takes."
          aside={<PackagesVisual />}
        >
          <Link href="/contact" className="btn btn-solid" data-cursor="Talk">
            <span>Get a fixed quote</span>
          </Link>
          <Link href="/services" className="btn">
            See the services <FiArrowRight />
          </Link>
        </PageHero>

        <Packages head={false} ctaHref="/contact" more={false} />

        <section className="section bg-ember tone-keep">
          <div className="rule-top" />
          <div className="shell">
            <SectionHead
              eyebrow="01 · Compare"
              title="The three"
              em="side by side"
              lede="Every tier builds on the one before it, so you only pay for the step you need."
            />
            <PackageCompare />
          </div>
        </section>

        <Band ctaHref="/contact" />

        <section className="section bg-grid">
          <div className="rule-top" />
          <div className="shell">
            <SectionHead
              eyebrow="02 · Included"
              title="Every package"
              em="includes"
              lede="Whichever you pick, these come with it."
            />
            <IncludedList items={INCLUDED} />
          </div>
        </section>

        <section className="section">
          <div className="rule-top" />
          <div className="shell">
            <SectionHead
              eyebrow="03 · Pricing"
              title="How pricing"
              em="works"
              lede="No hourly meter, no surprises on the invoice."
            />
            <PricingFlow items={PRICING} />
          </div>
        </section>

        <Faq
          head={{
            eyebrow: "04 · FAQ",
            title: "Before you",
            em: "ask",
            lede: "The questions that come up most before a package is chosen. If yours isn't here, ask me directly.",
          }}
          items={getFaqs(["timeline", "revisions", "after-launch", "ownership"])}
          askHref="/contact"
        />

        <PageCta />
      </main>
      <Footer />
    </>
  );
}
