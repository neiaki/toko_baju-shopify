@php
    $channel = core()->getCurrentChannel();
@endphp

<!-- SEO Meta Content -->
@push ('meta')
    <meta
        name="title"
        content="{{ $channel->home_seo['meta_title'] ?? 'Toko Fashion - Define Your Style' }}"
    />

    <meta
        name="description"
        content="{{ $channel->home_seo['meta_description'] ?? 'Toko Fashion Streetwear Urban' }}"
    />

    <meta
        name="keywords"
        content="{{ $channel->home_seo['meta_keywords'] ?? 'fashion, baju, kaos, celana' }}"
    />
@endPush

<x-shop::layouts>
    <!-- Page Title -->
    <x-slot:title>
        {{  $channel->home_seo['meta_title'] ?? 'Toko Fashion' }}
    </x-slot>

    <div class="flex flex-col gap-0 w-full overflow-hidden">
        <!-- Hero Banner -->
        @include('shop::components.home.hero-banner')

        <!-- New Arrivals Section -->
        <section class="container mx-auto px-4 py-16 md:py-24 animate-fade-in">
            <div class="flex flex-col items-center text-center mb-10">
                <h2 class="font-display text-4xl tracking-wider mb-2">New Arrivals</h2>
                <p class="text-gray-500 mb-4">Koleksi terbaru minggu ini. Jangan sampai kehabisan ukuranmu.</p>
                <a href="{{ route('shop.search.index', ['category' => 'new-arrivals']) }}" class="text-sm font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-500">
                    Lihat Semua
                </a>
            </div>
            
            <!-- Using Bagisto's built-in Product Carousel for New Arrivals -->
            <x-shop::products.carousel
                title=""
                :src="route('shop.api.products.index', ['new' => 1, 'limit' => 8])"
                :navigation-link="route('shop.search.index', ['new' => 1])"
            />
        </section>

        <!-- Category Grid Section -->
        <section class="py-8 animate-fade-in">
            @include('shop::components.home.category-grid')
        </section>

        <!-- Best Sellers Section -->
        <section class="container mx-auto px-4 py-16 md:py-24 animate-fade-in">
            <div class="flex flex-col items-center text-center mb-10">
                <h2 class="font-display text-4xl tracking-wider mb-2">Best Sellers</h2>
                <p class="text-gray-500 mb-4">Produk paling laris dan dicari bulan ini.</p>
                <a href="{{ route('shop.search.index', ['category' => 'best-sellers']) }}" class="text-sm font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-500">
                    Lihat Semua
                </a>
            </div>
            
            <x-shop::products.carousel
                title=""
                :src="route('shop.api.products.index', ['featured' => 1, 'limit' => 4])"
                :navigation-link="route('shop.search.index', ['featured' => 1])"
            />
        </section>

        <!-- Promo Banner -->
        @include('shop::components.home.promo-banner')

        <!-- Flash Sale Section -->
        <section id="flash-sale" class="container mx-auto px-4 py-16 md:py-24 animate-fade-in scroll-mt-20">
            <div class="flex flex-col items-center text-center mb-10">
                <h2 class="font-display text-4xl tracking-wider mb-2">Flash Sale</h2>
                <p class="text-gray-500 mb-4">Penawaran terbatas! Dapatkan potongan harga terbaik khusus hari ini.</p>
                <a href="{{ route('shop.search.index', ['category' => 'sale']) }}" class="text-sm font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-500">
                    Lihat Semua
                </a>
            </div>
            
            <x-shop::products.carousel
                title=""
                :src="route('shop.api.products.index', ['on_sale' => 1, 'limit' => 8])"
                :navigation-link="route('shop.search.index', ['category' => 'sale'])"
            />
        </section>

        <!-- Instagram Feed Mock -->
        <section class="container mx-auto px-4 py-16 md:py-24">
            <div class="text-center mb-10">
                <h2 class="font-display text-4xl tracking-wider mb-2">@TOKOFASHION.ID</h2>
                <p class="text-gray-500">Tag us on Instagram to be featured</p>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4">
                @php
                    $igPhotos = [
                        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80",
                        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80",
                        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80",
                        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&q=80",
                        "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=400&q=80"
                    ];
                @endphp
                @foreach($igPhotos as $src)
                    <a href="#" class="relative aspect-square overflow-hidden group block">
                        <img src="{{ $src }}" alt="Instagram Feed" class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" />
                        <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" /></svg>
                        </div>
                    </a>
                @endforeach
            </div>
        </section>
    </div>
</x-shop::layouts>
