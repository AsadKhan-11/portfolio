import type { Metadata } from "next";
import { Syne, Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import MotionProvider from "@/components/MotionProvider";
import Preloader from "@/components/Preloader";
import ShaderField from "@/components/ShaderField";

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
  title: "Asad Khan — Full Stack Developer",
  description:
    "Full Stack MERN Developer based in Lahore, Pakistan. Building modern, scalable web applications with React, Next.js, Node.js, and MongoDB.",
  keywords: [
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
    title: "Asad Khan — Full Stack Developer",
    description: "Full Stack MERN Developer crafting modern web experiences.",
    type: "website",
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
