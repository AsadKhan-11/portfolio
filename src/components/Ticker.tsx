"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { Marquee } from "./animations";

const WORDS = [
  "React",
  "Next.js",
  "Node",
  "MongoDB",
  "TypeScript",
  "Express",
  "Tailwind",
  "Framer Motion",
];

/*
  Full-bleed kinetic ticker. Two rows running opposite directions —
  solid on top, outlined below — to break the vertical rhythm between
  the hero and the first content section. The whole strip shears with
  scroll velocity, so flicking the page drags the type with it.
*/
export default function Ticker() {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const skewRaw = useTransform(velocity, [-1400, 1400], [-5, 5], {
    clamp: true,
  });
  const skewX = useSpring(skewRaw, { stiffness: 180, damping: 24, mass: 0.5 });

  return (
    <section
      aria-hidden="true"
      style={{
        position: "relative",
        zIndex: 2,
        paddingBlock: "clamp(1.75rem, 5vh, 3.25rem)",
        borderBlock: "1px solid var(--rule)",
        overflow: "hidden",
      }}
    >
      <motion.div style={{ skewX }}>
        <Marquee speed={42}>
          {WORDS.map((w) => (
            <span key={w} className="marquee-item">
              {w}
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "var(--flame)",
                  flexShrink: 0,
                }}
              />
            </span>
          ))}
        </Marquee>

        <div style={{ height: "clamp(0.5rem, 1.5vh, 1rem)" }} />

        <Marquee speed={54} reverse>
          {WORDS.map((w) => (
            <span key={w} className="marquee-item marquee-outline">
              {w}
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  border: "1px solid var(--bone-30)",
                  flexShrink: 0,
                }}
              />
            </span>
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
}
