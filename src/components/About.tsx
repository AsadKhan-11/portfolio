"use client";

import { Reveal, SplitText } from "./animations";
import ImageSlot from "./ImageSlot";

export default function About() {
  return (
    <section id="about" className="section bg-glow-tl">
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
              <SplitText text="Meet the guy" />
              <br />
              <span className="serif-em" style={{ color: "var(--flame)" }}>
                <SplitText text="behind the work" delay={0.1} />
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
                I&rsquo;m Asad — a full stack developer working with founders
                and teams worldwide from Lahore, Pakistan. People hire me when
                they want one person who can carry a product all the way:
                design that sells the idea, and engineering that doesn&rsquo;t
                fall over once it works.
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
                Working with me looks like this: a fixed quote before we start,
                honest timelines, a staging link you can open any day of the
                week, and a finished product you fully own. No hand-offs
                between departments, no surprises on the invoice.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
