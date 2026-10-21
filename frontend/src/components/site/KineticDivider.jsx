import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";

const PHRASE = ["AI Video", "Editing", "Clipping", "Thumbnails", "Motion Graphics", "Ads", "Web Design"];

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

export const KineticDivider = () => {
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const stopped = paused || reducedMotion;
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <div
      ref={ref}
      data-testid="kinetic-divider"
      className="relative w-full overflow-hidden border-y border-[#ededed] bg-white py-6 md:py-8"
    >
      <p className="sr-only">{PHRASE.join(", ")}</p>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-end mb-3">
        <button
          type="button"
          aria-controls="services-ticker"
          aria-pressed={Boolean(stopped)}
          disabled={Boolean(reducedMotion)}
          onClick={() => setPaused((value) => !value)}
          className="text-sm font-medium underline underline-offset-4 disabled:no-underline"
        >
          {reducedMotion ? "Motion disabled" : paused ? "Resume ticker" : "Pause ticker"}
        </button>
      </div>
      <div
        id="services-ticker"
        data-testid="kinetic-track"
        className="rl-ticker flex w-max whitespace-nowrap"
        style={{ animationPlayState: stopped || !inView ? "paused" : "running" }}
      >
        <Track />
        <Track />
      </div>
    </div>
  );
};

export default KineticDivider;
