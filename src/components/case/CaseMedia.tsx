"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiArrowUpRight, FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import type { Clip, Shot } from "@/lib/caseStudies";
import { Stagger, StaggerItem } from "../animations";
import { useMediaQuery } from "../useClient";

/* A browser-style frame around anything captured from the product. */
export function Frame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="case-frame">
      <div className="case-frame-bar" aria-hidden="true">
        <span />
        <span />
        <span />
        <em className="mono-label">{label}</em>
      </div>
      {children}
    </div>
  );
}

/* A phone bezel around anything captured from a mobile app. */
export function Device({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div className="case-device" aria-label={label}>
      <span className="case-device-island" aria-hidden="true" />
      {children}
    </div>
  );
}

/* Plays while at least `threshold` of the element is on screen, pauses otherwise. */
function useVisible(threshold = 0.35) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

/*
  The hero reel: silent, looping, and only running while it's on screen.
  Reduced-motion visitors get a still poster with native controls instead
  of autoplay.
*/
export function Reel({ clip, label }: { clip: Clip; label: string }) {
  const [wrap, visible] = useVisible();
  const ref = useRef<HTMLVideoElement>(null);
  const still = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    const v = ref.current;
    if (!v || still) return;
    if (visible) v.play().catch(() => {});
    else v.pause();
  }, [visible, still]);

  return (
    <div ref={wrap}>
      <Frame label={label}>
        <video
          ref={ref}
          className="case-video"
          src={clip.src}
          poster={clip.poster}
          muted
          loop
          playsInline
          preload="metadata"
          controls={still}
          aria-label={clip.title}
        />
      </Frame>
    </div>
  );
}

/*
  Mobile hero: up to three looping walkthroughs side by side in phone
  frames, the middle one raised. Plays only while on screen.
*/
export function PhoneReel({ clips }: { clips: Clip[] }) {
  const [wrap, visible] = useVisible(0.25);
  const still = useMediaQuery("(prefers-reduced-motion: reduce)");
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const shown = clips.slice(0, 3);

  useEffect(() => {
    refs.current.forEach((v) => {
      if (!v || still) return;
      if (visible) v.play().catch(() => {});
      else v.pause();
    });
  }, [visible, still]);

  return (
    <div className="case-phonereel" ref={wrap}>
      {shown.map((c, i) => (
        <div key={c.id} className="case-phonereel-item" data-mid={i === 1}>
          <Device label={c.title}>
            <video
              ref={(el) => {
                refs.current[i] = el;
              }}
              className="case-video"
              data-device
              src={c.src}
              poster={c.poster}
              muted
              loop
              playsInline
              preload="metadata"
              controls={still}
              aria-label={c.title}
            />
          </Device>
          <p className="mono-label case-phonereel-cap">{c.title}</p>
        </div>
      ))}
    </div>
  );
}

/*
  A hands-free playlist: no player chrome. It plays while it's on screen,
  moves to the next walkthrough when one ends, and the list on the right
  doubles as the progress display. Clicking a walkthrough jumps to it.
*/
export function FlowPlayer({ clips, label, device }: { clips: Clip[]; label: string; device?: boolean }) {
  const Shell = device ? Device : Frame;
  const [wrap, visible] = useVisible(0.4);
  const ref = useRef<HTMLVideoElement>(null);
  const still = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const clip = clips[index];

  // Runs after every clip change (the <video> is re-keyed) and on visibility.
  useEffect(() => {
    const v = ref.current;
    if (!v || still) return;
    if (visible) v.play().catch(() => {});
    else v.pause();
  }, [visible, index, still]);

  const go = useCallback((i: number) => {
    setProgress(0);
    setIndex(i);
  }, []);

  return (
    <div className="case-flow" ref={wrap} data-device={device || undefined}>
      <Shell label={label}>
        <video
          key={clip.id}
          ref={ref}
          className="case-video"
          data-device={device || undefined}
          src={clip.src}
          poster={clip.poster}
          muted
          playsInline
          preload="auto"
          controls={still}
          aria-label={clip.title}
          onTimeUpdate={(e) => {
            const v = e.currentTarget;
            if (v.duration) setProgress(v.currentTime / v.duration);
          }}
          onEnded={() => go((index + 1) % clips.length)}
        />
      </Shell>

      <div className="case-flow-side">
        <p className="mono-label case-flow-head">
          <span>Walkthroughs</span>
          <span>
            {String(index + 1).padStart(2, "0")} / {String(clips.length).padStart(2, "0")}
          </span>
        </p>
        <ol className="case-flow-list">
          {clips.map((c, i) => (
            <li key={c.id}>
              <button
                onClick={() => go(i)}
                aria-current={i === index}
                className="case-flow-item"
                data-cursor="Watch"
              >
                <span className="case-flow-num mono-label">{String(i + 1).padStart(2, "0")}</span>
                <span className="case-flow-body">
                  <span className="case-flow-title">{c.title}</span>
                  <span className="case-flow-blurb">{c.blurb}</span>
                </span>
                <span className="case-flow-meta mono-label">{c.seconds}s</span>
                <span className="case-flow-bar" aria-hidden="true">
                  <span style={{ transform: `scaleX(${i === index ? progress : 0})` }} />
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* Thumbnail grid that opens a keyboard-navigable lightbox. */
export function Gallery({ shots, device }: { shots: Shot[]; device?: boolean }) {
  const [open, setOpen] = useState<number | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(null);
    returnFocus.current?.focus();
  }, []);
  const step = useCallback(
    (d: number) => setOpen((o) => (o === null ? o : (o + d + shots.length) % shots.length)),
    [shots.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, step]);

  const current = open === null ? null : shots[open];

  return (
    <>
      <div className="case-gallery" data-device={device || undefined}>
        {shots.map((s, i) => (
          <button
            key={s.src}
            className="case-gallery-item"
            data-cursor="View"
            onClick={(e) => {
              returnFocus.current = e.currentTarget;
              setOpen(i);
            }}
            aria-label={`Open ${s.caption ?? s.alt}`}
          >
            <span className="case-gallery-shot">
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes={device ? "(max-width: 760px) 46vw, 22vw" : "(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 33vw"}
                style={{ objectFit: "cover", objectPosition: device ? "top center" : "top left" }}
              />
            </span>
            <span className="mono-label case-gallery-cap">{s.caption}</span>
          </button>
        ))}
      </div>

      {current && (
        <div className="case-lightbox" role="dialog" aria-modal="true" aria-label={current.alt} data-lenis-prevent>
          <button className="case-lightbox-scrim" onClick={close} aria-label="Close" tabIndex={-1} />
          <button className="case-lightbox-btn case-lightbox-close" onClick={close} aria-label="Close" autoFocus>
            <FiX size={20} />
          </button>
          <button className="case-lightbox-btn case-lightbox-prev" onClick={() => step(-1)} aria-label="Previous screen">
            <FiChevronLeft size={22} />
          </button>
          <button className="case-lightbox-btn case-lightbox-next" onClick={() => step(1)} aria-label="Next screen">
            <FiChevronRight size={22} />
          </button>
          <figure className="case-lightbox-fig">
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              width={current.w}
              height={current.h}
              sizes="94vw"
              priority
              style={{ width: "auto", height: "auto", maxWidth: "94vw", maxHeight: "80vh" }}
            />
            <figcaption className="mono-label">
              {current.caption ?? current.alt} · {open! + 1} / {shots.length}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}

/* ─────────────────────────────────────────────
   More work — three cards picked at random.
   The server render (and first paint) uses the first three so hydration
   matches; the shuffle runs once after mount, before the section scrolls
   into view, so each visit sees a different set.
   ───────────────────────────────────────────── */
export interface MoreCard {
  key: string;
  shot: string;
  title: string;
  meta: string;
  href: string;
  label: string;
}

export function MoreGrid({ cards, pick = 3 }: { cards: MoreCard[]; pick?: number }) {
  const [shown, setShown] = useState(() => cards.slice(0, pick));

  useEffect(() => {
    const pool = [...cards];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    // Deliberate one-time post-mount shuffle; see the note above.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShown(pool.slice(0, pick));
  }, [cards, pick]);

  return (
    <Stagger className="case-more">
      {shown.map((c) => {
        const internal = c.href.startsWith("/");
        const body = (
          <>
            <span className="work-shot">
              <Image src={c.shot} alt={`${c.title} ${internal ? "case study" : "website"}`} fill sizes="(max-width: 760px) 92vw, 30vw" style={{ objectFit: "cover", objectPosition: "top" }} />
            </span>
            <span className="work-card-foot">
              <span className="work-card-title">{c.title}</span>
              <span className="mono-label work-card-domain">
                {c.label} {internal ? <FiArrowRight size={13} /> : <FiArrowUpRight size={13} />}
              </span>
              <span className="mono-label work-card-meta">{c.meta}</span>
            </span>
          </>
        );
        return (
          <StaggerItem key={c.key}>
            {internal ? (
              <Link href={c.href} className="work-card" data-cursor="Read">{body}</Link>
            ) : (
              <a href={c.href} target="_blank" rel="noopener noreferrer" className="work-card" data-cursor="Visit">{body}</a>
            )}
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
