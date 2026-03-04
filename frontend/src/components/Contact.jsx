import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Instagram, Clock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const HOURS_DATA = [
  { day: 'monday', hours: '09:00 - 13:00, 15:00 - 18:00' },
  { day: 'tuesday', hours: '09:00 - 13:00, 15:00 - 18:00' },
  { day: 'wednesday', hours: null },
  { day: 'thursday', hours: '09:00 - 13:00, 15:00 - 18:00' },
  { day: 'friday', hours: '09:00 - 13:00, 15:00 - 18:00' },
  { day: 'saturday', hours: null },
  { day: 'sunday', hours: null },
];

export default function Contact() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [status, setStatus] = useState(null);
  const serviceOptions = t('contact.form.serviceOptions') || [];

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `[Kkemi] ${formData.service || 'New Inquiry'} — ${formData.name}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || '—'}\nService: ${formData.service || '—'}\n\nMessage:\n${formData.message || '—'}`
    );

    // Open WhatsApp with pre-filled message
    const waText = encodeURIComponent(
      `Hi! I'm ${formData.name}.\nInterested in: ${formData.service || 'your services'}\n\n${formData.message || ''}`
    );
    window.open(`https://wa.me/35799175772?text=${waText}`, '_blank');

    setStatus('success');
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  };

  const closedText = t('status.closed');

  return (
    <section id="contact" className="bg-cream py-24 md:py-32 lg:py-40" data-testid="contact-section">
      <div className="px-6 md:px-12 lg:px-24" ref={ref}>
        <motion.span
          className="font-accent text-xs tracking-[0.3em] uppercase text-charcoal/30 block mb-6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          (07)
        </motion.span>

        <div className="overflow-hidden mb-4">
          <motion.h2
            className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tighter text-charcoal"
            initial={{ y: '100%' }}
            animate={inView ? { y: '0%' } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            data-testid="contact-heading"
          >
            {t('contact.heading')}
          </motion.h2>
        </div>

        <motion.p
          className="text-charcoal/50 text-base md:text-lg font-body max-w-2xl mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {t('contact.subtitle')}
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            data-testid="contact-form"
          >
            <div>
              <input
                type="text"
                placeholder={t('contact.form.name')}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full bg-transparent border-b border-charcoal/20 py-4 text-charcoal placeholder:text-charcoal/30 focus:border-gold focus:outline-none transition-colors font-body"
                data-testid="contact-name"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder={t('contact.form.email')}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full bg-transparent border-b border-charcoal/20 py-4 text-charcoal placeholder:text-charcoal/30 focus:border-gold focus:outline-none transition-colors font-body"
                data-testid="contact-email"
              />
            </div>
            <div>
              <input
                type="tel"
                placeholder={t('contact.form.phone')}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-transparent border-b border-charcoal/20 py-4 text-charcoal placeholder:text-charcoal/30 focus:border-gold focus:outline-none transition-colors font-body"
                data-testid="contact-phone"
              />
            </div>
            <div>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full bg-transparent border-b border-charcoal/20 py-4 text-charcoal/70 focus:border-gold focus:outline-none transition-colors font-body appearance-none"
                data-testid="contact-service"
              >
                <option value="">{t('contact.form.service')}</option>
                {serviceOptions.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <textarea
                placeholder={t('contact.form.message')}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full bg-transparent border-b border-charcoal/20 py-4 text-charcoal placeholder:text-charcoal/30 focus:border-gold focus:outline-none transition-colors font-body resize-none"
                data-testid="contact-message"
              />
            </div>

            <button
              type="submit"
              className="magnetic-btn bg-charcoal text-cream px-10 py-4 rounded-full font-accent text-xs tracking-[0.2em] uppercase"
              data-testid="contact-submit"
            >
              <span className="relative z-10">
                {t('contact.form.submit')}
              </span>
            </button>

            {status === 'success' && (
              <p className="text-forest text-sm font-body" data-testid="contact-success">{t('contact.form.success')}</p>
            )}
          </motion.form>

          {/* Contact info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <a
              href="https://maps.app.goo.gl/cwC3DMBqzGMXbuQL6"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 group"
              data-testid="contact-location"
            >
              <MapPin size={18} className="text-gold mt-1 flex-shrink-0" />
              <span className="font-body text-charcoal/70 group-hover:text-gold transition-colors">
                {t('contact.info.location')}
              </span>
            </a>

            <a href="tel:+35799175772" className="flex items-start gap-4 group" data-testid="contact-phone-link">
              <Phone size={18} className="text-gold mt-1 flex-shrink-0" />
              <span className="font-body text-charcoal/70 group-hover:text-gold transition-colors">
                {t('contact.info.phone')}
              </span>
            </a>

            <a
              href="https://www.instagram.com/kkemi_designstudio_typography/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 group"
              data-testid="contact-instagram"
            >
              <Instagram size={18} className="text-gold mt-1 flex-shrink-0" />
              <span className="font-body text-charcoal/70 group-hover:text-gold transition-colors">
                {t('contact.info.instagram')}
              </span>
            </a>

            {/* Hours */}
            <div className="flex items-start gap-4">
              <Clock size={18} className="text-gold mt-1 flex-shrink-0" />
              <div>
                <span className="font-accent text-xs tracking-[0.2em] uppercase text-charcoal/50 block mb-3">
                  {t('contact.info.hours')}
                </span>
                <div className="space-y-1.5">
                  {HOURS_DATA.map((h, i) => (
                    <div key={i} className="flex justify-between gap-6 text-sm font-body">
                      <span className="text-charcoal/50 w-28">{t(`days.${h.day}`)}</span>
                      <span className={h.hours ? 'text-charcoal/70' : 'text-coral/70'}>
                        {h.hours || closedText}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-8 rounded-sm overflow-hidden h-64 bg-charcoal/5" data-testid="contact-map">
              <iframe
                title="Kkemi Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.5!2d32.4190455!3d34.7743751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14e7074f3a7d408b%3A0x12e5ae638b9473b4!2sKkemi%20Design%20Studio%20%26%20Typography!5e0!3m2!1sen!2s!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(1) contrast(1.1)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
