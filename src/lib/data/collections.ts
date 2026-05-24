// =============================================================================
// TOKO FASHION — Collection Data
// 7 curated collections that cross-reference the products catalog
// =============================================================================

import type { Collection, Product } from '@/lib/types';
import { products, getProductsByTag, getProductsByType } from './products';

// ---------------------------------------------------------------------------
// Collections
// ---------------------------------------------------------------------------

export const collections: Collection[] = [
  {
    id: 'col-001',
    title: 'New Arrivals',
    handle: 'new-arrivals',
    description:
      'Koleksi terbaru dari TOKO FASHION. Temukan item-item fresh yang baru saja landing di toko kami!',
    image:
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80',
    productIds: getProductsByTag('new-arrival').map((p) => p.id),
  },
  {
    id: 'col-002',
    title: 'Best Sellers',
    handle: 'best-sellers',
    description:
      'Produk-produk terlaris yang paling banyak di-checkout. Kamu nggak mau ketinggalan, kan?',
    image:
      'https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=800&q=80',
    productIds: getProductsByTag('best-seller').map((p) => p.id),
  },
  {
    id: 'col-003',
    title: 'Kaos Polos',
    handle: 'kaos-polos',
    description:
      'Koleksi kaos polos premium dengan berbagai pilihan warna. Basic tapi tetap stylish!',
    image:
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
    productIds: getProductsByType('Kaos')
      .filter((p) => !p.tags.includes('grafis'))
      .map((p) => p.id),
  },
  {
    id: 'col-004',
    title: 'Kaos Grafis',
    handle: 'kaos-grafis',
    description:
      'Kaos dengan desain grafis eksklusif. Ekspresikan gaya kamu lewat print yang keren!',
    image:
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80',
    productIds: getProductsByType('Kaos')
      .filter((p) => p.tags.includes('grafis'))
      .map((p) => p.id),
  },
  {
    id: 'col-005',
    title: 'Kemeja',
    handle: 'kemeja',
    description:
      'Koleksi kemeja untuk tampilan smart-casual. Dari flannel hangat sampai linen tropis.',
    image:
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
    productIds: getProductsByType('Kemeja').map((p) => p.id),
  },
  {
    id: 'col-006',
    title: 'Celana',
    handle: 'celana',
    description:
      'Jogger, chino, cargo — temukan celana yang pas untuk setiap occasion.',
    image:
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80',
    productIds: getProductsByType('Celana').map((p) => p.id),
  },
  {
    id: 'col-007',
    title: 'Sale',
    handle: 'sale',
    description:
      'Diskon spesial! Dapatkan fashion item favoritmu dengan harga yang lebih terjangkau.',
    image:
      'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&q=80',
    productIds: getProductsByTag('sale').map((p) => p.id),
  },
];

// ---------------------------------------------------------------------------
// Helper Functions
// ---------------------------------------------------------------------------

/** Find a collection by its URL-safe handle */
export function getCollectionByHandle(
  handle: string,
): Collection | undefined {
  return collections.find((c) => c.handle === handle);
}

/** Get all products belonging to a collection, resolved from productIds */
export function getProductsForCollection(handle: string): Product[] {
  const collection = getCollectionByHandle(handle);
  if (!collection) return [];
  return products.filter((p) => collection.productIds.includes(p.id));
}
