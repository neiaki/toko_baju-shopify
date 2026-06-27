'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export function WhatsAppButton() {
  const [isTooltipVisible, setIsTooltipVisible] = useState(true);
  
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281234567890';
  const message = encodeURIComponent('Halo NEki Store! Saya ingin bertanya tentang produk Anda.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isTooltipVisible && (
        <div className="relative bg-white dark:bg-zinc-800 text-foreground rounded-lg shadow-xl border border-border px-4 py-3 max-w-[220px] animate-slide-up">
          <button
            onClick={() => setIsTooltipVisible(false)}
            className="absolute -top-2 -right-2 w-5 h-5 bg-muted rounded-full flex items-center justify-center hover:bg-muted-foreground/20 transition-colors"
            aria-label="Tutup"
          >
            <X className="w-3 h-3" />
          </button>
          <p className="text-xs font-medium leading-relaxed">
            Ada pertanyaan? Chat kami di WhatsApp! 💬
          </p>
        </div>
      )}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Chat via WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white transition-transform group-hover:rotate-12" />
      </a>
    </div>
  );
}
