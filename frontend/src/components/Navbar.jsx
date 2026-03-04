import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const SCHEDULE = {
  1: [{ open: '09:00', close: '13:00' }, { open: '15:00', close: '18:00' }],
  2: [{ open: '09:00', close: '13:00' }, { open: '15:00', close: '18:00' }],
  3: null,
  4: [{ open: '09:00', close: '13:00' }, { open: '15:00', close: '18:00' }],
  5: [{ open: '09:00', close: '13:00' }, { open: '15:00', close: '18:00' }],
  6: null,
  0: null,
};

function getOpenStatus(t, lang) {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Nicosia' }));
  const day = now.getDay();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hours * 60 + minutes;
  const slots = SCHEDULE[day];

  if (slots) {
    for (const slot of slots) {
      const [oh, om] = slot.open.split(':').map(Number);
      const [ch, cm] = slot.close.split(':').map(Number);
      if (currentTime >= oh * 60 + om && currentTime < ch * 60 + cm) {
        return { isOpen: true, text: t('status.open') };
      }
    }
  }

  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  for (let i = 1; i <= 7; i++) {
    const nextDay = (day + i) % 7;
    const nextSlots = SCHEDULE[nextDay];
    if (nextSlots) {
      const template = t('status.opensAt');
      const dayName = t(`days.${dayNames[nextDay]}`);
      const text = template.replace('{day}', dayName).replace('{time}', nextSlots[0].open);
      return { isOpen: false, text };
    }
  }
  return { isOpen: false, text: t('status.closed') };
}

const sections = ['studio', 'services', 'portfolio', 'occasions', 'contact'];

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [status, setStatus] = useState({ isOpen: false, text: '' });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const updateStatus = useCallback(() => {
    setStatus(getOpenStatus(t, lang));
  }, [t, lang]);

  useEffect(() => {
    updateStatus();
    const interval = setInterval(updateStatus, 60000);
    return () => clearInterval(interval);
  }, [updateStatus]);

  const scrollTo = (id) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? 'bg-cream/90 backdrop-blur-md shadow-sm' : ''
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        data-testid="navbar"
      >
        <div className="flex items-center justify-between px-6 md:px-12 py-4 md:py-5">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display italic text-2xl md:text-3xl tracking-tight text-charcoal"
            data-testid="logo-btn"
          >
            kkemi
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" data-testid="desktop-nav">
            {sections.map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className="nav-link font-accent uppercase text-xs tracking-[0.2em] text-charcoal/70 hover:text-charcoal transition-colors"
                data-testid={`nav-${s}`}
              >
                {t(`nav.${s}`)}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Status badge */}
            <div className="hidden md:flex items-center gap-2 text-xs font-accent" data-testid="open-status">
              <span className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-forest' : 'bg-coral'}`} />
              <span className="text-charcoal/60 tracking-wider uppercase">{status.text}</span>
            </div>

            {/* Language switcher */}
            <div className="flex items-center gap-1 text-xs font-accent tracking-wider" data-testid="lang-switcher">
              {['en', 'el', 'ru'].map((l, i) => (
                <span key={l} className="flex items-center">
                  {i > 0 && <span className="text-charcoal/20 mx-1">|</span>}
                  <button
                    onClick={() => setLang(l)}
                    className={`uppercase transition-colors ${lang === l ? 'text-gold font-bold' : 'text-charcoal/40 hover:text-charcoal/70'}`}
                    data-testid={`lang-${l}`}
                  >
                    {l === 'el' ? 'EL' : l.toUpperCase()}
                  </button>
                </span>
              ))}
            </div>

            {/* Phone */}
            <a
              href="tel:+35799175772"
              className="hidden md:flex items-center gap-1.5 text-charcoal/60 hover:text-gold transition-colors"
              data-testid="phone-btn"
            >
              <Phone size={14} />
            </a>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden text-charcoal"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-testid="mobile-menu-toggle"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-cream/98 mobile-menu-overlay flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            data-testid="mobile-menu"
          >
            <nav className="flex flex-col items-center gap-8">
              {sections.map((s, i) => (
                <motion.button
                  key={s}
                  onClick={() => scrollTo(s)}
                  className="font-display text-4xl text-charcoal hover:text-gold transition-colors"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  data-testid={`mobile-nav-${s}`}
                >
                  {t(`nav.${s}`)}
                </motion.button>
              ))}
            </nav>
            <div className="mt-12 flex items-center gap-2 text-sm font-accent" data-testid="mobile-status">
              <span className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-forest' : 'bg-coral'}`} />
              <span className="text-charcoal/60">{status.text}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
