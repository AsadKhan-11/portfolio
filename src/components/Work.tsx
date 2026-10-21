"use client";

import { useState } from "react";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { Reveal, SplitText } from "./animations";
import { useMediaQuery } from "./useClient";

const PROJECTS = [
  {
    n: "01",
    shot: "/work/cards/01-vanta.jpg",
    title: "Vanta Aesthetics",
    domain: "vanta-aesthetics.vercel.app",
    url: "https://vanta-aesthetics.vercel.app",
    meta: "Aesthetics clinic · 2026",
  },
  {
    n: "02",
    shot: "/work/cards/02-lumiere.jpg",
    title: "Lumière Aesthetics",
    domain: "lumi-re-aesthetics.vercel.app",
    url: "https://lumi-re-aesthetics.vercel.app",
    meta: "Aesthetics clinic · 2026",
  },
  {
    n: "03",
    shot: "/work/cards/03-aurelle.jpg",
    title: "Aurelle",
    domain: "aurelle-mauve-two.vercel.app",
    url: "https://aurelle-mauve-two.vercel.app",
    meta: "Skin wellness studio · 2026",
  },
];

/*
  The shelf: live builds glide past on a tilted plane, full bleed.
  Each card is a straight link into the deployed site. The track is
  two identical halves (each the project list twice, so a half always
  outspans the viewport), looping with a CSS keyframe — which is what
  lets hover simply freeze it via animation-play-state.
*/
export default function Work() {
  const [paused, setPaused] = useState(false);
  const still = useMediaQuery("(prefers-reduced-motion: reduce)");

  const half = [...PROJECTS, ...PROJECTS];

  return (
    <section id="work" className="section bg-glow-bl">
      <div className="rule-top" />
      <div className="shell">
        <div className="section-head">
          <div>
            <p className="eyebrow">05 · Work</p>
            <h2 className="section-title" style={{ marginTop: "1.75rem" }}>
              <SplitText text="Selected" />
              <br />
              <span className="serif-em" style={{ color: "var(--flame)" }}>
                <SplitText text="projects" delay={0.1} />
              </span>
            </h2>
          </div>
          <Reveal delay={0.15}>
            <p className="lede">
              Live builds for real brands, shipped, deployed, and holding up
              in production. Every card opens the real thing.
            </p>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.1}>
        <div
          className="work-shelf"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="work-shelf-tilt">
            <div className="work-track" data-paused={paused || still}>
              {[0, 1].map((dup) => (
                <div
                  key={dup}
                  className="work-track-half"
                  aria-hidden={dup === 1}
                >
                  {half.map((p, i) => (
                    <a
                      key={`${p.n}-${i}`}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="work-card"
                      tabIndex={dup === 1 ? -1 : 0}
                      data-cursor="Visit"
                    >
                      <span className="work-shot">
                        <Image
                          src={p.shot}
                          alt={`${p.title} website`}
                          fill
                          sizes="(max-width: 760px) 78vw, 36vw"
                          style={{ objectFit: "cover", objectPosition: "top" }}
                        />
                      </span>
                      <span className="work-card-foot">
                        <span className="work-card-title">{p.title}</span>
                        <span className="mono-label work-card-domain">
                          {p.domain} <FiArrowUpRight size={13} />
                        </span>
                        <span className="mono-label work-card-meta">{p.meta}</span>
                      </span>
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mono-label work-hint">
          Hover to hold the reel · click any build to open it live
        </p>
      </Reveal>
    </section>
  );
}
