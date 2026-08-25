"use client";

import { FiArrowUpRight, FiCheck } from "react-icons/fi";
import { Magnetic, Reveal, SplitText, Stagger, StaggerItem } from "./animations";

/*
  The moment of doubt: a visitor has just seen the prices and is
  quietly comparing them to a $20 template or a $15k agency. Answer
  that comparison head-on, in the site's own honest voice, right
  before the work proves it.
*/
const ROWS = [
  "Price",
  "Timeline",
  "You talk to",
  "Design",
  "Ownership",
  "After launch",
];

const OPTIONS: {
  name: string;
  values: string[];
  featured?: boolean;
}[] = [
  {
    name: "A template site",
    values: [
      "$20–100 a month, forever",
      "A weekend",
      "A help-center chatbot",
      "Same as everyone else's",
      "Rented — cancel and it's gone",
      "You're on your own",
    ],
  },
  {
    name: "An agency",
    values: [
      "$15,000 and climbing",
      "2–6 months",
      "An account manager",
      "Designed by committee",
      "Depends on the contract",
      "A support ticket queue",
    ],
  },
  {
    name: "Working with me",
    values: [
      "Fixed quote, paid once",
      "2–6 weeks",
      "The person building it",
      "Designed around your business",
      "Yours, fully, from day one",
      "30 days included — then a direct line",
    ],
    featured: true,
  },
];

export default function Band() {
  return (
    <section className="band" aria-label="How working with me compares">
      <div className="shell">
        <div className="section-head">
          <div>
            <p className="eyebrow">Why me</p>
            <h2 className="section-title" style={{ marginTop: "1.75rem" }}>
              <SplitText text="Three ways" />
              <br />
              <span className="serif-em" style={{ color: "var(--flame)" }}>
                <SplitText text="to get a website" delay={0.1} />
              </span>
            </h2>
          </div>
          <Reveal delay={0.15}>
            <p className="lede">
              The honest comparison nobody puts on their pricing page. Only
              one of these is built around your business — and picks up the
              phone afterwards.
            </p>
          </Reveal>
        </div>

        <Stagger className="vs-grid" gap={0.1}>
          {OPTIONS.map(({ name, values, featured }) => (
            <StaggerItem key={name}>
              <article className={`vs-card tick${featured ? " is-me" : ""}`}>
                {featured && (
                  <span className="pkg-badge">
                    <FiCheck size={11} />
                    The sweet spot
                  </span>
                )}
                <h3 className="vs-name">{name}</h3>
                <ul className="vs-rows">
                  {values.map((v, i) => (
                    <li key={ROWS[i]}>
                      <span className="mono-label">{ROWS[i]}</span>
                      <p>{v}</p>
                    </li>
                  ))}
                </ul>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <div className="band-cta-row">
            <Magnetic strength={0.3}>
              <a href="#contact" className="btn btn-solid">
                <span>Start yours</span>
                <FiArrowUpRight />
              </a>
            </Magnetic>
            <span className="mono-label">Currently booking — 2026</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
