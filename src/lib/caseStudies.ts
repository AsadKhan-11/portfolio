/*
  Case studies. One entry per project; the route at /work/[slug] renders
  whatever is here. Adding a project is a data change plus a media folder
  under public/work/<slug>/ — no new components.
*/

export interface Shot {
  src: string;
  w: number;
  h: number;
  alt: string;
  caption?: string;
}

export interface Clip {
  id: string;
  title: string;
  blurb: string;
  src: string;
  poster: string;
  seconds: number;
}

export interface Highlight {
  title: string;
  kicker: string;
  body: string;
  points: string[];
  shot: Shot;
}

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

export interface CaseStudy {
  slug: string;
  n: string;
  title: string;
  tagline: string;
  /** Short line used on the work shelf */
  meta: string;
  year: string;
  role: string;
  client: string;
  type: string;
  status: string;
  /** Capability tags shown under the title */
  tags: string[];
  /** Only set once the product has a public URL. */
  liveUrl?: string;
  card: string;
  summary: string;
  challenge: string[];
  approach: string[];
  stats: Stat[];
  highlights: Highlight[];
  clips: Clip[];
  gallery: Shot[];
  phones: Shot[];
  decisions: { title: string; body: string }[];
}

/* Live builds that open the deployed site rather than a case-study page. */
export interface LiveBuild {
  key: string;
  shot: string;
  title: string;
  meta: string;
  domain: string;
  url: string;
}

export const LIVE_BUILDS: LiveBuild[] = [
  {
    key: "vanta",
    shot: "/work/cards/01-vanta.jpg",
    title: "Vanta Aesthetics",
    domain: "vanta-aesthetics.vercel.app",
    url: "https://vanta-aesthetics.vercel.app",
    meta: "Aesthetics clinic · 2026",
  },
  {
    key: "lumiere",
    shot: "/work/cards/02-lumiere.jpg",
    title: "Lumière Aesthetics",
    domain: "lumi-re-aesthetics.vercel.app",
    url: "https://lumi-re-aesthetics.vercel.app",
    meta: "Aesthetics clinic · 2026",
  },
  {
    key: "aurelle",
    shot: "/work/cards/03-aurelle.jpg",
    title: "Aurelle",
    domain: "aurelle-mauve-two.vercel.app",
    url: "https://aurelle-mauve-two.vercel.app",
    meta: "Skin wellness studio · 2026",
  },
];

const D = "/work/ironside";
const desktop = (name: string, alt: string, caption?: string): Shot => ({
  src: `${D}/stills/${name}.webp`,
  w: 2400,
  h: 1350,
  alt,
  caption,
});
const phone = (name: string, alt: string, caption?: string): Shot => ({
  src: `${D}/stills/${name}.webp`,
  w: 1170,
  h: 2532,
  alt,
  caption,
});
const clip = (id: string, title: string, blurb: string, seconds: number): Clip => ({
  id,
  title,
  blurb,
  seconds,
  src: `${D}/videos/${id}.mp4`,
  poster: `${D}/videos/${id}-poster.webp`,
});

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "ironside-gym",
    n: "01",
    title: "Ironside",
    tagline: "One platform for the gym, its trainers and every member.",
    meta: "Gym platform · 2026",
    year: "2026",
    role: "Full-stack development & AI integration",
    client: "Strength & conditioning gym",
    type: "Gym management platform",
    status: "In production · details anonymised",
    tags: ["AI coach", "GoHighLevel integration", "Trainer–client messaging", "Billing & scheduling"],
    card: "/work/cards/04-ironside.jpg",
    summary:
      "Ironside runs a gym from one place: memberships, classes, billing and retail for the owner, programmes and messaging for trainers, and an AI coach that builds each member's workouts, meal plans and grocery lists. It connects to GoHighLevel so leads and contacts flow into the CRM the gym already uses.",
    challenge: [
      "Most gyms run on a patchwork: a spreadsheet for members, a CRM for leads, DMs for trainers, one app for programmes and another for nutrition. Nothing agrees with anything else, and coaches spend their days on admin instead of coaching.",
      "The goal was a single platform where the owner, the trainers and the members all work from the same record, and where AI takes over the planning work that eats a trainer's day.",
    ],
    approach: [
      "The platform is built around three audiences. Owners get a back office for members, classes, billing and retail. Trainers get their clients, their programmes and a direct line to message them. Members get an AI coach in their pocket.",
      "The coach turns a member's goals, equipment and food preferences into a workout programme, a diet plan and a grocery list. It draws on the gym's own exercise library and a verified food database, so what it suggests is something the member can actually do and actually buy. Trainers stay in the loop and can step in at any point through messaging.",
    ],
    stats: [
      { value: 17, label: "Connected modules" },
      { value: 3, label: "Audiences: owners, trainers, members" },
      { value: 3, label: "Plans the AI builds: workouts, diets, groceries" },
      { value: 2, label: "Core integrations: AI and GoHighLevel" },
    ],
    highlights: [
      {
        kicker: "01 · AI coach",
        title: "An AI coach for every member",
        body: "Members tell the coach their goal, the equipment they have and how they like to eat. It answers with a full week: workouts, meals and a shopping list, in a conversation instead of a form.",
        points: [
          "Workout programmes built from the gym's own exercise library",
          "Diet plans that respect preferences and macros",
          "Grocery lists generated straight from the meal plan",
        ],
        shot: desktop("workouts", "The exercise library the AI coach draws on to build workout programmes"),
      },
      {
        kicker: "02 · Nutrition",
        title: "From meal plan to grocery list",
        body: "A verified food database sits behind the coach: calories and macros per 100g, barcodes, and a review step for externally sourced foods, so every plan is built from data the gym trusts.",
        points: [
          "Macros per 100g on every food",
          "Verify external items before they reach a plan",
          "Meal plans and grocery lists always agree with each other",
        ],
        shot: desktop("nutrition", "The nutrition database with macros per 100g and a verification workflow"),
      },
      {
        kicker: "03 · Messaging",
        title: "Trainers and clients, one conversation",
        body: "Trainers and members talk inside the platform instead of across DMs and texts. Check-ins, plan tweaks and nudges happen where the member's plan already lives, so nothing gets lost between apps.",
        points: [
          "Inbox with unread tracking so no client waits",
          "Every conversation tied to a member record",
          "Quick replies for check-ins and plan changes",
        ],
        shot: desktop("messages", "The trainer and client messaging inbox"),
      },
      {
        kicker: "04 · GoHighLevel",
        title: "Leads flow into the CRM",
        body: "The lead pipeline connects to GoHighLevel, so enquiries from the gym's marketing show up in the platform and the CRM the team already works in stays in step.",
        points: [
          "A pipeline from first enquiry to signed member",
          "Source tracking on every lead",
          "Win rate and pipeline value at a glance",
        ],
        shot: desktop("leads", "The lead pipeline board connected to GoHighLevel"),
      },
      {
        kicker: "05 · Operations",
        title: "Run the floor without the spreadsheets",
        body: "Members, classes and billing in one back office: a profile for every member, an hour-by-hour class calendar with rosters and waitlists, and payment tracking that flags failures the moment they happen.",
        points: [
          "Member profiles with plan, visits and one-click actions",
          "Class rosters, bookings and waitlists",
          "Failed payments surfaced with a one-click retry",
        ],
        shot: desktop("classes-roster", "A class roster open over the weekly calendar"),
      },
      {
        kicker: "06 · Business",
        title: "Know how the gym is doing",
        body: "Revenue by month and by plan, membership tiers, retail and orders all feed a dashboard the owner can read in seconds, so decisions come from the numbers rather than a hunch.",
        points: [
          "Revenue split across memberships, training and retail",
          "A plan editor with pricing and visibility controls",
          "Retail catalogue and order pipeline in the same place",
        ],
        shot: desktop("financial", "Revenue by month and plan, with the transaction ledger below"),
      },
    ],
    clips: [
      clip("tour", "Platform walkthrough", "From the dashboard to financials in twenty seconds: the owner's view of the whole gym.", 21),
      clip("members", "Members", "Searching the directory, filtering to past-due accounts and resolving one from the member's profile.", 14),
      clip("leads", "Leads", "Moving enquiries through the pipeline and adding a new lead.", 12),
      clip("classes", "Classes", "Browsing the timetable, opening a class and booking a member into it.", 15),
      clip("financial", "Financial", "Reading revenue by month, then filtering the ledger to failed payments and retrying one.", 16),
    ],
    gallery: [
      desktop("dashboard-insights", "Attendance insights with coach, member and class breakdowns", "Attendance insights"),
      desktop("members", "The members directory with status filters", "Members"),
      desktop("classes", "The weekly class calendar", "Classes"),
      desktop("financial-ledger", "The transaction ledger", "Billing ledger"),
      desktop("workouts", "The exercise library", "Exercise library"),
      desktop("nutrition", "The nutrition database", "Nutrition"),
      desktop("tasks", "The operations task board", "Ops Center"),
      desktop("orders", "Retail orders and pickups", "Orders"),
      desktop("community", "The community feed and challenge leaderboard", "Community"),
    ],
    phones: [
      phone("mobile-dashboard", "The dashboard on a phone", "Dashboard"),
      phone("mobile-leads", "The lead pipeline on a phone", "Leads"),
      phone("mobile-more", "Every other section from the More menu", "All sections"),
    ],
    decisions: [
      {
        title: "AI plans from the gym's own catalogue",
        body: "The coach draws on the gym's exercise library and verified foods, and knows what equipment each location actually has, so its suggestions are things members can really do and really buy.",
      },
      {
        title: "Trainers stay in control",
        body: "The AI does the first draft; trainers review, adjust and follow up through messaging. It scales the planning without taking the trainer out of the relationship.",
      },
      {
        title: "Plans end at the checkout",
        body: "A meal plan is only useful if it gets acted on. Each plan resolves into a grocery list, so members can shop for the week the same day they get it.",
      },
      {
        title: "One record per member",
        body: "Plan, attendance, billing and conversations all hang off a single member record, so the owner and the trainer are always looking at the same story.",
      },
      {
        title: "A CRM that stays in step",
        body: "The GoHighLevel integration connects leads and contacts with the CRM and automations the gym already runs, instead of asking the team to replace them.",
      },
      {
        title: "Built for three audiences",
        body: "Owners, trainers and members each get the surface they need, and everything adapts down to the phone, which is where members spend their time.",
      },
    ],
  },
];

export const getCaseStudy = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug);
