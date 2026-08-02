"use client";

import { Counter, Reveal, SplitText, Stagger, StaggerItem } from "./animations";
import ImageSlot from "./ImageSlot";

const STATS = [
  { n: 10, s: "+", label: "Projects shipped" },
  { n: 20, s: "+", label: "Clients served" },
  { n: 1, s: "+", label: "Years building" },
  { n: 100, s: "%", label: "Satisfaction" },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="rule-top" />
      <div className="shell">
        {/* Two-column editorial spread: sticky label, flowing text */}
        <div className="split-spread">
          <div className="split-aside">
            <p className="eyebrow">01 — Profile</p>
            <h2
              className="section-title"
              style={{ marginTop: "1.75rem" }}
            >
              <SplitText text="Who" />
              <br />
              <span className="serif-em" style={{ color: "var(--flame)" }}>
                <SplitText text="I am" delay={0.1} />
              </span>
            </h2>
          </div>

          <div className="split-main">
            <Reveal>
              <p
                style={{
                  fontFamily: "var(--f-display)",
                  fontWeight: 600,
                  fontSize: "clamp(1.15rem, 2.1vw, 1.65rem)",
                  lineHeight: 1.4,
                  letterSpacing: "-0.02em",
                  color: "var(--bone)",
                }}
              >
                I build complete web products — from the first pixel of an
                interface to the last line of the API behind it.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p
                style={{
                  marginTop: "2rem",
                  fontSize: "1.02rem",
                  lineHeight: 1.85,
                  color: "var(--bone-45)",
                  maxWidth: "58ch",
                }}
              >
                Based in Lahore, Pakistan, I work as a freelance full stack
                developer specialising in the MERN stack. My focus is on
                interfaces that feel considered and backends that hold up under
                real traffic — no shortcuts hidden behind a nice landing page.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <p
                style={{
                  marginTop: "1.5rem",
                  fontSize: "1.02rem",
                  lineHeight: 1.85,
                  color: "var(--bone-45)",
                  maxWidth: "58ch",
                }}
              >
                I turn design ideas into responsive, accessible interfaces and
                wire them to solid server-side logic. Attention to detail,
                honest timelines, and code the next developer can actually read.
              </p>
            </Reveal>

          </div>
        </div>

        {/*
          Portrait and figures share a row so the tall image has something
          to sit beside — on its own it left a dead column the height of
          the photograph.
        */}
        <div className="about-showcase">
          <Reveal>
            <figure>
              <ImageSlot
                src="/about/workspace.jpg"
                alt="Asad Khan working at his desk in Lahore"
                slot="/about/workspace.jpg"
                ratio="4 / 5"
                duotone
                sizes="(max-width: 900px) 90vw, 38vw"
                fallback={
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(165deg, rgba(255,92,53,.22), rgba(8,8,10,.9) 55%, rgba(79,240,255,.14))",
                    }}
                  />
                }
              />
              <figcaption
                className="mono-label"
                style={{ marginTop: "0.85rem", display: "block" }}
              >
                02 — The desk in Lahore
              </figcaption>
            </figure>
          </Reveal>

          {/* Figures and stack share the column so it fills the photo's
              height with content rather than padding. */}
          <div className="about-figures">
            <Stagger className="stat-quad" gap={0.1}>
              {STATS.map((s) => (
                <StaggerItem key={s.label}>
                  <p className="stat-num">
                    <Counter to={s.n} suffix={s.s} />
                  </p>
                  <p className="mono-label">{s.label}</p>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.2}>
              <p className="mono-label" style={{ marginBottom: "1rem" }}>
                Working with
              </p>
              <div className="about-tags" style={{ marginTop: 0 }}>
                {[
                  "React",
                  "Next.js",
                  "Node.js",
                  "Express",
                  "MongoDB",
                  "TypeScript",
                  "Tailwind",
                  "Figma",
                ].map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
