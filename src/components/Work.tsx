"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { Reveal } from "./animations";
import SectionHead, { type Head } from "./SectionHead";
import { useMediaQuery } from "./useClient";
import { PROJECTS, type Project } from "@/lib/projects";

/*
  The one list of projects. The shelf on the home page, the grids on the
  projects, services, packages and About pages, the related work on a service
  page and the "more work" rail at the foot of a case study all draw
  ProjectCard. A live build opens the deployed site in a new tab; a case
  study opens its page here. Both lists live in src/lib/caseStudies.ts, the
  same data that feeds the /work/[slug] route, so they can never disagree.
*/
export function ProjectCard({
  p,
  hidden = false,
  detail = false,
}: {
  p: Project;
  /** A copy kept for the reel's loop: out of the keyboard order. */
  hidden?: boolean;
  /** Add the pitch and the role under the name: the cards in a grid, not the reel. */
  detail?: boolean;
}) {
  const body = (
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
        {detail && p.pitch && <span className="work-card-pitch">{p.pitch}</span>}
        {detail && p.role && (
          <span className="work-card-role">
            <b>Role</b> {p.role}
          </span>
        )}
      </span>
    </>
  );

  const common = { className: "work-card", tabIndex: hidden ? -1 : 0 };

  return p.href ? (
    <Link href={p.href} {...common} data-cursor="Read">
      {body}
    </Link>
  ) : (
    <a href={p.url} target="_blank" rel="noopener noreferrer" {...common} data-cursor="Visit">
      {body}
    </a>
  );
}

/* Projects in a grid, each with its pitch and role. */
export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="case-more proj-grid">
      {projects.map((p) => (
        <Reveal key={p.key}>
          <ProjectCard p={p} detail />
        </Reveal>
      ))}
    </div>
  );
}

/*
  A section of projects: a heading and a grid, and optionally the way
  through to all of them. Used wherever a page shows a few projects that bear
  on what it says (the related work on a service page, the recent work on the
  services page, the work on About).
*/
export function ProjectsSection({
  projects,
  head,
  more = true,
}: {
  projects: Project[];
  head: Head;
  more?: boolean;
}) {
  if (!projects.length) return null;

  return (
    <section className="section bg-glow-bl">
      <div className="rule-top" />
      <div className="shell">
        <SectionHead {...head} />
        <ProjectGrid projects={projects} />
        {more && (
          <Reveal delay={0.1}>
            <div className="case-more-cta">
              <Link href="/work" className="btn">
                <span>View all projects</span>
                <FiArrowRight />
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/*
  The shelf: builds glide past on a tilted plane, full bleed. The track is
  two identical halves (each the project list twice, so a half always
  outspans the viewport), looping with a CSS keyframe — which is what
  lets hover simply freeze it via animation-play-state.
*/
function WorkShelf() {
  const [paused, setPaused] = useState(false);
  const still = useMediaQuery("(prefers-reduced-motion: reduce)");

  const half = [...PROJECTS, ...PROJECTS];

  return (
    <div
      className="work-shelf"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="work-shelf-tilt">
        <div className="work-track" data-paused={paused || still}>
          {[0, 1].map((dup) => (
            <div key={dup} className="work-track-half" aria-hidden={dup === 1}>
              {half.map((p, i) => (
                <ProjectCard key={`${p.key}-${i}`} p={p} hidden={dup === 1} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const HEAD: Head = {
  eyebrow: "01 · Work",
  title: "Selected",
  em: "projects",
  lede: "Sites I have shipped, plus case studies of platforms built for confidential clients and rebuilt here with new names and data. Live cards open the real site; case studies tell the whole story.",
};

/* The home page's section: the shelf, and the way through to the full list. */
export default function Work() {
  return (
    <section id="work" className="section bg-glow-bl">
      <div className="rule-top" />
      <div className="shell">
        <SectionHead {...HEAD} />
      </div>

      <Reveal delay={0.1}>
        <WorkShelf />

        <p className="mono-label work-hint">
          Hover to hold the reel · click any project to read its case study
        </p>

        <div className="case-more-cta">
          <Link href="/work" className="btn">
            <span>View all projects</span>
            <FiArrowRight />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
