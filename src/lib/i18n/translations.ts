// =============================================================================
// NEki Store — Translations (ID / EN)
// =============================================================================

export type Locale = 'id' | 'en';

export interface Translations {
  // --- Navbar ---
  nav: {
    collections: string;
    kaos: string;
    kemeja: string;
    celana: string;
    sale: string;
    openMenu: string;
    account: string;
    cart: string;
    selectCurrency: string;
    selectLanguage: string;
  };

  // --- Announcement Bar ---
  announcement: {
    text: string;
    close: string;
  };

  // --- Hero Banner ---
  hero: {
    subtitle: string;
    title: string;
    description: string;
    shopNow: string;
    viewCollection: string;
  };

  // --- Promo Banner ---
  promo: {
    title: string;
    description: string;
    shopSale: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };

  // --- Category Grid ---
  category: {
    kaos: string;
    kemeja: string;
    celana: string;
    aksesoris: string;
    shopNow: string;
  };

  // --- Section Headers ---
  section: {
    newArrivals: string;
    newArrivalsDesc: string;
    bestSellers: string;
    bestSellersDesc: string;
    viewAll: string;
    instagramHandle: string;
    instagramDesc: string;
  };

  // --- Product ---
  product: {
    addToCart: string;
    adding: string;
    soldOut: string;
    sizeGuide: string;
    description: string;
    details: string;
    sizing: string;
    relatedProducts: string;
    quickAdd: string;
  };

  // --- Cart Drawer ---
  cart: {
    title: string;
    item: string;
    items: string;
    empty: string;
    emptyDesc: string;
    startShopping: string;
    removeItem: string;
    discountPlaceholder: string;
    apply: string;
    invalidCode: string;
    discountApplied: string;
    subtotal: string;
    discount: string;
    total: string;
    checkout: string;
    taxShipping: string;
  };

  // --- Footer ---
  footer: {
    description: string;
    help: string;
    faq: string;
    howToOrder: string;
    returnsExchange: string;
    contactUs: string;
    collections: string;
    followUs: string;
    subscribe: string;
    emailPlaceholder: string;
    register: string;
    allRightsReserved: string;
  };

  // --- Account ---
  account: {
    login: string;
    register: string;
    loginDesc: string;
    registerDesc: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    noAccount: string;
    hasAccount: string;
  };

  // --- Search ---
  search: {
    placeholder: string;
    title: string;
    noResults: string;
    results: string;
  };

  // --- Collection ---
  collection: {
    filter: string;
    sort: string;
    sortNewest: string;
    sortPriceLow: string;
    sortPriceHigh: string;
    sortPopular: string;
    loadMore: string;
    products: string;
    allCollections: string;
  };

  // --- Common ---
  common: {
    loading: string;
    error: string;
    close: string;
    newArrivals: string;
    sale: string;
  };
}

const id: Translations = {
  nav: {
    collections: 'Koleksi',
    kaos: 'Kaos',
    kemeja: 'Kemeja',
    celana: 'Celana',
    sale: 'Sale',
    openMenu: 'Buka menu',
    account: 'Akun',
    cart: 'Keranjang',
    selectCurrency: 'Pilih mata uang',
    selectLanguage: 'Pilih bahasa',
  },
  announcement: {
    text: '🔥 GRATIS ONGKIR SELURUH INDONESIA • DISKON HINGGA 50% • KOLEKSI BARU SETIAP MINGGU',
    close: 'Tutup pengumuman',
  },
  hero: {
    subtitle: 'Koleksi Terbaru 2026',
    title: 'DEFINE YOUR STYLE',
    description: 'Temukan koleksi streetwear urban terbaik dengan harga terjangkau. Dirancang untuk generasi muda yang berani tampil beda.',
    shopNow: 'Belanja Sekarang',
    viewCollection: 'Lihat Koleksi',
  },
  promo: {
    title: 'FLASH SALE',
    description: 'Diskon hingga 50% untuk semua koleksi. Waktu terbatas!',
    shopSale: 'Belanja Sale',
    days: 'Hari',
    hours: 'Jam',
    minutes: 'Menit',
    seconds: 'Detik',
  },
  category: {
    kaos: 'KAOS',
    kemeja: 'KEMEJA',
    celana: 'CELANA',
    aksesoris: 'AKSESORIS',
    shopNow: 'Belanja Sekarang',
  },
  section: {
    newArrivals: 'New Arrivals',
    newArrivalsDesc: 'Koleksi terbaru minggu ini. Jangan sampai kehabisan ukuranmu.',
    bestSellers: 'Best Sellers',
    bestSellersDesc: 'Produk paling laris dan dicari bulan ini.',
    viewAll: 'Lihat Semua',
    instagramHandle: '@NEKISTORE.ID',
    instagramDesc: 'Tag kami di Instagram untuk ditampilkan',
  },
  product: {
    addToCart: 'Tambah ke Keranjang',
    adding: 'Menambahkan...',
    soldOut: 'Habis',
    sizeGuide: 'Panduan Ukuran',
    description: 'Deskripsi',
    details: 'Detail',
    sizing: 'Ukuran',
    relatedProducts: 'Produk Terkait',
    quickAdd: 'Tambah Cepat',
  },
  cart: {
    title: 'Keranjang Belanja',
    item: 'Item',
    items: 'Item',
    empty: 'Keranjang masih kosong',
    emptyDesc: 'Kelihatannya Anda belum menambahkan barang ke keranjang belanja Anda.',
    startShopping: 'Mulai Belanja',
    removeItem: 'Hapus item',
    discountPlaceholder: "Kode diskon (coba 'DISKON10')",
    apply: 'Terapkan',
    invalidCode: 'Kode diskon tidak valid',
    discountApplied: 'Diskon berhasil diterapkan!',
    subtotal: 'Subtotal',
    discount: 'Diskon',
    total: 'Total',
    checkout: 'Checkout',
    taxShipping: 'Pajak dan ongkos kirim dihitung saat checkout',
  },
  footer: {
    description: 'Mendefinisikan gaya streetwear urban Indonesia dengan produk premium yang terjangkau.',
    help: 'Bantuan',
    faq: 'FAQ',
    howToOrder: 'Cara Order',
    returnsExchange: 'Pengembalian & Penukaran',
    contactUs: 'Hubungi Kami',
    collections: 'Koleksi',
    followUs: 'Ikuti Kami',
    subscribe: 'Berlangganan',
    emailPlaceholder: 'Email Anda',
    register: 'Daftar',
    allRightsReserved: 'All rights reserved.',
  },
  account: {
    login: 'Masuk',
    register: 'Daftar',
    loginDesc: 'Masuk ke akun NEki Store Anda',
    registerDesc: 'Buat akun untuk checkout lebih cepat dan lihat riwayat pesanan',
    firstName: 'Nama Depan',
    lastName: 'Nama Belakang',
    email: 'Email',
    password: 'Password',
    noAccount: 'Belum punya akun? Daftar di sini',
    hasAccount: 'Sudah punya akun? Masuk di sini',
  },
  search: {
    placeholder: 'Cari produk...',
    title: 'Pencarian',
    noResults: 'Tidak ada hasil ditemukan',
    results: 'hasil',
  },
  collection: {
    filter: 'Filter',
    sort: 'Urutkan',
    sortNewest: 'Terbaru',
    sortPriceLow: 'Harga: Rendah ke Tinggi',
    sortPriceHigh: 'Harga: Tinggi ke Rendah',
    sortPopular: 'Terpopuler',
    loadMore: 'Muat Lebih Banyak',
    products: 'produk',
    allCollections: 'Semua Koleksi',
  },
  common: {
    loading: 'Memuat...',
    error: 'Terjadi kesalahan',
    close: 'Tutup',
    newArrivals: 'New Arrivals',
    sale: 'Sale',
  },
};

const en: Translations = {
  nav: {
    collections: 'Collections',
    kaos: 'T-Shirts',
    kemeja: 'Shirts',
    celana: 'Pants',
    sale: 'Sale',
    openMenu: 'Open menu',
    account: 'Account',
    cart: 'Cart',
    selectCurrency: 'Select currency',
    selectLanguage: 'Select language',
  },
  announcement: {
    text: '🔥 FREE SHIPPING ALL OVER INDONESIA • UP TO 50% OFF • NEW COLLECTION EVERY WEEK',
    close: 'Close announcement',
  },
  hero: {
    subtitle: 'Latest Collection 2026',
    title: 'DEFINE YOUR STYLE',
    description: 'Discover the best urban streetwear collection at affordable prices. Designed for the bold generation.',
    shopNow: 'Shop Now',
    viewCollection: 'View Collection',
  },
  promo: {
    title: 'FLASH SALE',
    description: 'Up to 50% off on all collections. Limited time only!',
    shopSale: 'Shop Sale',
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
  },
  category: {
    kaos: 'T-SHIRTS',
    kemeja: 'SHIRTS',
    celana: 'PANTS',
    aksesoris: 'ACCESSORIES',
    shopNow: 'Shop Now',
  },
  section: {
    newArrivals: 'New Arrivals',
    newArrivalsDesc: "This week's newest collection. Don't miss your size.",
    bestSellers: 'Best Sellers',
    bestSellersDesc: "This month's most popular products.",
    viewAll: 'View All',
    instagramHandle: '@NEKISTORE.ID',
    instagramDesc: 'Tag us on Instagram to be featured',
  },
  product: {
    addToCart: 'Add to Cart',
    adding: 'Adding...',
    soldOut: 'Sold Out',
    sizeGuide: 'Size Guide',
    description: 'Description',
    details: 'Details',
    sizing: 'Sizing',
    relatedProducts: 'Related Products',
    quickAdd: 'Quick Add',
  },
  cart: {
    title: 'Shopping Cart',
    item: 'Item',
    items: 'Items',
    empty: 'Your cart is empty',
    emptyDesc: "Looks like you haven't added any items to your shopping cart.",
    startShopping: 'Start Shopping',
    removeItem: 'Remove item',
    discountPlaceholder: "Discount code (try 'DISKON10')",
    apply: 'Apply',
    invalidCode: 'Invalid discount code',
    discountApplied: 'Discount applied successfully!',
    subtotal: 'Subtotal',
    discount: 'Discount',
    total: 'Total',
    checkout: 'Checkout',
    taxShipping: 'Taxes and shipping calculated at checkout',
  },
  footer: {
    description: 'Defining Indonesian urban streetwear style with affordable premium products.',
    help: 'Help',
    faq: 'FAQ',
    howToOrder: 'How to Order',
    returnsExchange: 'Returns & Exchange',
    contactUs: 'Contact Us',
    collections: 'Collections',
    followUs: 'Follow Us',
    subscribe: 'Subscribe',
    emailPlaceholder: 'Your Email',
    register: 'Subscribe',
    allRightsReserved: 'All rights reserved.',
  },
  account: {
    login: 'Sign In',
    register: 'Sign Up',
    loginDesc: 'Sign in to your NEki Store account',
    registerDesc: 'Create an account for faster checkout and order history',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    password: 'Password',
    noAccount: "Don't have an account? Sign up here",
    hasAccount: 'Already have an account? Sign in here',
  },
  search: {
    placeholder: 'Search products...',
    title: 'Search',
    noResults: 'No results found',
    results: 'results',
  },
  collection: {
    filter: 'Filter',
    sort: 'Sort',
    sortNewest: 'Newest',
    sortPriceLow: 'Price: Low to High',
    sortPriceHigh: 'Price: High to Low',
    sortPopular: 'Popular',
    loadMore: 'Load More',
    products: 'products',
    allCollections: 'All Collections',
  },
  common: {
    loading: 'Loading...',
    error: 'An error occurred',
    close: 'Close',
    newArrivals: 'New Arrivals',
    sale: 'Sale',
  },
};

export const translations: Record<Locale, Translations> = { id, en };

export function getTranslations(locale: Locale): Translations {
  return translations[locale] || translations.id;
}
