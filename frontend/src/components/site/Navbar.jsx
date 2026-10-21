import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LOGO } from "@/data/content";
import { MagneticButton } from "./MagneticButton";

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

// `solid`: pages without the dark hero video start with the light, frosted bar.
export const Navbar = ({ solid = false }) => {
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // A 1px marker 80px down the page: once it leaves the viewport, the bar turns solid.
  // The browser reports this itself, so nothing runs per scroll frame (a scroll
  // listener reading scrollY forced a layout every frame and was the top cost).
  useEffect(() => {
    if (solid) return;
    const marker = document.createElement("div");
    marker.setAttribute("aria-hidden", "true");
    marker.style.cssText = "position:absolute;top:80px;left:0;width:1px;height:1px;pointer-events:none;";
    document.body.prepend(marker);
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    io.observe(marker);
    return () => {
      io.disconnect();
      marker.remove();
    };
  }, [solid]);

  const go = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    // Not on the homepage: go there; ScrollRestoration scrolls to the hash.
    if (!el) return navigate(href === "#home" ? "/" : `/${href}`, { viewTransition: true });
    if (window.lenis && !reducedMotion) window.lenis.scrollTo(el, { offset: -80 });
    else el.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth" });
  };

  // Over the hero video links/logo are light; once scrolled they go dark.
  const isSolid = solid || scrolled;
  const onDark = !isSolid;

  return (
    <header
      data-testid="navbar"
      style={{ viewTransitionName: "site-nav" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isSolid
          ? "bg-white/80 backdrop-blur-xl border-b border-[#e5e7eb] shadow-[0_1px_20px_rgba(17,17,17,0.04)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 h-[72px] flex items-center justify-between">
        <button onClick={() => go("#home")} data-testid="nav-logo" className="flex items-center gap-3 group">
          <span className="overflow-hidden rounded-lg ring-1 ring-black/5 shrink-0" style={{ width: 36, height: 36 }}>
            <img src={LOGO} alt="Renderlab logo" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </span>
          <span className={`font-display font-bold tracking-tight text-lg transition-colors ${onDark ? "text-white" : "text-[#111111]"}`}>
            Renderlab
          </span>
        </button>

        <div className="hidden md:flex items-center gap-9">
          {LINKS.map((l) => (
            <button
              key={l.href}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              onClick={() => go(l.href)}
              className={`text-sm font-medium transition-colors ${
                onDark ? "text-white/80 hover:text-white" : "text-[#4b5563] hover:text-[#111111]"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="hidden md:block">
          <MagneticButton
            data-testid="nav-cta"
            onClick={() => go("#contact")}
            strength={0.5}
            className="rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-medium px-5 py-2.5 transition-colors"
          >
            Get in touch
          </MagneticButton>
        </div>

        <button
          data-testid="nav-mobile-toggle"
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden p-2 transition-colors ${onDark ? "text-white" : "text-[#111111]"}`}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-white border-t border-[#e5e7eb] px-6 py-5 flex flex-col gap-2">
          {LINKS.map((l) => (
            <button
              key={l.href}
              data-testid={`nav-mobile-link-${l.label.toLowerCase()}`}
              onClick={() => go(l.href)}
              className="text-left py-2 text-base font-medium text-[#111111]"
            >
              {l.label}
            </button>
          ))}
          <button
            data-testid="nav-mobile-cta"
            onClick={() => go("#contact")}
            className="mt-2 rounded-full bg-[#2563eb] text-white text-sm font-medium px-5 py-3"
          >
            Get in touch
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
