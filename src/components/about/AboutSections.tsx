import Link from "next/link";
import { FiArrowDownRight } from "react-icons/fi";
import { Reveal } from "../animations";
import { after } from "../heroMotion";
import ImageSlot from "../ImageSlot";
import { PageHero } from "../page/PageParts";
import SectionHead from "../SectionHead";
import { AVAILABILITY, PROFILE } from "@/lib/profile";

/*
  What is particular to the About page. The profile copy is the home page's
  (lib/profile.ts), and the rest of the page (the figures, the "why me"
  comparison, the toolkit, the career, the projects, the services, the closing
  call to action) is the same component the home page and the other pages use.

  The first screen carries the name, the one-line statement and the portrait
  and nothing longer: it fills the screen, and two paragraphs on top of the
  headline made it taller than a laptop's. The fuller account of who and how
  is the section right under it.
*/

/*
  The portrait. It is the largest thing on About's first screen, so where it
  sits decides how fast that screen is. Beside the words (960px and wider) it
  is part of the first screen; on a phone it would sit under them and take up
  most of what is left of the screen, which made it the slowest thing to
  paint and left the hero taller than the screen. So a phone gets the same
  figure at the top of the story that follows (AboutStory) and the hero keeps
  to the words. Both are lazy: whichever one is hidden is never fetched.
*/
function Portrait() {
  return (
    <ImageSlot
      src="/about/workspace.webp"
      alt="Asad Khan working at his desk in Lahore"
      slot="/about/workspace.webp"
      ratio="4 / 5"
      sizes="(max-width: 900px) 90vw, 40vw"
    />
  );
}

export function AboutHero() {
  return (
    <PageHero
      trail={[{ label: "Home", href: "/" }, { label: "About" }]}
      eyebrow="About"
      lead="I’m Asad Khan,"
      em="a full stack developer in Lahore."
      lede={PROFILE.statement}
      kicker={`${AVAILABILITY} · Lahore, Pakistan`}
      asideOnMobile
      aside={
        <figure className="svc-about-photo svc-about-photo-hero hero-in" style={after(0.3)}>
          <Portrait />
          <figcaption className="mono-label">The desk in Lahore</figcaption>
        </figure>
      }
    >
      <Link href="/contact" className="btn btn-solid" data-cursor="Talk">
        <span>Start a project</span>
      </Link>
      <Link href="/work" className="btn">
        See the projects <FiArrowDownRight />
      </Link>
    </PageHero>
  );
}

/* The fuller account that doesn't fit on the first screen: who, then how. */
export function AboutStory() {
  return (
    <section className="section">
      <div className="rule-top" />
      <div className="shell">
        <SectionHead eyebrow="01 · Story" title="Who you’ll" em="work with" />

        {/* Only below 960px: from there up the portrait is in the first screen. */}
        <Reveal>
          <figure className="svc-about-photo svc-about-photo-story">
            <Portrait />
            <figcaption className="mono-label">The desk in Lahore</figcaption>
          </figure>
        </Reveal>

        <div className="svc-split svc-story-grid">
          <Reveal>
            <p className="mono-label">Who I am</p>
            <p className="svc-story">{PROFILE.intro}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mono-label">How I work</p>
            <p className="svc-story">{PROFILE.workingWithMe}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
