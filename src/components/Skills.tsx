"use client";

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

const SKILLS = [
  {
    name: "HTML5",
    icon: FaHtml5,
    color: "#E44D26",
    bg: "rgba(228, 77, 38, 0.1)",
  },
  {
    name: "CSS3",
    icon: FaCss3Alt,
    color: "#1572B6",
    bg: "rgba(21, 114, 182, 0.1)",
  },
  {
    name: "JavaScript",
    icon: FaJs,
    color: "#F7DF1E",
    bg: "rgba(247, 223, 30, 0.1)",
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    color: "#3178C6",
    bg: "rgba(49, 120, 198, 0.1)",
  },
  {
    name: "React",
    icon: FaReact,
    color: "#61DAFB",
    bg: "rgba(97, 218, 251, 0.1)",
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    color: "#FFFFFF",
    bg: "rgba(255, 255, 255, 0.06)",
  },
  {
    name: "Redux",
    icon: SiRedux,
    color: "#764ABC",
    bg: "rgba(118, 74, 188, 0.1)",
  },
  {
    name: "Node.js",
    icon: FaNodeJs,
    color: "#339933",
    bg: "rgba(51, 153, 51, 0.1)",
  },
  {
    name: "Express",
    icon: SiExpress,
    color: "#FFFFFF",
    bg: "rgba(255, 255, 255, 0.06)",
  },
  {
    name: "MongoDB",
    icon: SiMongodb,
    color: "#47A248",
    bg: "rgba(71, 162, 72, 0.1)",
  },
  {
    name: "Tailwind",
    icon: SiTailwindcss,
    color: "#06B6D4",
    bg: "rgba(6, 182, 212, 0.1)",
  },
  {
    name: "Bootstrap",
    icon: FaBootstrap,
    color: "#7952B3",
    bg: "rgba(121, 82, 179, 0.1)",
  },
  {
    name: "Firebase",
    icon: SiFirebase,
    color: "#FFCA28",
    bg: "rgba(255, 202, 40, 0.1)",
  },
  {
    name: "Git",
    icon: FaGitAlt,
    color: "#F05032",
    bg: "rgba(240, 80, 50, 0.1)",
  },
  {
    name: "Figma",
    icon: FaFigma,
    color: "#F24E1E",
    bg: "rgba(242, 78, 30, 0.1)",
  },
  {
    name: "NPM",
    icon: FaNpm,
    color: "#CB3837",
    bg: "rgba(203, 56, 55, 0.1)",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 section-divider" />
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full bg-cyan-500/3 blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="section-label">Tech Stack</span>
          <h2
            className="mt-6 text-4xl sm:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            My{" "}
            <span className="gradient-text">Skills</span>
          </h2>
          <p className="mt-4 text-white/40 max-w-2xl mx-auto text-lg">
            Technologies and tools I use to bring ideas to life and build
            exceptional digital experiences.
          </p>
        </AnimatedSection>

        <StaggerContainer
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-5"
          staggerDelay={0.06}
        >
          {SKILLS.map((skill) => (
            <StaggerItem key={skill.name}>
              <TiltCard className="skill-badge" intensity={12}>
                <div
                  className="icon-wrapper"
                  style={{ background: skill.bg }}
                >
                  <skill.icon style={{ color: skill.color }} />
                </div>
                <span className="text-sm font-medium text-white/70">
                  {skill.name}
                </span>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
