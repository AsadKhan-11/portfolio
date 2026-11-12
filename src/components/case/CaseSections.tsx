import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiArrowUpRight, FiInfo, FiPlus } from "react-icons/fi";
import { Counter, Reveal, Stagger, StaggerItem } from "../animations";
import { MaskWords, ScrollCue, after } from "../heroMotion";
import { CASE_STUDIES, LIVE_BUILDS, isSiteStudy, roleInSentence, type CaseStudy } from "@/lib/caseStudies";
import { getLiveApp } from "@/lib/liveApps";
import { toProject } from "@/lib/projects";
import SectionHead from "../SectionHead";
import { Device, FlowPlayer, Frame, Gallery, MoreGrid, PhoneReel, Reel } from "./CaseMedia";
import LiveApp from "./LiveApp";
import SiteFrame from "./SiteFrame";

const isMobile = (s: CaseStudy) => s.platform === "mobile";

/*
  Every "start a project" link out of a case study carries the slug, so the
  contact form can say what the enquiry came from and the enquiry itself
  arrives attributed. Without it a lead from this page is indistinguishable
  from one off the home page.
*/
export const enquiryHref = (s: CaseStudy) => `/contact?ref=${s.slug}`;

/* Characters in the longest word — what the hero title has to fit. */
const longestWord = (title: string) =>
  title.split(" ").reduce((a, b) => (b.length > a.length ? b : a)).length;

/*
  Clips the hero reel is not already playing.

  The first clip is always the overview — "Platform walkthrough", "The
  full page", "Customer tour" — and the reel at the top of the page plays
  it. Listing it again in "See it working" meant the same file ran twice
  on one page, which is the repetition that stood out most. The phone
  reel carries three, so a mobile study skips that many.
*/
const flowClips = (s: CaseStudy) => s.clips.slice(isMobile(s) ? 3 : 1);

/* Anchors for the jump nav. Sections that can be absent are filtered out. */
const SECTION_IDS = {
  overview: "overview",
  features: "features",
  live: "try-it",
  site: "live-site",
  walkthroughs: "walkthroughs",
  gallery: "gallery",
  mobile: "mobile",
  decisions: "decisions",
} as const;


/*
  The first screen uses the same CSS entrance as every other page's (.hero-in,
  MaskWords), not Framer Motion's Reveal and SplitText. Those render hidden on
  the server and are revealed only after the page hydrates, so on a slow phone
  the tagline, the biggest thing in view, was the last to appear: Lighthouse
  measured the largest paint at 6.4s here against 0.9s on the pages already on
  the CSS entrance.
*/
export function CaseHero({ study }: { study: CaseStudy }) {
  return (
    <section id="home" className="case-hero bg-glow-tr">
      <div className="shell">
        {/*
          Visible trail, not just JSON-LD: Google's structured data policy
          says markup must not describe information the visitor cannot see.
        */}
        <div className="hero-in hero-in-fade" style={after(0.05)}>
          <nav className="case-crumbs mono-label" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/" data-cursor="Home">Home</Link>
              </li>
              <li>
                <Link href="/work" data-cursor="Back">Projects</Link>
              </li>
              <li aria-current="page">{study.title}</li>
            </ol>
          </nav>
        </div>

        <p
          className="eyebrow hero-in hero-in-fade"
          style={{ marginTop: "clamp(2rem, 5vh, 3.5rem)", ...after(0.1) }}
        >
          Case study · {study.n} · {study.type}
        </p>
        {/*
          The title wraps between words but a single word cannot break, so
          the type has to be sized to the longest one. "Aesthetics" is the
          widest in the set and overflowed the column at every viewport.
        */}
        <h1
          className="case-title"
          style={{ "--case-chars": longestWord(study.title) } as CSSProperties}
        >
          <MaskWords text={study.title} delay={0.1} />
        </h1>

        {/*
          Tagline and its call to action on the left, capability tags on
          the right. The hero used to carry a four-column facts table and
          the disclosure note underneath as well, which left it cluttered
          — the facts are gone and the note now sits with the overview.
        */}
        <div className="case-hero-row">
          <div className="hero-in" style={after(0.25)}>
            <p className="case-tagline">{study.tagline}</p>
            <Link href={enquiryHref(study)} className="btn btn-solid case-hero-cta" data-cursor="Talk">
              <span>Start something like this</span>
              <FiArrowRight />
            </Link>
          </div>
          <div className="hero-in" style={after(0.35)}>
            <div className="case-tags">
              {study.tags.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-cue">
        <ScrollCue after={0.9} />
      </div>
    </section>
  );
}

/*
  Jump nav. An eighteen-screen page with no way to skip to the part you
  came for is a page people leave. Doubles as real internal anchors, which
  is what Google's AI-features guidance asks for ("make content easy to
  find with internal links").
*/
export function CaseJump({ study }: { study: CaseStudy }) {
  /*
    What the page has, in the order it has it. A site opens on its live frame;
    an app's walkthroughs and gallery are gone, and only a mobile app (which
    has no running copy to open) keeps them.
  */
  const site = isSiteStudy(study);
  const links = [
    ...(site ? [{ id: SECTION_IDS.site, label: "Live site" }] : []),
    { id: SECTION_IDS.overview, label: "Overview" },
    { id: SECTION_IDS.features, label: "What it does" },
    ...(getLiveApp(study.slug) ? [{ id: SECTION_IDS.live, label: "Try it" }] : []),
    ...(isMobile(study) && flowClips(study).length
      ? [{ id: SECTION_IDS.walkthroughs, label: "Walkthroughs" }]
      : []),
    ...(isMobile(study) ? [{ id: SECTION_IDS.gallery, label: "Screens" }] : []),
    ...(!site && !isMobile(study) && study.phones.length
      ? [{ id: SECTION_IDS.mobile, label: "Mobile" }]
      : []),
    { id: SECTION_IDS.decisions, label: "Decisions" },
  ];

  return (
    <nav className="case-jump" aria-label="Sections of this case study">
      <div className="shell">
        <p className="mono-label case-jump-head">In this case study</p>
        <ul>
          {links.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} data-cursor="Jump">{l.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export function CaseReel({ study }: { study: CaseStudy }) {
  const hero = study.clips[0];
  return (
    <section className="case-reel">
      <div className="shell">
        <Reveal y={48}>
          {isMobile(study) ? (
            <PhoneReel clips={study.clips} />
          ) : (
            <figure className="case-reel-fig">
              <Reel
                clip={hero}
                label={study.reelLabel ?? `${study.title.toLowerCase()} · admin`}
              />
              {/*
                Says what is playing. The reel used to carry the title only
                as an aria-label, which left the video unlabelled on screen
                — and since this clip no longer appears in the walkthrough
                list, its VideoObject markup would have been describing
                something no visitor could read.
              */}
              <figcaption className="case-reel-cap">
                <span className="mono-label">{hero.title}</span>
                <span>{hero.blurb}</span>
              </figcaption>
            </figure>
          )}
        </Reveal>
      </div>
    </section>
  );
}

export function CaseStory({ study }: { study: CaseStudy }) {
  return (
    <section id={SECTION_IDS.overview} className="section">
      <div className="rule-top" />
      <div className="shell">
        <div className="case-lead">
          <div className="case-lead-copy">
            <Reveal>
              <p className="eyebrow">The short version</p>
              <p className="case-pitch">{study.pitch}</p>
            </Reveal>
            <Stagger className="case-brief" gap={0.12}>
              {study.brief.map((b, i) => (
                <StaggerItem key={b.label} className="case-brief-item">
                  <span className="case-brief-n mono-label">0{i + 1}</span>
                  <div>
                    <p className="case-brief-label">{b.label}</p>
                    <p className="case-brief-text">{b.text}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal className="case-lead-art" delay={0.2} y={30}>
            <figure className="case-lead-fig">
              <span className="case-lead-glow" aria-hidden="true" />
              <Image
                src="/brand/pointing.webp"
                alt="Asad Khan pointing at the summary of the project"
                width={900}
                height={1200}
                sizes="(max-width: 900px) 240px, 420px"
                className="case-lead-img"
              />
            </figure>
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

        {/*
          The summary is the page's own meta description and the densest
          plain-language account of the build, so it stays visible. Google
          says accordion content carries full ranking weight, but the
          counter-evidence is live enough that hiding the one paragraph
          that matters most is a bad trade. The long prose still collapses.
        */}
        <Reveal>
          <p className="case-summary-lead">{study.summary}</p>
        </Reveal>

        {/*
          Moved down from the hero, which it was crowding. It stays on the
          page: on the concept builds it is the line saying the clinic,
          the practitioner and the photography are invented, and a
          portfolio that shows fictional clients without saying so is
          making a claim it cannot back.
        */}
        {study.note && (
          <Reveal delay={0.1}>
            <p className="case-note">
              <FiInfo size={14} aria-hidden="true" />
              {study.note}
            </p>
          </Reveal>
        )}

        <details className="case-full">
          <summary>
            <span className="mono-label">Read the full story</span>
            <FiPlus size={16} aria-hidden="true" />
          </summary>
          <div className="case-full-body">
            <div className="case-story">
              <div>
                <p className="eyebrow">The challenge</p>
                <div className="case-prose">
                  {study.challenge.map((p) => <p key={p}>{p}</p>)}
                </div>
              </div>
              <div>
                <p className="eyebrow">The approach</p>
                <div className="case-prose">
                  {study.approach.map((p) => <p key={p}>{p}</p>)}
                </div>
              </div>
            </div>
          </div>
        </details>
      </div>
    </section>
  );
}

export function CaseHighlights({ study }: { study: CaseStudy }) {
  return (
    <section id={SECTION_IDS.features} className="section bg-glow-bl">
      <div className="rule-top" />
      <div className="shell">
        <SectionHead
          eyebrow="What's inside"
          title="What it"
          em="does"
          lede={study.insideLede}
        />

        <div className="case-features">
          {study.highlights.map((h, i) => (
            <article key={h.title} className="case-feature" data-flip={i % 2 === 1} data-device={isMobile(study) || undefined}>
              <Reveal className="case-feature-copy">
                <p className="mono-label" style={{ color: "var(--flame)" }}>{h.kicker}</p>
                <h3 className="case-feature-title">{h.title}</h3>
                <p className="case-feature-body">{h.body}</p>
                <ul className="case-points">
                  {h.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </Reveal>
              <Reveal className="case-feature-shot" delay={0.1} y={40}>
                {isMobile(study) ? (
                  <Device label={h.shot.alt}>
                    <Image
                      src={h.shot.src}
                      alt={h.shot.alt}
                      width={h.shot.w}
                      height={h.shot.h}
                      sizes="(max-width: 900px) 70vw, 340px"
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                  </Device>
                ) : (
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
                )}
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CaseFlows({ study }: { study: CaseStudy }) {
  const clips = flowClips(study);
  if (clips.length === 0) return null;

  return (
    <section id={SECTION_IDS.walkthroughs} className="section">
      <div className="rule-top" />
      <div className="shell">
        <SectionHead
          eyebrow="In motion"
          title="See it"
          em="working"
          lede={
            isMobile(study)
              ? "Screen recordings from the running app, past the three playing above. They play on their own, one after another, or pick one from the list."
              : "The full tour is playing at the top of the page; these are the parts worth slowing down for. They play on their own, one after another, or pick one from the list."
          }
        />
        <Reveal delay={0.1} style={{ marginTop: "clamp(2.5rem, 6vh, 4rem)" }}>
          <FlowPlayer clips={clips} label={`${study.title.toLowerCase()} · walkthroughs`} device={isMobile(study)} />
        </Reveal>
      </div>
    </section>
  );
}

export function CaseGallery({ study }: { study: CaseStudy }) {
  return (
    <section id={SECTION_IDS.gallery} className="section bg-glow-tr">
      <div className="rule-top" />
      <div className="shell">
        <SectionHead eyebrow="Gallery" title={isMobile(study) ? "Screen by" : "More"} em={isMobile(study) ? "screen" : "screens"} lede="Click any screen to see it full size, then use the arrow keys to move through the set." />
        <Reveal delay={0.1} style={{ marginTop: "clamp(2.5rem, 6vh, 4rem)" }}>
          <Gallery shots={study.gallery} device={isMobile(study)} />
        </Reveal>
      </div>
    </section>
  );
}

export function CasePhones({ study }: { study: CaseStudy }) {
  if (isMobile(study) || study.phones.length === 0) return null;
  return (
    <section id={SECTION_IDS.mobile} className="section">
      <div className="rule-top" />
      <div className="shell">
        <SectionHead
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
    <section id={SECTION_IDS.decisions} className="section bg-glow-bl">
      <div className="rule-top" />
      <div className="shell">
        <SectionHead eyebrow="How it fits together" title="Thinking" em="behind it" lede={study.decisionsLede ?? "AI that does the heavy lifting, and people who stay in control of the relationship."} />
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
  Mid-page CTA, placed straight after the walkthroughs — the point where a
  visitor has seen the thing actually work and is as convinced as the page
  will make them. Everything below this is reassurance; making them scroll
  all of it to find a way to get in touch loses the ones already sold.
*/
export function CaseMidCta({ study }: { study: CaseStudy }) {
  return (
    <aside className="case-midcta" aria-label="Enquire about a project like this">
      <div className="shell">
        <Reveal>
          <div className="case-midcta-inner">
            <div>
              <p className="eyebrow">Seen enough?</p>
              <p className="case-midcta-copy">
                {study.title} took {roleInSentence(study)}, start to finish.
                If you want something built to this standard, tell me what you
                have in mind and I&rsquo;ll come back with a fixed quote.
              </p>
            </div>
            <Link href={enquiryHref(study)} className="btn btn-solid" data-cursor="Talk">
              <span>Get a fixed quote</span>
              <FiArrowUpRight />
            </Link>
          </div>
        </Reveal>
      </div>
    </aside>
  );
}

/*
  Other work to explore. Case studies come first (everything but the one on
  screen), then the live builds, so new case studies show up here with no
  further changes.
*/
export function CaseMore({ study }: { study: CaseStudy }) {
  const others = CASE_STUDIES.filter((c) => c.slug !== study.slug);
  const projects = [...others.map(toProject), ...LIVE_BUILDS];

  return (
    <section className="section bg-glow-tr">
      <div className="rule-top" />
      <div className="shell">
        <SectionHead
          eyebrow="Keep exploring"
          title="More"
          em="selected work"
          lede="A few more things I've built and shipped, picked at random each visit."
        />

        <MoreGrid projects={projects} />

        <Reveal delay={0.1}>
          <div className="case-more-cta">
            <Link href="/work" className="btn btn-solid">
              <span>View all projects</span>
              <FiArrowRight />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/*
  The running app, for the case studies that have one deployed (see
  lib/liveApps.ts). Absent for the rest, with its jump-menu link.
*/
export function CaseLive({ study }: { study: CaseStudy }) {
  const app = getLiveApp(study.slug);
  if (!app) return null;

  return (
    <section id={SECTION_IDS.live} className="section">
      <div className="rule-top" />
      <div className="shell">
        <SectionHead
          eyebrow="Try it"
          title="Click through"
          em="the real thing"
          lede={
            app.lede ??
            `This is ${study.title} running, not a recording. Jump to a screen, or use the menu inside it. Nothing you do here is saved.`
          }
        />
        <Reveal y={40}>
          <LiveApp name={study.title} url={app.url} pages={app.pages} poster={study.highlights[0].shot} hint={app.hint} />
        </Reveal>
      </div>
    </section>
  );
}

/*
  A site's opening: the live site in a frame, in the place an app has its
  recorded reel. Needs the site's address; a study of a site with none has
  nothing to show here and the section is simply absent.
*/
export function CaseSite({ study }: { study: CaseStudy }) {
  if (!study.liveUrl) return null;

  return (
    <section id={SECTION_IDS.site} className="case-reel">
      <div className="shell">
        <Reveal y={48}>
          <SiteFrame
            name={study.title}
            url={study.liveUrl}
            poster={{ src: study.card, w: 1200, h: 750, alt: `${study.title} home page` }}
          />
          <p className="case-reel-cap">
            <span className="mono-label">The site, running</span>
            <span>The real site, running here. Scroll it and click through it as a visitor would.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
