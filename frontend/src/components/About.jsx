import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

function Counter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!inView) return;
    const num = parseInt(end) || 0;
    if (num === 0) { setCount(end); return; }
    let start = 0;
    const step = num / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= num) {
        setCount(num);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return (
    <span ref={ref} className="font-display text-5xl md:text-7xl text-cream">
      {typeof count === 'number' ? count : end}{suffix}
    </span>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 },
  }),
};

export default function About() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const stats = t('about.stats') || [];

  return (
    <section id="studio" className="bg-charcoal py-24 md:py-32 lg:py-40 relative overflow-hidden" data-testid="about-section">
      <div className="px-6 md:px-12 lg:px-24" ref={ref}>
        {/* Section label */}
        <motion.span
          className="font-accent text-xs tracking-[0.3em] uppercase text-cream/30 block mb-6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          (01)
        </motion.span>

        {/* Heading */}
        <div className="overflow-hidden mb-16 md:mb-24">
          <motion.h2
            className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tighter text-cream"
            initial={{ y: '100%' }}
            animate={inView ? { y: '0%' } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            data-testid="about-heading"
          >
            {t('about.heading')}
          </motion.h2>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Image */}
          <motion.div
            className="relative aspect-[4/5] overflow-hidden rounded-sm"
            custom={0}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp}
          >
            <img
              src="https://images.unsplash.com/photo-1658863025658-4a259cc68fc9?w=800&q=80"
              alt="Kkemi Studio"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
          </motion.div>

          {/* Text */}
          <div className="flex flex-col justify-center">
            {['text1', 'text2', 'text3'].map((key, i) => (
              <motion.p
                key={key}
                className="text-cream/70 text-base md:text-lg leading-relaxed mb-6 font-body"
                custom={i + 1}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={fadeUp}
              >
                {t(`about.${key}`)}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 md:mt-32 pt-16 border-t border-cream/10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          data-testid="stats-row"
        >
          {stats.map((stat, i) => {
            const numMatch = stat.number.match(/^(\d+)/);
            const suffix = stat.number.replace(/^\d+/, '');
            return (
              <div key={i} className="text-center md:text-left" data-testid={`stat-${i}`}>
                {numMatch ? (
                  <Counter end={parseInt(numMatch[1])} suffix={suffix} />
                ) : (
                  <span className="font-display text-5xl md:text-7xl text-cream">{stat.number}</span>
                )}
                <p className="font-accent text-xs tracking-[0.2em] uppercase text-cream/40 mt-3">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
