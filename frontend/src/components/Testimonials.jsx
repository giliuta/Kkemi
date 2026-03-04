import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Testimonials() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const items = t('testimonials.items') || [];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <section className="bg-soft-cream py-24 md:py-32 lg:py-40" data-testid="testimonials-section">
      <div className="px-6 md:px-12 lg:px-24" ref={ref}>
        <motion.span
          className="font-accent text-xs tracking-[0.3em] uppercase text-charcoal/30 block mb-6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          (06)
        </motion.span>

        <div className="overflow-hidden mb-16 md:mb-24">
          <motion.h2
            className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tighter text-charcoal"
            initial={{ y: '100%' }}
            animate={inView ? { y: '0%' } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            data-testid="testimonials-heading"
          >
            {t('testimonials.heading')}
          </motion.h2>
        </div>

        <div className="max-w-4xl mx-auto relative min-h-[280px] md:min-h-[240px]">
          <Quote size={48} className="text-gold/20 mb-8" />

          <AnimatePresence mode="wait">
            {items[current] && (
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                data-testid={`testimonial-${current}`}
              >
                <blockquote className="font-display italic text-2xl md:text-4xl lg:text-5xl tracking-tight text-charcoal leading-tight mb-8">
                  &ldquo;{items[current].quote}&rdquo;
                </blockquote>
                <p className="font-accent text-xs tracking-[0.2em] uppercase text-charcoal/50">
                  &mdash; {items[current].author}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dots */}
          <div className="flex gap-3 mt-12" data-testid="testimonial-dots">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'bg-gold w-6' : 'bg-charcoal/20'
                }`}
                data-testid={`testimonial-dot-${i}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
