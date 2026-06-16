# Renderlabs — Product Requirements Document

## Original Problem Statement
Build a premium, minimal portfolio landing page for "Renderlabs," an AI-powered creative studio. Light theme (white #FFFFFF / off-white #F7F7F7, charcoal #111111 text), single blue accent used sparingly, generous whitespace, premium grotesque typography, subtle scroll animations, fully responsive. Use the provided logo in navbar/footer. Four services (Video Editing, Realistic AI Images, AI Motion Graphics, Cool Landing Pages). Sections: Navbar, Hero, Services, Work/Portfolio (4 uploaded videos + lightbox), About, Contact (working form + clickable email/phone/Instagram), Footer.

## Architecture
- Frontend: React 19 (CRA/Craco), Tailwind, framer-motion, lucide-react, sonner. Componentized in `src/components/site/*` + `src/pages/Landing.jsx`. Content in `src/data/content.js`.
- Backend: FastAPI, MongoDB (Motor). `POST /api/contact` stores submission + emails via Resend; `GET /api/contact` lists.
- Email: Resend (test mode → delivers to shamimchaudhary701@gmail.com until renderlabhq.com domain verified).

## User Personas
- Prospective clients (brands) evaluating the studio and submitting inquiries.
- Studio owner (Shamim) receiving leads via email + DB.

## Implemented (2026-06-16)
- Full landing page: sticky navbar w/ scroll shadow + mobile menu, hero with looping muted autoplay video (poster fallback) + View Work CTA, 4 service cards (2x2), 4-video work gallery with hover-play + lightbox modal, about section, contact form (DB + Resend email) with clickable mailto/tel/Instagram, footer with social icons.
- Backend contact API with validation + email. Tested 100% (7/7 backend, 10/10 frontend flows).
- AI Imagery infinite-scroll marquee section (9 images, seamless loop, pause/zoom on hover) after Work.
- MAJOR cinematic upgrade: full-bleed pinned hero video with scroll-linked word-by-word headline reveal (desktop) / fade-in (mobile), transparent→frosted navbar, kinetic ticker divider, two-column Services (watermark numbers + hover underline), tightened section spacing + larger headings, two-column About with count-up stat, redesigned Contact left column (availability dot), Lenis smooth scrolling, film-grain overlay. Verified 100% (backend 7/7, desktop + mobile flows pass; iteration_3).

## Backlog / Next
- P1: Verify renderlabhq.com domain in Resend so emails go to blake@renderlabhq.com (currently test-mode → owner gmail).
- P2: Replace Unsplash hero poster with a branded frame; add image uploads to portfolio; add per-project case-study pages.
- P2: Admin view for contact submissions; migrate FastAPI shutdown event to lifespan.
