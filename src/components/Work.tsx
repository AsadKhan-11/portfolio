"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { Reveal, SplitText } from "./animations";
import ImageSlot from "./ImageSlot";

/*
  `image` is intentionally absent until real artwork exists — each card
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
    tags: ["React", "Node.js", "MongoDB"],
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
    tags: ["Next.js", "Tailwind", "Framer Motion"],
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
    tags: ["React", "Maps API", "CSS3"],
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
    tags: ["MERN", "Stripe", "Redux"],
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
    tags: ["React", "Chart.js", "Node.js"],
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
    tags: ["Next.js", "Three.js", "GLSL"],
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

function Card({ p }: { p: (typeof PROJECTS)[number] }) {
  return (
    <article className="work-card tick" data-cursor="View">
      <div className="work-visual">
        <ImageSlot
          src={p.image}
          alt={`${p.title} — project preview`}
          slot={p.slot}
          ratio="4 / 3"
          sizes="(max-width: 900px) 78vw, 560px"
          fallback={<ProceduralArt from={p.from} to={p.to} />}
        />
        <span
          style={{
            position: "absolute",
            right: "1.5rem",
            bottom: "0.5rem",
            fontFamily: "var(--f-display)",
            fontWeight: 800,
            fontSize: "clamp(3rem, 7vw, 5.5rem)",
            lineHeight: 0.8,
            color: "rgba(8,8,10,.3)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        >
          {p.n}
        </span>
      </div>

      <div style={{ padding: "clamp(1.5rem, 3vw, 2.25rem)" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--f-display)",
              fontWeight: 800,
              fontSize: "clamp(1.1rem, 1.7vw, 1.35rem)",
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            {p.title}
          </h3>
          <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
            <a href="#" className="social" style={{ width: 38, height: 38 }} aria-label={`${p.title} live site`}>
              <FiArrowUpRight size={15} />
            </a>
            <a href="#" className="social" style={{ width: 38, height: 38 }} aria-label={`${p.title} source`}>
              <FiGithub size={15} />
            </a>
          </div>
        </div>

        <p
          style={{
            marginTop: "0.9rem",
            fontSize: "0.92rem",
            lineHeight: 1.75,
            color: "var(--bone-45)",
          }}
        >
          {p.blurb}
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginTop: "1.25rem",
          }}
        >
          {p.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [pinned, setPinned] = useState(false);

  // Only scroll-jack where there's room for it; phones get a swipe rail.
  useEffect(() => {
    const measure = () => {
      const desktop = window.matchMedia("(min-width: 900px)").matches;
      const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setPinned(desktop && !still);

      const track = trackRef.current;
      if (!track) return;
      const overflow = track.scrollWidth - window.innerWidth;
      setDistance(Math.max(0, overflow + 96));
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });

  const rawX = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const x = useSpring(rawX, { stiffness: 110, damping: 30, mass: 0.4 });

  return (
    <section id="work" className="section" style={{ paddingBottom: 0 }}>
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
              Six builds that cover the range — storefronts, dashboards, content
              sites. {pinned ? "Keep scrolling to move sideways." : "Swipe to browse."}
            </p>
          </Reveal>
        </div>
      </div>

      {/* The scroll target must stay mounted from first paint, so the
          wrapper is always rendered and only its behaviour switches. */}
      <div
        ref={pinRef}
        style={{
          // Must stay non-static in both modes — useScroll measures its
          // offset and warns (and mismeasures) against a static container.
          position: "relative",
          ...(pinned ? { height: `calc(100vh + ${distance}px)` } : null),
        }}
      >
        {pinned ? (
          <>
            <div
              style={{
                position: "sticky",
                top: 0,
                height: "100vh",
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <motion.div
                ref={trackRef}
                className="work-track"
                style={{ x, paddingInline: "var(--gutter)" }}
              >
                {PROJECTS.map((p) => (
                  <Card key={p.n} p={p} />
                ))}
              </motion.div>
            </div>

            {/* progress rail */}
            <div
              style={{
                position: "sticky",
                bottom: "3rem",
                marginInline: "var(--gutter)",
                height: 1,
                background: "var(--bone-08)",
              }}
            >
              <motion.div
                style={{
                  height: "100%",
                  background: "var(--flame)",
                  transformOrigin: "left",
                  scaleX: scrollYProgress,
                }}
              />
            </div>
          </>
        ) : (
          <div
            className="work-rail"
            style={{ marginTop: "clamp(2.5rem, 6vh, 4rem)" }}
          >
            <div
              ref={trackRef}
              className="work-track"
              style={{ paddingInline: "var(--gutter)" }}
            >
              {PROJECTS.map((p) => (
                <Card key={p.n} p={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ height: "var(--section-y)" }} />
    </section>
  );
}
