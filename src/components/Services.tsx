"use client";

import type { IconType } from "react-icons";
import {
  FiCpu,
  FiLayers,
  FiLayout,
  FiMessageSquare,
  FiRefreshCw,
  FiShoppingBag,
} from "react-icons/fi";
import { Reveal, SplitText, Stagger, StaggerItem } from "./animations";

type Service = {
  n: string;
  title: string;
  copy: string;
  tags: string[];
  Icon: IconType;
  /** Column span on the 12-column desktop grid. */
  span: number;
};

const SERVICES: Service[] = [
  {
    n: "01",
    title: "AI Integration",
    copy: "LLM features built into products that already work — semantic search, document Q&A, summarisation and drafting, wired to your own data with retrieval rather than guesswork.",
    tags: ["OpenAI / Claude API", "RAG", "Vector Search"],
    Icon: FiCpu,
    span: 7,
  },
  {
    n: "02",
    title: "Chatbots & Assistants",
    copy: "Support bots that deflect repetitive tickets and qualify leads before they reach your inbox — with escalation to a human when the bot is out of its depth.",
    tags: ["Conversational UI", "Lead Capture", "Handoff"],
    Icon: FiMessageSquare,
    span: 5,
  },
  {
    n: "03",
    title: "CRM & Automation",
    copy: "Connect the tools you already pay for. Two-way CRM sync, webhook pipelines and workflows that remove the copy-paste work between systems.",
    tags: ["HubSpot", "Webhooks", "Zapier / Make"],
    Icon: FiRefreshCw,
    span: 5,
  },
  {
    n: "04",
    title: "Full-Stack Web Apps",
    copy: "End-to-end MERN builds — dashboards, admin panels, client portals. Secure auth, sensible data modelling, and a frontend that stays fast as the product grows.",
    tags: ["React / Next.js", "Node / Express", "MongoDB"],
    Icon: FiLayers,
    span: 7,
  },
  {
    n: "05",
    title: "E-Commerce & Payments",
    copy: "Storefronts, subscriptions and checkout flows on Stripe. Cart, orders and fulfilment handled properly, with an admin your team can actually operate.",
    tags: ["Stripe", "Subscriptions", "Storefronts"],
    Icon: FiShoppingBag,
    span: 6,
  },
  {
    n: "06",
    title: "UI / UX & Design Systems",
    copy: "Wireframes through to pixel-level design systems in Figma, then built as reusable components. Interfaces designed around what users are actually trying to do.",
    tags: ["Figma", "Design Systems", "Prototyping"],
    Icon: FiLayout,
    span: 6,
  },
];

export default function Services() {
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
              Six things I get hired for, from AI features to the storefront
              underneath them. Most projects use several at once — which is
              rather the point of hiring one person for the whole stack.
            </p>
          </Reveal>
        </div>

        <Stagger className="service-grid" gap={0.08}>
          {SERVICES.map(({ n, title, copy, tags, Icon, span }) => (
            <StaggerItem
              key={n}
              className="service-cell"
              style={{ ["--span" as string]: span }}
            >
              <article className="service-card tick">
                {/* Oversized numeral sits behind the content as texture */}
                <span className="service-ghost" aria-hidden="true">
                  {n}
                </span>

                <span className="service-icon" aria-hidden="true">
                  <Icon size={20} />
                </span>

                <h3 className="service-title">{title}</h3>
                <p className="service-copy">{copy}</p>

                <div className="service-tags">
                  {tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
