"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { IconType } from "react-icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { FiArrowUpRight, FiCalendar, FiChevronDown, FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { Magnetic } from "./animations";
import { isCurrent, NAV_BREAKPOINT, PAGES, type NavPage } from "@/lib/nav";
import { CONTACT_EMAIL as EMAIL, SOCIAL_LINKS } from "@/lib/site";

const EASE = [0.76, 0, 0.24, 1] as const;

const SOCIAL_ICONS: Record<string, IconType> = {
  GitHub: FiGithub,
  LinkedIn: FiLinkedin,
  X: FaXTwitter,
  Instagram: FiInstagram,
};

/*
  The row of links in the bar, from the nav breakpoint up. Contact and Book a
  call are not in it: they are the two buttons beside the row ("Start a
  project" is the Contact page), and a second link to the same place would
  only crowd the bar.
*/
const BUTTON_HREFS = ["/contact", "/book"];
const PRIMARY = PAGES.filter((p) => !BUTTON_HREFS.includes(p.href));

/*
  The menu lists the home page first, then every page, with the reading
  pages (the blog and the FAQs) tucked under one "Resources" row so the whole
  list fits a phone's screen without scrolling. The group sits where the
  first of its pages would have.
*/
const RESOURCE_HREFS = ["/blog", "/faqs"];

type MenuItem = NavPage | { label: string; children: NavPage[] };

const MENU: MenuItem[] = (() => {
  const items: MenuItem[] = [{ label: "Home", href: "/" }];
  let placed = false;
  for (const p of PAGES) {
    if (RESOURCE_HREFS.includes(p.href)) {
      if (!placed) {
        items.push({ label: "Resources", children: PAGES.filter((x) => RESOURCE_HREFS.includes(x.href)) });
        placed = true;
      }
      continue;
    }
    items.push(p);
  }
  return items;
})();

/* "#home" is an anchor on the home page itself; everything else is a page. */
function NavLink({
  href,
  children,
  ...rest
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  "aria-current"?: "page";
  "aria-label"?: string;
  "data-cursor"?: string;
  style?: CSSProperties;
}) {
  return href.startsWith("#") ? (
    <a href={href} {...rest}>
      {children}
    </a>
  ) : (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  /*
    The menu is open for one page. Remembering which means a change of page
    closes it by itself (the remembered page no longer matches), without an
    effect having to notice and reset it.
  */
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;
  /* "Resources" starts open when the visitor is already on one of its pages. */
  const [resOpen, setResOpen] = useState(() => RESOURCE_HREFS.some((h) => isCurrent(pathname, h)));
  const burgerRef = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll();

  const close = useCallback(() => setOpenAt(null), []);

  /* On the home page the logo scrolls to the top; from anywhere else it goes there. */
  const homeHref = pathname === "/" ? "#home" : "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /*
    While the menu is open:
    - the page behind it can't scroll, and can't be reached with the keyboard
      or a screen reader (`inert`);
    - focus moves into the menu, and Tab cycles through the bar's own
      controls and the menu rather than escaping to the page;
    - Escape closes it and hands focus back to the menu button;
    - widening the window past the nav breakpoint closes it, because the
      button that closes it is gone from there up.
    Only runs while the menu is actually open, so mounting the navbar never
    clears a scroll lock owned by someone else (the intro panel).
  */
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    const behind = document.querySelectorAll<HTMLElement>("main, footer");
    behind.forEach((el) => el.setAttribute("inert", ""));
    document.querySelector<HTMLElement>("#site-menu a")?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenAt(null);
        burgerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;

      const items = [
        ...document.querySelectorAll<HTMLElement>(
          ".nav-bar a[href], .nav-bar button, #site-menu a[href], #site-menu button"
        ),
      ].filter((el) => el.getClientRects().length > 0);
      if (!items.length) return;

      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);

    const desktop = window.matchMedia(`(min-width: ${NAV_BREAKPOINT}px)`);
    const onWiden = (e: MediaQueryListEvent) => e.matches && setOpenAt(null);
    desktop.addEventListener("change", onWiden);

    return () => {
      document.body.style.overflow = "";
      behind.forEach((el) => el.removeAttribute("inert"));
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onWiden);
    };
  }, [open]);

  return (
    <>
      {/* On a visit that gets the intro curtain, the bar waits at opacity 0
          and fades in once the curtain is clear (html[data-intro] in
          globals.css) — the anvil lands exactly on `.nav-mark`, so the bar
          must wait in its final position, not slide into it. Everyone else
          sees it in the first paint. */}
      <header
        className="nav-bar"
        data-scrolled={scrolled}
        data-menu={open ? "open" : undefined}
      >
        <div className="nav-inner">
          <Magnetic strength={0.25}>
            {/*
              The link is named by aria-label rather than by its contents:
              "Digital" drops out of the visible text below 350px, and the
              mark's alt would otherwise be read out as well as the words
              next to it ("WebForge Digital logo WebForge Digital"). The
              link should always carry the full name. The alt is for image
              search and audits, which count an empty one as missing.
            */}
            <NavLink
              href={homeHref}
              onClick={close}
              aria-label="WebForge Digital, home"
              style={{
                fontFamily: "var(--f-display)",
                fontWeight: 800,
                fontSize: "clamp(0.9rem, 3vw, 1.05rem)",
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: "var(--bone)",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                whiteSpace: "nowrap",
              }}
            >
              <Image
                src="/brand/mark-light.png"
                alt="WebForge Digital logo"
                className="nav-mark"
                width={32}
                height={19}
                priority
                style={{ display: "block" }}
              />
              <span>WebForge</span>
              <span
                className="nav-digital"
                style={{ color: "var(--bone-45)", fontWeight: 600 }}
              >
                Digital
              </span>
            </NavLink>
          </Magnetic>

          <div className="nav-right">
            <nav className="nav-links" aria-label="Primary">
              {PRIMARY.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="nav-link"
                  aria-current={isCurrent(pathname, l.href) ? "page" : undefined}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* The two ways to start, beside the row of links: a call, or a
                written enquiry. Shown only where the row is (see
                .nav-actions). Below that width the menu button is all the bar
                has, and the menu lists both, so the bar never shows the two
                side by side. */}
            <div className="nav-actions">
              <Link
                href="/book"
                className="nav-btn"
                data-cursor="Book"
                aria-current={isCurrent(pathname, "/book") ? "page" : undefined}
              >
                <FiCalendar size={13} aria-hidden="true" />
                Book a call
              </Link>
              <Link
                href="/contact"
                className="nav-cta"
                data-cursor="Talk"
                aria-current={isCurrent(pathname, "/contact") ? "page" : undefined}
              >
                Start a project
              </Link>
            </div>

            {/*
              A plain wrapper carries the hide, for two reasons: hiding
              only the button would leave its Magnetic div in the flex
              row with the 1.5rem gap still reserved beside the button,
              and Magnetic writes display:inline-block as an inline
              style, which no stylesheet rule can override.
            */}
            <div className="burger-wrap">
              <Magnetic strength={0.2}>
                {/* The open/close transform lives in CSS next to the bars'
                    own positioning — the two have to agree on the exact
                    gap to converge into a clean X. */}
                <button
                  ref={burgerRef}
                  className="burger"
                  data-open={open}
                  onClick={() => setOpenAt(open ? null : pathname)}
                  aria-label={open ? "Close menu" : "Open menu"}
                  aria-expanded={open}
                  aria-controls="site-menu"
                >
                  <span />
                  <span />
                </button>
              </Magnetic>
            </div>
          </div>
        </div>

        <motion.div
          className="nav-progress"
          style={{ scaleX: scrollYProgress, width: "100%" }}
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            className="menu-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            /* Lenis would otherwise take the wheel and scroll the page behind
               a menu that is taller than the screen. */
            data-lenis-prevent
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <div className="menu-shell">
              <nav className="menu-main" aria-label="Menu">
                <p className="mono-label menu-eyebrow">Menu</p>
                <ul className="menu-list">
                  {MENU.map((item, i) => {
                    if ("children" in item) {
                      const inside = item.children.some((c) => isCurrent(pathname, c.href));
                      return (
                        <li
                          key={item.label}
                          className="menu-row-wrap"
                          style={{ "--i": i } as CSSProperties}
                        >
                          <button
                            type="button"
                            className="menu-row menu-row-btn"
                            aria-expanded={resOpen}
                            aria-controls="menu-resources"
                            aria-current={inside ? "true" : undefined}
                            onClick={() => setResOpen((v) => !v)}
                          >
                            <span className="menu-index" aria-hidden="true">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="menu-label">{item.label}</span>
                            <FiChevronDown
                              className="menu-arrow menu-chevron"
                              data-open={resOpen}
                              size={20}
                              aria-hidden="true"
                            />
                          </button>
                          <div id="menu-resources" className="menu-sub-wrap" data-open={resOpen}>
                            <ul className="menu-sub" inert={!resOpen}>
                              {item.children.map((c) => (
                                <li key={c.href}>
                                  <NavLink
                                    href={c.href}
                                    className="menu-subrow"
                                    aria-current={isCurrent(pathname, c.href) ? "page" : undefined}
                                    onClick={close}
                                  >
                                    <span>{c.label}</span>
                                    <FiArrowUpRight size={16} aria-hidden="true" />
                                  </NavLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </li>
                      );
                    }
                    const current =
                      item.href === "/" ? pathname === "/" : isCurrent(pathname, item.href);
                    return (
                      <li
                        key={item.href}
                        className="menu-row-wrap"
                        style={{ "--i": i } as CSSProperties}
                      >
                        <NavLink
                          href={item.href === "/" ? homeHref : item.href}
                          className="menu-row"
                          aria-current={current ? "page" : undefined}
                          onClick={close}
                        >
                          <span className="menu-index" aria-hidden="true">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="menu-label">{item.label}</span>
                          <FiArrowUpRight className="menu-arrow" size={20} aria-hidden="true" />
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="menu-aside" style={{ "--i": MENU.length } as CSSProperties}>
                <Link
                  href="/contact"
                  className="btn btn-solid menu-cta"
                  onClick={close}
                  data-cursor="Talk"
                >
                  <span>Start a project</span>
                  <FiArrowUpRight aria-hidden="true" />
                </Link>

                <div className="menu-contact">
                  <a href={`mailto:${EMAIL}`} className="menu-email link-sweep">
                    {EMAIL}
                  </a>
                  <p className="menu-where">Lahore, Pakistan</p>
                </div>

                <ul className="menu-socials">
                  {SOCIAL_LINKS.map(({ url, label }) => {
                    const Icon = SOCIAL_ICONS[label];
                    return (
                      <li key={url}>
                        <a
                          href={url}
                          className="social"
                          aria-label={label}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {Icon ? <Icon size={16} aria-hidden="true" /> : label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
