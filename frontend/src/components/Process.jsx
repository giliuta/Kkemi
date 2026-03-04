import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageSquare, Pencil, Printer, PartyPopper } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const stepIcons = [MessageSquare, Pencil, Printer, PartyPopper];
const stepColors = ['#E8B4B8', '#B8860B', '#5B2C6F', '#1B4332'];

export default function Process() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const steps = t('process.steps') || [];

  return (
    <section className="bg-cream py-24 md:py-32 lg:py-40" data-testid="process-section">
      <div className="px-6 md:px-12 lg:px-24" ref={ref}>
        <motion.span
          className="font-accent text-xs tracking-[0.3em] uppercase text-charcoal/30 block mb-6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          (05)
        </motion.span>

        <div className="overflow-hidden mb-16 md:mb-24">
          <motion.h2
            className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tighter text-charcoal"
            initial={{ y: '100%' }}
            animate={inView ? { y: '0%' } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            data-testid="process-heading"
          >
            {t('process.heading')}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {steps.map((step, i) => {
            const Icon = stepIcons[i];
            return (
              <motion.div
                key={i}
                className="relative"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15 + 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                data-testid={`process-step-${i}`}
              >
                {/* Connecting line (desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(100%+12px)] w-[calc(100%-24px)] h-px bg-charcoal/10" />
                )}

                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: stepColors[i] + '15' }}
                >
                  <Icon size={22} style={{ color: stepColors[i] }} />
                </div>

                <span className="font-accent text-xs tracking-[0.2em] uppercase text-gold mb-3 block">
                  {step.num}
                </span>
                <h3 className="font-heading text-xl md:text-2xl text-charcoal mb-3">
                  {step.title}
                </h3>
                <p className="text-charcoal/60 text-sm md:text-base leading-relaxed font-body">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
