"use client";

import Link from "next/link";
import { ArrowDown } from "lucide-react";

export function HeroBanner() {
  return (
    <div className="relative w-full h-[calc(100vh-80px)] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80")' }}
      >
        <div className="absolute inset-0 bg-black/60 dark:bg-black/70 mix-blend-multiply"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center animate-slide-up">
        <span className="text-white/90 text-sm md:text-base uppercase tracking-[0.3em] font-semibold mb-4">
          Koleksi Terbaru 2026
        </span>
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-white tracking-wider mb-6 drop-shadow-lg">
          DEFINE YOUR STYLE
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl font-light mb-10">
          Temukan koleksi streetwear urban terbaik dengan harga terjangkau. Dirancang untuk generasi muda yang berani tampil beda.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link 
            href="/collections/new-arrivals"
            className="bg-white text-black px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors text-center"
          >
            Belanja Sekarang
          </Link>
          <Link 
            href="/collections/all"
            className="border-2 border-white text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors text-center"
          >
            Lihat Koleksi
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ArrowDown className="text-white w-6 h-6 opacity-70" />
      </div>
    </div>
  );
}
