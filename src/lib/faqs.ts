/*
  Every question the site answers, in one place. The home page shows six of
  them (HOME_FAQS), /faqs shows all of them in groups, and the packages,
  services and contact pages borrow the ones that are about them.

  Every answer restates something the rest of the site already says (the
  packages, the process, the services, the case studies). When editing, keep
  it that way: a fact belongs in one place and the rest should agree with it.

  `links` are the pages an answer points on to. A question page that ends in
  a dead stop sends people away; one that hands them to the page with the
  detail keeps them reading.
*/
import { getPackage } from "./packages";

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

export interface FaqLink {
  label: string;
  href: string;
}

export interface Faq {
  id: string;
  q: string;
  a: string;
  links?: FaqLink[];
}

export interface FaqGroup {
  id: string;
  /** The group's name, as a chip and in the page's trail of topics. */
  title: string;
  /** The same name split into a plain word or two and a flame-coloured ending, for the section heading. */
  heading: { title: string; em: string };
  items: Faq[];
}

const PACKAGES: FaqLink = { label: "The packages", href: "/packages" };
const PROCESS: FaqLink = { label: "How a project runs", href: "/services#process" };
const CONTACT: FaqLink = { label: "Start a project", href: "/contact" };

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: "price-and-time",
    title: "Price and time",
    heading: { title: "Price and", em: "time" },
    items: [
      {
        id: "cost",
        q: "What does a project typically cost?",
        a: `It depends on scope. The three packages start from ${money(getPackage("Launch").price)} for a custom site, ${money(getPackage("Build").price)} for a full-stack application with accounts and an admin dashboard, and ${money(getPackage("Scale").price)} when AI features and payments are part of it. I quote a fixed price after we've talked through what you need, so there are no surprises halfway through.`,
        links: [PACKAGES, CONTACT],
      },
      {
        id: "timeline",
        q: "How long will it take?",
        a: "A marketing site is usually 1–2 weeks. A full-stack application is typically 4–8 weeks depending on how many features it has. I'll give you a realistic timeline up front, and if I think a deadline isn't achievable, I'll say so before we start rather than after.",
        links: [PACKAGES, PROCESS],
      },
      {
        id: "revisions",
        q: "How many revisions are included?",
        a: "Unlimited revisions on every package. We keep refining until you are happy with what was scoped. A change to the scope itself, such as a new feature, is quoted separately before any work starts.",
        links: [PACKAGES],
      },
      {
        id: "start",
        q: "How do we get started?",
        a: "Send the contact form or email me a few lines about what you're building. I reply within a day, with questions or with a fixed quote once the scope is clear. You get the fixed quote before we start.",
        links: [CONTACT, PROCESS],
      },
    ],
  },
  {
    id: "working-together",
    title: "Working together",
    heading: { title: "Working", em: "together" },
    items: [
      {
        id: "outside-pakistan",
        q: "Do you work with clients outside Pakistan?",
        a: "Most of my clients are. I'm in Lahore (UTC+5), which overlaps comfortably with Europe, the Middle East and Asia, and I keep early evenings free for calls with the US. Async updates and a staging link mean you're never waiting on a timezone to see progress.",
        links: [{ label: "About me", href: "/about" }, CONTACT],
      },
      {
        id: "progress",
        q: "Will I see progress along the way?",
        a: "Yes. You get a staging link from day one and can open a working version any day of the week, so progress is something you see rather than something you're told.",
        links: [PROCESS],
      },
      {
        id: "need-from-you",
        q: "What do you need from me to start?",
        a: "Mostly your goals, who the product is for, and any constraints or budget. I'll tell you if a simpler build gets you there faster.",
        links: [PROCESS, CONTACT],
      },
      {
        id: "existing-code",
        q: "Can you work with my existing codebase or team?",
        a: "Yes. I've picked up other people's React and Node projects plenty of times. I'll start by reading the code and telling you honestly what shape it's in. Sometimes the right answer is a refactor rather than a rebuild, and that's usually the cheaper one.",
        links: [{ label: "Full-stack web apps", href: "/services/web-apps" }],
      },
    ],
  },
  {
    id: "what-i-build",
    title: "What I build",
    heading: { title: "What I", em: "build" },
    items: [
      {
        id: "stack",
        q: "What technology do you use?",
        a: "Mostly the MERN stack: MongoDB, Express, React and Node.js, with Next.js, TypeScript and Tailwind. Payments go through Stripe, AI features use LLM APIs, design is done in Figma, and mobile apps are built in React Native.",
        links: [{ label: "The toolkit", href: "/about#toolkit" }],
      },
      {
        id: "ai",
        q: "Can you add AI to a product I already have?",
        a: "Yes, that's most of this work. I start by reading the code and telling you honestly what shape it's in, then add the feature in a way that doesn't disturb what already works. The model answers from your own data, shows its sources, and hands over to a person when it isn't sure.",
        links: [{ label: "AI integration", href: "/services/ai-integration" }],
      },
      {
        id: "mobile",
        q: "Can you build a mobile app?",
        a: "Yes. I build iOS and Android apps in React Native, like Curbly, a two-sided ordering app with a customer side and a vendor console. For many products a responsive web app is the better first step, and I'll tell you honestly which one fits.",
        links: [
          { label: "Full-stack web apps", href: "/services/web-apps" },
          { label: "Curbly", href: "/work/curbly" },
        ],
      },
      {
        id: "payments",
        q: "Do you handle payments and subscriptions?",
        a: "Yes, through Stripe: one-off payments, subscriptions, invoices and refunds. The Stripe account is set up in your name and payments go straight to you. I never hold your money.",
        links: [{ label: "E-commerce and payments", href: "/services/ecommerce-payments" }],
      },
      {
        id: "found",
        q: "Will my site be found on Google?",
        a: "The Launch package includes basic on-page SEO, and every build is made to load quickly and carry proper titles and structured data. Ranking for competitive searches takes more than a build, though: it takes content and links over time, and I'd rather be straight about that.",
        links: [PACKAGES],
      },
    ],
  },
  {
    id: "after-launch",
    title: "Ownership and support",
    heading: { title: "Ownership", em: "and support" },
    items: [
      {
        id: "ownership",
        q: "Who owns the code, and will I be locked in?",
        a: "You own everything once the final invoice is settled: repository, assets, and any accounts set up for the project. No proprietary framework, no hosting you can't move, nothing that requires you to keep paying me to keep the site running.",
        links: [PACKAGES],
      },
      {
        id: "after-launch",
        q: "What happens after launch?",
        a: "Every project includes a handover you can act on and 30 days of support for anything that surfaces post-launch. After that I'm available for ongoing work at an agreed rate, but there's no retainer you're obliged to sign.",
        links: [PACKAGES],
      },
    ],
  },
];

export const ALL_FAQS: Faq[] = FAQ_GROUPS.flatMap((g) => g.items);

export const getFaqs = (ids: string[]): Faq[] =>
  ids.map((id) => ALL_FAQS.find((f) => f.id === id)).filter((f): f is Faq => Boolean(f));

/* The six on the home page, in the order they have always had. */
export const HOME_FAQS = getFaqs([
  "cost",
  "timeline",
  "outside-pakistan",
  "existing-code",
  "ownership",
  "after-launch",
]);
