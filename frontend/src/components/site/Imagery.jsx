import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { IMAGERY } from "@/data/content";
import { Reveal } from "./Reveal";

export const Imagery = () => {
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const stopped = paused || reducedMotion;
  // Duplicate the set back-to-back so the -50% translate loops seamlessly.
  const loop = stopped ? IMAGERY : [...IMAGERY, ...IMAGERY];

  return (
    <section
      id="imagery"
      data-testid="imagery"
      className="py-20 md:py-32 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal>
          <p className="text-sm font-medium tracking-wide uppercase text-[var(--rl-muted)] mb-4">
            AI Imagery
          </p>
          <h2 className="font-display font-extrabold tracking-[-0.03em] text-[#111111] text-4xl md:text-6xl leading-[0.98]">
            Shot entirely by AI.
          </h2>
          <p className="mt-5 max-w-2xl text-lg font-light leading-relaxed text-[#4b5563]">
            Editorial-grade product and fashion imagery, generated end to end —
            no studio, no camera, no shoot.
          </p>
          <div className="mt-5">
            <button
              type="button"
              aria-controls="imagery-gallery"
              aria-pressed={Boolean(stopped)}
              disabled={Boolean(reducedMotion)}
              onClick={() => setPaused((value) => !value)}
              className="text-sm font-medium underline underline-offset-4 disabled:no-underline"
            >
              {reducedMotion ? "Motion disabled" : paused ? "Resume gallery" : "Pause gallery"}
            </button>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-16">
        <div
          id="imagery-gallery"
          data-paused={stopped ? "true" : "false"}
          className={`rl-marquee group relative ${stopped ? "rl-marquee-scroll overflow-x-auto" : ""}`}
          role={stopped ? "region" : undefined}
          aria-label={stopped ? "AI imagery gallery, scroll horizontally to see all images" : undefined}
          tabIndex={stopped ? 0 : undefined}
        >
          {/* edge fades */}
          {!stopped && (
            <>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 z-10 bg-gradient-to-r from-white to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 z-10 bg-gradient-to-l from-white to-transparent" />
            </>
          )}

          <div
            className="rl-marquee-track flex w-max gap-5 md:gap-6"
            data-testid="imagery-marquee-track"
            style={{ animationPlayState: stopped ? "paused" : undefined }}
          >
            {loop.map((src, i) => (
              <div
                key={i}
                data-testid={`imagery-card-${i}`}
                aria-hidden={i >= IMAGERY.length ? true : undefined}
                className="group/card relative shrink-0 h-[340px] sm:h-[400px] md:h-[460px] aspect-[3/4] overflow-hidden rounded-2xl border border-[#eceef0] bg-[#f7f7f7]"
              >
                <img
                  src={src}
                  alt={i >= IMAGERY.length ? "" : "AI-generated imagery"}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default Imagery;
