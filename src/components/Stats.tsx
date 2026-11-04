"use client";

import { Counter, Stagger, StaggerItem } from "./animations";

const STATS = [
  { n: 10, s: "+", label: "Projects shipped" },
  { n: 3, s: "+", label: "Years building" },
  { n: 30, s: "", label: "Days of post-launch support" },
  { n: 24, s: "h", label: "Typical reply time" },
];

/*
  Sits directly under the hero as an immediate proof point, before the
  reader commits to the About copy below it.
*/
export default function Stats() {
  return (
    <section
      id="stats"
      style={{ position: "relative", zIndex: 2, paddingBlock: "clamp(1.5rem, 4vh, 3rem)" }}
    >
      <div className="shell">
        <Stagger className="stat-row" gap={0.1}>
          {STATS.map((s) => (
            <StaggerItem key={s.label} className="stat-cell">
              <p className="stat-num">
                <Counter to={s.n} suffix={s.s} />
              </p>
              <p className="mono-label" style={{ marginTop: "0.75rem" }}>
                {s.label}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
