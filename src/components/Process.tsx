"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "./animations";
import {
  FiSearch,
  FiPenTool,
  FiCode,
  FiCheckCircle,
  FiTarget,
} from "react-icons/fi";

const STEPS = [
  {
    icon: FiSearch,
    step: "01",
    title: "Discovery",
    description: "Understanding your goals, target audience, and project requirements through in-depth consultation.",
    color: "#818cf8",
  },
  {
    icon: FiPenTool,
    step: "02",
    title: "Design",
    description: "Creating wireframes and high-fidelity mockups that align with your brand and user expectations.",
    color: "#22d3ee",
  },
  {
    icon: FiCode,
    step: "03",
    title: "Development",
    description: "Building your project with clean, scalable code using modern frameworks and best practices.",
    color: "#34d399",
  },
  {
    icon: FiCheckCircle,
    step: "04",
    title: "Testing",
    description: "Rigorous testing across devices and browsers to ensure a flawless, bug-free experience.",
    color: "#fbbf24",
  },
  {
    icon: FiTarget,
    step: "05",
    title: "Launch",
    description: "Deploying your project live with ongoing support, performance monitoring, and iterative improvements.",
    color: "#fb7185",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      style={{
        position: "relative",
        paddingTop: "10rem",
        paddingBottom: "10rem",
        overflow: "hidden",
      }}
    >
      <div className="absolute top-0 left-0 right-0 section-divider" />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "40%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 400,
          borderRadius: "50%",
          background: "rgba(99, 102, 241, 0.03)",
          filter: "blur(150px)",
        }}
      />

      <div className="section-wrapper" style={{ position: "relative", zIndex: 10 }}>
        <AnimatedSection style={{ textAlign: "center", marginBottom: "5rem" }}>
          <span className="section-label">
            <FiTarget style={{ fontSize: "0.85rem" }} />
            How I Work
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
            <span className="gradient-text">Process</span>
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
            A structured, transparent workflow designed to deliver exceptional
            results on time and within budget.
          </p>
        </AnimatedSection>

        {/* Steps */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0",
            maxWidth: "52rem",
            marginLeft: "auto",
            marginRight: "auto",
            position: "relative",
          }}
        >
          {/* Vertical connecting line */}
          <div
            style={{
              position: "absolute",
              left: 29,
              top: 60,
              bottom: 60,
              width: 2,
              background: "linear-gradient(180deg, #818cf8, #22d3ee, #34d399, #fbbf24, #fb7185)",
              opacity: 0.3,
            }}
          />

          {STEPS.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              style={{
                display: "flex",
                gap: "2rem",
                alignItems: "flex-start",
                paddingBottom: index < STEPS.length - 1 ? "3rem" : 0,
                position: "relative",
              }}
            >
              {/* Step number circle */}
              <motion.div
                whileHover={{
                  scale: 1.15,
                  rotateZ: 10,
                  boxShadow: `0 0 30px ${step.color}40`,
                }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: `${step.color}12`,
                  border: `2px solid ${step.color}30`,
                  flexShrink: 0,
                  position: "relative",
                  zIndex: 2,
                  cursor: "default",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 800,
                    fontSize: "1.1rem",
                    color: step.color,
                  }}
                >
                  {step.step}
                </span>
              </motion.div>

              {/* Content card */}
              <motion.div
                className="glass-card"
                whileHover={{
                  y: -4,
                  rotateY: 2,
                  boxShadow: `0 20px 40px -20px ${step.color}15`,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                  flex: 1,
                  padding: "clamp(1.5rem, 3vw, 2rem)",
                  perspective: 1000,
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "0.85rem",
                  }}
                >
                  <step.icon size={20} style={{ color: step.color }} />
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.15rem",
                      fontWeight: 700,
                      color: "#fff",
                    }}
                  >
                    {step.title}
                  </h3>
                </div>
                <p
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "0.9rem",
                    lineHeight: 1.7,
                  }}
                >
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
