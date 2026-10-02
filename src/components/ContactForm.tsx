"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";
import { Magnetic } from "./animations";
import Select from "./Select";

const EMAIL = "mrasad10khan@gmail.com";

const PROJECT_TYPES = [
  "AI integration",
  "Chatbot",
  "CRM / automation",
  "Web app",
  "E-commerce",
  "Design",
];

const BUDGETS = [
  "Under $1,000",
  "$1,000 – $3,000",
  "$3,000 – $7,000",
  "$7,000+",
  "Not sure yet",
];

const MESSAGE_MAX = 1000;

type Fields = {
  name: string;
  email: string;
  phone: string;
  budget: string;
  message: string;
};

const EMPTY: Fields = { name: "", email: "", phone: "", budget: "", message: "" };

/* Deliberately permissive — just enough to catch a genuine typo. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(f: Fields): Partial<Record<keyof Fields, string>> {
  const e: Partial<Record<keyof Fields, string>> = {};
  if (!f.name.trim()) e.name = "Please add your name";
  if (!f.email.trim()) e.email = "Please add an email so I can reply";
  else if (!EMAIL_RE.test(f.email.trim())) e.email = "Check this email, it looks incomplete";
  if (!f.message.trim()) e.message = "Tell me a little about the project";
  else if (f.message.trim().length < 20)
    e.message = "A bit more detail helps, 20 characters minimum";
  return e;
}

export default function ContactForm() {
  const [f, setF] = useState<Fields>(EMPTY);
  const [types, setTypes] = useState<string[]>([]);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [honey, setHoney] = useState("");

  const set = (k: keyof Fields) => (v: string) => {
    setF((prev) => ({ ...prev, [k]: v }));
    // Clear the error the moment the field becomes valid again
    if (errors[k]) setErrors(validate({ ...f, [k]: v }));
  };

  const blur = (k: keyof Fields) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(f));
  };

  const toggleType = (t: string) =>
    setTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );

  const remaining = MESSAGE_MAX - f.message.length;
  const showErr = (k: keyof Fields) => (touched[k] ? errors[k] : undefined);

  const mailto = useMemo(() => {
    const subject = `Project enquiry: ${f.name.trim() || "Website"}`;
    const body = [
      `Name: ${f.name.trim()}`,
      `Email: ${f.email.trim()}`,
      f.phone ? `Phone: ${f.phone.trim()}` : null,
      types.length ? `Project type: ${types.join(", ")}` : null,
      f.budget ? `Budget: ${f.budget}` : null,
      "",
      f.message.trim(),
    ]
      .filter((l) => l !== null)
      .join("\n");
    return `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }, [f, types]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honey) return; // a bot filled the hidden field

    const next = validate(f);
    setErrors(next);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(next).length) {
      // Send focus to the first problem so keyboard users aren't stranded
      document.getElementById(`f-${Object.keys(next)[0]}`)?.focus();
      return;
    }

    setStatus("sending");
    /*
      No backend on this site yet, so the enquiry is handed to the visitor's
      mail client fully composed rather than being silently dropped. Swap
      for a POST to an API route once one exists.
    */
    window.location.href = mailto;
    window.setTimeout(() => setStatus("sent"), 700);
  };

  const reset = () => {
    setF(EMPTY);
    setTypes([]);
    setErrors({});
    setTouched({});
    setStatus("idle");
  };

  if (status === "sent") {
    return (
      <motion.div
        className="form-sent"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="form-sent-badge">
          <FiCheck size={20} />
        </span>
        <h3 className="form-sent-title">Your mail client is open</h3>
        <p className="form-sent-copy">
          Everything is filled in. Just hit send. If nothing opened, email me
          directly at{" "}
          <a href={`mailto:${EMAIL}`} className="link-sweep" style={{ color: "var(--bone)" }}>
            {EMAIL}
          </a>
          .
        </p>
        <button type="button" onClick={reset} className="btn" style={{ marginTop: "1.75rem" }}>
          <span>Write another</span>
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Honeypot — invisible to people, tempting to bots */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={honey}
        onChange={(e) => setHoney(e.target.value)}
        style={{ position: "absolute", left: "-9999px", opacity: 0 }}
      />

      <div className="form-grid form-grid-2">
        <div className="field" data-filled={!!f.name} data-invalid={!!showErr("name")}>
          <label htmlFor="f-name">
            Full name <span className="req">*</span>
          </label>
          <input
            id="f-name"
            name="name"
            autoComplete="name"
            value={f.name}
            onChange={(e) => set("name")(e.target.value)}
            onBlur={blur("name")}
            aria-invalid={!!showErr("name")}
            aria-describedby={showErr("name") ? "e-name" : undefined}
          />
          {showErr("name") && (
            <span className="field-error" id="e-name">
              {showErr("name")}
            </span>
          )}
        </div>

        <div className="field" data-filled={!!f.email} data-invalid={!!showErr("email")}>
          <label htmlFor="f-email">
            Email address <span className="req">*</span>
          </label>
          <input
            id="f-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={f.email}
            onChange={(e) => set("email")(e.target.value)}
            onBlur={blur("email")}
            aria-invalid={!!showErr("email")}
            aria-describedby={showErr("email") ? "e-email" : undefined}
          />
          {showErr("email") && (
            <span className="field-error" id="e-email">
              {showErr("email")}
            </span>
          )}
        </div>

        <div className="field" data-filled={!!f.phone}>
          <label htmlFor="f-phone">Phone number</label>
          <input
            id="f-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={f.phone}
            onChange={(e) => set("phone")(e.target.value)}
          />
        </div>

        <Select
          id="f-budget"
          label="Budget range"
          value={f.budget}
          onChange={set("budget")}
          options={BUDGETS}
        />
      </div>

      {/* Project type */}
      <fieldset className="form-fieldset">
        <legend className="mono-label">
          What do you need? <span style={{ opacity: 0.55 }}>(optional)</span>
        </legend>
        <div className="chip-row">
          {PROJECT_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              className="chip"
              aria-pressed={types.includes(t)}
              onClick={() => toggleType(t)}
            >
              {types.includes(t) && <FiCheck size={12} />}
              {t}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Message */}
      <div
        className="field"
        data-filled={!!f.message}
        data-invalid={!!showErr("message")}
        style={{ marginTop: "1.75rem" }}
      >
        <label htmlFor="f-message">
          Your message <span className="req">*</span>
        </label>
        <span className="field-counter" aria-hidden="true">
          {remaining}
        </span>
        <textarea
          id="f-message"
          name="message"
          rows={4}
          maxLength={MESSAGE_MAX}
          value={f.message}
          onChange={(e) => set("message")(e.target.value)}
          onBlur={blur("message")}
          aria-invalid={!!showErr("message")}
          aria-describedby={showErr("message") ? "e-message" : undefined}
        />
        {showErr("message") && (
          <span className="field-error" id="e-message">
            {showErr("message")}
          </span>
        )}
      </div>

      <div className="form-footer">
        <Magnetic strength={0.25}>
          <button type="submit" className="btn btn-solid" disabled={status === "sending"}>
            <span>{status === "sending" ? "Opening mail…" : "Send message"}</span>
            <FiArrowUpRight />
          </button>
        </Magnetic>
        <p className="form-note">
          Your details go straight to my inbox. Never shared, never added to a
          mailing list.
        </p>
      </div>
    </form>
  );
}
