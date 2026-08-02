"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Reveal, SplitText } from "./animations";

const STEPS = [
  {
    n: "01",
    title: "Discovery",
    copy: "We work out what you actually need — goals, audience, constraints, budget. I'll tell you if a simpler build gets you there faster.",
  },
  {
    n: "02",
    title: "Design",
    copy: "Wireframes first, then high-fidelity screens. You see the interface and sign off on it before a line of production code exists.",
  },
  {
    n: "03",
    title: "Development",
    copy: "Built in reviewable slices with a staging link from day one. You watch it come together instead of waiting for a reveal.",
  },
  {
    n: "04",
    title: "Testing",
    copy: "Real devices, real browsers, real edge cases. Performance and accessibility checks before anything is called done.",
  },
  {
    n: "05",
    title: "Launch",
    copy: "Deployment, monitoring, and a handover you can act on. I stay reachable afterwards — launches always surface something.",
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 85%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.4,
  });

  return (
    <section id="process" className="section">
      <div className="rule-top" />
      <div className="shell">
        <div className="process-layout">
          {/* Sticky title column */}
          <div className="process-aside">
            <p className="eyebrow">06 — Process</p>
            <h2 className="section-title" style={{ marginTop: "1.75rem" }}>
              <SplitText text="How" />
              <br />
              <span className="serif-em" style={{ color: "var(--flame)" }}>
                <SplitText text="we get there" delay={0.1} />
              </span>
            </h2>
            <Reveal delay={0.15}>
              <p className="lede" style={{ marginTop: "1.75rem" }}>
                Five stages, no mystery. You always know what&apos;s happening
                and what&apos;s next.
              </p>
            </Reveal>
          </div>

          {/* Steps with a scroll-driven spine */}
          <div ref={ref} className="process-steps">
            <div className="process-spine">
              <motion.div
                className="process-spine-fill"
                style={{ scaleY, originY: 0 }}
              />
            </div>

            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.06}>
                <div className="process-step">
                  <span className="process-dot" />
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "1rem",
                      }}
                    >
                      <span
                        className="mono-label"
                        style={{ color: "var(--flame)" }}
                      >
                        {s.n}
                      </span>
                      <h3
                        style={{
                          fontFamily: "var(--f-display)",
                          fontWeight: 800,
                          fontSize: "clamp(1.05rem, 1.9vw, 1.4rem)",
                          textTransform: "uppercase",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {s.title}
                      </h3>
                    </div>
                    <p
                      style={{
                        marginTop: "0.85rem",
                        maxWidth: "52ch",
                        fontSize: "0.96rem",
                        lineHeight: 1.8,
                        color: "var(--bone-45)",
                      }}
                    >
                      {s.copy}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
