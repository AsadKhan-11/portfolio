import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import BlogCover from "./BlogCover";
import { readingMinutes, type Post } from "@/lib/blog";

/*
  A post as a card: the picture, the topic and reading time, the title and
  the summary. The blog index and the "more from the blog" row under a post
  both draw it, so a post looks the same wherever it is listed.
*/
export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="pcard" data-cursor="Read">
      <span className="pcard-cover">
        <BlogCover kind={post.cover} />
      </span>
      <span className="pcard-body">
        <span className="pcard-meta mono-label">
          <span className="pcard-cat">{post.category}</span>
          <span>{readingMinutes(post)} min read</span>
        </span>
        <span className="pcard-title">{post.title}</span>
        <span className="pcard-desc">{post.description}</span>
        <span className="pcard-foot mono-label">
          <time dateTime={post.published}>{post.publishedLabel}</time>
          <span className="pcard-go">
            Read <FiArrowUpRight aria-hidden="true" />
          </span>
        </span>
      </span>
    </Link>
  );
}
