"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/*
  Inertia scrolling for the whole page. Lenis drives the real scroll
  position, so every scroll-linked animation (parallax, the work reel,
  the experience rope) keeps reading true values — nothing re-binds.

  In-page anchors are routed through lenis.scrollTo so a nav click
  glides instead of jumping, stopping short of the fixed header.
  Reduced-motion users keep native scrolling untouched.
*/
export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      // ease-out-expo, matching the site's signature easing
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    let raf = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    });

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest?.(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash.length < 2) return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -84 });
      history.pushState(null, "", hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  /*
    Start a new page at the top.

    Lenis owns the scroll position, and this provider lives in the root
    layout, so it survives client-side navigation and Next's own
    scroll-to-top never takes effect. Without this, clicking a project on
    the work shelf — which sits about a thousand pixels down the home
    page — opened the case study already scrolled past its hero.

    A hash is left alone: /?ref=slug#contact has to land on the form.
  */
  useEffect(() => {
    if (window.location.hash) return;
    const lenis = lenisRef.current;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0); // reduced motion: no Lenis to drive
  }, [pathname]);

  return null;
}
