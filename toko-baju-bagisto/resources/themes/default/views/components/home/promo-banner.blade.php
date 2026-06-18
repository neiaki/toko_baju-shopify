<div class="relative w-full bg-brand-red text-white py-16 md:py-24 overflow-hidden">
    <!-- Abstract Background Pattern -->
    <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(#fff 2px, transparent 2px); background-size: 30px 30px;"></div>
    
    <div class="container mx-auto px-4 relative z-10">
        <div class="flex flex-col md:flex-row items-center justify-between gap-12">
            
            <!-- Left Text -->
            <div class="flex-1 text-center md:text-left">
                <h2 class="font-display text-5xl md:text-7xl tracking-wider mb-4">
                    FLASH SALE
                </h2>
                <p class="text-xl md:text-2xl font-light mb-8 max-w-md">
                    Diskon hingga 50% untuk semua koleksi. Waktu terbatas!
                </p>
                <a 
                    href="#flash-sale"
                    class="inline-block bg-white text-brand-red px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
                >
                    Belanja Sale
                </a>
            </div>

            <!-- Right Timer -->
            <div class="flex-1 flex justify-center md:justify-end gap-3 sm:gap-4" id="promo-countdown">
                <div class="flex flex-col items-center">
                    <div class="w-16 h-16 sm:w-20 sm:h-20 bg-black/20 backdrop-blur-sm border border-white/10 flex items-center justify-center text-3xl sm:text-4xl font-display tracking-widest mb-2 shadow-inner rounded-md" data-timer="days">00</div>
                    <span class="text-xs uppercase tracking-widest font-bold opacity-80">Hari</span>
                </div>
                <div class="flex flex-col items-center">
                    <div class="w-16 h-16 sm:w-20 sm:h-20 bg-black/20 backdrop-blur-sm border border-white/10 flex items-center justify-center text-3xl sm:text-4xl font-display tracking-widest mb-2 shadow-inner rounded-md" data-timer="hours">00</div>
                    <span class="text-xs uppercase tracking-widest font-bold opacity-80">Jam</span>
                </div>
                <div class="flex flex-col items-center">
                    <div class="w-16 h-16 sm:w-20 sm:h-20 bg-black/20 backdrop-blur-sm border border-white/10 flex items-center justify-center text-3xl sm:text-4xl font-display tracking-widest mb-2 shadow-inner rounded-md" data-timer="minutes">00</div>
                    <span class="text-xs uppercase tracking-widest font-bold opacity-80">Menit</span>
                </div>
                <div class="flex flex-col items-center">
                    <div class="w-16 h-16 sm:w-20 sm:h-20 bg-black/20 backdrop-blur-sm border border-white/10 flex items-center justify-center text-3xl sm:text-4xl font-display tracking-widest mb-2 shadow-inner rounded-md" data-timer="seconds">00</div>
                    <span class="text-xs uppercase tracking-widest font-bold opacity-80">Detik</span>
                </div>
            </div>
        </div>
    </div>
</div>

@push('scripts')
<script>
    document.addEventListener("DOMContentLoaded", function() {
        // Mock target date: 3 days from now
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 3);

        const elDays = document.querySelector('[data-timer="days"]');
        const elHours = document.querySelector('[data-timer="hours"]');
        const elMinutes = document.querySelector('[data-timer="minutes"]');
        const elSeconds = document.querySelector('[data-timer="seconds"]');

        if (!elDays) return;

        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference <= 0) {
                clearInterval(interval);
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            elDays.textContent = days.toString().padStart(2, '0');
            elHours.textContent = hours.toString().padStart(2, '0');
            elMinutes.textContent = minutes.toString().padStart(2, '0');
            elSeconds.textContent = seconds.toString().padStart(2, '0');
        }, 1000);
    });
</script>
@endpush
