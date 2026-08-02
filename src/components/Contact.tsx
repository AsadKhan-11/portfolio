"use client";

import { FiFacebook, FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi";
import { Magnetic, Reveal, SplitText } from "./animations";
import ContactForm from "./ContactForm";

const EMAIL = "masad0108khan@gmail.com";

const DETAILS = [
  { k: "Email", v: EMAIL, href: `mailto:${EMAIL}` },
  { k: "Phone", v: "+92 290 4388534", href: "tel:+922904388534" },
  { k: "Location", v: "Lahore, Pakistan" },
];

const SOCIALS = [
  { I: FiGithub, href: "https://github.com/AsadKhan-11", l: "GitHub" },
  { I: FiLinkedin, href: "https://linkedin.com", l: "LinkedIn" },
  { I: FiInstagram, href: "https://instagram.com", l: "Instagram" },
  { I: FiFacebook, href: "https://facebook.com", l: "Facebook" },
];

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="rule-top" />
      <div className="shell">
        <Reveal>
          <p className="eyebrow">08 — Contact</p>
        </Reveal>

        <h2
          className="section-title"
          style={{
            marginTop: "1.75rem",
            fontSize: "clamp(2.25rem, 6.5vw, 5.25rem)",
          }}
        >
          <SplitText text="Let's build" />
          <br />
          <span className="serif-em" style={{ color: "var(--flame)" }}>
            <SplitText text="something" delay={0.1} />
          </span>
        </h2>

        <div className="contact-layout">
          {/* Details */}
          <div>
            <Reveal delay={0.1}>
              <p className="lede" style={{ marginBottom: "2.5rem" }}>
                Got a project, a role, or just a question? I read everything and
                reply within a day.
              </p>
            </Reveal>

            {DETAILS.map((d, i) => (
              <Reveal key={d.k} delay={0.14 + i * 0.06}>
                <div className="contact-detail">
                  <span className="mono-label">{d.k}</span>
                  {d.href ? (
                    <a href={d.href} className="link-sweep contact-value">
                      {d.v}
                    </a>
                  ) : (
                    <span className="contact-value">{d.v}</span>
                  )}
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.34}>
              <div style={{ display: "flex", gap: "0.7rem", marginTop: "2.5rem" }}>
                {SOCIALS.map(({ I, href, l }) => (
                  <Magnetic key={l} strength={0.4}>
                    <a
                      href={href}
                      className="social"
                      aria-label={l}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <I size={17} />
                    </a>
                  </Magnetic>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.2}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
