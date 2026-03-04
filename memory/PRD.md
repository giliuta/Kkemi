# Kkemi Design Studio & Typography — PRD

## Original Problem Statement
Build an ultra-premium, award-winning portfolio website for Kkemi Design Studio & Typography — a graphic design studio and print shop in Paphos, Cyprus.

## User Personas
- **Local businesses** needing branding, logos, business cards
- **Couples** planning weddings/christenings needing invitations & stationery
- **Parents** organizing kids' parties needing decorations & balloon art
- **Anyone** in Paphos needing graphic design, print, or personalized gifts
- **Languages**: English, Greek, Russian speakers

## Core Requirements (Static)
- Ultra-premium portfolio website with heavy animations
- Three languages: EN (default), EL, RU
- OPEN/CLOSED real-time badge (Europe/Nicosia timezone)
- Contact form with file upload
- 10 sections: Loading Screen, Hero, Marquee, About, Services, Portfolio, Occasions, Process, Testimonials, Contact, Footer
- Custom cursor, scroll progress, grain overlay, WhatsApp button, cookie banner
- Phone: +35799175772, WhatsApp: same number
- Working hours: Mon,Tue,Thu,Fri 09:00-13:00 & 15:00-18:00; Wed,Sat,Sun closed

## What's Been Implemented (2025-03-04)
- Full-stack app: React frontend + FastAPI backend + MongoDB
- Backend: Contact form API (POST/GET /api/contact) with file upload support
- Frontend: All 10 sections implemented with framer-motion animations
- Custom cursor with hover expansion effects (desktop only)
- Loading screen with SVG "kkemi" calligraphic animation
- Scroll-driven parallax in hero section
- Horizontal scroll portfolio gallery (desktop), swipeable carousel (mobile)
- Marquee ticker with two rows scrolling opposite directions
- Counter animations (stats in About section)
- Accordion-style expandable Occasions cards
- Auto-rotating Testimonials carousel
- Three-language support with smooth switching (EN/EL/RU remembered in localStorage)
- OPEN/CLOSED real-time status badge
- Contact form with file upload, service dropdown
- Google Maps embed, social links (Instagram, Facebook)
- GDPR cookie consent banner
- WhatsApp floating button
- Scroll progress bar
- Background grain texture overlay
- Responsive design (mobile-first)

## Prioritized Backlog

### P0 (Critical)
- All core features implemented ✅

### P1 (Important)
- Replace stock placeholder images with real portfolio images from Instagram
- Add real email address to contact form
- Magnetic button effects (cursor-attracted buttons)
- Smooth scroll library (Lenis) for enhanced scrolling experience

### P2 (Nice to have)
- Page transition wipe effects between sections
- Sticky scroll sections (pin while content animates)
- Letter-by-letter typewriter text effects
- More dramatic text split animations with GSAP
- Image hover reveal/unmask effects
- Floating decorative ink splatter elements
- SEO optimization with structured data

## Next Tasks
1. Replace placeholder images with real Kkemi portfolio photos
2. Add email field when client provides it
3. Enhance magnetic button interactions
4. Add Lenis smooth scroll
5. Performance optimization (lazy loading, image compression)
