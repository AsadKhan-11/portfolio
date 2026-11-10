"use client";

import type { IconType } from "react-icons";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowRight,
  FiCpu,
  FiLayers,
  FiLayout,
  FiMessageSquare,
  FiRefreshCw,
  FiShoppingBag,
} from "react-icons/fi";
import { Reveal, Stagger, StaggerItem } from "./animations";
import SectionHead, { type Head } from "./SectionHead";
import { SERVICES, serviceHref, type ServicePage } from "@/lib/services";

/*
  The one list of services. The home page's section, the /services page, the
  "often paired with" cards on each service page and the "what I do" cards on
  About are all this component. The words come from lib/services.ts, the
  same data that builds the service pages; what lives here is only how a
  card looks: its icon, and where it sits on the bento grid.
*/
interface Cell {
  Icon: IconType;
  /** Position on the 12-column desktop bento grid: [start, span]. */
  col: [number, number];
  row: [number, number];
  /** The oversized showcase cell: bigger icon, title and numeral. */
  hero?: boolean;
  /** Decorative art filling the hero cell's spare space. */
  art?: string;
  /**
   * What the art shows. The art itself is hidden from screen readers (it is
   * decoration), but an empty alt reads as a missing one to image search and
   * SEO audits, so it says what is in the picture.
   */
  artAlt?: string;
}

const CELLS: Record<string, Cell> = {
  "ai-integration": {
    Icon: FiCpu,
    col: [1, 7],
    row: [1, 2],
    hero: true,
    art: "/ai-integration-bot.webp",
    artAlt:
      "Friendly AI robot holding a holographic panel that links an AI chip to search and database icons",
  },
  "chatbots-assistants": { Icon: FiMessageSquare, col: [8, 5], row: [1, 1] },
  "crm-automation": { Icon: FiRefreshCw, col: [8, 5], row: [2, 1] },
  "web-apps": { Icon: FiLayers, col: [1, 4], row: [3, 1] },
  "ecommerce-payments": { Icon: FiShoppingBag, col: [5, 4], row: [3, 1] },
  "ui-ux-design": { Icon: FiLayout, col: [9, 4], row: [3, 1] },
};

const HEAD: Head = {
  eyebrow: "02 · Services",
  title: "What I",
  em: "do best",
  lede: "Six things I get hired for, from AI features to the storefront underneath them. Most projects use several at once, which is rather the point of hiring one person for the whole stack.",
};

export function ServiceCard({
  s,
  bento,
}: {
  s: ServicePage;
  /** On the bento grid the AI card is the big one, with art; in an even grid every card is alike. */
  bento: boolean;
}) {
  const cell = CELLS[s.slug];
  const Icon = cell.Icon;
  const hero = bento && cell.hero;

  return (
    <article className={`service-card tick${hero ? " is-hero" : ""}`}>
      {/* Oversized numeral sits behind the content as texture */}
      <span className="service-ghost" aria-hidden="true">
        {s.n}
      </span>

      {hero && cell.art && (
        <span className="service-hero-art" aria-hidden="true">
          <Image
            src={cell.art}
            alt={cell.artAlt ?? ""}
            fill
            sizes="(max-width: 640px) 55vw, 280px"
            style={{ objectFit: "contain" }}
          />
        </span>
      )}

      <span className="service-icon" aria-hidden="true">
        <Icon size={20} />
      </span>

      <h3 className="service-title">{s.name}</h3>
      <p className="service-copy">{s.summary}</p>

      {/* Stretched over the whole card (see .service-link), so the card is
          one big target without nesting links in a link. */}
      <Link href={serviceHref(s.slug)} className="service-link" data-cursor="Read">
        <span>Learn more</span>
        <span className="sr-only"> about {s.name}</span>
        <FiArrowRight size={14} aria-hidden="true" />
      </Link>
    </article>
  );
}

/*
  The cards. All six make the bento; a list with any left out (the other
  five on a service page) can't fill it, so it becomes an even grid of the
  same cards. `flush` removes the gap above the grid when no heading is there.
*/
export function ServicesGrid({
  exclude = [],
  flush = false,
}: {
  exclude?: string[];
  flush?: boolean;
}) {
  const list = SERVICES.filter((s) => !exclude.includes(s.slug));
  const bento = list.length === SERVICES.length;

  return (
    <Stagger className={`service-grid${bento ? "" : " is-even"}${flush ? " is-flush" : ""}`} gap={0.08}>
      {list.map((s) => {
        const { col, row } = CELLS[s.slug];
        return (
          <StaggerItem
            key={s.slug}
            className="service-cell"
            style={{
              ["--col-start" as string]: col[0],
              ["--col-span" as string]: col[1],
              ["--row-start" as string]: row[0],
              ["--row-span" as string]: row[1],
            }}
          >
            <ServiceCard s={s} bento={bento} />
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}

/*
  The section. With no props it is the home page's. `head={false}` drops the
  heading where the page's first screen has already said what the page is;
  `exclude` leaves out the service you are already on.
*/
export default function Services({
  head = HEAD,
  exclude,
  more = true,
}: {
  head?: Head | false;
  exclude?: string[];
  /** The "All services" button under the cards. */
  more?: boolean;
}) {
  return (
    <section id="services" className="section bg-glow-tr">
      <div className="rule-top" />
      <div className="shell">
        {head ? <SectionHead {...head} /> : <h2 className="sr-only">Services</h2>}

        <ServicesGrid exclude={exclude} flush={!head} />

        {more && (
          <Reveal delay={0.1}>
            <div className="case-more-cta">
              <Link href="/services" className="btn">
                <span>All services</span>
                <FiArrowRight />
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/*
  "Which one do I need?" Each service names the situation it is for (the
  first of its "good fit" lines); this lists them as sentences a visitor can
  hold up against their own week, each pointing to its page.
*/
export function ServiceFit({ head }: { head: Head }) {
  return (
    <section className="section">
      <div className="rule-top" />
      <div className="shell">
        <SectionHead {...head} />

        <ul className="fit-list">
          {SERVICES.map((s) => (
            <li key={s.slug}>
              <Reveal>
                <Link href={serviceHref(s.slug)} className="fit-row" data-cursor="Read">
                  <span className="svc-card-n">{s.n}</span>
                  <span className="fit-text">{s.fit[0]}</span>
                  <span className="fit-go">
                    {s.name} <FiArrowRight size={14} aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
