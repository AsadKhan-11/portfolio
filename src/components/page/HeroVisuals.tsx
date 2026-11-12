import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiClock, FiMail, FiMapPin, FiVideo } from "react-icons/fi";
import { getCaseStudy, type CaseStudy } from "@/lib/caseStudies";
import { PACKAGES } from "@/lib/packages";
import { SERVICES, serviceHref } from "@/lib/services";
import { SERVICE_ICONS } from "@/lib/serviceIcons";
import { CONTACT_EMAIL } from "@/lib/site";

/*
  The picture beside each page's first screen. Each says something the page
  is about, from the content the page already shows, instead of decoration:
  three projects for the projects page, the six services for services, the
  prices for packages, a few real questions for the FAQs and the ways to
  reach me for contact. Plain server components; the motion is CSS.
*/

/*
  Three projects fanned like a hand of cards, each a link to its case study.
  The pictures and names come from the case-study data, so they can't drift
  from the pages they open. The two confidential builds and the live product
  lead, in the order the home page shows them.
*/
const FAN = ["ironside-gym", "vector-academy", "veloura"];

export function ProjectsVisual() {
  const items = FAN.map((slug) => getCaseStudy(slug)).filter((c): c is CaseStudy => Boolean(c));
  return (
    <div className="hv hv-fan" aria-label="Selected projects">
      {items.map((c, i) => (
        <Link
          key={c.slug}
          href={`/work/${c.slug}`}
          className={`hv-card hv-card-${i + 1}`}
          style={{ animationDelay: `${0.3 + i * 0.18}s` }}
          data-cursor="Read"
        >
          <Image
            src={c.card}
            alt={`${c.title} case study`}
            fill
            sizes="(max-width: 959px) 0px, 30vw"
            priority={i === 0}
            className="hv-card-img"
          />
          <span className="hv-card-shade" aria-hidden="true" />
          <span className="hv-card-label">
            <strong>{c.title}</strong>
            <small className="mono-label">{c.type}</small>
          </span>
        </Link>
      ))}
    </div>
  );
}

/* The six services as tiles, each a link to its page. */
export function ServicesVisual() {
  return (
    <div className="hv hv-services" aria-label="The six services">
      {SERVICES.map((s, i) => {
        const Icon = SERVICE_ICONS[s.slug];
        return (
          <Link
            key={s.slug}
            href={serviceHref(s.slug)}
            className="hv-tile"
            style={{ animationDelay: `${-i * 1.1}s` }}
            data-cursor="Read"
          >
            <span className="hv-tile-icon" aria-hidden="true">
              <Icon size={18} />
            </span>
            <span className="hv-tile-name">{s.name}</span>
          </Link>
        );
      })}
    </div>
  );
}

/*
  The three packages as steps, each taller than the last: more in the box as
  you climb. The heights show scope, not price (the prices are the numbers on
  them), and each step says how long it takes, from the same lists the
  packages page reads.
*/
const STEP_HEIGHTS = [46, 73, 100];

export function PackagesVisual() {
  return (
    <div className="hv hv-steps" role="img" aria-label="The three packages, from Launch to Scale, each with more included">
      {PACKAGES.map((p, i) => (
        <div
          key={p.name}
          className={`hv-step hv-step-${i + 1}`}
          style={{ height: `${STEP_HEIGHTS[i]}%`, animationDelay: `${0.3 + i * 0.2}s` }}
        >
          <span className="hv-step-n mono-label">{p.n}</span>
          <span className="hv-step-name">{p.name}</span>
          <span className="hv-step-price">from ${p.price.toLocaleString("en-US")}</span>
          <span className="hv-step-time mono-label">{p.features[p.features.length - 1]}</span>
        </div>
      ))}
    </div>
  );
}

/* Three real exchanges, each restating an answer the FAQs give. */
const CHAT = [
  { q: "How long will it take?", a: "Most projects go live in 2–6 weeks." },
  { q: "Who owns the code?", a: "You do, once the final invoice is settled." },
  { q: "What if something breaks?", a: "30 days of support after launch." },
];

export function FaqVisual() {
  return (
    <div className="hv hv-chat" aria-hidden="true">
      {CHAT.map((c, i) => (
        <div key={c.q} className="hv-exchange" style={{ animationDelay: `${0.5 + i * 0.5}s` }}>
          <p className="hv-bubble hv-bubble-q">{c.q}</p>
          <p className="hv-bubble hv-bubble-a">{c.a}</p>
        </div>
      ))}
    </div>
  );
}

/* The ways to reach me, as three cards. */
export function ContactVisual() {
  return (
    <div className="hv hv-cards">
      <div className="hv-mini">
        <span className="hv-mini-icon" aria-hidden="true">
          <FiMail size={18} />
        </span>
        <span className="hv-mini-text">
          <span className="hv-mini-label mono-label">Email</span>
          <a href={`mailto:${CONTACT_EMAIL}`} className="hv-mini-value link-sweep">
            {CONTACT_EMAIL}
          </a>
          <span className="hv-mini-note">Replies within a day</span>
        </span>
      </div>

      <div className="hv-mini">
        <span className="hv-mini-icon" aria-hidden="true">
          <FiMapPin size={18} />
        </span>
        <span className="hv-mini-text">
          <span className="hv-mini-label mono-label">Based in</span>
          <span className="hv-mini-value">Lahore, Pakistan</span>
          <span className="hv-mini-note">UTC+5, working across time zones</span>
        </span>
      </div>

      <div className="hv-mini">
        <span className="hv-mini-icon" aria-hidden="true">
          <FiClock size={18} />
        </span>
        <span className="hv-mini-text">
          <span className="hv-mini-label mono-label">Availability</span>
          <span className="hv-mini-value">
            <span className="hero-kicker-dot hv-dot" aria-hidden="true" />
            Booking new builds
          </span>
          <span className="hv-mini-note">Open for projects in 2026</span>
        </span>
      </div>

      <Link href="/book" className="btn btn-solid hv-book" data-cursor="Book">
        <span>Prefer to talk? Book a call</span>
        <FiArrowUpRight />
      </Link>
    </div>
  );
}

/* A small calendar: a few days lit, one picked. No times, only the idea of choosing one. */
const LIT = new Set([3, 5, 8, 10, 12, 15, 17, 19, 22, 24, 26]);

export function BookVisual() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  return (
    <div className="hv hv-cal" aria-hidden="true">
      <div className="hv-cal-head">
        <span className="hv-cal-month">A good day for a call</span>
        <span className="hv-cal-meet">
          <FiVideo size={14} /> Google Meet
        </span>
      </div>
      <div className="hv-cal-week mono-label">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
      <div className="hv-cal-grid">
        {days.map((d) => (
          <span
            key={d}
            className={`hv-cal-day${LIT.has(d) ? " is-free" : ""}${d === 17 ? " is-picked" : ""}`}
          >
            {d}
          </span>
        ))}
      </div>
      <div className="hv-cal-foot">
        <span className="hv-cal-chip">15 min</span>
        <span className="hv-cal-chip">30 min</span>
        <span className="hv-cal-chip">60 min</span>
      </div>
    </div>
  );
}
