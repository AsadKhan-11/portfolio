import type { Metadata } from "next";
import { Syne, Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import MotionProvider from "@/components/MotionProvider";
import Preloader from "@/components/Preloader";
import ShaderField from "@/components/ShaderField";
import SmoothScroll from "@/components/SmoothScroll";

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

export const metadata: Metadata = {
  title: "WebForge Digital · Full Stack Web Studio",
  description:
    "WebForge Digital is the full stack studio of Asad Khan. Design and engineering under one roof: fast, considered web products built with React, Next.js, Node.js, and MongoDB.",
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
  openGraph: {
    title: "WebForge Digital · Full Stack Web Studio",
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
    title: "WebForge Digital · Full Stack Web Studio",
    description:
      "Design and engineering under one roof. Fixed quotes, honest timelines, and web products you fully own.",
    images: ["/brand/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${instrument.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MotionProvider>
          <SmoothScroll />
          <Preloader />
          <ShaderField />
          <div className="vignette" aria-hidden="true" />
          <div className="grain" aria-hidden="true" />
          <Cursor />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
