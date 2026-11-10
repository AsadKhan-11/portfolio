import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MaskWords, after } from "@/components/heroMotion";
import { CASE_STUDIES } from "@/lib/caseStudies";
import { SERVICES, serviceHref } from "@/lib/services";

/*
  The page for any address that isn't a page. A static export builds this
  into out/404.html, and Cloudflare serves that file, with a real 404 status,
  for every unknown path (wrangler.jsonc: not_found_handling "404-page").
  The status is what makes search engines drop a dead URL; noindex covers a
  copy of the page that somebody links to.

  Every link is absolute: this one file answers for /anything/at/any/depth.
  The links are the site's own lists (services, case studies), so a page
  that is added later turns up here without anyone remembering to.
*/
export const metadata: Metadata = {
  title: "Page not found · WebForge Digital",
  description: "That page doesn't exist. Here are the pages that do.",
  /* The root layout points every page's canonical at the home page; a 404
     is not a copy of it. */
  alternates: {},
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1 relative" style={{ zIndex: 2 }}>
        <section className="svc-hero nf-hero">
          <p className="nf-code hero-in" style={after(0.05)} aria-hidden="true">
            404
          </p>

          <div className="shell">
            <p className="eyebrow hero-in hero-in-fade" style={after(0.05)}>
              Error 404
            </p>

            <h1 className="svc-title">
              <MaskWords text="That page" delay={0.1} />{" "}
              <span className="serif-em" style={{ color: "var(--flame)" }}>
                <MaskWords text="isn’t here." delay={0.28} />
              </span>
            </h1>

            <p className="svc-lede hero-in" style={after(0.4)}>
              The link may be old, or the address mistyped. Nothing is broken on your
              side. Here is where most people are headed.
            </p>

            <div className="svc-cta-row hero-in" style={after(0.5)}>
              <Link href="/" className="btn btn-solid" data-cursor="Home">
                <span>Back to the home page</span>
              </Link>
              <Link href="/#work" className="link-sweep hero-quiet-link">
                See the work <FiArrowRight />
              </Link>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="rule-top" />
          <div className="shell">
            <div className="nf-columns">
              <nav aria-label="Services">
                <p className="eyebrow">Services</p>
                <ul className="nf-list">
                  {SERVICES.map((s) => (
                    <li key={s.slug}>
                      <Link href={serviceHref(s.slug)}>{s.name}</Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <nav aria-label="Work">
                <p className="eyebrow">Work</p>
                <ul className="nf-list">
                  {CASE_STUDIES.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/work/${c.slug}`}>
                        {c.title} <small>{c.meta}</small>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <nav aria-label="More">
                <p className="eyebrow">More</p>
                <ul className="nf-list">
                  <li>
                    <Link href="/about">About</Link>
                  </li>
                  <li>
                    <Link href="/#packages">Packages</Link>
                  </li>
                  <li>
                    <Link href="/#contact">Contact</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
