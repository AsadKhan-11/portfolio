import { Fragment, type CSSProperties } from "react";

/*
  The pieces of the hero entrance that other pages reuse. No "use client":
  nothing here needs the browser, so server components (the service pages)
  can render them as plain HTML. See "Hero entrance" in globals.css for how
  the transitions are driven.
*/

/** Hands an element's delay to its CSS transition as --d. */
export const after = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

/*
  Word-by-word mask reveal. The words are real text, one inline-block each,
  so the heading reads as one sentence to search engines and screen readers.
  The slide itself is a CSS transition (.mask-word-inner), not Framer Motion
  state: the headline no longer has to wait for the page to hydrate.
*/
export function MaskWords({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          {/* The space belongs between the boxes, in the heading's own line.
              Left at the end of an inline-block it collapses to nothing and
              the words run together. */}
          {i > 0 && " "}
          <span className="mask-word">
            <span className="mask-word-inner" style={after(delay + i * 0.06)}>
              {word}
            </span>
          </span>
        </Fragment>
      ))}
    </>
  );
}
