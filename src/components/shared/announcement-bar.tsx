"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  const { t } = useLanguage();

  if (!isVisible) return null;

  return (
    <div className="relative bg-brand-black text-white py-2 overflow-hidden flex items-center justify-center text-xs md:text-sm font-medium tracking-wide z-50">
      <div className="w-full overflow-hidden flex whitespace-nowrap">
        <div className="animate-marquee inline-block">
          {t.announcement.text} &bull; {t.announcement.text} &bull;&nbsp;
        </div>
        <div className="animate-marquee inline-block" aria-hidden="true">
          {t.announcement.text} &bull; {t.announcement.text} &bull;&nbsp;
        </div>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
        aria-label={t.announcement.close}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
