import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";
import { WORK } from "@/data/content";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Reveal } from "./Reveal";

export const Work = () => {
  const [active, setActive] = useState(null);
  const opener = useRef(null);
  const reducedMotion = useReducedMotion();

  return (
    <section id="work" data-testid="work" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-sm font-medium tracking-wide uppercase text-[var(--rl-muted)] mb-4">
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
                onClick={(event) => {
                  opener.current = event.currentTarget;
                  setActive(w);
                }}
                onMouseEnter={(e) => {
                  if (reducedMotion) return;
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

      <Dialog open={Boolean(active)} onOpenChange={(open) => { if (!open) setActive(null); }}>
        {active && (
          <DialogContent
            data-testid="work-lightbox"
            className="z-[60] w-[calc(100%_-_2rem)] max-w-4xl border-0 bg-transparent p-0 text-white shadow-none [&>button]:rounded-full [&>button]:bg-black/70 [&>button]:p-2 [&>button]:text-white [&>button]:opacity-100"
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              opener.current?.focus();
            }}
          >
            <div className="rounded-2xl overflow-hidden bg-black">
              <video
                src={active.src}
                controls
                autoPlay={!reducedMotion}
                loop
                playsInline
                className="w-full max-h-[70vh] object-contain bg-black"
              />
            </div>
            <div>
              <DialogDescription className="text-xs font-medium uppercase tracking-wide text-white/90">
                {active.category}
              </DialogDescription>
              <DialogTitle className="font-display text-xl font-semibold text-white">
                {active.title}
              </DialogTitle>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
};

export default Work;
