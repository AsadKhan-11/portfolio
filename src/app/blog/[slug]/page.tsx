import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogPost from "@/components/blog/BlogPost";
import { PageCta } from "@/components/page/PageParts";
import { POSTS, getPost } from "@/lib/blog";
import { blogPostJsonLd } from "@/lib/pageJsonLd";
import { pageMetadata } from "@/lib/seo";

/* Every post is prerendered at build time. */
export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const base = pageMetadata({
    title: post.metaTitle,
    description: post.description,
    path: `/blog/${post.slug}`,
  });

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.published,
      authors: ["Asad Khan"],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: blogPostJsonLd(post) }}
      />
      <Navbar />
      <main className="flex-1 relative" style={{ zIndex: 2 }}>
        <BlogPost post={post} />
        <PageCta copy={post.cta} from={`blog/${post.slug}`} />
      </main>
      <Footer />
    </>
  );
}
