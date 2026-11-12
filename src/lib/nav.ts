/*
  The site's pages, in the order the header, the menu, the footer and the 404
  page list them. Each is a page of its own, so every one of those places
  links to the same address.

  The home page is not in this list: the logo is its link, and the menu adds
  a "Home" row of its own.
*/
export interface NavPage {
  label: string;
  href: string;
}

export const PAGES: NavPage[] = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Packages", href: "/packages" },
  { label: "Blog", href: "/blog" },
  { label: "FAQs", href: "/faqs" },
  { label: "Book a call", href: "/book" },
  { label: "Contact", href: "/contact" },
];

/** ISO date of the last substantive edit to the packages, FAQs and contact pages; feeds the sitemap. */
export const SITE_PAGES_UPDATED = "2026-11-11";

/*
  The width at which the header swaps the menu button for the full row of
  links and the "Start a project" button. Below it there is the menu button
  and nothing else. Keep it in step with the media queries marked
  "nav breakpoint" in globals.css.
*/
export const NAV_BREAKPOINT = 1040;

/** A page is current on its own address and on anything beneath it: /work/aurelle is under /work. */
export const isCurrent = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);
