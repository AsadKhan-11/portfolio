"use client";

import { motion } from "framer-motion";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
  TiltCard,
} from "./animations";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaBootstrap,
  FaFigma,
  FaNpm,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiTypescript,
  SiFirebase,
  SiRedux,
} from "react-icons/si";
import { FiLayout, FiServer, FiTool } from "react-icons/fi";

const SKILL_GROUPS = [
  {
    category: "Frontend",
    description: "Building beautiful, responsive interfaces",
    icon: FiLayout,
    color: "#818cf8",
    bgColor: "rgba(129, 140, 248, 0.06)",
    borderColor: "rgba(129, 140, 248, 0.12)",
    skills: [
      { name: "HTML5", icon: FaHtml5, color: "#E44D26" },
      { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
      { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "React", icon: FaReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#fff" },
      { name: "Redux", icon: SiRedux, color: "#764ABC" },
      { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Bootstrap", icon: FaBootstrap, color: "#7952B3" },
    ],
  },
  {
    category: "Backend",
    description: "Powering applications with robust APIs",
    icon: FiServer,
    color: "#22d3ee",
    bgColor: "rgba(34, 211, 238, 0.06)",
    borderColor: "rgba(34, 211, 238, 0.12)",
    skills: [
      { name: "Node.js", icon: FaNodeJs, color: "#339933" },
      { name: "Express", icon: SiExpress, color: "#fff" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
    ],
  },
  {
    category: "Tools",
    description: "Streamlining the development workflow",
    icon: FiTool,
    color: "#fb7185",
    bgColor: "rgba(251, 113, 133, 0.06)",
    borderColor: "rgba(251, 113, 133, 0.12)",
    skills: [
      { name: "Git", icon: FaGitAlt, color: "#F05032" },
      { name: "NPM", icon: FaNpm, color: "#CB3837" },
      { name: "Figma", icon: FaFigma, color: "#F24E1E" },
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      style={{
        position: "relative",
        paddingTop: "8rem",
        paddingBottom: "8rem",
        overflow: "hidden",
      }}
    >
      <div className="absolute top-0 left-0 right-0 section-divider" />
      <div className="absolute inset-0 dot-grid" style={{ opacity: 0.2 }} />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "25%",
          left: 0,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "rgba(34, 211, 238, 0.03)",
          filter: "blur(150px)",
        }}
      />

      <div className="section-wrapper" style={{ position: "relative", zIndex: 10 }}>
        {/* Header */}
        <AnimatedSection style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className="section-label">Tech Stack</span>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              marginTop: "1.5rem",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            My <span className="gradient-text">Skills</span>
          </h2>
          <p
            style={{
              marginTop: "1.25rem",
              color: "rgba(255,255,255,0.4)",
              maxWidth: "36rem",
              marginLeft: "auto",
              marginRight: "auto",
              fontSize: "1.05rem",
              lineHeight: 1.7,
            }}
          >
            Technologies and tools I use to bring ideas to life and build
            exceptional digital experiences.
          </p>
        </AnimatedSection>

        {/* Category Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1.75rem",
          }}
          className="skills-categories-grid"
        >
          {SKILL_GROUPS.map((group, groupIdx) => (
            <AnimatedSection
              key={group.category}
              delay={groupIdx * 0.15}
              direction={groupIdx % 2 === 0 ? "left" : "right"}
            >
              <TiltCard intensity={4}>
                <div
                  className="glass-card"
                  style={{
                    padding: "clamp(1.5rem, 3vw, 2.5rem)",
                    borderColor: group.borderColor,
                  }}
                >
                  {/* Category Header */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      marginBottom: "1.75rem",
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: group.bgColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <group.icon size={22} style={{ color: group.color }} />
                    </div>
                    <div>
                      <h3
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontSize: "1.2rem",
                          fontWeight: 700,
                          color: "#fff",
                        }}
                      >
                        {group.category}
                      </h3>
                      <p
                        style={{
                          fontSize: "0.85rem",
                          color: "rgba(255,255,255,0.35)",
                          marginTop: 2,
                        }}
                      >
                        {group.description}
                      </p>
                    </div>
                  </div>

                  {/* Skill Badges */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.75rem",
                    }}
                  >
                    {group.skills.map((skill, i) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: groupIdx * 0.1 + i * 0.05,
                          duration: 0.4,
                        }}
                        whileHover={{
                          scale: 1.08,
                          y: -4,
                          transition: { duration: 0.2 },
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.6rem",
                          padding: "0.6rem 1.1rem",
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.06)",
                          borderRadius: 10,
                          cursor: "default",
                          transition: "border-color 0.3s, background 0.3s, box-shadow 0.3s",
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.borderColor = `${group.color}40`;
                          el.style.background = `${group.color}08`;
                          el.style.boxShadow = `0 8px 24px -8px ${group.color}20`;
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.borderColor = "rgba(255,255,255,0.06)";
                          el.style.background = "rgba(255,255,255,0.03)";
                          el.style.boxShadow = "none";
                        }}
                      >
                        <skill.icon
                          style={{ color: skill.color, fontSize: 20, flexShrink: 0 }}
                        />
                        <span
                          style={{
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            color: "rgba(255,255,255,0.7)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
