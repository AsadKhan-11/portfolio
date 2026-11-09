/*
  The public address of the site. Set NEXT_PUBLIC_SITE_URL when it moves;
  until then it points at the domain the studio is registering.
*/
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://webforgedigital.dev").replace(/\/$/, "");

/* Defined in contactFields.ts, which the Worker can import; see the note there. */
export { CONTACT_EMAIL } from "./contactFields";

export const SOCIALS = [
  "https://github.com/AsadKhan-11",
  "https://www.linkedin.com/in/asad-khan-011h/",
  "https://x.com/webforge_dev",
  "https://www.instagram.com/webforge.dev/",
];
