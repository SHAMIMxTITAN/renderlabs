import { Clapperboard, Sparkles, Orbit, LayoutTemplate } from "lucide-react";
import { SERVICES } from "@/data/content";
import { Reveal } from "./Reveal";

const ICONS = { Clapperboard, Sparkles, Orbit, LayoutTemplate };

export const Services = () => (
  <section id="services" data-testid="services" className="py-24 md:py-32 bg-[#f7f7f7]">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <Reveal>
        <p className="text-sm font-medium tracking-wide uppercase text-[#9ca3af] mb-4">
          What we do
        </p>
        <h2 className="font-display font-bold tracking-tight text-[#111111] text-3xl md:text-5xl max-w-2xl leading-[1.05]">
          Four crafts, one creative engine.
        </h2>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {SERVICES.map((s, i) => {
          const Icon = ICONS[s.icon];
          return (
            <Reveal key={s.key} delay={i * 0.08}>
              <div
                data-testid={`service-card-${s.key}`}
                className="group h-full rounded-2xl bg-white border border-[#eceef0] p-9 md:p-10 transition-all duration-300 hover:border-[#2563eb]/40 hover:-translate-y-1"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-[#eff6ff] text-[#2563eb] transition-colors group-hover:bg-[#2563eb] group-hover:text-white">
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <h3 className="mt-7 font-display text-xl md:text-2xl font-semibold tracking-tight text-[#111111]">
                  {s.title}
                </h3>
                <p className="mt-3 text-[#4b5563] font-light leading-relaxed max-w-sm">
                  {s.copy}
                </p>
                <span className="mt-6 inline-block font-display text-5xl font-bold text-[#f0f1f3] select-none">
                  0{i + 1}
                </span>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default Services;
