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
    <section id="contact" className="relative py-32 sm:py-40 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 section-divider" />
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full bg-indigo-500/3 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-cyan-500/3 blur-[120px] pointer-events-none" />

      <div className="section-wrapper relative z-10">
        <AnimatedSection className="text-center mb-20">
          <span className="section-label">
            <FiMail className="text-sm" />
            Contact
          </span>
          <h2
            className="mt-6 text-4xl sm:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Get In{" "}
            <span className="gradient-text">Touch</span>
          </h2>
          <p className="mt-5 text-white/40 max-w-2xl mx-auto text-lg leading-relaxed">
            Have a project in mind or want to discuss an opportunity? I&apos;d
            love to hear from you. Let&apos;s build something great together.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Contact Info */}
          <AnimatedSection className="lg:col-span-2" direction="left" delay={0.2}>
            <div className="space-y-5">
              {CONTACT_INFO.map((info) => (
                <TiltCard key={info.label} intensity={6}>
                  <div className="glass-card p-6 flex items-center gap-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: `${info.color}12`,
                      }}
                    >
                      <info.icon size={20} style={{ color: info.color }} />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-wider font-medium">
                        {info.label}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-sm text-white/70 hover:text-white transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-sm text-white/70">{info.value}</p>
                      )}
                    </div>
                  </div>
                </TiltCard>
              ))}

              {/* Social links */}
              <div className="pt-4">
                <p className="text-xs text-white/30 uppercase tracking-wider font-medium mb-4">
                  Follow Me
                </p>
                <div className="flex gap-3">
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
          <AnimatedSection className="lg:col-span-3" direction="right" delay={0.3}>
            <form
              onSubmit={handleSubmit}
              className="glass-card p-7 sm:p-10 space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-xs text-white/40 uppercase tracking-wider font-medium mb-2"
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
                    className="block text-xs text-white/40 uppercase tracking-wider font-medium mb-2"
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

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs text-white/40 uppercase tracking-wider font-medium mb-2"
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
                    className="block text-xs text-white/40 uppercase tracking-wider font-medium mb-2"
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

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs text-white/40 uppercase tracking-wider font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  className="form-input resize-none"
                  rows={5}
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="btn-primary w-full justify-center !py-3.5"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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
