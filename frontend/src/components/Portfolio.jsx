import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const portfolioImages = [
  'https://images.unsplash.com/photo-1639291492775-b2dba15cb3e4?w=800&q=80',
  'https://images.unsplash.com/photo-1750208759761-6a32d532e426?w=800&q=80',
  'https://images.unsplash.com/photo-1704030459079-c31da57b848d?w=800&q=80',
  'https://images.unsplash.com/photo-1707589338174-dc1ddc18945a?w=800&q=80',
  'https://images.unsplash.com/photo-1769893464274-ef3af10359f9?w=800&q=80',
  'https://images.unsplash.com/photo-1718670013988-c6e3edb92345?w=800&q=80',
  'https://images.unsplash.com/photo-1700267642917-0df52f004f86?w=800&q=80',
  'https://images.unsplash.com/photo-1704030459012-bfbe0d55fec6?w=800&q=80',
  'https://images.unsplash.com/photo-1765947383567-a7be6d558c6b?w=800&q=80',
  'https://images.unsplash.com/photo-1765483469974-3f544df12caf?w=800&q=80',
];

export default function Portfolio() {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });
  const items = t('portfolio.items') || [];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-65%']);

  return (
    <section id="portfolio" ref={containerRef} className="relative bg-soft-cream" style={{ height: '300vh' }} data-testid="portfolio-section">
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 md:px-12 lg:px-24 pt-24 md:pt-32 pb-8" ref={headerRef}>
          <motion.span
            className="font-accent text-xs tracking-[0.3em] uppercase text-charcoal/30 block mb-6"
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
          >
            (03)
          </motion.span>
          <div className="overflow-hidden">
            <motion.h2
              className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tighter text-charcoal"
              initial={{ y: '100%' }}
              animate={headerInView ? { y: '0%' } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              data-testid="portfolio-heading"
            >
              {t('portfolio.heading')}
            </motion.h2>
          </div>
        </div>

        {/* Horizontal gallery - Desktop */}
        <div className="flex-1 hidden md:flex items-center overflow-hidden">
          <motion.div className="flex gap-8 pl-12 lg:pl-24" style={{ x }}>
            {items.map((item, i) => (
              <div
                key={i}
                className="portfolio-item min-w-[45vw] lg:min-w-[35vw] h-[55vh] relative rounded-sm overflow-hidden flex-shrink-0"
                data-cursor="view"
                data-testid={`portfolio-item-${i}`}
              >
                <img
                  src={portfolioImages[i]}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="portfolio-overlay absolute inset-0 bg-charcoal/50 flex flex-col justify-end p-8">
                  <span className="font-accent text-xs tracking-[0.2em] uppercase text-gold mb-2">
                    {item.category}
                  </span>
                  <h3 className="font-heading text-xl md:text-2xl text-cream">{item.title}</h3>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mobile vertical carousel */}
        <div className="flex-1 md:hidden overflow-x-auto scrollbar-hide px-6 flex items-center">
          <div className="flex gap-4">
            {items.slice(0, 6).map((item, i) => (
              <div
                key={i}
                className="min-w-[80vw] h-[50vh] relative rounded-sm overflow-hidden flex-shrink-0"
                data-testid={`portfolio-mobile-${i}`}
              >
                <img
                  src={portfolioImages[i]}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent flex flex-col justify-end p-6">
                  <span className="font-accent text-xs tracking-[0.2em] uppercase text-gold mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-heading text-lg text-cream">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instagram CTA */}
        <div className="px-6 md:px-12 lg:px-24 pb-8 pt-4">
          <a
            href="https://www.instagram.com/kkemi_designstudio_typography/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-accent text-xs tracking-[0.2em] uppercase text-charcoal/50 hover:text-gold transition-colors group"
            data-testid="instagram-cta"
          >
            <Instagram size={16} className="group-hover:scale-110 transition-transform" />
            {t('portfolio.viewMore')}
          </a>
        </div>
      </div>
    </section>
  );
}
