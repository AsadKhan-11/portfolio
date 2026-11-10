import { CASE_STUDIES } from "@/lib/caseStudies";
import { CONTACT_EMAIL, SITE_URL, SOCIALS } from "@/lib/site";

/*
  /llms.txt: a plain-text summary of the site for AI assistants and
  answer engines, in the layout proposed at llmstxt.org (a title, a one-line
  summary, then lists of links). It is a convention, not a standard Google or
  any other search engine has said it reads, so it is cheap insurance rather
  than a ranking lever. SEO audits now check for it.

  The case studies are listed from the same data that builds their pages, so
  the file cannot fall behind when one is added. `force-static` renders it
  once at build time into out/llms.txt, which is how a static export serves a
  route handler.

  Every claim here is one the site already makes (hero, stats, services,
  case-study status lines). Keep it that way when editing.
*/
export const dynamic = "force-static";

/* "Live · self-initiated" reads better as plain text with a comma. */
const plain = (s: string) => s.replace(/\s·\s/g, ", ");

/* SOCIALS is a bare list of URLs; name each by its host. */
const NETWORKS: Record<string, string> = {
  "github.com": "GitHub",
  "www.linkedin.com": "LinkedIn",
  "x.com": "X",
  "www.instagram.com": "Instagram",
};
const network = (url: string) => {
  const host = new URL(url).hostname;
  return NETWORKS[host] ?? host;
};

export function GET() {
  const caseStudies = CASE_STUDIES.map(
    (s) =>
      `- [${s.title}](${SITE_URL}/work/${s.slug}): ${s.type}, ${s.year} (${plain(s.status)}). ${s.pitch}`,
  );

  const body = [
    "# WebForge Digital",
    "",
    "> Full stack web studio of Asad Khan in Lahore, Pakistan. One developer designs, builds and launches websites, client portals and web apps for clients worldwide, with a fixed quote up front and full ownership of the code.",
    "",
    "WebForge Digital builds with React, Next.js, Node.js and MongoDB, with Stripe for payments and LLM APIs for AI features. Most projects go live in 2–6 weeks and include 30 days of post-launch support. Replies usually come within a day.",
    "",
    "## Key pages",
    "",
    `- [Home](${SITE_URL}/): What the studio does and how to start a project.`,
    `- [Services](${SITE_URL}/#services): AI integration, chatbots and assistants, CRM and automation, full-stack web apps, e-commerce and payments, UI/UX and design systems.`,
    `- [Packages](${SITE_URL}/#packages): Project packages and what each one includes.`,
    `- [About](${SITE_URL}/#about): Who is behind the studio.`,
    `- [Contact](${SITE_URL}/#contact): Send a project enquiry.`,
    "",
    "## Case studies",
    "",
    ...caseStudies,
    "",
    "## Contact",
    "",
    `- Email: ${CONTACT_EMAIL}`,
    ...SOCIALS.map((url) => `- [${network(url)}](${url})`),
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
