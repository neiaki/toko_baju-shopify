"use client";

import { useState } from "react";
import { X } from "lucide-react";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-brand-black text-white py-2 overflow-hidden flex items-center justify-center text-xs md:text-sm font-medium tracking-wide z-50">
      <div className="w-full overflow-hidden flex whitespace-nowrap">
        <div className="animate-marquee inline-block">
          🔥 GRATIS ONGKIR SELURUH INDONESIA &bull; DISKON HINGGA 50% &bull; KOLEKSI BARU SETIAP MINGGU &bull; GRATIS ONGKIR SELURUH INDONESIA &bull; DISKON HINGGA 50% &bull; KOLEKSI BARU SETIAP MINGGU &bull;&nbsp;
        </div>
        <div className="animate-marquee inline-block" aria-hidden="true">
          🔥 GRATIS ONGKIR SELURUH INDONESIA &bull; DISKON HINGGA 50% &bull; KOLEKSI BARU SETIAP MINGGU &bull; GRATIS ONGKIR SELURUH INDONESIA &bull; DISKON HINGGA 50% &bull; KOLEKSI BARU SETIAP MINGGU &bull;&nbsp;
        </div>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
        aria-label="Tutup pengumuman"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
