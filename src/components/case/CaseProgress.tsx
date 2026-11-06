"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/*
  A case study runs to roughly eighteen screens. A hairline at the top of
  the viewport is the cheapest honest answer to "how much of this is left",
  and it is the one piece of chrome that can say it without taking space.

  Springing the raw progress keeps it from juddering under Lenis, which
  reports scroll in its own eased steps.
*/
export default function CaseProgress() {
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.4,
    restDelta: 0.0005,
  });

  return (
    <motion.div
      className="case-progress"
      aria-hidden="true"
      style={{ scaleX: still ? scrollYProgress : scaleX }}
    />
  );
}
