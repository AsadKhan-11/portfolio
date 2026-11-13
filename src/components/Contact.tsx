"use client";

import {
  FiClock,
  FiGithub,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { Magnetic, Reveal, SplitText } from "./animations";
import ContactForm from "./ContactForm";
import { CONTACT_EMAIL as EMAIL } from "@/lib/site";

const DETAILS = [
  { Icon: FiMail, k: "Email", v: EMAIL, href: `mailto:${EMAIL}` },
  { Icon: FiPhone, k: "Phone", v: "+92 310 4388534", href: "tel:+923104388534" },
  { Icon: FiMapPin, k: "Location", v: "Lahore, Pakistan" },
  /* Hours and a time zone, and how long to wait: what a visitor looks for beside the phone number. */
  { Icon: FiClock, k: "Availability", v: "Replies within a day · UTC+5" },
];

const SOCIALS = [
  { I: FiGithub, href: "https://github.com/AsadKhan-11", l: "GitHub" },
  { I: FiLinkedin, href: "https://www.linkedin.com/in/asad-khan-011h/", l: "LinkedIn" },
  { I: FaXTwitter, href: "https://x.com/webforge_dev", l: "X" },
  { I: FiInstagram, href: "https://www.instagram.com/webforge.dev/", l: "Instagram" },
];

/*
  The home page's contact section and the /contact page are the same thing
  in two places: the same details beside the same form. The two halves are
  exported so the page can put its own heading above them.
*/
export function ContactDetails() {
  return (
    <>
      <Reveal delay={0.16}>
        <div className="contact-details">
          {DETAILS.map(({ Icon, k, v, href }) => (
            <div key={k} className="contact-meta-item">
              <span className="contact-meta-icon" aria-hidden="true">
                <Icon size={16} />
              </span>
              <span>
                <span className="mono-label">{k}</span>
                {href ? (
                  <a href={href} className="contact-meta-value link-sweep">
                    {v}
                  </a>
                ) : (
                  <span className="contact-meta-value">{v}</span>
                )}
              </span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.22}>
        <div className="contact-socials">
          <span className="mono-label">Elsewhere</span>
          <div style={{ display: "flex", gap: "0.7rem" }}>
            {SOCIALS.map(({ I, href, l }) => (
              <Magnetic key={l} strength={0.4}>
                <a
                  href={href}
                  className="social"
                  aria-label={l}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <I size={16} />
                </a>
              </Magnetic>
            ))}
          </div>
        </div>
      </Reveal>
    </>
  );
}

/* The form, carried by its own panel. */
export function ContactPanel({ from }: { from?: string }) {
  return (
    <Reveal delay={0.15} className="contact-form-panel">
      <p className="mono-label contact-form-label">Start a project</p>
      <ContactForm from={from} />
    </Reveal>
  );
}

/*
  The section. With no props it is the home page's, under its own heading.
  `head={false}` is the /contact page's: its first screen has already said
  what the page is, so the section is just the details beside the form.
*/
export default function Contact({
  head = true,
  eyebrow = "06 · Contact",
  lede,
  from,
}: {
  head?: boolean;
  /** The case study or service slug this page is about, recorded with the enquiry. */
  from?: string;
  /** The label over the heading: numbered on the home page, plain on the others. */
  eyebrow?: string;
  /** Replaces the paragraph under the heading. */
  lede?: string;
}) {
  return (
    <section id="contact" className="section bg-glow-br">
      <div className="rule-top" />
      <div className="shell">
        <div className="contact-layout">
          {/* ── Intro + ways to reach me ── */}
          <div className="contact-intro">
            {head && (
              <>
                <Reveal>
                  <p className="eyebrow">{eyebrow}</p>
                </Reveal>

                <h2 className="section-title" style={{ marginTop: "1.5rem" }}>
                  <SplitText text="Let's build" />
                  <br />
                  <span className="serif-em" style={{ color: "var(--flame)" }}>
                    <SplitText text="something" delay={0.1} />
                  </span>
                </h2>

                <Reveal delay={0.1}>
                  <p className="lede" style={{ marginTop: "1.5rem" }}>
                    {lede ??
                      "Whether you have a spec ready or just the beginning of an idea, tell me about it. I reply within a day."}
                  </p>
                </Reveal>
              </>
            )}

            <ContactDetails />
          </div>

          <ContactPanel from={from} />
        </div>
      </div>
    </section>
  );
}
