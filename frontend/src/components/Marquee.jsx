import { useLanguage } from '@/context/LanguageContext';

export default function Marquee() {
  const { t } = useLanguage();
  const items = t('marquee.items') || [];
  const row = items.map((item, i) => (
    <span key={i} className="flex items-center gap-6 mx-6">
      <span className="whitespace-nowrap">{item}</span>
      <span className="text-gold text-lg">&#10022;</span>
    </span>
  ));

  return (
    <section className="py-6 md:py-10 overflow-hidden border-y border-charcoal/5" data-testid="marquee-section">
      {/* Row 1 - left to right */}
      <div className="flex animate-marquee font-accent text-3xl md:text-5xl lg:text-6xl uppercase tracking-wider text-charcoal/10 whitespace-nowrap select-none">
        {row}{row}
      </div>
      {/* Row 2 - right to left */}
      <div className="flex animate-marquee-reverse font-accent text-xl md:text-3xl uppercase tracking-wider text-charcoal/7 whitespace-nowrap mt-3 select-none">
        {row}{row}
      </div>
    </section>
  );
}
