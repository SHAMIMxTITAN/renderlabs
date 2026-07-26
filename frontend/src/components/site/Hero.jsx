import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { HERO_VIDEO } from "@/data/content";
import { MagneticButton } from "./MagneticButton";

const EASE = [0.22, 1, 0.36, 1];

const HERO_POSTER = "/hero-poster.webp";

const WORDS = [
  { t: "Impossible" },
  { t: "to" },
  { t: "ignore.", accent: true },
];

const ScrollWord = ({ children, accent, progress, start, end }) => {
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [28, 0]);
  return (
    <motion.span
      style={{ opacity, y }}
      className={`inline-block mr-[0.28em] ${accent ? "text-[#3b82f6]" : "text-white"}`}
    >
      {children}
    </motion.span>
  );
};

const mobileWord = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const Hero = () => {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    const m = window.matchMedia("(max-width: 768px)");
    const on = () => setIsMobile(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Video only ever scales UP. Going below 1 pulls it off the edges and
  // exposes the page behind it, which is what caused the visible square.
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  // Hero fades out underneath the incoming section.
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  // All copy lands before the overlap begins at ~0.375.
  const subOpacity = useTransform(scrollYProgress, [0.19, 0.27], [0, 1]);
  const subY = useTransform(scrollYProgress, [0.19, 0.27], [24, 0]);
  const btnOpacity = useTransform(scrollYProgress, [0.26, 0.34], [0, 1]);
  const btnY = useTransform(scrollYProgress, [0.26, 0.34], [24, 0]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (!el) return;
    if (window.lenis) window.lenis.scrollTo(el, { offset: -80 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  const mobileWrap = isMobile
    ? { variants: { show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }, initial: "hidden", animate: "show" }
    : {};

  return (
    <section
      ref={ref}
      id="home"
      data-testid="hero"
      className={isMobile ? "relative z-0 h-screen" : "relative z-0 h-[260vh]"}
    >
      <motion.div
        style={{ opacity: isMobile ? 1 : heroOpacity }}
        className={`${isMobile ? "relative" : "sticky top-0"} h-screen w-full overflow-hidden bg-black`}
      >
        {isMobile ? (
          <img
            src={HERO_POSTER}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <motion.video
            data-testid="hero-video"
            src={HERO_VIDEO}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={HERO_POSTER}
            style={{ scale: videoScale }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-black/75" />

        <motion.div
          key={isMobile ? "m" : "d"}
          {...mobileWrap}
          className="relative z-10 h-screen flex flex-col items-center justify-center text-center px-6"
        >
          <motion.div
            variants={isMobile ? mobileWord : undefined}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 backdrop-blur px-4 py-1.5 mb-7"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#3b82f6]" />
            <span className="text-xs font-medium tracking-wide uppercase text-white/90">
              Creative Studio for Brands
            </span>
          </motion.div>

          <h1 className="font-display font-extrabold tracking-[-0.04em] leading-[0.95] max-w-5xl text-white text-5xl sm:text-7xl lg:text-8xl flex flex-wrap justify-center">
            {WORDS.map((w, i) =>
              isMobile ? (
                <motion.span
                  key={`m-${i}`}
                  variants={mobileWord}
                  className={`inline-block mr-[0.28em] ${w.accent ? "text-[#3b82f6]" : "text-white"}`}
                >
                  {w.t}
                </motion.span>
              ) : (
                <ScrollWord
                  key={`d-${i}`}
                  accent={w.accent}
                  progress={scrollYProgress}
                  start={0.03 + i * 0.035}
                  end={0.03 + i * 0.035 + 0.09}
                >
                  {w.t}
                </ScrollWord>
              )
            )}
          </h1>

          <motion.p
            variants={isMobile ? mobileWord : undefined}
            style={isMobile ? {} : { opacity: subOpacity, y: subY }}
            className="mt-8 max-w-xl text-lg font-light leading-relaxed text-white/80"
          >
            Video, imagery, motion, and landing pages — crafted with real
            creative direction for brands and businesses.
          </motion.p>

          <motion.div
            variants={isMobile ? mobileWord : undefined}
            style={isMobile ? {} : { opacity: btnOpacity, y: btnY }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <MagneticButton
              data-testid="hero-view-work"
              onClick={() => scrollTo("#work")}
              className="group inline-flex items-center gap-2 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium px-7 py-3.5 transition-colors"
            >
              View Work
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <button
              data-testid="hero-contact"
              onClick={() => scrollTo("#contact")}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur border border-white/30 text-white font-medium px-7 py-3.5 transition-all hover:scale-[1.03]"
            >
              Start a project
            </button>
          </motion.div>
        </motion.div>

        <motion.button
          onClick={() => scrollTo("#services")}
          aria-label="Scroll down"
          data-testid="hero-scroll-indicator"
          style={{ opacity: isMobile ? 1 : scrollOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors"
        >
          <span className="text-[11px] font-medium tracking-[0.25em] uppercase">Scroll</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={16} />
          </motion.span>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
