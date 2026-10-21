import { ArrowUpRight } from "lucide-react";
import { RESULTS, STATS_AS_OF } from "@/data/content";
import { Reveal } from "./Reveal";

export const Results = () => (
  <section id="results" data-testid="results" className="bg-[#111111] text-white py-20 md:py-32">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <Reveal className="lg:col-span-6">
          <p className="text-sm font-medium tracking-wide uppercase text-white/60 mb-4">Proof, not promises</p>
          <h2 className="font-display font-extrabold tracking-[-0.03em] text-4xl md:text-6xl leading-[0.98]">
            We grew our own channel <span className="text-[#3b82f6]">first.</span>
          </h2>
          <a
            href={RESULTS.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white border-b border-white/30 hover:border-white pb-0.5 transition-colors"
          >
            {RESULTS.channel} on YouTube <ArrowUpRight size={15} />
          </a>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <p className="text-sm text-white/60">Median views per Short</p>
            {[
              { ...RESULTS.before, bar: "bg-white/30" },
              { ...RESULTS.after, bar: "bg-[#2563eb]" },
            ].map((row) => (
              <div key={row.label} className="mt-5">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-sm text-white/70">{row.label}</span>
                  <span className="font-display font-bold text-2xl md:text-3xl">{row.median}</span>
                </div>
                <div className="mt-2 h-2.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <div className={`h-full rounded-full ${row.bar}`} style={{ width: row.width }} />
                </div>
              </div>
            ))}
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
              {RESULTS.stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display font-extrabold tracking-[-0.02em] text-3xl md:text-4xl">{s.value}</p>
                  <p className="mt-1 text-xs md:text-sm text-white/60 leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <p className="mt-6 text-xs text-white/50">Live YouTube views, {STATS_AS_OF}.</p>
    </div>
  </section>
);

export default Results;
