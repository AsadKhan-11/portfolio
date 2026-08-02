"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { FiArrowDownRight, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { Magnetic, SplitText } from "./animations";

const ROLES = [
  "MERN Developer",
  "React Specialist",
  "API Architect",
  "Interface Engineer",
];

const META = [
  { k: "Role", v: "Full Stack Developer" },
  { k: "Based", v: "Lahore, Pakistan" },
  { k: "Focus", v: "React · Next · Node" },
  { k: "Status", v: "Available for work" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [role, setRole] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const rawType = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const rawPortrait = useTransform(scrollYProgress, [0, 1], [0, 90]);
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
        <div className="hero-grid">
          {/* ── Type block ── */}
          <motion.div className="hero-type-col" style={{ y: typeY }}>
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              style={{ marginBottom: "clamp(1.25rem, 3vh, 2rem)" }}
            >
              Available for work — 2026
            </motion.p>

            <h1 className="hero-type">
              <span style={{ display: "block" }}>
                <SplitText text="Asad" delay={0.75} />
              </span>
              <span className="hero-line-2">
                <SplitText text="Khan" delay={0.88} />
              </span>
            </h1>

            {/* rotating role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.35, duration: 0.8 }}
              style={{
                marginTop: "clamp(1.5rem, 4vh, 2.5rem)",
                display: "flex",
                alignItems: "baseline",
                gap: "0.65rem",
                flexWrap: "wrap",
                fontSize: "clamp(1.05rem, 2.2vw, 1.6rem)",
                lineHeight: 1.3,
              }}
            >
              <span style={{ color: "var(--bone-45)" }}>A</span>
              {/* Only the current role is mounted, so the stack can never
                  pile up if motion is unavailable. */}
              <span
                style={{
                  position: "relative",
                  display: "inline-block",
                  height: "1.4em",
                  overflow: "hidden",
                  verticalAlign: "bottom",
                }}
              >
                {/* Invisible sizer holds the box open to the longest role
                    so no label is ever clipped mid-word. */}
                <span
                  aria-hidden="true"
                  style={{
                    visibility: "hidden",
                    whiteSpace: "nowrap",
                    fontFamily: "var(--f-display)",
                    fontWeight: 700,
                  }}
                >
                  {ROLES.reduce((a, b) => (b.length > a.length ? b : a))}
                </span>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={ROLES[role]}
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      whiteSpace: "nowrap",
                      color: "var(--flame)",
                      fontFamily: "var(--f-display)",
                      fontWeight: 700,
                    }}
                  >
                    {ROLES[role]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span style={{ color: "var(--bone-45)" }}>crafting</span>
              <span className="serif-em" style={{ color: "var(--bone)" }}>
                considered
              </span>
              <span style={{ color: "var(--bone-45)" }}>web experiences.</span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
                marginTop: "clamp(2rem, 5vh, 3rem)",
                alignItems: "center",
              }}
            >
              <Magnetic strength={0.3}>
                <a href="#work" className="btn btn-solid" data-cursor="See work">
                  <span>Selected work</span>
                  <FiArrowDownRight />
                </a>
              </Magnetic>
              <Magnetic strength={0.3}>
                <a href="#contact" className="btn">
                  <span>Start a project</span>
                </a>
              </Magnetic>

              <div style={{ display: "flex", gap: "0.6rem", marginLeft: "0.5rem" }}>
                {[
                  { I: FiGithub, href: "https://github.com/AsadKhan-11", l: "GitHub" },
                  { I: FiLinkedin, href: "https://linkedin.com", l: "LinkedIn" },
                  { I: FiMail, href: "mailto:masad0108khan@gmail.com", l: "Email" },
                ].map(({ I, href, l }) => (
                  <Magnetic key={l} strength={0.4}>
                    <a
                      href={href}
                      className="social"
                      aria-label={l}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      <I size={17} />
                    </a>
                  </Magnetic>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Portrait ── */}
          <motion.div
            className="hero-portrait-col"
            style={{ y: portraitY }}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="portrait-wrap" data-cursor="Hello">
              <div className="portrait">
                <Image
                  src="/personal-image/IMG_1513.jpg"
                  alt="Asad Khan"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 900px) 70vw, 34vw"
                />
              </div>

              {/* frame ticks */}
              <span className="frame-tick frame-tick-tl" />
              <span className="frame-tick frame-tick-br" />

              <div className="portrait-caption">
                <span className="mono-label" style={{ color: "var(--flame)" }}>
                  01
                </span>
                <span className="mono-label">Lahore · PK</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Meta strip ── */}
        <motion.div
          className="hero-meta-grid"
          style={{ opacity: fade }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {META.map((m) => (
            <div key={m.k}>
              <p className="mono-label" style={{ marginBottom: "0.5rem" }}>
                {m.k}
              </p>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "var(--bone)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {m.k === "Status" && (
                  <motion.span
                    animate={{ opacity: [1, 0.25, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "#4ade80",
                      flexShrink: 0,
                    }}
                  />
                )}
                {m.v}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        className="scroll-cue"
        style={{ opacity: fade }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 0.8 }}
      >
        <span className="mono-label">Scroll</span>
        <motion.span
          className="scroll-cue-line"
          animate={{ scaleY: [0, 1, 0], originY: [0, 0, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
