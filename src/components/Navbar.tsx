"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { Magnetic } from "./animations";
import { useIntroDone } from "./intro";

const EMAIL = "mrasad10khan@gmail.com";

const MENU_SOCIALS = [
  { label: "GitHub", href: "https://github.com/AsadKhan-11" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "X", href: "https://x.com/webforge_dev" },
  { label: "Instagram", href: "https://www.instagram.com/webforge.dev/" },
];

const NAV_ITEMS = [
  { label: "Index", href: "#home" },
  { label: "Profile", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Stack", href: "#skills" },
  { label: "Packages", href: "#packages" },
  { label: "Work", href: "#work" },
  { label: "Path", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const EASE = [0.76, 0, 0.24, 1] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [clock, setClock] = useState("");
  const { scrollYProgress } = useScroll();
  const ready = useIntroDone();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Live Lahore time — a small signal that the site is actually alive.
  useEffect(() => {
    const tick = () => {
      setClock(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Asia/Karachi",
          hour12: false,
        }).format(new Date())
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  /*
    Lock scroll behind the overlay, and let Escape close it. Only runs
    while the menu is actually open — otherwise mounting the navbar would
    clear a scroll lock owned by someone else (the intro panel).
  */
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.header
        className="nav-bar"
        data-scrolled={scrolled}
        /* Drops in once the intro curtain is clear — behind it, the slide
           would play unseen. */
        initial={{ y: -90 }}
        animate={ready ? { y: 0 } : { y: -90 }}
        transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
      >
        <div className="nav-inner">
          <Magnetic strength={0.25}>
            <a
              href="#home"
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "var(--f-display)",
                fontWeight: 800,
                fontSize: "clamp(0.9rem, 3vw, 1.05rem)",
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: "var(--bone)",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                whiteSpace: "nowrap",
              }}
            >
              Asad Khan
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--flame)",
                }}
              />
            </a>
          </Magnetic>

          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <span
              className="mono-label"
              style={{ letterSpacing: "0.18em" }}
              suppressHydrationWarning
            >
              <span className="hidden sm:inline">LHR </span>
              {clock}
            </span>

            <Magnetic strength={0.2}>
              {/* The open/close transform lives in CSS next to the bars'
                  own positioning — the two have to agree on the exact
                  gap to converge into a clean X. */}
              <button
                className="burger"
                data-open={open}
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
              >
                <span />
                <span />
              </button>
            </Magnetic>
          </div>
        </div>

        <motion.div
          className="nav-progress"
          style={{ scaleX: scrollYProgress, width: "100%" }}
        />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="menu-overlay"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.85, ease: EASE }}
          >
            <div className="menu-shell">
              <div>
                <p className="mono-label menu-eyebrow">Navigation</p>
                <ul className="menu-list">
                  {NAV_ITEMS.map((item, i) => (
                    <li key={item.label} className="menu-row-wrap">
                      <motion.a
                        href={item.href}
                        className="menu-row"
                        onClick={() => setOpen(false)}
                        initial={{ y: "110%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "110%" }}
                        transition={{
                          duration: 0.8,
                          delay: 0.15 + i * 0.045,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        <span className="menu-index">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="menu-label">{item.label}</span>
                        <FiArrowUpRight className="menu-arrow" size={18} />
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>

              <motion.aside
                className="menu-aside"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="menu-aside-block">
                  <p className="mono-label">Get in touch</p>
                  <a href={`mailto:${EMAIL}`} className="menu-aside-value link-sweep">
                    {EMAIL}
                  </a>
                </div>

                <div className="menu-aside-block">
                  <p className="mono-label">Based in</p>
                  <span className="menu-aside-value" suppressHydrationWarning>
                    Lahore, Pakistan — {clock}
                  </span>
                </div>

                <div className="menu-aside-block">
                  <p className="mono-label">Elsewhere</p>
                  <div className="menu-socials">
                    {MENU_SOCIALS.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="menu-social link-sweep"
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.aside>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
