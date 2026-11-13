import type { Metadata } from "next";
import { Syne, Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import MotionProvider from "@/components/MotionProvider";
import Preloader from "@/components/Preloader";
import { IdleShaderField } from "@/components/LazyFields";
import SmoothScroll from "@/components/SmoothScroll";
import { INTRO_BOOT_SCRIPT } from "@/lib/introBoot";
import { SITE_URL, SOCIALS } from "@/lib/site";

/* Display — geometric, characterful. Carries every headline. */
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

/* Editorial italic for emphasis words inside display type. */
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

/*
  Search shows about 60 characters of a title and about 160 of a description,
  and SEO audits flag anything outside 50–60 and 120–160 (Google itself has no
  length rule). The shape is the brand, a bar and the three things the studio
  is hired for; then a sentence on what it does and who is behind it. Several
  businesses are called WebForge or Forge Digital, so a search for the name has
  to land on a result that says which one this is: Asad Khan, in Lahore.
*/
const TITLE = "WebForge Digital | Web Apps, Mobile Apps & AI Integration";
const DESCRIPTION =
  "WebForge Digital builds software that brings in clients. Asad Khan, a full stack developer in Lahore, specializes in web apps, mobile apps and AI integration.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "WebForge Digital",
    "Web Studio",
    "Full Stack Developer",
    "MERN Stack",
    "React Developer",
    "Next.js",
    "Web Developer",
    "Lahore",
    "Pakistan",
  ],
  authors: [{ name: "Asad Khan" }],
  /*
    Default for every route. `large` lets Search show a full-width image
    preview instead of a thumbnail, which is what a portfolio wants; the
    snippet and video caps are lifted because nothing here is gated.
  */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: TITLE,
    description:
      "Design and engineering under one roof. Fixed quotes, honest timelines, and web products you fully own.",
    type: "website",
    siteName: "WebForge Digital",
    images: [
      {
        url: "/brand/og.jpg",
        width: 1200,
        height: 630,
        alt: "WebForge Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "Design and engineering under one roof. Fixed quotes, honest timelines, and web products you fully own.",
    images: ["/brand/og.jpg"],
  },
};

/*
  Structured data: who and what this site is. Static, so safe to inline.

  The WebSite node is what Search reads to render the site name beside a
  result, which is why the case study <title>s no longer spend characters
  repeating the brand.
*/
const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "WebForge Digital",
      /* The one-word spelling is the domain's and what people type; Google reads
         alternate names when it picks the name shown above a result. */
      alternateName: ["WebForge", "WebForgeDigital"],
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#webforge` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#webforge`,
      name: "WebForge Digital",
      url: SITE_URL,
      description:
        "Full stack web studio: websites, client portals and web apps, designed, built and launched by one developer with a fixed quote.",
      founder: { "@type": "Person", "@id": `${SITE_URL}/#asad-khan`, name: "Asad Khan" },
      areaServed: "Worldwide",
      address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
      sameAs: SOCIALS,
    },
  ],
}).replace(/</g, "\\u003c");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${instrument.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}
      /* The script below adds data-intro to this element before React sees it. */
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {/* Says, before first paint, whether the intro curtain will play, so
            the hero is only hidden for visits that actually get a curtain. */}
        <script dangerouslySetInnerHTML={{ __html: INTRO_BOOT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON_LD }}
        />
        <MotionProvider>
          <SmoothScroll />
          <Preloader />
          <IdleShaderField />
          <div className="vignette" aria-hidden="true" />
          <div className="grain" aria-hidden="true" />
          <Cursor />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
