/*
  The three packages, in one place. The home page's Packages section and the
  service pages both read this, so a price can only ever be changed once.
*/
export type PackageName = "Launch" | "Build" | "Scale";

export type Pkg = {
  n: string;
  name: PackageName;
  audience: string;
  price: number;
  features: string[];
  featured?: boolean;
};

export const PACKAGES: Pkg[] = [
  {
    n: "01",
    name: "Launch",
    audience: "A fast, professional site for a small business getting online.",
    price: 1500,
    features: [
      "Custom-designed site, up to 5 pages",
      "Mobile-first, fully responsive",
      "Basic on-page SEO",
      "Contact form wired to your inbox",
      "Two rounds of revisions",
      "Live in 2 weeks",
    ],
  },
  {
    n: "02",
    name: "Build",
    audience: "A real product for a startup or team, not just a brochure site.",
    price: 4500,
    features: [
      "Everything in Launch",
      "Custom full-stack application",
      "User accounts & admin dashboard",
      "Integrations with the tools you use",
      "Four rounds of revisions",
      "Live in 4–6 weeks",
    ],
    featured: true,
  },
  {
    n: "03",
    name: "Scale",
    audience: "A full hand-off build, with AI features baked in from day one.",
    price: 9000,
    features: [
      "Everything in Build",
      "AI features: chat, search, automation",
      "Payments & subscriptions",
      "Performance & accessibility audit",
      "30 days of post-launch support",
      "Priority turnaround",
    ],
  },
];

export const getPackage = (name: PackageName) => PACKAGES.find((p) => p.name === name)!;
