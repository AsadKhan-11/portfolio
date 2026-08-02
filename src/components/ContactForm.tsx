"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUpRight, FiCheck, FiChevronDown } from "react-icons/fi";
import { Magnetic } from "./animations";

const EMAIL = "masad0108khan@gmail.com";

const PROJECT_TYPES = [
  "Web app",
  "Landing page",
  "E-commerce",
  "Dashboard",
  "API / backend",
  "Redesign",
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
  budget: string;
  message: string;
};

const EMPTY: Fields = { name: "", email: "", budget: "", message: "" };

/* Deliberately permissive — just enough to catch a genuine typo. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(f: Fields): Partial<Record<keyof Fields, string>> {
  const e: Partial<Record<keyof Fields, string>> = {};
  if (!f.name.trim()) e.name = "Please tell me your name";
  if (!f.email.trim()) e.email = "An email address is required";
  else if (!EMAIL_RE.test(f.email.trim())) e.email = "That doesn't look like a valid email";
  if (!f.message.trim()) e.message = "A short description helps me reply properly";
  else if (f.message.trim().length < 20)
    e.message = "A little more detail, please — 20 characters minimum";
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
    // Clear an error as soon as the field becomes valid again
    if (errors[k]) {
      setErrors(validate({ ...f, [k]: v }));
    }
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
    const subject = `Project enquiry — ${f.name.trim() || "Website"}`;
    const body = [
      `Name: ${f.name.trim()}`,
      `Email: ${f.email.trim()}`,
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
    if (honey) return; // bot filled the hidden field

    const next = validate(f);
    setErrors(next);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(next).length) {
      // Move focus to the first problem so keyboard users aren't stranded
      const first = document.getElementById(`f-${Object.keys(next)[0]}`);
      first?.focus();
      return;
    }

    setStatus("sending");
    /*
      No backend on this site yet, so the enquiry is handed to the
      visitor's mail client fully composed rather than being silently
      dropped. Swap this for a POST to an API route when one exists.
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

  return (
    <AnimatePresence mode="wait">
      {status === "sent" ? (
        <motion.div
          key="sent"
          className="form-sent"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "var(--flame)",
              color: "var(--ink)",
              display: "grid",
              placeItems: "center",
            }}
          >
            <FiCheck size={20} />
          </span>
          <h3
            style={{
              marginTop: "1.25rem",
              fontFamily: "var(--f-display)",
              fontWeight: 800,
              fontSize: "1.35rem",
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
            }}
          >
            Your mail client is open
          </h3>
          <p
            style={{
              marginTop: "0.75rem",
              fontSize: "0.95rem",
              lineHeight: 1.75,
              color: "var(--bone-70)",
            }}
          >
            Everything is pre-filled — just hit send. If nothing opened, email
            me directly at{" "}
            <a href={`mailto:${EMAIL}`} className="link-sweep" style={{ color: "var(--bone)" }}>
              {EMAIL}
            </a>
            .
          </p>
          <button
            type="button"
            onClick={reset}
            className="btn"
            style={{ marginTop: "1.75rem" }}
          >
            <span>Write another</span>
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          noValidate
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* Honeypot — hidden from people, tempting to bots */}
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
              <label htmlFor="f-name">Your name</label>
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
              <label htmlFor="f-email">Email address</label>
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
          </div>

          {/* Project type */}
          <fieldset style={{ border: 0, marginTop: "2.25rem" }}>
            <legend className="mono-label" style={{ marginBottom: "0.9rem" }}>
              What do you need? <span style={{ opacity: 0.5 }}>(optional)</span>
            </legend>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.55rem" }}>
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

          {/* Budget */}
          <div className="field" data-filled={!!f.budget} style={{ marginTop: "2.25rem" }}>
            <label htmlFor="f-budget">Budget range (optional)</label>
            <select
              id="f-budget"
              name="budget"
              value={f.budget}
              onChange={(e) => set("budget")(e.target.value)}
            >
              <option value="" />
              {BUDGETS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <FiChevronDown className="field-caret" size={16} />
          </div>

          {/* Message */}
          <div
            className="field"
            data-filled={!!f.message}
            data-invalid={!!showErr("message")}
            style={{ marginTop: "2.25rem" }}
          >
            <label htmlFor="f-message">Tell me about the project</label>
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

          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1.25rem",
              marginTop: "2.5rem",
            }}
          >
            <Magnetic strength={0.25}>
              <button
                type="submit"
                className="btn btn-solid"
                disabled={status === "sending"}
              >
                <span>{status === "sending" ? "Opening mail…" : "Send message"}</span>
                <FiArrowUpRight />
              </button>
            </Magnetic>
            <p className="mono-label" style={{ letterSpacing: "0.12em" }}>
              Replies within a day
            </p>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
