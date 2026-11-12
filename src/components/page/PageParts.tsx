import type { ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "../animations";
import Contact from "../Contact";
import { MaskWords, ScrollCue, after } from "../heroMotion";

/*
  The parts every page other than the home page is built from: the trail at
  the top, the full-height first screen, the cards that list what is
  included, the numbered steps and the closing call to action. One copy of
  each, used by the service pages, About, and the projects, services,
  packages, FAQs and contact pages.

  Plain server components. The first screen uses the CSS entrance from the
  home page's hero (.hero-in, MaskWords), so it never waits on JavaScript.
*/

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

/*
  The first screen of every page but the home page. It fills the screen
  (100svh, so a phone's address bar can't cut the bottom off) with its content
  centred, a scroll cue at the foot, and, when `aside` is given, a second
  column beside the words: the "good fit" panel on a service page, the
  portrait on About.
*/
export function PageHero({
  trail,
  eyebrow,
  lead,
  em,
  lede,
  kicker,
  aside,
  asideOnMobile = false,
  children,
}: {
  trail: { label: string; href?: string }[];
  eyebrow: string;
  /** The headline in two parts: plain words, then the flame-coloured serif ending. */
  lead: string;
  em: string;
  /** One paragraph, or several. */
  lede: string | string[];
  /** A small line of status under the paragraph, such as "Booking new builds". */
  kicker?: string;
  aside?: ReactNode;
  /** The picture is hidden below 960px, where it would stack under the words, unless this is set (About's portrait). */
  asideOnMobile?: boolean;
  /** The buttons and links under the paragraph. */
  children?: ReactNode;
}) {
  /* The serif ending starts a beat after the plain words have finished. */
  const emDelay = 0.1 + lead.split(" ").length * 0.06 + 0.08;
  const paragraphs = Array.isArray(lede) ? lede : [lede];

  const words = (
    <div>
      <p className="eyebrow hero-in hero-in-fade" style={after(0.05)}>
        {eyebrow}
      </p>

      <h1 className="svc-title">
        <MaskWords text={lead} delay={0.1} />{" "}
        <span className="serif-em" style={{ color: "var(--flame)" }}>
          <MaskWords text={em} delay={emDelay} />
        </span>
      </h1>

      {paragraphs.map((p, i) => (
        <p key={p} className="svc-lede hero-in" style={after(0.4 + i * 0.08)}>
          {p}
        </p>
      ))}

      {kicker && (
        <p className="hero-kicker mono-label svc-kicker hero-in hero-in-fade" style={after(0.5)}>
          <span className="hero-kicker-dot" aria-hidden="true" />
          {kicker}
        </p>
      )}

      {children && (
        <div className="svc-cta-row hero-in" style={after(0.55)}>
          {children}
        </div>
      )}
    </div>
  );

  return (
    <section id="home" className="svc-hero">
      <div className="shell">
        <Crumbs trail={trail} />
        {aside ? (
          <div className="svc-hero-grid">
            {words}
            <div className={`svc-hero-aside${asideOnMobile ? " keep" : ""}`}>{aside}</div>
          </div>
        ) : (
          words
        )}
      </div>

      <div className="scroll-cue">
        <ScrollCue after={0.9} />
      </div>
    </section>
  );
}

/*
  Cards for a list of things that come with something: what a project
  includes, what every package includes, how pricing works. `columns` is how
  many sit across on a wide screen.
*/
export function InfoCards({
  items,
  columns = 2,
}: {
  items: { title: string; body: string }[];
  columns?: 2 | 3;
}) {
  return (
    <div className={`svc-cards${columns === 3 ? " svc-cards-3" : ""}`}>
      {items.map((item, i) => (
        <Reveal key={item.title} className="svc-cell" delay={(i % columns) * 0.06}>
          <article className="svc-card panel tick">
            <span className="svc-card-n">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="svc-card-title">{item.title}</h3>
            <p className="svc-card-body">{item.body}</p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

/** Numbered steps: how a project runs, what happens after an enquiry. */
export function StepCards({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <ol className="svc-steps">
      {steps.map((step, i) => (
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
  );
}

/*
  The last thing on a page: the same contact section the home page ends on
  (the details beside the form), so every page closes the same way.
*/
export function PageCta({ copy, from }: { copy?: string; from?: string }) {
  return <Contact eyebrow="Contact" lede={copy} from={from} />;
}
