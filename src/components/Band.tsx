"use client";

import Link from "next/link";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";
import { Magnetic, Reveal, Stagger, StaggerItem } from "./animations";
import SectionHead from "./SectionHead";

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
      "Rented. Cancel and it's gone",
      "You're on your own",
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
      "30 days included, then a direct line",
    ],
    featured: true,
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
];

/*
  `ctaHref` is where the button goes: "#contact" on the home page, where the
  form is a section further down, and "/contact" on the other pages that show this.
*/
export default function Band({ ctaHref = "#contact" }: { ctaHref?: string }) {
  return (
    <section className="band" aria-label="How working with me compares">
      <div className="shell">
        <SectionHead
          eyebrow="Why me"
          title="Three ways"
          em="to get a website"
          lede="The honest comparison nobody puts on their pricing page. Only one of these is built around your business, and only one picks up the phone afterwards."
        />

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
              {ctaHref.startsWith("#") ? (
                <a href={ctaHref} className="btn btn-solid">
                  <span>Start yours</span>
                  <FiArrowUpRight />
                </a>
              ) : (
                <Link href={ctaHref} className="btn btn-solid">
                  <span>Start yours</span>
                  <FiArrowUpRight />
                </Link>
              )}
            </Magnetic>
            <span className="mono-label">Currently booking for 2026</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
