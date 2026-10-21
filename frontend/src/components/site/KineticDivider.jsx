import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";

const PHRASE = ["AI Video Editing", "Thumbnails", "Motion Graphics", "AI Images", "Clipping", "Ads in a Day"];

const Track = () => (
  <div className="flex items-center shrink-0" aria-hidden="true">
    {PHRASE.map((word, i) => (
      <span key={i} className="flex items-center">
        <span className="font-display font-extrabold tracking-[-0.02em] text-[#111111] text-3xl md:text-5xl px-6 md:px-10">
          {word}
        </span>
        <span className="text-[#2563eb] text-2xl md:text-4xl">✦</span>
      </span>
    ))}
  </div>
);

// Runs non-stop by design (no pause control). It only stops for visitors whose
// system asks for reduced motion, and idles while scrolled off screen (unseen).
export const KineticDivider = () => {
  const reducedMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <div
      ref={ref}
      data-testid="kinetic-divider"
      className="relative w-full overflow-hidden border-y border-[#ededed] bg-white py-6 md:py-8"
    >
      <p className="sr-only">{PHRASE.join(", ")}</p>
      <div
        id="services-ticker"
        data-testid="kinetic-track"
        className="rl-ticker flex w-max whitespace-nowrap"
        style={{ animationPlayState: reducedMotion || !inView ? "paused" : "running" }}
      >
        <Track />
        <Track />
      </div>
    </div>
  );
};

export default KineticDivider;
