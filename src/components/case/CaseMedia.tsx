"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight, FiPlay, FiX } from "react-icons/fi";
import type { Clip, Shot } from "@/lib/caseStudies";
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

/*
  The hero reel: silent, looping, and only running while it's on screen.
  Reduced-motion visitors get a still poster with native controls instead
  of autoplay.
*/
export function Reel({ clip, label }: { clip: Clip; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const still = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    const v = ref.current;
    if (!v || still) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [still]);

  return (
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
  );
}

/* One player, a list of flows. Picking a flow swaps the clip and plays it. */
export function FlowPlayer({ clips, label }: { clips: Clip[]; label: string }) {
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const clip = clips[index];

  return (
    <div className="case-flow">
      <Frame label={label}>
        <video
          key={clip.id}
          className="case-video"
          src={clip.src}
          poster={clip.poster}
          muted
          controls
          playsInline
          autoPlay={started}
          preload="metadata"
          aria-label={clip.title}
        />
      </Frame>

      <ol className="case-flow-list">
        {clips.map((c, i) => (
          <li key={c.id}>
            <button
              onClick={() => {
                setIndex(i);
                setStarted(true);
              }}
              aria-current={i === index}
              className="case-flow-item"
              data-cursor="Play"
            >
              <span className="case-flow-num mono-label">{String(i + 1).padStart(2, "0")}</span>
              <span className="case-flow-body">
                <span className="case-flow-title">{c.title}</span>
                <span className="case-flow-blurb">{c.blurb}</span>
              </span>
              <span className="case-flow-meta mono-label">
                <FiPlay size={12} /> {c.seconds}s
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* Thumbnail grid that opens a keyboard-navigable lightbox. */
export function Gallery({ shots }: { shots: Shot[] }) {
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
      <div className="case-gallery">
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
                sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: "cover", objectPosition: "top left" }}
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
