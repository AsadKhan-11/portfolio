import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiClock, FiMail, FiMapPin } from "react-icons/fi";
import { PACKAGES } from "@/lib/packages";
import { SERVICES, serviceHref } from "@/lib/services";
import { SERVICE_ICONS } from "@/lib/serviceIcons";
import { CONTACT_EMAIL } from "@/lib/site";

/*
  The picture beside each page's first screen. Each says something the page
  is about, from the content the page already shows, instead of decoration:
  the platforms for the projects page, the six services for services, the
  prices for packages, a few real questions for the FAQs and the ways to
  reach me for contact. Plain server components; the motion is CSS.
*/

/* Three platforms stacked like open windows. The home page's hero uses it too. */
export function HeroWindows({
  shots,
  caption,
  className = "",
}: {
  shots: { src: string; alt: string }[];
  caption?: { href: string; label: string };
  className?: string;
}) {
  return (
    <div className={`hero-stage ${className}`}>
      {shots.map((f, i) => (
        <figure key={f.src} className={`hero-frame hero-frame-${i + 1}`}>
          <span className="hero-frame-bar" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <Image
            src={f.src}
            alt={f.alt}
            width={960}
            height={600}
            sizes="(max-width: 999px) 70vw, 34vw"
            priority={i === 0}
          />
        </figure>
      ))}
      {caption && (
        <Link href={caption.href} className="hero-stage-cap mono-label" data-cursor="See work">
          {caption.label} <FiArrowUpRight size={13} aria-hidden="true" />
        </Link>
      )}
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

/* The three prices as bars that grow to their share of the largest. */
export function PackagesVisual() {
  const top = Math.max(...PACKAGES.map((p) => p.price));
  return (
    <div className="hv hv-prices" role="img" aria-label="The three packages and their starting prices">
      {PACKAGES.map((p, i) => (
        <div key={p.name} className={`hv-price${p.featured ? " is-featured" : ""}`}>
          <span className="hv-price-top">
            <span className="hv-price-name">{p.name}</span>
            <span className="hv-price-num">from ${p.price.toLocaleString("en-US")}</span>
          </span>
          <span className="hv-price-track">
            <span
              className="hv-price-fill"
              style={{ width: `${(p.price / top) * 100}%`, animationDelay: `${0.5 + i * 0.25}s` }}
            />
          </span>
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
    </div>
  );
}
