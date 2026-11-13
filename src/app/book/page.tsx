import Link from "next/link";
import { FiArrowRight, FiCalendar, FiMessageCircle, FiVideo } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingStudio from "@/components/booking/BookingStudio";
import { BookVisual } from "@/components/page/HeroVisuals";
import { PageCta, PageHero, StepCards } from "@/components/page/PageParts";
import SectionHead from "@/components/SectionHead";
import { BOOK_STEPS } from "@/lib/booking";
import { pageJsonLd } from "@/lib/pageJsonLd";
import { pageMetadata } from "@/lib/seo";

const TITLE = "Book a Call · Talk Through Your Web or Mobile App Project";
const DESCRIPTION =
  "Book a 15, 30 or 60 minute call on Google Meet with the developer who would build your website, web app or mobile app. Pick a time that suits you.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/book" });

export default function BookPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: pageJsonLd({
            path: "/book",
            title: TITLE,
            description: DESCRIPTION,
            crumbs: [{ name: "Home", path: "/" }, { name: "Book a call" }],
          }),
        }}
      />
      <Navbar />
      <main className="flex-1 relative" style={{ zIndex: 2 }}>
        <PageHero
          trail={[{ label: "Home", href: "/" }, { label: "Book a call" }]}
          eyebrow="Book a call"
          lead="Talk it through,"
          em="face to face."
          lede="Pick a time that suits you and we will go through what you need on Google Meet. You speak to the person who would build it, not a salesperson."
          aside={<BookVisual />}
        >
          <a href="#booking" className="btn btn-solid" data-cursor="Book">
            <span>Pick a time</span>
          </a>
          <Link href="/contact" className="btn">
            Prefer to write? <FiArrowRight />
          </Link>
        </PageHero>

        <BookingStudio />

        <section className="section">
          <div className="rule-top" />
          <div className="shell">
            <SectionHead
              eyebrow="02 · How it works"
              title="Three steps,"
              em="no friction"
              lede="Booking takes a minute, and there is nothing to prepare."
            />
            <StepCards steps={BOOK_STEPS} icons={[FiCalendar, FiVideo, FiMessageCircle]} />
          </div>
        </section>

        <PageCta copy="Would rather write it down? Send me the details and I will reply within a day, with questions or with a fixed quote once the scope is clear." />
      </main>
      <Footer />
    </>
  );
}
