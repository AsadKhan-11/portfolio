"use client";

import { Marquee } from "./animations";

const WORDS = [
  "React",
  "Next.js",
  "Node",
  "MongoDB",
  "TypeScript",
  "Express",
  "Tailwind",
  "Framer Motion",
];

/*
  Full-bleed kinetic ticker. Two rows running opposite directions —
  solid on top, outlined below — to break the vertical rhythm between
  the hero and the first content section.
*/
export default function Ticker() {
  return (
    <section
      aria-hidden="true"
      style={{
        position: "relative",
        zIndex: 2,
        paddingBlock: "clamp(2.5rem, 7vh, 5rem)",
        borderBlock: "1px solid var(--rule)",
        overflow: "hidden",
      }}
    >
      <Marquee speed={42}>
        {WORDS.map((w) => (
          <span key={w} className="marquee-item">
            {w}
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "var(--flame)",
                flexShrink: 0,
              }}
            />
          </span>
        ))}
      </Marquee>

      <div style={{ height: "clamp(0.5rem, 1.5vh, 1rem)" }} />

      <Marquee speed={54} reverse>
        {WORDS.map((w) => (
          <span key={w} className="marquee-item marquee-outline">
            {w}
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                border: "1px solid var(--bone-30)",
                flexShrink: 0,
              }}
            />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
