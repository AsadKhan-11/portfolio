"use client";

import { useEffect, useState } from "react";
import { FiArrowUp, FiFacebook, FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi";
import { Magnetic, Marquee } from "./animations";

const LINKS = [
  { label: "Profile", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Stack", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  { I: FiGithub, href: "https://github.com/AsadKhan-11", l: "GitHub" },
  { I: FiLinkedin, href: "https://linkedin.com", l: "LinkedIn" },
  { I: FiInstagram, href: "https://instagram.com", l: "Instagram" },
  { I: FiFacebook, href: "https://facebook.com", l: "Facebook" },
];

export default function Footer() {
  const [clock, setClock] = useState("");
  const year = new Date().getFullYear();

  useEffect(() => {
    const tick = () =>
      setClock(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Karachi",
          hour12: false,
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer
      style={{
        position: "relative",
        zIndex: 2,
        borderTop: "1px solid var(--rule)",
        background: "rgba(8,8,10,0.72)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Scrolling availability banner */}
      <div
        style={{
          borderBottom: "1px solid var(--rule)",
          paddingBlock: "1.5rem",
          overflow: "hidden",
        }}
      >
        <Marquee speed={30}>
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="marquee-item"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)" }}
            >
              Available for work
              <span
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  background: "#4ade80",
                  flexShrink: 0,
                }}
              />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="shell" style={{ paddingBlock: "clamp(3rem, 8vh, 5rem)" }}>
        <div className="footer-top">
          <nav className="footer-links">
            {LINKS.map((l) => (
              <a key={l.label} href={l.href} className="link-sweep">
                {l.label}
              </a>
            ))}
          </nav>

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

        {/* Oversized outlined wordmark */}
        <a
          href="#home"
          aria-label="Back to top"
          style={{ display: "block", textDecoration: "none" }}
        >
          <p className="footer-mark" style={{ marginBlock: "clamp(2rem, 6vh, 3.5rem)" }}>
            Asad Khan
          </p>
        </a>

        <div className="footer-bottom">
          <span className="mono-label">© {year} Asad Khan</span>
          <span className="mono-label" suppressHydrationWarning>
            Lahore, PK — {clock}
          </span>
          <span className="mono-label">Next.js · Three.js · Framer Motion</span>
          <Magnetic strength={0.3}>
            <a href="#home" className="social" aria-label="Back to top">
              <FiArrowUp size={16} />
            </a>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
