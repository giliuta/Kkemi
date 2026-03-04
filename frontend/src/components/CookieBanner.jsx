import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function CookieBanner() {
  const { t } = useLanguage();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('kkemi-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (val) => {
    localStorage.setItem('kkemi-cookie-consent', val);
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-24 left-6 right-6 md:left-auto md:right-8 md:max-w-sm z-50 bg-charcoal text-cream p-6 rounded-sm shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4 }}
          data-testid="cookie-banner"
        >
          <p className="text-sm text-cream/70 font-body mb-4 leading-relaxed">
            {t('cookie.text')}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => handleConsent('accepted')}
              className="px-5 py-2 bg-gold text-charcoal text-xs font-accent tracking-wider uppercase rounded-full hover:bg-gold/90 transition-colors"
              data-testid="cookie-accept"
            >
              {t('cookie.accept')}
            </button>
            <button
              onClick={() => handleConsent('declined')}
              className="px-5 py-2 border border-cream/20 text-cream/60 text-xs font-accent tracking-wider uppercase rounded-full hover:border-cream/40 transition-colors"
              data-testid="cookie-decline"
            >
              {t('cookie.decline')}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
