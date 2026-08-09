"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { FiArrowDownRight, FiGithub, FiLinkedin, FiMail, FiStar } from "react-icons/fi";
import { Magnetic } from "./animations";
import { useIntroDone } from "./intro";

const ROLES = [
  "MERN Developer",
  "React Specialist",
  "API Architect",
  "Interface Engineer",
];

const TOOLS = ["React", "Next.js", "Node", "MongoDB", "TypeScript"];

/* Stand-ins for the client faces — initials keep the proof cluster
   honest until real headshots exist. */
const CLIENTS = ["SM", "JR", "EC", "MF"];

const EASE = [0.16, 1, 0.3, 1] as const;

/*
  Entrance beats, counted from the moment the intro curtain clears.
  Portrait first, then the name rising from behind it, then the copy.
*/
const T = {
  avatar: 0.2,
  lead: 0.85,
  mark: 1,
  copy: 1.5,
  cue: 2,
};

/*
  Splits a word into letters spread edge to edge. The gaps are what make
  the portrait readable on top of the type — it lands in negative space
  instead of eating a glyph.
*/
function SpreadWord({
  text,
  className,
  delay = 0,
  play,
}: {
  text: string;
  className: string;
  delay?: number;
  play: boolean;
}) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((ch, i) => (
        <span key={`${ch}-${i}`} className="hero-letter" aria-hidden="true">
          <motion.span
            style={{ display: "inline-block", willChange: "transform" }}
            initial={{ y: "115%" }}
            animate={play ? { y: 0 } : { y: "115%" }}
            transition={{ duration: 1, delay: delay + i * 0.06, ease: EASE }}
          >
            {ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [role, setRole] = useState(0);
  const ready = useIntroDone();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const rawType = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const rawPortrait = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const typeY = useSpring(rawType, { stiffness: 90, damping: 26 });
  const portraitY = useSpring(rawPortrait, { stiffness: 90, damping: 26 });
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  /*
    Cycle the role line so the hero never sits completely still. Paused
    while the tab is backgrounded — timers keep firing there but the
    exit animations can't, so rotations would otherwise queue up.
  */
  useEffect(() => {
    const id = setInterval(() => {
      if (document.hidden) return;
      setRole((r) => (r + 1) % ROLES.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={ref} id="home" className="hero">
      <div className="shell" style={{ position: "relative", zIndex: 2, width: "100%" }}>
        <motion.p
          className="eyebrow hero-eyebrow"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: T.copy, duration: 0.8 }}
        >
          Available for work — 2026
        </motion.p>

        {/* ── Type + portrait lockup ── */}
        <div className="hero-stack">
          {/* Portrait is anchored to the type, not the section — so the
              flank below can grow without dragging it down. */}
          <div className="hero-lockup">
            <motion.h1 className="hero-heading" style={{ y: typeY }}>
              <SpreadWord
                text="Asad"
                className="hero-word hero-word-lead"
                delay={T.lead}
                play={ready}
              />
              <SpreadWord
                text="Khan"
                className="hero-word hero-word-mark"
                delay={T.mark}
                play={ready}
              />
            </motion.h1>

            <motion.div
              className="hero-avatar"
              style={{ y: portraitY }}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.1 }}
              transition={{ duration: 1.1, delay: T.avatar, ease: EASE }}
            >
              <span className="hero-avatar-glow" aria-hidden="true" />
              <Image
                src="/hero-avatar.png"
                alt="Illustrated portrait of Asad Khan"
                fill
                priority
                sizes="(max-width: 900px) 40vw, 20vw"
                style={{ objectFit: "contain", objectPosition: "bottom" }}
              />
            </motion.div>
          </div>

          {/* Flanks the portrait on desktop, falls under the type on mobile */}
          <div className="hero-flank">
            <motion.div
              className="hero-flank-col hero-flank-l"
              initial={{ opacity: 0, y: 18 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ delay: T.copy + 0.08, duration: 0.9, ease: EASE }}
            >
              <p className="hero-lede">
                I help founders and teams turn ideas into fast,{" "}
                <span className="serif-em">considered</span> web products.
              </p>
              <a href="#work" className="link-sweep hero-quiet-link" data-cursor="See work">
                Selected work <FiArrowDownRight />
              </a>
            </motion.div>

            <motion.div
              className="hero-flank-col hero-flank-r"
              initial={{ opacity: 0, y: 18 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ delay: T.copy + 0.18, duration: 0.9, ease: EASE }}
            >
              {/* Only the current role is mounted, so the stack can never
                  pile up if motion is unavailable. */}
              <span className="hero-role">
                {/* Invisible sizer holds the box open to the longest role
                    so no label is ever clipped mid-word. */}
                <span aria-hidden="true" className="hero-role-sizer">
                  {ROLES.reduce((a, b) => (b.length > a.length ? b : a))}
                </span>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={ROLES[role]}
                    className="hero-role-value"
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.7, ease: EASE }}
                  >
                    {ROLES[role]}
                  </motion.span>
                </AnimatePresence>
              </span>

              <Magnetic strength={0.3}>
                <a href="#contact" className="btn btn-solid">
                  <span>Start a project</span>
                </a>
              </Magnetic>
            </motion.div>
          </div>
        </div>

        {/* ── Proof strip ── */}
        <motion.div
          className="hero-base"
          initial={{ opacity: 0, y: 18 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ delay: T.copy + 0.3, duration: 0.9, ease: EASE }}
        >
          <div className="hero-proof">
            <div className="hero-faces" aria-hidden="true">
              {CLIENTS.map((c) => (
                <span key={c} className="hero-face">
                  {c}
                </span>
              ))}
            </div>
            <div>
              <span className="hero-stars" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <FiStar key={i} size={11} fill="currentColor" />
                ))}
              </span>
              <span className="mono-label" style={{ display: "block", marginTop: 4 }}>
                20+ clients served
              </span>
            </div>
          </div>

          <ul className="hero-tools">
            {TOOLS.map((t) => (
              <li key={t} className="mono-label">
                {t}
              </li>
            ))}
          </ul>

          <div className="hero-socials">
            {[
              { I: FiGithub, href: "https://github.com/AsadKhan-11", l: "GitHub" },
              { I: FiLinkedin, href: "https://linkedin.com", l: "LinkedIn" },
              { I: FiMail, href: "mailto:mrasad10khan@gmail.com", l: "Email" },
            ].map(({ I, href, l }) => (
              <Magnetic key={l} strength={0.4}>
                <a
                  href={href}
                  className="social"
                  aria-label={l}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <I size={16} />
                </a>
              </Magnetic>
            ))}
          </div>
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
