"use client";

import Image from "next/image";
import {
  FiFacebook,
  FiGithub,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import { Magnetic, Reveal, SplitText } from "./animations";
import ContactForm from "./ContactForm";

const EMAIL = "mrasad10khan@gmail.com";

const DETAILS = [
  { Icon: FiMail, k: "Email", v: EMAIL, href: `mailto:${EMAIL}` },
  { Icon: FiPhone, k: "Phone", v: "+92 310 4388534", href: "tel:+923104388534" },
  { Icon: FiMapPin, k: "Location", v: "Lahore, Pakistan" },
];

const SOCIALS = [
  { I: FiGithub, href: "https://github.com/AsadKhan-11", l: "GitHub" },
  { I: FiLinkedin, href: "https://linkedin.com", l: "LinkedIn" },
  { I: FiInstagram, href: "https://instagram.com", l: "Instagram" },
  { I: FiFacebook, href: "https://facebook.com", l: "Facebook" },
];

export default function Contact() {
  return (
    <section id="contact" className="contact-split">
      <div className="rule-top" />

      {/* ── Portrait, full-bleed to the left edge ── */}
      <div className="contact-visual">
        <Image
          src="/contact/portrait.jpg"
          alt="Asad Khan at his desk"
          fill
          sizes="(max-width: 979px) 100vw, 50vw"
          style={{ objectFit: "cover", objectPosition: "center 25%" }}
        />
        <div className="contact-visual-scrim" />

        <div className="contact-visual-meta">
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
      </div>

      {/* ── Form panel ── */}
      <div className="contact-panel">
        <div className="contact-panel-inner">
          <Reveal>
            <p className="eyebrow">10 — Contact</p>
          </Reveal>

          <h2
            className="section-title"
            style={{ marginTop: "1.5rem", fontSize: "clamp(2rem, 4.4vw, 3.25rem)" }}
          >
            <SplitText text="Let's build" />
            <br />
            <span className="serif-em" style={{ color: "var(--flame)" }}>
              <SplitText text="something" delay={0.1} />
            </span>
          </h2>

          <Reveal delay={0.1}>
            <p
              className="lede"
              style={{ marginTop: "1.25rem", marginBottom: "clamp(2rem, 4vw, 2.75rem)" }}
            >
              Whether you have a spec ready or just the beginning of an idea,
              tell me about it. I reply within a day.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <ContactForm />
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
        </div>
      </div>
    </section>
  );
}
