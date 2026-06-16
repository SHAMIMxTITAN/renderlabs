import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { LOGO } from "@/data/content";
import { MagneticButton } from "./MagneticButton";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    if (window.lenis) window.lenis.scrollTo(el, { offset: -80 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  // Over the hero video links/logo are light; once scrolled they go dark.
  const onDark = !scrolled;

  return (
    <header
      data-testid="navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-[#e5e7eb] shadow-[0_1px_20px_rgba(17,17,17,0.04)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 h-[72px] flex items-center justify-between">
        <button onClick={() => go("#home")} data-testid="nav-logo" className="flex items-center gap-3 group">
          <span className="overflow-hidden rounded-lg ring-1 ring-black/5 shrink-0" style={{ width: 36, height: 36 }}>
            <img src={LOGO} alt="Renderlabs logo" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </span>
          <span className={`font-display font-bold tracking-tight text-lg transition-colors ${onDark ? "text-white" : "text-[#111111]"}`}>
            Renderlabs
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
