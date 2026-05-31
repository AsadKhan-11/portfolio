import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingBackground from "@/components/FloatingBackground";

export default function Home() {
  return (
    <>
      <FloatingBackground />
      <Navbar />
      <main className="flex-1 relative z-[1]">
        <Hero />
        <About />
        <Services />
        <Skills />
        <Experience />
        <Projects />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
