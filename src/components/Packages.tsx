"use client";

import { FiCheck, FiSliders } from "react-icons/fi";
import { Reveal, SplitText, Stagger, StaggerItem } from "./animations";
import { PACKAGES } from "@/lib/packages";

export default function Packages() {
  return (
    <section id="packages" className="section bg-raised">
      <div className="rule-top" />
      <div className="shell">
        <div className="section-head">
          <div>
            <p className="eyebrow">03 · Packages</p>
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
              Fixed scope, fixed price, a clear finish line. Pick the one
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
                  <span>Talk about {name}</span>
                </a>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <div className="pkg-custom">
            <span className="pkg-custom-icon" aria-hidden="true">
              <FiSliders size={20} />
            </span>
            <div className="pkg-custom-copy">
              <h3 className="pkg-custom-title">Need something custom?</h3>
              <p className="pkg-custom-desc">
                Bigger scope, unusual integrations, or a build that doesn&rsquo;t
                fit a fixed tier? Let&rsquo;s scope it together. Price is set
                once I know exactly what you need, not before.
              </p>
            </div>
            <a
              href="#contact"
              data-cursor="Get started"
              className="btn pkg-custom-cta"
            >
              <span>Discuss your project</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
