import { useEffect } from "react";
import Lenis from "lenis";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { KineticDivider } from "@/components/site/KineticDivider";
import { Services } from "@/components/site/Services";
import { Work } from "@/components/site/Work";
import { Imagery } from "@/components/site/Imagery";
import { About } from "@/components/site/About";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { Grain } from "@/components/site/Grain";

export default function Landing() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    window.lenis = lenis;
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-[#111111] selection:bg-[#111111] selection:text-white">
      <Grain />
      <Navbar />
      <main>
        <Hero />
        <KineticDivider />
        <Services />
        <Work />
        <Imagery />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
