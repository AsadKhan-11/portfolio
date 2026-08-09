"use client";

import { useEffect, useState } from "react";

/*
  The intro panel covers the viewport for ~3s on a first visit, which is
  long enough to swallow an entrance animation whole. Anything that wants
  to be *seen* arriving has to wait for the curtain, so the panel
  announces itself and everyone else starts from that signal.
*/

export const INTRO_KEY = "ak-intro-played";
export const INTRO_EVENT = "ak-intro-done";

/*
  True once the stage is clear: immediately for repeat visits and for
  reduced-motion users (neither ever sees the panel), otherwise when the
  curtain has finished lifting.
*/
export function useIntroDone() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (sessionStorage.getItem(INTRO_KEY) || still) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDone(true);
      return;
    }

    const onDone = () => setDone(true);
    window.addEventListener(INTRO_EVENT, onDone);

    /*
      The curtain's exit is animation-driven, and animations are suspended
      in a backgrounded tab — a visitor who tabs away mid-intro could come
      back to a page that never revealed itself. This outruns the real
      signal only if that signal never arrives.
    */
    const failsafe = window.setTimeout(onDone, 6000);

    return () => {
      window.removeEventListener(INTRO_EVENT, onDone);
      clearTimeout(failsafe);
    };
  }, []);

  return done;
}
