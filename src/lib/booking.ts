/*
  The call booking page, in one place.

  Bookings run on Cal.com, which reads the Google Calendar it is connected to
  and offers only the times that are free, in the visitor's own time zone.
  Everything about availability (hours, buffers, notice) is set in the
  Cal.com account, not here, so none of it is printed on the site.

  CAL_USERNAME is the public name in the Cal.com booking link
  (cal.com/<name>). Until it is set the page shows an email fallback instead of
  the calendar, so the page can ship before the account is ready.

  Each call below needs an event type in Cal.com whose URL slug matches `slug`.
*/
export const CAL_USERNAME = "asad-khan";

export interface CallType {
  id: string;
  /** The event type's URL slug in Cal.com. */
  slug: string;
  minutes: number;
  name: string;
  blurb: string;
  /** Who it suits, in a few words. */
  suits: string;
}

export const CALLS: CallType[] = [
  {
    id: "intro",
    slug: "intro-call",
    minutes: 15,
    name: "Intro call",
    blurb:
      "A quick hello. Tell me what you are building and I will tell you honestly whether I am the right fit.",
    suits: "Not sure where to start",
  },
  {
    id: "project",
    slug: "project-call",
    minutes: 30,
    name: "Project call",
    blurb:
      "Walk me through the project: the goal, the scope and the timeline, so I can follow up with a fixed quote.",
    suits: "You know what you need",
  },
  {
    id: "strategy",
    slug: "strategy-session",
    minutes: 60,
    name: "Strategy session",
    blurb:
      "A deeper working session for bigger builds: systems, integrations, AI features or a mobile app.",
    suits: "A larger or more complex build",
  },
];

export const BOOK_STEPS = [
  {
    title: "Pick a time",
    body: "The calendar shows when I am free, in your own time zone. Choose the length of call that suits, then a slot.",
    tags: ["15, 30 or 60 minutes", "Your time zone"],
  },
  {
    title: "Get the link",
    body: "You receive a confirmation with a Google Meet link and a calendar invite, and a link to reschedule if plans change.",
    tags: ["Google Meet", "Calendar invite", "Reschedule link"],
  },
  {
    title: "We talk it through",
    body: "I will have read what you wrote. Bring the problem, or just a rough idea. No slides needed.",
    tags: ["A rough idea is fine", "No slides"],
  },
];

export const BOOK_FAQS = [
  {
    q: "Which time zone are the times in?",
    a: "Yours. The calendar detects your time zone and shows every slot in it, so there is no converting.",
  },
  {
    q: "What if I need to reschedule or cancel?",
    a: "The confirmation email has a link to move or cancel the call. There is nothing to explain and no penalty.",
  },
  {
    q: "Do I need to prepare anything?",
    a: "No. A sentence or two about what you are trying to do, added when you book, is enough. If you have a website or a reference you like, link it.",
  },
  {
    q: "I cannot see a time that works.",
    a: "Send me a message and I will find one. Email or the contact form both reach me, and I reply within a day.",
  },
];
