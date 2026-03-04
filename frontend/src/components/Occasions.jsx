import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Heart, Church, PartyPopper, Gift, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const iconMap = {
  heart: Heart,
  church: Church,
  partyPopper: PartyPopper,
  gift: Gift,
};

const accentColors = ['#E8B4B8', '#B8860B', '#5B2C6F', '#1B4332'];

export default function Occasions() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [openIdx, setOpenIdx] = useState(null);
  const items = t('occasions.items') || [];

  return (
    <section id="occasions" className="bg-charcoal py-24 md:py-32 lg:py-40" data-testid="occasions-section">
      <div className="px-6 md:px-12 lg:px-24" ref={ref}>
        <motion.span
          className="font-accent text-xs tracking-[0.3em] uppercase text-cream/30 block mb-6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          (04)
        </motion.span>

        <div className="overflow-hidden mb-6">
          <motion.h2
            className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tighter text-cream"
            initial={{ y: '100%' }}
            animate={inView ? { y: '0%' } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            data-testid="occasions-heading"
          >
            {t('occasions.heading')}
          </motion.h2>
        </div>

        <motion.p
          className="text-cream/50 text-base md:text-lg font-body max-w-2xl mb-16 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {t('occasions.subtitle')}
        </motion.p>

        <div className="space-y-4">
          {items.map((item, i) => {
            const Icon = iconMap[item.icon] || Heart;
            const isOpen = openIdx === i;
            return (
              <motion.div
                key={i}
                className="border border-cream/10 rounded-sm overflow-hidden"
                custom={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 + 0.4, duration: 0.6 }}
              >
                <button
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  data-testid={`occasion-${i}`}
                >
                  <div className="flex items-center gap-4 md:gap-6">
                    <div
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: accentColors[i] + '20' }}
                    >
                      <Icon size={20} style={{ color: accentColors[i] }} />
                    </div>
                    <h3 className="font-heading text-lg md:text-2xl text-cream group-hover:text-gold transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={20} className="text-cream/40" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
                        <div className="pl-14 md:pl-[72px]">
                          <p className="text-cream/60 text-sm md:text-base leading-relaxed font-body">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
