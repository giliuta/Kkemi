import { Phone } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/35799175772"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn fixed bottom-8 right-8 w-14 h-14 bg-gold text-cream rounded-full shadow-xl z-40 flex items-center justify-center"
      data-testid="whatsapp-btn"
      aria-label="WhatsApp"
    >
      <Phone size={22} />
    </a>
  );
}
