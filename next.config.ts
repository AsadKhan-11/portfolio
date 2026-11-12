import type { NextConfig } from "next";

/*
  The site is built as plain static files (out/) and served by Cloudflare,
  which hosts static files for free. Nothing on the site needs a server
  except the contact form's mail endpoint, which is a small Worker in
  worker/, outside Next (see wrangler.jsonc).

  Two consequences:
  - A static export cannot run Next's image optimizer, so next/image
    serves each file as it is in public/ instead of resizing it per
    device. Measured on phone width, a full scroll of a case study loads
    roughly 0.5 to 1.2 MB more than it would through the optimizer.
  - `next start` does not apply. Preview the built site with
    `npm run preview:cf`, which also runs the contact Worker.
*/
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },

  /*
    Only while developing. public/live/ holds two apps built as static sites
    (see scripts/build-live-apps.sh), each page a folder with an index.html in
    it. Cloudflare serves /live/ironside-gym/members/ from members/index.html
    by itself; `next dev` does not, and answered with this site's 404 page.
    These rewrites do what Cloudflare does. They apply only to paths with no
    file behind them, so the apps' scripts and styles are served as they are,
    and a static export cannot have rewrites at all, so the build never sees them.
  */
  ...(process.env.NODE_ENV === "development"
    ? {
        async rewrites() {
          return {
            beforeFiles: [],
            afterFiles: [
              { source: "/live/:app", destination: "/live/:app/index.html" },
              { source: "/live/:app/:path*", destination: "/live/:app/:path*/index.html" },
            ],
            fallback: [],
          };
        },
      }
    : {}),
};

export default nextConfig;
