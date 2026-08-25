"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaBootstrap,
  FaCss3Alt,
  FaFigma,
  FaGitAlt,
  FaHtml5,
  FaJs,
  FaNodeJs,
  FaNpm,
  FaReact,
} from "react-icons/fa";
import {
  SiExpress,
  SiFirebase,
  SiMongodb,
  SiNextdotjs,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { Counter, Reveal, SplitText } from "./animations";

const GROUPS = [
  {
    label: "Frontend",
    skills: [
      { name: "React", icon: FaReact, level: 92 },
      { name: "Next.js", icon: SiNextdotjs, level: 88 },
      { name: "JavaScript", icon: FaJs, level: 93 },
      { name: "TypeScript", icon: SiTypescript, level: 82 },
      { name: "Tailwind CSS", icon: SiTailwindcss, level: 90 },
      { name: "HTML5", icon: FaHtml5, level: 95 },
      { name: "CSS3", icon: FaCss3Alt, level: 92 },
      { name: "Redux", icon: SiRedux, level: 78 },
      { name: "Bootstrap", icon: FaBootstrap, level: 85 },
    ],
  },
  {
    label: "Backend",
    skills: [
      { name: "Node.js", icon: FaNodeJs, level: 86 },
      { name: "Express", icon: SiExpress, level: 84 },
      { name: "MongoDB", icon: SiMongodb, level: 83 },
      { name: "Firebase", icon: SiFirebase, level: 74 },
    ],
  },
  {
    label: "Tooling",
    skills: [
      { name: "Git", icon: FaGitAlt, level: 88 },
      { name: "NPM", icon: FaNpm, level: 86 },
      { name: "Figma", icon: FaFigma, level: 80 },
    ],
  },
];

function SkillRow({
  skill,
  delay,
}: {
  skill: { name: string; icon: IconType; level: number };
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const Icon = skill.icon;

  return (
    <div ref={ref} className="skill-row">
      <div className="skill-row-head">
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.7rem",
            fontSize: "0.92rem",
            color: "var(--bone-70)",
          }}
        >
          <Icon size={17} style={{ flexShrink: 0 }} />
          {skill.name}
        </span>
        <span
          className="mono-label"
          style={{ fontSize: "0.62rem", letterSpacing: "0.12em" }}
        >
          <Counter to={skill.level} suffix="%" duration={1.3} />
        </span>
      </div>

      <div className="meter">
        <motion.div
          className="meter-fill"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: skill.level / 100 } : { scaleX: 0 }}
          transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section bg-grid">
      <div className="rule-top" />
      <div className="shell">
        <div className="section-head">
          <div>
            <p className="eyebrow">03 — Stack</p>
            <h2 className="section-title" style={{ marginTop: "1.75rem" }}>
              <SplitText text="The" />
              <br />
              <span className="serif-em" style={{ color: "var(--flame)" }}>
                <SplitText text="toolkit" delay={0.1} />
              </span>
            </h2>
          </div>
          <Reveal delay={0.15}>
            <p className="lede">
              What I reach for, and how confidently. These numbers are my own
              honest read — not a marketing exercise.
            </p>
          </Reveal>
        </div>

        <div className="skills-grid">
          {GROUPS.map((g, gi) => (
            <Reveal key={g.label} delay={gi * 0.1}>
              <div>
                <div className="skills-col-head">
                  <span className="mono-label" style={{ color: "var(--flame)" }}>
                    {String(gi + 1).padStart(2, "0")}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--f-display)",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      textTransform: "uppercase",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {g.label}
                  </h3>
                  <span className="mono-label" style={{ marginLeft: "auto" }}>
                    {g.skills.length}
                  </span>
                </div>

                <div>
                  {g.skills.map((s, i) => (
                    <SkillRow key={s.name} skill={s} delay={i * 0.06} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
