"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FiMousePointer } from "react-icons/fi";
import type { Shot } from "@/lib/caseStudies";
import { useMediaQuery } from "../useClient";
import { useNativeCursor } from "./nativeCursor";

/*
  A live website in a browser frame, for the case studies of sites: a page is
  something to scroll, not to watch a recording of. The visitor never leaves
  this page: there is no link out to the site.

  What the frame shows depends on the screen it is on. On a laptop or desktop
  it is the site at a 1440px desktop layout, scaled down to fit the box. On a
  phone it is the site at the phone's own width, filling a tall box, so the
  mobile layout is seen on the device that uses it. (There is no phone-shaped
  frame on a desktop: a phone view belongs on a phone.)

  Nothing loads until asked, the page keeps scrolling until the visitor clicks
  into the frame, and a "Done" button hands scrolling back, which a touch screen
  needs since it has no pointer to leave.
*/
const DESKTOP = { w: 1440, h: 900 };

export default function SiteFrame({ name, url, poster }: { name: string; url: string; poster: Shot }) {
  const [started, setStarted] = useState(false);
  const [active, setActive] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [width, setWidth] = useState(0);
  const view = useRef<HTMLDivElement>(null);
  const wide = useMediaQuery("(min-width: 900px)", true);
  const touch = useMediaQuery("(pointer: coarse)");
  useNativeCursor(view);

  useEffect(() => {
    const el = view.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(el);
    setWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="site">
      <div className="live-frame site-frame">
        <div className="live-bar" aria-hidden="true">
          <i />
          <i />
          <i />
          <span className="mono-label">{name}</span>
        </div>

        <div ref={view} className="live-view site-view nc" onMouseLeave={() => setActive(false)}>
          {started ? (
            <>
              {!loaded && <p className="live-loading mono-label">Loading {name}…</p>}
              <div className="site-desk">
                <iframe
                  title={`${name}, the live site`}
                  src={url}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onLoad={() => setLoaded(true)}
                  style={
                    wide
                      ? {
                          width: DESKTOP.w,
                          height: DESKTOP.h,
                          transform: `scale(${width / DESKTOP.w})`,
                          transformOrigin: "0 0",
                        }
                      : undefined
                  }
                />
              </div>
              {active ? (
                <button type="button" className="live-done" onClick={() => setActive(false)}>
                  Done
                </button>
              ) : (
                <button type="button" className="live-hold" onClick={() => setActive(true)}>
                  <span>
                    <FiMousePointer aria-hidden="true" /> {touch ? "Tap to scroll the site" : "Click to scroll the site"}
                  </span>
                </button>
              )}
            </>
          ) : (
            <button type="button" className="live-start" onClick={() => setStarted(true)}>
              <Image src={poster.src} alt={poster.alt} fill sizes="(max-width: 1200px) 90vw, 1100px" className="live-poster" priority />
              <span className="live-start-cta">
                <FiMousePointer aria-hidden="true" /> Explore the site
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
