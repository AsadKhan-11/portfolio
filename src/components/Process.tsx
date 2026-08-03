"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";
import type { IconType } from "react-icons";
import {
  FiCheckCircle,
  FiCode,
  FiMessageCircle,
  FiPenTool,
  FiSend,
} from "react-icons/fi";
import { Reveal, SplitText } from "./animations";

const STEPS: { n: string; title: string; copy: string; Icon: IconType }[] = [
  {
    n: "01",
    title: "Discovery",
    copy: "We work out what you actually need — goals, audience, constraints, budget. I'll tell you if a simpler build gets you there faster.",
    Icon: FiMessageCircle,
  },
  {
    n: "02",
    title: "Design",
    copy: "Wireframes first, then high-fidelity screens. You see the interface and sign off on it before a line of production code exists.",
    Icon: FiPenTool,
  },
  {
    n: "03",
    title: "Development",
    copy: "Built in reviewable slices with a staging link from day one. You watch it come together instead of waiting for a reveal.",
    Icon: FiCode,
  },
  {
    n: "04",
    title: "Testing",
    copy: "Real devices, real browsers, real edge cases. Performance and accessibility checks before anything is called done.",
    Icon: FiCheckCircle,
  },
  {
    n: "05",
    title: "Launch",
    copy: "Deployment, monitoring, and a handover you can act on. I stay reachable afterwards — launches always surface something.",
    Icon: FiSend,
  },
];

function Step({ step, index }: { step: (typeof STEPS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  /* Fires once the step clears the lower 45% of the viewport, so a stage
     lights up as you arrive at it rather than when it first peeks in. */
  const reached = useInView(ref, { once: true, margin: "0px 0px -45% 0px" });
  const { Icon } = step;

  return (
    <div ref={ref} className="process-step" data-reached={reached}>
      <motion.span
        className="process-node"
        initial={{ scale: 0.85 }}
        animate={{ scale: reached ? 1 : 0.85 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      >
        <Icon size={20} />
      </motion.span>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={reached ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{
          duration: 0.7,
          delay: index * 0.04,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div className="process-step-head">
          <span className="mono-label process-step-num">{step.n}</span>
          <h3 className="process-step-title">{step.title}</h3>
        </div>
        <p className="process-step-copy">{step.copy}</p>
      </motion.div>
    </div>
  );
}

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "end 75%"],
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
              <Step key={s.n} step={s} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
