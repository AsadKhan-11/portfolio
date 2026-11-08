/*
  Turns a contact-form POST into an email, through Resend.

  Only web-standard Request, Response and fetch are used, so the same
  function runs as a Cloudflare Pages Function today (functions/api/
  contact.ts) and would sit behind a Next route handler unchanged if the
  site ever moved to Vercel.

  The API key lives only in the server environment. Putting it in the
  browser, NEXT_PUBLIC_ or otherwise, would let anyone send mail as you.

  Decisions worth knowing:
  - The subject, the sender and the recipient are built here, never taken
    from the request. Whatever the browser sends is only ever the content
    of the enquiry.
  - The visitor is NOT sent an automatic reply. That would turn the form
    into a way to make your domain email anyone's address, which is how
    contact forms get their senders blocklisted.
  - Reply-To is the visitor's address, so answering from your inbox goes
    straight to them while the mail itself is sent from your own domain.
  - Upstream error text is logged, not returned; the browser only learns
    that sending failed.
*/
import { BUDGETS, EMAIL_RE, MESSAGE_MAX, MESSAGE_MIN, PROJECT_TYPES } from "./contactFields";

export interface ContactEnv {
  /** Secret. Resend dashboard, API Keys. */
  RESEND_API_KEY?: string;
  /** Where enquiries land. Comma-separate to send to more than one inbox. */
  CONTACT_TO?: string;
  /** A sender on a domain verified in Resend, e.g. "WebForge Digital <forms@webforgedigital.dev>". */
  CONTACT_FROM?: string;
}

const RESEND_URL = "https://api.resend.com/emails";

/* The largest legitimate payload is under 2 KB; this is generous. */
const MAX_BODY_CHARS = 8 * 1024;

const SEND_TIMEOUT_MS = 8_000;

type FieldName = "name" | "email" | "phone" | "budget" | "project_types" | "message";

interface Enquiry {
  name: string;
  email: string;
  phone: string;
  budget: string;
  projectTypes: string[];
  cameFrom: string;
  message: string;
}

const json = (body: Record<string, unknown>, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...headers },
  });

const str = (v: unknown) => (typeof v === "string" ? v : "");

/* Single-line text: control characters and runs of whitespace become one space. */
const oneLine = (s: string) =>
  Array.from(s, (c) => {
    const code = c.charCodeAt(0);
    return code < 32 || code === 127 ? " " : c;
  })
    .join("")
    .replace(/\s+/g, " ")
    .trim();

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

type Parsed = { ok: true; value: Enquiry } | { ok: false; fields: Partial<Record<FieldName, string>> };

/* The same rules the form applies, enforced again: the browser is not trusted. */
function parse(data: unknown): Parsed {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return { ok: false, fields: { message: "expected a JSON object" } };
  }
  const d = data as Record<string, unknown>;
  const fields: Partial<Record<FieldName, string>> = {};

  const name = oneLine(str(d.name));
  const email = str(d.email).trim();
  const phone = oneLine(str(d.phone));
  const budget = str(d.budget).trim();
  const message = str(d.message).replace(/\r\n?/g, "\n").trim();
  const cameFrom = oneLine(str(d.came_from)).slice(0, 120);
  const projectTypes = Array.isArray(d.project_types)
    ? d.project_types.filter((t): t is string => typeof t === "string")
    : [];

  if (!name) fields.name = "required";
  else if (name.length > 100) fields.name = "too long";

  if (!EMAIL_RE.test(email) || email.length > 254) fields.email = "invalid";

  if (phone.length > 40) fields.phone = "too long";

  if (budget && !BUDGETS.includes(budget)) fields.budget = "not an option";

  if (projectTypes.length > PROJECT_TYPES.length || projectTypes.some((t) => !PROJECT_TYPES.includes(t))) {
    fields.project_types = "not an option";
  }

  if (message.length < MESSAGE_MIN) fields.message = "too short";
  else if (message.length > MESSAGE_MAX) fields.message = "too long";

  if (Object.keys(fields).length) return { ok: false, fields };
  return { ok: true, value: { name, email, phone, budget, projectTypes, cameFrom, message } };
}

function render(e: Enquiry) {
  /* "Aurelle (/work/aurelle)" reads as "Aurelle" in a subject line. */
  const via = e.cameFrom && e.cameFrom !== "Direct" ? e.cameFrom.replace(/\s*\(.*\)\s*$/, "") : "";
  const subject = `Project enquiry${via ? ` (via ${via})` : ""}: ${e.name}`;

  const rows: Array<[label: string, value: string]> = [
    ["Name", e.name],
    ["Email", e.email],
    ["Phone", e.phone],
    ["Budget", e.budget],
    ["Needs", e.projectTypes.join(", ")],
    ["Came from", e.cameFrom],
  ];
  const shown = rows.filter(([, v]) => v);
  const pad = Math.max(...shown.map(([k]) => k.length)) + 2;

  const text = [
    "New enquiry from the WebForge Digital site",
    "",
    ...shown.map(([k, v]) => `${`${k}:`.padEnd(pad)}${v}`),
    "",
    "Message:",
    e.message,
    "",
    `Reply to this email to answer ${e.name} directly.`,
  ].join("\n");

  const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:15px;line-height:1.55;color:#161616;max-width:560px">
<p style="margin:0 0 18px;color:#6b6b6b;font-size:13px">New enquiry from the WebForge Digital site</p>
<table role="presentation" style="border-collapse:collapse;margin:0 0 22px">
${shown
  .map(
    ([k, v]) =>
      `<tr><td style="padding:3px 18px 3px 0;color:#6b6b6b;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:3px 0">${
        k === "Email" ? `<a href="mailto:${esc(v)}" style="color:#d9441d">${esc(v)}</a>` : esc(v)
      }</td></tr>`
  )
  .join("\n")}
</table>
<p style="margin:0 0 6px;color:#6b6b6b;font-size:13px">Message</p>
<div style="white-space:pre-wrap;border-left:3px solid #ff5c35;padding:2px 0 2px 14px;margin:0 0 24px">${esc(e.message)}</div>
<p style="margin:0;color:#8a8a8a;font-size:12px">Reply to this email to answer ${esc(e.name)} directly.</p>
</div>`;

  return { subject, text, html };
}

export async function handleContact(request: Request, env: ContactEnv): Promise<Response> {
  if (request.method !== "POST") {
    return json({ success: false, error: "method_not_allowed" }, 405, { Allow: "POST" });
  }

  /*
    A browser always states where a POST came from. A request from any
    other site is refused; one with no Origin (curl, a script) cannot be
    told apart from you testing, so it is allowed through to validation.
  */
  const origin = request.headers.get("Origin");
  if (origin && origin !== new URL(request.url).origin) {
    return json({ success: false, error: "forbidden" }, 403);
  }

  if (Number(request.headers.get("Content-Length") ?? 0) > MAX_BODY_CHARS) {
    return json({ success: false, error: "too_large" }, 413);
  }
  const raw = await request.text();
  if (raw.length > MAX_BODY_CHARS) return json({ success: false, error: "too_large" }, 413);

  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return json({ success: false, error: "invalid_json" }, 400);
  }

  const parsed = parse(data);
  if (!parsed.ok) return json({ success: false, error: "invalid", fields: parsed.fields }, 400);

  const to = (env.CONTACT_TO ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (!env.RESEND_API_KEY || !env.CONTACT_FROM || to.length === 0) {
    console.error("contact: RESEND_API_KEY, CONTACT_FROM and CONTACT_TO must all be set");
    return json({ success: false, error: "not_configured" }, 500);
  }

  const { subject, text, html } = render(parsed.value);

  let res: Response;
  try {
    res = await fetch(RESEND_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM,
        to,
        reply_to: parsed.value.email,
        subject,
        text,
        html,
      }),
      signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
    });
  } catch (err) {
    console.error("contact: could not reach Resend:", err instanceof Error ? err.name : "unknown error");
    return json({ success: false, error: "send_failed" }, 502);
  }

  if (!res.ok) {
    const detail = (await res.text().catch(() => "")).slice(0, 300);
    console.error(`contact: Resend answered ${res.status}:`, detail);
    return json({ success: false, error: "send_failed" }, 502);
  }

  return json({ success: true });
}
