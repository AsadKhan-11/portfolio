import { useId } from "react";
import type { CoverKind } from "@/lib/blog";
import { getPackage } from "@/lib/packages";

/*
  The picture on a post's card and at the head of the post: a small drawing
  of what the post is about, in the site's own colours, so every post has an
  image without a stock photo and the images can't be out of step with the
  rest of the site. One scene per CoverKind. They are decorative (the title
  next to each says it all), so they are hidden from screen readers.

  To give a post a real photo later, replace this component's output with an
  <Image> in PostCard and BlogPost; nothing else needs to change.
*/
const LINE = "var(--bone-30)";
const SOFT = "var(--bone-15)";
const FLAME = "var(--flame)";
const PANEL = "var(--ink-panel)";

function Scene({ kind }: { kind: CoverKind }) {
  switch (kind) {
    case "quote":
      return (
        <g>
          <rect x="190" y="46" width="260" height="308" rx="18" fill={PANEL} stroke={SOFT} />
          <text x="214" y="86" fill={FLAME} fontSize="12">
            Fixed quote
          </text>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x="214" y={112 + i * 44} width={96 - (i % 2) * 22} height="8" rx="4" fill={LINE} />
              <rect x="388" y={112 + i * 44} width="38" height="8" rx="4" fill={SOFT} />
              <line x1="214" x2="426" y1={136 + i * 44} y2={136 + i * 44} stroke={SOFT} />
            </g>
          ))}
          <rect x="214" y="296" width="212" height="42" rx="10" fill={FLAME} />
          <text x="232" y="322" fill="var(--ink)" fontSize="12" fontWeight="700">
            Fixed price
          </text>
          <circle cx="442" cy="52" r="19" fill="var(--ink)" stroke={FLAME} strokeWidth="2" />
          <path d="M433 52 l7 7 l12 -14" stroke={FLAME} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="52" y="140" width="118" height="32" rx="16" fill="none" stroke="var(--flame-line)" />
          <text x="72" y="161" fill="var(--bone)" fontSize="11">
            From ${getPackage("Launch").price.toLocaleString("en-US")}
          </text>
          <rect x="456" y="236" width="156" height="32" rx="16" fill="none" stroke="var(--flame-line)" />
          <text x="474" y="257" fill="var(--bone)" fontSize="11">
            Unlimited revisions
          </text>
        </g>
      );

    case "platforms":
      return (
        <g>
          <rect x="52" y="64" width="338" height="238" rx="14" fill={PANEL} stroke={SOFT} />
          <line x1="52" x2="390" y1="96" y2="96" stroke={SOFT} />
          <circle cx="74" cy="80" r="4" fill={FLAME} />
          <circle cx="90" cy="80" r="4" fill={LINE} />
          <circle cx="106" cy="80" r="4" fill={LINE} />
          <rect x="76" y="118" width="150" height="14" rx="7" fill={LINE} />
          <rect x="76" y="142" width="210" height="8" rx="4" fill={SOFT} />
          <rect x="76" y="160" width="180" height="8" rx="4" fill={SOFT} />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={76 + i * 98} y="196" width="86" height="82" rx="10" fill="none" stroke={i === 1 ? "var(--flame-line)" : SOFT} />
          ))}
          <rect x="350" y="104" width="134" height="262" rx="26" fill="var(--ink)" stroke={LINE} strokeWidth="1.5" />
          <rect x="396" y="114" width="42" height="8" rx="4" fill={SOFT} />
          <rect x="368" y="142" width="98" height="12" rx="6" fill={FLAME} />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x="368" y={172 + i * 46} width="98" height="34" rx="9" fill={PANEL} stroke={SOFT} />
              <circle cx="383" cy={189 + i * 46} r="7" fill={i === 0 ? FLAME : LINE} />
              <rect x="397" y={185 + i * 46} width="54" height="7" rx="3.5" fill={SOFT} />
            </g>
          ))}
          <rect x="368" y="322" width="98" height="26" rx="13" fill={FLAME} />
          <text x="52" y="332" fill="var(--bone-45)" fontSize="10">
            Web app
          </text>
          <text x="350" y="388" fill="var(--bone-45)" fontSize="10">
            Mobile app
          </text>
        </g>
      );

    case "ai":
      return (
        <g>
          <circle cx="320" cy="200" r="100" fill="none" stroke={SOFT} strokeDasharray="3 6" />
          <circle cx="320" cy="200" r="68" fill="none" stroke="var(--flame-line)" />
          {[
            [128, 104, "Your docs"],
            [512, 104, "Your data"],
            [128, 296, "Chat"],
            [512, 296, "A person"],
          ].map(([x, y, label]) => (
            <g key={label as string}>
              <line x1="320" y1="200" x2={x as number} y2={y as number} stroke={LINE} />
              <rect
                x={(x as number) - 54}
                y={(y as number) - 20}
                width="108"
                height="40"
                rx="12"
                fill={PANEL}
                stroke={label === "A person" ? FLAME : SOFT}
              />
              <text x={x as number} y={(y as number) + 4} fill="var(--bone-70)" fontSize="11" textAnchor="middle">
                {label as string}
              </text>
            </g>
          ))}
          <rect x="272" y="170" width="96" height="60" rx="16" fill={FLAME} />
          <text x="320" y="209" fill="var(--ink)" fontSize="26" fontWeight="800" textAnchor="middle" style={{ letterSpacing: "0.05em" }}>
            AI
          </text>
        </g>
      );

    case "chat":
      return (
        <g>
          <rect x="64" y="62" width="300" height="66" rx="20" fill={PANEL} stroke={SOFT} />
          <rect x="88" y="86" width="190" height="8" rx="4" fill={LINE} />
          <rect x="88" y="104" width="120" height="8" rx="4" fill={SOFT} />
          <rect x="276" y="150" width="300" height="88" rx="20" fill="var(--flame-soft)" stroke="var(--flame-line)" />
          <rect x="300" y="174" width="220" height="8" rx="4" fill="var(--bone-45)" />
          <rect x="300" y="192" width="190" height="8" rx="4" fill={LINE} />
          <rect x="300" y="210" width="86" height="8" rx="4" fill={LINE} />
          <rect x="64" y="262" width="256" height="50" rx="25" fill="none" stroke={LINE} strokeDasharray="4 5" />
          <circle cx="92" cy="287" r="11" fill="none" stroke={FLAME} strokeWidth="2" />
          <path d="M92 284 a3 3 0 1 0 0.01 0 M85 296 q7 -9 14 0" stroke={FLAME} strokeWidth="2" fill="none" strokeLinecap="round" />
          <text x="116" y="291" fill="var(--bone-70)" fontSize="11">
            Hands over to a person
          </text>
          <path d="M300 244 C300 262 270 270 242 276" stroke={FLAME} strokeWidth="1.5" fill="none" strokeDasharray="3 5" />
        </g>
      );

    case "flow":
      return (
        <g>
          {[
            [50, "Form", false],
            [260, "CRM", true],
            [470, "Follow-up", false],
          ].map(([x, label, on]) => (
            <g key={label as string}>
              <rect x={x as number} y="162" width="120" height="76" rx="16" fill={on ? FLAME : PANEL} stroke={on ? FLAME : SOFT} />
              <text x={(x as number) + 60} y="206" fill={on ? "var(--ink)" : "var(--bone)"} fontSize="13" fontWeight="700" textAnchor="middle">
                {label as string}
              </text>
            </g>
          ))}
          {[170, 380].map((x) => (
            <g key={x}>
              <line x1={x + 6} x2={x + 78} y1="200" y2="200" stroke={LINE} strokeWidth="1.5" />
              <path d={`M${x + 70} 192 L${x + 82} 200 L${x + 70} 208`} stroke={FLAME} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          ))}
          <path d="M530 252 C530 336 110 336 110 258" stroke={LINE} strokeWidth="1.5" fill="none" strokeDasharray="4 6" />
          <path d="M102 268 L110 256 L118 268" stroke={FLAME} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x="320" y="332" fill="var(--bone-45)" fontSize="10" textAnchor="middle">
            Two-way sync
          </text>
          {[86, 296, 506].map((x) => (
            <circle key={x} cx={x} cy="138" r="5" fill={FLAME} />
          ))}
        </g>
      );

    case "globe":
      return (
        <g>
          <circle cx="300" cy="200" r="124" fill={PANEL} stroke={LINE} />
          <ellipse cx="300" cy="200" rx="52" ry="124" fill="none" stroke={SOFT} />
          <ellipse cx="300" cy="200" rx="96" ry="124" fill="none" stroke={SOFT} />
          <ellipse cx="300" cy="200" rx="124" ry="36" fill="none" stroke={SOFT} />
          <line x1="176" x2="424" y1="200" y2="200" stroke={SOFT} />
          {[
            [262, 138, "Europe"],
            [210, 226, "US"],
            [318, 262, "Middle East"],
          ].map(([x, y, label]) => (
            <g key={label as string}>
              <path d={`M372 176 Q ${(372 + (x as number)) / 2} ${Math.min(176, y as number) - 56} ${x} ${y}`} stroke="var(--flame-line)" strokeWidth="1.5" fill="none" strokeDasharray="3 5" />
              <circle cx={x as number} cy={y as number} r="5" fill="var(--bone-70)" />
              <text x={(x as number) - 8} y={(y as number) + 20} fill="var(--bone-45)" fontSize="10">
                {label as string}
              </text>
            </g>
          ))}
          <circle cx="372" cy="176" r="18" fill="none" stroke="var(--flame-line)" />
          <circle cx="372" cy="176" r="7" fill={FLAME} />
          <rect x="400" y="124" width="150" height="30" rx="15" fill="var(--ink)" stroke="var(--flame-line)" />
          <text x="475" y="143" fill="var(--bone)" fontSize="11" textAnchor="middle">
            Lahore · UTC+5
          </text>
        </g>
      );
  }
}

export default function BlogCover({ kind }: { kind: CoverKind }) {
  const id = useId();
  return (
    <svg className="bc" viewBox="0 0 640 400" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id={`${id}-glow`} cx="88%" cy="6%" r="85%">
          <stop offset="0" stopColor="#ff5c35" stopOpacity="0.34" />
          <stop offset="1" stopColor="#ff5c35" stopOpacity="0" />
        </radialGradient>
        <pattern id={`${id}-dots`} width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="rgba(244,241,234,0.12)" />
        </pattern>
      </defs>
      <rect width="640" height="400" fill="var(--ink-raised)" />
      <rect width="640" height="400" fill={`url(#${id}-dots)`} />
      <rect width="640" height="400" fill={`url(#${id}-glow)`} />
      <Scene kind={kind} />
    </svg>
  );
}
