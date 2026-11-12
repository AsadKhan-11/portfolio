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
  /**
   * What the study is of. "site" is a marketing website: its page shows the
   * live site in a frame to scroll and resize, with no videos or screen
   * galleries. Anything else is an app, shown by its recorded tour, or by the
   * running app where one is deployed (see lib/liveApps.ts).
   */
  kind?: "app" | "site";
  /** Defaults to "web". Mobile studies are presented in phone frames. */
  platform?: "web" | "mobile";
  /** Overrides the default lede on the "Thinking behind it" section. */
  decisionsLede?: string;
  /**
   * Caption on the hero reel's frame. Defaults to "<title> · admin",
   * which only makes sense for the platform studies — a marketing site
   * reads better with its domain.
   */
  reelLabel?: string;
  /**
   * What to call this build in prose — "Visit the ___" and the closing
   * "Need a ___ like X?". Defaults to "app" for mobile studies and
   * "platform" otherwise; the marketing sites are neither.
   */
  noun?: string;
  n: string;
  title: string;
  tagline: string;
  /** Short line used on the work shelf */
  meta: string;
  year: string;
  /**
   * ISO date the study went live. Feeds datePublished on the Article and
   * uploadDate on each clip's VideoObject, both of which Google wants in
   * ISO 8601. Taken from the commit that added the study.
   */
  published: string;
  /** ISO date of the last substantive edit. Defaults to `published`. */
  updated?: string;
  role: string;
  client: string;
  type: string;
  status: string;
  /** Capability tags shown under the title */
  tags: string[];
  /** Only set once the product has a public URL. */
  liveUrl?: string;
  card: string;
  /** One line, shown large beside the portrait. Keep it under ~15 words. */
  pitch: string;
  /** Three short points (problem, what was built, why it works), under ~20 words each. */
  brief: { label: string; text: string }[];
  /** Shown under the facts, e.g. when client details have been changed. */
  note?: string;
  summary: string;
  /** Intro lines for the "What it does" and "Mobile" sections. */
  insideLede: string;
  phoneLede: string;
  challenge: string[];
  approach: string[];
  stats: Stat[];
  highlights: Highlight[];
  clips: Clip[];
  gallery: Shot[];
  phones: Shot[];
  decisions: { title: string; body: string }[];
}

export const isSiteStudy = (s: CaseStudy) => s.kind === "site";

/*
  The clips a case-study page actually plays, which is what its VideoObject
  markup may describe. A site shows none, a web app plays only the opening
  reel (the walkthroughs and gallery are gone from its page), and a mobile app
  still plays everything.
*/
export const shownClips = (s: CaseStudy): Clip[] =>
  isSiteStudy(s) ? [] : s.platform === "mobile" ? s.clips : s.clips.slice(0, 1);

/* Live builds that open the deployed site rather than a case-study page. */
export interface LiveBuild {
  key: string;
  shot: string;
  title: string;
  meta: string;
  domain: string;
  url: string;
}

/*
  Empty: every project now has a case study. The shelf and the "more work"
  rail still read this, so a build that ships before its study is written
  can be listed here as a card that opens the site, then moved across to
  CASE_STUDIES once there is something to show.
*/
export const LIVE_BUILDS: LiveBuild[] = [];

/* Media helpers bound to one project's folder under public/work/. */
const mediaFor = (dir: string) => ({
  desktop: (name: string, alt: string, caption?: string): Shot => ({
    src: `${dir}/stills/${name}.webp`,
    w: 2400,
    h: 1350,
    alt,
    caption,
  }),
  phone: (name: string, alt: string, caption?: string): Shot => ({
    src: `${dir}/stills/${name}.webp`,
    w: 1170,
    h: 2532,
    alt,
    caption,
  }),
  clip: (id: string, title: string, blurb: string, seconds: number): Clip => ({
    id,
    title,
    blurb,
    seconds,
    src: `${dir}/videos/${id}.mp4`,
    poster: `${dir}/videos/${id}-poster.webp`,
  }),
});

const { desktop, phone, clip } = mediaFor("/work/ironside");
const V = mediaFor("/work/vector-academy");
const VL = mediaFor("/work/veloura");
const VA = mediaFor("/work/vanta");
const LU = mediaFor("/work/lumiere");
const AU = mediaFor("/work/aurelle");

/* Simulator captures are 1206 x 2622. */
const CB = (() => {
  const base = mediaFor("/work/curbly");
  return {
    clip: base.clip,
    shot: (name: string, alt: string, caption?: string): Shot => ({
      src: `/work/curbly/stills/${name}.webp`,
      w: 1206,
      h: 2622,
      alt,
      caption,
    }),
  };
})();

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "ironside-gym",
    pitch: "An AI coach, trainer messaging and the whole gym back office, in one place.",
    brief: [
      { label: "The problem", text: "Spreadsheets, a CRM, DMs and separate apps. Nothing agrees, and trainers drown in admin." },
      { label: "What I built", text: "One platform for owners, trainers and members, with an AI coach that plans workouts, meals and groceries." },
      { label: "Why it works", text: "Everything hangs off one member record, and GoHighLevel keeps leads and the CRM in step." },
    ],
    note: "A confidential client platform. Names, branding and data have been changed.",
    n: "01",
    title: "Ironside",
    tagline: "One platform for the gym, its trainers and every member.",
    meta: "Gym platform · 2026",
    year: "2026",
    published: "2026-10-25",
    role: "Full-stack development & AI integration",
    client: "Strength & conditioning gym",
    type: "Gym management platform",
    status: "Confidential client work",
    tags: ["AI coach", "GoHighLevel integration", "Trainer–client messaging", "Billing & scheduling"],
    card: "/work/cards/04-ironside.jpg",
    summary:
      "Ironside runs a gym from one place: memberships, classes, billing and retail for the owner, programmes and messaging for trainers, and an AI coach that builds each member's workouts, meal plans and grocery lists. It connects to GoHighLevel so leads and contacts flow into the CRM the gym already uses.",
    insideLede:
      "The AI coach, nutrition, messaging and the CRM all work from the same member record, so each part makes the others more useful.",
    phoneLede:
      "Members and trainers live on their phones, so every screen adapts and navigation collapses into a tab bar with quick access to everything else.",
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
  {
    slug: "vector-academy",
    pitch: "An AI co-pilot that answers and scores every applicant, then carries them to enrolment.",
    brief: [
      { label: "The problem", text: "Prospective students go quiet if nobody replies within a day, while bookings and invoices live in separate tools." },
      { label: "What I built", text: "An AI co-pilot, aptitude scoring, a drag-and-drop pipeline, scheduling and billing in one console." },
      { label: "Why it works", text: "It answers only from knowledge staff approve, and hands over to a human when it is unsure." },
    ],
    note: "A confidential client platform. Names, branding and data have been changed.",
    n: "02",
    title: "Vector Academy",
    tagline: "From first enquiry to first solo, on one platform.",
    meta: "Flight-training platform · 2026",
    year: "2026",
    published: "2026-10-27",
    role: "Full-stack development & AI integration",
    client: "Flight-training academy",
    type: "Academy operations platform",
    status: "Confidential client work",
    tags: ["AI admissions co-pilot", "Aptitude scoring", "Pipeline & scheduling", "Billing & programs"],
    card: "/work/cards/05-vector-academy.jpg",
    summary:
      "Vector Academy runs a flight school from one place. An AI co-pilot answers prospective students around the clock and scores their aptitude, a pipeline carries each applicant through to enrolment, and the team schedules flights, sessions, programs and payments from the same console.",
    insideLede:
      "The co-pilot, the pipeline, scheduling and billing all work from the same applicant record, so each part makes the others more useful.",
    phoneLede:
      "Instructors and admissions staff work from the apron and the open day, so every screen adapts and navigation collapses into a tab bar.",
    challenge: [
      "Flight schools sell a high-value, high-anxiety product. Prospective students have dozens of questions about cost, medicals and time, and the best of them go quiet if nobody answers within a day. Behind the scenes, enquiries, bookings, lessons and invoices live in separate tools.",
      "The goal was a single platform that answers and qualifies applicants the moment they arrive, then carries them through enrolment, training and billing without anyone re-keying a record.",
    ],
    approach: [
      "Everything starts with the applicant. A short aptitude quiz scores each enquiry, the AI co-pilot answers their questions from the academy's own knowledge base, and anyone scoring highly lands in a high-value alert for a same-day call.",
      "From there the platform follows them: a drag-and-drop pipeline from enquiry to cadet, flights and open days with live capacity, instructor sessions with weather holds, program pricing, instalment billing and a pro shop. Staff curate what the co-pilot knows and stay in the loop; it hands over to a human whenever it is not sure.",
    ],
    stats: [
      { value: 17, label: "Connected modules" },
      { value: 5, label: "Pipeline stages, enquiry to cadet" },
      { value: 4, label: "Programs, first flight to commercial" },
      { value: 2, label: "Always-on AI jobs: answering and scoring" },
    ],
    highlights: [
      {
        kicker: "01 · AI co-pilot",
        title: "An advisor that never sleeps",
        body: "Prospective students ask the co-pilot about cost, medicals, timelines and aircraft, and get an answer drawn from the academy's own knowledge base. It can build a week-by-week study plan on request, and passes the conversation to an instructor when it is not confident.",
        points: [
          "Answers grounded in a knowledge base staff control",
          "Approved gold answers, persona and safety rules in one place",
          "Hands over to a human instead of guessing",
        ],
        shot: V.desktop("copilot", "The Co-pilot admin screen with the knowledge base and a live chat answering a cost question and building a study plan"),
      },
      {
        kicker: "02 · Aptitude scoring",
        title: "Every applicant arrives scored",
        body: "An aptitude quiz ranks every enquiry before anyone has picked up the phone. High scorers surface in a hot-lead alert with the AI's engagement signal beside them, so the team calls the right people first.",
        points: [
          "A weighted aptitude score on every applicant",
          "High-value alerts with one-click follow-up",
          "Lead quality tracked from enquiry to enrolment",
        ],
        shot: V.desktop("dashboard", "The Command Center dashboard with applicant velocity, lead quality and high-value alerts"),
      },
      {
        kicker: "03 · Pipeline",
        title: "From enquiry to cadet in five stages",
        body: "A board shows every opportunity by stage, with aptitude, track and source on each card. Moving someone forward is a drag, and a new opportunity takes seconds to add.",
        points: [
          "Drag-and-drop stages from New to Enrolled",
          "Source tracking on every applicant",
          "Average aptitude per stage at a glance",
        ],
        shot: V.desktop("pipeline", "The applicant pipeline board across five stages"),
      },
      {
        kicker: "04 · Flights & sessions",
        title: "Open days, fly-outs and lessons, scheduled",
        body: "Events carry live capacity so a full workshop is obvious at a glance, and one-to-one lessons are scheduled against an instructor and an aircraft, with weather holds handled as a first-class status.",
        points: [
          "Open days, workshops and fly-outs with capacity bars",
          "Lessons tied to an instructor and an aircraft",
          "Weather holds tracked, not lost in a spreadsheet",
        ],
        shot: V.desktop("flights", "The flights and events page with capacity and revenue stats"),
      },
      {
        kicker: "05 · Programs & billing",
        title: "Programs, instalments and a clean ledger",
        body: "Four programs from a first flight to a commercial foundation are priced and published from one screen. Every instalment, shop order and event booking lands in one ledger, with pending and failed payments separated out.",
        points: [
          "Programs switched on or off for the public site",
          "A single ledger across programs, shop and events",
          "Pending, refunded and failed payments called out",
        ],
        shot: V.desktop("programs-cards", "The training programs as pricing cards"),
      },
      {
        kicker: "06 · Curriculum & community",
        title: "Training that keeps cadets coming back",
        body: "Ground-school modules are organised by pillar with completion and score data, and a leaderboard and community feed keep cadets engaged between lessons, so the academy sees who is progressing and who has gone quiet.",
        points: [
          "Modules grouped by pillar, from airmanship to regulations",
          "Completion and average scores for every module",
          "A leaderboard that rewards consistent progress",
        ],
        shot: V.desktop("curriculum", "The curriculum hub with completion and scores per module"),
      },
    ],
    clips: [
      V.clip("tour", "Platform walkthrough", "From the dashboard through the pipeline, flights, programs and the co-pilot in twenty seconds.", 21),
      V.clip("pipeline", "Pipeline", "Moving applicants through the stages and adding a new opportunity.", 14),
      V.clip("copilot", "Co-pilot", "Browsing the knowledge base and safety rules, then testing the assistant with real questions and a study plan.", 21),
      V.clip("flights", "Flights & sessions", "Switching the events view, then searching the session schedule.", 12),
      V.clip("billing", "Billing", "Filtering the ledger to pending payments, then drilling into revenue.", 9),
    ],
    gallery: [
      V.desktop("dashboard-engagement", "Portal engagement, top performers and recent applicants", "Engagement"),
      V.desktop("applicants", "The applicants directory with aptitude scores", "Applicants"),
      V.desktop("sessions", "The session schedule with instructors and aircraft", "Sessions"),
      V.desktop("billing", "The billing ledger", "Billing"),
      V.desktop("reports-revenue", "A revenue report broken down by source", "Reports"),
      V.desktop("messages", "The applicant and cadet inbox", "Messages"),
      V.desktop("products", "The pro shop catalogue", "Pro shop"),
      V.desktop("orders", "Shop orders and fulfilment", "Orders"),
      V.desktop("community", "The cadet leaderboard and community feed", "Community"),
    ],
    phones: [
      V.phone("mobile-dashboard", "The dashboard on a phone", "Dashboard"),
      V.phone("mobile-applicants", "The applicants directory on a phone", "Applicants"),
      V.phone("mobile-copilot", "The co-pilot admin on a phone", "Co-pilot"),
    ],
    decisions: [
      {
        title: "Answers from the academy's own knowledge",
        body: "The co-pilot only answers from entries staff have written and approved, so it never invents a price, a policy or a promise about a medical.",
      },
      {
        title: "Hand over, don't guess",
        body: "When the co-pilot is not confident it says so, flags the question for an instructor and moves on. Staff review what it could not answer and turn the best of those into new knowledge.",
      },
      {
        title: "Score before the first call",
        body: "Every enquiry gets an aptitude score on arrival, so a small admissions team spends its time on the applicants most likely to enrol.",
      },
      {
        title: "One record from applicant to cadet",
        body: "The person who asked a question on Monday is the same record that books a lesson in March and pays an instalment in April, with their messages attached.",
      },
      {
        title: "Weather is a status, not an exception",
        body: "Flying is cancelled by the sky, not the schedule. Weather holds are tracked as their own state, so cadets are told early and nothing slips through.",
      },
      {
        title: "Made for instructors on the move",
        body: "The console adapts down to the phone, because instructors check the day's sessions from the apron, not from a desk.",
      },
    ],
  },
  {
    slug: "veloura",
    pitch: "Clients book and sign for themselves. The team runs the whole clinic from one place.",
    brief: [
      { label: "The problem", text: "Booking apps, stock spreadsheets, paper consent forms and a separate email tool, none of them talking." },
      { label: "What I built", text: "A client portal with online booking and e‑signed consent, plus a console with a workspace for each of five roles." },
      { label: "Why it works", text: "Rules like double-booking and permissions are enforced in the database, not just the interface." },
    ],
    n: "03",
    title: "Veloura",
    tagline: "The operating system for a modern med spa.",
    meta: "Med-spa platform · 2026",
    year: "2026",
    published: "2026-10-28",
    role: "Product design & full-stack development",
    client: "Medical aesthetics clinics",
    type: "Practice management platform",
    status: "Live · built for aesthetic clinics",
    tags: ["Online booking", "E-signed consent", "Role-based access", "Client portal"],
    liveUrl: "https://veloura-omega-roan.vercel.app",
    card: "/work/cards/06-veloura.jpg",
    summary:
      "Veloura runs an aesthetics clinic from one place. Clients create an account, sign their consent form electronically and book their own visits; the team schedules providers and rooms, keeps rich client records, sells memberships, manages stock and runs marketing, each person seeing exactly the workspace their role needs.",
    insideLede:
      "Booking, consent, records, payments and marketing all hang off the same client record, so each part makes the others more useful.",
    phoneLede:
      "Clients book from their phones and the team works between treatments, so every screen adapts and navigation collapses into a tab bar.",
    challenge: [
      "A typical clinic stitches its business together from a booking app, a spreadsheet for stock, paper consent forms and a separate email tool. Clients get a patchy experience, front-desk staff re-key the same details, and the owner can never see the whole business in one place.",
      "The goal was one platform that gives clients a beautiful way to book and sign up, and gives every member of the team a workspace that matches their job, without anyone leaving the system to get something done.",
    ],
    approach: [
      "Veloura has two front doors. Clients get a portal where they sign up, review and e-sign their consent and medical history, book a treatment with live availability, and manage visits, memberships and billing. The team gets a console with a workspace for each of five roles: owner, practice manager, provider, front desk and marketing.",
      "Everything runs on a real database with row-level security, so permissions and double-booking rules are enforced at the data layer, not just hidden in the interface. A client sees only their own records, a provider sees their own schedule, and the owner sees the whole practice.",
    ],
    stats: [
      { value: 12, label: "Back-office modules" },
      { value: 5, label: "Staff roles, each with its own workspace" },
      { value: 2, label: "Portals: the team console and the client portal" },
      { value: 24, suffix: "/7", label: "Online booking and e-signing" },
    ],
    highlights: [
      {
        kicker: "01 · Online booking",
        title: "Clients book themselves, any time",
        body: "Clients choose a treatment, a provider and a time from live availability worked out from provider hours, rooms and existing bookings. Confirming takes one tap, and the visit lands in their account and on the team's calendar straight away.",
        points: [
          "First available, or a preferred provider",
          "Open slots calculated, never typed in by hand",
          "Free to change or cancel up to 24 hours before",
        ],
        shot: VL.desktop("portal-book", "The booking page with provider choice, a day strip, a time grid and a live visit summary"),
      },
      {
        kicker: "02 · E-signed consent",
        title: "From sign-up to signed consent in a minute",
        body: "New clients create an account, then review and sign their consent and medical history electronically before their first treatment. The signed form is filed on their record, and the team can see at a glance who is cleared and who is not.",
        points: [
          "Self-service sign-up with a password-strength check",
          "Consent and intake signed on any device",
          "Consent status visible on every client profile",
        ],
        shot: VL.desktop("consent", "The consent and medical history form ready to be signed electronically"),
      },
      {
        kicker: "03 · Scheduling",
        title: "A calendar that knows the clinic",
        body: "A day, week and month calendar that understands providers, rooms and treatments. Double-bookings are refused by the database itself, and appointments can be dragged to a new time when plans change.",
        points: [
          "Provider, room and treatment-aware booking",
          "Conflicts blocked at the data layer",
          "Filter by treatment category or status",
        ],
        shot: VL.desktop("calendar-week", "The weekly calendar across four providers"),
      },
      {
        kicker: "04 · Client records",
        title: "Every client, one living profile",
        body: "Visit history, favourite treatments, upcoming appointments, consent status, notes and follow-up tasks all live on one profile, with before-and-after photo records alongside. Whoever opens it sees the whole story.",
        points: [
          "Lifetime value, visits and next appointment at a glance",
          "Clinical and preference notes with follow-up tasks",
          "Before-and-after photo records per treatment",
        ],
        shot: VL.desktop("client-profile", "A client profile with history, consent, notes and upcoming visits"),
      },
      {
        kicker: "05 · Growth",
        title: "Campaigns, memberships and referrals that pay back",
        body: "Campaigns go to client segments and report opens, clicks, bookings and revenue. Memberships, reviews and referrals sit alongside, so the clinic can see which marketing actually fills the calendar.",
        points: [
          "Campaigns with opens, clicks, bookings and revenue",
          "Segments built from opted-in clients only",
          "Reviews, referrals and automated follow-ups",
        ],
        shot: VL.desktop("marketing", "Marketing campaigns with performance results"),
      },
      {
        kicker: "06 · Control",
        title: "The right view for every role",
        body: "The owner, practice manager, provider, front desk and marketing coordinator each see different pages, widgets and actions. Permissions are enforced in the database, so a provider can't open payments and a client can only ever see their own record.",
        points: [
          "Five roles with distinct pages and capabilities",
          "Team directory with schedules and performance",
          "Payments, refunds, inventory and reports for the owner",
        ],
        shot: VL.desktop("team", "The team directory with roles, schedules and production"),
      },
    ],
    clips: [
      VL.clip("tour", "Platform walkthrough", "The owner's view: the dashboard, calendar, clients, payments and reports in seventeen seconds.", 17),
      VL.clip("journey", "Sign-up to booking", "A new client creates an account, signs the consent form electronically and books a visit, all in about forty seconds.", 39),
      VL.clip("calendar", "Scheduling", "Day, week and month views, a treatment filter and the new-appointment form.", 16),
      VL.clip("clients", "Clients", "Searching and filtering the directory, then moving through a client's appointments, purchases, notes and photo records.", 19),
      VL.clip("marketing", "Marketing", "Campaigns, client segments, reviews and referrals, and automations.", 12),
    ],
    gallery: [
      VL.desktop("dashboard-insights", "Revenue by category and provider production on the owner dashboard", "Insights"),
      VL.desktop("leads", "The lead pipeline from first inquiry to converted client", "Leads"),
      VL.desktop("treatments", "The treatment menu with pricing and providers", "Treatments"),
      VL.desktop("payments", "Transactions, outstanding balances and gift cards", "Payments"),
      VL.desktop("memberships", "Membership plans and members", "Memberships"),
      VL.desktop("inventory", "Stock levels with low-stock alerts", "Inventory"),
      VL.desktop("reports", "Revenue reporting across the practice", "Reports"),
      VL.desktop("signup", "The client sign-up page", "Sign-up"),
      VL.desktop("portal-billing", "A client's billing page in the portal", "Client billing"),
    ],
    phones: [
      VL.phone("mobile-portal", "The client portal home on a phone", "Client portal"),
      VL.phone("mobile-book", "Booking a visit on a phone", "Booking"),
      VL.phone("mobile-dashboard", "The owner dashboard on a phone", "Dashboard"),
    ],
    decisions: [
      {
        title: "Rules live in the database",
        body: "Double-bookings and permissions are enforced by the data layer, so the rules hold no matter how a request arrives, not just where the interface happens to hide a button.",
      },
      {
        title: "Availability is calculated",
        body: "Open slots come from provider hours, room availability and existing appointments, so clients only ever see times the clinic can really honour.",
      },
      {
        title: "Consent before treatment",
        body: "Clients are asked to sign before their first visit, and the status sits on their profile, so nothing depends on someone remembering to chase a form.",
      },
      {
        title: "One record per client",
        body: "History, notes, consent, purchases and photos hang off a single profile, so the front desk, the provider and the owner are always looking at the same story.",
      },
      {
        title: "Every role gets its own workspace",
        body: "Five roles see different pages and widgets, so people are shown what their job needs and nothing that isn't theirs to touch.",
      },
      {
        title: "Beautiful on both sides of the desk",
        body: "The client portal feels like the clinic's brand, and the team console is built for speed. Both adapt down to the phone.",
      },
    ],
  },
  {
    slug: "curbly",
    pitch: "Customers order ahead and walk up to a pickup code. Vendors run the day from the same app.",
    brief: [
      { label: "The problem", text: "Trucks move and sell out, so people find them by luck, and owners have no time for another tool." },
      { label: "What I built", text: "A two-sided mobile app: live discovery and ordering for customers, a queue and menu console for vendors." },
      { label: "Why it works", text: "Feed-first discovery, pickup codes and a one-tap order queue keep both sides fast." },
    ],
    platform: "mobile",
    n: "04",
    title: "Curbly",
    tagline: "Order from the truck down the street, before you get there.",
    meta: "Mobile app · 2026",
    year: "2026",
    published: "2026-10-31",
    role: "Product design & mobile development",
    client: "Self-initiated project",
    type: "Mobile app for iOS & Android",
    status: "Self-initiated · iOS & Android",
    tags: ["React Native", "Live map", "Pickup ordering", "Vendor mode", "Order tracking"],
    card: "/work/cards/07-curbly.jpg",
    summary:
      "Curbly is a two-sided mobile marketplace for food trucks. Customers see which trucks are serving right now, order ahead and walk up to a pickup code. Truck owners run their day from the same app: a live queue, a menu with stock levels, earnings and a route for the week. It is a self-initiated build exploring what a calmer, more premium take on the category could look like.",
    insideLede:
      "Two experiences share one app. Customers get discovery, ordering and tracking. Vendors get a console that fits in a pocket and survives a lunch rush.",
    phoneLede: "",
    challenge: [
      "Food trucks move, sell out and change their hours, so most people find them by luck or by scrolling an Instagram story. Ordering ahead is rare, and the owners are too busy at the window to manage another tool.",
      "The goal was an app that answers three questions fast: what is open near me, how long will it take, and how do I skip the line. And a vendor side simple enough to use with flour on your hands.",
    ],
    approach: [
      "Discovery is feed-first rather than map-first. A warm editorial home surfaces who is live, with the map as a card you can expand when you need it, instead of a full-screen grid of pins.",
      "Ordering is built around pickup: choose a time, tip the crew, get a four-character code. The vendor sees the same order arrive in a live queue and moves it from new to preparing to ready with one tap, and the customer's tracking screen follows along.",
    ],
    stats: [
      { value: 2, label: "Experiences in one app: customer and vendor" },
      { value: 20, label: "Screens designed and built" },
      { value: 45, label: "Dishes across 10 trucks" },
      { value: 1, label: "Codebase for iOS and Android" },
    ],
    highlights: [
      {
        kicker: "01 · Discover",
        title: "See who is serving right now",
        body: "The home screen leads with trucks that are live, with ETA, distance and rating on every card. Categories, search and an expandable map are one tap away.",
        points: [
          "Live-now carousel with pickup ETA and distance",
          "Photo-led category shortcuts and fast search",
          "Map card that expands when you want to browse by location",
        ],
        shot: CB.shot("explore", "The Curbly home screen with categories and live trucks"),
      },
      {
        kicker: "02 · Order",
        title: "A menu worth browsing",
        body: "Each truck gets a proper page: story, hours, a map pin, its most-loved dishes and a full menu with customisation. Adding to the order never leaves the page.",
        points: [
          "Most-loved row and category filters",
          "Size and add-on options with a live price",
          "Floating order bar that follows you around the app",
        ],
        shot: CB.shot("truck-menu", "A food truck's menu with popular dishes and categories"),
      },
      {
        kicker: "03 · Pickup",
        title: "Skip the line with a pickup code",
        body: "Once an order is placed, the tracking screen shows the walk to the truck, a progress bar, the order status and a four-character code to show at the window.",
        points: [
          "Live route from you to the truck",
          "Step-by-step status from confirmed to picked up",
          "Large pickup code with a scannable QR",
        ],
        shot: CB.shot("tracking", "The order tracking screen with a map and pickup code"),
      },
      {
        kicker: "04 · Vendor mode",
        title: "Run the truck from your pocket",
        body: "Owners switch into a dashboard built for speed: go live with one switch, watch the day's revenue, accept orders and keep an eye on stock.",
        points: [
          "Go-live switch with location and closing time",
          "Revenue, orders, average ticket and an hourly sales chart",
          "Low-stock alerts and a next-stop route card",
        ],
        shot: CB.shot("vendor-today", "The vendor dashboard showing today's revenue and sales by hour"),
      },
    ],
    clips: [
      CB.clip("tour", "Customer tour", "From the welcome screen to the live map, a truck's page and its menu.", 25),
      CB.clip("order", "Placing an order", "Customise a dish, check out with Apple Pay and follow the order to pickup.", 16),
      CB.clip("vendor", "A day as the vendor", "Go live, accept orders through the queue, manage the menu and check earnings.", 15),
    ],
    gallery: [
      CB.shot("welcome", "The Curbly welcome screen", "Welcome"),
      CB.shot("explore-live", "Trucks that are live near you", "Live near you"),
      CB.shot("explore-map", "The map card with live and closed trucks", "On the map"),
      CB.shot("search", "Search with filters, trending dishes and results", "Search"),
      CB.shot("truck", "A truck's page with stats and map", "Truck page"),
      CB.shot("item", "Customising a dish with size and add-ons", "Customise"),
      CB.shot("cart", "The order summary with pickup time, tip and payment", "Checkout"),
      CB.shot("orders", "Active and past orders", "Activity"),
      CB.shot("saved", "Saved trucks", "Saved"),
      CB.shot("profile", "The profile and Curbly Pass", "Profile"),
      CB.shot("vendor-queue", "The vendor's live order queue", "Order queue"),
      CB.shot("vendor-menu", "Menu management with stock levels", "Menu & stock"),
      CB.shot("vendor-earnings", "Weekly earnings and payouts", "Earnings"),
      CB.shot("vendor-route", "The day's route with stops on a map", "Route planner"),
      CB.shot("vendor-schedule", "The weekly schedule of stops", "Schedule"),
    ],
    phones: [],
    decisions: [
      {
        title: "Warm, not loud",
        body: "A cream canvas, deep forest green and a single citrus accent give the category a more premium feel than the usual dark map with neon pins.",
      },
      {
        title: "The map is a card",
        body: "Most people want to know what is good, not where the pins are. Discovery leads with photography and ETAs, and the map expands when you ask for it.",
      },
      {
        title: "Pickup, not payment at the window",
        body: "Orders are paid in the app and collected with a code, so the truck's window stays fast and nobody fumbles with a card in the rain.",
      },
      {
        title: "One app, two modes",
        body: "Owners are customers too. A single switch moves between the two experiences, which keeps the codebase and the design system shared.",
      },
      {
        title: "Built for thumbs",
        body: "A floating tab bar, big tap targets and bottom sheets for secondary actions keep every common action within reach of one hand.",
      },
      {
        title: "Content that feels lived-in",
        body: "Ten trucks, forty-five dishes, reviews, orders and payouts make every screen feel lived-in, so the design is judged on its merits and not on empty states.",
      },
    ],
    decisionsLede: "The design choices that shape how Curbly looks, reads and feels in the hand.",
  },
  {
    slug: "vanta-aesthetics",
    kind: "site",
    pitch: "A clinic site that sells restraint, built around one scroll-driven centrepiece.",
    brief: [
      { label: "The problem", text: "Aesthetics sites all look alike: stock smiles, pastel gradients, a price list. None of them read as expensive." },
      { label: "What I built", text: "A dark editorial site with a scroll-driven device render, a tabbed treatment menu and a before-and-after compare." },
      { label: "Why it works", text: "The design withholds. Restraint is what this kind of clinic sells, so the site has to sell it first." },
    ],
    note: "A self-initiated project. The clinic, the practitioner and every photograph are fictional, and the device render and results are labelled illustrative throughout the site.",
    n: "05",
    title: "Vanta Aesthetics",
    tagline: "Precision, refined — a luxury aesthetics clinic with nothing to prove.",
    meta: "Aesthetics clinic · 2026",
    year: "2026",
    published: "2026-11-06",
    role: "Design & front-end development",
    client: "Self-initiated project",
    type: "Clinic marketing site",
    status: "Live · self-initiated",
    tags: ["Scroll-driven 3D", "Editorial layout", "Before-and-after compare", "Enquiry capture"],
    liveUrl: "https://vanta-aesthetics.vercel.app",
    reelLabel: "vanta-aesthetics.vercel.app",
    noun: "site",
    card: "/work/cards/01-vanta.jpg",
    summary:
      "Vanta is a site for a high-end aesthetics clinic, built to look like somewhere expensive rather than somewhere eager. Eleven sections move from a full-bleed opening through a tabbed treatment menu, a device render that turns as you scroll, a before-and-after compare and an enquiry form that asks what someone is interested in before it asks anything else.",
    insideLede:
      "Every section is doing one job, and the page is arranged so each one lands on its own screen rather than competing for attention.",
    phoneLede:
      "Most clinic traffic arrives on a phone, so the editorial layout rebuilds itself for a single column without losing the restraint that makes it work.",
    challenge: [
      "Open five aesthetics clinic sites and you will see the same one: a smiling stock portrait, a soft gradient, a grid of treatment cards and a price list. They all signal the same thing, which is that the clinic wants your booking. None of them signal that the clinic is worth the money.",
      "The brief I set myself was to build the opposite. A site that holds back — dark, quiet, mostly empty — and lets a small number of deliberate moments do the persuading. If restraint is what the clinic is selling in the treatment room, the site has to demonstrate it first.",
    ],
    approach: [
      "The page is built as a sequence of full-height sections, each with a single idea. Black stone and bone type carry most of it; gold appears perhaps four times in the whole document, which is what makes it mean anything when it does. Treatments live in a vertical tab menu rather than a card grid, so the visitor reads one at a time instead of scanning a price list.",
      "The centrepiece is a device render that rotates through a full turn as you scroll past it, with four callouts annotating the hardware as it comes round. It is the one piece of spectacle on the site, and it earns its place by explaining something — the technology section is where a clinic usually hand-waves, and here it is the part that holds you longest.",
    ],
    stats: [
      { value: 11, label: "Sections, hero to enquiry" },
      { value: 5, label: "Treatment categories, one panel each" },
      { value: 360, suffix: "°", label: "Of scroll-linked rotation on the render" },
      { value: 4, label: "Before-and-after categories" },
    ],
    highlights: [
      {
        kicker: "01 · The opening",
        title: "A first screen that withholds",
        body: "Full-bleed portrait, two words of type and a single gold full stop. No value proposition, no badges, no scrolling marquee of logos. The only instruction on the screen is to keep going.",
        points: [
          "Type set large enough to be the whole composition",
          "One accent colour, used once",
          "Location and coordinates as quiet editorial furniture",
        ],
        shot: VA.desktop("hero", "The Vanta hero: Precision, Refined. over a full-bleed portrait"),
      },
      {
        kicker: "02 · The treatment menu",
        title: "One treatment at a time, not a price grid",
        body: "Five categories sit as collapsed vertical panels. Opening one expands it to fill the frame with its own photograph and copy while the others compress to spines, so the visitor reads rather than scans.",
        points: [
          "Injectables, skin, laser, body and wellness",
          "Vertical spines keep the whole menu visible at once",
          "Each panel carries its own consultation prompt",
        ],
        shot: VA.desktop("treatments", "The treatment menu with Injectables open and the other four categories collapsed to spines"),
      },
      {
        kicker: "03 · The device",
        title: "A render that turns as you read",
        body: "The technology section pins while a device render rotates through a full turn, driven entirely by scroll position. Four callouts annotate the optics, the emitter ring, the control base and the sensor array as each comes into view.",
        points: [
          "Rotation tied to scroll, with a live degree readout",
          "Four hardware callouts timed to the turn",
          "Labelled an illustrative render, not a product claim",
        ],
        shot: VA.desktop("technology-detail", "The device render part-way through its rotation with the controlled-energy callout showing"),
      },
      {
        kicker: "04 · Platforms",
        title: "The part most clinics hand-wave",
        body: "Laser, RF and skin analysis each get a plain-language explanation beside an animated diagram showing focal point, depth and region of interest. It is the section that answers what the machine actually does.",
        points: [
          "Three platforms, selectable from a list",
          "Diagram redraws for each platform",
          "Written to be understood, not to impress",
        ],
        shot: VA.desktop("platforms", "The platforms section with the laser diagram showing focal point and depth"),
      },
      {
        kicker: "05 · The protocol",
        title: "Assess, refine, maintain",
        body: "The clinic's method as three steps against a single portrait, scrolled through one at a time. It replaces the usual bullet list of promises with something that reads like a position: nothing rushed, nothing overdone.",
        points: [
          "Three stages, each on its own screen",
          "Portrait held steady while the copy advances",
          "Ends on a consultation, not a booking button",
        ],
        shot: VA.desktop("protocol", "The Vanta Protocol section with the assess step and a held portrait"),
      },
      {
        kicker: "06 · The enquiry",
        title: "Ask what they want before asking who they are",
        body: "The contact form opens with the treatments someone is interested in as selectable chips — including an honest \"not sure yet\" — then collects name, email and an optional phone number. Three fields are required and the rest can be skipped.",
        points: [
          "Interest captured as chips, not a dropdown",
          "A deliberate not-sure-yet option",
          "Phone optional, message free-form",
        ],
        shot: VA.desktop("contact-form", "The enquiry form with treatment interest chips and three required fields"),
      },
    ],
    clips: [
      VA.clip("tour", "The full page", "Hero to closing in ten stops: the treatment menu, the device render, the platforms diagram, the protocol and the enquiry form.", 16),
      VA.clip("technology", "The device render", "Scrolling the technology section turns the render through a full rotation while the four hardware callouts come round.", 11),
      VA.clip("treatments", "The treatment menu", "Opening each of the five categories in turn, with the panels expanding and compressing as the selection moves.", 11),
    ],
    gallery: [
      VA.desktop("treatments-menu", "The treatment menu header with all five categories collapsed", "Treatment menu"),
      VA.desktop("technology", "The device render at the start of its rotation", "Technology"),
      VA.desktop("protocol-steps", "The refine and maintain steps of the protocol", "Protocol"),
      VA.desktop("results", "The before-and-after compare with a draggable divider and category filter", "Results"),
      VA.desktop("provider", "The practitioner profile with an illustrative portrait", "The practitioner"),
      VA.desktop("clinic-grid", "The clinic space as a staggered photographic grid", "The space"),
      VA.desktop("experience", "The consultation-to-care section with discover and design", "The experience"),
      VA.desktop("closing", "The closing call to action over a darkened interior", "Closing"),
    ],
    phones: [
      VA.phone("mobile-hero", "The hero on a phone, type stacked over the portrait"),
      VA.phone("mobile-treatments", "The treatment menu as stacked panels"),
      VA.phone("mobile-protocol", "The protocol steps in a single column"),
      VA.phone("mobile-clinic", "The clinic space grid on a phone"),
      VA.phone("mobile-contact", "The enquiry form with interest chips wrapped to the width"),
    ],
    decisions: [
      {
        title: "Gold, four times",
        body: "The accent appears on the hero full stop, the active treatment rule, the rotation readout and the primary button. Spending it anywhere else would have made it decoration instead of signal.",
      },
      {
        title: "Tabs instead of cards",
        body: "A card grid invites comparison shopping on price. A vertical tab menu makes the visitor open one treatment at a time and actually read it, which is the behaviour a consultation-led clinic wants.",
      },
      {
        title: "The render had to explain something",
        body: "A spinning object for its own sake is a gimmick. Tying the rotation to four hardware callouts turns it into the clearest section on the page, which is why it sits where a clinic usually says the least.",
      },
      {
        title: "Everything illustrative is labelled",
        body: "The render, the before-and-afters and the practitioner portrait all carry a visible label saying so. A clinic site that implies real patient results it does not have is a liability, and the labels cost nothing.",
      },
      {
        title: "One idea per screen",
        body: "Sections are sized so each lands on its own viewport. It makes the page longer than it strictly needs to be, and it is the main reason the site reads as unhurried rather than busy.",
      },
    ],
    decisionsLede: "Why a clinic site that says less ends up being more convincing.",
  },
  {
    slug: "lumiere-aesthetics",
    kind: "site",
    pitch: "The warm counterpart to Vanta: the same restraint, read as welcome rather than exclusive.",
    brief: [
      { label: "The problem", text: "A med spa has to feel clinical enough to trust and warm enough to walk into. Most pick one and lose the other." },
      { label: "What I built", text: "A light editorial site with a scroll-driven treatment carousel, a drag-to-compare slider and a consultation request form." },
      { label: "Why it works", text: "Warm stone and serif type carry the welcome; the plain, specific copy carries the credibility." },
    ],
    note: "A self-initiated project. Dr. Amelia Hart is a fictional practitioner, labelled as such on the site, and all imagery and testimonials are illustrative.",
    n: "06",
    title: "Lumière Aesthetics",
    tagline: "Enhance what makes you, you — a med spa that sounds like a person.",
    meta: "Aesthetics clinic · 2026",
    year: "2026",
    published: "2026-11-06",
    role: "Design & front-end development",
    client: "Self-initiated project",
    type: "Clinic marketing site",
    status: "Live · self-initiated",
    tags: ["Scroll-driven carousel", "Drag-to-compare", "Editorial layout", "Consultation capture"],
    liveUrl: "https://lumi-re-aesthetics.vercel.app",
    reelLabel: "lumi-re-aesthetics.vercel.app",
    noun: "site",
    card: "/work/cards/02-lumiere.jpg",
    summary:
      "Lumière is the warm answer to the same brief that produced Vanta. Thirteen sections move from a hero through a scroll-driven treatment carousel, a sequenced signature plan, a drag-to-compare before-and-after, a practitioner profile and a consultation request. Where Vanta withholds, Lumière explains — and says out loud when the right answer is not yet, or not at all.",
    insideLede:
      "Warm stone, serif display type and a lot of air, with the interactive moments placed where a visitor is deciding rather than browsing.",
    phoneLede:
      "The carousel, the compare slider and the form are all built for a thumb first, since this is the kind of site people open in bed at eleven at night.",
    challenge: [
      "A med spa sits in an awkward middle. Lean too clinical and it reads as a dermatology waiting room; lean too soft and it reads as a beauty salon that might not know what it is injecting. The site has to earn clinical trust and still feel like somewhere you would want to spend an afternoon.",
      "Vanta answered a version of this brief by withholding. I wanted the opposite answer to the same question: what does restraint look like when it is warm? Lumière is that build — same discipline about what to leave out, completely different temperature.",
    ],
    approach: [
      "The palette is warm stone, cream and a deep forest green used for the one dark panel on the page. Display type is a serif, which does most of the work of making a clinical subject feel unhurried. Nearly every section is built around a single photograph and a short paragraph, with enough air that nothing feels like it is being sold at you.",
      "Two interactions carry the persuading. The treatment carousel is driven by vertical scroll, so six treatments pass sideways through a pinned frame as you read down the page. The before-and-after is a drag-to-compare slider rather than two images side by side, which makes the difference something the visitor discovers themselves instead of something the clinic asserts.",
    ],
    stats: [
      { value: 13, label: "Sections, hero to FAQ" },
      { value: 6, label: "Treatments in the scroll-driven carousel" },
      { value: 4, label: "Stages in the signature plan" },
      { value: 3, label: "Journal articles seeded" },
    ],
    highlights: [
      {
        kicker: "01 · The opening",
        title: "A hero that makes a promise, not a claim",
        body: "Serif display type set against a warm portrait, with the whole proposition in four words and a paragraph that talks about how someone wants to feel rather than what the clinic sells.",
        points: [
          "Enhance what makes you, you",
          "Two calls to action, neither of them urgent",
          "Location set as a quiet eyebrow above the headline",
        ],
        shot: LU.desktop("hero", "The Lumière hero with serif display type over a warm portrait"),
      },
      {
        kicker: "02 · Treatments",
        title: "Six treatments that move as you read",
        body: "The treatments section pins while six cards travel sideways through the frame, driven by vertical scroll. Each one carries its own photograph and a sentence that describes the result rather than the procedure.",
        points: [
          "Vertical scroll drives horizontal movement",
          "Botox through to wellness and IV therapy",
          "Copy written about outcomes, not technique",
        ],
        shot: LU.desktop("treatments-cards", "The treatment carousel part-way through, with four cards visible"),
      },
      {
        kicker: "03 · The Signature",
        title: "A plan, sequenced, not a package",
        body: "The clinic's flagship offer is presented as four stages — consultation, written plan, conservative delivery, scheduled follow-up — which quietly makes the point that it is not a one-visit purchase.",
        points: [
          "Four stages, numbered and ordered",
          "Explicitly not a one-size package",
          "Follow-up framed as part of the work",
        ],
        shot: LU.desktop("signature", "The Natural Refresh signature section with its four numbered stages"),
      },
      {
        kicker: "04 · Refresh, don't reinvent",
        title: "A difference you find yourself",
        body: "A drag-to-compare slider over a single portrait. Nothing is claimed in the copy beyond the standard the clinic holds itself to — the visitor drags the divider and decides what they think, which is considerably more persuasive than a pair of images.",
        points: [
          "Draggable divider with before and after labels",
          "Marked as an illustrative example",
          "Copy argues for restraint, not for the treatment",
        ],
        shot: LU.desktop("compare", "The before-and-after compare slider with the divider near the centre"),
      },
      {
        kicker: "05 · Why Lumière",
        title: "The one dark panel on the page",
        body: "Four pillars on deep forest green, placed at the point where a visitor has stopped browsing and started deciding. The single tonal shift on the whole site marks it as the section that matters.",
        points: [
          "Personalised plans, natural results, modern technique, privacy",
          "The only inverted panel in the document",
          "Sits immediately before the proof and the practitioner",
        ],
        shot: LU.desktop("why", "The why-Lumière panel in deep green with its four pillars"),
      },
      {
        kicker: "06 · The consultation request",
        title: "A form that reads like a conversation",
        body: "Full name, phone, email, a treatment of interest and an open field for anything else. The heading asks whether someone is ready to feel like themselves again, and the copy promises an honest plan including whether the answer is to do nothing.",
        points: [
          "Five fields, most of them optional",
          "Treatment of interest as a select, not a quiz",
          "Explicitly no-obligation, no-pressure framing",
        ],
        shot: LU.desktop("contact", "The consultation request form beside its invitation copy"),
      },
    ],
    clips: [
      LU.clip("tour", "The full page", "Hero to FAQ in ten stops: the approach, the carousel, the signature plan, the compare slider, the space and the consultation form.", 16),
      LU.clip("treatments", "The treatment carousel", "Scrolling down moves six treatment cards sideways through a pinned frame.", 12),
      LU.clip("compare", "Drag to compare", "The before-and-after divider pulled across the portrait and back.", 8),
    ],
    gallery: [
      LU.desktop("approach", "The approach section with its three principles", "The approach"),
      LU.desktop("treatments", "The treatment carousel at the start of its travel", "Treatments"),
      LU.desktop("stats", "Practice figures set as three large numerals", "By the numbers"),
      LU.desktop("space-grid", "The studio photographed as an offset collage", "The space"),
      LU.desktop("about", "The practitioner profile for Dr. Amelia Hart", "The practitioner"),
      LU.desktop("testimonial", "A client experience set as a centred pull quote", "In their words"),
      LU.desktop("journal", "Three journal articles as a card row", "Journal"),
      LU.desktop("closing", "The closing invitation over the studio interior", "Closing"),
    ],
    phones: [
      LU.phone("mobile-hero", "The hero on a phone with the portrait below the headline"),
      LU.phone("mobile-treatments", "The treatment carousel as a single-column scroll"),
      LU.phone("mobile-space", "The studio collage restacked for a phone"),
      LU.phone("mobile-about", "The practitioner profile on a phone"),
      LU.phone("mobile-contact", "The consultation request form on a phone"),
    ],
    decisions: [
      {
        title: "Same brief, opposite temperature",
        body: "Lumière exists because Vanta answered the question one way. Building the warm version of the same discipline was the point — it is the clearest way to show that restraint is a method, not a colour palette.",
      },
      {
        title: "Serif for a clinical subject",
        body: "A serif display face does most of the work of making injectables feel unhurried. Pair it with a neutral sans for body copy and the page reads as considered rather than medical.",
      },
      {
        title: "Scroll drives the carousel",
        body: "Horizontal scrollers get missed on desktop and fought with on mobile. Pinning the section and moving the cards with vertical scroll means the whole set is seen without anyone having to discover a gesture.",
      },
      {
        title: "Let them drag it",
        body: "A side-by-side before-and-after is a claim. A slider the visitor moves themselves is an experience, and it fits a clinic whose whole argument is that the best result is the one nobody can name.",
      },
      {
        title: "One dark panel, placed deliberately",
        body: "The single inverted section lands where browsing turns into deciding. Using the tonal shift once makes it function as punctuation; using it three times would have made it a pattern.",
      },
      {
        title: "Say when the answer is no",
        body: "The approach copy says some of the best advice is not yet, or not at all. For a category built on upselling, a clinic willing to say that in writing is the most credible thing on the page.",
      },
    ],
    decisionsLede: "The same restraint as Vanta, turned warm — and the choices that made the difference.",
  },
  {
    slug: "aurelle",
    kind: "site",
    pitch: "A clinic site built for the person who is nervous about walking in.",
    brief: [
      { label: "The problem", text: "Aesthetics is a trust purchase made by someone quietly worried. Most clinic sites answer none of the worry." },
      { label: "What I built", text: "An editorial site that answers first: named practitioners, durations on every treatment, honest results and nine FAQs." },
      { label: "Why it works", text: "Every call to action asks for a conversation, never a card. It is the only thing a clinic can honestly sell online." },
    ],
    note: "A self-initiated project. The clinic, its practitioners and every photograph are fictional — the contact details use reserved example addresses — and the before-and-after comparisons carry a visible individual-results notice.",
    n: "07",
    title: "Aurelle",
    tagline: "Considered, never excessive — advanced aesthetics for someone who has not decided yet.",
    meta: "Skin wellness clinic · 2026",
    year: "2026",
    published: "2026-11-06",
    role: "Design & front-end development",
    client: "Self-initiated project",
    type: "Clinic marketing site",
    status: "Live · self-initiated",
    tags: ["Editorial layout", "Scroll-driven sequence", "Before-and-after compare", "Structured enquiry"],
    liveUrl: "https://aurelle-mauve-two.vercel.app",
    reelLabel: "aurelle-mauve-two.vercel.app",
    noun: "site",
    card: "/work/cards/03-aurelle.jpg",
    summary:
      "Aurelle is the third answer to the brief that produced Vanta and Lumière, and the only one aimed squarely at the visitor who has not decided yet. Fourteen sections move from a hero through a five-point position, a fifteen-treatment edit with a duration on every entry, a before-and-after documented in consistent light, a four-stage account of what an appointment is actually like, three named practitioners with their qualifications, and nine questions answered before anyone has to ask them.",
    insideLede:
      "Ivory, sand and espresso, with no accent colour anywhere — the display serif and its italic do all the emphasis the page needs.",
    phoneLede:
      "A clinic enquiry usually starts on a phone, in private, late. The page rebuilds to one column with the consultation button pinned to the bottom of the screen the whole way down.",
    challenge: [
      "Aesthetics is a trust purchase made by someone who is quietly worried — about looking overdone, about being upsold, about who is actually holding the needle. Most clinic sites answer none of that. They show a price list, a stock smile and a booking button, which is a sales page for a decision nobody makes from a sales page.",
      "Vanta answered this brief by withholding and Lumière by warming up. The third answer was the one neither of them took: build the whole page around the worry. Not reassurance in a paragraph somewhere, but every section doing a job the nervous visitor actually needs done.",
    ],
    approach: [
      "The palette is ivory, sand and espresso with no accent colour at all. A high-contrast display serif and its italic carry every piece of emphasis, and four of the fourteen sections invert to espresso — that tonal shift is the only other emphasis device the layout has. It is the hardest of the three sites to make work and the quietest when it does.",
      "What is unusual is how much of the page is load-bearing. The treatment edit attaches an approximate duration to all fifteen treatments. The practitioners are named with their qualifications. The comparisons say they were shot in consistent light and carry an individual-results notice. Nine FAQs answer the questions a clinic normally waits for a phone call to answer. None of it is decoration; all of it exists to make the enquiry easier to send.",
    ],
    stats: [
      { value: 15, label: "Treatments, each with a duration" },
      { value: 4, label: "Stages, consultation to aftercare" },
      { value: 9, label: "Questions answered before anyone asks" },
      { value: 3, label: "Practitioners named, with qualifications" },
    ],
    highlights: [
      {
        kicker: "01 · The opening",
        title: "A promise about the person, not the procedure",
        body: "Your most radiant self, set in a display serif beside an arched portrait, with one line of support copy under it. Nothing on the first screen names a treatment or a price.",
        points: [
          "Two words of proposition and a single sentence",
          "Book a consultation, or just explore the treatments",
          "Skin · science · self as the whole positioning",
        ],
        shot: AU.desktop("hero", "The Aurelle hero: Your most radiant self, beside an arched portrait"),
      },
      {
        kicker: "02 · The position",
        title: "Five words the clinic will be held to",
        body: "The first section to invert to espresso is a five-point manifesto — personalized, precision, natural, considered, human — with the heading pinned on the left while the points scroll past it.",
        points: [
          "Considered, never excessive, as the governing line",
          "Each point is a commitment rather than a benefit",
          "Sticky heading holds while the list advances",
        ],
        shot: AU.desktop("why", "The why-Aurelle section in espresso, showing personalized, precision and natural"),
      },
      {
        kicker: "03 · The treatment edit",
        title: "Fifteen treatments, and how long each one takes",
        body: "Four categories as pill tabs, each opening a panel of treatments as a disclosure list. Expanding a row reveals its description, an approximate duration and a prompt to discuss it — and swaps the photograph alongside.",
        points: [
          "Skin, injectables, devices and body",
          "An approximate duration on every treatment",
          "The photograph changes with the open row",
        ],
        shot: AU.desktop("treatments-skin", "The skin category with skin rejuvenation expanded and its duration showing"),
      },
      {
        kicker: "04 · The results",
        title: "Before and after, under the same light",
        body: "One compare frame rather than a wall of pairs, with the method stated beside it: each case documented honestly, in consistent light. The individual-results notice sits with the images instead of in a footer.",
        points: [
          "One case at a time, in a single frame",
          "Consistent light stated as the standard",
          "The divider is a labelled range input, so it works from the keyboard",
        ],
        shot: AU.desktop("results", "The before-and-after compare with the divider down the centre of a portrait"),
      },
      {
        kicker: "05 · The experience",
        title: "What actually happens, in four stages",
        body: "Consultation, personalization, treatment, aftercare — carried sideways through a pinned frame as you scroll down the page. It answers the question a first-timer will not ask out loud, which is what the appointment is going to be like.",
        points: [
          "Vertical scroll drives the track horizontally",
          "No pressure to decide, said at stage one",
          "Aftercare treated as part of the work",
        ],
        shot: AU.desktop("experience-steps", "The experience track mid-move, with consultation and personalization in frame"),
      },
      {
        kicker: "06 · The enquiry",
        title: "A form that asks how you would like to be reached",
        body: "Name, email and an interest are the only fields anyone must fill. Phone, contact method, date, time and message are all the visitor's to skip, and the interest list is the same fifteen treatments the edit offers.",
        points: [
          "Email, phone or WhatsApp, as a stated preference",
          "Not sure yet, I'd like advice, as a first-class option",
          "Three required fields on a nine-field form",
        ],
        shot: AU.desktop("contact", "The enquiry form with its required fields and the preferred-contact-method choices"),
      },
    ],
    clips: [
      AU.clip("tour", "The full page", "Hero to closing in ten stops: the philosophy, the five-point position, the treatment edit, the results, the experience track, the clinic, the team and the enquiry.", 16),
      AU.clip("experience", "The experience track", "Scrolling the experience section carries the four stages sideways through a pinned frame, consultation through to aftercare.", 16),
      AU.clip("treatments", "The treatment edit", "Working down the skin accordion — each row expanding with its duration and swapping the photograph — then switching category to body.", 15),
    ],
    gallery: [
      AU.desktop("philosophy", "The philosophy section with a pull quote beside a portrait", "The philosophy"),
      AU.desktop("treatments", "The treatment edit header with its four category tabs", "Treatment edit"),
      AU.desktop("results-compare", "A second before-and-after case, divided down the centre", "Results"),
      AU.desktop("space-grid", "The clinic interior as a two-image composition", "The clinic"),
      AU.desktop("team", "Three named practitioners with their roles and qualifications", "The team"),
      AU.desktop("testimonials", "Testimonial cards in a horizontal row under the section heading", "Kind words"),
      AU.desktop("faq", "The FAQ accordion with the first question open", "Questions"),
      AU.desktop("closing", "The closing call to action over a darkened portrait", "Closing"),
    ],
    phones: [
      AU.phone("mobile-hero", "The hero on a phone, with the consultation button pinned to the bottom"),
      AU.phone("mobile-treatments", "The treatment edit on a phone, categories as a scrolling row of pills"),
      AU.phone("mobile-results", "The before-and-after compare sized to a phone screen"),
      AU.phone("mobile-space", "The clinic section stacked into a single column"),
      AU.phone("mobile-contact", "The contact details above the enquiry form"),
    ],
    decisions: [
      {
        title: "No accent colour at all",
        body: "Vanta spends gold four times; Lumière has one green panel. Aurelle has neither. The display serif and its italic carry every piece of emphasis, and the four inverted sections do the rest. Take the accent away and the typography has to be right, which is the point.",
      },
      {
        title: "A duration on every treatment",
        body: "Fifteen treatments, fifteen approximate durations. It costs a line each and it answers the question sitting behind a lot of hesitation — how much of my day is this — without anyone having to ask it.",
      },
      {
        title: "One source of truth for the treatment list",
        body: "The enquiry form's interest list is the same fifteen treatments as the edit, plus an explicit not-sure-yet. Nobody has to translate between what they read and what they pick, and there is no second list to fall out of date.",
      },
      {
        title: "The people are named",
        body: "Three practitioners with their roles and qualifications, rather than a stock line about our team. For a trust purchase this is the highest-value section on the page, which is why it gets real portraits and real space.",
      },
      {
        title: "Nine FAQs is not too many",
        body: "Every one of them is a question a clinic actually fields by phone — what happens on a first visit, how to prepare, whether treatments combine. Answering them on the page costs a scroll and saves the visitor the call they were never going to make.",
      },
      {
        title: "Honest about what the images are",
        body: "The comparisons state they were documented in consistent light, and the individual-results notice sits next to the picture rather than in the footer. A clinic site that implies results it cannot evidence is a liability, and saying so plainly costs nothing.",
      },
    ],
    decisionsLede: "Why a page this long reads as careful rather than exhausting.",
  },
];

export const getCaseStudy = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug);

/*
  Dropping a field into the middle of a sentence. Only the first letter
  lowers: toLowerCase() on the whole string turns "iOS & Android" into
  "ios & android" and "AI integration" into "ai integration".
*/
const midSentence = (text: string) => text.charAt(0).toLowerCase() + text.slice(1);

/** "Curbly — mobile app for iOS & Android case study" */
export const typeInSentence = (s: CaseStudy) => midSentence(s.type);

/** "Veloura took product design & full-stack development, start to finish." */
export const roleInSentence = (s: CaseStudy) => midSentence(s.role);
