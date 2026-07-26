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
        {/*
          Everything after the hero rides above it (z-10) and is pulled up by
          exactly one viewport (-mt-[100vh]) so it slides over the pinned hero.
          The 100vh is not arbitrary: any less and the hero unpins while still
          partly visible, which flashes the page background.
          Mobile keeps normal stacking, since the hero isn't sticky there.
        */}
        <div className="relative z-10 bg-white md:-mt-[100vh]">
          <KineticDivider />
          <Services />
          <Work />
          <Imagery />
          <About />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}
