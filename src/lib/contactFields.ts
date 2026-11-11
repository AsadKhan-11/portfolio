/*
  What the contact form offers and what the server accepts, in one place.

  The form renders these lists and src/lib/contactMail.ts validates
  against them. They have to be the same lists: a choice added to the form
  but not to the server would be rejected for every visitor who picked it,
  and nothing on the form would say why.
*/

export const PROJECT_TYPES: string[] = [
  "AI integration",
  "Chatbot",
  "CRM / automation",
  "Web app",
  "E-commerce",
  "Design",
];

export const BUDGETS: string[] = [
  "Under $1,000",
  "$1,000 – $3,000",
  "$3,000 – $7,000",
  "$7,000+",
  "Not sure yet",
];

/*
  The studio's inbox: shown on the site, and where the contact form delivers.
  Defined here rather than in site.ts because the Worker has to import it,
  and site.ts reads process.env, which does not exist there. site.ts
  re-exports it, so the pages still import it from there.

  A Hostinger mailbox cannot be renamed, only deleted and recreated, so this
  is the single place to change if the address ever moves.
*/
export const CONTACT_EMAIL = "asad@webforgedigital.dev";

export const MESSAGE_MIN = 20;
export const MESSAGE_MAX = 1000;

/*
  Permissive on purpose, just enough to catch a genuine typo, with one
  exception: no commas, semicolons, angle brackets, parentheses or quotes.
  The address is used as the Reply-To of the notification, and those are the
  characters that would let one field name several recipients.
*/
export const EMAIL_RE = /^[^\s@,;<>()"]+@[^\s@,;<>()"]+\.[^\s@,;<>()"]{2,}$/;

/*
  Cloudflare Turnstile, the bot check on the form. The site key is public
  by design (it ships in the page), so it lives here; the secret key is a
  Worker secret. Leave this empty and the form shows no check; the Worker
  asks for one only once TURNSTILE_SECRET is set, so set the secret after
  this key has been deployed.
*/
export const TURNSTILE_SITE_KEY = "0x4AAAAAAF87NQuwftkO2VeM";
