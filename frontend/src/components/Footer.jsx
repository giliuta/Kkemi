import { Instagram, Facebook, ArrowUp, Phone } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const sections = ['studio', 'services', 'portfolio', 'occasions', 'contact'];

export default function Footer() {
  const { t } = useLanguage();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-charcoal pt-20 md:pt-28 pb-8" data-testid="footer">
      <div className="px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16 md:mb-24">
          {/* Logo & tagline */}
          <div>
            <span className="font-display italic text-4xl md:text-5xl text-cream block mb-4">kkemi</span>
            <p className="font-accent text-xs tracking-[0.2em] uppercase text-cream/40">
              {t('footer.tagline')}
            </p>
            <p className="font-accent text-xs tracking-[0.2em] uppercase text-cream/30 mt-1">
              {t('footer.location')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <span className="font-accent text-xs tracking-[0.2em] uppercase text-cream/30 block mb-6">
              Navigation
            </span>
            <nav className="space-y-3">
              {sections.map((s) => (
                <button
                  key={s}
                  onClick={() => scrollTo(s)}
                  className="block font-body text-sm text-cream/50 hover:text-gold transition-colors"
                  data-testid={`footer-nav-${s}`}
                >
                  {t(`nav.${s}`)}
                </button>
              ))}
            </nav>
          </div>

          {/* Social & Contact */}
          <div>
            <span className="font-accent text-xs tracking-[0.2em] uppercase text-cream/30 block mb-6">
              Connect
            </span>
            <div className="space-y-3">
              <a
                href="https://www.instagram.com/kkemi_designstudio_typography/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-cream/50 hover:text-gold transition-colors group"
                data-testid="footer-instagram"
              >
                <Instagram size={16} className="group-hover:translate-y-[-2px] transition-transform" />
                <span className="font-body text-sm">Instagram</span>
              </a>
              <a
                href="https://www.facebook.com/p/Kkemi-Design-Studio-Typography-100072001615086/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-cream/50 hover:text-gold transition-colors group"
                data-testid="footer-facebook"
              >
                <Facebook size={16} className="group-hover:translate-y-[-2px] transition-transform" />
                <span className="font-body text-sm">Facebook</span>
              </a>
              <a
                href="tel:+35799175772"
                className="flex items-center gap-3 text-cream/50 hover:text-gold transition-colors group"
                data-testid="footer-phone"
              >
                <Phone size={16} className="group-hover:translate-y-[-2px] transition-transform" />
                <span className="font-body text-sm">+357 99 175 772</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-cream/30">{t('footer.copyright')}</p>
          <p className="font-body text-xs text-cream/20">{t('footer.madeWith')}</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-cream/30 hover:text-gold transition-colors"
            data-testid="back-to-top"
          >
            <span className="font-accent text-xs tracking-wider uppercase">{t('footer.backToTop')}</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
