"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { FiMousePointer } from "react-icons/fi";
import type { LivePage } from "@/lib/liveApps";
import type { Shot } from "@/lib/caseStudies";
import { useMediaQuery } from "../useClient";
import { useNativeCursor } from "./nativeCursor";

/*
  The running app in a browser frame, with a row of shortcuts to its main
  screens. Four things keep it from being a nuisance:

  - Nothing loads until the visitor asks. Until then it is a still of the app
    and a button, so the page stays light and no third-party app runs
    unprompted.
  - Scrolling still scrolls the page. A frame swallows the mouse wheel, so
    until a visitor clicks into it a button lies over it; moving the pointer
    out of the frame puts the button back.
  - Only apps of mine are framed. There is deliberately no `sandbox` on the
    frame: a sandbox that still allows scripts and the app's own storage adds
    no protection, and it made Veloura (a separate site, signing in through
    its database client) show a blank page.
  - On a phone the frame is replaced by a button that opens the app on its
    own. An admin screen in a 340px box is unusable, so it is not offered.
*/
export default function LiveApp({
  name,
  url,
  pages,
  poster,
  hint,
}: {
  name: string;
  url: string;
  pages: LivePage[];
  poster: Shot;
  hint?: string;
}) {
  const [started, setStarted] = useState(false);
  const [page, setPage] = useState(0);
  const [active, setActive] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const view = useRef<HTMLDivElement>(null);
  const touch = useMediaQuery("(pointer: coarse)");
  useNativeCursor(view);

  const go = (i: number) => {
    setPage(i);
    setLoaded(false);
    setStarted(true);
  };

  return (
    <div className="live">
      <div className="live-tabs" role="group" aria-label={`Screens of ${name}`}>
        {pages.map((p, i) => (
          <button
            key={p.path}
            type="button"
            className={`live-tab${started && page === i ? " is-on" : ""}`}
            aria-pressed={started && page === i}
            onClick={() => go(i)}
          >
            {p.label}
          </button>
        ))}
      </div>

      {hint && <p className="live-hint mono-label">{hint}</p>}

      <div className="live-frame">
        <div className="live-bar" aria-hidden="true">
          <i />
          <i />
          <i />
          <span className="mono-label">
            {name} · running app · {pages[page].label}
          </span>
        </div>

        <div ref={view} className="live-view nc" onMouseLeave={() => setActive(false)}>
          {started ? (
            <>
              {!loaded && <p className="live-loading mono-label">Loading {name}…</p>}
              <iframe
                key={page}
                title={`${name}, the running app: ${pages[page].label}`}
                src={`${url}${pages[page].path}`}
                loading="lazy"
                referrerPolicy="no-referrer"
                onLoad={() => setLoaded(true)}
              />
              {active ? (
                <button type="button" className="live-done" onClick={() => setActive(false)}>
                  Done
                </button>
              ) : (
                <button type="button" className="live-hold" onClick={() => setActive(true)}>
                  <span>
                    <FiMousePointer aria-hidden="true" /> {touch ? "Tap to use the app" : "Click to use the app"}
                  </span>
                </button>
              )}
            </>
          ) : (
            <button type="button" className="live-start" onClick={() => go(page)}>
              <Image
                src={poster.src}
                alt={poster.alt}
                fill
                sizes="(max-width: 1200px) 90vw, 1100px"
                className="live-poster"
              />
              <span className="live-start-cta">
                <FiMousePointer aria-hidden="true" /> Explore the running app
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
