"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { Magnetic, Reveal, SplitText } from "./animations";
import { useMediaQuery } from "./useClient";

/* How long each project holds the stage — long enough for the page
   preview to scroll through before the next slides in */
const ROTATE_MS = 7000;

const PROJECTS = [
  {
    n: "01",
    full: { src: "/work/full/01-vanta.jpg", w: 1200, h: 3400 },
    phone: "/work/mobile/01-vanta.jpg",
    title: "Vanta Aesthetics",
    domain: "vanta-aesthetics.vercel.app",
    url: "https://vanta-aesthetics.vercel.app",
    meta: "Aesthetics clinic · Design + Build · 2026",
    glow: "rgba(214, 168, 94, 0.2)",
    blurb:
      "A Miami aesthetics clinic presented like a fashion house: full-bleed photography, editorial display type, and a consultation funnel that feels like booking a private atelier.",
  },
  {
    n: "02",
    full: { src: "/work/full/02-lumiere.jpg", w: 1200, h: 2200 },
    phone: "/work/mobile/02-lumiere.jpg",
    title: "Lumière Aesthetics",
    domain: "lumi-re-aesthetics.vercel.app",
    url: "https://lumi-re-aesthetics.vercel.app",
    meta: "Aesthetics clinic · Design + Build · 2026",
    glow: "rgba(244, 241, 234, 0.15)",
    blurb:
      "A Scottsdale clinic in warm ivory and serif. Unhurried, personal, and built so booking a consultation feels as considered as the treatments themselves.",
  },
  {
    n: "03",
    full: { src: "/work/full/03-aurelle.jpg", w: 1200, h: 4875 },
    phone: "/work/mobile/03-aurelle.jpg",
    title: "Aurelle",
    domain: "aurelle-mauve-two.vercel.app",
    url: "https://aurelle-mauve-two.vercel.app",
    meta: "Skin wellness studio · Design + Build · 2026",
    glow: "rgba(199, 156, 173, 0.2)",
    blurb:
      "Advanced aesthetics and skin wellness in soft cream: arched editorial photography, a personalization-first philosophy, and a consultation flow that feels effortless.",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

/*
  The full captured page glides upward inside the frame while the slide
  holds — browsing the site, not looking at a still of it. Remounted
  per slide (keyed upstream), so every entrance starts at the top.
*/
function ScrollPreview({
  src,
  w,
  h,
  play,
}: {
  src: string;
  w: number;
  h: number;
  play: boolean;
}) {
  const vpRef = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);

  useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const measure = () => {
      /* Rendered page height follows the viewport width; the overflow
         below the 16/10 window is the scrollable run. */
      const rendered = vp.clientWidth * (h / w);
      setDist(Math.max(0, rendered - vp.clientHeight));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(vp);
    return () => ro.disconnect();
  }, [w, h]);

  return (
    <div ref={vpRef} className="show-viewport">
      <motion.div
        initial={{ y: 0 }}
        animate={play && dist > 0 ? { y: -dist } : { y: 0 }}
        transition={
          play && dist > 0
            ? { duration: (ROTATE_MS - 1800) / 1000, ease: "linear", delay: 1.1 }
            : { duration: 0.5 }
        }
      >
        <Image
          src={src}
          alt=""
          width={w}
          height={h}
          sizes="(max-width: 899px) 92vw, 54vw"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </motion.div>
    </div>
  );
}

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
                  <p className="mono-label show-meta">{p.meta}</p>

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

            {/* ── Browser mockup with a scrolling page inside ── */}
            <div className="show-mock">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  className="show-frame-wrap"
                  initial={{ opacity: 0, y: 36, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -26, scale: 0.97 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  {/* Ambient glow tinted to the brand on stage */}
                  <span
                    className="show-mock-glow"
                    aria-hidden="true"
                    style={{
                      background: `radial-gradient(ellipse 60% 55% at 50% 55%, ${p.glow}, transparent 70%)`,
                    }}
                  />
                  <div className="show-browser">
                    <div className="show-browser-bar">
                      <span className="show-dots" aria-hidden="true">
                        <i />
                        <i />
                        <i />
                      </span>
                      <span className="show-url">{p.domain}</span>
                    </div>
                    <div className="show-browser-body">
                      <ScrollPreview
                        src={p.full.src}
                        w={p.full.w}
                        h={p.full.h}
                        play={!still}
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* ── Phone inset: the same build, pocket sized ── */}
              <div className="show-phone" aria-hidden="true">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={active}
                    className="show-phone-screen"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <Image
                      src={p.phone}
                      alt=""
                      fill
                      sizes="150px"
                      style={{ objectFit: "cover", objectPosition: "top" }}
                    />
                  </motion.span>
                </AnimatePresence>
                <span className="show-phone-notch" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
