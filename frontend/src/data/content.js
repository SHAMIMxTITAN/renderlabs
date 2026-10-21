export const LOGO = "/logo.webp";

export const HERO_VIDEO =
  "/hero-video.mp4";

export const CONTACT = {
  name: "Shamim Chaudhary (Blake)",
  email: "blake@renderlabhq.com",
  phone: "+91 88502 53204",
  phoneHref: "+918850253204",
  instagram: "https://www.instagram.com/renderlabhq/",
};

// `sections` = what the service's own page (/services/<key>) shows. A service
// without sections has no page yet, so its card isn't clickable. Services with
// work come first. Adding `sections` to a service is all it takes to give it a
// page: the build also creates its file for Render (scripts/route-pages.js).
export const SERVICES = [
  { key: "editing", icon: "Clapperboard", title: "AI Video Editing", copy: "Shorts and long-form, fast.", sections: ["short", "long"] },
  { key: "thumbnails", icon: "MousePointerClick", title: "Thumbnails", copy: "Designed to get the click.", sections: ["thumbnails"] },
  { key: "motion", icon: "Orbit", title: "AI Motion Graphics", copy: "2D and 3D motion for brands.", sections: ["motion"] },
  { key: "images", icon: "Sparkles", title: "Realistic AI Images", copy: "Product shots, no studio.", sections: ["images"] },
  { key: "clipping", icon: "Scissors", title: "Clipping", copy: "Long videos into daily Shorts." },
  { key: "ads", icon: "Megaphone", title: "Ads in a Day", copy: "Short ads, delivered next day." },
];

// Our own channels, shown as clickable logos in the "We grew our own channel first"
// section. One entry per channel: logo in public/channels/ (square, ~256px WebP),
// `url` is where the logo links.
export const CHANNELS = [
  { key: "pixden", name: "Pixden", logo: "/channels/pixden.webp", url: "https://www.youtube.com/@pixden-z8m" },
];

// Live public YouTube counts. Re-fetch before changing any number here and
// update STATS_AS_OF with the moment they were read.
export const STATS_AS_OF = "21 Oct 2026";

export const RESULTS = {
  stats: [
    { value: "2.17M", label: "views on one Short" },
    { value: "22×", label: "median views per Short" },
    { value: "3", label: "Shorts past 400K" },
  ],
  before: { label: "Before our method", median: "1,260", width: "4.6%" },
  after: { label: "After our method", median: "27,428", width: "100%" },
};

export const ytThumb = (id) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

// The portfolio tabs. An item is one of: youtubeId (plays in a pop-up),
// instagramId (opens on Instagram), video + poster (plays in a pop-up), image
// (static, no view count).
export const WORK_TABS = [
  {
    key: "short",
    label: "Short-form editing",
    shape: "tall",
    items: [
      { id: "px-necklace", youtubeId: "iv-uYuXHsvc", title: "Dhalsim's skull necklace", views: "2.17M views" },
      { id: "ig-chunli", instagramId: "DecGDySBRAs", poster: "/work/ig-chunli.jpg", title: "Capcom wanted Chun-Li weaker?!", views: "1.1M views" },
      { id: "ig-dhalsim", instagramId: "DefiCVvoRDD", poster: "/work/ig-dhalsim.jpg", title: "Vidyut was NOT the first Dhalsim", views: "452K views" },
      { id: "px-dhalsim", youtubeId: "1J5lmFeTRdA", title: "The game Dhalsim is insane", views: "422K views" },
    ],
  },
  {
    key: "long",
    label: "Long-form editing",
    shape: "wide",
    items: [
      { id: "px-sf-lore", youtubeId: "ZFBLyiZNlAM", title: "Street Fighter lore in 15 minutes", views: "68K views" },
      { id: "px-dhalsim-story", youtubeId: "jX8-VkaobmM", title: "Dhalsim: the complete story", views: "62K views" },
    ],
  },
  {
    key: "thumbnails",
    label: "Thumbnail design",
    shape: "wide",
    items: [
      { id: "th-sf-lore", image: ytThumb("ZFBLyiZNlAM"), title: "Street Fighter lore" },
      { id: "th-dhalsim", image: ytThumb("jX8-VkaobmM"), title: "Dhalsim: the complete story" },
    ],
  },
];

// Only on the AI Motion Graphics page, not in the homepage tabs.
export const MOTION = {
  key: "motion",
  label: "AI motion graphics",
  shape: "tall",
  items: [
    // `views` doubles as the pill label; this reel has no public count.
    { id: "twistella-3d", video: "/work/twistella-3d.mp4", poster: "/work/twistella-3d.jpg", title: "Twistella brand reel", views: "3D photoreal" },
  ],
};

// AI Imagery Showcase marquee. Files live in public/imagery as 800px-wide WebP
// (~60 KB each; the originals were 1.3–2.5 MB PNGs that made scrolling stutter).
// The marquee duplicates the set to loop seamlessly.
export const IMAGERY = [
  "/imagery/ai-01.webp",
  "/imagery/ai-02.webp",
  "/imagery/ai-03.webp",
  "/imagery/ai-04.webp",
  "/imagery/ai-05.webp",
  "/imagery/ai-06.webp",
  "/imagery/ai-07.webp",
  "/imagery/ai-08.webp",
  "/imagery/ai-09.webp",
];
