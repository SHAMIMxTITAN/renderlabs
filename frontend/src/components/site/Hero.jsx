import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { HERO_VIDEO } from "@/data/content";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export const Hero = () => {
  const scrollTo = (href) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" data-testid="hero" className="relative pt-36 pb-20 md:pt-44 md:pb-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div variants={item} className="inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-[#f7f7f7] px-4 py-1.5 mb-7">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb]" />
            <span className="text-xs font-medium tracking-wide uppercase text-[#4b5563]">
              AI-Powered Creative Studio
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display font-extrabold tracking-tighter leading-[0.98] text-[#111111] text-5xl sm:text-6xl lg:text-7xl"
          >
            Editing, imagery,
            <br />
            motion & web —
            <br />
            <span className="text-[#2563eb]">rendered by AI.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-7 max-w-md text-lg font-light leading-relaxed text-[#4b5563]"
          >
            AI-driven editing, imagery, motion, and web design — crafted with
            real creative direction for high-end brands.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <button
              data-testid="hero-view-work"
              onClick={() => scrollTo("#work")}
              className="group inline-flex items-center gap-2 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium px-7 py-3.5 transition-all hover:scale-[1.03]"
            >
              View Work
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              data-testid="hero-contact"
              onClick={() => scrollTo("#contact")}
              className="inline-flex items-center gap-2 rounded-full bg-[#f3f4f6] hover:bg-[#e5e7eb] text-[#111111] font-medium px-7 py-3.5 transition-colors"
            >
              Start a project
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative"
        >
          <div className="relative rounded-[28px] overflow-hidden border border-[#e5e7eb] bg-[#f7f7f7] aspect-[4/5] sm:aspect-[16/12] lg:aspect-[4/5]">
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
    </section>
  );
};

export default Hero;
