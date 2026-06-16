import { Reveal } from "./Reveal";

const STATS = [
  { value: "AI-first", label: "Production pipeline" },
  { value: "4 crafts", label: "Under one roof" },
  { value: "Fast", label: "Turnaround" },
];

export const About = () => (
  <section id="about" data-testid="about" className="py-28 md:py-44 bg-[#f7f7f7]">
    <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12">
      <div className="lg:col-span-4">
        <Reveal>
          <p className="text-sm font-medium tracking-wide uppercase text-[#9ca3af]">
            About Renderlabs
          </p>
        </Reveal>
      </div>
      <div className="lg:col-span-8">
        <Reveal delay={0.05}>
          <h2 className="font-display font-bold tracking-tight text-[#111111] text-2xl md:text-4xl leading-[1.2]">
            Renderlabs blends cutting-edge AI tools with real creative
            direction — delivering high-quality visual content and web pages,
            <span className="text-[#2563eb]"> fast.</span>
          </h2>
          <p className="mt-6 text-lg font-light leading-relaxed text-[#4b5563] max-w-2xl">
            We're a studio built for the AI era: part editors, part artists,
            part engineers. From photoreal imagery and motion design to film
            editing and custom landing pages, we move at the speed of ideas
            without losing the craft that makes work feel premium.
          </p>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-[#e5e7eb] pt-8">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={0.1 + i * 0.08}>
                <div data-testid={`about-stat-${i}`}>
                  <div className="font-display text-2xl md:text-3xl font-bold text-[#111111]">
                    {s.value}
                  </div>
                  <div className="mt-1 text-sm text-[#9ca3af]">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default About;
