"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { Magnetic, Reveal, SplitText } from "./animations";
import ImageSlot from "./ImageSlot";
import { useMediaQuery } from "./useClient";

/* How long each project holds the stage before the next slides in */
const ROTATE_MS = 3000;

const PROJECTS = [
  {
    n: "01",
    slot: "/work/01-vanta-aesthetics.jpg",
    image: "/work/01-vanta-aesthetics.jpg",
    title: "Vanta Aesthetics",
    domain: "vanta-aesthetics.vercel.app",
    url: "https://vanta-aesthetics.vercel.app",
    blurb:
      "A Miami aesthetics clinic presented like a fashion house: full-bleed photography, editorial display type, and a consultation funnel that feels like booking a private atelier.",
  },
  {
    n: "02",
    slot: "/work/02-lumiere-aesthetics.jpg",
    image: "/work/02-lumiere-aesthetics.jpg",
    title: "Lumière Aesthetics",
    domain: "lumi-re-aesthetics.vercel.app",
    url: "https://lumi-re-aesthetics.vercel.app",
    blurb:
      "A Scottsdale clinic in warm ivory and serif. Unhurried, personal, and built so booking a consultation feels as considered as the treatments themselves.",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Work() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const still = useMediaQuery("(prefers-reduced-motion: reduce)");
  const total = PROJECTS.length;
  const p = PROJECTS[active];

  /*
    Auto-advance, with every reason to stop: hovering the stage,
    reduced motion, or a backgrounded tab. Re-runs on `active` so
    manual navigation also resets the clock.
  */
  useEffect(() => {
    if (paused || still) return;
    const id = setInterval(() => {
      if (!document.hidden) setActive((i) => (i + 1) % total);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [paused, still, total, active]);

  return (
    <section id="work" className="section bg-glow-bl">
      <div className="rule-top" />
      <div className="shell">
        <div className="section-head">
          <div>
            <p className="eyebrow">05 · Work</p>
            <h2 className="section-title" style={{ marginTop: "1.75rem" }}>
              <SplitText text="Selected" />
              <br />
              <span className="serif-em" style={{ color: "var(--flame)" }}>
                <SplitText text="projects" delay={0.1} />
              </span>
            </h2>
          </div>
          <Reveal delay={0.15}>
            <p className="lede">
              Live builds for real brands, shipped, deployed, and holding up
              in production. The reel runs on its own, or take the wheel.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div
            className="show-stage"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* ── Copy ── */}
            <div className="show-content">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <span className="mono-label show-count">
                    {p.n} / {String(total).padStart(2, "0")}
                  </span>
                  <h3 className="show-title">{p.title}</h3>
                  <p className="show-blurb">{p.blurb}</p>

                  <div className="show-links">
                    <Magnetic strength={0.25}>
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-solid"
                        data-cursor="Visit"
                      >
                        <span>Visit site</span>
                        <FiArrowUpRight />
                      </a>
                    </Magnetic>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* ── Reel controls: the bars are the navigation ── */}
              <div className="show-nav">
                <div className="show-bars">
                  {PROJECTS.map((pr, i) => (
                    <button
                      key={pr.n}
                      className="show-bar"
                      data-active={i === active}
                      aria-label={`Go to ${pr.title}`}
                      onClick={() => setActive(i)}
                    >
                      <span
                        key={`${i}-${active}`}
                        className="show-bar-fill"
                        data-running={i === active && !paused && !still}
                        style={{ animationDuration: `${ROTATE_MS}ms` }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Browser mockup ── */}
            <div className="show-mock">
              <div className="show-mock-glow" aria-hidden="true" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  className="show-browser"
                  initial={{ opacity: 0, y: 36, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -26, scale: 0.97 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <div className="show-browser-bar">
                    <span className="show-dots" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className="show-url">{p.domain}</span>
                  </div>
                  <div className="show-browser-body">
                    <ImageSlot
                      src={p.image}
                      alt={`${p.title} interface preview`}
                      slot={p.slot}
                      ratio="16 / 10"
                      sizes="(max-width: 899px) 92vw, 54vw"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
