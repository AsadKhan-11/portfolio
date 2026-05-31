"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import {
  FiArrowDown,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
} from "react-icons/fi";
import { Magnetic, TextReveal } from "./animations";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-24"
    >
      <motion.div
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        className="section-wrapper relative z-10 w-full"
      >
        <div className="hero-layout">
          {/* Left – Text Content */}
          <div className="hero-text">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="section-label">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for work
              </span>
            </motion.div>

            {/* Name */}
            <motion.div
              className="mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h1
                className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                <TextReveal text="Hi, I'm" delay={0.5} />
                <br />
                <span className="gradient-text">
                  <TextReveal text="Asad Khan" delay={0.8} />
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="mt-7 text-base sm:text-lg text-white/50 leading-relaxed"
              style={{ maxWidth: "480px" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              A Full Stack{" "}
              <span className="text-indigo-400 font-medium">
                MERN Developer
              </span>{" "}
              crafting modern, scalable, and pixel-perfect web experiences.
            </motion.p>

            {/* Location */}
            <motion.div
              className="flex items-center text-sm text-white/40"
              style={{ marginTop: "12px", gap: "8px" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <FiMapPin className="text-indigo-400" />
              Lahore, Pakistan
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap items-center"
              style={{ marginTop: "2.5rem", gap: "1.25rem" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              <Magnetic>
                <a href="#projects" className="btn-primary">
                  View My Work
                  <FiArrowDown className="animate-bounce" />
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#contact" className="btn-outline">
                  <FiMail />
                  Get In Touch
                </a>
              </Magnetic>
            </motion.div>

            {/* Social icons */}
            <motion.div
              className="flex items-center"
              style={{ marginTop: "2rem", gap: "1rem" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              <a
                href="https://github.com/AsadKhan-11"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="GitHub"
              >
                <FiGithub />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="LinkedIn"
              >
                <FiLinkedin />
              </a>
              <a
                href="mailto:masad0108khan@gmail.com"
                className="social-icon"
                aria-label="Email"
              >
                <FiMail />
              </a>
            </motion.div>
          </div>

          {/* Right – Hero Image */}
          <motion.div
            className="hero-image-wrapper"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 1.2,
              delay: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <div className="hero-image-container">
              {/* Glow behind image */}
              <div className="hero-image-glow" />

              {/* Main image */}
              <div className="hero-image-frame">
                <Image
                  src="/personal-image/IMG_1513.jpg"
                  alt="Asad Khan"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 360px"
                />

                {/* Gradient fade overlay */}
                <div className="hero-image-fade" />

                {/* Subtle inner glow */}
                <div className="hero-image-inner-glow" />
              </div>

              {/* Decorative corner accents */}
              <div className="hero-corner hero-corner-tl" />
              <div className="hero-corner hero-corner-br" />

              {/* Floating badge – Experience */}
              <motion.div
                className="hero-badge hero-badge-exp"
                initial={{ opacity: 0, x: 20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 1.5 }}
              >
                <motion.div
                  className="flex items-center gap-3"
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="hero-badge-icon">1+</div>
                  <div>
                    <p className="text-xs text-white/40">Years of</p>
                    <p className="text-sm font-semibold text-white">
                      Experience
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Floating badge – Tech */}
              <motion.div
                className="hero-badge hero-badge-tech"
                initial={{ opacity: 0, x: -20, y: -10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 1.7 }}
              >
                <motion.span
                  className="text-xs font-medium text-indigo-400"
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                >
                  ⚡ MERN Stack
                </motion.span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <span className="text-xs text-white/30 tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          className="w-6 h-10 rounded-full border border-white/15 flex items-start justify-center p-2"
          initial={{ opacity: 0.5 }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-indigo-400"
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
