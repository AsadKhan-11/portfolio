"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/*
  Intro sequence: a counter races 00 → 100 while a hairline fills,
  then the whole panel lifts away on a curtain wipe. Runs once per
  browser session so repeat navigation isn't punished.
*/

const SESSION_KEY = "ak-intro-played";

export default function Preloader() {
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);

  /*
    Kept fully restartable — React re-runs effects in development, so a
    one-shot ref guard would cancel the first run's frame loop and then
    bail out of the second, leaving the panel stuck on screen.
  */
  useEffect(() => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (sessionStorage.getItem(SESSION_KEY) || still) return;

    /*
      Deliberate: sessionStorage has no change event to subscribe to, and
      the panel must not be server-rendered (it would flash for repeat
      visitors who should never see it). Showing it from the effect is
      the only way to gate on a value that is client-only and unsubscribable.
    */
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);
    document.body.style.overflow = "hidden";

    const DURATION = 1900;
    const t0 = performance.now();
    let raf = 0;
    let timer = 0;
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      setCount(100);
      sessionStorage.setItem(SESSION_KEY, "1");
      timer = window.setTimeout(() => {
        setVisible(false);
        document.body.style.overflow = "";
      }, 380);
    };

    const tick = (now: number) => {
      const p = Math.min((now - t0) / DURATION, 1);
      // ease-out-expo so it sprints then settles
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else finish();
    };
    raf = requestAnimationFrame(tick);

    /*
      requestAnimationFrame is suspended entirely while a tab is in the
      background, which would otherwise strand a visitor on the intro
      panel if they tab away during load. Timers keep firing, so this
      guarantees the sequence always completes.
    */
    const failsafe = window.setTimeout(finish, DURATION + 250);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      clearTimeout(failsafe);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="preloader"
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            <div>
              <p className="mono-label" style={{ marginBottom: "1.25rem" }}>
                Asad Khan — Full Stack Developer
              </p>
              <p
                className="preloader-count"
                style={{ color: count === 100 ? "var(--flame)" : undefined }}
              >
                {String(count).padStart(3, "0")}
              </p>
            </div>
            <p
              className="mono-label"
              style={{ marginBottom: "0.75rem", textAlign: "right" }}
            >
              Lahore, PK
              <br />
              <span style={{ color: "var(--flame)" }}>Loading experience</span>
            </p>
          </motion.div>

          <div
            style={{
              height: 1,
              background: "var(--bone-08)",
              marginTop: "2rem",
            }}
          >
            <motion.div
              className="preloader-bar"
              style={{ marginTop: 0, scaleX: count / 100 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
