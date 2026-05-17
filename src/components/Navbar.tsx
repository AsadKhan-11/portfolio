"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Magnetic } from "./animations";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Determine active section
      const sections = NAV_ITEMS.map((item) => ({
        id: item.href.replace("#", ""),
        label: item.label,
      }));

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActive(sections[i].label);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "nav-blur border-b border-white/5" : ""
        }`}
      >
        <div className="nav-wrapper">
          {/* Logo */}
          <Magnetic strength={0.2}>
            <a
              href="#home"
              className="text-xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span className="gradient-text">AK</span>
              <span className="text-white/40 ml-1 font-light">.</span>
            </a>
          </Magnetic>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center" style={{ gap: '6px' }}>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setActive(item.label)}
                className={`relative text-sm font-medium rounded-full transition-colors duration-300 ${
                  active === item.label
                    ? "text-white"
                    : "text-white/50 hover:text-white/80"
                }`}
                style={{ padding: '8px 18px' }}
              >
                {active === item.label && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "rgba(99, 102, 241, 0.12)",
                      border: "1px solid rgba(99, 102, 241, 0.2)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden md:inline-flex btn-primary text-sm !py-2.5 !px-5"
            >
              Let&apos;s Talk
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col items-center justify-center w-10 h-10 gap-1.5"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block w-6 h-[2px] bg-white/70 rounded-full"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                className="block w-6 h-[2px] bg-white/70 rounded-full"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block w-6 h-[2px] bg-white/70 rounded-full"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 pt-[80px] md:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div className="relative bg-[#12121a] border-b border-white/5 p-6 flex flex-col gap-2">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    active === item.label
                      ? "text-white bg-white/5"
                      : "text-white/50"
                  }`}
                >
                  {item.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="btn-primary text-center mt-3 justify-center"
              >
                Let&apos;s Talk
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
