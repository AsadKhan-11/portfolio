"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import ImageSlot from "./ImageSlot";
import { Reveal } from "./animations";

/*
  Full-bleed visual break between the stack and the portfolio. Drifts
  slightly against the scroll so it reads as depth rather than a static
  banner.
*/
export default function Band() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const y = useSpring(raw, { stiffness: 90, damping: 30, mass: 0.4 });

  return (
    <section ref={ref} className="band" aria-label="Working environment">
      <div className="band-inner">
        <motion.div style={{ y, willChange: "transform" }}>
          <ImageSlot
            src="/band/craft.jpg"
            alt="Building interfaces — a late session at the desk"
            slot="/band/craft.jpg"
            ratio="21 / 9"
            duotone
            sizes="100vw"
            className="band-image"
            fallback={
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(115deg, rgba(255,92,53,.28), rgba(8,8,10,.95) 45%, rgba(79,240,255,.2))",
                }}
              />
            }
          />
        </motion.div>

        {/* keeps the caption legible over any photograph */}
        <div className="band-scrim" />

        <Reveal className="band-caption">
          <p className="eyebrow">The work behind the work</p>
          <p
            style={{
              marginTop: "1rem",
              fontFamily: "var(--f-display)",
              fontWeight: 700,
              fontSize: "clamp(1.05rem, 1.8vw, 1.5rem)",
              lineHeight: 1.3,
              letterSpacing: "-0.02em",
            }}
          >
            Most of it is unglamorous — reading docs, deleting code, and
            testing on the one browser that disagrees.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
