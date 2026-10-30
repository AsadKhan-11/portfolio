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
  /** Defaults to "web". Mobile studies are presented in phone frames. */
  platform?: "web" | "mobile";
  /** Overrides the default lede on the "Thinking behind it" section. */
  decisionsLede?: string;
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
    n: "02",
    title: "Vector Academy",
    tagline: "From first enquiry to first solo, on one platform.",
    meta: "Flight-training platform · 2026",
    year: "2026",
    role: "Full-stack development & AI integration",
    client: "Flight-training academy",
    type: "Academy operations platform",
    status: "In production · details anonymised",
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
    n: "03",
    title: "Veloura",
    tagline: "The operating system for a modern med spa.",
    meta: "Med-spa platform · 2026",
    year: "2026",
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
    platform: "mobile",
    n: "04",
    title: "Curbly",
    tagline: "Order from the truck down the street, before you get there.",
    meta: "Mobile app · Concept · 2026",
    year: "2026",
    role: "Product design & mobile development",
    client: "Self-initiated concept",
    type: "Mobile app for iOS & Android",
    status: "Concept build · working prototype with sample data",
    tags: ["React Native", "Live map", "Pickup ordering", "Vendor mode", "Order tracking"],
    card: "/work/cards/07-curbly.jpg",
    summary:
      "Curbly is a two-sided mobile marketplace for food trucks. Customers see which trucks are serving right now, order ahead and walk up to a pickup code. Truck owners run their day from the same app: a live queue, a menu with stock levels, earnings and a route for the week. It is a working prototype built to explore what a calmer, more premium take on the category could look like.",
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
      { value: 45, label: "Dishes across 10 sample trucks" },
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
        title: "Sample data that reads as real",
        body: "Ten trucks, forty-five dishes, reviews, orders and payouts make every screen feel lived-in, so the design is judged on its merits and not on empty states.",
      },
    ],
    decisionsLede: "The design choices that shape how Curbly looks, reads and feels in the hand.",
  },
];

export const getCaseStudy = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug);
