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
import { Reveal, SplitText, Stagger, StaggerItem } from "./animations";
import { serviceHref } from "@/lib/services";

type Service = {
  n: string;
  /** The service's own page, at /services/<slug> (see lib/services.ts). */
  slug: string;
  title: string;
  copy: string;
  Icon: IconType;
  /** Position on the 12-column desktop bento grid. */
  colStart: number;
  colSpan: number;
  rowStart: number;
  rowSpan: number;
  /** The oversized showcase cell — bigger icon, title and numeral. */
  hero?: boolean;
  /** Decorative art filling the hero cell's spare space. */
  art?: string;
  /**
   * What the art shows. The art itself is hidden from screen readers (it is
   * decoration), but an empty alt reads as a missing one to image search and
   * SEO audits, so it says what is in the picture.
   */
  artAlt?: string;
};

const SERVICES: Service[] = [
  {
    n: "01",
    slug: "ai-integration",
    title: "AI Integration",
    copy: "LLM features built into products that already work: semantic search, document Q&A, summarisation and drafting, wired to your own data with retrieval rather than guesswork.",
    Icon: FiCpu,
    colStart: 1,
    colSpan: 7,
    rowStart: 1,
    rowSpan: 2,
    hero: true,
    art: "/ai-integration-bot.webp",
    artAlt:
      "Friendly AI robot holding a holographic panel that links an AI chip to search and database icons",
  },
  {
    n: "02",
    slug: "chatbots-assistants",
    title: "Chatbots & Assistants",
    copy: "Support bots that deflect repetitive tickets and qualify leads before they reach your inbox, with escalation to a human when the bot is out of its depth.",
    Icon: FiMessageSquare,
    colStart: 8,
    colSpan: 5,
    rowStart: 1,
    rowSpan: 1,
  },
  {
    n: "03",
    slug: "crm-automation",
    title: "CRM & Automation",
    copy: "Connect the tools you already pay for. Two-way CRM sync, webhook pipelines and workflows that remove the copy-paste work between systems.",
    Icon: FiRefreshCw,
    colStart: 8,
    colSpan: 5,
    rowStart: 2,
    rowSpan: 1,
  },
  {
    n: "04",
    slug: "web-apps",
    title: "Full-Stack Web Apps",
    copy: "End-to-end MERN builds: dashboards, admin panels, client portals. Secure auth, sensible data modelling, and a frontend that stays fast as the product grows.",
    Icon: FiLayers,
    colStart: 1,
    colSpan: 4,
    rowStart: 3,
    rowSpan: 1,
  },
  {
    n: "05",
    slug: "ecommerce-payments",
    title: "E-Commerce & Payments",
    copy: "Storefronts, subscriptions and checkout flows on Stripe. Cart, orders and fulfilment handled properly, with an admin your team can actually operate.",
    Icon: FiShoppingBag,
    colStart: 5,
    colSpan: 4,
    rowStart: 3,
    rowSpan: 1,
  },
  {
    n: "06",
    slug: "ui-ux-design",
    title: "UI / UX & Design Systems",
    copy: "Wireframes through to pixel-level design systems in Figma, then built as reusable components. Interfaces designed around what users are actually trying to do.",
    Icon: FiLayout,
    colStart: 9,
    colSpan: 4,
    rowStart: 3,
    rowSpan: 1,
  },
];

export default function Services() {
  return (
    <section id="services" className="section bg-glow-tr">
      <div className="rule-top" />
      <div className="shell">
        <div className="section-head">
          <div>
            <p className="eyebrow">02 · Services</p>
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
              Six things I get hired for, from AI features to the storefront
              underneath them. Most projects use several at once, which is
              rather the point of hiring one person for the whole stack.
            </p>
          </Reveal>
        </div>

        <Stagger className="service-grid" gap={0.08}>
          {SERVICES.map(({ n, slug, title, copy, Icon, colStart, colSpan, rowStart, rowSpan, hero, art, artAlt }) => (
            <StaggerItem
              key={n}
              className="service-cell"
              style={{
                ["--col-start" as string]: colStart,
                ["--col-span" as string]: colSpan,
                ["--row-start" as string]: rowStart,
                ["--row-span" as string]: rowSpan,
              }}
            >
              <article className={`service-card tick${hero ? " is-hero" : ""}`}>
                {/* Oversized numeral sits behind the content as texture */}
                <span className="service-ghost" aria-hidden="true">
                  {n}
                </span>

                {art && (
                  <span className="service-hero-art" aria-hidden="true">
                    <Image
                      src={art}
                      alt={artAlt ?? ""}
                      fill
                      sizes="(max-width: 640px) 55vw, 280px"
                      style={{ objectFit: "contain" }}
                    />
                  </span>
                )}

                <span className="service-icon" aria-hidden="true">
                  <Icon size={20} />
                </span>

                <h3 className="service-title">{title}</h3>
                <p className="service-copy">{copy}</p>

                {/* Stretched over the whole card (see .service-link), so the
                    card is one big target without nesting links in a link. */}
                <Link href={serviceHref(slug)} className="service-link" data-cursor="Read">
                  <span>Learn more</span>
                  <span className="sr-only"> about {title}</span>
                  <FiArrowRight size={14} aria-hidden="true" />
                </Link>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
