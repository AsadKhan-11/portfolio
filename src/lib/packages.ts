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

/*
  The comparison table: one row per thing a package can include, and what
  each of the three (Launch, Build, Scale) says about it, in that order. A
  tick or a dash for what is in or out, a few words where the tiers differ.

  This is the same information as `features` above, laid side by side, and it
  is typed out rather than worked out so each row can be worded for a reader.
  Keep it in step: a tick row whose text no longer matches a feature is
  reported in the build log.
*/
export type Cell = boolean | string;

export const COMPARE: { feature: string; values: [Cell, Cell, Cell] }[] = [
  { feature: "Custom-designed site, up to 5 pages", values: [true, true, true] },
  { feature: "Mobile-first, fully responsive", values: [true, true, true] },
  { feature: "Basic on-page SEO", values: [true, true, true] },
  { feature: "Contact form wired to your inbox", values: [true, true, true] },
  { feature: "Custom full-stack application", values: [false, true, true] },
  { feature: "User accounts & admin dashboard", values: [false, true, true] },
  { feature: "Integrations with the tools you use", values: [false, true, true] },
  { feature: "AI features: chat, search, automation", values: [false, false, true] },
  { feature: "Payments & subscriptions", values: [false, false, true] },
  { feature: "Performance & accessibility audit", values: [false, false, true] },
  { feature: "Rounds of revisions", values: ["Two", "Four", "Four"] },
  { feature: "Time to launch", values: ["2 weeks", "4–6 weeks", "Priority turnaround"] },
];

for (const row of COMPARE) {
  if (typeof row.values[0] === "boolean" && !PACKAGES.some((p) => p.features.includes(row.feature))) {
    console.warn(`[packages] The comparison row "${row.feature}" matches no package feature.`);
  }
}
