"use client";

import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "./useClient";

/*
  Two-part cursor: a hard dot that tracks 1:1 and a ring that lags
  behind on a spring. Both use mix-blend-mode: difference so they
  invert whatever they pass over. Elements can opt into a contextual
  label with data-cursor="View project".

  Disabled entirely on touch/coarse pointers and for reduced-motion.
*/

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  // Derived during render — no effect needed to decide whether we run.
  const finePointer = useMediaQuery("(pointer: fine)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = finePointer && !reduceMotion;

  const [label, setLabel] = useState("");

  // live values kept outside React so the rAF loop never re-renders
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const scale = useRef(1);
  const targetScale = useRef(1);

  useEffect(() => {
    if (!enabled) return;

    // NB: deliberately not `data-cursor` — that attribute marks elements
    // that carry a hover label, and `closest()` would match the body.
    document.body.dataset.cursorActive = "true";

    pos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    ring.current = { ...pos.current };

    const onMove = (e: PointerEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };

    const INTERACTIVE = 'a, button, input, textarea, select, [data-cursor], [role="button"]';

    const onOver = (e: PointerEvent) => {
      const el = (e.target as HTMLElement)?.closest?.(INTERACTIVE) as
        | HTMLElement
        | null;
      if (!el) return;
      targetScale.current = 1.9;
      setLabel(el.dataset.cursor ?? "");
    };

    const onOut = (e: PointerEvent) => {
      const el = (e.target as HTMLElement)?.closest?.(INTERACTIVE);
      if (!el) return;
      targetScale.current = 1;
      setLabel("");
    };

    let raf = 0;
    const tick = () => {
      // ring eases toward the pointer; dot is exact
      ring.current.x += (pos.current.x - ring.current.x) * 0.16;
      ring.current.y += (pos.current.y - ring.current.y) * 0.16;
      scale.current += (targetScale.current - scale.current) * 0.16;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) scale(${scale.current})`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${ring.current.x + 22}px, ${ring.current.y + 18}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      delete document.body.dataset.cursorActive;
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div
        ref={labelRef}
        className="cursor-label"
        aria-hidden="true"
        style={{ opacity: label ? 1 : 0, transition: "opacity .25s" }}
      >
        {label}
      </div>
    </>
  );
}
