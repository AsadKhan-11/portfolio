"use client";

import { motion } from "framer-motion";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
  TiltCard,
} from "./animations";
import { FiExternalLink, FiGithub, FiFolder } from "react-icons/fi";

const PROJECTS = [
  {
    title: "Estate Agency",
    description:
      "A modern real estate platform with property listings, search filters, and responsive design.",
    tags: ["React", "Node.js", "MongoDB"],
    gradient: "from-indigo-600 via-indigo-500 to-blue-600",
    accentColor: "#818cf8",
  },
  {
    title: "Nexa",
    description:
      "A sleek business landing page with modern UI components and smooth animations.",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    gradient: "from-cyan-600 via-teal-500 to-emerald-600",
    accentColor: "#22d3ee",
  },
  {
    title: "Wander",
    description:
      "A travel exploration app with interactive maps and destination discovery features.",
    tags: ["React", "API Integration", "CSS3"],
    gradient: "from-violet-600 via-purple-500 to-fuchsia-600",
    accentColor: "#a78bfa",
  },
  {
    title: "E-Commerce Store",
    description:
      "A full-featured online store with cart functionality, payment integration, and admin panel.",
    tags: ["MERN Stack", "Stripe", "Redux"],
    gradient: "from-rose-600 via-pink-500 to-orange-500",
    accentColor: "#fb7185",
  },
  {
    title: "Portfolio Website",
    description:
      "A creative portfolio showcasing projects with 3D animations and interactive elements.",
    tags: ["Next.js", "Three.js", "Tailwind"],
    gradient: "from-amber-500 via-orange-500 to-red-500",
    accentColor: "#fbbf24",
  },
  {
    title: "Dashboard App",
    description:
      "An analytics dashboard with real-time data visualization and responsive charts.",
    tags: ["React", "Chart.js", "Node.js"],
    gradient: "from-emerald-500 via-green-500 to-teal-500",
    accentColor: "#34d399",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      style={{
        position: "relative",
        paddingTop: "10rem",
        paddingBottom: "10rem",
        overflow: "hidden",
      }}
    >
      <div className="absolute top-0 left-0 right-0 section-divider" />
      <div className="absolute inset-0 mesh-gradient pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-violet-500/3 blur-[150px] pointer-events-none" />

      <div className="section-wrapper" style={{ position: "relative", zIndex: 10 }}>
        <AnimatedSection style={{ textAlign: "center", marginBottom: "5rem" }}>
          <span className="section-label">
            <FiFolder className="text-sm" />
            Portfolio
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
            Featured{" "}
            <span className="gradient-text">Projects</span>
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
            A collection of projects that showcase my skills in building modern,
            responsive, and user-friendly web applications.
          </p>
        </AnimatedSection>

        <StaggerContainer
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "2rem",
          }}
          staggerDelay={0.1}
        >
          {PROJECTS.map((project) => (
            <StaggerItem key={project.title}>
              <TiltCard intensity={8}>
                <div
                  className="glass-card group cursor-pointer"
                  style={{
                    overflow: "hidden",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Colored placeholder */}
                  <div
                    className={`relative aspect-[16/10] bg-gradient-to-br ${project.gradient} overflow-hidden`}
                  >
                    {/* Grid pattern overlay */}
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                        backgroundSize: "30px 30px",
                      }}
                    />

                    {/* Center icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <FiFolder className="text-white text-2xl" />
                      </motion.div>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                      <motion.a
                        href="#"
                        className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 hover:bg-white/25"
                        whileHover={{ scale: 1.1 }}
                        aria-label={`View ${project.title} live`}
                      >
                        <FiExternalLink size={16} />
                      </motion.a>
                      <motion.a
                        href="#"
                        className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 hover:bg-white/25"
                        whileHover={{ scale: 1.1 }}
                        aria-label={`View ${project.title} code`}
                      >
                        <FiGithub size={16} />
                      </motion.a>
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    style={{
                      padding: "clamp(1.5rem, 3vw, 2.25rem)",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.15rem",
                        fontWeight: 700,
                        color: "#fff",
                      }}
                    >
                      {project.title}
                    </h3>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.45)",
                        fontSize: "0.9rem",
                        marginTop: "0.85rem",
                        lineHeight: 1.7,
                        flex: 1,
                      }}
                    >
                      {project.description}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.6rem",
                        marginTop: "1.25rem",
                      }}
                    >
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            padding: "5px 12px",
                            borderRadius: 9999,
                            color: project.accentColor,
                            background: `${project.accentColor}12`,
                            border: `1px solid ${project.accentColor}25`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
