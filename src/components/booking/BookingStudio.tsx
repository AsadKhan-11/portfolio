"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiClock, FiMail, FiVideo } from "react-icons/fi";
import SectionHead from "../SectionHead";
import { CALLS, CAL_USERNAME } from "@/lib/booking";
import { CONTACT_EMAIL } from "@/lib/site";

/*
  Cal.com's own embed, loaded on demand. The snippet is Cal.com's standard
  loader: it queues calls until embed.js has arrived. Each call type gets its
  own namespace, so switching between them re-renders the calendar for the
  one picked.
*/
type CalFn = ((...args: unknown[]) => void) & { ns?: Record<string, (...args: unknown[]) => void> };

function loadCal(): CalFn {
  const w = window as unknown as { Cal?: CalFn };
  if (!w.Cal) {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    (function (C: any, A: string, L: string) {
      const p = (a: any, ar: any) => a.q.push(ar);
      const d = C.document;
      C.Cal =
        C.Cal ||
        function (...ar: any[]) {
          const cal = C.Cal;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api: any = (...a: any[]) => p(api, a);
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
    })(window, "https://app.cal.com/embed/embed.js", "init");
    /* eslint-enable @typescript-eslint/no-explicit-any */
  }
  return (window as unknown as { Cal: CalFn }).Cal;
}

const started = new Set<string>();

function showCalendar(index: number) {
  const Cal = loadCal();
  const ns = `call${index}`;
  if (!started.has(ns)) {
    Cal("init", ns, { origin: "https://app.cal.com" });
    started.add(ns);
  }
  const api = Cal.ns?.[ns];
  if (!api) return;
  api("inline", {
    elementOrSelector: "#cal-host",
    calLink: `${CAL_USERNAME}/${CALLS[index].slug}`,
    layout: "month_view",
    config: { layout: "month_view", theme: "dark" },
  });
  api("ui", {
    theme: "dark",
    hideEventTypeDetails: false,
    layout: "month_view",
    cssVarsPerTheme: {
      dark: { "cal-brand": "#ff5c35" },
      light: { "cal-brand": "#ff5c35" },
    },
  });
}

/*
  The picker and the calendar. Three kinds of call down the side (or across
  the top on a phone) and the calendar for the chosen one beside them. With
  no Cal.com account connected yet, the calendar's place shows a way to
  write to me instead.
*/
export default function BookingStudio() {
  const [active, setActive] = useState(0);
  const host = useRef<HTMLDivElement>(null);
  const ready = Boolean(CAL_USERNAME);
  const call = CALLS[active];

  useEffect(() => {
    if (!ready || !host.current) return;
    host.current.innerHTML = "";
    showCalendar(active);
  }, [active, ready]);

  return (
    <section id="booking" className="section">
      <div className="rule-top" />
      <div className="shell">
        <SectionHead
          eyebrow="01 · Pick a time"
          title="Choose your"
          em="call"
          lede="Three lengths, depending on how far along you are. The calendar below shows when I am free."
        />

        <div className="book">
          <div className="book-calls" role="tablist" aria-label="Type of call">
            {CALLS.map((c, i) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                className={`book-call${i === active ? " is-on" : ""}`}
                onClick={() => setActive(i)}
              >
                <span className="book-call-min">
                  {c.minutes}
                  <small>min</small>
                </span>
                <span className="book-call-text">
                  <span className="book-call-name">{c.name}</span>
                  <span className="book-call-suits mono-label">{c.suits}</span>
                </span>
              </button>
            ))}

            <p className="book-note">
              <FiVideo aria-hidden="true" /> Every call is on Google Meet. The link arrives in your confirmation.
            </p>
          </div>

          <div className="book-panel" role="tabpanel">
            <div className="book-panel-head">
              <div>
                <p className="mono-label book-panel-kicker">
                  <FiClock aria-hidden="true" /> {call.minutes} minutes · Google Meet
                </p>
                <h3 className="book-panel-title">{call.name}</h3>
                <p className="book-panel-blurb">{call.blurb}</p>
              </div>
            </div>

            {ready ? (
              <div id="cal-host" ref={host} className="book-embed" />
            ) : (
              <div className="book-fallback">
                <p className="book-fallback-title">Online booking opens very soon.</p>
                <p>
                  Until then, send me a line and we will find a time that suits you. I reply within a day.
                </p>
                <div className="book-fallback-actions">
                  <a href={`mailto:${CONTACT_EMAIL}?subject=Call%20request`} className="btn btn-solid" data-cursor="Talk">
                    <span>
                      <FiMail aria-hidden="true" style={{ display: "inline", marginRight: 8 }} />
                      Email me
                    </span>
                  </a>
                  <Link href="/contact" className="btn">
                    <span>Use the contact form</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
