"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";
import { Reveal, SplitText } from "./animations";

const TESTIMONIALS = [
  {
    name: "Sarah Mitchell",
    role: "CEO, TechStart Inc.",
    quote:
      "Asad delivered an e-commerce platform that exceeded what we scoped. His attention to detail and design sense reshaped our whole online presence.",
  },
  {
    name: "James Rodriguez",
    role: "Founder, CreativeHQ",
    quote:
      "A game-changer for our startup. He built a genuinely fast React application with animation work our users comment on unprompted.",
  },
  {
    name: "Emily Chen",
    role: "Marketing Director, BrandUp",
    quote:
      "The site Asad built for us is stunning. The motion and transitions put us visibly ahead of every competitor in our category.",
  },
  {
    name: "Michael Foster",
    role: "CTO, DataVerse",
    quote:
      "His full-stack range is real. He built our dashboard end to end — clean API design, live data, and a UI that makes complex data legible.",
  },
  {
    name: "Priya Sharma",
    role: "Product Manager, NextWave",
    quote:
      "Turned our Figma files into a pixel-accurate responsive site in record time. Communication was excellent from kickoff to handover.",
  },
  {
    name: "David Kim",
    role: "Entrepreneur",
    quote:
      "I've hired a lot of freelancers. Asad is a level above — clean code, documented, and he proactively flags improvements instead of waiting.",
  },
];

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState(0);

  useEffect(() => {
    const measure = () => {
      const el = trackRef.current;
      if (!el) return;
      setDrag(Math.max(0, el.scrollWidth - el.offsetWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section className="section bg-glow-tr" style={{ overflow: "hidden" }}>
      <div className="rule-top" />
      <div className="shell">
        <div className="section-head">
          <div>
            <p className="eyebrow">08 — Words</p>
            <h2 className="section-title" style={{ marginTop: "1.75rem" }}>
              <SplitText text="Client" />
              <br />
              <span className="serif-em" style={{ color: "var(--flame)" }}>
                <SplitText text="feedback" delay={0.1} />
              </span>
            </h2>
          </div>
          <Reveal delay={0.15}>
            <p className="lede">
              Drag to read through. What people said after the invoice was
              settled, which is the only review that counts.
            </p>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.1}>
        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={{ left: -drag, right: 0 }}
          dragElastic={0.08}
          whileDrag={{ cursor: "grabbing" }}
          data-cursor="Drag"
          style={{
            display: "flex",
            gap: "clamp(1rem, 2vw, 1.75rem)",
            paddingInline: "var(--gutter)",
            marginTop: "clamp(2.5rem, 6vh, 4rem)",
            cursor: "grab",
          }}
        >
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="quote-card panel tick">
              <div style={{ display: "flex", gap: 3, marginBottom: "1.5rem" }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <FiStar
                    key={i}
                    size={13}
                    style={{ color: "var(--flame)", fill: "var(--flame)" }}
                  />
                ))}
              </div>

              <p
                style={{
                  flex: 1,
                  fontFamily: "var(--f-display)",
                  fontWeight: 400,
                  fontSize: "1.02rem",
                  lineHeight: 1.65,
                  color: "var(--bone-70)",
                }}
              >
                “{t.quote}”
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.9rem",
                  marginTop: "2rem",
                  paddingTop: "1.25rem",
                  borderTop: "1px solid var(--rule)",
                }}
              >
                <span
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: "1px solid var(--flame-line)",
                    color: "var(--flame)",
                    display: "grid",
                    placeItems: "center",
                    fontFamily: "var(--f-mono)",
                    fontSize: "0.72rem",
                    flexShrink: 0,
                  }}
                >
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <div>
                  <p style={{ fontSize: "0.9rem", fontWeight: 600 }}>{t.name}</p>
                  <p className="mono-label" style={{ marginTop: 3 }}>
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </Reveal>
    </section>
  );
}
