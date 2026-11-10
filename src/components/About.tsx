"use client";

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { Reveal, SplitText } from "./animations";
import ImageSlot from "./ImageSlot";
import { PROFILE } from "@/lib/profile";

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
                src="/about/workspace.webp"
                alt="Asad Khan working at his desk in Lahore"
                slot="/about/workspace.webp"
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
            <p className="eyebrow">04 · Profile</p>

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
                {PROFILE.statement}
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
                {PROFILE.intro}
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
                {PROFILE.workingWithMe}
              </p>
            </Reveal>

            <Reveal delay={0.28}>
              <Link
                href="/about"
                className="link-sweep hero-quiet-link"
                style={{ marginTop: "2rem" }}
              >
                Read the full story <FiArrowRight />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
