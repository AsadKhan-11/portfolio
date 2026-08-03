import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import About from "@/components/About";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Band from "@/components/Band";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 relative" style={{ zIndex: 2 }}>
        <Hero />
        <Ticker />
        <About />
        <Services />
        <Skills />
        <Band />
        <Work />
        <Experience />
        <Process />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
