"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiCheck, FiX } from "react-icons/fi";
import { Magnetic } from "./animations";
import Select from "./Select";
import { CASE_STUDIES } from "@/lib/caseStudies";
import { BUDGETS, EMAIL_RE, MESSAGE_MAX, MESSAGE_MIN, PROJECT_TYPES } from "@/lib/contactFields";

const EMAIL = "mrasad10khan@gmail.com";

/*
  Where an enquiry is posted. A production build posts to the site's own
  /api/contact (functions/api/contact.ts), which emails it through Resend,
  so there is nothing to set. `next dev` has no such route, so there the
  form falls back to opening the visitor's mail client.

  NEXT_PUBLIC_FORM_ENDPOINT overrides either way: a URL to post somewhere
  else, or an empty string to force the mail-client fallback.
*/
const ENDPOINT =
  process.env.NEXT_PUBLIC_FORM_ENDPOINT ??
  (process.env.NODE_ENV === "production" ? "/api/contact" : undefined);

type Fields = {
  name: string;
  email: string;
  phone: string;
  budget: string;
  message: string;
};

const EMPTY: Fields = { name: "", email: "", phone: "", budget: "", message: "" };

/*
  Every CTA on a case study carries ?ref=<slug>. The query string is an
  external source, so it is read through useSyncExternalStore rather than
  an effect: the server snapshot is null, hydration matches, and there is
  no cascading render. Nothing can change the query without a navigation
  that remounts this form, so the subscription is a no-op.
*/
const subscribeToUrl = () => () => {};
const readRef = () => new URLSearchParams(window.location.search).get("ref");
const noRefOnServer = () => null;

function validate(f: Fields): Partial<Record<keyof Fields, string>> {
  const e: Partial<Record<keyof Fields, string>> = {};
  if (!f.name.trim()) e.name = "Please add your name";
  if (!f.email.trim()) e.email = "Please add an email so I can reply";
  else if (!EMAIL_RE.test(f.email.trim())) e.email = "Check this email, it looks incomplete";
  if (!f.message.trim()) e.message = "Tell me a little about the project";
  else if (f.message.trim().length < MESSAGE_MIN)
    e.message = `A bit more detail helps, ${MESSAGE_MIN} characters minimum`;
  return e;
}

export default function ContactForm() {
  const [f, setF] = useState<Fields>(EMPTY);
  const [types, setTypes] = useState<string[]>([]);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [honey, setHoney] = useState("");
  const [refDropped, setRefDropped] = useState(false);

  /*
    Where the enquiry came from. Carrying it does two jobs: the visitor
    sees their context was kept, and the enquiry lands saying which piece
    of work sold it — otherwise a lead off eighteen screens of Aurelle is
    indistinguishable from a cold one.

    Not useSearchParams: the home page is statically prerendered, and that
    hook would push it behind a Suspense boundary for what is only ever a
    prefill.
  */
  const refSlug = useSyncExternalStore(subscribeToUrl, readRef, noRefOnServer);
  const source = useMemo(() => {
    if (refDropped || !refSlug) return null;
    const study = CASE_STUDIES.find((c) => c.slug === refSlug);
    return study ? { slug: study.slug, title: study.title } : null;
  }, [refSlug, refDropped]);

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

  /* Named once so the inbox subject line and the service payload agree. */
  const subject = source
    ? `Project enquiry (via ${source.title}): ${f.name.trim() || "Website"}`
    : `Project enquiry: ${f.name.trim() || "Website"}`;

  const mailto = useMemo(() => {
    const body = [
      `Name: ${f.name.trim()}`,
      `Email: ${f.email.trim()}`,
      f.phone ? `Phone: ${f.phone.trim()}` : null,
      types.length ? `Project type: ${types.join(", ")}` : null,
      f.budget ? `Budget: ${f.budget}` : null,
      source ? `Came from: ${source.title} case study (/work/${source.slug})` : null,
      "",
      f.message.trim(),
    ]
      .filter((l) => l !== null)
      .join("\n");
    return `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }, [f, types, source, subject]);

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

    if (ENDPOINT) {
      fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        /*
          Content only. The server builds the subject, sender and
          recipient itself, so nothing here can redirect the mail.
        */
        body: JSON.stringify({
          name: f.name.trim(),
          email: f.email.trim(),
          phone: f.phone.trim(),
          budget: f.budget,
          project_types: types,
          /* Which case study produced the lead, if any. */
          came_from: source ? `${source.title} (/work/${source.slug})` : "Direct",
          message: f.message.trim(),
        }),
      })
        .then(async (res) => {
          const body = await res.json().catch(() => ({}));
          /*
            Only an explicit success counts. A static host answers an
            unknown path with a 200 HTML page, and "no failure reported"
            would then show Message sent for an enquiry nobody received.
          */
          setStatus(res.ok && body.success === true ? "sent" : "error");
        })
        .catch(() => setStatus("error"));
      return;
    }

    /* No form service configured: hand the enquiry to the visitor's mail
       client fully composed, rather than silently dropping it. */
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
        <h3 className="form-sent-title">
          {ENDPOINT ? "Message sent" : "Your mail client is open"}
        </h3>
        <p className="form-sent-copy">
          {ENDPOINT
            ? "Thanks, I have it. I reply within a day. If it is urgent, email me directly at"
            : "Everything is filled in. Just hit send. If nothing opened, email me directly at"}{" "}
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
      {/*
        Shown, not silent. The visitor can see the context came with them,
        and can drop it if they landed here about something else — a hidden
        field that quietly tags the enquiry would be the wrong trade.
      */}
      {source && (
        <motion.p
          className="form-source"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <span>
            About something like <strong>{source.title}</strong>
          </span>
          <button
            type="button"
            onClick={() => setRefDropped(true)}
            aria-label={`Remove the ${source.title} reference from this enquiry`}
          >
            <FiX size={13} />
          </button>
        </motion.p>
      )}

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
            <span>{status === "sending" ? (ENDPOINT ? "Sending…" : "Opening mail…") : "Send message"}</span>
            <FiArrowUpRight />
          </button>
        </Magnetic>
        <p className="form-note" role={status === "error" ? "alert" : undefined}>
          {status === "error" ? (
            <>
              That did not go through. Please email me directly at{" "}
              <a href={`mailto:${EMAIL}`} className="link-sweep" style={{ color: "var(--bone)" }}>
                {EMAIL}
              </a>
              .
            </>
          ) : (
            "Your details go straight to my inbox. Never shared, never added to a mailing list."
          )}
        </p>
      </div>
    </form>
  );
}
