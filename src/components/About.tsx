"use client";

import {
  AnimatedSection,
  AnimatedCounter,
  TiltCard,
  StaggerContainer,
  StaggerItem,
} from "./animations";

const STATS = [
  { value: 10, suffix: "+", label: "Projects Completed", icon: "🚀" },
  { value: 1, suffix: "+", label: "Years Experience", icon: "⏳" },
  { value: 20, suffix: "+", label: "Happy Clients", icon: "😊" },
  { value: 100, suffix: "%", label: "Client Satisfaction", icon: "⭐" },
];

export default function About() {
  return (
    <section
      id="about"
      style={{ paddingTop: "9rem", paddingBottom: "9rem", position: "relative", overflow: "hidden" }}
    >
      {/* Background accents */}
      <div className="absolute top-0 left-0 right-0 section-divider" />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "33%",
          right: 0,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "rgba(99, 102, 241, 0.03)",
          filter: "blur(150px)",
        }}
      />

      <div className="section-wrapper" style={{ position: "relative", zIndex: 10 }}>
        {/* Section header */}
        <AnimatedSection style={{ textAlign: "center", marginBottom: "5rem" }}>
          <span className="section-label">About Me</span>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              marginTop: "2rem",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Who <span className="gradient-text">Am I</span>?
          </h2>
        </AnimatedSection>

        {/* Two column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3.5rem",
          }}
          className="about-grid"
        >
          {/* Bio text */}
          <AnimatedSection delay={0.2}>
            <div
              className="glass-card"
              style={{ padding: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              <p
                style={{
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                Hello! I&apos;m{" "}
                <span style={{ color: "#fff", fontWeight: 600 }}>Asad Khan</span>, a
                full stack web developer based in{" "}
                <span style={{ color: "#818cf8", fontWeight: 500 }}>
                  Lahore, Pakistan
                </span>
                . With a passion for building complete web solutions, I
                specialize in developing user-friendly and efficient digital
                experiences from front-end to back-end.
              </p>
              <p
                style={{
                  marginTop: "1.75rem",
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                I&apos;m dedicated to delivering high-quality, scalable web
                development services. As a freelance developer, I tailor
                personalized solutions to your needs. My expertise spans across{" "}
                <span style={{ color: "#22d3ee", fontWeight: 500 }}>
                  React, Next.js, Node.js, Express, and MongoDB
                </span>
                , ensuring your project is in capable hands from start to
                finish.
              </p>
              <p
                style={{
                  marginTop: "1.75rem",
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                I turn design ideas into user-friendly interfaces and connect
                them with powerful back-end functionality, ensuring everything
                works smoothly across all devices. With attention to detail and a
                passion for modern web trends, I strive to build solutions that
                not only look great but perform flawlessly.
              </p>
            </div>
          </AnimatedSection>

          {/* Stats Grid */}
          <AnimatedSection delay={0.4}>
            <StaggerContainer
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "1.5rem",
              }}
              className="stats-grid"
              staggerDelay={0.12}
            >
              {STATS.map((stat) => (
                <StaggerItem key={stat.label}>
                  <TiltCard className="stat-card" intensity={10} style={{ height: "100%" }}>
                    <span style={{ fontSize: "1.75rem", marginBottom: "0.75rem", display: "block" }}>
                      {stat.icon}
                    </span>
                    <span
                      className="gradient-text"
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                        fontWeight: 700,
                        display: "block",
                      }}
                    >
                      <AnimatedCounter
                        target={stat.value}
                        suffix={stat.suffix}
                      />
                    </span>
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: "rgba(255,255,255,0.4)",
                        marginTop: "0.5rem",
                        display: "block",
                      }}
                    >
                      {stat.label}
                    </span>
                  </TiltCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </AnimatedSection>
        </div>
      </div>


    </section>
  );
}
