"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { FiArrowDownRight, FiCheck } from "react-icons/fi";
import { Magnetic } from "./animations";
import { MaskWords, after } from "./heroMotion";
import { IdleHeroField } from "./LazyFields";

/* The offer, in three short promises, so the first screen answers
   "what do I get and how risky is it?" without any scrolling. A fourth,
   "reply within a day", is the reply-time figure in the stats strip right
   under the hero, so it only crowded the first screen by repeating it. */
const TRUST = ["Fixed quote up front", "Live in 2–6 weeks", "You own the code"];

/*
  Entrance beats, in seconds from the moment the intro curtain clears. When
  there is no curtain (phones, repeat visits, reduced motion) nothing waits:
  the content is simply there in the first paint. The beats used to run to
  1.6s after the curtain, which made the paragraph, the largest thing on the
  screen, the last to arrive; the whole sequence now lands inside a second.
*/
const T = {
  kicker: 0.05,
  head: 0.1,
  lede: 0.4,
  cta: 0.5,
  proof: 0.7,
  cue: 0.9,
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

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
          <p
            className="hero-kicker mono-label hero-in hero-in-fade"
            style={after(T.kicker)}
          >
            <span className="hero-kicker-dot" aria-hidden="true" />
            Booking new builds · 2026
          </p>

          {/*
            Three fixed lines instead of one sentence left to wrap. Left to
            wrap, the break depended on the window: on a short laptop screen
            the first line took "Websites, portals, and web" and stranded
            "apps" alone beneath it. Each phrase is its own block now, so it
            can only ever break inside itself (see .hero-line). The literal
            spaces keep the heading's text a single sentence for anything
            that reads it without the layout.
          */}
          <h1 className="hero-headline">
            <span className="hero-line">
              <MaskWords text="Websites, portals," delay={T.head} />
            </span>{" "}
            <span className="hero-line">
              <MaskWords text="and web apps" delay={T.head + 0.1} />
            </span>{" "}
            <span className="hero-line serif-em" style={{ color: "var(--flame)" }}>
              <MaskWords text="that win you clients." delay={T.head + 0.28} />
            </span>
          </h1>

          <p className="hero-lede hero-in" style={after(T.lede)}>
            One developer for the whole job: design, build and launch. You deal
            with the person doing the work, and the finished product is yours.
          </p>

          <div className="hero-cta-row hero-in" style={after(T.cta)}>
            <Magnetic strength={0.3}>
              <a href="#contact" className="btn btn-solid">
                <span>Start a project</span>
              </a>
            </Magnetic>
            <a href="#work" className="link-sweep hero-quiet-link" data-cursor="See work">
              See the work <FiArrowDownRight />
            </a>
          </div>

          {/* ── One quiet line of proof ── */}
          <div className="hero-proofline hero-in hero-in-fade" style={after(T.proof)}>
            {TRUST.map((t) => (
              <span key={t} className="hero-trust">
                <FiCheck size={12} aria-hidden="true" />
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll cue — outer box carries the scroll-driven fade, inner the
          entrance, so the two opacities multiply instead of overwriting. */}
      <motion.div className="scroll-cue" style={{ opacity: fade }}>
        <div className="scroll-cue-inner hero-in hero-in-fade" style={after(T.cue)}>
          <span className="mono-label">Scroll</span>
          <motion.span
            className="scroll-cue-line"
            animate={{ scaleY: [0, 1, 0], originY: [0, 0, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
