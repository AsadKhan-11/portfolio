/*
  The six services, one page each at /services/[slug]. The home page lists
  them as cards and links here; the sitemap, llms.txt and the footer are
  built from the same list, so a page can't be left out of any of them.

  Every claim in this copy is one the rest of the site already makes (the
  services cards, the packages, the FAQ, the process, the case studies). When
  editing, keep it that way: the packages come from lib/packages.ts, so don't
  retype a price here.

  Search results show about 60 characters of a title and about 155 of a
  description, and SEO audits want 50 to 60 and 120 to 160. src/lib/seo.ts
  warns during the build when a page falls outside either range.
*/
import type { PackageName } from "./packages";

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceStep {
  title: string;
  body: string;
}

export interface ServicePage {
  slug: string;
  /** Matches the card's numeral on the home page. */
  n: string;
  name: string;
  /** One line, for lists of services. */
  short: string;
  /** The <title>. */
  title: string;
  /** The meta description. */
  description: string;
  /** The H1 in two parts: plain words, then the flame-coloured serif ending. */
  h1: { lead: string; em: string };
  lede: string;
  /** "Good fit if" bullets. */
  fit: string[];
  /** What the work includes. */
  included: ServiceStep[];
  /** How a project of this kind runs. */
  steps: ServiceStep[];
  stack: string[];
  /** Which package it usually sits in (prices live in lib/packages.ts). */
  pkg: { name: PackageName; note: string };
  faqs: ServiceFaq[];
  /** Case-study slugs, most relevant first. Add new projects here as they ship. */
  related: string[];
  /** ISO date of the last substantive edit; feeds the sitemap. */
  updated: string;
}

export const SERVICES: ServicePage[] = [
  {
    slug: "ai-integration",
    n: "01",
    name: "AI Integration",
    short: "LLM features built into products that already work.",
    title: "AI Integration Services · LLM Features for Your Product",
    description:
      "Add AI to a product that already works: search, document Q&A and drafting that answer from your own data, built by one developer for a fixed quote.",
    h1: { lead: "AI features that answer", em: "from your own data." },
    lede: "I add language-model features to products that already work: search that understands what people mean, answers drawn from your own documents, and drafts and summaries inside the tools your team already uses. Every answer is tied to your data, so the feature says things you can stand behind.",
    fit: [
      "You have a product, portal or internal tool, and one slow, repetitive job inside it is eating hours.",
      "Your knowledge sits in documents, tickets or a database, and people can't find it fast enough.",
      "You want AI that cites its sources and hands over to a person when it isn't sure, not a demo that guesses.",
    ],
    included: [
      {
        title: "Search that understands meaning",
        body: "Semantic search over your own content, so a question worded differently from the page still finds the page. Each result links back to its source.",
      },
      {
        title: "Answers from your documents",
        body: "Document Q&A built on retrieval: the model is handed the relevant passages from your data and answers from those, rather than from memory, with the source shown.",
      },
      {
        title: "Summaries and first drafts",
        body: "Summarising and drafting inside the screen where the work already happens: support replies, case notes, reports. A person reviews before anything goes out.",
      },
      {
        title: "Limits it respects",
        body: "A defined scope: it answers from approved knowledge, says so when it can't find an answer, and hands over to a human when it's unsure.",
      },
      {
        title: "Visibility",
        body: "A readable log of questions and answers, so you can see what people ask and where the feature falls short.",
      },
      {
        title: "Cost and speed controls",
        body: "Caching and sensible limits, so a popular feature doesn't produce a surprise bill, and answers that stream in so the screen never feels stuck.",
      },
    ],
    steps: [
      {
        title: "Pick one job",
        body: "We choose the single task where AI saves the most time and can be checked, and agree what a good answer looks like before any code is written.",
      },
      {
        title: "Connect your data",
        body: "I connect the sources the feature will read, such as documents, a database or a help centre, tidy them up, and set what it's allowed to use.",
      },
      {
        title: "Test on real questions",
        body: "We try it on real questions from your team or customers, including the awkward ones, and tune it until the answers hold up.",
      },
      {
        title: "Launch with a safety net",
        body: "It goes live with usage limits, a human fallback and a log, and it can be switched off without touching the rest of the product.",
      },
    ],
    stack: ["Next.js", "React", "Node.js", "MongoDB", "TypeScript", "LLM APIs"],
    pkg: {
      name: "Scale",
      note: "AI features are part of the Scale package. If you already have a product and want one feature added, we can scope it on its own.",
    },
    faqs: [
      {
        q: "Will it make things up?",
        a: "Any language model can, which is why I don't let it answer from memory. The feature retrieves the relevant passages from your data, answers from those, shows where each answer came from, and says so when it can't find one. I test it against awkward questions before it goes live.",
      },
      {
        q: "What happens to my data?",
        a: "Only what a question needs is sent to the model provider. Before anything goes through, I go over that provider's current data terms with you, and anything sensitive can be left out.",
      },
      {
        q: "Can you add AI to a product I already have?",
        a: "Yes, that's most of this work. I start by reading the code and telling you honestly what shape it's in, then add the feature in a way that doesn't disturb what already works.",
      },
      {
        q: "What does it cost to run after launch?",
        a: "You pay the model provider for what's used. Before we build, I estimate a monthly range from your expected volume, and I add limits so usage can't run away.",
      },
    ],
    related: ["vector-academy", "ironside-gym"],
    updated: "2026-11-11",
  },
  {
    slug: "chatbots-assistants",
    n: "02",
    name: "Chatbots & Assistants",
    short: "Support bots and lead-qualifying assistants that hand over to a human.",
    title: "AI Chatbot Development for Support and Lead Capture",
    description:
      "Chatbots that answer repetitive questions and qualify leads before they reach your inbox, with a clean hand-over to a human when they are out of their depth.",
    h1: { lead: "Bots that handle the routine", em: "and hand over the rest." },
    lede: "A support bot earns its place by deflecting the questions that arrive every week. A lead bot earns it by asking the right few things before a person gets involved. I build both, connected to your help content and your CRM, with a clear way for your team to take over.",
    fit: [
      "The same handful of questions fill your inbox or chat every week.",
      "Enquiries arrive without the details you need to follow up.",
      "You want a bot that knows when to stop and bring in a person.",
    ],
    included: [
      {
        title: "Answers from approved content",
        body: "It draws on your help articles, FAQs and policies, and only those, so it doesn't invent a refund policy.",
      },
      {
        title: "Lead qualification",
        body: "A short conversation that collects what your team needs, such as the need, the timing and the contact, and passes a clean summary to your inbox or CRM.",
      },
      {
        title: "Hand-over to a human",
        body: "When it's unsure, or the person asks for one, the conversation goes to your team with the full transcript, so nobody has to repeat themselves.",
      },
      {
        title: "Built into your product",
        body: "On your website, inside your web app or portal, or both, as a chat designed to match your brand rather than a generic bubble.",
      },
      {
        title: "A view for your team",
        body: "What people ask, what the bot couldn't answer and where leads came from. The unanswered questions become your to-do list for the help content.",
      },
      {
        title: "Everything handed over",
        body: "The code, the content and any accounts set up for the project are yours.",
      },
    ],
    steps: [
      {
        title: "Read the real questions",
        body: "I go through a sample of your real chats and emails, group them, and find the handful of questions that make up most of the volume.",
      },
      {
        title: "Write the knowledge",
        body: "We turn those into clear, approved answers. A bot is only as good as the content behind it, so this step matters most.",
      },
      {
        title: "Build and rehearse",
        body: "I build the bot, then run it against real and awkward questions with your team before any customer sees it.",
      },
      {
        title: "Launch and tune",
        body: "It goes live with hand-over rules and a team view, and we review the unanswered questions during the 30 days of support that follow.",
      },
    ],
    stack: ["React", "Next.js", "Node.js", "MongoDB", "LLM APIs", "Webhooks"],
    pkg: {
      name: "Scale",
      note: "Assistants are part of the Scale package. A bot on its own, for a site you already have, can be scoped separately.",
    },
    faqs: [
      {
        q: "Will people know it's a bot?",
        a: "Yes, and it should say so up front. It's honest, it sets the right expectation (quick answers, with a person available) and it builds trust.",
      },
      {
        q: "What if it gets something wrong?",
        a: "It answers only from content you've approved, says so when it doesn't know, and hands over to your team. Every conversation is logged, so a wrong answer is something you can find and fix, not something you only hear about from a customer.",
      },
      {
        q: "Can it book meetings or check order status?",
        a: "It can wherever there's an API to connect to: your calendar or CRM for bookings, your shop for orders. I scope each connection at the start, because each one adds work.",
      },
      {
        q: "Does it only work on my website?",
        a: "The first version lives on your website or inside your app. Messaging apps and other channels are possible, but they come with the platform's own rules and costs, so I quote them separately.",
      },
    ],
    related: ["vector-academy", "ironside-gym"],
    updated: "2026-11-11",
  },
  {
    slug: "crm-automation",
    n: "03",
    name: "CRM & Automation",
    short: "Two-way CRM sync and workflows that remove the copy-paste work.",
    title: "CRM Integration & Workflow Automation for Small Teams",
    description:
      "Connect the tools you already pay for. Two-way CRM sync, webhook pipelines and workflows that remove the copy-paste work between your systems.",
    h1: { lead: "Stop copying data", em: "between your tools." },
    lede: "If someone on your team re-types a lead from one system into another, that's a job for software. I connect the tools you already pay for, such as your CRM, forms, calendar, billing and email, so information moves on its own and stays correct on both sides.",
    fit: [
      "Leads, bookings or orders get re-entered by hand in more than one place.",
      "Your CRM and the rest of your tools disagree about what's true.",
      "A patchwork of quick no-code automations has become something you can't rely on.",
    ],
    included: [
      {
        title: "Two-way CRM sync",
        body: "Contacts, deals and statuses stay in step between your CRM and your own site or app, in both directions, with clear rules for which side wins when they disagree.",
      },
      {
        title: "Webhook pipelines",
        body: "When something happens in one tool, such as a form submission, a payment or a changed booking, the right things happen in the others, automatically and in order.",
      },
      {
        title: "Workflows that remove steps",
        body: "Follow-up emails, task creation, status changes and hand-offs that used to be somebody's job.",
      },
      {
        title: "Failures you can see",
        body: "Retries, an error log and an alert when something doesn't go through, so a failed sync is noticed in minutes, not in next month's report.",
      },
      {
        title: "A one-off clean-up",
        body: "Duplicates and inconsistent fields cause most sync problems, so existing data gets tidied before it's connected.",
      },
      {
        title: "Documentation",
        body: "A plain-English map of what talks to what, so whoever comes next isn't guessing.",
      },
    ],
    steps: [
      {
        title: "Map the flow",
        body: "We draw how information moves today, who types what and where, and decide which of it should happen by itself.",
      },
      {
        title: "Connect and test",
        body: "I build the connections against test records first, so nothing touches live customers until it behaves.",
      },
      {
        title: "Switch on gradually",
        body: "One workflow goes live at a time, with the old process as a fallback until you trust the new one.",
      },
      {
        title: "Monitor and hand over",
        body: "Alerts, logs and documentation go in place, and the code and accounts are yours.",
      },
    ],
    stack: ["Node.js", "REST APIs", "Webhooks", "GoHighLevel", "MongoDB", "TypeScript"],
    pkg: {
      name: "Build",
      note: "Integrations with the tools you use are part of the Build package. A stand-alone automation project is scoped on its own.",
    },
    faqs: [
      {
        q: "Which CRMs do you work with?",
        a: "I've integrated GoHighLevel, which you can see in the Ironside Gym case study. For any other, if it has a documented API or webhooks it's usually workable, and I check that before I quote.",
      },
      {
        q: "Why not just use Zapier or Make?",
        a: "For simple, low-stakes jobs they're often the right answer, and I'll say so. Custom code earns its place when the logic is complicated, the volume is high or a failure would cost you money, because you get proper error handling and no per-task fees.",
      },
      {
        q: "What happens when a sync fails?",
        a: "It retries, then logs the failure and alerts you, with enough detail to see what went wrong. Nothing fails silently.",
      },
      {
        q: "Can you clean up our existing data first?",
        a: "Yes, and it's usually the first step. Duplicates and inconsistent fields cause most sync problems, so tidying them first saves trouble later.",
      },
    ],
    related: ["ironside-gym", "vector-academy"],
    updated: "2026-11-11",
  },
  {
    slug: "web-apps",
    n: "04",
    name: "Full-Stack Web Apps",
    short: "Client portals, dashboards and admin panels, built end to end.",
    title: "Full Stack Web App Development · Portals & Dashboards",
    description:
      "End-to-end MERN builds: client portals, dashboards and admin panels with secure sign-in and clean data models, designed and built by one developer.",
    h1: { lead: "Portals, dashboards and apps", em: "that stay fast as they grow." },
    lede: "Most of my work is the software a business runs on: client portals, admin panels, booking and operations tools. I build the whole thing, from the database and the API to the interface people use, so it hangs together and one person is accountable for all of it.",
    fit: [
      "Your process lives in spreadsheets, email and a few tools that don't talk to each other.",
      "Clients or members need to log in, book, pay or see their own information.",
      "You have a prototype, or a build that has slowed down and become hard to change.",
    ],
    included: [
      {
        title: "Secure accounts and roles",
        body: "Sign-in and permissions by role, with the rules that keep one person's data away from another's. In Veloura, five roles each get their own workspace, and the rules are enforced in the database, not just on screen.",
      },
      {
        title: "A data model that fits the business",
        body: "Tables or collections, relationships and validation designed around how you actually work, so reports and new features are easy to add later.",
      },
      {
        title: "An admin your team can operate",
        body: "Not a database viewer: screens built for the jobs your staff do every day.",
      },
      {
        title: "A fast, accessible interface",
        body: "React and Next.js, tested on real devices, with performance and accessibility checks before anything is called done.",
      },
      {
        title: "Integrations",
        body: "Payments, email, calendars and CRMs: the tools your app has to talk to.",
      },
      {
        title: "A staging link from day one",
        body: "You watch it come together week by week instead of waiting for a reveal.",
      },
    ],
    steps: [
      {
        title: "Scope the core",
        body: "We define the smallest version that is genuinely useful, and a plan for what comes after it.",
      },
      {
        title: "Design the screens",
        body: "Wireframes first, then high-fidelity designs that you sign off before production code exists.",
      },
      {
        title: "Build in slices",
        body: "Built in reviewable slices on a staging link, so you see real progress rather than status reports.",
      },
      {
        title: "Test, launch, support",
        body: "Real devices, real edge cases, deployment and monitoring, then 30 days of support after launch.",
      },
    ],
    stack: ["React", "Next.js", "Node.js", "MongoDB", "TypeScript", "Tailwind", "React Native"],
    pkg: {
      name: "Build",
      note: "A custom full-stack application with accounts and an admin dashboard is the Build package. Larger or more unusual scopes are quoted individually.",
    },
    faqs: [
      {
        q: "What does a web app cost?",
        a: "The Build package, for a custom full-stack application with user accounts and an admin dashboard, starts from $4,500. Bigger or more unusual scopes are quoted individually, and you get a fixed price before any work begins.",
      },
      {
        q: "How long does it take?",
        a: "Typically 4–8 weeks, depending on how many features it has. The Build package is scoped to go live in 4–6 weeks. I give you a realistic timeline up front, and I'd rather say a deadline isn't achievable before we start than after.",
      },
      {
        q: "Can you improve an app I already have?",
        a: "Yes. I've picked up other people's React and Node projects plenty of times. I start by reading the code and telling you honestly what shape it's in. Sometimes the right answer is a refactor rather than a rebuild, and that's usually the cheaper one.",
      },
      {
        q: "Can you build a mobile app?",
        a: "Yes. I build iOS and Android apps in React Native, like Curbly, a two-sided ordering app with a customer side and a vendor console. For many products a responsive web app is the better first step, and I'll tell you honestly which one fits.",
      },
    ],
    related: ["veloura", "ironside-gym", "vector-academy"],
    updated: "2026-11-11",
  },
  {
    slug: "ecommerce-payments",
    n: "05",
    name: "E-Commerce & Payments",
    short: "Storefronts, subscriptions and checkout flows on Stripe.",
    title: "E-Commerce Development & Stripe Payments Integration",
    description:
      "Storefronts, subscriptions and checkout flows on Stripe, with cart, orders and fulfilment handled properly and an admin your team can actually operate.",
    h1: { lead: "Checkout that works,", em: "and an admin you can run." },
    lede: "A shop is more than a grid of products. It's the cart, the payment, the order that has to reach the right person, and the screen your team uses on a Monday morning. I build the whole chain on Stripe, so money moves safely and orders don't fall through the gaps.",
    fit: [
      "You sell products, bookings, memberships or subscriptions online and want to own the experience.",
      "A template store no longer fits how you sell.",
      "Payments and orders need to connect to the rest of your operation.",
    ],
    included: [
      {
        title: "Storefront and catalogue",
        body: "Fast product pages with search and filtering, designed around how your customers choose rather than a stock theme.",
      },
      {
        title: "Stripe checkout and subscriptions",
        body: "One-off payments, subscriptions and invoices through Stripe. Card details are handled by Stripe, not stored on your site.",
      },
      {
        title: "Orders and fulfilment",
        body: "Order records, status changes, confirmation emails and the hand-off to whoever packs or delivers.",
      },
      {
        title: "An admin your team can operate",
        body: "Add products, change prices, see orders and issue refunds without calling a developer.",
      },
      {
        title: "The awkward cases, planned for",
        body: "Discounts, shipping rules, failed payments and refunds are designed in from the start, because that's where shops usually leak.",
      },
      {
        title: "Built to be found",
        body: "Product pages that load quickly and carry proper titles, structured data and clean URLs.",
      },
    ],
    steps: [
      {
        title: "Map the buying journey",
        body: "From first visit to paid order to delivery: where customers hesitate, and what your team needs to see at each step.",
      },
      {
        title: "Build the core",
        body: "Catalogue, cart and checkout first, on a staging site where you can place test orders.",
      },
      {
        title: "Test the money paths",
        body: "Test cards, failed payments, refunds and edge cases, all before real money is involved.",
      },
      {
        title: "Launch and support",
        body: "Go live with monitoring and a handover, then 30 days of support.",
      },
    ],
    stack: ["Stripe", "Next.js", "React", "Node.js", "MongoDB", "TypeScript"],
    pkg: {
      name: "Scale",
      note: "Payments and subscriptions are part of the Scale package. A smaller shop can be scoped separately, and the price is fixed once I know what you need.",
    },
    faqs: [
      {
        q: "Why Stripe?",
        a: "It's widely used, handles cards and a range of local payment methods, and keeps card data off your site. If your market needs a different gateway, tell me and we'll look at the options.",
      },
      {
        q: "Whose Stripe account is it?",
        a: "Yours. The account is set up in your name and payments go straight to you. I never hold your money.",
      },
      {
        q: "Can you move my existing shop across?",
        a: "Yes. Products, customers and order history can be imported, and I plan redirects so existing links and search rankings aren't lost.",
      },
      {
        q: "Do you handle subscriptions and memberships?",
        a: "Yes, through Stripe: plans, trials, upgrades, retries on failed payments and a customer area for managing it all.",
      },
    ],
    related: ["curbly", "ironside-gym", "vector-academy"],
    updated: "2026-11-11",
  },
  {
    slug: "ui-ux-design",
    n: "06",
    name: "UI / UX & Design Systems",
    short: "Wireframes to design systems in Figma, built as reusable components.",
    title: "UI/UX Design & Design Systems for Websites and Apps",
    description:
      "Wireframes through to pixel-level design systems in Figma, built as reusable components, with interfaces designed around what your users are trying to do.",
    h1: { lead: "Interfaces designed around", em: "what people are trying to do." },
    lede: "Good design isn't decoration. It's the difference between a visitor who finds what they need and one who leaves. I design in Figma and build what I design, so there's no gap between the mock-up you approved and the product that ships.",
    fit: [
      "Your site looks dated, or doesn't make the offer clear.",
      "You're building a product and want the design and the code from one person.",
      "You have several screens or products that should feel like one, and keep drifting apart.",
    ],
    included: [
      {
        title: "Research and structure",
        body: "Who's using it, what they're trying to get done, and the shape of the pages or flows that gets them there.",
      },
      {
        title: "Wireframes",
        body: "Low-fidelity layouts first, so we settle structure while it's still cheap to change.",
      },
      {
        title: "High-fidelity design in Figma",
        body: "Pixel-level screens for desktop and phone, signed off before production code exists.",
      },
      {
        title: "A design system",
        body: "Colours, type, spacing and components defined once and reused everywhere, so new pages stay consistent.",
      },
      {
        title: "Built, not handed over as a PDF",
        body: "I build the components in React, so what ships matches what you approved, down to the details.",
      },
      {
        title: "Accessibility and speed",
        body: "Contrast, keyboard use, readable type and fast loading are part of the design, and checked before launch.",
      },
    ],
    steps: [
      {
        title: "Discovery",
        body: "Goals, audience and constraints, plus a look at what already exists.",
      },
      {
        title: "Wireframes",
        body: "Structure and flow, reviewed with you before any visual design.",
      },
      {
        title: "Visual design",
        body: "Type, colour and layout as high-fidelity screens, with a component library behind them.",
      },
      {
        title: "Build and refine",
        body: "The designs become reusable components, and anything that doesn't work on a real screen gets adjusted.",
      },
    ],
    stack: ["Figma", "React", "Next.js", "Tailwind", "CSS"],
    pkg: {
      name: "Launch",
      note: "A custom-designed site of up to five pages is the Launch package. Product design for a full application sits inside Build.",
    },
    faqs: [
      {
        q: "Can you design without building it?",
        a: "I mostly do both, because a design is better for being built by the person who made it. If you only want design files for your own developers, tell me, and I'll be honest about whether I'm the right fit.",
      },
      {
        q: "Do I need a design system?",
        a: "A design system is a shared set of colours, type, spacing and components, so every page looks like part of the same product. A five-page site rarely needs a formal one. A product with many screens, or several products under one brand, usually does.",
      },
      {
        q: "Do you work from our brand guidelines?",
        a: "Yes. If you have a logo, colours and fonts, I design inside them. If you don't, we settle on a direction together as part of the work.",
      },
      {
        q: "How many rounds of changes are included?",
        a: "It depends on the package: two rounds of revisions on Launch, four on Build.",
      },
    ],
    related: ["aurelle", "vanta-aesthetics", "veloura"],
    updated: "2026-11-11",
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);

export const serviceHref = (slug: string) => `/services/${slug}`;
