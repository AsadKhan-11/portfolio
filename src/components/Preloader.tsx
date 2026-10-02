"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { INTRO_EVENT, INTRO_KEY as SESSION_KEY } from "./intro";

/*
  Intro sequence, in three beats:

  1. The hero portrait spins up from nothing on a 3D turntable while
     the counter races 00 → 100.
  2. It flies to the exact spot the hero's own portrait occupies
     (measured live from `.hero-avatar`, landing at ×1.1 — the same
     scale the hero entrance starts from).
  3. The ink panel dissolves. The intro event fires at landing, so the
     hero fades its copy in underneath ours while we fade out — one
     continuous settle instead of a swap.

  Runs once per browser session so repeat navigation isn't punished.
*/

const COUNT_MS = 1600;
/* Spin tail overlaps the flight's start — the portrait is still
   finishing its last degrees of rotation as it leaves for the hero,
   so there's no static beat between spin-up and departure. */
const SPIN_MS = 1700;
const FLY_MS = 850;

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;
const EASE_QUART = [0.76, 0, 0.24, 1] as const;

type Flight = { x: number; y: number; scale: number };

export default function Preloader() {
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);
  const [flight, setFlight] = useState<Flight | null>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const finalized = useRef(false);

  /* Landing: hand the stage to the page. The hero starts its entrance
     now, underneath the dissolving panel. */
  const finalize = useCallback(() => {
    if (finalized.current) return;
    finalized.current = true;
    document.body.style.overflow = "";
    window.dispatchEvent(new Event(INTRO_EVENT));
    setVisible(false);
  }, []);

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
    finalized.current = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);
    document.body.style.overflow = "hidden";

    const t0 = performance.now();
    let raf = 0;

    /* Launch the flight: measure where the hero keeps its portrait and
       head for it. If the hero ever stops rendering one, skip the
       theatrics and leave gracefully. */
    const fly = () => {
      /* The scroll lock hides the scrollbar; release it before measuring
         so the target sits exactly where the final page will put it. */
      document.body.style.overflow = "";

      const from = avatarRef.current?.getBoundingClientRect();
      const target = document.querySelector<HTMLElement>(".hero-avatar");
      const to = target?.getBoundingClientRect();
      if (!from || !target || !to || from.width === 0) {
        finalize();
        return;
      }
      setFlight({
        /* Rect centre survives the hero's centre-origin scale; its width
           does not — the avatar waits in its pre-entrance scale(1.1)
           state, so rect width is 10% inflated. offsetWidth is the true
           layout width. */
        x: to.left + to.width / 2 - (from.left + from.width / 2),
        y: to.top + to.height / 2 - (from.top + from.height / 2),
        /* ×1.1 — land matching the hero entrance's own starting scale,
           so the settle continues seamlessly under the crossfade */
        scale: (target.offsetWidth * 1.1) / from.width,
      });
    };

    const tick = (now: number) => {
      const p = Math.min((now - t0) / COUNT_MS, 1);
      // ease-out-expo so it sprints then settles
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem(SESSION_KEY, "1");
        fly();
      }
    };
    raf = requestAnimationFrame(tick);

    /*
      requestAnimationFrame and animations are suspended entirely while
      a tab is in the background, which would otherwise strand a visitor
      on the intro panel if they tab away during load. Timers keep
      firing, so this guarantees the sequence always completes.
    */
    const failsafe = window.setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "1");
      finalize();
    }, COUNT_MS + FLY_MS + 2200);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(failsafe);
      document.body.style.overflow = "";
    };
  }, [finalize]);

  return (
    /* The exit-complete dispatch stays as an idempotent backstop — the
       real signal fires at landing so the two portraits can crossfade. */
    <AnimatePresence
      onExitComplete={() => window.dispatchEvent(new Event(INTRO_EVENT))}
    >
      {visible && (
        <motion.div
          className="preloader"
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* ── Centre stage: the portrait on a 3D turntable ── */}
          <div className="preloader-stage" aria-hidden="true">
            <motion.div
              ref={avatarRef}
              className="preloader-avatar"
              animate={flight ? { x: flight.x, y: flight.y, scale: flight.scale } : undefined}
              transition={{ duration: FLY_MS / 1000, ease: EASE_QUART }}
              onAnimationComplete={() => flight && finalize()}
            >
              <motion.div
                className="preloader-avatar-inner"
                initial={{ rotateY: 900, scale: 0 }}
                animate={{ rotateY: 0, scale: 1 }}
                transition={{ duration: SPIN_MS / 1000, ease: EASE_EXPO }}
              >
                <motion.span
                  className="preloader-glow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: flight ? 0 : 1 }}
                  transition={{ duration: 0.8, delay: flight ? 0 : 0.5 }}
                />
                <Image
                  src="/hero-avatar.png"
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 900px) 40vw, 20vw"
                  style={{ objectFit: "contain", objectPosition: "bottom" }}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* ── Counter + wordmark, stepping aside for the flight ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: flight ? 0 : 1 }}
            transition={{ duration: flight ? 0.35 : 0.5 }}
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
                Asad Khan · Full Stack Developer
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: flight ? 0 : 1 }}
            transition={{ duration: flight ? 0.35 : 0.5 }}
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
