"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Magnetic } from "./animations";

const NAV_ITEMS = [
  { label: "Index", href: "#home" },
  { label: "Profile", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Stack", href: "#skills" },
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
        initial={{ y: -90 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: EASE }}
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
              <button
                className="burger"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
              >
                <span
                  style={{
                    transform: open
                      ? "translateY(3.75px) rotate(45deg)"
                      : "none",
                  }}
                />
                <span
                  style={{
                    transform: open
                      ? "translateY(-3.75px) rotate(-45deg)"
                      : "none",
                  }}
                />
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
            <div style={{ maxWidth: "var(--measure)", margin: "0 auto", width: "100%" }}>
              {NAV_ITEMS.map((item, i) => (
                <span key={item.label} style={{ display: "block", overflow: "hidden" }}>
                  <motion.a
                    href={item.href}
                    className="menu-link"
                    onClick={() => setOpen(false)}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{
                      duration: 0.8,
                      delay: 0.15 + i * 0.055,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <span className="menu-index">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </motion.a>
                </span>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.55, duration: 0.5 }}
                style={{
                  marginTop: "clamp(2.5rem, 6vh, 4rem)",
                  paddingTop: "1.75rem",
                  borderTop: "1px solid var(--rule)",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "2rem",
                  justifyContent: "space-between",
                }}
              >
                <a
                  href="mailto:mrasad10khan@gmail.com"
                  className="link-sweep mono-label"
                  style={{ color: "var(--bone-70)" }}
                >
                  mrasad10khan@gmail.com
                </a>
                <span className="mono-label">Lahore, Pakistan — {clock}</span>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
