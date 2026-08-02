"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { Reveal, SplitText } from "./animations";

const SERVICES = [
  {
    n: "01",
    title: "Frontend Engineering",
    copy: "Performant, accessible interfaces in React and Next.js. Clean component architecture, real animation craft, and a build that stays fast as the product grows.",
    tags: ["React / Next.js", "TypeScript", "Framer Motion"],
  },
  {
    n: "02",
    title: "Backend & APIs",
    copy: "REST APIs and server logic on Node and Express, backed by MongoDB. Secure auth, sensible data modelling, and endpoints documented well enough to hand over.",
    tags: ["Node / Express", "MongoDB", "REST APIs"],
  },
  {
    n: "03",
    title: "UI / UX Design",
    copy: "Wireframes through to pixel-level design systems in Figma. Interfaces designed around what users are actually trying to do, not around what looks good in a mockup.",
    tags: ["Figma", "Design Systems", "Prototyping"],
  },
  {
    n: "04",
    title: "Responsive Web Apps",
    copy: "Layouts that hold together from a 320px phone to an ultrawide monitor. Mobile-first, cross-browser tested, and progressive-web-app ready when it helps.",
    tags: ["Mobile-First", "Cross-Browser", "PWA"],
  },
  {
    n: "05",
    title: "Performance & SEO",
    copy: "Speed is a feature. Code splitting, image delivery, and Core Web Vitals work that moves both search ranking and conversion in the right direction.",
    tags: ["Core Web Vitals", "Lazy Loading", "SEO"],
  },
  {
    n: "06",
    title: "Full-Stack Delivery",
    copy: "Concept to deployment as a single point of contact. One cohesive product rather than a frontend and backend that were never introduced to each other.",
    tags: ["MERN", "Deployment", "Maintenance"],
  },
];

export default function Services() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="services" className="section">
      <div className="rule-top" />
      <div className="shell">
        <div className="section-head">
          <div>
            <p className="eyebrow">02 — Services</p>
            <h2 className="section-title" style={{ marginTop: "1.75rem" }}>
              <SplitText text="What I" />
              <br />
              <span className="serif-em" style={{ color: "var(--flame)" }}>
                <SplitText text="do best" delay={0.1} />
              </span>
            </h2>
          </div>
          <Reveal delay={0.15}>
            <p className="lede">
              Six things I get hired for. Most projects use several of them at
              once — which is rather the point of hiring one person for the whole
              stack.
            </p>
          </Reveal>
        </div>

        <div style={{ marginTop: "clamp(3rem, 8vh, 5rem)" }}>
          {SERVICES.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <div
                className="row-item"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                onClick={() => setActive((v) => (v === i ? null : i))}
                tabIndex={0}
                role="button"
                aria-expanded={active === i}
              >
                <span
                  className="mono-label"
                  style={{
                    color: active === i ? "var(--flame)" : undefined,
                    transition: "color .4s",
                  }}
                >
                  {s.n}
                </span>

                <div>
                  <h3 className="row-title">{s.title}</h3>

                  <AnimatePresence initial={false}>
                    {active === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <p
                          style={{
                            marginTop: "1.1rem",
                            maxWidth: "62ch",
                            fontSize: "0.98rem",
                            lineHeight: 1.8,
                            color: "var(--bone-45)",
                          }}
                        >
                          {s.copy}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "0.6rem",
                            marginTop: "1.1rem",
                          }}
                        >
                          {s.tags.map((t) => (
                            <span key={t} className="tag">
                              {t}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <motion.span
                  animate={{
                    rotate: active === i ? 45 : 0,
                    color:
                      active === i ? "var(--flame)" : "rgba(244,241,234,0.3)",
                  }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: "grid", placeItems: "center" }}
                >
                  <FiArrowUpRight size={26} />
                </motion.span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
