"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiInstagram, FiFacebook, FiHeart } from "react-icons/fi";

const FOOTER_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  { icon: FiGithub, href: "https://github.com/AsadKhan-11", label: "GitHub" },
  { icon: FiLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: FiInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FiFacebook, href: "https://facebook.com", label: "Facebook" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#0a0a0f]">
      <div className="section-wrapper" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <a
              href="#home"
              className="text-2xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span className="gradient-text">AK</span>
              <span className="text-white/40 ml-1 font-light">.</span>
            </a>
            <p className="text-sm text-white/30">
              Building the web, one pixel at a time.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-8">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-white/40 hover:text-white/80 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-3">
            {SOCIALS.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon !w-9 !h-9 text-base"
                whileHover={{ y: -3 }}
                aria-label={social.label}
              >
                <social.icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider mt-10 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 text-xs text-white/25">
          <p>
            &copy; {new Date().getFullYear()} Asad Khan. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Made with <FiHeart className="text-rose-400 text-xs" /> using
            Next.js &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
