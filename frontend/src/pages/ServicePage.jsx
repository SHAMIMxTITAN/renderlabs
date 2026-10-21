import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { CHANNELS, IMAGERY, MOTION, SERVICES, STATS_AS_OF, WORK_TABS } from "@/data/content";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Grain } from "@/components/site/Grain";
import { Results } from "@/components/site/Results";
import { ICONS } from "@/components/site/Services";
import { WorkGallery } from "@/components/site/Work";
import { Reveal } from "@/components/site/Reveal";

const GALLERIES = [...WORK_TABS, MOTION];

const Block = ({ title, note, children }) => (
  <section className="py-12 md:py-16">
    <Reveal delay={0.12} className="max-w-7xl mx-auto px-6 md:px-12">
      {title && <h2 className="font-display font-extrabold tracking-[-0.03em] text-[#111111] text-2xl md:text-4xl">{title}</h2>}
      {children}
      {note && <p className="mt-6 text-xs text-[var(--rl-muted)]">{note}</p>}
    </Reveal>
  </section>
);

// Pages with one gallery skip its heading; the page title already names it.
const Section = ({ name, titled }) => {
  if (name === "results") return <Results />;
  if (name === "channels") {
    return (
      <Block title={titled && "Our channels"}>
        <ul className="mt-8 flex flex-wrap gap-8 md:gap-10">
          {CHANNELS.map((c) => (
            <li key={c.key} className="flex flex-col items-center text-center">
              <a href={c.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center">
                <span className="block h-24 w-24 md:h-28 md:w-28 overflow-hidden rounded-full ring-1 ring-black/10 transition-transform duration-300 group-hover:-translate-y-1">
                  <img src={c.logo} alt={`${c.name} logo`} width="112" height="112" decoding="async" className="h-full w-full object-cover" />
                </span>
                <span className="mt-3 inline-flex items-center gap-1 font-display font-semibold text-[#111111]">
                  {c.name} <ArrowUpRight size={14} className="text-[#4b5563] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <span className="sr-only">(opens the channel)</span>
              </a>
              <span className="mt-0.5 text-sm text-[var(--rl-muted)]">
                {c.niche}
                {c.instagram && (
                  <>
                    {" · "}
                    <a href={c.instagram} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline hover:text-[#111111]">
                      Instagram
                    </a>
                  </>
                )}
              </span>
            </li>
          ))}
        </ul>
      </Block>
    );
  }
  if (name === "images") {
    return (
      <Block title={titled && "Realistic AI images"}>
        <div className="columns-2 md:columns-3 gap-3 md:gap-4">
          {IMAGERY.map((src) => (
            <img key={src} src={src} alt="AI-generated imagery" loading="lazy" decoding="async" className="mb-3 md:mb-4 w-full rounded-2xl border border-[#eceef0] break-inside-avoid" />
          ))}
        </div>
      </Block>
    );
  }
  const tab = GALLERIES.find((t) => t.key === name);
  const note = tab === MOTION ? null : `Live YouTube and Instagram views, ${STATS_AS_OF}.`;
  return (
    <Block title={titled && tab.label} note={note}>
      <WorkGallery tab={tab} className={titled ? "mt-8" : ""} />
    </Block>
  );
};

export default function ServicePage() {
  const { key } = useParams();
  const service = SERVICES.find((s) => s.key === key && s.sections);

  if (!service) return <Navigate to="/" replace />;
  const Icon = ICONS[service.icon];

  return (
    <div className="relative min-h-screen bg-white text-[#111111] selection:bg-[#111111] selection:text-white">
      <Grain />
      <Navbar solid />
      <main>
        <header className="max-w-7xl mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-4">
          <Link to="/#services" viewTransition className="inline-flex items-center gap-1.5 text-sm font-medium text-[#4b5563] hover:text-[#111111] transition-colors">
            <ArrowLeft size={16} /> All services
          </Link>
          <div style={{ viewTransitionName: "service-icon-page" }} className="mt-8 flex items-center justify-center h-14 w-14 rounded-2xl bg-[#2563eb] text-white">
            <Icon size={26} strokeWidth={1.8} />
          </div>
          <h1 className="mt-6 font-display font-extrabold tracking-[-0.04em] leading-[0.95] text-5xl md:text-7xl">
            {service.title}
          </h1>
          <p className="mt-4 text-lg md:text-xl font-light text-[#4b5563]">{service.copy}</p>
        </header>

        {service.sections.map((name) => (
          <Section key={name} name={name} titled={service.sections.length > 1} />
        ))}

        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="rounded-3xl bg-[#111111] text-white px-8 py-12 md:px-14 md:py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <h2 className="font-display font-extrabold tracking-[-0.03em] text-3xl md:text-5xl leading-[1]">
                Want this for <span className="text-[#3b82f6]">your brand?</span>
              </h2>
              <Link
                to="/#contact"
                viewTransition
                className="group inline-flex items-center gap-2 self-start md:self-auto rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium px-7 py-3.5 transition-colors"
              >
                Start a project
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
