/*
  Where Asad has worked, in one place: the home page's "Path" section and the
  About page both read this, so the two can't tell different stories.
*/
/** ISO date of the last substantive edit to /about; feeds the sitemap. */
export const ABOUT_UPDATED = "2026-11-11";

export type Role = {
  year: string;
  period: string;
  title: string;
  org: string;
  copy: string;
  stack: string[];
  /** Which icon the Path section draws; the page that lists it plain ignores it. */
  icon: "briefcase" | "code" | "monitor";
  current?: boolean;
};

export const ROLES: Role[] = [
  {
    year: "26",
    period: "2026 – Present",
    title: "Full Stack Developer",
    org: "MyntorX",
    copy: "Shipping production features on a team: React interfaces, Node services, and data models that real users lean on every day. The studio discipline, applied at company scale.",
    stack: ["React", "Next.js", "Node.js", "MongoDB", "TypeScript"],
    icon: "briefcase",
    current: true,
  },
  {
    year: "24",
    period: "2024 – Present",
    title: "Founder & Developer",
    org: "WebForge Digital",
    copy: "My own studio, running alongside everything else. Custom web products for clients worldwide: full stack MERN applications, AI-assisted features, and 10+ delivered projects across e-commerce, SaaS and business sites.",
    stack: ["React", "Next.js", "Node.js", "MongoDB", "Tailwind"],
    icon: "code",
    current: true,
  },
  {
    year: "23",
    period: "2023 – 2024",
    title: "Front-End Developer",
    org: "Project-based",
    copy: "Interactive, responsive interfaces in React and modern CSS. Focused on performance budgets, accessibility, and a component architecture that survived handover.",
    stack: ["HTML5", "CSS3", "JavaScript", "React", "Bootstrap"],
    icon: "monitor",
  },
];
