import Link from "next/link";
import { FiArrowDownRight, FiCheck } from "react-icons/fi";
import { Reveal } from "../animations";
import { after } from "../heroMotion";
import { InfoCards, PageHero, StepCards } from "../page/PageParts";
import SectionHead from "../SectionHead";
import { getPackage } from "@/lib/packages";
import type { ServicePage } from "@/lib/services";

/*
  What is particular to a service page. Everything it shares with the other
  pages (the first screen, the cards, the steps, the FAQ, the projects, the
  list of other services, the closing call to action) is the same component
  those pages use; see page/PageParts.tsx, Faq.tsx, Work.tsx and Services.tsx.
*/

/** Every "start a project" link from a service page says which page it came from. */
const enquiryHref = (slug: string) => `/contact?ref=${slug}`;

export function ServiceHero({ s }: { s: ServicePage }) {
  const pkg = getPackage(s.pkg.name);

  return (
    <PageHero
      trail={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: s.name },
      ]}
      eyebrow={`${s.n} · Service`}
      lead={s.h1.lead}
      em={s.h1.em}
      lede={s.lede}
      aside={
        <aside className="svc-aside panel hero-in" style={after(0.45)} aria-label="Is this a good fit?">
          <p className="mono-label">Good fit if</p>
          <ul className="svc-fit">
            {s.fit.map((f) => (
              <li key={f}>
                <FiCheck size={14} aria-hidden="true" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <div className="svc-aside-foot">
            <span className="mono-label">Usually part of</span>
            <p className="svc-price">
              {pkg.name}
              <small>from ${pkg.price.toLocaleString("en-US")}</small>
            </p>
            <Link href="/packages" className="btn btn-solid btn-sm">
              <span>See the packages</span>
            </Link>
          </div>
        </aside>
      }
    >
      <Link href={enquiryHref(s.slug)} className="btn btn-solid" data-cursor="Talk">
        <span>Get a fixed quote</span>
      </Link>
      <a href="#included" className="btn">
        What&rsquo;s included <FiArrowDownRight />
      </a>
    </PageHero>
  );
}

export function ServiceIncluded({ s }: { s: ServicePage }) {
  return (
    <section id="included" className="section bg-glow-tr">
      <div className="rule-top" />
      <div className="shell">
        <SectionHead
          eyebrow="01 · Included"
          title="What you"
          em="get"
          lede="What a typical project includes. The scope is fixed in your quote, so you know what's in before any work starts."
        />
        <InfoCards items={s.included} />
      </div>
    </section>
  );
}

export function ServiceSteps({ s }: { s: ServicePage }) {
  return (
    <section className="section bg-grid">
      <div className="rule-top" />
      <div className="shell">
        <SectionHead
          eyebrow="02 · How it runs"
          title="How a project"
          em="runs"
          lede="Every project follows the same five stages: discovery, design, development, testing and launch. For this kind of work, they look like this."
        />
        <StepCards steps={s.steps} />
      </div>
    </section>
  );
}

export function ServiceStack({ s }: { s: ServicePage }) {
  const pkg = getPackage(s.pkg.name);

  return (
    <section className="section">
      <div className="rule-top" />
      <div className="shell">
        <div className="svc-split">
          <Reveal>
            <p className="eyebrow">03 · Built with</p>
            <h2 className="svc-h2">What this is built with</h2>
            <p className="svc-card-body" style={{ maxWidth: "46ch" }}>
              Tools chosen for the job, not for novelty. You get the repository, so
              nothing here locks you in.
            </p>
            <ul className="svc-tags">
              {s.stack.map((t) => (
                <li key={t}>
                  <span className="tag">{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="svc-pkg panel tick">
              <p className="mono-label">Where it fits in the packages</p>
              <p className="svc-price">
                {pkg.name}
                <small>from ${pkg.price.toLocaleString("en-US")}</small>
              </p>
              <p className="svc-card-body">{pkg.audience}</p>
              <p className="svc-card-body">{s.pkg.note}</p>
              <Link href="/packages" className="btn btn-solid btn-sm">
                <span>Compare all three packages</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
