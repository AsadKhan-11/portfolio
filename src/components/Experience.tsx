"use client";

import { useRef } from "react";
import type { IconType } from "react-icons";
import { FiBriefcase, FiCode, FiMonitor } from "react-icons/fi";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Reveal, SplitText } from "./animations";

type Role = {
  year: string;
  period: string;
  title: string;
  org: string;
  copy: string;
  stack: string[];
  Icon: IconType;
  current?: boolean;
};

const ROLES: Role[] = [
  {
    year: "26",
    period: "2026 – Present",
    title: "Full Stack Developer",
    org: "MyntorX",
    copy: "Shipping production features on a team: React interfaces, Node services, and data models that real users lean on every day. The studio discipline, applied at company scale.",
    stack: ["React", "Next.js", "Node.js", "MongoDB", "TypeScript"],
    Icon: FiBriefcase,
    current: true,
  },
  {
    year: "24",
    period: "2024 – Present",
    title: "Founder & Developer",
    org: "WebForge Digital",
    copy: "My own studio, running alongside everything else. Custom web products for clients worldwide: full stack MERN applications, AI-assisted features, and 10+ delivered projects across e-commerce, SaaS and business sites.",
    stack: ["React", "Next.js", "Node.js", "MongoDB", "Tailwind"],
    Icon: FiCode,
    current: true,
  },
  {
    year: "23",
    period: "2023 – 2024",
    title: "Front-End Developer",
    org: "Project-based",
    copy: "Interactive, responsive interfaces in React and modern CSS. Focused on performance budgets, accessibility, and a component architecture that survived handover.",
    stack: ["HTML5", "CSS3", "JavaScript", "React", "Bootstrap"],
    Icon: FiMonitor,
  },
];

/*
  Each row tracks its own scroll progress rather than a one-shot
  "in view" trigger — the card rises, un-tilts and settles as it's
  scrolled past, so it reads as being drawn up by the rope rather
  than just fading in.
*/
function PathRow({ role }: { role: Role }) {
  const { year, period, title, org, copy, stack, Icon, current } = role;
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

export default function Experience() {
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
            <p className="eyebrow">06 · Path</p>
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
