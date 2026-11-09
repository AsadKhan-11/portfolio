/*
  The public address of the site. Set NEXT_PUBLIC_SITE_URL when it moves;
  until then it points at the domain the studio is registering.
*/
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://webforgedigital.dev").replace(/\/$/, "");

/*
  The address shown on the site, and the one the contact form tells a visitor
  to write to when it cannot send. A Hostinger mailbox cannot be renamed,
  only deleted and recreated, so this is the single place to change if the
  address ever moves.
*/
export const CONTACT_EMAIL = "asad@webforgedigital.dev";

export const SOCIALS = [
  "https://github.com/AsadKhan-11",
  "https://www.linkedin.com/in/asad-khan-011h/",
  "https://x.com/webforge_dev",
  "https://www.instagram.com/webforge.dev/",
];
