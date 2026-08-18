"use client";

import { FiCheck } from "react-icons/fi";
import { Reveal, SplitText, Stagger, StaggerItem } from "./animations";

type Pkg = {
  n: string;
  name: string;
  audience: string;
  price: number;
  features: string[];
  featured?: boolean;
};

const PACKAGES: Pkg[] = [
  {
    n: "01",
    name: "Launch",
    audience: "A fast, professional site for a small business getting online.",
    price: 1500,
    features: [
      "Custom-designed site, up to 5 pages",
      "Mobile-first, fully responsive",
      "Basic on-page SEO",
      "Contact form wired to your inbox",
      "Two rounds of revisions",
      "Live in 2 weeks",
    ],
  },
  {
    n: "02",
    name: "Build",
    audience: "A real product for a startup or team, not just a brochure site.",
    price: 4500,
    features: [
      "Everything in Launch",
      "Custom full-stack application",
      "User accounts & admin dashboard",
      "Integrations with the tools you use",
      "Four rounds of revisions",
      "Live in 4–6 weeks",
    ],
    featured: true,
  },
  {
    n: "03",
    name: "Scale",
    audience: "A full hand-off build, with AI features baked in from day one.",
    price: 9000,
    features: [
      "Everything in Build",
      "AI features — chat, search, automation",
      "Payments & subscriptions",
      "Performance & accessibility audit",
      "30 days of post-launch support",
      "Priority turnaround",
    ],
  },
];

export default function Packages() {
  return (
    <section id="packages" className="section">
      <div className="rule-top" />
      <div className="shell">
        <div className="section-head">
          <div>
            <p className="eyebrow">04 — Packages</p>
            <h2 className="section-title" style={{ marginTop: "1.75rem" }}>
              <SplitText text="Pick a" />
              <br />
              <span className="serif-em" style={{ color: "var(--flame)" }}>
                <SplitText text="package" delay={0.1} />
              </span>
            </h2>
          </div>
          <Reveal delay={0.15}>
            <p className="lede">
              Fixed scope, fixed price, a clear finish line — pick the one
              that matches where you&rsquo;re starting from, or use it as a
              starting point for a conversation.
            </p>
          </Reveal>
        </div>

        <Stagger className="pkg-grid" gap={0.08}>
          {PACKAGES.map(({ n, name, audience, price, features, featured }) => (
            <StaggerItem key={n} className="pkg-cell">
              <article className={`pkg-card tick${featured ? " is-featured" : ""}`}>
                {featured && (
                  <span className="pkg-badge">
                    <FiCheck size={11} />
                    Most popular
                  </span>
                )}

                <div className="pkg-head">
                  <span className="pkg-dot" aria-hidden="true" />
                  <h3 className="pkg-name">{name}</h3>
                </div>
                <p className="pkg-desc">{audience}</p>

                <div className="pkg-price-block">
                  <p className="pkg-price">
                    <span className="pkg-price-from">from</span>
                    <span className="pkg-price-num">${price.toLocaleString()}</span>
                  </p>
                  <span className="mono-label">one-off project cost</span>
                </div>

                <div className="pkg-divider" />

                <ul className="pkg-features">
                  {features.map((f) => (
                    <li key={f}>
                      <FiCheck size={13} aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  data-cursor="Get started"
                  className={`btn pkg-cta${featured ? " btn-solid" : ""}`}
                >
                  Talk about {name}
                </a>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
