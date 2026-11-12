import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageCta, PageHero } from "@/components/page/PageParts";
import { POSTS, readingMinutes } from "@/lib/blog";
import { pageJsonLd } from "@/lib/pageJsonLd";
import { pageMetadata } from "@/lib/seo";

const TITLE = "Web Development Blog · Pricing, AI and Hiring Guides";
const DESCRIPTION =
  "Plain-spoken guides on what websites and apps cost, how to add AI to a product, when a chatbot helps and how to hire a developer. Written by Asad Khan.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/blog" });

const sorted = [...POSTS].sort((a, b) => b.published.localeCompare(a.published));

export default function BlogIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: pageJsonLd({
            path: "/blog",
            type: "CollectionPage",
            title: TITLE,
            description: DESCRIPTION,
            crumbs: [{ name: "Home", path: "/" }, { name: "Blog" }],
            list: sorted.map((p) => ({ name: p.title, path: `/blog/${p.slug}` })),
          }),
        }}
      />
      <Navbar />
      <main className="flex-1 relative" style={{ zIndex: 2 }}>
        <PageHero
          trail={[{ label: "Home", href: "/" }, { label: "Blog" }]}
          eyebrow="Blog"
          lead="Straight answers"
          em="for people who build."
          lede="What a website costs, when an app beats a site, how to add AI without breaking what works. Written from the projects I build, in plain words, with no filler."
        />

        <section className="section" aria-labelledby="posts-h">
          <div className="shell">
            <h2 id="posts-h" className="sr-only">
              All posts
            </h2>
            <ul className="blog-list">
              {sorted.map((p, i) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="blog-row">
                    <span className="blog-row-n mono-label">{String(i + 1).padStart(2, "0")}</span>
                    <span className="blog-row-main">
                      <span className="blog-card-cat mono-label">{p.category}</span>
                      <span className="blog-row-title">{p.title}</span>
                      <span className="blog-row-desc">{p.description}</span>
                    </span>
                    <span className="blog-row-meta mono-label">
                      <time dateTime={p.published}>{p.publishedLabel}</time>
                      <span>{readingMinutes(p)} min read</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <PageCta copy="Have a question these posts didn't answer? Ask me directly. I reply within a day, with an answer or with a fixed quote once the scope is clear." from="blog" />
      </main>
      <Footer />
    </>
  );
}
