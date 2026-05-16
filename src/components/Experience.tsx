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
      className="relative py-28 sm:py-36 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 section-divider" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-rose-500/3 blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="section-label">
            <FiBriefcase className="text-sm" />
            Career Path
          </span>
          <h2
            className="mt-6 text-4xl sm:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            My{" "}
            <span className="gradient-text">Experience</span>
          </h2>
          <p className="mt-4 text-white/40 max-w-2xl mx-auto text-lg">
            My professional journey in web development, from learning the
            fundamentals to building production-ready applications.
          </p>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto">
          <StaggerContainer staggerDelay={0.2}>
            {EXPERIENCES.map((exp, index) => (
              <StaggerItem key={exp.title}>
                <div className="relative pl-8 sm:pl-12 pb-12 last:pb-0">
                  {/* Timeline line */}
                  {index < EXPERIENCES.length - 1 && (
                    <div
                      className="absolute left-[6px] sm:left-[22px] top-[28px] bottom-0 w-[2px]"
                      style={{
                        background: `linear-gradient(180deg, ${exp.color}, transparent)`,
                      }}
                    />
                  )}

                  {/* Timeline dot */}
                  <div
                    className="absolute left-0 sm:left-4 top-2 w-[14px] h-[14px] rounded-full border-[3px] z-10"
                    style={{
                      borderColor: exp.color,
                      background: "var(--bg-primary)",
                      boxShadow: `0 0 0 4px ${exp.bgColor}`,
                    }}
                  />

                  {/* Card */}
                  <TiltCard className="glass-card p-6 sm:p-8" intensity={6}>
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: exp.bgColor }}
                      >
                        <exp.icon size={22} style={{ color: exp.color }} />
                      </div>
                      <div>
                        <h3
                          className="text-xl font-bold text-white"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {exp.title}
                        </h3>
                        <p className="text-white/50 text-sm mt-0.5">
                          {exp.company}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-indigo-400 mb-4">
                      <FiCalendar size={14} />
                      {exp.period}
                    </div>

                    <p className="text-white/55 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Skill tags */}
                    <div className="flex flex-wrap gap-2 mt-5">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 text-xs font-medium rounded-full border"
                          style={{
                            color: exp.color,
                            borderColor: `${exp.color}30`,
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
