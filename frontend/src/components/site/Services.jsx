import { Link, useViewTransitionState } from "react-router-dom";
import {
  ArrowRight,
  TrendingUp,
  Scissors,
  Clapperboard,
  MousePointerClick,
  Orbit,
  Megaphone,
  Sparkles,
  LayoutTemplate,
} from "lucide-react";
import { SERVICES } from "@/data/content";
import { Reveal } from "./Reveal";

export const ICONS = { TrendingUp, Scissors, Clapperboard, MousePointerClick, Orbit, Megaphone, Sparkles, LayoutTemplate };

// `morph`: during the page transition this card's icon shrinks away here and the
// service page's icon pops up in its header (and the reverse on the way back).
const CardBody = ({ s, i, morph }) => {
  const Icon = ICONS[s.icon];
  return (
    <>
      <span className="pointer-events-none absolute -bottom-6 -right-3 font-display font-black leading-none text-[7rem] text-[#f1f3f6] transition-colors duration-300 group-hover:text-[#e3ebfd] select-none">
        0{i + 1}
      </span>

      <div className="relative z-10">
        <div
          style={morph ? { viewTransitionName: "service-icon-card" } : undefined}
          className="flex items-center justify-center h-12 w-12 rounded-xl bg-[#eff6ff] text-[#2563eb] transition-colors group-hover:bg-[#2563eb] group-hover:text-white"
        >
          <Icon size={22} strokeWidth={1.8} />
        </div>
        <h3 className="mt-7 font-display text-xl font-semibold tracking-tight text-[#111111]">
          <span className="relative inline-block">
            {s.title}
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#2563eb] transition-all duration-300 group-hover:w-full" />
          </span>
        </h3>
        <p className="mt-2 text-[#4b5563] font-light leading-relaxed">{s.copy}</p>
        {s.sections && (
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#2563eb]">
            See work <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </span>
        )}
      </div>
    </>
  );
};

const LinkedCard = ({ s, i }) => {
  const to = `/services/${s.key}`;
  const morph = useViewTransitionState(to);
  return (
    <Link to={to} viewTransition data-testid={`service-card-${s.key}`} className={CARD}>
      <CardBody s={s} i={i} morph={morph} />
    </Link>
  );
};

const CARD =
  "group relative block h-full overflow-hidden rounded-2xl bg-white border border-[#eceef0] p-7 transition-all duration-300 hover:border-[#2563eb]/40 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-30px_rgba(17,17,17,0.2)]";

export const Services = () => (
  <section id="services" data-testid="services" className="py-20 md:py-28 bg-[#f7f7f7]">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <Reveal>
        <p className="text-sm font-medium tracking-wide uppercase text-[var(--rl-muted)] mb-4">
          What we do
        </p>
        <h2 className="font-display font-extrabold tracking-[-0.03em] text-[#111111] text-4xl md:text-6xl leading-[0.98]">
          One studio. Every format.
        </h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {SERVICES.map((s, i) => (
          <Reveal key={s.key} delay={(i % 4) * 0.06}>
            {s.sections ? (
              <LinkedCard s={s} i={i} />
            ) : (
              <div data-testid={`service-card-${s.key}`} className={CARD}>
                <CardBody s={s} i={i} />
              </div>
            )}
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
