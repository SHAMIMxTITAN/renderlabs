import { IMAGERY } from "@/data/content";
import { Reveal } from "./Reveal";

export const Imagery = () => {
  // Duplicate the set back-to-back so the -50% translate loops seamlessly.
  const loop = [...IMAGERY, ...IMAGERY];

  return (
    <section
      id="imagery"
      data-testid="imagery"
      className="py-28 md:py-44 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal>
          <p className="text-sm font-medium tracking-wide uppercase text-[#9ca3af] mb-4">
            AI Imagery
          </p>
          <h2 className="font-display font-bold tracking-[-0.03em] text-[#111111] text-3xl md:text-5xl leading-[1.03]">
            Shot entirely by AI.
          </h2>
          <p className="mt-5 max-w-2xl text-lg font-light leading-relaxed text-[#4b5563]">
            Editorial-grade product and fashion imagery, generated end to end —
            no studio, no camera, no shoot.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-16">
        <div className="rl-marquee group relative">
          {/* edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 z-10 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 z-10 bg-gradient-to-l from-white to-transparent" />

          <div
            className="rl-marquee-track flex w-max gap-5 md:gap-6"
            data-testid="imagery-marquee-track"
          >
            {loop.map((src, i) => (
              <div
                key={i}
                data-testid={`imagery-card-${i}`}
                className="group/card relative shrink-0 h-[340px] sm:h-[400px] md:h-[460px] aspect-[3/4] overflow-hidden rounded-2xl border border-[#eceef0] bg-[#f7f7f7]"
              >
                <img
                  src={src}
                  alt="AI-generated imagery"
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
