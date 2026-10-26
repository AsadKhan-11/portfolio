import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { Counter, Reveal, SplitText, Stagger, StaggerItem } from "../animations";
import { CASE_STUDIES, LIVE_BUILDS, type CaseStudy } from "@/lib/caseStudies";
import { FlowPlayer, Frame, Gallery, Reel } from "./CaseMedia";

function Head({ eyebrow, title, em, lede }: { eyebrow: string; title: string; em: string; lede?: string }) {
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

export function CaseHero({ study }: { study: CaseStudy }) {
  const facts = [
    ["Role", study.role],
    ["Client", study.client],
    ["Year", study.year],
    ["Status", study.status],
  ];
  return (
    <section id="home" className="case-hero bg-glow-tr">
      <div className="shell">
        <Reveal>
          <Link href="/#work" className="case-back mono-label" data-cursor="Back">
            <FiArrowLeft size={14} /> All work
          </Link>
        </Reveal>

        <p className="eyebrow" style={{ marginTop: "clamp(2rem, 5vh, 3.5rem)" }}>
          Case study · {study.n}
        </p>
        <h1 className="case-title">
          <SplitText text={study.title} delay={0.1} />
        </h1>

        <div className="case-hero-row">
          <Reveal delay={0.25}>
            <p className="case-tagline">{study.tagline}</p>
          </Reveal>
          <Reveal delay={0.35}>
            <div className="case-tags">
              {study.tags.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.45}>
          <dl className="case-facts">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt className="mono-label">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {study.liveUrl && (
          <Reveal delay={0.5}>
            <a href={study.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-solid" style={{ marginTop: "2rem" }} data-cursor="Open">
              <span>Visit the platform</span>
              <FiArrowUpRight />
            </a>
          </Reveal>
        )}
      </div>
    </section>
  );
}

export function CaseReel({ study }: { study: CaseStudy }) {
  return (
    <section className="case-reel">
      <div className="shell">
        <Reveal y={48}>
          <Reel clip={study.clips[0]} label={`${study.title.toLowerCase()} · admin`} />
        </Reveal>
      </div>
    </section>
  );
}

export function CaseStory({ study }: { study: CaseStudy }) {
  return (
    <section className="section">
      <div className="rule-top" />
      <div className="shell">
        <Reveal>
          <p className="case-summary">{study.summary}</p>
        </Reveal>

        <div className="case-story">
          <Reveal>
            <p className="eyebrow">The challenge</p>
            <div className="case-prose">
              {study.challenge.map((p) => <p key={p}>{p}</p>)}
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="eyebrow">The approach</p>
            <div className="case-prose">
              {study.approach.map((p) => <p key={p}>{p}</p>)}
            </div>
          </Reveal>
        </div>

        <Stagger className="stat-row case-stats">
          {study.stats.map((s) => (
            <StaggerItem key={s.label} className="stat-cell">
              <p className="stat-num">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mono-label" style={{ marginTop: "0.75rem" }}>{s.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function CaseHighlights({ study }: { study: CaseStudy }) {
  return (
    <section className="section bg-glow-bl">
      <div className="rule-top" />
      <div className="shell">
        <Head
          eyebrow="What's inside"
          title="What it"
          em="does"
          lede={study.insideLede}
        />

        <div className="case-features">
          {study.highlights.map((h, i) => (
            <article key={h.title} className="case-feature" data-flip={i % 2 === 1}>
              <Reveal className="case-feature-copy">
                <p className="mono-label" style={{ color: "var(--flame)" }}>{h.kicker}</p>
                <h3 className="case-feature-title">{h.title}</h3>
                <p className="case-feature-body">{h.body}</p>
                <ul className="case-points">
                  {h.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </Reveal>
              <Reveal className="case-feature-shot" delay={0.1} y={40}>
                <Frame label={study.title.toLowerCase()}>
                  <Image
                    src={h.shot.src}
                    alt={h.shot.alt}
                    width={h.shot.w}
                    height={h.shot.h}
                    sizes="(max-width: 900px) 92vw, 52vw"
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </Frame>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CaseFlows({ study }: { study: CaseStudy }) {
  return (
    <section className="section">
      <div className="rule-top" />
      <div className="shell">
        <Head
          eyebrow="In motion"
          title="See it"
          em="working"
          lede="Short walkthroughs of the core workflows. They play on their own, one after another, or pick one from the list."
        />
        <Reveal delay={0.1} style={{ marginTop: "clamp(2.5rem, 6vh, 4rem)" }}>
          <FlowPlayer clips={study.clips} label={`${study.title.toLowerCase()} · walkthroughs`} />
        </Reveal>
      </div>
    </section>
  );
}

export function CaseGallery({ study }: { study: CaseStudy }) {
  return (
    <section className="section bg-glow-tr">
      <div className="rule-top" />
      <div className="shell">
        <Head eyebrow="Gallery" title="More" em="screens" lede="Click any screen to see it full size, then use the arrow keys to move through the set." />
        <Reveal delay={0.1} style={{ marginTop: "clamp(2.5rem, 6vh, 4rem)" }}>
          <Gallery shots={study.gallery} />
        </Reveal>
      </div>
    </section>
  );
}

export function CasePhones({ study }: { study: CaseStudy }) {
  return (
    <section className="section">
      <div className="rule-top" />
      <div className="shell">
        <Head
          eyebrow="Mobile"
          title="Made for the"
          em="phone"
          lede={study.phoneLede}
        />
        <Stagger className="case-phones">
          {study.phones.map((p) => (
            <StaggerItem key={p.src}>
              <figure className="case-phone">
                <span className="case-phone-screen">
                  <Image src={p.src} alt={p.alt} width={p.w} height={p.h} sizes="(max-width: 760px) 70vw, 24vw" style={{ width: "100%", height: "auto", display: "block" }} />
                </span>
                <figcaption className="mono-label">{p.caption}</figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function CaseDecisions({ study }: { study: CaseStudy }) {
  return (
    <section className="section bg-glow-bl">
      <div className="rule-top" />
      <div className="shell">
        <Head eyebrow="How it fits together" title="Thinking" em="behind it" lede="AI that does the heavy lifting, and people who stay in control of the relationship." />
        <Stagger className="case-decisions">
          {study.decisions.map((d, i) => (
            <StaggerItem key={d.title} className="panel case-decision">
              <p className="mono-label" style={{ color: "var(--flame)" }}>{String(i + 1).padStart(2, "0")}</p>
              <h3 className="case-decision-title">{d.title}</h3>
              <p className="case-decision-body">{d.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/*
  Other work to explore. Case studies come first (everything but the one on
  screen), then the live builds, so new case studies show up here with no
  further changes.
*/
export function CaseMore({ study }: { study: CaseStudy }) {
  const others = CASE_STUDIES.filter((c) => c.slug !== study.slug);
  const cards = [
    ...others.map((c) => ({ key: c.slug, shot: c.card, title: c.title, meta: c.meta, href: `/work/${c.slug}`, label: "Case study" })),
    ...LIVE_BUILDS.map((b) => ({ key: b.key, shot: b.shot, title: b.title, meta: b.meta, href: b.url, label: b.domain })),
  ];

  return (
    <section className="section bg-glow-tr">
      <div className="rule-top" />
      <div className="shell">
        <Head
          eyebrow="Keep exploring"
          title="More"
          em="selected work"
          lede={others.length ? "Other case studies, plus the sites I've built and shipped." : "More of what I've built and shipped."}
        />

        <Stagger className="case-more">
          {cards.map((c) => {
            const internal = c.href.startsWith("/");
            const body = (
              <>
                <span className="work-shot">
                  <Image src={c.shot} alt={`${c.title} ${internal ? "case study" : "website"}`} fill sizes="(max-width: 760px) 92vw, 30vw" style={{ objectFit: "cover", objectPosition: "top" }} />
                </span>
                <span className="work-card-foot">
                  <span className="work-card-title">{c.title}</span>
                  <span className="mono-label work-card-domain">
                    {c.label} {internal ? <FiArrowRight size={13} /> : <FiArrowUpRight size={13} />}
                  </span>
                  <span className="mono-label work-card-meta">{c.meta}</span>
                </span>
              </>
            );
            return (
              <StaggerItem key={c.key}>
                {internal ? (
                  <Link href={c.href} className="work-card" data-cursor="Read">{body}</Link>
                ) : (
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className="work-card" data-cursor="Visit">{body}</a>
                )}
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal delay={0.1}>
          <div className="case-more-cta">
            <Link href="/#work" className="btn">
              <span>View all work</span>
              <FiArrowRight />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function CaseOutro({ study }: { study: CaseStudy }) {
  return (
    <section className="section">
      <div className="rule-top" />
      <div className="shell case-outro">
        <Reveal>
          <p className="eyebrow" style={{ justifyContent: "center" }}>Next step</p>
          <h2 className="case-outro-title">
            Need a platform
            <br />
            <span className="serif-em" style={{ color: "var(--flame)" }}>like {study.title}?</span>
          </h2>
          <div className="case-outro-actions">
            <Link href="/#contact" className="btn btn-solid" data-cursor="Talk">
              <span>Start a project</span>
              <FiArrowUpRight />
            </Link>
            <Link href="/#work" className="btn">
              <span>Back to all work</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
