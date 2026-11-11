"use client";

import Link from "next/link";
import { useScrollSpy } from "../useScrollSpy";
import type { LegalDoc } from "@/lib/legal";

/*
  A legal page: a short header, then the table of contents down the left
  (sticky, with the section being read highlighted) beside the document. On a
  phone the contents become a row of chips under the header.
*/
export default function LegalPage({ doc }: { doc: LegalDoc }) {
  const [active, setActive] = useScrollSpy(doc.sections.map((s) => s.id));
  const other = doc.slug === "privacy" ? { href: "/terms", label: "Terms of Service" } : { href: "/privacy", label: "Privacy Policy" };

  return (
    <>
      <header className="legal-head">
        <div className="shell">
          <p className="eyebrow">Legal</p>
          <h1 className="legal-title">{doc.title}</h1>
          <p className="legal-meta mono-label">Last updated {doc.updatedLabel}</p>
        </div>
      </header>

      <div className="shell legal">
        <aside className="legal-toc">
          <p className="legal-toc-label mono-label">On this page</p>
          <nav aria-label="Table of contents">
            <ol>
              {doc.sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={`legal-link${active === s.id ? " is-on" : ""}`}
                    aria-current={active === s.id ? "true" : undefined}
                    onClick={() => setActive(s.id)}
                  >
                    <span className="legal-link-n">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article className="legal-body">
          <p className="legal-intro">{doc.intro}</p>
          {doc.sections.map((s, i) => (
            <section key={s.id} id={s.id} className="legal-section" aria-labelledby={`${s.id}-h`}>
              <h2 id={`${s.id}-h`}>
                <span className="legal-h-n mono-label">{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </h2>
              {s.body.map((b, j) =>
                Array.isArray(b) ? (
                  <ul key={j}>
                    {b.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                ) : (
                  <p key={j}>{b}</p>
                ),
              )}
            </section>
          ))}
          <p className="legal-also">
            Also see the{" "}
            <Link href={other.href} className="link-sweep" style={{ color: "var(--flame)" }}>
              {other.label}
            </Link>
            .
          </p>
        </article>
      </div>
    </>
  );
}
