import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Faq from "@/components/Faq";
import { PageHero, StepCards } from "@/components/page/PageParts";
import SectionHead from "@/components/SectionHead";
import { getFaqs } from "@/lib/faqs";
import { pageJsonLd } from "@/lib/pageJsonLd";
import { pageMetadata } from "@/lib/seo";

const TITLE = "Contact · Start a Web Project with WebForge Digital";
const DESCRIPTION =
  "Tell me about your website, web app or AI feature. I reply within a day with questions or a fixed quote. Email, phone or the form, from Lahore, Pakistan.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/contact" });

/* What happens after the form is sent: each step restates the FAQ and the process. */
const NEXT_STEPS = [
  {
    title: "I reply within a day",
    body: "I read what you've sent and come back with questions, or with a fixed quote once the scope is clear.",
  },
  {
    title: "We talk it through",
    body: "A short call or a few messages to pin down goals, audience and constraints. I'll tell you if a simpler build gets you there faster.",
  },
  {
    title: "You get a fixed quote",
    body: "A fixed price and a realistic timeline up front, before anything is built.",
  },
  {
    title: "You watch it come together",
    body: "Work starts with a staging link you can open any day of the week, so progress is something you see.",
  },
];

/*
  The same section as the home page's contact (components/Contact.tsx), the
  same details beside the same form, under a first screen of its own. The
  form reads the enquiry's ?ref= tag itself, so a link like
  /contact?ref=web-apps still says which page it came from.

  What a contact page should carry, per Nielsen Norman Group's research: a
  phone number and an email address beside the form, the hours or time zone
  and how long a reply takes, a short form with its required fields marked,
  and what happens after it is sent. All of it is here.
*/
export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: pageJsonLd({
            path: "/contact",
            type: "ContactPage",
            title: TITLE,
            description: DESCRIPTION,
            crumbs: [{ name: "Home", path: "/" }, { name: "Contact" }],
          }),
        }}
      />
      <Navbar />
      <main className="flex-1 relative" style={{ zIndex: 2 }}>
        <PageHero
          trail={[{ label: "Home", href: "/" }, { label: "Contact" }]}
          eyebrow="Contact"
          lead="Let’s build"
          em="something together."
          lede="Whether you have a spec ready or just the beginning of an idea, tell me about it. Email, phone or the form: I reply within a day."
        />

        <Contact head={false} />

        <section className="section bg-grid">
          <div className="rule-top" />
          <div className="shell">
            <SectionHead
              eyebrow="What happens next"
              title="What happens"
              em="next"
              lede="No hand-offs, no surprises. Here is how an enquiry turns into a project."
            />
            <StepCards steps={NEXT_STEPS} />
          </div>
        </section>

        <Faq
          head={{
            eyebrow: "FAQ",
            title: "Before you",
            em: "ask",
            lede: "The questions that come up most before a project starts. If yours isn't here, ask me directly.",
          }}
          items={getFaqs(["start", "need-from-you", "timeline", "outside-pakistan"])}
          askHref="#contact"
        />
      </main>
      <Footer />
    </>
  );
}
