"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedSection, TiltCard } from "./animations";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiGithub,
  FiLinkedin,
  FiInstagram,
  FiFacebook,
} from "react-icons/fi";

const CONTACT_INFO = [
  {
    icon: FiMapPin,
    label: "Location",
    value: "Lahore, Pakistan",
    color: "#818cf8",
  },
  {
    icon: FiPhone,
    label: "Phone",
    value: "+92 290 4388534",
    color: "#22d3ee",
  },
  {
    icon: FiMail,
    label: "Email",
    value: "masad0108khan@gmail.com",
    href: "mailto:masad0108khan@gmail.com",
    color: "#fb7185",
  },
];

const SOCIALS = [
  { icon: FiGithub, href: "https://github.com/AsadKhan-11", label: "GitHub" },
  { icon: FiLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  {
    icon: FiInstagram,
    href: "https://instagram.com",
    label: "Instagram",
  },
  { icon: FiFacebook, href: "https://facebook.com", label: "Facebook" },
];

export default function Contact() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    alert("Thank you for your message! I'll get back to you soon.");
    setFormState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <section
      id="contact"
      style={{
        position: "relative",
        paddingTop: "10rem",
        paddingBottom: "10rem",
        overflow: "hidden",
      }}
    >
      <div className="absolute top-0 left-0 right-0 section-divider" />
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full bg-indigo-500/3 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-cyan-500/3 blur-[120px] pointer-events-none" />

      <div className="section-wrapper" style={{ position: "relative", zIndex: 10 }}>
        <AnimatedSection style={{ textAlign: "center", marginBottom: "5rem" }}>
          <span className="section-label">
            <FiMail className="text-sm" />
            Contact
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
            Get In{" "}
            <span className="gradient-text">Touch</span>
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
            Have a project in mind or want to discuss an opportunity? I&apos;d
            love to hear from you. Let&apos;s build something great together.
          </p>
        </AnimatedSection>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3rem",
          }}
          className="contact-grid"
        >
          {/* Contact Info */}
          <AnimatedSection direction="left" delay={0.2}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {CONTACT_INFO.map((info) => (
                <TiltCard key={info.label} intensity={6}>
                  <div
                    className="glass-card"
                    style={{
                      padding: "1.75rem 2rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "1.5rem",
                    }}
                  >
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 14,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        background: `${info.color}12`,
                      }}
                    >
                      <info.icon size={22} style={{ color: info.color }} />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "0.7rem",
                          color: "rgba(255,255,255,0.4)",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          fontWeight: 600,
                          marginBottom: 8,
                        }}
                      >
                        {info.label}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          style={{
                            fontSize: "0.95rem",
                            color: "rgba(255,255,255,0.7)",
                            textDecoration: "none",
                          }}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.7)" }}>
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                </TiltCard>
              ))}

              {/* Social links */}
              <div style={{ paddingTop: "1.5rem" }}>
                <p
                  style={{
                    fontSize: "0.7rem",
                    color: "rgba(255,255,255,0.3)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    fontWeight: 600,
                    marginBottom: "1.25rem",
                  }}
                >
                  Follow Me
                </p>
                <div style={{ display: "flex", gap: "1rem" }}>
                  {SOCIALS.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon"
                      whileHover={{ y: -4 }}
                      aria-label={social.label}
                    >
                      <social.icon />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection direction="right" delay={0.3}>
            <form
              onSubmit={handleSubmit}
              className="glass-card"
              style={{ padding: "clamp(2rem, 4vw, 3rem)" }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div>
                  <label
                    htmlFor="firstName"
                    style={{
                      display: "block",
                      fontSize: "0.7rem",
                      color: "rgba(255,255,255,0.4)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      fontWeight: 600,
                      marginBottom: 12,
                    }}
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formState.firstName}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    style={{
                      display: "block",
                      fontSize: "0.7rem",
                      color: "rgba(255,255,255,0.4)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      fontWeight: 600,
                      marginBottom: 12,
                    }}
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formState.lastName}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div>
                  <label
                    htmlFor="email"
                    style={{
                      display: "block",
                      fontSize: "0.7rem",
                      color: "rgba(255,255,255,0.4)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      fontWeight: 600,
                      marginBottom: 12,
                    }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    style={{
                      display: "block",
                      fontSize: "0.7rem",
                      color: "rgba(255,255,255,0.4)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      fontWeight: 600,
                      marginBottom: 12,
                    }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="+92 300 1234567"
                  />
                </div>
              </div>

              <div style={{ marginBottom: "1.75rem" }}>
                <label
                  htmlFor="message"
                  style={{
                    display: "block",
                    fontSize: "0.7rem",
                    color: "rgba(255,255,255,0.4)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    fontWeight: 600,
                    marginBottom: 12,
                  }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  className="form-input"
                  rows={5}
                  placeholder="Tell me about your project..."
                  required
                  style={{ resize: "none" }}
                />
              </div>

              <motion.button
                type="submit"
                className="btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "16px 32px",
                }}
              >
                <FiSend />
                Send Message
              </motion.button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
