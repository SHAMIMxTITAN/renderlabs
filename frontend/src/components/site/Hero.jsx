import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, ArrowDown } from "lucide-react";
import { HERO_VIDEO } from "@/data/content";
import { MagneticButton } from "./MagneticButton";

const EASE = [0.22, 1, 0.36, 1];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export const Hero = () => {
  const [hideScroll, setHideScroll] = useState(false);

  useEffect(() => {
    const onScroll = () => setHideScroll(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      data-testid="hero"
      className="relative min-h-screen flex items-center pt-28 pb-24 md:pt-24 md:pb-0"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-[#f7f7f7] px-4 py-1.5 mb-8"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb]" />
            <span className="text-xs font-medium tracking-wide uppercase text-[#4b5563]">
              AI-Powered Creative Studio
            </span>
          </motion.div>

          <h1 className="font-display font-extrabold tracking-[-0.04em] leading-[0.95] text-[#111111] text-6xl sm:text-7xl lg:text-[5.5rem] xl:text-8xl">
            <motion.span variants={item} className="block">
              Editing,
            </motion.span>
            <motion.span variants={item} className="block">
              imagery, motion
            </motion.span>
            <motion.span variants={item} className="block">
              & web — <span className="text-[#2563eb]">by AI.</span>
            </motion.span>
          </h1>

          <motion.p
            variants={item}
            className="mt-8 max-w-md text-lg font-light leading-relaxed text-[#4b5563]"
          >
            AI-driven editing, imagery, motion, and web design — crafted with
            real creative direction for high-end brands.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              data-testid="hero-view-work"
              onClick={() => scrollTo("#work")}
              className="group inline-flex items-center gap-2 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium px-7 py-3.5 transition-colors"
            >
              View Work
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </MagneticButton>
            <button
              data-testid="hero-contact"
              onClick={() => scrollTo("#contact")}
              className="inline-flex items-center gap-2 rounded-full bg-[#f3f4f6] hover:bg-[#e5e7eb] text-[#111111] font-medium px-7 py-3.5 transition-all hover:scale-[1.03]"
            >
              Start a project
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.3 }}
          className="relative"
        >
          <div className="relative rounded-[28px] overflow-hidden border border-[#e5e7eb] bg-[#f7f7f7] aspect-[4/5] sm:aspect-[16/12] lg:aspect-[4/5] shadow-[0_40px_90px_-50px_rgba(17,17,17,0.35)]">
            <video
              data-testid="hero-video"
              src={HERO_VIDEO}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18?crop=entropy&cs=srgb&fm=jpg&q=70&w=1000"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/85 backdrop-blur px-3.5 py-1.5">
              <Play size={13} className="text-[#2563eb] fill-[#2563eb]" />
              <span className="text-xs font-medium text-[#111111]">Showreel</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollTo("#services")}
        aria-label="Scroll down"
        data-testid="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: hideScroll ? 0 : 1 }}
        transition={{ duration: 0.5, ease: EASE, delay: hideScroll ? 0 : 1.4 }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-[#9ca3af] hover:text-[#111111] transition-colors"
      >
        <span className="text-[11px] font-medium tracking-[0.2em] uppercase">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.button>
    </section>
  );
};

export default Hero;
