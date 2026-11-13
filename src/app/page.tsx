import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Ticker from "@/components/Ticker";
import About from "@/components/About";
import Services from "@/components/Services";
import Packages from "@/components/Packages";
import Band from "@/components/Band";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Faq from "@/components/Faq";
import HomeBlog from "@/components/HomeBlog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 relative" style={{ zIndex: 2 }}>
        <Hero />
        <Stats />
        <Work />
        <Ticker />
        <Services />
        <Packages />
        <Band />
        <About />
        <Process />
        <Contact />
        <Faq />
        <HomeBlog />
      </main>
      <Footer />
    </>
  );
}
