"use client";

import { Reveal, SplitText } from "./animations";
import ImageSlot from "./ImageSlot";

const TAGS = [
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "MongoDB",
  "TypeScript",
  "Tailwind",
  "Figma",
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="rule-top" />
      <div className="shell">
        {/* Portrait left, everything else right */}
        <div className="profile-layout">
          <Reveal className="profile-media">
            <figure>
              <ImageSlot
                src="/about/workspace.jpg"
                alt="Asad Khan working at his desk in Lahore"
                slot="/about/workspace.jpg"
                ratio="4 / 5"
                duotone
                sizes="(max-width: 900px) 90vw, 40vw"
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
                The desk in Lahore
              </figcaption>
            </figure>
          </Reveal>

          <div className="profile-body">
            <p className="eyebrow">01 — Profile</p>

            <h2 className="section-title" style={{ marginTop: "1.5rem" }}>
              <SplitText text="Who" />
              <br />
              <span className="serif-em" style={{ color: "var(--flame)" }}>
                <SplitText text="I am" delay={0.1} />
              </span>
            </h2>

            <Reveal delay={0.1}>
              <p
                style={{
                  marginTop: "clamp(1.75rem, 3.5vw, 2.5rem)",
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

            <Reveal delay={0.16}>
              <p
                style={{
                  marginTop: "1.75rem",
                  fontSize: "1.02rem",
                  lineHeight: 1.85,
                  color: "var(--bone-45)",
                }}
              >
                Based in Lahore, Pakistan, I work as a freelance full stack
                developer specialising in the MERN stack. My focus is on
                interfaces that feel considered and backends that hold up under
                real traffic — no shortcuts hidden behind a nice landing page.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <p
                style={{
                  marginTop: "1.5rem",
                  fontSize: "1.02rem",
                  lineHeight: 1.85,
                  color: "var(--bone-45)",
                }}
              >
                I turn design ideas into responsive, accessible interfaces and
                wire them to solid server-side logic. Attention to detail,
                honest timelines, and code the next developer can actually read.
              </p>
            </Reveal>

            <Reveal delay={0.28}>
              <p className="mono-label" style={{ marginTop: "2.25rem" }}>
                Working with
              </p>
              <div className="about-tags">
                {TAGS.map((t) => (
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
