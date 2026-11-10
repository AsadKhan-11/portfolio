import Link from "next/link";
import { FiArrowDownRight, FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { Reveal } from "../animations";
import { MaskWords, after } from "../heroMotion";
import ImageSlot from "../ImageSlot";
import { CaseCards, Crumbs, SectionHead } from "../service/ServiceSections";
import { ROLES } from "@/lib/profile";
import { SERVICES, serviceHref } from "@/lib/services";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/site";

/*
  The About page. Everything here restates something the home page already
  says (the profile, the path, the FAQ on time zones, how projects run); the
  page exists so that "who is Asad Khan" has an address of its own that
  search engines and people can land on and link to.
*/

/* The three studies this page shows. Swap in newer projects as they ship. */
const FEATURED_WORK = ["ironside-gym", "vector-academy", "veloura"];

const PRINCIPLES = [
  {
    title: "One person, start to finish",
    body: "You deal with the developer doing the work. Design, build and launch happen under one roof, with no hand-offs between departments.",
  },
  {
    title: "A fixed quote first",
    body: "After we've talked through what you need, I quote a fixed price, so there are no surprises halfway through or on the invoice.",
  },
  {
    title: "A staging link, any day",
    body: "You can open a working version any day of the week, so progress is something you see rather than something you're told.",
  },
  {
    title: "You own what I build",
    body: "The repository, the assets and any accounts set up for the project are yours once the final invoice is settled. No proprietary framework, and nothing that needs you to keep paying me to keep it running.",
  },
];

const TOOLKIT = [
  { group: "Front end", items: ["React", "Next.js", "TypeScript", "Tailwind", "HTML5 & CSS3"] },
  { group: "Back end", items: ["Node.js", "MongoDB", "REST APIs", "Webhooks"] },
  { group: "Mobile", items: ["React Native"] },
  { group: "Payments & integrations", items: ["Stripe", "GoHighLevel"] },
  { group: "AI", items: ["LLM APIs", "Retrieval over your own data"] },
  { group: "Design", items: ["Figma", "Design systems"] },
];

export function AboutHero() {
  return (
    <section className="svc-hero">
      <div className="shell">
        <Crumbs trail={[{ label: "Home", href: "/" }, { label: "About" }]} />

        <div className="svc-about-grid">
          <div>
            <p className="eyebrow hero-in hero-in-fade" style={after(0.05)}>
              About
            </p>

            <h1 className="svc-title">
              <MaskWords text="I’m Asad Khan, a full stack developer" delay={0.1} />{" "}
              <span className="serif-em" style={{ color: "var(--flame)" }}>
                <MaskWords text="building for clients worldwide." delay={0.5} />
              </span>
            </h1>

            <p className="svc-lede hero-in" style={after(0.4)}>
              I build complete web products, from the first pixel of an interface to
              the last line of the API behind it. I&rsquo;m based in Lahore, Pakistan,
              and I work with founders and teams worldwide.
            </p>
            <p className="svc-lede hero-in" style={after(0.48)}>
              People hire me when they want one person who can carry a product all the
              way: design that sells the idea, and engineering that doesn&rsquo;t fall
              over once it works.
            </p>

            <div className="svc-cta-row hero-in" style={after(0.56)}>
              <Link href="/#contact" className="btn btn-solid" data-cursor="Talk">
                <span>Start a project</span>
              </Link>
              <Link href="/#work" className="link-sweep hero-quiet-link">
                See the work <FiArrowDownRight />
              </Link>
            </div>
          </div>

          <figure className="svc-about-photo hero-in" style={after(0.3)}>
            <ImageSlot
              src="/about/workspace.jpg"
              alt="Asad Khan working at his desk in Lahore"
              slot="/about/workspace.jpg"
              ratio="4 / 5"
              sizes="(max-width: 900px) 90vw, 40vw"
              priority
            />
            <figcaption className="mono-label">The desk in Lahore</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

export function AboutApproach() {
  return (
    <section className="section bg-glow-tr">
      <div className="rule-top" />
      <div className="shell">
        <SectionHead
          eyebrow="01 · Approach"
          title="How I"
          em="work"
          lede="Working with me looks like this: no hand-offs, no surprises, and a finished product you fully own."
        />

        <div className="svc-cards">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} className="svc-cell" delay={(i % 2) * 0.06}>
              <article className="svc-card panel tick">
                <span className="svc-card-n">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="svc-card-title">{p.title}</h3>
                <p className="svc-card-body">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutToolkit() {
  return (
    <section className="section bg-grid">
      <div className="rule-top" />
      <div className="shell">
        <SectionHead
          eyebrow="02 · Toolkit"
          title="What I build"
          em="with"
          lede="The MERN stack (MongoDB, Express, React and Node.js) is the backbone of most projects, plus whatever else the job needs."
        />

        <div className="svc-cards svc-cards-3">
          {TOOLKIT.map((t, i) => (
            <Reveal key={t.group} className="svc-cell" delay={(i % 3) * 0.06}>
              <div className="svc-card panel">
                <p className="mono-label">{t.group}</p>
                <ul className="svc-tags">
                  {t.items.map((item) => (
                    <li key={item}>
                      <span className="tag">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutPath() {
  return (
    <section className="section">
      <div className="rule-top" />
      <div className="shell">
        <SectionHead
          eyebrow="03 · Path"
          title="Where"
          em="I've worked"
          lede="Short and honest. Client work since 2023, WebForge Digital since 2024, and now full stack work at MyntorX while the studio keeps shipping."
        />

        <ol className="svc-roles">
          {ROLES.map((r) => (
            <li key={r.period}>
              <Reveal>
                <div className="svc-role panel tick">
                  <p className="mono-label">{r.period}</p>
                  <h3 className="svc-card-title">
                    {r.title} <span className="svc-role-org">· {r.org}</span>
                  </h3>
                  <p className="svc-card-body">{r.copy}</p>
                  <ul className="svc-tags">
                    {r.stack.map((t) => (
                      <li key={t}>
                        <span className="tag">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function AboutZones() {
  return (
    <section className="section bg-raised">
      <div className="rule-top" />
      <div className="shell">
        <div className="svc-split">
          <Reveal>
            <p className="eyebrow">04 · Location</p>
            <h2 className="svc-h2">From Lahore, for clients worldwide</h2>
            <p className="svc-card-body" style={{ maxWidth: "52ch" }}>
              Most of my clients are outside Pakistan. I&rsquo;m in Lahore (UTC+5), which
              overlaps comfortably with Europe, the Middle East and Asia, and I keep early
              evenings free for calls with the US. Async updates and a staging link mean
              you&rsquo;re never waiting on a timezone to see progress.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="svc-pkg panel tick">
              <p className="mono-label">Based in</p>
              <p className="svc-price">
                Lahore, Pakistan
                <small>UTC+5</small>
              </p>
              <p className="svc-card-body">
                I reply within a day. Tell me what you&rsquo;re building and I&rsquo;ll come
                back with questions, or a fixed quote once the scope is clear.
              </p>
              <Link href="/#contact" className="link-sweep svc-aside-link">
                Get in touch
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function AboutWork() {
  return (
    <section className="section bg-glow-bl">
      <div className="rule-top" />
      <div className="shell">
        <SectionHead
          eyebrow="05 · Work"
          title="Selected"
          em="work"
          lede="A few of the platforms and sites I've built. Each has a full case study: what was built, and why."
        />
        <CaseCards slugs={FEATURED_WORK} />
        <Reveal delay={0.1}>
          <div className="case-more-cta">
            <Link href="/#work" className="btn">
              <span>View all work</span>
              <FiArrowRight />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function AboutServices() {
  return (
    <section className="section">
      <div className="rule-top" />
      <div className="shell">
        <SectionHead
          eyebrow="06 · Services"
          title="What I"
          em="do"
          lede="Six things I get hired for, from AI features to the storefront underneath them. Most projects use several at once."
        />

        <ul className="svc-more">
          {SERVICES.map((x) => (
            <li key={x.slug}>
              <Link href={serviceHref(x.slug)} className="svc-more-link panel tick" data-cursor="Read">
                <span className="svc-card-n">{x.n}</span>
                <span className="svc-more-name">{x.name}</span>
                <span className="svc-card-body">{x.short}</span>
                <FiArrowRight className="svc-more-arrow" size={18} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function AboutElsewhere() {
  return (
    <section className="section bg-raised">
      <div className="rule-top" />
      <div className="shell">
        <Reveal>
          <div className="svc-elsewhere panel">
            <div>
              <p className="eyebrow">Elsewhere</p>
              <h2 className="svc-h2">Find me online</h2>
            </div>
            <ul className="svc-links">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="link-sweep">
                  {CONTACT_EMAIL} <FiArrowUpRight size={14} aria-hidden="true" />
                </a>
              </li>
              {SOCIAL_LINKS.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="link-sweep">
                    {s.label} <FiArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
