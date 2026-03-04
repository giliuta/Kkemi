import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

export default function Services() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const items = t('services.items') || [];

  return (
    <section id="services" className="bg-cream py-24 md:py-32 lg:py-40 relative" data-testid="services-section">
      <div className="px-6 md:px-12 lg:px-24" ref={ref}>
        <motion.span
          className="font-accent text-xs tracking-[0.3em] uppercase text-charcoal/30 block mb-6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          (02)
        </motion.span>

        <div className="overflow-hidden mb-16 md:mb-24">
          <motion.h2
            className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tighter text-charcoal"
            initial={{ y: '100%' }}
            animate={inView ? { y: '0%' } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            data-testid="services-heading"
          >
            {t('services.heading')}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              className="service-card group relative p-8 md:p-10 border border-charcoal/10 bg-white/50 backdrop-blur-sm overflow-hidden rounded-sm"
              custom={i}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={cardVariants}
              data-testid={`service-card-${i}`}
            >
              {/* Background number */}
              <span className="service-num absolute -top-4 -right-2 font-display text-[120px] md:text-[160px] text-charcoal/[0.03] leading-none select-none pointer-events-none">
                {item.num}
              </span>

              <div className="relative z-10">
                <span className="font-accent text-xs tracking-[0.2em] uppercase text-gold mb-4 block">
                  {item.num}
                </span>
                <h3 className="font-heading text-xl md:text-2xl text-charcoal mb-4 leading-tight">
                  {item.title}
                </h3>
                <p className="text-charcoal/60 text-sm md:text-base leading-relaxed mb-6 font-body">
                  {item.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {(item.tags || []).map((tag, j) => (
                    <span
                      key={j}
                      className="text-[10px] font-accent tracking-wider uppercase px-3 py-1.5 border border-charcoal/10 text-charcoal/50 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
