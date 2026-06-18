import { Instagram, Mail, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { CONTACT } from "@/data/content";

export const Footer = () => (
  <footer data-testid="footer" className="bg-[#111111] text-white">
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm font-light text-white/55">
            AI-driven editing, imagery, motion, and web design for high-end
            brands.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`mailto:${CONTACT.email}`}
            data-testid="footer-email"
            aria-label="Email"
            className="h-11 w-11 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-colors"
          >
            <Mail size={18} />
          </a>
          <a
            href={`tel:${CONTACT.phoneHref}`}
            data-testid="footer-phone"
            aria-label="Phone"
            className="h-11 w-11 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-colors"
          >
            <Phone size={18} />
          </a>
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="footer-instagram"
            aria-label="Instagram"
            className="h-11 w-11 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-colors"
          >
            <Instagram size={18} />
          </a>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-sm text-white/45">
          © {new Date().getFullYear()} Renderlab. All rights reserved.
        </p>
        <p className="text-sm text-white/45">Crafted with AI + creative direction.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
