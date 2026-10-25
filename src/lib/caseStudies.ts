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

export interface CaseStudy {
  slug: string;
  n: string;
  title: string;
  tagline: string;
  /** Short line used on the work shelf */
  meta: string;
  year: string;
  role: string;
  type: string;
  status: string;
  stack: string[];
  /** Only set once the demo is actually deployed. */
  liveUrl?: string;
  card: string;
  summary: string;
  challenge: string[];
  approach: string[];
  stats: { value: string; label: string }[];
  highlights: Highlight[];
  clips: Clip[];
  gallery: Shot[];
  phones: Shot[];
  decisions: { title: string; body: string }[];
}

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
    tagline: "A complete gym back office, rebuilt as a front-end demo.",
    meta: "Gym platform · 2026",
    year: "2026",
    role: "Design & front-end engineering",
    type: "Admin platform · 17 modules",
    status: "Front-end demo · fictional data",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Playwright"],
    card: "/work/cards/04-ironside.jpg",
    summary:
      "Ironside is a front-end recreation of the kind of gym-management platform I build professionally: members, leads, class scheduling, billing, retail and community in one back office. The brand, the people and every figure are invented, so the whole product can be shown in full.",
    challenge: [
      "Back-office software is the hardest kind to make look good. It is dense, stateful, and judged on a single question: does it actually work when you click it?",
      "The brief I set myself was a product that feels like one coherent system across seventeen sections, with no backend to lean on, and with nothing in it that could be traced to a real business.",
    ],
    approach: [
      "I started from the structure of a real operations platform and rebuilt every screen from scratch in code, with its own name, palette and typography. No source, content or records were reused, and all of the data is generated.",
      "Every screen is genuinely interactive. Filters filter, columns sort, forms validate, drawers open, leads drag between stages, classes take bookings and capacity updates. State that affects more than one page, like the unread and failed-payment badges, lives above the page tree so the whole product stays in agreement with itself.",
    ],
    stats: [
      { value: "17", label: "Connected modules" },
      { value: "184", label: "Generated members" },
      { value: "1,900+", label: "Generated payments" },
      { value: "0", label: "Backend calls" },
    ],
    highlights: [
      {
        kicker: "01 · Command centre",
        title: "A dashboard that reads in seconds",
        body: "Four headline KPIs, three grouped panels, a revenue spline and a live activity feed, all computed from the same dataset as every other screen, so the numbers agree wherever you look.",
        points: [
          "Rolling 30-day comparisons instead of misleading partial months",
          "Attendance insights with a working Today / Week / 30-day switch",
          "A live feed that keeps writing new events while you watch",
        ],
        shot: desktop("dashboard", "The Ironside dashboard with KPI cards, grouped metric panels and a sidebar of 17 sections"),
      },
      {
        kicker: "02 · Members",
        title: "A directory you can actually work in",
        body: "Search, status filters with live counts, sortable columns and pagination over 184 members, plus a profile drawer whose actions change the record and every count that depends on it.",
        points: [
          "Freeze, unfreeze, mark paid, cancel and reactivate",
          "Add-member form with inline validation",
          "Keyboard and screen-reader friendly: real buttons, aria-sort, Escape to close",
        ],
        shot: desktop("members-profile", "A member profile drawer open over the members table"),
      },
      {
        kicker: "03 · Leads",
        title: "Drag a lead through the pipeline",
        body: "A five-stage board with native drag-and-drop, and a stage selector on every card so it works without a mouse. Columns hold their width and scroll sideways rather than squeezing the cards.",
        points: [
          "Win rate and pipeline value recompute as leads move",
          "Filter by source; add a lead from a validated form",
          "Tinted column headers shared with the Tasks board",
        ],
        shot: desktop("leads", "The leads pipeline board with five tinted stage columns"),
      },
      {
        kicker: "04 · Classes",
        title: "A real timetable, not a list",
        body: "An hour-by-hour weekly calendar with a live now-line, ended classes struck through, and a waitlist panel. Opening a class shows its roster, and booking a member updates capacity everywhere.",
        points: [
          "Week navigation and class-type filters",
          "Book and remove members; full classes block further bookings",
          "Past classes show attended and no-show states",
        ],
        shot: desktop("classes-roster", "A class roster drawer open over the weekly calendar"),
      },
      {
        kicker: "05 · Financial",
        title: "Revenue you can interrogate",
        body: "A stacked monthly chart with tooltips, a plan-mix donut and a ledger of 1,900+ payments. Retrying a failed payment moves the money, the KPI and the sidebar badge together.",
        points: [
          "Charts drawn in plain SVG: no chart library",
          "Filter, search and paginate the ledger; export what you see as CSV",
          "Current month marked as month-to-date so it never reads as a dip",
        ],
        shot: desktop("financial", "The financial page with a stacked revenue chart, plan donut and transaction filters"),
      },
      {
        kicker: "06 · Everything else",
        title: "The rest of the back office",
        body: "Packages, products, orders, equipment, locations, nutrition, workouts, tasks, messages, notifications, community and team. Each one is a working screen in the same language, not a placeholder.",
        points: [
          "Plan editor with toggles, a stock manager, and an order pipeline",
          "A two-pane inbox, an Ops board with automation rules, a community feed",
          "Nutrition database with a verification workflow",
        ],
        shot: desktop("packages", "The membership plans page with plan cards, toggles and a dashed add-plan tile"),
      },
    ],
    clips: [
      clip("tour", "Product tour", "Dashboard to financials in twenty seconds: scrolling the panels, switching attendance ranges, then moving through the sidebar.", 21),
      clip("members", "Members", "Search, filter to past-due, sort, open a profile and mark the account paid. The counts update as it happens.", 14),
      clip("leads", "Leads", "Dragging leads between stages, then adding a new lead through the validated form.", 12),
      clip("classes", "Classes", "Browsing weeks, opening a class and booking a member into it. Capacity goes from 7 to 8.", 15),
      clip("financial", "Financial", "Hovering the revenue chart, filtering the ledger to failed payments and retrying one.", 16),
    ],
    gallery: [
      desktop("dashboard-insights", "Attendance insights panel with coach, member and class breakdowns", "Attendance insights"),
      desktop("members", "The members table with status filter chips and sortable columns", "Members"),
      desktop("classes", "The weekly class calendar", "Classes"),
      desktop("financial-ledger", "The transaction ledger with status filters", "Ledger"),
      desktop("nutrition", "The nutrition database with verification status", "Nutrition"),
      desktop("tasks", "The Ops Center task board", "Ops Center"),
      desktop("messages", "The two-pane messages inbox", "Messages"),
      desktop("locations", "Location cards with generated map thumbnails", "Locations"),
      desktop("community", "The community feed and challenge leaderboard", "Community"),
    ],
    phones: [
      phone("mobile-dashboard", "The dashboard on a phone", "Dashboard"),
      phone("mobile-leads", "The leads board on a phone", "Leads"),
      phone("mobile-more", "The More sheet listing every other section", "All sections"),
    ],
    decisions: [
      {
        title: "One block of tokens themes the whole product",
        body: "Every colour comes from a single set of CSS variables. Repainting Ironside for a different brand is one edit, not a refactor, which is also how I would deliver a white-label version.",
      },
      {
        title: "Data is generated, not stored",
        body: "Members, payments, classes and leads come from a seeded random generator, so the server render and the browser always agree and nothing can drift. Rules keep it believable: nobody visits before they join, and frozen accounts belong to long-standing members.",
      },
      {
        title: "Charts without a chart library",
        body: "The spline, stacked bars and donut are a few hundred lines of SVG with their own tooltips. It keeps the bundle small and the behaviour fully under control.",
      },
      {
        title: "State lives where it is shared",
        body: "Anything that more than one page reads, such as unread notifications or failed payments, sits above the page tree. Marking a notification read changes the sidebar badge, the bell and the list at once.",
      },
      {
        title: "Accessible by default",
        body: "Real buttons and links, aria-pressed filters, dialog semantics with Escape to close, visible focus rings, and reduced-motion respected throughout.",
      },
      {
        title: "Responsive, not just resized",
        body: "On a phone the sidebar becomes a tab bar with a More sheet, tables scroll instead of wrapping mid-value, and the pipeline board becomes a swipeable row.",
      },
    ],
  },
];

export const getCaseStudy = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug);
