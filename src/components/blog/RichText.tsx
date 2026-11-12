import type { ReactNode } from "react";
import Link from "next/link";

/*
  A line of post copy with its [label](/path) links turned into real links.
  Anything that is not in that shape is plain text, so the copy in
  src/lib/blog.ts stays readable as it is written. Internal links use the
  site's own router; anything starting with http opens as a normal link.
*/
const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

export default function RichText({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let last = 0;

  for (const m of text.matchAll(LINK)) {
    const at = m.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    const [, label, href] = m;
    out.push(
      href.startsWith("http") ? (
        <a key={at} href={href} className="link-sweep blog-link" rel="noopener">
          {label}
        </a>
      ) : (
        <Link key={at} href={href} className="link-sweep blog-link">
          {label}
        </Link>
      ),
    );
    last = at + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));

  return <>{out}</>;
}
