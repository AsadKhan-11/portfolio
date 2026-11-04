"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { FiArrowDownRight, FiCheck } from "react-icons/fi";
import { Magnetic } from "./animations";
import { IdleHeroField } from "./LazyFields";
import { useIntroDone } from "./intro";

const EASE = [0.16, 1, 0.3, 1] as const;

/* The offer, in four short promises, so the first screen answers
   "what do I get and how risky is it?" without any scrolling. */
const TRUST = ["Fixed quote up front", "Live in 2–6 weeks", "You own the code", "Reply within a day"];

/* Entrance beats, counted from the moment the intro curtain clears */
const T = {
  kicker: 0.15,
  head: 0.3,
  lede: 0.85,
  cta: 1,
  proof: 1.25,
  cue: 1.6,
};

/* Word-by-word mask reveal, gated on `play` — SplitText triggers on
   viewport entry, which would fire unseen behind the intro panel. */
function MaskWords({
  text,
  delay = 0,
  play,
}: {
  text: string;
  delay?: number;
  play: boolean;
}) {
  const words = text.split(" ");
  return (
    <span aria-label={text} style={{ display: "inline" }}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "bottom",
            paddingBottom: "0.1em",
            marginBottom: "-0.1em",
          }}
        >
          <motion.span
            style={{ display: "inline-block", willChange: "transform" }}
            initial={{ y: "115%" }}
            animate={play ? { y: 0 } : { y: "115%" }}
            transition={{ duration: 0.9, delay: delay + i * 0.06, ease: EASE }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const ready = useIntroDone();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const rawCopy = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const copyY = useSpring(rawCopy, { stiffness: 90, damping: 26 });
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} id="home" className="hero">
      {/* A wireframe terrain flows under the type — the 3D stage that
          says "we build things" before a word is read */}
      <IdleHeroField />

      <div className="shell" style={{ position: "relative", zIndex: 2, width: "100%" }}>
        {/* ── The pitch, centred and brief ── */}
        <motion.div className="hero-center" style={{ y: copyY }}>
          <motion.p
            className="hero-kicker mono-label"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: T.kicker, duration: 0.8 }}
          >
            <span className="hero-kicker-dot" aria-hidden="true" />
            Booking new builds · 2026
          </motion.p>

          <h1 className="hero-headline">
            <MaskWords text="Websites, portals, and web apps" delay={T.head} play={ready} />
            <br />
            <span className="serif-em" style={{ color: "var(--flame)" }}>
              <MaskWords text="that win you clients." delay={T.head + 0.35} play={ready} />
            </span>
          </h1>

          <motion.p
            className="hero-lede"
            initial={{ opacity: 0, y: 18 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ delay: T.lede, duration: 0.9, ease: EASE }}
          >
            One developer for the whole job: design, build and launch. You deal
            with the person doing the work, and the finished product is yours.
          </motion.p>

          <motion.div
            className="hero-cta-row"
            initial={{ opacity: 0, y: 18 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ delay: T.cta, duration: 0.9, ease: EASE }}
          >
            <Magnetic strength={0.3}>
              <a href="#contact" className="btn btn-solid">
                <span>Start a project</span>
              </a>
            </Magnetic>
            <a href="#work" className="link-sweep hero-quiet-link" data-cursor="See work">
              See the work <FiArrowDownRight />
            </a>
          </motion.div>
          {/* ── One quiet line of proof ── */}
          <motion.div
            className="hero-proofline"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: T.proof, duration: 0.9 }}
          >
            {TRUST.map((t) => (
              <span key={t} className="hero-trust">
                <FiCheck size={12} aria-hidden="true" />
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue — outer box carries the scroll-driven fade, inner the
          entrance, so the two opacities multiply instead of overwriting. */}
      <motion.div className="scroll-cue" style={{ opacity: fade }}>
        <motion.div
          className="scroll-cue-inner"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: T.cue, duration: 0.8 }}
        >
          <span className="mono-label">Scroll</span>
          <motion.span
            className="scroll-cue-line"
            animate={{ scaleY: [0, 1, 0], originY: [0, 0, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
