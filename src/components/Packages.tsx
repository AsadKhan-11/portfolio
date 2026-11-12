"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { FiArrowRight, FiCheck, FiMinus, FiSliders } from "react-icons/fi";
import { Reveal, Stagger, StaggerItem } from "./animations";
import SectionHead, { type Head } from "./SectionHead";
import { COMPARE, PACKAGES } from "@/lib/packages";

/*
  The one set of packages. The home page's section, the /packages page and
  the packages shown on the services page are all this: the same three cards,
  the same "custom" strip, and the same table. The prices and features come
  from lib/packages.ts. `ctaHref` is where the buttons go: "#contact" on the
  home page, where the form is a section further down, and "/contact"
  everywhere else.
*/
function CtaLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  return href.startsWith("#") ? (
    <a href={href} className={className} data-cursor="Get started">
      {children}
    </a>
  ) : (
    <Link href={href} className={className} data-cursor="Get started">
      {children}
    </Link>
  );
}

export function PackageGrid({ ctaHref = "#contact" }: { ctaHref?: string }) {
  return (
    <Stagger className="pkg-grid" gap={0.08}>
      {PACKAGES.map(({ n, name, audience, price, features, featured }) => (
        <StaggerItem key={n} className="pkg-cell">
          <article className={`pkg-card tick${featured ? " is-featured" : ""}`}>
            {featured && (
              <span className="pkg-badge">
                <FiCheck size={11} />
                Most popular
              </span>
            )}

            <div className="pkg-head">
              <span className="pkg-dot" aria-hidden="true" />
              <h3 className="pkg-name">{name}</h3>
            </div>
            <p className="pkg-desc">{audience}</p>

            <div className="pkg-price-block">
              <p className="pkg-price">
                <span className="pkg-price-from">from</span>
                <span className="pkg-price-num">${price.toLocaleString("en-US")}</span>
              </p>
              <span className="mono-label">one-off project cost</span>
            </div>

            <div className="pkg-divider" />

            <ul className="pkg-features">
              {features.map((f) => (
                <li key={f}>
                  <FiCheck size={13} aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>

            <CtaLink href={ctaHref} className={`btn pkg-cta${featured ? " btn-solid" : ""}`}>
              <span>Talk about {name}</span>
            </CtaLink>
          </article>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export function PackageCustom({ ctaHref = "#contact" }: { ctaHref?: string }) {
  return (
    <Reveal delay={0.1}>
      <div className="pkg-custom">
        <span className="pkg-custom-icon" aria-hidden="true">
          <FiSliders size={20} />
        </span>
        <div className="pkg-custom-copy">
          <h3 className="pkg-custom-title">Need something custom?</h3>
          <p className="pkg-custom-desc">
            Bigger scope, unusual integrations, or a build that doesn&rsquo;t
            fit a fixed tier? Let&rsquo;s scope it together. Price is set
            once I know exactly what you need, not before.
          </p>
        </div>
        <CtaLink href={ctaHref} className="btn btn-solid pkg-custom-cta">
          <span>Discuss your project</span>
        </CtaLink>
      </div>
    </Reveal>
  );
}

/*
  The three packages side by side, a row to each thing they can include.
  Shown in full, not folded away: someone weighing the tiers is closest to
  deciding at exactly this point. On a narrow screen it scrolls sideways
  inside its own frame, and the feature names stay put.
*/
export function PackageCompare() {
  return (
    <Reveal>
      <div className="pkg-compare-wrap" role="region" aria-label="Package comparison" tabIndex={0}>
        <table className="pkg-compare">
          <caption className="sr-only">What each package includes</caption>
          <thead>
            <tr>
              <th scope="col">
                <span className="sr-only">Feature</span>
              </th>
              {PACKAGES.map((p) => (
                <th key={p.name} scope="col" className={p.featured ? "is-featured" : undefined}>
                  <span className="pkg-compare-name">{p.name}</span>
                  <span className="pkg-compare-price">from ${p.price.toLocaleString("en-US")}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARE.map((row) => (
              <tr key={row.feature}>
                <th scope="row">{row.feature}</th>
                {row.values.map((v, i) => (
                  <td key={PACKAGES[i].name} className={PACKAGES[i].featured ? "is-featured" : undefined}>
                    {v === true ? (
                      <>
                        <FiCheck className="pkg-yes" size={16} aria-hidden="true" />
                        <span className="sr-only">Included</span>
                      </>
                    ) : v === false ? (
                      <>
                        <FiMinus className="pkg-no" size={16} aria-hidden="true" />
                        <span className="sr-only">Not included</span>
                      </>
                    ) : (
                      v
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}

const HEAD: Head = {
  eyebrow: "03 · Packages",
  title: "Pick a",
  em: "package",
  lede: "Fixed scope, fixed price, a clear finish line. Pick the one that matches where you’re starting from, or use it as a starting point for a conversation.",
};

/*
  The section. With no props it is the home page's. `head={false}` drops the
  heading where a page's first screen has already said what the page is, and
  `more={false}` drops the link to the packages page where you are already on it.
*/
export default function Packages({
  head = HEAD,
  ctaHref = "#contact",
  more = true,
}: {
  head?: Head | false;
  ctaHref?: string;
  more?: boolean;
}) {
  return (
    <section id="packages" className="section bg-raised">
      <div className="rule-top" />
      <div className="shell">
        {head ? <SectionHead {...head} /> : <h2 className="sr-only">The three packages</h2>}

        <PackageGrid ctaHref={ctaHref} />
        <PackageCustom ctaHref={ctaHref} />

        {more && (
          <Reveal delay={0.15}>
            <div className="case-more-cta">
              <Link href="/packages" className="btn btn-solid" data-cursor="See">
                <span>Compare the packages</span>
                <FiArrowRight />
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
