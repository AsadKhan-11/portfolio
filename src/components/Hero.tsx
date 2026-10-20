"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  FiArrowDownRight,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiStar,
} from "react-icons/fi";
import { Magnetic } from "./animations";
import { useIntroDone } from "./intro";
import { useMediaQuery } from "./useClient";

const TOOLS = ["React", "Next.js", "Node", "MongoDB", "TypeScript"];

/* Stand-ins for the client faces — initials keep the proof cluster
   honest until real headshots exist. */
const CLIENTS = ["SM", "JR", "EC", "MF"];

const EASE = [0.16, 1, 0.3, 1] as const;

/* How long each product screen holds before the mockup moves on */
const SCREEN_MS = 3400;

/*
  The product reel inside the browser frame. Each entry is a different
  kind of build, so the first thing a visitor parses is the range of
  work, not a single screenshot.
*/
const SCREENS = [
  {
    key: "website",
    label: "Website",
    caption: "Marketing sites that load fast and book work",
  },
  {
    key: "portal",
    label: "Client portal",
    caption: "Portals your customers sign into every day",
  },
  {
    key: "automation",
    label: "Automation",
    caption: "Flows that quietly remove the busywork",
  },
  {
    key: "dashboard",
    label: "Dashboard",
    caption: "Dashboards that show the numbers that matter",
  },
];

/* Entrance beats, counted from the moment the intro curtain clears */
const T = {
  status: 0.15,
  head: 0.3,
  lede: 0.85,
  cta: 1,
  mock: 0.5,
  base: 1.2,
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

/* Shared stagger for every skeleton screen */
const pane = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.08 },
  },
  exit: { opacity: 0, transition: { duration: 0.22 } },
};

const el = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

const grow = {
  hidden: { opacity: 0, scaleY: 0 },
  show: { opacity: 1, scaleY: 1, transition: { duration: 0.5, ease: EASE } },
};

function Bar({ w, tone }: { w: string; tone?: "hi" | "accent" }) {
  return (
    <motion.span
      variants={el}
      className="sk-bar"
      data-tone={tone}
      style={{ width: w }}
    />
  );
}

function WebsiteScreen() {
  return (
    <>
      <motion.div variants={el} className="sk-nav">
        <span className="sk-dot" />
        <span className="sk-bar" style={{ width: "14%" }} />
        <span className="sk-nav-links">
          <span className="sk-bar" style={{ width: 26 }} />
          <span className="sk-bar" style={{ width: 26 }} />
          <span className="sk-bar" style={{ width: 26 }} />
        </span>
        <span className="sk-pill sk-pill-solid" style={{ width: 54 }} />
      </motion.div>
      <div className="sk-split">
        <div className="sk-col-copy">
          <Bar w="88%" tone="hi" />
          <Bar w="64%" tone="hi" />
          <Bar w="78%" />
          <Bar w="52%" />
          <motion.div variants={el} className="sk-row">
            <span className="sk-pill sk-pill-solid" style={{ width: 74 }} />
            <span className="sk-pill" style={{ width: 64 }} />
          </motion.div>
        </div>
        <motion.div variants={el} className="sk-card sk-card-media">
          <span className="sk-media" />
          <span className="sk-bar" style={{ width: "70%" }} />
          <span className="sk-bar" style={{ width: "45%" }} />
        </motion.div>
      </div>
    </>
  );
}

function PortalScreen() {
  return (
    <>
      <motion.div variants={el} className="sk-nav">
        <span className="sk-avatar" />
        <span className="sk-bar" style={{ width: "22%" }} />
        <span className="sk-pill" style={{ width: 58, marginLeft: "auto" }} />
      </motion.div>
      {[72, 58, 66, 48].map((w, i) => (
        <motion.div variants={el} className="sk-list-row" key={i}>
          <span className="sk-sq" />
          <span className="sk-bar" style={{ width: `${w}%` }} />
          <span className="sk-pill" data-state={i === 1 ? "on" : undefined} />
        </motion.div>
      ))}
    </>
  );
}

function AutomationScreen() {
  return (
    <>
      <motion.div variants={el} className="sk-nav">
        <span className="sk-bar" style={{ width: "30%" }} />
        <span className="sk-pill sk-pill-solid" style={{ width: 54, marginLeft: "auto" }} />
      </motion.div>
      <div className="sk-flow">
        {["Trigger", "Action", "Done"].map((step, i) => (
          <motion.div variants={el} className="sk-flow-step" key={step}>
            <span className="sk-node" data-last={i === 2 || undefined}>
              <span className="sk-sq" />
              <span className="sk-bar" style={{ width: "72%" }} />
            </span>
            {i < 2 && <span className="sk-link" aria-hidden="true" />}
          </motion.div>
        ))}
      </div>
      {[64, 50].map((w, i) => (
        <motion.div variants={el} className="sk-list-row" key={i}>
          <span className="sk-toggle" data-on={i === 0 || undefined} />
          <span className="sk-bar" style={{ width: `${w}%` }} />
        </motion.div>
      ))}
    </>
  );
}

function DashboardScreen() {
  return (
    <>
      <div className="sk-stats">
        {[0, 1, 2, 3].map((i) => (
          <motion.div variants={el} className="sk-card sk-stat" key={i}>
            <span className="sk-bar" style={{ width: "58%" }} />
            <span className="sk-bar sk-num" data-tone={i === 0 ? "accent" : "hi"} />
          </motion.div>
        ))}
      </div>
      <motion.div variants={el} className="sk-card sk-chart-card">
        <div className="sk-chart">
          {[38, 62, 46, 80, 58, 92, 70, 100].map((h, i) => (
            <motion.span
              key={i}
              variants={grow}
              className="sk-chart-col"
              data-peak={h === 100 || undefined}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </motion.div>
    </>
  );
}

const SCREEN_RENDER: Record<string, () => React.ReactNode> = {
  website: WebsiteScreen,
  portal: PortalScreen,
  automation: AutomationScreen,
  dashboard: DashboardScreen,
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const ready = useIntroDone();
  const still = useMediaQuery("(prefers-reduced-motion: reduce)");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const rawCopy = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const rawMock = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const copyY = useSpring(rawCopy, { stiffness: 90, damping: 26 });
  const mockY = useSpring(rawMock, { stiffness: 90, damping: 26 });
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  /* Pointer tilt — the frame leans toward the cursor like a card held
     in hand. Springs keep it from twitching. */
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 120, damping: 18 });
  const rotateY = useSpring(ry, { stiffness: 120, damping: 18 });

  const onTilt = (e: React.PointerEvent<HTMLDivElement>) => {
    if (still) return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 9);
    rx.set((0.5 - (e.clientY - r.top) / r.height) * 7);
  };
  const resetTilt = () => {
    rx.set(0);
    ry.set(0);
  };

  /* Auto-advance the product reel — paused on hover, reduced motion,
     or a backgrounded tab. Re-runs on `active` so a manual pick also
     resets the clock. */
  useEffect(() => {
    if (paused || still || !ready) return;
    const id = setInterval(() => {
      if (!document.hidden) setActive((i) => (i + 1) % SCREENS.length);
    }, SCREEN_MS);
    return () => clearInterval(id);
  }, [paused, still, ready, active]);

  const screen = SCREENS[active];
  const Screen = SCREEN_RENDER[screen.key];

  return (
    <section ref={ref} id="home" className="hero">
      <div className="shell" style={{ position: "relative", zIndex: 2, width: "100%" }}>
        <div className="hero-grid">
          {/* ── Copy ── */}
          <motion.div className="hero-copy" style={{ y: copyY }}>
            <motion.p
              className="hero-status"
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: T.status, duration: 0.8 }}
            >
              <span className="hero-status-dot" aria-hidden="true" />
              Taking on new builds · 2026
            </motion.p>

            <h1 className="hero-headline">
              <MaskWords text="We forge the web products" delay={T.head} play={ready} />{" "}
              <span className="serif-em" style={{ color: "var(--flame)" }}>
                <MaskWords text="your business runs on." delay={T.head + 0.3} play={ready} />
              </span>
            </h1>

            <motion.p
              className="hero-lede"
              initial={{ opacity: 0, y: 18 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ delay: T.lede, duration: 0.9, ease: EASE }}
            >
              One studio for design, engineering, and launch. Sites, client
              portals, and full products, built fast and handed over fully
              yours.
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

          {/* ── Product mockup ── */}
          <motion.div
            className="hero-mock"
            style={{ y: mockY }}
            initial={{ opacity: 0, y: 44 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 44 }}
            transition={{ delay: T.mock, duration: 1.1, ease: EASE }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => {
              setPaused(false);
              resetTilt();
            }}
          >
            <span className="hm-glow" aria-hidden="true" />
            <motion.div
              className="hm-tilt"
              style={{ rotateX, rotateY, transformPerspective: 1100 }}
              onPointerMove={onTilt}
            >
              <div className="hm-browser">
                <div className="hm-bar">
                  <span className="hm-dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="hm-url">app.yourbusiness.com</span>
                  <span className="hm-live">
                    <i aria-hidden="true" /> Live
                  </span>
                </div>

                <div className="hm-body">
                  <div className="hm-rail" role="tablist" aria-label="Build types">
                    {SCREENS.map((s, i) => (
                      <button
                        key={s.key}
                        className="hm-tab"
                        role="tab"
                        aria-selected={i === active}
                        data-active={i === active}
                        onClick={() => setActive(i)}
                      >
                        <span className="hm-tab-n">{String(i + 1).padStart(2, "0")}</span>
                        {s.label}
                      </button>
                    ))}
                  </div>

                  <div className="hm-pane-wrap">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={screen.key}
                        className="hm-pane"
                        variants={pane}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                      >
                        <Screen />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                <div className="hm-chips" aria-hidden="true">
                  <span>1.2s loads</span>
                  <span>98 / 100 Lighthouse</span>
                  <span>Fully yours</span>
                </div>
              </div>
            </motion.div>

            <div className="hm-caption" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.span
                  key={screen.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  {screen.caption}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* ── Proof strip ── */}
        <motion.div
          className="hero-base"
          initial={{ opacity: 0, y: 18 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ delay: T.base, duration: 0.9, ease: EASE }}
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
              { I: FiLinkedin, href: "https://www.linkedin.com/in/asad-khan-011h/", l: "LinkedIn" },
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
