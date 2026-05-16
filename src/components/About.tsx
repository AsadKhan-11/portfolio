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
    <section id="about" className="relative py-28 sm:py-36 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-0 right-0 section-divider" />
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full bg-indigo-500/3 blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <AnimatedSection className="text-center mb-16">
          <span className="section-label">About Me</span>
          <h2
            className="mt-6 text-4xl sm:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Who{" "}
            <span className="gradient-text">Am I</span>?
          </h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Bio text */}
          <AnimatedSection className="lg:col-span-3" delay={0.2}>
            <div className="glass-card p-8 sm:p-10">
              <p className="text-lg leading-relaxed text-white/70">
                Hello! I&apos;m{" "}
                <span className="text-white font-semibold">Asad Khan</span>, a
                full stack web developer based in{" "}
                <span className="text-indigo-400 font-medium">
                  Lahore, Pakistan
                </span>
                . With a passion for building complete web solutions, I
                specialize in developing user-friendly and efficient digital
                experiences from front-end to back-end.
              </p>
              <p className="mt-5 text-lg leading-relaxed text-white/70">
                I&apos;m dedicated to delivering high-quality, scalable web
                development services. As a freelance developer, I tailor
                personalized solutions to your needs. My expertise spans across{" "}
                <span className="text-cyan-400 font-medium">
                  React, Next.js, Node.js, Express, and MongoDB
                </span>
                , ensuring your project is in capable hands from start to
                finish.
              </p>
              <p className="mt-5 text-lg leading-relaxed text-white/70">
                I turn design ideas into user-friendly interfaces and connect
                them with powerful back-end functionality, ensuring everything
                works smoothly across all devices. With attention to detail and a
                passion for modern web trends, I strive to build solutions that
                not only look great but perform flawlessly.
              </p>
            </div>
          </AnimatedSection>

          {/* Stats Grid */}
          <div className="lg:col-span-2">
            <StaggerContainer
              className="grid grid-cols-2 gap-4"
              staggerDelay={0.15}
            >
              {STATS.map((stat) => (
                <StaggerItem key={stat.label}>
                  <TiltCard className="stat-card h-full" intensity={10}>
                    <span className="text-2xl mb-2 block">{stat.icon}</span>
                    <span
                      className="text-3xl sm:text-4xl font-bold gradient-text block"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      <AnimatedCounter
                        target={stat.value}
                        suffix={stat.suffix}
                      />
                    </span>
                    <span className="text-sm text-white/40 mt-2 block">
                      {stat.label}
                    </span>
                  </TiltCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
