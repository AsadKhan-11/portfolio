"use client";

import Link from "next/link";
import { useScrollSpy } from "../useScrollSpy";
import BlogCover from "./BlogCover";
import PostCard from "./PostCard";
import RichText from "./RichText";
import { otherPosts, readingMinutes, type Post } from "@/lib/blog";

/*
  A post: a short header with the topic, date and reading time, then the table
  of contents down the left (sticky, with the section being read highlighted)
  beside the article, and the other posts under it. It reuses the legal pages'
  layout classes (.legal, .legal-toc, .legal-body), so the contents behave the
  same way everywhere on the site, and on a phone become a row of chips.
*/
export default function BlogPost({ post }: { post: Post }) {
  const [active, setActive] = useScrollSpy(post.sections.map((s) => s.id));
  const more = otherPosts(post.slug);

  return (
    <>
      <header className="legal-head blog-head">
        <div className="shell blog-head-grid">
          <div>
            <nav aria-label="Breadcrumb" className="svc-crumbs">
              <ol>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
                <li>
                  <span aria-current="page">{post.category}</span>
                </li>
              </ol>
            </nav>
            <p className="eyebrow">{post.category}</p>
            <h1 className="legal-title blog-title">{post.title}</h1>
            <p className="legal-meta mono-label">
              By Asad Khan · <time dateTime={post.published}>{post.publishedLabel}</time> ·{" "}
              {readingMinutes(post)} min read
            </p>
          </div>
          <div className="blog-head-cover">
            <BlogCover kind={post.cover} />
          </div>
        </div>
      </header>

      <div className="shell legal">
        <aside className="legal-toc">
          <p className="legal-toc-label mono-label">In this post</p>
          <nav aria-label="Table of contents">
            <ol>
              {post.sections.map((s, i) => (
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

        <article className="legal-body blog-body">
          <p className="legal-intro">{post.intro}</p>
          {post.sections.map((s) => (
            <section key={s.id} id={s.id} className="legal-section" aria-labelledby={`${s.id}-h`}>
              <h2 id={`${s.id}-h`}>{s.title}</h2>
              {s.body.map((b, j) =>
                Array.isArray(b) ? (
                  <ul key={j}>
                    {b.map((li) => (
                      <li key={li}>
                        <RichText text={li} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p key={j}>
                    <RichText text={b} />
                  </p>
                ),
              )}
            </section>
          ))}

          <aside className="blog-next" aria-label="Related pages">
            <p className="mono-label">Keep going</p>
            <ul>
              {post.related.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="link-sweep blog-link">
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </article>
      </div>

      {more.length > 0 && (
        <section className="shell blog-more" aria-labelledby="more-h">
          <h2 id="more-h" className="blog-more-title">
            More from the <span className="serif-em" style={{ color: "var(--flame)" }}>blog</span>
          </h2>
          <ul className="pgrid">
            {more.map((p) => (
              <li key={p.slug}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
