// =============================================================================
// TOKO FASHION — Mock Product Data
// 12 products with realistic Indonesian fashion names, IDR pricing,
// multi-variant support, and Unsplash imagery
// =============================================================================

import type { Product } from '@/lib/types';

// ---------------------------------------------------------------------------
// Helpers to generate variants from option combinations
// ---------------------------------------------------------------------------

function generateVariants(
  productId: string,
  sku: string,
  sizes: string[],
  colors: string[],
  price: number,
  compareAtPrice: number | null,
): Product['variants'] {
  const variants: Product['variants'] = [];
  let idx = 1;
  for (const color of colors) {
    for (const size of sizes) {
      variants.push({
        id: `${productId}-variant-${idx}`,
        productId,
        title: `${size} / ${color}`,
        sku: `${sku}-${color.toUpperCase().slice(0, 3)}-${size}`,
        price,
        compareAtPrice,
        inventoryQuantity: Math.floor(Math.random() * 40) + 5,
        availableForSale: true,
        selectedOptions: [
          { name: 'Ukuran', value: size },
          { name: 'Warna', value: color },
        ],
      });
      idx++;
    }
  }
  return variants;
}

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

export const products: Product[] = [
  // 1 — Kaos Polos Essential Black
  {
    id: 'prod-001',
    title: 'Kaos Polos Essential Black',
    handle: 'kaos-polos-essential-black',
    descriptionHtml: `
      <p>Kaos polos dengan bahan <strong>cotton combed 30s</strong> yang super nyaman dipakai sehari-hari.
      Potongan regular fit cocok untuk berbagai bentuk tubuh.</p>
      <ul>
        <li>Bahan: 100% Cotton Combed 30s</li>
        <li>Gramasi: 200 gsm</li>
        <li>Jahitan rantai pada bagian kerah</li>
        <li>Pre-shrunk — tidak menyusut setelah dicuci</li>
      </ul>
    `,
    productType: 'Kaos',
    tags: ['new-arrival', 'best-seller', 'kaos-polos'],
    status: 'active',
    images: [
      { id: 'img-001-1', src: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80', alt: 'Kaos Polos Essential Black - depan' },
      { id: 'img-001-2', src: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80', alt: 'Kaos Polos Essential Black - detail' },
      { id: 'img-001-3', src: 'https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=800&q=80', alt: 'Kaos Polos Essential Black - model' },
    ],
    options: [
      { id: 'opt-001-1', name: 'Ukuran', values: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
      { id: 'opt-001-2', name: 'Warna', values: ['Hitam', 'Abu-abu'] },
    ],
    variants: generateVariants('prod-001', 'KPE-BLK', ['XS', 'S', 'M', 'L', 'XL', 'XXL'], ['Hitam', 'Abu-abu'], 129000, null),
    createdAt: '2026-04-01T08:00:00Z',
    updatedAt: '2026-05-20T10:30:00Z',
  },

  // 2 — Kaos Polos Essential White
  {
    id: 'prod-002',
    title: 'Kaos Polos Essential White',
    handle: 'kaos-polos-essential-white',
    descriptionHtml: `
      <p>Warna putih klasik yang wajib ada di lemari kamu. Dibuat dari <strong>cotton combed 30s</strong>
      premium dengan potongan yang pas di badan.</p>
      <ul>
        <li>Bahan: 100% Cotton Combed 30s</li>
        <li>Gramasi: 200 gsm</li>
        <li>Double stitching pada hem</li>
        <li>Cocok untuk mix-and-match segala outfit</li>
      </ul>
    `,
    productType: 'Kaos',
    tags: ['best-seller', 'kaos-polos'],
    status: 'active',
    images: [
      { id: 'img-002-1', src: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80', alt: 'Kaos Polos Essential White - depan' },
      { id: 'img-002-2', src: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80', alt: 'Kaos Polos Essential White - samping' },
      { id: 'img-002-3', src: 'https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=800&q=80', alt: 'Kaos Polos Essential White - model' },
    ],
    options: [
      { id: 'opt-002-1', name: 'Ukuran', values: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
      { id: 'opt-002-2', name: 'Warna', values: ['Putih', 'Cream'] },
    ],
    variants: generateVariants('prod-002', 'KPE-WHT', ['XS', 'S', 'M', 'L', 'XL', 'XXL'], ['Putih', 'Cream'], 129000, null),
    createdAt: '2026-04-01T08:00:00Z',
    updatedAt: '2026-05-18T14:00:00Z',
  },

  // 3 — Kaos Grafis Urban Culture
  {
    id: 'prod-003',
    title: 'Kaos Grafis Urban Culture',
    handle: 'kaos-grafis-urban-culture',
    descriptionHtml: `
      <p>Ekspresikan gaya streetwear kamu dengan kaos grafis <strong>Urban Culture</strong>.
      Print DTF berkualitas tinggi yang tidak mudah luntur meski dicuci berkali-kali.</p>
      <ul>
        <li>Bahan: Cotton Combed 24s</li>
        <li>Gramasi: 220 gsm — lebih tebal & premium</li>
        <li>Print: DTF (Direct to Film) high-resolution</li>
        <li>Desain eksklusif — limited edition</li>
      </ul>
    `,
    productType: 'Kaos',
    tags: ['new-arrival', 'grafis', 'limited-edition'],
    status: 'active',
    images: [
      { id: 'img-003-1', src: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80', alt: 'Kaos Grafis Urban Culture - depan' },
      { id: 'img-003-2', src: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80', alt: 'Kaos Grafis Urban Culture - belakang' },
      { id: 'img-003-3', src: 'https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=800&q=80', alt: 'Kaos Grafis Urban Culture - model' },
    ],
    options: [
      { id: 'opt-003-1', name: 'Ukuran', values: ['S', 'M', 'L', 'XL', 'XXL'] },
      { id: 'opt-003-2', name: 'Warna', values: ['Hitam', 'Navy'] },
    ],
    variants: generateVariants('prod-003', 'KGU-CUL', ['S', 'M', 'L', 'XL', 'XXL'], ['Hitam', 'Navy'], 179000, null),
    createdAt: '2026-05-01T08:00:00Z',
    updatedAt: '2026-05-22T09:15:00Z',
  },

  // 4 — Kaos Grafis Tokyo Drift
  {
    id: 'prod-004',
    title: 'Kaos Grafis Tokyo Drift',
    handle: 'kaos-grafis-tokyo-drift',
    descriptionHtml: `
      <p>Terinspirasi dari kultur <strong>Japanese streetwear</strong>, kaos ini menampilkan grafis
      kanji dengan nuansa urban yang keren. Wajib punya buat kamu pecinta anime & J-culture!</p>
      <ul>
        <li>Bahan: Cotton Combed 24s</li>
        <li>Print: Sablon plastisol premium</li>
        <li>Oversize fit — trendy & nyaman</li>
        <li>Desain original by TOKO FASHION</li>
      </ul>
    `,
    productType: 'Kaos',
    tags: ['new-arrival', 'grafis', 'sale'],
    status: 'active',
    images: [
      { id: 'img-004-1', src: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80', alt: 'Kaos Grafis Tokyo Drift - depan' },
      { id: 'img-004-2', src: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80', alt: 'Kaos Grafis Tokyo Drift - detail print' },
      { id: 'img-004-3', src: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80', alt: 'Kaos Grafis Tokyo Drift - lifestyle' },
    ],
    options: [
      { id: 'opt-004-1', name: 'Ukuran', values: ['S', 'M', 'L', 'XL', 'XXL'] },
      { id: 'opt-004-2', name: 'Warna', values: ['Hitam', 'Putih'] },
    ],
    variants: generateVariants('prod-004', 'KGT-DRF', ['S', 'M', 'L', 'XL', 'XXL'], ['Hitam', 'Putih'], 149000, 199000),
    createdAt: '2026-05-05T08:00:00Z',
    updatedAt: '2026-05-23T11:45:00Z',
  },

  // 5 — Kemeja Flannel Urban
  {
    id: 'prod-005',
    title: 'Kemeja Flannel Urban',
    handle: 'kemeja-flannel-urban',
    descriptionHtml: `
      <p>Kemeja flannel dengan motif kotak-kotak klasik yang cocok buat gaya <strong>layering</strong>
      atau dipakai sendiri. Bahan flannel premium yang lembut dan hangat.</p>
      <ul>
        <li>Bahan: Flannel Cotton 170 gsm</li>
        <li>Regular fit dengan saku dada</li>
        <li>Kancing berkualitas — tidak mudah lepas</li>
        <li>Bisa dipakai casual atau semi-formal</li>
      </ul>
    `,
    productType: 'Kemeja',
    tags: ['best-seller'],
    status: 'active',
    images: [
      { id: 'img-005-1', src: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80', alt: 'Kemeja Flannel Urban - depan' },
      { id: 'img-005-2', src: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80', alt: 'Kemeja Flannel Urban - detail' },
      { id: 'img-005-3', src: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80', alt: 'Kemeja Flannel Urban - lifestyle' },
    ],
    options: [
      { id: 'opt-005-1', name: 'Ukuran', values: ['S', 'M', 'L', 'XL', 'XXL'] },
      { id: 'opt-005-2', name: 'Warna', values: ['Merah', 'Biru', 'Hijau'] },
    ],
    variants: generateVariants('prod-005', 'KFL-URB', ['S', 'M', 'L', 'XL', 'XXL'], ['Merah', 'Biru', 'Hijau'], 249000, null),
    createdAt: '2026-03-15T08:00:00Z',
    updatedAt: '2026-05-19T16:20:00Z',
  },

  // 6 — Kemeja Linen Casual
  {
    id: 'prod-006',
    title: 'Kemeja Linen Casual',
    handle: 'kemeja-linen-casual',
    descriptionHtml: `
      <p>Kemeja linen dengan nuansa <strong>relaxed coastal</strong>. Bahan linen-cotton blend yang
      adem, cocok banget buat iklim tropis Indonesia.</p>
      <ul>
        <li>Bahan: Linen-Cotton Blend (55% Linen, 45% Cotton)</li>
        <li>Relaxed fit — nyaman & tidak kaku</li>
        <li>Kerah spread untuk tampilan modern</li>
        <li>Cocok untuk hangout, ke pantai, atau ke kantor santai</li>
      </ul>
    `,
    productType: 'Kemeja',
    tags: ['new-arrival', 'sale'],
    status: 'active',
    images: [
      { id: 'img-006-1', src: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80', alt: 'Kemeja Linen Casual - depan' },
      { id: 'img-006-2', src: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80', alt: 'Kemeja Linen Casual - samping' },
      { id: 'img-006-3', src: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80', alt: 'Kemeja Linen Casual - model' },
    ],
    options: [
      { id: 'opt-006-1', name: 'Ukuran', values: ['S', 'M', 'L', 'XL'] },
      { id: 'opt-006-2', name: 'Warna', values: ['Putih', 'Khaki', 'Light Blue'] },
    ],
    variants: generateVariants('prod-006', 'KLN-CSL', ['S', 'M', 'L', 'XL'], ['Putih', 'Khaki', 'Light Blue'], 199000, 279000),
    createdAt: '2026-05-10T08:00:00Z',
    updatedAt: '2026-05-22T13:00:00Z',
  },

  // 7 — Celana Jogger Street
  {
    id: 'prod-007',
    title: 'Celana Jogger Street',
    handle: 'celana-jogger-street',
    descriptionHtml: `
      <p>Celana jogger dengan desain streetwear yang <strong>versatile</strong>. Bisa dipakai
      olahraga, jalan-jalan, atau nongkrong bareng teman.</p>
      <ul>
        <li>Bahan: French Terry 280 gsm</li>
        <li>Elastic waistband dengan tali serut</li>
        <li>Rib cuff di bagian kaki</li>
        <li>2 saku samping + 1 saku belakang zipper</li>
      </ul>
    `,
    productType: 'Celana',
    tags: ['best-seller', 'new-arrival'],
    status: 'active',
    images: [
      { id: 'img-007-1', src: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80', alt: 'Celana Jogger Street - depan' },
      { id: 'img-007-2', src: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80', alt: 'Celana Jogger Street - detail' },
      { id: 'img-007-3', src: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80', alt: 'Celana Jogger Street - model' },
    ],
    options: [
      { id: 'opt-007-1', name: 'Ukuran', values: ['S', 'M', 'L', 'XL', 'XXL'] },
      { id: 'opt-007-2', name: 'Warna', values: ['Hitam', 'Abu-abu', 'Navy'] },
    ],
    variants: generateVariants('prod-007', 'CJG-STR', ['S', 'M', 'L', 'XL', 'XXL'], ['Hitam', 'Abu-abu', 'Navy'], 219000, null),
    createdAt: '2026-04-20T08:00:00Z',
    updatedAt: '2026-05-21T09:30:00Z',
  },

  // 8 — Celana Chino Slim Fit
  {
    id: 'prod-008',
    title: 'Celana Chino Slim Fit',
    handle: 'celana-chino-slim-fit',
    descriptionHtml: `
      <p>Celana chino dengan potongan <strong>slim fit</strong> yang modern. Material stretch
      untuk kenyamanan maksimal saat beraktivitas.</p>
      <ul>
        <li>Bahan: Cotton Twill Stretch (98% Cotton, 2% Spandex)</li>
        <li>Slim fit — ramping tapi tidak ketat</li>
        <li>Kancing & resleting YKK</li>
        <li>Cocok untuk smart-casual look</li>
      </ul>
    `,
    productType: 'Celana',
    tags: ['sale'],
    status: 'active',
    images: [
      { id: 'img-008-1', src: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80', alt: 'Celana Chino Slim Fit - depan' },
      { id: 'img-008-2', src: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80', alt: 'Celana Chino Slim Fit - samping' },
      { id: 'img-008-3', src: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80', alt: 'Celana Chino Slim Fit - model' },
    ],
    options: [
      { id: 'opt-008-1', name: 'Ukuran', values: ['28', '29', '30', '31', '32', '33', '34'] },
      { id: 'opt-008-2', name: 'Warna', values: ['Khaki', 'Hitam', 'Navy'] },
    ],
    variants: generateVariants('prod-008', 'CCH-SLM', ['28', '29', '30', '31', '32', '33', '34'], ['Khaki', 'Hitam', 'Navy'], 259000, 329000),
    createdAt: '2026-03-01T08:00:00Z',
    updatedAt: '2026-05-15T17:45:00Z',
  },

  // 9 — Hoodie Oversize Classic
  {
    id: 'prod-009',
    title: 'Hoodie Oversize Classic',
    handle: 'hoodie-oversize-classic',
    descriptionHtml: `
      <p>Hoodie oversize dengan bahan <strong>fleece premium</strong> yang tebal dan hangat.
      Desain minimalis yang timeless — cocok dipakai kapan saja.</p>
      <ul>
        <li>Bahan: Cotton Fleece 320 gsm</li>
        <li>Oversize fit — trendy & super comfy</li>
        <li>Hood dengan tali serut adjustable</li>
        <li>Saku kanguru di bagian depan</li>
        <li>Rib pada manset dan hem bawah</li>
      </ul>
    `,
    productType: 'Kaos',
    tags: ['best-seller', 'new-arrival'],
    status: 'active',
    images: [
      { id: 'img-009-1', src: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80', alt: 'Hoodie Oversize Classic - depan' },
      { id: 'img-009-2', src: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=80', alt: 'Hoodie Oversize Classic - samping' },
      { id: 'img-009-3', src: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80', alt: 'Hoodie Oversize Classic - lifestyle' },
    ],
    options: [
      { id: 'opt-009-1', name: 'Ukuran', values: ['M', 'L', 'XL', 'XXL'] },
      { id: 'opt-009-2', name: 'Warna', values: ['Hitam', 'Abu-abu', 'Cream'] },
    ],
    variants: generateVariants('prod-009', 'HDO-CLS', ['M', 'L', 'XL', 'XXL'], ['Hitam', 'Abu-abu', 'Cream'], 299000, null),
    createdAt: '2026-04-10T08:00:00Z',
    updatedAt: '2026-05-20T12:00:00Z',
  },

  // 10 — Jaket Bomber Street
  {
    id: 'prod-010',
    title: 'Jaket Bomber Street',
    handle: 'jaket-bomber-street',
    descriptionHtml: `
      <p>Jaket bomber dengan desain <strong>urban streetwear</strong>. Material taslan waterproof
      yang siap menemani kamu di segala cuaca.</p>
      <ul>
        <li>Bahan luar: Taslan Waterproof</li>
        <li>Bahan dalam: Satin lining</li>
        <li>Resleting YKK dua arah</li>
        <li>2 saku samping + 1 saku dalam</li>
        <li>Rib elastis pada kerah, manset, dan hem</li>
      </ul>
    `,
    productType: 'Kaos',
    tags: ['new-arrival', 'sale'],
    status: 'active',
    images: [
      { id: 'img-010-1', src: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=80', alt: 'Jaket Bomber Street - depan' },
      { id: 'img-010-2', src: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80', alt: 'Jaket Bomber Street - samping' },
      { id: 'img-010-3', src: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80', alt: 'Jaket Bomber Street - model' },
    ],
    options: [
      { id: 'opt-010-1', name: 'Ukuran', values: ['M', 'L', 'XL', 'XXL'] },
      { id: 'opt-010-2', name: 'Warna', values: ['Hitam', 'Army Green'] },
    ],
    variants: generateVariants('prod-010', 'JKB-STR', ['M', 'L', 'XL', 'XXL'], ['Hitam', 'Army Green'], 349000, 399000),
    createdAt: '2026-05-15T08:00:00Z',
    updatedAt: '2026-05-23T15:00:00Z',
  },

  // 11 — Kaos Oversize Vintage Wash
  {
    id: 'prod-011',
    title: 'Kaos Oversize Vintage Wash',
    handle: 'kaos-oversize-vintage-wash',
    descriptionHtml: `
      <p>Kaos oversize dengan efek <strong>vintage wash</strong> yang memberikan tampilan retro
      kekinian. Setiap piece memiliki karakter wash yang unik.</p>
      <ul>
        <li>Bahan: Cotton Combed 24s — acid wash</li>
        <li>Gramasi: 220 gsm</li>
        <li>Oversize/boxy fit</li>
        <li>Efek vintage wash unik di setiap piece</li>
      </ul>
    `,
    productType: 'Kaos',
    tags: ['new-arrival', 'grafis', 'best-seller'],
    status: 'active',
    images: [
      { id: 'img-011-1', src: 'https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=800&q=80', alt: 'Kaos Oversize Vintage Wash - depan' },
      { id: 'img-011-2', src: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80', alt: 'Kaos Oversize Vintage Wash - detail' },
      { id: 'img-011-3', src: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80', alt: 'Kaos Oversize Vintage Wash - model' },
    ],
    options: [
      { id: 'opt-011-1', name: 'Ukuran', values: ['M', 'L', 'XL'] },
      { id: 'opt-011-2', name: 'Warna', values: ['Washed Black', 'Washed Grey', 'Washed Blue'] },
    ],
    variants: generateVariants('prod-011', 'KOV-WSH', ['M', 'L', 'XL'], ['Washed Black', 'Washed Grey', 'Washed Blue'], 189000, null),
    createdAt: '2026-05-12T08:00:00Z',
    updatedAt: '2026-05-24T08:00:00Z',
  },

  // 12 — Celana Cargo Tactical
  {
    id: 'prod-012',
    title: 'Celana Cargo Tactical',
    handle: 'celana-cargo-tactical',
    descriptionHtml: `
      <p>Celana cargo dengan desain <strong>tactical</strong> yang fungsional. Banyak saku
      untuk membawa barang-barang penting kamu saat beraktivitas outdoor.</p>
      <ul>
        <li>Bahan: Ripstop Cotton — kuat & tahan lama</li>
        <li>6 saku fungsional (2 samping, 2 cargo, 2 belakang)</li>
        <li>Relaxed fit dengan elastic ankle</li>
        <li>Webbing belt included</li>
      </ul>
    `,
    productType: 'Celana',
    tags: ['new-arrival', 'best-seller'],
    status: 'active',
    images: [
      { id: 'img-012-1', src: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80', alt: 'Celana Cargo Tactical - depan' },
      { id: 'img-012-2', src: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80', alt: 'Celana Cargo Tactical - detail saku' },
      { id: 'img-012-3', src: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80', alt: 'Celana Cargo Tactical - model' },
    ],
    options: [
      { id: 'opt-012-1', name: 'Ukuran', values: ['S', 'M', 'L', 'XL', 'XXL'] },
      { id: 'opt-012-2', name: 'Warna', values: ['Hitam', 'Army Green', 'Khaki'] },
    ],
    variants: generateVariants('prod-012', 'CCG-TAC', ['S', 'M', 'L', 'XL', 'XXL'], ['Hitam', 'Army Green', 'Khaki'], 289000, null),
    createdAt: '2026-05-18T08:00:00Z',
    updatedAt: '2026-05-24T10:00:00Z',
  },
];

// ---------------------------------------------------------------------------
// Helper Functions
// ---------------------------------------------------------------------------

/** Find a product by its URL-safe handle */
export function getProductByHandle(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle);
}

/** Find a product by its unique ID */
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

/** Get all products that include a specific tag */
export function getProductsByTag(tag: string): Product[] {
  return products.filter((p) => p.tags.includes(tag));
}

/** Get all products of a specific product type */
export function getProductsByType(type: string): Product[] {
  return products.filter((p) => p.productType === type);
}

/** Search products by title, tags, or product type (case-insensitive) */
export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.productType.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.descriptionHtml.toLowerCase().includes(q),
  );
}

/** Format a number as IDR currency string, e.g. 199000 → "Rp 199.000" */
export function formatPrice(price: number): string {
  return `Rp ${price.toLocaleString('id-ID')}`;
}
