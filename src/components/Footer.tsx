"use client";

import { useEffect, useRef, useState } from "react";
import { FiArrowUp, FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { Magnetic, Marquee } from "./animations";

const LINKS = [
  { label: "Profile", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Stack", href: "#skills" },
  { label: "Packages", href: "#packages" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const WORDMARK = "Asad Khan";

const SOCIALS = [
  { I: FiGithub, href: "https://github.com/AsadKhan-11", l: "GitHub" },
  { I: FiLinkedin, href: "https://linkedin.com", l: "LinkedIn" },
  { I: FaXTwitter, href: "https://x.com/webforge_dev", l: "X" },
  { I: FiInstagram, href: "https://www.instagram.com/webforge.dev/", l: "Instagram" },
];

export default function Footer() {
  const [clock, setClock] = useState("");
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const rippleId = useRef(0);
  const year = new Date().getFullYear();

  /*
    Material-style click ripple, centred on the click point. The
    wordmark is already a "back to top" link, so this doubles as
    press feedback for that action.
  */
  const addRipple = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = rippleId.current++;
    setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 900);
  };

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

        {/* Oversized outlined wordmark, centred, single line. Sits
            still for 2s, then idles into a per-letter wave — a click
            also sends out a ripple from the pointer. */}
        <a
          href="#home"
          aria-label="Back to top"
          className="footer-mark-link"
          onClick={addRipple}
        >
          <p className="footer-mark">
            {WORDMARK.split("").map((ch, i) => (
              <span
                key={i}
                className="footer-mark-letter"
                style={{ animationDelay: `${2 + i * 0.07}s` }}
              >
                {ch === " " ? " " : ch}
              </span>
            ))}
          </p>
          {ripples.map((r) => (
            <span
              key={r.id}
              className="footer-ripple"
              aria-hidden="true"
              style={{ left: r.x, top: r.y }}
            />
          ))}
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
