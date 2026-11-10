/*
  Shared by the root layout (a server component) and the intro code (client),
  so it must not carry "use client": a string imported from a client module
  into a server component arrives as a reference, not as the string.
*/

export const INTRO_KEY = "ak-intro-played";

/** Screens narrower than this skip the intro: it only delays the headline on a phone. */
export const INTRO_MIN_WIDTH = 900;

/*
  Runs at the top of <body>, before anything is painted. It makes the same
  call as skipIntro() in components/intro.ts and, when the intro curtain is
  going to play, says so on <html> as data-intro="pending". The hero and the
  navbar only start hidden under that flag (see "Hero entrance" in
  globals.css). Everyone else (phones, repeat visits, reduced-motion users)
  gets the real content in the first paint instead of waiting for JavaScript
  to reveal it. Keep the two rules in step.

  The try/catch is for browsers that block sessionStorage: they get the
  content, not a hidden page.
*/
export const INTRO_BOOT_SCRIPT = `try{if(!sessionStorage.getItem("${INTRO_KEY}")&&!matchMedia("(prefers-reduced-motion: reduce)").matches&&!matchMedia("(max-width: ${INTRO_MIN_WIDTH - 1}px)").matches)document.documentElement.dataset.intro="pending"}catch(e){}`;
