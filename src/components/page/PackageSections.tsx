"use client";

import type { IconType } from "react-icons";
import { motion } from "framer-motion";
import {
  FiFileText,
  FiKey,
  FiLifeBuoy,
  FiLink,
  FiMessageCircle,
  FiPackage,
  FiRepeat,
  FiSliders,
  FiTag,
} from "react-icons/fi";

type Item = { title: string; body: string };

const EASE = [0.16, 1, 0.3, 1] as const;

/*
  How the price is arrived at, as a journey rather than three cards: a line
  draws itself across the page and lights each stage as it reaches it (down
  the side on a phone). It plays once, when it scrolls into view.
*/
const FLOW_ICONS: IconType[] = [FiRepeat, FiTag, FiSliders];

export function PricingFlow({ items }: { items: Item[] }) {
  return (
    <motion.ol
      className="flow"
      initial="off"
      whileInView="on"
      viewport={{ once: true, margin: "-18% 0px" }}
    >
      {/* The track and the line that fills it. Horizontal on a wide screen, vertical on a phone. */}
      <span className="flow-track" aria-hidden="true">
        <motion.span
          className="flow-fill"
          variants={{ off: { "--fill": 0 }, on: { "--fill": 1 } } as never}
          transition={{ duration: 2.6, ease: "easeInOut" }}
        />
      </span>

      {items.map((item, i) => {
        const Icon = FLOW_ICONS[i] ?? FiTag;
        /* The line reaches stage i at roughly i / (n - 1) of its run. */
        const at = (i / Math.max(1, items.length - 1)) * 2.4;
        return (
          <motion.li
            key={item.title}
            className="flow-stage"
            variants={{ off: { opacity: 0, y: 26 }, on: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.8, ease: EASE, delay: at }}
          >
            <motion.span
              className="flow-node"
              variants={{ off: { scale: 0.7 }, on: { scale: 1 } }}
              transition={{ duration: 0.6, ease: EASE, delay: at }}
            >
              <Icon size={20} aria-hidden="true" />
              <span className="flow-pulse" aria-hidden="true" style={{ animationDelay: `${at}s` }} />
            </motion.span>
            <span className="flow-n mono-label">Step {String(i + 1).padStart(2, "0")}</span>
            <h3 className="flow-title">{item.title}</h3>
            <p className="flow-body">{item.body}</p>
          </motion.li>
        );
      })}
    </motion.ol>
  );
}

/*
  What comes with every package: a single list with a check that draws itself
  in beside each line, and a statement panel that stays in view while it
  scrolls on a wide screen.
*/
const INCLUDED_ICONS: IconType[] = [FiFileText, FiLink, FiPackage, FiLifeBuoy, FiKey, FiMessageCircle];

export function IncludedList({ items }: { items: Item[] }) {
  return (
    <div className="incl">
      <div className="incl-lead">
        <span className="incl-count" aria-hidden="true">
          {String(items.length).padStart(2, "0")}
        </span>
        <p className="incl-lead-title">Things that come with every package</p>
        <p className="incl-lead-body">
          No add-ons, no tiers of care. Whichever package you pick, this is the baseline of how a project runs.
        </p>
      </div>

      <ul className="incl-list">
        {items.map((item, i) => {
          const Icon = INCLUDED_ICONS[i] ?? FiFileText;
          return (
            <motion.li
              key={item.title}
              className="incl-row"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease: EASE, delay: (i % 3) * 0.06 }}
            >
              <span className="incl-icon" aria-hidden="true">
                <Icon size={18} />
              </span>
              <span className="incl-text">
                <span className="incl-title">{item.title}</span>
                <span className="incl-body">{item.body}</span>
              </span>
              <svg className="incl-check" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="10.5" />
                <motion.path
                  d="M7 12.5l3.2 3.2L17 9"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.3 + (i % 3) * 0.06 }}
                />
              </svg>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
