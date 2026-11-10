import { INTRO_KEY, INTRO_MIN_WIDTH } from "@/lib/introBoot";

/*
  The intro panel covers the viewport for about a second on a first visit,
  which is long enough to swallow an entrance animation whole. So the hero
  and the navbar wait behind data-intro="pending" on <html> and run their
  entrances when the panel marks the stage clear (see "Hero entrance" in
  globals.css). Browser-only: these read sessionStorage and matchMedia.
*/

/*
  Who never sees the panel: repeat visitors, reduced-motion users, and
  phones. On a small screen the intro only delays the headline, and speed
  matters more there than ceremony. INTRO_BOOT_SCRIPT (lib/introBoot.ts)
  makes the same call before first paint; keep the two in step.
*/
export function skipIntro() {
  return (
    !!sessionStorage.getItem(INTRO_KEY) ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    window.matchMedia(`(max-width: ${INTRO_MIN_WIDTH - 1}px)`).matches
  );
}

/*
  The stage is clear. Safe to call more than once. If this never runs (a
  script error, say) a CSS timer in globals.css shows the page after five
  seconds regardless.
*/
export function markIntroDone() {
  document.documentElement.dataset.intro = "done";
}
