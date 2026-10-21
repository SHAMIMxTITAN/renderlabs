import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Instagram, Play } from "lucide-react";
import { STATS_AS_OF, WORK_TABS, ytThumb } from "@/data/content";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Reveal } from "./Reveal";

const Caption = ({ w }) => (
  <span className="block px-1 pt-3 font-display font-semibold text-[#111111] leading-snug">{w.title}</span>
);

// The view count is the headline, so it sits on the video as the play button.
// `corner`: the compact version that sits in a long-form card's corner.
const ViewsPill = ({ w, play, corner }) => (
  <span
    className={`inline-flex items-center gap-1.5 md:gap-2 whitespace-nowrap rounded-full bg-white font-display font-bold text-[#111111] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] ${
      corner ? "px-3 py-1.5 text-[13px] md:text-sm" : "px-3 py-2 md:px-5 md:py-3 text-[13px] md:text-lg transition-transform duration-300 group-hover:scale-105"
    }`}
  >
    {play && <Play size={15} className="fill-[#111111] shrink-0" />}
    {w.views}
  </span>
);

const platform = (w) => (w.instagramId ? "Instagram" : "YouTube");
// Only YouTube/Instagram items carry public view counts (and the "as of" note).
export const hasLiveViews = (tab) => tab.items.some((w) => w.youtubeId || w.instagramId);

// The real YouTube play-button mark (shape from Simple Icons, CC0), inline so it costs no request.
const YouTubeMark = () => (
  <svg viewBox="0 3.545 24 16.91" className="h-9 w-auto" aria-hidden="true">
    <path
      fill="#ff0033"
      d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
    />
    <path fill="#fff" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const InstagramMark = () => (
  <span className="flex h-10 w-10 items-center justify-center rounded-xl text-white bg-[linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)]">
    <Instagram size={21} strokeWidth={2} />
  </span>
);

// Brand colours: the ring is the panel border; `Mark` is the logo above the videos.
const PLATFORMS = {
  YouTube: {
    Mark: YouTubeMark,
    ring: "bg-[#ff0033]",
    tint: "bg-[#fff6f7]",
    glow: "shadow-[0_40px_90px_-50px_rgba(255,0,51,0.6)]",
  },
  Instagram: {
    Mark: InstagramMark,
    ring: "bg-[linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)]",
    tint: "bg-[#fdf6fa]",
    glow: "shadow-[0_40px_90px_-50px_rgba(214,41,118,0.6)]",
  },
};
const poster = (w) => w.poster || ytThumb(w.youtubeId);
// Instagram refuses to be framed (X-Frame-Options: DENY), so its reels open on Instagram.
const openProps = (w, open) =>
  w.instagramId
    ? { as: "a", href: `https://www.instagram.com/reel/${w.instagramId}/`, target: "_blank", rel: "noopener noreferrer" }
    : { as: "button", type: "button", onClick: open };

// Tab switches and page loads fade the grid in (tailwindcss-animate).
const FADE = "animate-in fade-in-0 slide-in-from-bottom-2 duration-500";

// One tab's grid plus its pop-up player. Used by the homepage tabs and the service pages.
export const WorkGallery = ({ tab, className = "mt-12" }) => {
  const [active, setActive] = useState(null);
  const opener = useRef(null);
  const reducedMotion = useReducedMotion();
  const tall = tab.shape === "tall";
  // A tab with Instagram items splits into one YouTube panel and one Instagram panel.
  const grouped = tab.items.some((w) => w.instagramId);

  const card = (w) => {
    if (w.image) {
      return (
        <figure key={w.id} data-testid={`work-item-${w.id}`}>
          <div className="overflow-hidden rounded-2xl border border-[#eceef0] bg-[#f7f7f7] aspect-video">
            <img src={w.image} alt={`${w.title} thumbnail`} loading="lazy" decoding="async" className="w-full h-full object-cover" />
          </div>
          <figcaption><Caption w={w} /></figcaption>
        </figure>
      );
    }
    const { as: Tag, ...link } = openProps(w, (event) => {
      opener.current = event.currentTarget;
      setActive(w);
    });
    return (
      <Tag key={w.id} {...link} data-testid={`work-item-${w.id}`} className="group block w-full text-left">
        <span className={`relative block overflow-hidden rounded-2xl bg-[#f7f7f7] ${tall ? "aspect-[9/16]" : "aspect-video border border-[#eceef0]"}`}>
          <img
            src={poster(w)}
            alt=""
            loading="lazy" decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {tall ? (
            <span className="absolute inset-0 flex items-center justify-center">
              <ViewsPill w={w} play />
            </span>
          ) : (
            // Long-form thumbnails carry their own big text in the middle, so the
            // views sit bottom-left and only a light, see-through play mark is centred.
            <>
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full border border-white/70 bg-black/25 text-white transition-transform duration-300 group-hover:scale-110">
                  <Play size={22} className="fill-white ml-0.5" />
                </span>
              </span>
              <span className="absolute left-3 bottom-3"><ViewsPill w={w} corner /></span>
            </>
          )}
        </span>
        <Caption w={w} />
        {w.instagramId && <span className="sr-only">(opens on Instagram)</span>}
      </Tag>
    );
  };

  return (
    <>
      {grouped ? (
        <div className={`${className} ${FADE} grid md:grid-cols-2 gap-5 md:gap-6`}>
          {Object.entries(PLATFORMS).map(([name, p]) => (
            <div key={name} data-testid={`work-panel-${name.toLowerCase()}`} className={`rounded-3xl p-[2px] ${p.ring} ${p.glow}`}>
              <div className={`h-full rounded-[22px] ${p.tint} p-4 md:p-5`}>
                <div className="flex items-center gap-3 px-1 pb-5">
                  <p.Mark />
                  <span className="font-display text-2xl font-extrabold tracking-[-0.02em] text-[#111111]">{name}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {tab.items.filter((w) => platform(w) === name).map(card)}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`${className} ${FADE} grid gap-3 md:gap-4 ${
            !tall ? "grid-cols-1 sm:grid-cols-2" : tab.items.length <= 2 ? "grid-cols-2 max-w-2xl" : "grid-cols-2 md:grid-cols-4"
          }`}
        >
          {tab.items.map(card)}
        </div>
      )}

      <Dialog open={Boolean(active)} onOpenChange={(open) => { if (!open) setActive(null); }}>
        {active && (
          <DialogContent
            data-testid="work-lightbox"
            className={`z-[60] w-[calc(100%_-_2rem)] border-0 bg-transparent p-0 text-white shadow-none [&>button]:rounded-full [&>button]:bg-black/70 [&>button]:p-2 [&>button]:text-white [&>button]:opacity-100 ${
              tall ? "max-w-sm" : "max-w-4xl"
            }`}
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              opener.current?.focus();
            }}
          >
            <div className={`rounded-2xl overflow-hidden bg-black ${tall ? "aspect-[9/16] max-h-[75vh]" : "aspect-video"}`}>
              {active.video ? (
                <video src={active.video} poster={active.poster} controls autoPlay={!reducedMotion} loop playsInline className="w-full h-full object-contain" />
              ) : (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${active.youtubeId}?autoplay=${reducedMotion ? 0 : 1}&rel=0`}
                  title={active.title}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="w-full h-full"
                />
              )}
            </div>
            <div>
              <DialogDescription className="text-xs font-medium uppercase tracking-wide text-white/90">
                {active.video ? active.views : `${platform(active)} · ${active.views}`}
              </DialogDescription>
              <DialogTitle className="font-display text-xl font-semibold text-white">
                {active.title}
              </DialogTitle>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export const Work = () => {
  const [tabKey, setTabKey] = useState(WORK_TABS[0].key);
  const tab = WORK_TABS.find((t) => t.key === tabKey);

  return (
    <section id="work" data-testid="work" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-sm font-medium tracking-wide uppercase text-[var(--rl-muted)] mb-4">
                Selected work
              </p>
              <h2 className="font-display font-extrabold tracking-[-0.03em] text-[#111111] text-4xl md:text-6xl leading-[0.98]">
                Work that gets watched.
              </h2>
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Choose work type">
              {WORK_TABS.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  aria-pressed={t.key === tabKey}
                  onClick={() => setTabKey(t.key)}
                  className={`rounded-full px-4 py-2 text-[13px] md:px-5 md:py-2.5 md:text-sm font-medium transition-colors ${
                    t.key === tabKey ? "bg-[#111111] text-white" : "bg-[#f7f7f7] text-[#4b5563] hover:text-[#111111]"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <WorkGallery key={tab.key} tab={tab} />

        {hasLiveViews(tab) && <p className="mt-6 text-xs text-[var(--rl-muted)]">Live YouTube and Instagram views, {STATS_AS_OF}.</p>}
      </div>
    </section>
  );
};

export default Work;
