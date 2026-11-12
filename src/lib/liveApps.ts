/*
  The running apps behind the case studies that have one, so a visitor can
  click through the real thing on the case page instead of only watching a
  recording of it.

  Each entry is where the app is served from and the handful of screens worth
  jumping to (a path inside that app). A case study with no entry, or an empty
  `url`, simply has no "Try it" section.

  Two kinds of app are listed:

  - Ironside and Vector Academy are front-end only: their data is in the code,
    with no account, no server and nothing a visitor can break. They are built
    to static files and served from this site's own /live/ folder
    (`npm run live:build`, scripts/build-live-apps.sh), so the frame is
    same-origin and there is nothing else to deploy. A change made in the frame
    lives in that visitor's tab and is gone on reload.
  - Veloura is a deployed product with its own database and sign-in, shown from
    its own address. It must allow being framed (a Next.js app on Vercel does
    by default) and, because it keeps its session in the browser's storage, its
    sign-in works inside the frame. What a visitor changes there is saved to
    that database and seen by the next visitor, and the text says so.
*/
export interface LivePage {
  label: string;
  /** A path inside the app, starting with a slash. */
  path: string;
}

export interface LiveApp {
  /** Where the app is served from, without a trailing slash. Empty to switch the section off. */
  url: string;
  pages: LivePage[];
  /** The paragraph under the section's heading, when the standard one would be wrong. */
  lede?: string;
  /** A line under the row of screens, for anything the visitor needs to know first. */
  hint?: string;
}

export const LIVE_APPS: Record<string, LiveApp> = {
  "ironside-gym": {
    url: "/live/ironside-gym",
    pages: [
      { label: "Dashboard", path: "/" },
      { label: "Members", path: "/members/" },
      { label: "Leads", path: "/leads/" },
      { label: "Classes", path: "/classes/" },
      { label: "Financial", path: "/financial/" },
    ],
  },
  "vector-academy": {
    url: "/live/vector-academy",
    pages: [
      { label: "Dashboard", path: "/dashboard/" },
      { label: "Applicants", path: "/applicants/" },
      { label: "Pipeline", path: "/pipeline/" },
      { label: "Co-pilot", path: "/copilot/" },
      { label: "Programs", path: "/programs/" },
    ],
  },
  veloura: {
    /*
      Switched off: on 2026-11-13 the Supabase project behind the deployed app
      stopped answering (its address no longer resolves), so every sign-in
      fails with "Failed to fetch", framed or not. Put the address back
      ("https://veloura-omega-roan.vercel.app") once the database is restored.
      The frame itself was tested and renders and scrolls fine.
    */
    url: "",
    pages: [
      { label: "Sign in", path: "/login" },
      { label: "Dashboard", path: "/dashboard" },
      { label: "Calendar", path: "/calendar" },
      { label: "Clients", path: "/clients" },
      { label: "Treatments", path: "/treatments" },
    ],
    lede: "This is Veloura running on its own database. Pick a role on the sign-in screen, then jump between screens or use the menu inside it. Changes you make are visible to the next visitor.",
    hint: "Start with Sign in, then choose a role.",
  },
};

export const getLiveApp = (slug: string): LiveApp | undefined => {
  const app = LIVE_APPS[slug];
  return app && app.url ? { ...app, url: app.url.replace(/\/$/, "") } : undefined;
};
