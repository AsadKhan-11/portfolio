"use client";

import {
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

const EMAIL = "mrasad10khan@gmail.com";

const DETAILS = [
  { Icon: FiMail, k: "Email", v: EMAIL, href: `mailto:${EMAIL}` },
  { Icon: FiPhone, k: "Phone", v: "+92 310 4388534", href: "tel:+923104388534" },
  { Icon: FiMapPin, k: "Location", v: "Lahore, Pakistan" },
];

const SOCIALS = [
  { I: FiGithub, href: "https://github.com/AsadKhan-11", l: "GitHub" },
  { I: FiLinkedin, href: "https://www.linkedin.com/in/asad-khan-011h/", l: "LinkedIn" },
  { I: FaXTwitter, href: "https://x.com/webforge_dev", l: "X" },
  { I: FiInstagram, href: "https://www.instagram.com/webforge.dev/", l: "Instagram" },
];

export default function Contact() {
  return (
    <section id="contact" className="section bg-glow-br">
      <div className="rule-top" />
      <div className="shell">
        <div className="contact-layout">
          {/* ── Intro + ways to reach me ── */}
          <div className="contact-intro">
            <Reveal>
              <p className="eyebrow">10 · Contact</p>
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
                Whether you have a spec ready or just the beginning of an
                idea, tell me about it. I reply within a day.
              </p>
            </Reveal>

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
          </div>

          {/* ── The form, carried by its own panel ── */}
          <Reveal delay={0.15} className="contact-form-panel">
            <p className="mono-label contact-form-label">Start a project</p>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
