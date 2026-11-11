"use client";

import type { CSSProperties } from "react";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, motionValue, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { Reveal } from "./animations";
import SectionHead, { type Head } from "./SectionHead";
import { useMediaQuery } from "./useClient";
import { HOME_PROJECT_SLUGS, projectsFor, type Project } from "@/lib/projects";

/*
  The one list of projects. The stacked cards on the home page, the grids on
  the projects, services, packages and About pages, the related work on a
  service page and the "more work" rail at the foot of a case study all draw
  ProjectCard. A live build opens the deployed site in a new tab; a case
  study opens its page here. Both lists live in src/lib/caseStudies.ts, the
  same data that feeds the /work/[slug] route, so they can never disagree.
*/
export function ProjectCard({
  p,
  hidden = false,
  detail = false,
  layout = "card",
  index = 0,
}: {
  p: Project;
  /** Keep the card out of the keyboard order. */
  hidden?: boolean;
  /** Add the pitch and the role under the name: the cards in a grid. */
  detail?: boolean;
  /** "feature" is the large side-by-side card the home page stacks. */
  layout?: "card" | "feature";
  /** Its place in a numbered list; only the feature card shows it. */
  index?: number;
}) {
  if (layout === "feature") {
    const feature = (
      <>
        <span className="proj-feature-copy">
          <span className="proj-feature-top mono-label">
            <span className="proj-feature-n">{String(index + 1).padStart(2, "0")}</span>
            <span>{p.meta}</span>
          </span>
          <span className="proj-feature-title">{p.title}</span>
          {p.pitch && <span className="proj-feature-pitch">{p.pitch}</span>}
          {p.tags && (
            <span className="proj-feature-tags">
              {p.tags.slice(0, 3).map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </span>
          )}
          <span className="proj-feature-cta mono-label">
            {p.href ? "Read the case study" : `Visit ${p.domain}`}
            {p.href ? <FiArrowRight size={14} /> : <FiArrowUpRight size={14} />}
          </span>
        </span>
        <span className="proj-feature-shot">
          <Image
            src={p.shot}
            alt={`${p.title} ${p.href ? "case study" : "website"}`}
            fill
            sizes="(max-width: 899px) 92vw, 52vw"
            style={{ objectFit: "cover", objectPosition: "left top" }}
          />
        </span>
      </>
    );
    const props = { className: "proj-feature", tabIndex: hidden ? -1 : 0 };
    return p.href ? (
      <Link href={p.href} {...props} data-cursor="Read">
        {feature}
      </Link>
    ) : (
      <a href={p.url} target="_blank" rel="noopener noreferrer" {...props} data-cursor="Visit">
        {feature}
      </a>
    );
  }

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
  The deck: each card sticks as it reaches the top, so the next one rises over
  it. Every card reports how far it has risen (0 as it enters at the foot of
  the screen, 1 as it settles in place); the cards beneath add those numbers up
  to know how many have covered them, and step back for each one: a little
  smaller and a little darker. So the pile deepens exactly as a card lands on
  it, instead of drifting over the whole section.
*/
const STEP_SCALE = 0.04;
const STEP_SHADE = 0.16;

function StackItem({
  p,
  i,
  arrivals,
  still,
}: {
  p: Project;
  i: number;
  /** Every card's rise, 0 to 1, in order. This card's own is arrivals[i]. */
  arrivals: MotionValue<number>[];
  still: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 110px"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => arrivals[i].set(v));

  const covering = arrivals.slice(i + 1);
  const covered = (vals: number[]) => vals.reduce((sum, v) => sum + v, 0);
  const scale = useTransform(covering, (vals) => 1 - STEP_SCALE * covered(vals as number[]));
  const shade = useTransform(covering, (vals) => Math.min(0.55, STEP_SHADE * covered(vals as number[])));

  return (
    <div ref={ref} className="proj-stack-item" style={{ "--i": i } as CSSProperties}>
      <motion.div className="proj-stack-card" style={still ? undefined : { scale }}>
        <ProjectCard p={p} layout="feature" index={i} />
        {!still && <motion.span className="proj-stack-shade" aria-hidden="true" style={{ opacity: shade }} />}
      </motion.div>
    </div>
  );
}

export function ProjectStack({ projects }: { projects: Project[] }) {
  const still = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [arrivals] = useState(() => projects.map(() => motionValue(0)));

  return (
    <div className="proj-stack">
      {projects.map((p, i) => (
        <StackItem key={p.key} p={p} i={i} arrivals={arrivals} still={still} />
      ))}
    </div>
  );
}

const HEAD: Head = {
  eyebrow: "01 · Work",
  title: "Selected",
  em: "projects",
  lede: "Four projects, each with the full story behind it. The platforms were built for confidential clients and are rebuilt here with new names and data.",
};

/* The home page's section: four stacked project cards, and the way through to all of them. */
export default function Work() {
  return (
    <section id="work" className="section bg-glow-bl">
      <div className="rule-top" />
      <div className="shell">
        <SectionHead {...HEAD} />
        <ProjectStack projects={projectsFor(HOME_PROJECT_SLUGS)} />

        <Reveal delay={0.1}>
          <div className="case-more-cta">
            <Link href="/work" className="btn btn-solid">
              <span>Show all projects</span>
              <FiArrowRight />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
