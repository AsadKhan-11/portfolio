import { Reveal, SplitText } from "./animations";

/*
  The heading every section opens with: a numbered label, a two-line title
  (plain words, then a flame-coloured serif ending) and one paragraph. The
  home page's sections and the same sections on their own pages all use this,
  so a change to how sections begin is made once.

  No "use client": it renders as plain markup on the server, and its animated
  parts (SplitText, Reveal) are the client components it is built from.
*/
export interface Head {
  eyebrow: string;
  title: string;
  em: string;
  lede?: string;
}

export default function SectionHead({ eyebrow, title, em, lede }: Head) {
  return (
    <div className="section-head">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="section-title" style={{ marginTop: "1.75rem" }}>
          <SplitText text={title} />
          <br />
          <span className="serif-em" style={{ color: "var(--flame)" }}>
            <SplitText text={em} delay={0.1} />
          </span>
        </h2>
      </div>
      {lede && (
        <Reveal delay={0.15}>
          <p className="lede">{lede}</p>
        </Reveal>
      )}
    </div>
  );
}
