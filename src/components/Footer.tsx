"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUp, FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { Magnetic, Marquee } from "./animations";
import { PAGES } from "@/lib/nav";
import { SERVICES, serviceHref } from "@/lib/services";
import { CASE_STUDIES } from "@/lib/caseStudies";
import { CONTACT_EMAIL } from "@/lib/site";

const WORDMARK = "WebForge Digital";

const SOCIALS = [
  { I: FiGithub, href: "https://github.com/AsadKhan-11", l: "GitHub" },
  { I: FiLinkedin, href: "https://www.linkedin.com/in/asad-khan-011h/", l: "LinkedIn" },
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
        <div className="footer-grid">
          {/* Who this is, how to reach them, and the one action worth taking. */}
          <div className="footer-brand">
            <Link href="/" className="footer-logo" aria-label="WebForge Digital, home">
              <Image src="/brand/mark-light.png" alt="" width={32} height={19} />
              <span>
                WebForge <span className="footer-logo-dim">Digital</span>
              </span>
            </Link>
            <p className="footer-pitch">
              Websites, portals and web apps, designed, built and launched by one developer.
            </p>
            <p className="footer-status mono-label">
              <span className="footer-status-dot" aria-hidden="true" />
              Booking new builds · 2026
            </p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="footer-email link-sweep">
              {CONTACT_EMAIL}
            </a>
            <div className="footer-brand-actions">
              <Magnetic strength={0.25}>
                <Link href="/contact" className="btn btn-solid">
                  <span>Start a project</span>
                </Link>
              </Magnetic>
              <div className="footer-socials">
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
          </div>

          <nav className="footer-col" aria-label="Explore">
            <p className="footer-head mono-label">Explore</p>
            {PAGES.map((p) => (
              <Link key={p.href} href={p.href}>
                {p.label}
              </Link>
            ))}
          </nav>

          {/* One link to every service page from every page of the site. */}
          <nav className="footer-col" aria-label="Services">
            <p className="footer-head mono-label">Services</p>
            {SERVICES.map((s) => (
              <Link key={s.slug} href={serviceHref(s.slug)}>
                {s.name}
              </Link>
            ))}
          </nav>

          <nav className="footer-col footer-col-wide" aria-label="Projects">
            <p className="footer-head mono-label">Projects</p>
            {CASE_STUDIES.slice(0, 6).map((c) => (
              <Link key={c.slug} href={`/work/${c.slug}`}>
                {c.title}
              </Link>
            ))}
            <Link href="/work" className="footer-more">
              All projects →
            </Link>
          </nav>
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
          <span className="footer-copy mono-label">© {year} WebForge Digital</span>
          <span className="footer-loc mono-label" suppressHydrationWarning>
            Lahore, PK · {clock}
          </span>
          <span className="footer-tech mono-label">Next.js · Three.js · Framer Motion</span>
          {/* A plain wrapper to place on the phone grid: Magnetic moves its
              own div around under the cursor, which is no place for a
              grid-area. */}
          <div className="footer-up">
            <Magnetic strength={0.3}>
              <a href="#home" className="social" aria-label="Back to top">
                <FiArrowUp size={16} />
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </footer>
  );
}
