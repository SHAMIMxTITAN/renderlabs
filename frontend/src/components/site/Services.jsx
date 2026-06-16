import { Clapperboard, Sparkles, Orbit, LayoutTemplate } from "lucide-react";
import { SERVICES } from "@/data/content";
import { Reveal } from "./Reveal";

const ICONS = { Clapperboard, Sparkles, Orbit, LayoutTemplate };

export const Services = () => (
  <section id="services" data-testid="services" className="py-20 md:py-28 bg-[#f7f7f7]">
    <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-10 lg:gap-14">
      <div className="lg:col-span-4">
        <Reveal>
          <p className="text-sm font-medium tracking-wide uppercase text-[#9ca3af] mb-4">
            What we do
          </p>
          <h2 className="font-display font-extrabold tracking-[-0.03em] text-[#111111] text-4xl md:text-6xl leading-[0.98]">
            Four crafts, one creative engine.
          </h2>
          <p className="mt-6 text-lg font-light leading-relaxed text-[#4b5563] max-w-sm">
            One studio for everything visual — from first frame to finished page,
            powered by AI and guided by taste.
          </p>
        </Reveal>
      </div>

      <div className="lg:col-span-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <Reveal key={s.key} delay={i * 0.08}>
                <div
                  data-testid={`service-card-${s.key}`}
                  className="group relative h-full overflow-hidden rounded-2xl bg-white border border-[#eceef0] p-8 md:p-9 transition-all duration-300 hover:border-[#2563eb]/40 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-30px_rgba(17,17,17,0.2)]"
                >
                  <span className="pointer-events-none absolute -bottom-6 -right-3 font-display font-black leading-none text-[8rem] md:text-[10rem] text-[#f1f3f6] transition-colors duration-300 group-hover:text-[#e3ebfd] select-none">
                    0{i + 1}
                  </span>

                  <div className="relative z-10">
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-[#eff6ff] text-[#2563eb] transition-colors group-hover:bg-[#2563eb] group-hover:text-white">
                      <Icon size={22} strokeWidth={1.8} />
                    </div>
                    <h3 className="mt-7 font-display text-xl md:text-2xl font-semibold tracking-tight text-[#111111]">
                      <span className="relative inline-block">
                        {s.title}
                        <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#2563eb] transition-all duration-300 group-hover:w-full" />
                      </span>
                    </h3>
                    <p className="mt-3 text-[#4b5563] font-light leading-relaxed max-w-xs">
                      {s.copy}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default Services;
