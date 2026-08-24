"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { Reveal, SplitText } from "./animations";

const FAQS = [
  {
    q: "What does a project typically cost?",
    a: "It depends on scope, but most builds land between $1,000 and $7,000. A landing page sits at the lower end; a full application with auth, payments and an admin panel sits at the upper end. I quote a fixed price after we've talked through what you need, so there are no surprises halfway through.",
  },
  {
    q: "How long will it take?",
    a: "A marketing site is usually 1–2 weeks. A full-stack application is typically 4–8 weeks depending on how many features it has. I'll give you a realistic timeline up front — and if I think a deadline isn't achievable, I'll say so before we start rather than after.",
  },
  {
    q: "Do you work with clients outside Pakistan?",
    a: "Most of my clients are. I'm in Lahore (UTC+5), which overlaps comfortably with Europe, the Middle East and Asia, and I keep early evenings free for calls with the US. Async updates and a staging link mean you're never waiting on a timezone to see progress.",
  },
  {
    q: "Can you work with my existing codebase or team?",
    a: "Yes. I've picked up other people's React and Node projects plenty of times. I'll start by reading the code and telling you honestly what shape it's in — sometimes the right answer is a refactor rather than a rebuild, and that's usually the cheaper one.",
  },
  {
    q: "Who owns the code, and will I be locked in?",
    a: "You own everything once the final invoice is settled — repository, assets, and any accounts set up for the project. No proprietary framework, no hosting you can't move, nothing that requires you to keep paying me to keep the site running.",
  },
  {
    q: "What happens after launch?",
    a: "Every project includes a handover you can act on and 30 days of support for anything that surfaces post-launch. After that I'm available for ongoing work at an agreed rate, but there's no retainer you're obliged to sign.",
  },
];

function Item({
  faq,
  index,
  open,
  onToggle,
}: {
  faq: (typeof FAQS)[number];
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const id = `faq-${index}`;

  return (
    <div className="faq-item" data-open={open}>
      <h3>
        <button
          type="button"
          className="faq-question"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-button`}
          onClick={onToggle}
        >
          <span className="mono-label faq-num">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="faq-text">{faq.q}</span>
          <span className="faq-toggle" aria-hidden="true">
            <FiPlus size={18} />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-button`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p className="faq-answer">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  /* Accordion rather than multi-open — keeps the section from growing
     taller than the screen while someone is reading. */
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section bg-raised">
      <div className="rule-top" />
      <div className="shell">
        <div className="section-head">
          <div>
            <p className="eyebrow">09 — FAQ</p>
            <h2 className="section-title" style={{ marginTop: "1.75rem" }}>
              <SplitText text="Before you" />
              <br />
              <span className="serif-em" style={{ color: "var(--flame)" }}>
                <SplitText text="ask" delay={0.1} />
              </span>
            </h2>
          </div>
          <Reveal delay={0.15}>
            <p className="lede">
              The questions that come up on almost every first call, answered
              properly so you don&apos;t have to ask them.
            </p>
          </Reveal>
        </div>

        <div className="faq-list">
          {FAQS.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 0.04}>
              <Item
                faq={faq}
                index={i}
                open={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="faq-footer">
            Something not covered here?{" "}
            <a href="#contact" className="link-sweep" style={{ color: "var(--flame)" }}>
              Ask me directly
            </a>{" "}
            — I reply within a day.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
