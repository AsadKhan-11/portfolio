import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { Reveal } from "./animations";
import PostCard from "./blog/PostCard";
import SectionHead from "./SectionHead";
import { POSTS } from "@/lib/blog";

/*
  The home page's blog section: the three newest posts as cards and the way
  through to all of them. Sits just above the closing contact section. The
  posts come from the same list as the blog page, so a new post turns up
  here by itself.
*/
const LATEST = [...POSTS].sort((a, b) => b.published.localeCompare(a.published)).slice(0, 3);

export default function HomeBlog() {
  return (
    <section id="blog" className="section">
      <div className="rule-top" />
      <div className="shell">
        <SectionHead
          eyebrow="Blog"
          title="Straight answers"
          em="for people who build"
          lede="What a website costs, when an app beats a site, how to add AI without breaking what works. Short guides written from the projects I build."
        />

        <ul className="pgrid pgrid-snap" data-lenis-prevent-touch>
          {LATEST.map((p, i) => (
            <li key={p.slug}>
              <Reveal delay={i * 0.08} className="pgrid-reveal">
                <PostCard post={p} />
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <div className="case-more-cta">
            <Link href="/blog" className="btn btn-solid" data-cursor="Read">
              <span>Read the blog</span>
              <FiArrowRight />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
