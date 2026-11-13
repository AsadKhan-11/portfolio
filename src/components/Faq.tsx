"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { Reveal } from "./animations";
import { useScrollSpy } from "./useScrollSpy";
import SectionHead, { type Head } from "./SectionHead";
import { FAQ_GROUPS, HOME_FAQS, type FaqGroup, type FaqLink } from "@/lib/faqs";

/*
  The one FAQ. The home page, the /faqs page, the short lists on the
  packages, services and contact pages, and the questions on each service
  page are all this component, given different questions.

  Every answer is in the page's HTML whether or not it is open: a closed one
  is collapsed to nothing and taken out of the keyboard and screen-reader
  order (`inert`), not removed. A search engine, a reader with scripts off
  and the page's own text-search all find it. The toggles are real buttons,
  which Nielsen Norman Group's FAQ research prefers to script-only widgets.
*/
export interface Entry {
  q: string;
  a: string;
  links?: FaqLink[];
}

const HEAD: Head = {
  eyebrow: "06 · FAQ",
  title: "Before you",
  em: "ask",
  lede: "The questions that come up on almost every first call, answered properly so you don't have to ask them.",
};

/*
  Which questions are open. `exclusive` is the accordion the home page has
  always had (opening one closes the rest, so the section never grows taller
  than the screen while someone reads); the FAQs page lets several stay open
  and can open them all.
*/
function useOpen(
  entries: Entry[],
  { exclusive, openFirst }: { exclusive: boolean; openFirst: boolean },
) {
  const [open, setOpen] = useState<Set<string>>(
    () => new Set(openFirst && entries[0] ? [entries[0].q] : []),
  );

  const toggle = (q: string) =>
    setOpen((prev) => {
      const next = new Set(exclusive ? [] : prev);
      if (prev.has(q)) next.delete(q);
      else next.add(q);
      return next;
    });

  const setAll = (on: boolean) => setOpen(new Set(on ? entries.map((e) => e.q) : []));

  return { open, toggle, setAll };
}

function Item({
  entry,
  index,
  uid,
  open,
  onToggle,
}: {
  entry: Entry;
  index: number;
  uid: string;
  open: boolean;
  onToggle: () => void;
}) {
  const id = `${uid}-${index}`;

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
          <span className="mono-label faq-num">{String(index + 1).padStart(2, "0")}</span>
          <span className="faq-text">{entry.q}</span>
          <span className="faq-toggle" aria-hidden="true">
            <FiPlus size={18} />
          </span>
        </button>
      </h3>

      <motion.div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        aria-hidden={!open}
        inert={!open}
        initial={false}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ overflow: "hidden" }}
      >
        <p className="faq-answer">{entry.a}</p>
        {entry.links && entry.links.length > 0 && (
          <p className="faq-links">
            {entry.links.map((l) => (
              <Link key={`${l.href}-${l.label}`} href={l.href} className="link-sweep">
                {l.label}
              </Link>
            ))}
          </p>
        )}
      </motion.div>
    </div>
  );
}

function FaqList({
  entries,
  open,
  onToggle,
}: {
  entries: Entry[];
  open: Set<string>;
  onToggle: (q: string) => void;
}) {
  const uid = useId();

  return (
    <div className="faq-list">
      {entries.map((entry, i) => (
        <Reveal key={entry.q} delay={i * 0.04}>
          <Item
            entry={entry}
            index={i}
            uid={uid}
            open={open.has(entry.q)}
            onToggle={() => onToggle(entry.q)}
          />
        </Reveal>
      ))}
    </div>
  );
}

/* "#contact" scrolls to the form on the home page; elsewhere the form is a page. */
function Ask({ href }: { href: string }) {
  const props = { className: "link-sweep", style: { color: "var(--flame)" } };
  return href.startsWith("#") ? (
    <a href={href} {...props}>
      Ask me directly
    </a>
  ) : (
    <Link href={href} {...props}>
      Ask me directly
    </Link>
  );
}

/*
  A section of questions. With no props it is the home page's: six questions
  under their own heading. `head={false}` drops the heading where a page's
  first screen has already said what the page is.
*/
export default function Faq({
  head = HEAD,
  items = HOME_FAQS,
  exclusive = true,
  openFirst = true,
  askHref = "#contact",
  all = true,
  raised = true,
}: {
  head?: Head | false;
  items?: Entry[];
  exclusive?: boolean;
  openFirst?: boolean;
  /** Where "Ask me directly" goes. */
  askHref?: string;
  /** Whether to point on to the page with every question. */
  all?: boolean;
  raised?: boolean;
}) {
  const { open, toggle } = useOpen(items, { exclusive, openFirst });

  return (
    <section id="faq" className={`section${raised ? " bg-raised" : ""}`}>
      <div className="rule-top" />
      <div className="shell">
        {head ? <SectionHead {...head} /> : <h2 className="sr-only">Frequently asked questions</h2>}

        <FaqList entries={items} open={open} onToggle={toggle} />

        <Reveal delay={0.2}>
          <p className="faq-footer">
            Something not covered here? <Ask href={askHref} />. I reply within a day.
            {all && (
              <>
                {" "}
                Or{" "}
                <Link href="/faqs" className="link-sweep" style={{ color: "var(--flame)" }}>
                  read every question and answer
                </Link>
                .
              </>
            )}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/*
  Every question, grouped by topic, one section per group, with a single
  button that opens or closes them all (the FAQs page).
*/
export function FaqGroups({ groups = FAQ_GROUPS }: { groups?: FaqGroup[] }) {
  const every = groups.flatMap((g) => g.items);
  const { open, toggle, setAll } = useOpen(every, { exclusive: false, openFirst: true });
  const allOpen = every.every((e) => open.has(e.q));

  return (
    <>
      {groups.map((g, i) => (
        <section
          key={g.id}
          id={g.id}
          className={`section faq-group${i % 2 === 0 ? " bg-raised" : ""}`}
        >
          <div className="rule-top" />
          <div className="shell">
            {i === 0 && (
              <div className="faq-tools">
                <button
                  type="button"
                  className="faq-expand"
                  aria-pressed={allOpen}
                  onClick={() => setAll(!allOpen)}
                >
                  {allOpen ? "Collapse all" : "Expand all"}
                </button>
              </div>
            )}
            <SectionHead
              eyebrow={`${String(i + 1).padStart(2, "0")} · ${g.title}`}
              title={g.heading.title}
              em={g.heading.em}
            />
            <FaqList entries={g.items} open={open} onToggle={toggle} />
          </div>
        </section>
      ))}
    </>
  );
}

/*
  The FAQs page: the categories down a sticky list on the left, every
  question grouped under its heading on the right, and the category being read
  highlighted as the page scrolls. On a phone the categories are a row of
  chips that stays under the header.
*/
export function FaqExplorer({ groups = FAQ_GROUPS }: { groups?: FaqGroup[] }) {
  const every = groups.flatMap((g) => g.items);
  const { open, toggle } = useOpen(every, { exclusive: false, openFirst: false });
  const [active, setActive] = useScrollSpy(groups.map((g) => g.id));

  return (
    <section className="section faqx-section">
      <div className="rule-top" />
      <div className="shell faqx">
        <aside className="faqx-side">
          <p className="faqx-label mono-label">Categories</p>
          <nav aria-label="FAQ categories">
            <ul className="faqx-nav">
              {groups.map((g) => (
                <li key={g.id}>
                  <a
                    href={`#${g.id}`}
                    className={`faqx-link${active === g.id ? " is-on" : ""}`}
                    aria-current={active === g.id ? "true" : undefined}
                    onClick={() => setActive(g.id)}
                  >
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="faqx-help">
            <p>Can&rsquo;t find your answer?</p>
            <Link href="/contact" className="btn btn-solid" data-cursor="Talk">
              <span>Contact me</span>
            </Link>
          </div>
        </aside>

        <div className="faqx-main">
          {groups.map((g) => (
            <section key={g.id} id={g.id} className="faqx-group" aria-labelledby={`${g.id}-title`}>
              <h2 id={`${g.id}-title`} className="faqx-title">
                {g.title}
              </h2>
              <FaqList entries={g.items} open={open} onToggle={toggle} />
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
