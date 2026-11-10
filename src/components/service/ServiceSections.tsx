import Image from "next/image";
import Link from "next/link";
import {
  FiArrowDownRight,
  FiArrowRight,
  FiArrowUpRight,
  FiCheck,
  FiPlus,
} from "react-icons/fi";
import { Reveal, SplitText } from "../animations";
import { MaskWords, after } from "../heroMotion";
import { CASE_STUDIES } from "@/lib/caseStudies";
import { getPackage } from "@/lib/packages";
import { SERVICES, serviceHref, type ServicePage } from "@/lib/services";

/*
  The building blocks of a service page, as plain server components: the
  copy is real HTML in the file, not something that assembles itself after
  the page loads. The only client pieces are the scroll-reveal wrappers
  (Reveal, SplitText) used further down the page; the first screen uses the
  CSS entrance from the home page's hero (.hero-in, MaskWords), so it never
  waits on JavaScript.

  The About page borrows Crumbs, SectionHead and the case-study cards.
*/

/** Every "start a project" link from a service page says which page it came from. */
const enquiryHref = (slug: string) => `/?ref=${slug}#contact`;

export function Crumbs({ trail }: { trail: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="svc-crumbs">
      <ol>
        {trail.map((c) => (
          <li key={c.label}>
            {c.href ? (
              <Link href={c.href}>{c.label}</Link>
            ) : (
              <span aria-current="page">{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function SectionHead({
  eyebrow,
  title,
  em,
  lede,
}: {
  eyebrow: string;
  title: string;
  em: string;
  lede?: string;
}) {
  return (
    <div className="section-head">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="section-title" style={{ marginTop: "1.75rem" }}>
          <SplitText text={title} />
          <br />
          <span className="serif-em" style={{ color: "var(--flame)" }}>
            <SplitText text={em} delay={0.1} />
          </span>
        </h2>
      </div>
      {lede && (
        <Reveal delay={0.15}>
          <p className="lede">{lede}</p>
        </Reveal>
      )}
    </div>
  );
}

/** Case-study cards in the same grid the case pages use for "more work". */
export function CaseCards({ slugs }: { slugs: string[] }) {
  const studies = slugs
    .map((slug) => CASE_STUDIES.find((c) => c.slug === slug))
    .filter((c): c is (typeof CASE_STUDIES)[number] => Boolean(c));
  if (!studies.length) return null;

  return (
    <div className="case-more svc-related">
      {studies.map((c) => (
        <Reveal key={c.slug}>
          <Link href={`/work/${c.slug}`} className="work-card" data-cursor="Read">
            <span className="work-shot">
              <Image
                src={c.card}
                alt={`${c.title} case study`}
                fill
                sizes="(max-width: 760px) 92vw, 30vw"
                style={{ objectFit: "cover", objectPosition: "top" }}
              />
            </span>
            <span className="work-card-foot">
              <span className="work-card-title">{c.title}</span>
              <span className="mono-label work-card-domain">
                Case study <FiArrowRight size={13} />
              </span>
              <span className="mono-label work-card-meta">{c.meta}</span>
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

const wordCount = (text: string) => text.split(" ").length;

export function ServiceHero({ s }: { s: ServicePage }) {
  const pkg = getPackage(s.pkg.name);
  /* The serif ending starts a beat after the plain words have finished. */
  const emDelay = 0.1 + wordCount(s.h1.lead) * 0.06 + 0.08;

  return (
    <section className="svc-hero">
      <div className="shell">
        <Crumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/#services" },
            { label: s.name },
          ]}
        />

        <div className="svc-hero-grid">
          <div>
            <p className="eyebrow hero-in hero-in-fade" style={after(0.05)}>
              {s.n} · Service
            </p>

            <h1 className="svc-title">
              <MaskWords text={s.h1.lead} delay={0.1} />{" "}
              <span className="serif-em" style={{ color: "var(--flame)" }}>
                <MaskWords text={s.h1.em} delay={emDelay} />
              </span>
            </h1>

            <p className="svc-lede hero-in" style={after(0.4)}>
              {s.lede}
            </p>

            <div className="svc-cta-row hero-in" style={after(0.5)}>
              <Link href={enquiryHref(s.slug)} className="btn btn-solid" data-cursor="Talk">
                <span>Get a fixed quote</span>
              </Link>
              <a href="#included" className="link-sweep hero-quiet-link">
                What&rsquo;s included <FiArrowDownRight />
              </a>
            </div>
          </div>

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
              <Link href="/#packages" className="link-sweep svc-aside-link">
                See the packages
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
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

        <div className="svc-cards">
          {s.included.map((item, i) => (
            <Reveal key={item.title} className="svc-cell" delay={(i % 2) * 0.06}>
              <article className="svc-card panel tick">
                <span className="svc-card-n">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="svc-card-title">{item.title}</h3>
                <p className="svc-card-body">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
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

        <ol className="svc-steps">
          {s.steps.map((step, i) => (
            <li key={step.title} className="svc-cell">
              <Reveal className="svc-cell" delay={i * 0.06}>
                <div className="svc-step panel">
                  <span className="svc-step-n" aria-hidden="true">
                    {i + 1}
                  </span>
                  <h3 className="svc-card-title">{step.title}</h3>
                  <p className="svc-card-body">{step.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
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
              <Link href="/#packages" className="link-sweep svc-aside-link">
                Compare all three packages
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function ServiceRelated({ s }: { s: ServicePage }) {
  if (!s.related.length) return null;

  return (
    <section className="section bg-glow-bl">
      <div className="rule-top" />
      <div className="shell">
        <SectionHead
          eyebrow="04 · Related work"
          title="Work like"
          em="this"
          lede="Projects where I've done this kind of work. Each one has a full case study: what was built, and why."
        />
        <CaseCards slugs={s.related} />
      </div>
    </section>
  );
}

export function ServiceFaq({ s }: { s: ServicePage }) {
  return (
    <section className="section bg-raised">
      <div className="rule-top" />
      <div className="shell">
        <SectionHead
          eyebrow="05 · FAQ"
          title="Before you"
          em="ask"
          lede="The questions that come up most before a project like this starts. If yours isn't here, ask me directly."
        />

        {/* Native <details>: the answers are in the page whether or not
            anything is open, and it works without JavaScript. */}
        <div className="svc-faq faq-list">
          {s.faqs.map((faq, i) => (
            <details key={faq.q} className="faq-item svc-faq-item" open={i === 0}>
              <summary className="faq-question">
                <span className="mono-label faq-num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="faq-text">{faq.q}</h3>
                <span className="faq-toggle" aria-hidden="true">
                  <FiPlus size={18} />
                </span>
              </summary>
              <p className="faq-answer">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceMore({ s }: { s: ServicePage }) {
  const others = SERVICES.filter((x) => x.slug !== s.slug);

  return (
    <section className="section">
      <div className="rule-top" />
      <div className="shell">
        <SectionHead
          eyebrow="06 · More services"
          title="Often paired"
          em="with"
          lede="Most projects use several of these at once, which is the point of hiring one person for the whole stack."
        />

        <ul className="svc-more">
          {others.map((x) => (
            <li key={x.slug}>
              <Link href={serviceHref(x.slug)} className="svc-more-link panel tick" data-cursor="Read">
                <span className="svc-card-n">{x.n}</span>
                <span className="svc-more-name">{x.name}</span>
                <span className="svc-card-body">{x.short}</span>
                <FiArrowRight className="svc-more-arrow" size={18} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function PageCta({ copy }: { copy?: string }) {
  return (
    <section className="section">
      <div className="rule-top" />
      <div className="shell case-outro">
        <Reveal>
          <p className="eyebrow" style={{ justifyContent: "center" }}>
            Next step
          </p>
          <h2 className="case-outro-title">
            Have a project
            <br />
            <span className="serif-em" style={{ color: "var(--flame)" }}>
              in mind?
            </span>
          </h2>
          <p className="lede svc-cta-copy">
            {copy ??
              "Tell me what you're building. I reply within a day, with questions or with a fixed quote once the scope is clear."}
          </p>
          <div className="case-outro-actions">
            <Link href="/#contact" className="btn btn-solid" data-cursor="Talk">
              <span>Start a project</span>
              <FiArrowUpRight />
            </Link>
            <Link href="/#packages" className="btn">
              <span>See the packages</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
