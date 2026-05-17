"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedSection } from "./animations";
import { FiStar, FiMessageCircle } from "react-icons/fi";

const TESTIMONIALS = [
  {
    name: "Sarah Mitchell",
    role: "CEO, TechStart Inc.",
    content: "Asad delivered an outstanding e-commerce platform that exceeded our expectations. His attention to detail and modern design approach transformed our online presence completely.",
    rating: 5,
    color: "#818cf8",
  },
  {
    name: "James Rodriguez",
    role: "Founder, CreativeHQ",
    content: "Working with Asad was a game-changer for our startup. He built a blazing-fast React application with beautiful animations that our users absolutely love.",
    rating: 5,
    color: "#22d3ee",
  },
  {
    name: "Emily Chen",
    role: "Marketing Director, BrandUp",
    content: "The portfolio website Asad created for us is simply stunning. The 3D effects and smooth transitions make it stand out from every competitor in our industry.",
    rating: 5,
    color: "#34d399",
  },
  {
    name: "Michael Foster",
    role: "CTO, DataVerse",
    content: "Asad's full-stack expertise is remarkable. He built our entire dashboard from scratch with clean API design, real-time data, and a UI that makes complex data simple.",
    rating: 5,
    color: "#fb7185",
  },
  {
    name: "Priya Sharma",
    role: "Product Manager, NextWave",
    content: "Incredibly talented developer. Asad turned our Figma mockups into a pixel-perfect responsive website in record time. Communication was excellent throughout.",
    rating: 5,
    color: "#fbbf24",
  },
  {
    name: "David Kim",
    role: "Entrepreneur",
    content: "I've worked with many freelancers, but Asad is on another level. His code is clean, well-documented, and he proactively suggests improvements. Highly recommended!",
    rating: 5,
    color: "#a78bfa",
  },
];

function TestimonialCard({ t, i }: { t: (typeof TESTIMONIALS)[0]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: i * 0.1 }}
      whileHover={{ y: -8, rotateY: 3, rotateX: -2, transition: { duration: 0.3 } }}
      style={{ perspective: 1000, transformStyle: "preserve-3d", minWidth: 340, maxWidth: 400, flexShrink: 0 }}
    >
      <div className="glass-card" style={{ padding: "clamp(1.75rem, 3vw, 2.5rem)", height: "100%", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 20, right: 24, fontSize: "4rem", lineHeight: 1, color: `${t.color}10`, fontFamily: "Georgia, serif", fontWeight: 700, pointerEvents: "none" }}>&ldquo;</div>
        <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1.25rem" }}>
          {Array.from({ length: t.rating }).map((_, j) => (
            <FiStar key={j} size={16} style={{ color: "#fbbf24", fill: "#fbbf24" }} />
          ))}
        </div>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", lineHeight: 1.8, flex: 1, marginBottom: "1.75rem", position: "relative", zIndex: 1 }}>
          &ldquo;{t.content}&rdquo;
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: `${t.color}15`, border: `1px solid ${t.color}25`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "1rem", color: t.color }}>
            {t.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <p style={{ fontWeight: 600, fontSize: "0.9rem", color: "#fff" }}>{t.name}</p>
            <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", marginTop: 3 }}>{t.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section ref={ref} style={{ position: "relative", paddingTop: "10rem", paddingBottom: "10rem", overflow: "hidden" }}>
      <div className="absolute top-0 left-0 right-0 section-divider" />
      <div className="absolute inset-0 dot-grid" style={{ opacity: 0.15 }} />

      <div className="section-wrapper" style={{ position: "relative", zIndex: 10 }}>
        <AnimatedSection style={{ textAlign: "center", marginBottom: "5rem" }}>
          <span className="section-label"><FiMessageCircle style={{ fontSize: "0.85rem" }} /> Testimonials</span>
          <h2 style={{ fontFamily: "var(--font-heading)", marginTop: "2rem", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
            What Clients <span className="gradient-text">Say</span>
          </h2>
          <p style={{ marginTop: "1.5rem", color: "rgba(255,255,255,0.4)", maxWidth: "42rem", marginLeft: "auto", marginRight: "auto", fontSize: "1.1rem", lineHeight: 1.7 }}>
            Don&apos;t just take my word for it — here&apos;s what my clients have to say about working together.
          </p>
        </AnimatedSection>
      </div>

      <motion.div style={{ x: x1, display: "flex", gap: "2rem", paddingLeft: "clamp(1.5rem, 5vw, 5rem)", paddingRight: "2rem", marginBottom: "2rem" }}>
        {TESTIMONIALS.slice(0, 3).map((t, i) => <TestimonialCard key={t.name} t={t} i={i} />)}
      </motion.div>
      <motion.div style={{ x: x2, display: "flex", gap: "2rem", paddingLeft: "clamp(1.5rem, 5vw, 5rem)", paddingRight: "2rem" }}>
        {TESTIMONIALS.slice(3, 6).map((t, i) => <TestimonialCard key={t.name} t={t} i={i + 3} />)}
      </motion.div>
    </section>
  );
}
