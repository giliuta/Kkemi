import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const floatingImages = [
  { src: 'https://images.unsplash.com/photo-1639291492775-b2dba15cb3e4?w=300&q=80', x: '8%', y: '15%', size: 'w-32 h-40 md:w-44 md:h-56', delay: 0 },
  { src: 'https://images.unsplash.com/photo-1750208759761-6a32d532e426?w=300&q=80', x: '75%', y: '20%', size: 'w-28 h-36 md:w-40 md:h-48', delay: 0.3 },
  { src: 'https://images.unsplash.com/photo-1704030459079-c31da57b848d?w=300&q=80', x: '85%', y: '60%', size: 'w-24 h-32 md:w-36 md:h-44', delay: 0.6 },
  { src: 'https://images.unsplash.com/photo-1700267642917-0df52f004f86?w=300&q=80', x: '5%', y: '65%', size: 'w-28 h-36 md:w-36 md:h-48', delay: 0.9 },
];

const wordVariants = {
  hidden: { y: '110%', opacity: 0 },
  visible: (i) => ({
    y: '0%',
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 + 0.5 },
  }),
};

export default function Hero() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const heroLines = [
    { text: t('hero.line1'), accent: false },
    { text: t('hero.line2'), accent: false },
    { text: t('hero.line3'), accent: true },
  ];

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-cream" data-testid="hero-section">
      {/* Floating images */}
      {floatingImages.map((img, i) => (
        <motion.div
          key={i}
          className={`absolute ${img.size} rounded-lg overflow-hidden shadow-xl floating-element hidden md:block`}
          style={{ left: img.x, top: img.y, y: imageY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ delay: img.delay + 1, duration: 1 }}
          data-cursor="view"
        >
          <img src={img.src} alt="" className="w-full h-full object-cover" loading="lazy" />
        </motion.div>
      ))}

      {/* Main content */}
      <motion.div
        className="relative z-10 px-6 md:px-12 lg:px-24 pt-32 md:pt-0 w-full"
        style={{ y: textY, opacity }}
      >
        <div className="max-w-6xl">
          {heroLines.map((line, lineIdx) => (
            <div key={lineIdx} className="overflow-hidden">
              <motion.h1
                className={`font-display text-6xl sm:text-7xl md:text-8xl lg:text-[120px] xl:text-[140px] tracking-tighter leading-[0.85] ${
                  line.accent ? 'italic text-gold' : 'text-charcoal'
                }`}
                custom={lineIdx}
                initial="hidden"
                animate="visible"
                variants={wordVariants}
                data-testid={`hero-line-${lineIdx}`}
              >
                {line.text}
              </motion.h1>
            </div>
          ))}
        </div>

        <motion.div
          className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-center gap-2 md:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <span className="font-accent text-xs tracking-[0.3em] uppercase text-charcoal/50">
            {t('hero.subtitle')}
          </span>
          <span className="hidden md:block w-1 h-1 rounded-full bg-gold" />
          <span className="font-accent text-xs tracking-[0.3em] uppercase text-charcoal/50">
            {t('hero.location')}
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        data-testid="scroll-indicator"
      >
        <span className="font-accent text-[10px] tracking-[0.3em] uppercase text-charcoal/30">
          {t('hero.scroll')}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={16} className="text-charcoal/30" />
        </motion.div>
      </motion.div>

      {/* Decorative dots */}
      <div className="absolute top-20 right-20 w-2 h-2 rounded-full bg-gold/30 floating-element hidden lg:block" />
      <div className="absolute bottom-32 right-40 w-3 h-3 rounded-full bg-blush/40 floating-element hidden lg:block" />
      <div className="absolute top-40 left-[45%] w-1.5 h-1.5 rounded-full bg-royal/20 floating-element hidden lg:block" />
    </section>
  );
}
