"use client";

import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
  TiltCard,
} from "./animations";
import { FiBriefcase, FiCalendar, FiCode, FiMonitor } from "react-icons/fi";

const EXPERIENCES = [
  {
    title: "Freelance Web Developer",
    company: "Self-Employed",
    period: "2024 — Present",
    description:
      "Building custom web solutions for clients worldwide. Specializing in full-stack MERN applications, responsive design, and modern UI/UX. Delivered 10+ successful projects across e-commerce, SaaS, and business portfolios.",
    icon: FiCode,
    skills: ["React", "Next.js", "Node.js", "MongoDB", "Tailwind CSS"],
    color: "#818cf8",
    bgColor: "rgba(129, 140, 248, 0.08)",
  },
  {
    title: "Front-End Developer",
    company: "Project-Based Work",
    period: "2023 — 2024",
    description:
      "Developed interactive, responsive user interfaces using React and modern CSS frameworks. Focused on performance optimization, accessibility, and clean code architecture.",
    icon: FiMonitor,
    skills: ["HTML5", "CSS3", "JavaScript", "React", "Bootstrap"],
    color: "#22d3ee",
    bgColor: "rgba(34, 211, 238, 0.08)",
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      style={{
        position: "relative",
        paddingTop: "10rem",
        paddingBottom: "10rem",
        overflow: "hidden",
      }}
    >
      <div className="absolute top-0 left-0 right-0 section-divider" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-rose-500/3 blur-[150px] pointer-events-none" />

      <div className="section-wrapper" style={{ position: "relative", zIndex: 10 }}>
        <AnimatedSection style={{ textAlign: "center", marginBottom: "5rem" }}>
          <span className="section-label">
            <FiBriefcase className="text-sm" />
            Career Path
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
            <span className="gradient-text">Experience</span>
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
            My professional journey in web development, from learning the
            fundamentals to building production-ready applications.
          </p>
        </AnimatedSection>

        <div style={{ maxWidth: "52rem", marginLeft: "auto", marginRight: "auto" }}>
          <StaggerContainer staggerDelay={0.2}>
            {EXPERIENCES.map((exp, index) => (
              <StaggerItem key={exp.title}>
                <div
                  style={{
                    position: "relative",
                    paddingLeft: "3.5rem",
                    paddingBottom: index < EXPERIENCES.length - 1 ? "3rem" : 0,
                  }}
                >
                  {/* Timeline line */}
                  {index < EXPERIENCES.length - 1 && (
                    <div
                      style={{
                        position: "absolute",
                        left: 22,
                        top: 28,
                        bottom: 0,
                        width: 2,
                        background: `linear-gradient(180deg, ${exp.color}, transparent)`,
                      }}
                    />
                  )}

                  {/* Timeline dot */}
                  <div
                    style={{
                      position: "absolute",
                      left: 16,
                      top: 8,
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      border: `3px solid ${exp.color}`,
                      background: "var(--bg-primary)",
                      boxShadow: `0 0 0 4px ${exp.bgColor}`,
                      zIndex: 10,
                    }}
                  />

                  {/* Card */}
                  <TiltCard
                    className="glass-card"
                    intensity={6}
                    style={{ padding: "clamp(2rem, 4vw, 3rem)" }}
                  >
                    {/* Header: icon + title */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "1.25rem",
                        marginBottom: "1.75rem",
                      }}
                    >
                      <div
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: 14,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          background: exp.bgColor,
                        }}
                      >
                        <exp.icon size={24} style={{ color: exp.color }} />
                      </div>
                      <div>
                        <h3
                          style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "1.3rem",
                            fontWeight: 700,
                            color: "#fff",
                          }}
                        >
                          {exp.title}
                        </h3>
                        <p
                          style={{
                            color: "rgba(255,255,255,0.45)",
                            fontSize: "0.9rem",
                            marginTop: 6,
                          }}
                        >
                          {exp.company}
                        </p>
                      </div>
                    </div>

                    {/* Date */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "0.875rem",
                        color: exp.color,
                        marginBottom: "1.5rem",
                      }}
                    >
                      <FiCalendar size={14} />
                      {exp.period}
                    </div>

                    {/* Description */}
                    <p
                      style={{
                        color: "rgba(255,255,255,0.55)",
                        lineHeight: 1.8,
                        fontSize: "0.95rem",
                      }}
                    >
                      {exp.description}
                    </p>

                    {/* Skill tags */}
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.75rem",
                        marginTop: "1.75rem",
                      }}
                    >
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          style={{
                            padding: "6px 14px",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            borderRadius: 9999,
                            color: exp.color,
                            borderColor: `${exp.color}30`,
                            border: `1px solid ${exp.color}30`,
                            background: `${exp.color}08`,
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </TiltCard>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
