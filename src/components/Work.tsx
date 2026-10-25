"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { Reveal, SplitText } from "./animations";
import { useMediaQuery } from "./useClient";
import { CASE_STUDIES, LIVE_BUILDS } from "@/lib/caseStudies";

/*
  Two kinds of card share the shelf. A live build opens the deployed site
  in a new tab; a case study opens its page here. Both lists live in
  src/lib/caseStudies.ts, the same data that feeds the /work/[slug] route
  and its "more work" section, so they can never disagree.
*/
interface Project {
  key: string;
  shot: string;
  title: string;
  meta: string;
  /** Live builds */
  url?: string;
  domain?: string;
  /** Case studies */
  href?: string;
}

const PROJECTS: Project[] = [
  ...CASE_STUDIES.map((c) => ({
    key: c.slug,
    shot: c.card,
    title: c.title,
    meta: c.meta,
    href: `/work/${c.slug}`,
  })),
  ...LIVE_BUILDS,
];

function CardBody({ p }: { p: Project }) {
  return (
    <>
      <span className="work-shot">
        <Image
          src={p.shot}
          alt={`${p.title} ${p.href ? "case study" : "website"}`}
          fill
          sizes="(max-width: 760px) 78vw, 36vw"
          style={{ objectFit: "cover", objectPosition: "top" }}
        />
      </span>
      <span className="work-card-foot">
        <span className="work-card-title">{p.title}</span>
        <span className="mono-label work-card-domain">
          {p.href ? (
            <>
              Case study <FiArrowRight size={13} />
            </>
          ) : (
            <>
              {p.domain} <FiArrowUpRight size={13} />
            </>
          )}
        </span>
        <span className="mono-label work-card-meta">{p.meta}</span>
      </span>
    </>
  );
}

function Card({ p, hidden }: { p: Project; hidden: boolean }): ReactNode {
  const common = {
    className: "work-card",
    tabIndex: hidden ? -1 : 0,
  };
  return p.href ? (
    <Link href={p.href} {...common} data-cursor="Read">
      <CardBody p={p} />
    </Link>
  ) : (
    <a href={p.url} target="_blank" rel="noopener noreferrer" {...common} data-cursor="Visit">
      <CardBody p={p} />
    </a>
  );
}

/*
  The shelf: builds glide past on a tilted plane, full bleed. The track is
  two identical halves (each the project list twice, so a half always
  outspans the viewport), looping with a CSS keyframe — which is what
  lets hover simply freeze it via animation-play-state.
*/
export default function Work() {
  const [paused, setPaused] = useState(false);
  const still = useMediaQuery("(prefers-reduced-motion: reduce)");

  const half = [...PROJECTS, ...PROJECTS];

  return (
    <section id="work" className="section bg-glow-bl">
      <div className="rule-top" />
      <div className="shell">
        <div className="section-head">
          <div>
            <p className="eyebrow">05 · Work</p>
            <h2 className="section-title" style={{ marginTop: "1.75rem" }}>
              <SplitText text="Selected" />
              <br />
              <span className="serif-em" style={{ color: "var(--flame)" }}>
                <SplitText text="projects" delay={0.1} />
              </span>
            </h2>
          </div>
          <Reveal delay={0.15}>
            <p className="lede">
              Live builds for real brands, and full case studies of the
              products behind them. Live cards open the real site; case
              studies open the whole story.
            </p>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.1}>
        <div
          className="work-shelf"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="work-shelf-tilt">
            <div className="work-track" data-paused={paused || still}>
              {[0, 1].map((dup) => (
                <div
                  key={dup}
                  className="work-track-half"
                  aria-hidden={dup === 1}
                >
                  {half.map((p, i) => (
                    <Card key={`${p.key}-${i}`} p={p} hidden={dup === 1} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mono-label work-hint">
          Hover to hold the reel · click a build to open it, or a case study to read it
        </p>
      </Reveal>
    </section>
  );
}
