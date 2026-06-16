import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Play } from "lucide-react";
import { WORK } from "@/data/content";
import { Reveal } from "./Reveal";

export const Work = () => {
  const [active, setActive] = useState(null);

  return (
    <section id="work" data-testid="work" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-sm font-medium tracking-wide uppercase text-[#9ca3af] mb-4">
                Selected work
              </p>
              <h2 className="font-display font-extrabold tracking-[-0.03em] text-[#111111] text-4xl md:text-6xl leading-[0.98]">
                Things we've rendered.
              </h2>
            </div>
            <p className="text-[#4b5563] font-light max-w-xs md:text-right">
              A glimpse of recent motion, imagery and film work.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {WORK.map((w, i) => (
            <Reveal key={w.id} delay={i * 0.06}>
              <button
                data-testid={`work-item-${w.id}`}
                onClick={() => setActive(w)}
                onMouseEnter={(e) => {
                  const v = e.currentTarget.querySelector("video");
                  if (v) v.play().catch(() => {});
                }}
                onMouseLeave={(e) => {
                  const v = e.currentTarget.querySelector("video");
                  if (v) {
                    v.pause();
                    v.currentTime = 0.1;
                  }
                }}
                className="group relative block w-full overflow-hidden rounded-2xl border border-[#eceef0] bg-[#f7f7f7] aspect-video text-left"
              >
                <video
                  src={`${w.src}#t=0.1`}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-black/0 opacity-90" />
                <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/85 backdrop-blur flex items-center justify-center opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  <Play size={16} className="text-[#111111] fill-[#111111]" />
                </div>
                <div className="absolute bottom-0 left-0 p-5 translate-y-1.5 opacity-90 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-xs font-medium uppercase tracking-wide text-white/75">
                    {w.category}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-white">
                    {w.title}
                  </h3>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            data-testid="work-lightbox"
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="relative w-full max-w-4xl"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                data-testid="work-lightbox-close"
                onClick={() => setActive(null)}
                className="absolute -top-12 right-0 text-white/80 hover:text-white flex items-center gap-2 text-sm"
              >
                Close <X size={20} />
              </button>
              <div className="rounded-2xl overflow-hidden bg-black">
                <video
                  src={active.src}
                  controls
                  autoPlay
                  loop
                  playsInline
                  className="w-full max-h-[78vh] object-contain bg-black"
                />
              </div>
              <div className="mt-4">
                <span className="text-xs font-medium uppercase tracking-wide text-white/60">
                  {active.category}
                </span>
                <h3 className="font-display text-xl font-semibold text-white">
                  {active.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Work;
