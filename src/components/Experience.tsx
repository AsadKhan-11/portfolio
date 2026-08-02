"use client";

import { Reveal, SplitText } from "./animations";

const ROLES = [
  {
    period: "2024 — Present",
    title: "Freelance Web Developer",
    org: "Self-employed",
    copy: "Building custom web products for clients worldwide. Full-stack MERN applications, responsive design systems, and 10+ delivered projects across e-commerce, SaaS and business sites.",
    stack: ["React", "Next.js", "Node.js", "MongoDB", "Tailwind"],
  },
  {
    period: "2023 — 2024",
    title: "Front-End Developer",
    org: "Project-based",
    copy: "Interactive, responsive interfaces in React and modern CSS. Focused on performance budgets, accessibility, and a component architecture that survived handover.",
    stack: ["HTML5", "CSS3", "JavaScript", "React", "Bootstrap"],
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

        <div style={{ marginTop: "clamp(3rem, 8vh, 5rem)" }}>
          {ROLES.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.1}>
              <div className="exp-row">
                <div className="exp-period">
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "var(--flame)",
                      flexShrink: 0,
                    }}
                  />
                  <span className="mono-label">{r.period}</span>
                </div>

                <div>
                  <h3
                    style={{
                      fontFamily: "var(--f-display)",
                      fontWeight: 800,
                      fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)",
                      textTransform: "uppercase",
                      letterSpacing: "-0.03em",
                      lineHeight: 1.05,
                    }}
                  >
                    {r.title}
                  </h3>
                  <p
                    className="mono-label"
                    style={{ marginTop: "0.6rem", color: "var(--flame)" }}
                  >
                    {r.org}
                  </p>
                  <p
                    style={{
                      marginTop: "1.25rem",
                      maxWidth: "60ch",
                      fontSize: "0.98rem",
                      lineHeight: 1.85,
                      color: "var(--bone-45)",
                    }}
                  >
                    {r.copy}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                      marginTop: "1.4rem",
                    }}
                  >
                    {r.stack.map((s) => (
                      <span key={s} className="tag">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
