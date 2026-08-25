"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { Reveal, SplitText } from "./animations";
import ImageSlot from "./ImageSlot";
import { useMediaQuery } from "./useClient";

/*
  `image` is intentionally absent until real artwork exists — each page
  falls back to its generated composition, so nothing looks unfinished.
  Drop a file at the `slot` path and set `image` to that same path.
*/
const PROJECTS = [
  {
    n: "01",
    slot: "/work/01-estate-agency.jpg",
    image: undefined as string | undefined,
    title: "Estate Agency",
    blurb:
      "Property listings with faceted search, saved filters and a map view. Agents manage inventory from a role-gated dashboard.",
    from: "#ff5c35",
    to: "#7c2d12",
  },
  {
    n: "02",
    slot: "/work/02-nexa.jpg",
    image: undefined as string | undefined,
    title: "Nexa",
    blurb:
      "A business landing page built around motion — scroll-linked sections, a component library, and a 98 Lighthouse score.",
    from: "#4ff0ff",
    to: "#0e7490",
  },
  {
    n: "03",
    slot: "/work/03-wander.jpg",
    image: undefined as string | undefined,
    title: "Wander",
    blurb:
      "Travel discovery app pairing an interactive map with editorial destination guides and offline-friendly itineraries.",
    from: "#a78bfa",
    to: "#4c1d95",
  },
  {
    n: "04",
    slot: "/work/04-ecommerce-store.jpg",
    image: undefined as string | undefined,
    title: "E-Commerce Store",
    blurb:
      "Full storefront: cart, Stripe checkout, order history and an admin panel for catalogue and fulfilment.",
    from: "#fb7185",
    to: "#881337",
  },
  {
    n: "05",
    slot: "/work/05-analytics-dashboard.jpg",
    image: undefined as string | undefined,
    title: "Analytics Dashboard",
    blurb:
      "Real-time data visualisation with streaming updates, custom chart components and CSV export.",
    from: "#34d399",
    to: "#065f46",
  },
  {
    n: "06",
    slot: "/work/06-portfolio.jpg",
    image: undefined as string | undefined,
    title: "This Portfolio",
    blurb:
      "GLSL background field, scroll-driven layout, custom cursor. Built to be the work sample rather than describe one.",
    from: "#fbbf24",
    to: "#92400e",
  },
];

/* Generated stand-in used until a real screenshot is supplied. */
function ProceduralArt({ from, to }: { from: string; to: string }) {
  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(145deg, ${from}, ${to})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.18,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 60% at 30% 25%, rgba(255,255,255,.35), transparent 60%)",
          mixBlendMode: "overlay",
        }}
      />
    </>
  );
}

/*
  One spread of the deck. Every page is sticky at the same spot, so the
  next one in flow scrolls up and turns over it. While being covered,
  the page under tips back (rotateX, origin top), shrinks and dims —
  the closest scroll can honestly get to a page being flipped.
*/
function Page({
  p,
  index,
  total,
  progress,
  still,
}: {
  p: (typeof PROJECTS)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
  still: boolean;
}) {
  /* Deck progress maps over total-1 hand-offs, not total pages */
  const start = index / (total - 1);
  const end = (index + 1) / (total - 1);
  const cover = useTransform(progress, [start, end], [0, 1], { clamp: true });

  const scale = useTransform(cover, [0, 1], [1, 0.93]);
  const rotateX = useTransform(cover, [0, 1], [0, -7]);
  const y = useTransform(cover, [0, 1], ["0%", "-5%"]);
  const filter = useTransform(cover, (v) => `brightness(${1 - v * 0.45})`);

  const isLast = index === total - 1;
  const reversed = index % 2 === 1;

  return (
    <div className="work-page-slot">
      <motion.article
        className={`work-page tick${reversed ? " is-reversed" : ""}`}
        style={
          still || isLast
            ? undefined
            : { scale, rotateX, y, filter, transformOrigin: "50% 0%" }
        }
      >
        <div className="work-page-visual" data-cursor="View">
          <ImageSlot
            src={p.image}
            alt={`${p.title} — project preview`}
            slot={p.slot}
            ratio="auto"
            className="work-page-media"
            sizes="(max-width: 899px) 100vw, 60vw"
            fallback={<ProceduralArt from={p.from} to={p.to} />}
          />
          <span className="work-page-num" aria-hidden="true">
            {p.n}
          </span>
        </div>

        <div className="work-page-body">
          <span className="mono-label work-page-count">
            {p.n} — {String(total).padStart(2, "0")}
          </span>
          <h3 className="work-page-title">{p.title}</h3>
          <p className="work-page-blurb">{p.blurb}</p>

          <div className="work-page-links">
            <a href="#" className="btn work-page-cta">
              <span>View project</span>
              <FiArrowUpRight />
            </a>
            <a href="#" className="social" aria-label={`${p.title} source code`}>
              <FiGithub size={16} />
            </a>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function Work() {
  const deckRef = useRef<HTMLDivElement>(null);
  const still = useMediaQuery("(prefers-reduced-motion: reduce)");
  const { scrollYProgress } = useScroll({
    target: deckRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="work" className="section bg-glow-bl" style={{ paddingBottom: 0 }}>
      <div className="rule-top" />
      <div className="shell">
        <div className="section-head">
          <div>
            <p className="eyebrow">05 — Work</p>
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
              Six builds that cover the range — storefronts, dashboards,
              content sites. Keep scrolling: each spread turns over the last.
            </p>
          </Reveal>
        </div>

        <div ref={deckRef} className="work-deck">
          {PROJECTS.map((p, i) => (
            <Page
              key={p.n}
              p={p}
              index={i}
              total={PROJECTS.length}
              progress={scrollYProgress}
              still={still}
            />
          ))}
        </div>
      </div>

      <div style={{ height: "var(--section-y)" }} />
    </section>
  );
}
