import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
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
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

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
        <Logo />

        <div className="hidden md:flex items-center gap-9">
          {LINKS.map((l) => (
            <button
              key={l.href}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              onClick={() => go(l.href)}
              className="text-sm font-medium text-[#4b5563] hover:text-[#111111] transition-colors"
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
          className="md:hidden text-[#111111] p-2"
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
