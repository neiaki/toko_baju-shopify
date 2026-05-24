"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function PromoBanner() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Mock target date: 3 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full bg-brand-red text-white py-16 md:py-24 overflow-hidden">
      {/* Abstract Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#fff 2px, transparent 2px)", backgroundSize: "30px 30px" }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Left Text */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-display text-5xl md:text-7xl tracking-wider mb-4">
              FLASH SALE
            </h2>
            <p className="text-xl md:text-2xl font-light mb-8 max-w-md">
              Diskon hingga 50% untuk semua koleksi. Waktu terbatas!
            </p>
            <Link 
              href="/collections/sale"
              className="inline-block bg-white text-brand-red px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
            >
              Belanja Sale
            </Link>
          </div>

          {/* Right Timer */}
          <div className="flex-1 flex justify-center md:justify-end gap-3 sm:gap-4">
            <TimeBox value={timeLeft.days} label="Hari" />
            <TimeBox value={timeLeft.hours} label="Jam" />
            <TimeBox value={timeLeft.minutes} label="Menit" />
            <TimeBox value={timeLeft.seconds} label="Detik" />
          </div>

        </div>
      </div>
    </div>
  );
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black/20 backdrop-blur-sm border border-white/10 flex items-center justify-center text-3xl sm:text-4xl font-display tracking-widest mb-2 shadow-inner rounded-md">
        {value.toString().padStart(2, "0")}
      </div>
      <span className="text-xs uppercase tracking-widest font-bold opacity-80">
        {label}
      </span>
    </div>
  );
}
