import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Reveal } from "./Reveal";

const CountUp = ({ to, duration = 1200 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start;
    let raf;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      setN(Math.round(p * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return <span ref={ref}>{inView ? n : 0}</span>;
};

const STATS = [
  { value: <>Concept to delivery</>, label: "Production pipeline" },
  { value: (<><CountUp to={4} /> crafts</>), label: "Under one roof" },
  { value: <>Fast</>, label: "Turnaround" },
];

export const About = () => (
  <section id="about" data-testid="about" className="py-20 md:py-32 bg-[#f7f7f7]">
    <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      <div className="lg:col-span-5">
        <Reveal>
          <p className="text-sm font-medium tracking-wide uppercase text-[#9ca3af] mb-8">
            About Renderlab
          </p>
        </Reveal>
        <div className="space-y-8 border-t border-[#e5e7eb] pt-8">
          {STATS.map((s, i) => (
            <Reveal key={i} delay={0.08 + i * 0.1}>
              <div data-testid={`about-stat-${i}`}>
                <div className="font-display text-4xl md:text-5xl font-extrabold tracking-[-0.02em] text-[#111111]">
                  {s.value}
                </div>
                <div className="mt-1.5 text-sm text-[#9ca3af]">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="lg:col-span-7">
        <Reveal delay={0.05}>
          <h2 className="font-display font-extrabold tracking-[-0.03em] text-[#111111] text-3xl md:text-5xl leading-[1.05]">
            Renderlab blends cutting-edge AI tools with real creative
            direction — delivering high-quality visual content and web pages,
            <span className="text-[#2563eb]"> fast.</span>
          </h2>
          <p className="mt-7 text-lg font-light leading-relaxed text-[#4b5563] max-w-2xl">
            We're a studio built for the AI era: part editors, part artists,
            part engineers. From photoreal imagery and motion design to film
            editing and custom landing pages, we move at the speed of ideas
            without losing the craft that makes work feel premium.
          </p>
        </Reveal>
      </div>
    </div>
  </section>
);

export default About;
