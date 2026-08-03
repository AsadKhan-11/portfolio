"use client";

import type { IconType } from "react-icons";
import { FiCode, FiMonitor } from "react-icons/fi";
import { Reveal, SplitText, Stagger, StaggerItem } from "./animations";

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
    year: "24",
    period: "2024 — Present",
    title: "Freelance Web Developer",
    org: "Self-employed",
    copy: "Building custom web products for clients worldwide. Full-stack MERN applications, AI-assisted features, and 10+ delivered projects across e-commerce, SaaS and business sites.",
    stack: ["React", "Next.js", "Node.js", "MongoDB", "Tailwind"],
    Icon: FiCode,
    current: true,
  },
  {
    year: "23",
    period: "2023 — 2024",
    title: "Front-End Developer",
    org: "Project-based",
    copy: "Interactive, responsive interfaces in React and modern CSS. Focused on performance budgets, accessibility, and a component architecture that survived handover.",
    stack: ["HTML5", "CSS3", "JavaScript", "React", "Bootstrap"],
    Icon: FiMonitor,
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="rule-top" />
      <div className="shell">
        <div className="section-head">
          <div>
            <p className="eyebrow">05 — Path</p>
            <h2 className="section-title" style={{ marginTop: "1.75rem" }}>
              <SplitText text="Where" />
              <br />
              <span className="serif-em" style={{ color: "var(--flame)" }}>
                <SplitText text="I've been" delay={0.1} />
              </span>
            </h2>
          </div>
          <Reveal delay={0.15}>
            <p className="lede">
              Short and honest. I started taking client work seriously in 2023
              and have been full-time freelance since 2024.
            </p>
          </Reveal>
        </div>

        <Stagger className="path-grid" gap={0.1}>
          {ROLES.map(({ year, period, title, org, copy, stack, Icon, current }) => (
            <StaggerItem key={period}>
              <article className="path-card tick">
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
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
