"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./animations";
import {
  FiCode,
  FiLayout,
  FiSmartphone,
  FiDatabase,
  FiZap,
  FiLayers,
} from "react-icons/fi";

const SERVICES = [
  {
    icon: FiLayout,
    title: "UI/UX Design",
    description:
      "Crafting intuitive, beautiful interfaces that users love. From wireframes to pixel-perfect designs with a focus on user experience and conversion.",
    features: ["Figma Prototyping", "Responsive Design", "Design Systems"],
    color: "#818cf8",
    gradient: "linear-gradient(135deg, #818cf8, #6366f1)",
  },
  {
    icon: FiCode,
    title: "Frontend Development",
    description:
      "Building performant, accessible web applications using React, Next.js, and modern JavaScript. Clean code architecture with smooth animations.",
    features: ["React / Next.js", "TypeScript", "Framer Motion"],
    color: "#22d3ee",
    gradient: "linear-gradient(135deg, #22d3ee, #06b6d4)",
  },
  {
    icon: FiDatabase,
    title: "Backend Development",
    description:
      "Designing robust REST APIs and server-side logic with Node.js, Express, and MongoDB. Secure authentication and database architecture.",
    features: ["Node.js / Express", "MongoDB", "REST APIs"],
    color: "#34d399",
    gradient: "linear-gradient(135deg, #34d399, #10b981)",
  },
  {
    icon: FiSmartphone,
    title: "Responsive Web Apps",
    description:
      "Ensuring every application looks and performs flawlessly across all devices — from mobile phones to ultra-wide desktop monitors.",
    features: ["Mobile-First", "Cross-Browser", "PWA Ready"],
    color: "#fb7185",
    gradient: "linear-gradient(135deg, #fb7185, #e11d48)",
  },
  {
    icon: FiZap,
    title: "Performance Optimization",
    description:
      "Speed matters. I optimize load times, code splitting, image delivery, and Core Web Vitals to ensure your site ranks and converts.",
    features: ["Lazy Loading", "SEO", "Core Web Vitals"],
    color: "#fbbf24",
    gradient: "linear-gradient(135deg, #fbbf24, #f59e0b)",
  },
  {
    icon: FiLayers,
    title: "Full-Stack Solutions",
    description:
      "End-to-end development — from concept to deployment. I handle the complete stack so you get a cohesive, production-ready product.",
    features: ["MERN Stack", "Deployment", "Maintenance"],
    color: "#a78bfa",
    gradient: "linear-gradient(135deg, #a78bfa, #8b5cf6)",
  },
];

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="services"
      style={{
        position: "relative",
        paddingTop: "10rem",
        paddingBottom: "10rem",
        overflow: "hidden",
      }}
    >
      <div className="absolute top-0 left-0 right-0 section-divider" />
      <div className="absolute inset-0 mesh-gradient pointer-events-none" />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "20%",
          right: 0,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "rgba(129, 140, 248, 0.04)",
          filter: "blur(150px)",
        }}
      />

      <div className="section-wrapper" style={{ position: "relative", zIndex: 10 }}>
        <AnimatedSection style={{ textAlign: "center", marginBottom: "5rem" }}>
          <span className="section-label">
            <FiZap style={{ fontSize: "0.85rem" }} />
            What I Do
          </span>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              marginTop: "2rem",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            My{" "}
            <span className="gradient-text">Services</span>
          </h2>
          <p
            style={{
              marginTop: "1.5rem",
              color: "rgba(255,255,255,0.4)",
              maxWidth: "42rem",
              marginLeft: "auto",
              marginRight: "auto",
              fontSize: "1.1rem",
              lineHeight: 1.7,
            }}
          >
            Comprehensive web development services tailored to bring your vision
            to life with cutting-edge technology and best practices.
          </p>
        </AnimatedSection>

        <StaggerContainer
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "2rem",
          }}
          staggerDelay={0.1}
        >
          {SERVICES.map((service, index) => (
            <StaggerItem key={service.title}>
              <motion.div
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  position: "relative",
                  height: "100%",
                  perspective: 1000,
                }}
              >
                <motion.div
                  className="glass-card"
                  style={{
                    padding: "clamp(2rem, 3vw, 2.75rem)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    overflow: "hidden",
                    transformStyle: "preserve-3d",
                  }}
                  animate={{
                    rotateX: hoveredIndex === index ? 2 : 0,
                    rotateY: hoveredIndex === index ? -3 : 0,
                    scale: hoveredIndex === index ? 1.03 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Gradient accent line at top */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      background: service.gradient,
                      opacity: hoveredIndex === index ? 1 : 0,
                      transition: "opacity 0.4s",
                    }}
                  />

                  {/* Glow effect on hover */}
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                          position: "absolute",
                          top: -100,
                          right: -100,
                          width: 250,
                          height: 250,
                          borderRadius: "50%",
                          background: `${service.color}08`,
                          filter: "blur(60px)",
                          pointerEvents: "none",
                        }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Icon */}
                  <motion.div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 16,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: `${service.color}10`,
                      border: `1px solid ${service.color}20`,
                      marginBottom: "1.75rem",
                      position: "relative",
                      zIndex: 1,
                    }}
                    animate={{
                      rotateY: hoveredIndex === index ? 360 : 0,
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  >
                    <service.icon size={26} style={{ color: service.color }} />
                  </motion.div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      color: "#fff",
                      marginBottom: "1rem",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "0.9rem",
                      lineHeight: 1.7,
                      marginBottom: "1.75rem",
                      flex: 1,
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {service.description}
                  </p>

                  {/* Features */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.6rem",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 500,
                          padding: "5px 12px",
                          borderRadius: 9999,
                          color: service.color,
                          background: `${service.color}08`,
                          border: `1px solid ${service.color}20`,
                          letterSpacing: "0.02em",
                        }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
