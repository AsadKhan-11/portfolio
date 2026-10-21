"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { FiArrowDownRight, FiStar } from "react-icons/fi";
import { Magnetic, Marquee } from "./animations";
import { useIntroDone } from "./intro";

const EASE = [0.16, 1, 0.3, 1] as const;

/*
  The shelf under the headline is real shipped work, not a staged
  mockup — the fastest honest answer to "what do they actually make?".
*/
const SHELF = [
  { src: "/work/01-vanta-aesthetics.jpg", domain: "vanta-aesthetics.vercel.app" },
  { src: "/work/02-lumiere-aesthetics.jpg", domain: "lumi-re-aesthetics.vercel.app" },
  { src: "/work/03-aurelle.jpg", domain: "aurelle-mauve-two.vercel.app" },
];

/* Entrance beats, counted from the moment the intro curtain clears */
const T = {
  kicker: 0.15,
  head: 0.3,
  lede: 0.85,
  cta: 1,
  shelf: 0.6,
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
  const rawShelf = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const copyY = useSpring(rawCopy, { stiffness: 90, damping: 26 });
  const shelfY = useSpring(rawShelf, { stiffness: 90, damping: 26 });
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} id="home" className="hero">
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
            Designed, engineered, and launched by one studio. A fixed quote up
            front, and a finished product that is fully yours.
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
        </motion.div>
      </div>

      {/* ── Shelf of live builds, drifting past on a tilted plane ── */}
      <motion.div
        className="hero-shelf"
        style={{ y: shelfY }}
        initial={{ opacity: 0, y: 60 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{ delay: T.shelf, duration: 1.2, ease: EASE }}
      >
        <div className="hero-shelf-tilt">
          <Marquee speed={46}>
            {SHELF.map((p) => (
              <figure key={p.domain} className="shelf-card">
                <span className="shelf-shot">
                  <Image
                    src={p.src}
                    alt=""
                    fill
                    sizes="(max-width: 760px) 70vw, 30vw"
                    style={{ objectFit: "cover" }}
                  />
                </span>
                <figcaption className="mono-label shelf-domain">{p.domain}</figcaption>
              </figure>
            ))}
          </Marquee>
        </div>
      </motion.div>

      {/* ── One quiet line of proof ── */}
      <motion.div
        className="hero-proofline"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: T.proof, duration: 0.9 }}
      >
        <span className="hero-stars" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <FiStar key={i} size={11} fill="currentColor" />
          ))}
        </span>
        <span className="mono-label">20+ clients served · live in production</span>
      </motion.div>

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
