"use client";

import { useRef } from "react";
import { FiBriefcase, FiCode, FiMonitor } from "react-icons/fi";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Reveal, SplitText } from "./animations";
import { ROLES, type Role } from "@/lib/profile";

/*
  The "Path" section: a timeline of the roles in lib/profile.ts.

  HIDDEN: no page renders it. It was taken off the home page and the About
  page on 2026-11-14 at the owner's request, and the Person markup on About no
  longer names MyntorX (pageJsonLd.ts), because markup must match what the page
  shows. To bring it back, render <Experience eyebrow="..."/> on the home page
  (after About) and on the About page (after the toolkit), renumber the
  sections after it, and restore `worksFor` in aboutJsonLd.
*/
const ICONS = { briefcase: FiBriefcase, code: FiCode, monitor: FiMonitor } as const;

/*
  Each row tracks its own scroll progress rather than a one-shot
  "in view" trigger — the card rises, un-tilts and settles as it's
  scrolled past, so it reads as being drawn up by the rope rather
  than just fading in.
*/
function PathRow({ role }: { role: Role }) {
  const { year, period, title, org, copy, stack, icon, current } = role;
  const Icon = ICONS[icon];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "start 42%"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [110, 0]);
  const rawRotate = useTransform(scrollYProgress, [0, 1], [-3, 0]);
  const y = useSpring(rawY, { stiffness: 140, damping: 22, mass: 0.6 });
  const rotate = useSpring(rawRotate, { stiffness: 140, damping: 22, mass: 0.6 });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  const nodeScale = useTransform(scrollYProgress, [0, 0.35], [0, 1]);

  return (
    <div className="path-row" ref={ref}>
      <div className="path-node-col">
        <motion.span
          className="path-node"
          data-current={current || undefined}
          style={{ scale: nodeScale }}
          aria-hidden="true"
        />
      </div>

      <motion.article
        className="path-card tick"
        style={{ y, rotate, opacity, transformOrigin: "top left" }}
      >
        {/* Year doubles as the card's texture */}
        <span className="path-ghost" aria-hidden="true">
          &apos;{year}
        </span>

        <div className="path-card-top">
          <span className="path-icon" aria-hidden="true">
            <Icon size={19} />
          </span>
          <span className="path-period">
            {current && <span className="path-pulse" aria-hidden="true" />}
            <span className="mono-label">{period}</span>
          </span>
        </div>

        <h3 className="path-title">{title}</h3>
        <p className="path-org">{org}</p>
        <p className="path-copy">{copy}</p>

        <div className="path-stack">
          {stack.map((s) => (
            <span key={s} className="tag">
              {s}
            </span>
          ))}
        </div>
      </motion.article>
    </div>
  );
}

/* `eyebrow` is the numbered label, such as "05 · Path": whatever number the page that shows it gives it. */
export default function Experience({ eyebrow = "05 · Path" }: { eyebrow?: string }) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 65%"],
  });
  const ropeScale = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.7,
  });

  return (
    <section id="experience" className="section bg-panel-wash">
      <div className="rule-top" />
      <div className="shell">
        <div className="path-layout">
          <div className="path-sticky">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="section-title" style={{ marginTop: "1.75rem" }}>
              <SplitText text="Where" />
              <br />
              <span className="serif-em" style={{ color: "var(--flame)" }}>
                <SplitText text="I've been" delay={0.1} />
              </span>
            </h2>
            <Reveal delay={0.15}>
              <p className="lede" style={{ marginTop: "clamp(1.5rem, 3vw, 2rem)" }}>
                Short and honest. Client work since 2023, WebForge Digital
                since 2024, and now full stack work at MyntorX while the
                studio keeps shipping.
              </p>
            </Reveal>
          </div>

          <div className="path-timeline" ref={timelineRef}>
            <motion.div
              className="path-rope"
              style={{ scaleY: ropeScale }}
              aria-hidden="true"
            />
            {ROLES.map((role) => (
              <PathRow key={role.period} role={role} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
