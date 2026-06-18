<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Webkul\Product\Repositories\ProductRepository;
use Webkul\Category\Repositories\CategoryRepository;
use Webkul\Product\Models\ProductImage;

class SeedFullCatalog extends Command
{
    protected $signature = 'app:seed-full-catalog';
    protected $description = 'Seed full product catalog from Shopify CSV data with IDR prices';

    public function handle()
    {
        $productRepository = app(ProductRepository::class);

        // Clear existing products first
        $this->info('Cleaning existing products...');
        ProductImage::query()->delete();
        \Webkul\Product\Models\Product::query()->forceDelete();

        // Category mapping: type => category_id
        // 1=Root, 2=Kaos, 3=Kemeja, 4=Celana, 5=Hoodie & Sweater, 6=Aksesoris
        $categoryMap = [
            'Kaos'      => 2,
            'Kemeja'    => 3,
            'Celana'    => 4,
            'Hoodie'    => 5,
            'Aksesoris' => 6,
        ];

        // =====================================================
        // FULL PRODUCT CATALOG (14 SKU dari Shopify)
        // =====================================================
        $products = [
            // ===== KAOS =====
            [
                'sku'               => 'KPH-001',
                'name'              => 'Kaos Polos Hitam',
                'url_key'           => 'kaos-polos-hitam',
                'short_description' => 'Kaos katun premium yang nyaman dipakai sehari-hari.',
                'description'       => '<p>Kaos katun premium yang nyaman dipakai sehari-hari. Bahan 100% katun combed 30s dengan jahitan rantai yang rapi. Cocok untuk daily wear atau layering.</p>',
                'price'             => 120000,
                'compare_price'     => null,
                'weight'            => 0.2,
                'category'          => 'Kaos',
                'tags'              => 'new-arrival',
                'image'             => 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
            ],
            [
                'sku'               => 'KPP-002',
                'name'              => 'Kaos Polos Putih',
                'url_key'           => 'kaos-polos-putih',
                'short_description' => 'Kaos basic putih bersih bahan katun bambu.',
                'description'       => '<p>Kaos basic putih bersih bahan katun bambu. Material lembut, anti-bakteri, dan ramah lingkungan. Potongan regular fit yang pas untuk semua tipe tubuh.</p>',
                'price'             => 110000,
                'compare_price'     => 150000,
                'weight'            => 0.2,
                'category'          => 'Kaos',
                'tags'              => 'sale',
                'image'             => 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
            ],
            [
                'sku'               => 'KGU-003',
                'name'              => 'Kaos Grafis Urban',
                'url_key'           => 'kaos-grafis-urban',
                'short_description' => 'Kaos streetwear dengan sablon plastisol tahan lama.',
                'description'       => '<p>Kaos streetwear dengan sablon plastisol tahan lama. Desain original kolaborasi seniman lokal. Bahan katun combed 24s yang tebal dan tidak mudah melar.</p>',
                'price'             => 145000,
                'compare_price'     => null,
                'weight'            => 0.25,
                'category'          => 'Kaos',
                'tags'              => 'new-arrival',
                'image'             => 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80',
            ],
            [
                'sku'               => 'KLP-004',
                'name'              => 'Kaos Lengan Panjang',
                'url_key'           => 'kaos-lengan-panjang',
                'short_description' => 'Cocok untuk udara dingin atau gaya kasual.',
                'description'       => '<p>Kaos lengan panjang cocok untuk udara dingin atau gaya kasual. Bahan katun combed 30s yang lembut di kulit. Potongan relaxed fit dengan ribbed cuff.</p>',
                'price'             => 160000,
                'compare_price'     => null,
                'weight'            => 0.25,
                'category'          => 'Kaos',
                'tags'              => '',
                'image'             => 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80',
            ],

            // ===== KEMEJA =====
            [
                'sku'               => 'KFK-005',
                'name'              => 'Kemeja Flanel Kasual',
                'url_key'           => 'kemeja-flanel-kasual',
                'short_description' => 'Kemeja flanel kasual yang cocok untuk gaya urban.',
                'description'       => '<p>Kemeja flanel kasual yang cocok untuk gaya urban. Bahan flanel katun tebal yang hangat, cocok untuk musim hujan atau kegiatan outdoor.</p>',
                'price'             => 250000,
                'compare_price'     => null,
                'weight'            => 0.3,
                'category'          => 'Kemeja',
                'tags'              => 'new-arrival',
                'image'             => 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
            ],
            [
                'sku'               => 'KOP-006',
                'name'              => 'Kemeja Oxford Putih',
                'url_key'           => 'kemeja-oxford-putih',
                'short_description' => 'Kemeja formal casual bahan oxford tebal.',
                'description'       => '<p>Kemeja formal casual bahan oxford tebal. Bisa dipakai untuk kerja maupun jalan-jalan. Kerah kancing down klasik dengan jahitan rapi.</p>',
                'price'             => 220000,
                'compare_price'     => 299000,
                'weight'            => 0.3,
                'category'          => 'Kemeja',
                'tags'              => 'sale',
                'image'             => 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80',
            ],
            [
                'sku'               => 'KPM-007',
                'name'              => 'Kemeja Pantai Motif',
                'url_key'           => 'kemeja-pantai-motif',
                'short_description' => 'Kemeja rayon adem dengan motif liburan musim panas.',
                'description'       => '<p>Kemeja rayon adem dengan motif liburan musim panas. Material tipis dan adem, cocok untuk iklim tropis Indonesia. Desain loose fit yang trendy.</p>',
                'price'             => 199000,
                'compare_price'     => 250000,
                'weight'            => 0.2,
                'category'          => 'Kemeja',
                'tags'              => 'sale',
                'image'             => 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80',
            ],

            // ===== CELANA =====
            [
                'sku'               => 'CJS-008',
                'name'              => 'Celana Jeans Slim Fit',
                'url_key'           => 'celana-jeans-slim',
                'short_description' => 'Jeans denim stretch yang pas dan sangat nyaman.',
                'description'       => '<p>Jeans denim stretch yang pas dan sangat nyaman. Bahan denim 12oz dengan 2% spandex untuk kenyamanan gerak. Warna indigo classic yang timeless.</p>',
                'price'             => 350000,
                'compare_price'     => 450000,
                'weight'            => 0.5,
                'category'          => 'Celana',
                'tags'              => 'sale',
                'image'             => 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80',
            ],
            [
                'sku'               => 'CCA-009',
                'name'              => 'Celana Cargo Army',
                'url_key'           => 'celana-cargo-army',
                'short_description' => 'Celana cargo taktis banyak saku dengan material ripstop.',
                'description'       => '<p>Celana cargo taktis banyak saku dengan material ripstop. 6 saku fungsional, bahan anti-sobek yang tahan lama. Cocok untuk outdoor dan daily wear.</p>',
                'price'             => 380000,
                'compare_price'     => null,
                'weight'            => 0.5,
                'category'          => 'Celana',
                'tags'              => 'new-arrival',
                'image'             => 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80',
            ],
            [
                'sku'               => 'CCC-010',
                'name'              => 'Celana Chino Cream',
                'url_key'           => 'celana-chino-cream',
                'short_description' => 'Celana chino potongan lurus yang rapi.',
                'description'       => '<p>Celana chino potongan lurus yang rapi. Bahan twill cotton yang tidak mudah kusut. Warna cream netral yang bisa dipadu-padankan dengan berbagai atasan.</p>',
                'price'             => 280000,
                'compare_price'     => null,
                'weight'            => 0.4,
                'category'          => 'Celana',
                'tags'              => '',
                'image'             => 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80',
            ],
            [
                'sku'               => 'CJG-011',
                'name'              => 'Celana Jogger',
                'url_key'           => 'celana-jogger-sweatpants',
                'short_description' => 'Sweatpants untuk olahraga atau bersantai di rumah.',
                'description'       => '<p>Sweatpants untuk olahraga atau bersantai di rumah. Bahan french terry yang lembut dan breathable. Elastic waistband dengan tali serut untuk kenyamanan.</p>',
                'price'             => 180000,
                'compare_price'     => 250000,
                'weight'            => 0.3,
                'category'          => 'Celana',
                'tags'              => 'sale',
                'image'             => 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80',
            ],

            // ===== HOODIE / AKSESORIS =====
            [
                'sku'               => 'HOA-012',
                'name'              => 'Hoodie Oversize Abu',
                'url_key'           => 'hoodie-oversize-abu',
                'short_description' => 'Hoodie tebal hangat dengan potongan oversize.',
                'description'       => '<p>Hoodie tebal hangat dengan potongan oversize. Bahan fleece 320gsm dengan inner brushed. Dilengkapi kangaroo pocket dan drawstring hood.</p>',
                'price'             => 299000,
                'compare_price'     => 399000,
                'weight'            => 0.5,
                'category'          => 'Hoodie',
                'tags'              => 'sale',
                'image'             => 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
            ],
            [
                'sku'               => 'JDH-013',
                'name'              => 'Jaket Denim Hitam',
                'url_key'           => 'jaket-denim-hitam',
                'short_description' => 'Jaket denim berkelas potongan pas badan.',
                'description'       => '<p>Jaket denim berkelas potongan pas badan. Bahan denim 14oz yang kokoh dan makin bagus seiring pemakaian. Desain trucker jacket klasik.</p>',
                'price'             => 450000,
                'compare_price'     => null,
                'weight'            => 0.7,
                'category'          => 'Hoodie',
                'tags'              => 'new-arrival',
                'image'             => 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=80',
            ],
            [
                'sku'               => 'TBC-014',
                'name'              => 'Topi Baseball Classic',
                'url_key'           => 'topi-baseball-classic',
                'short_description' => 'Topi kasual kanvas untuk gaya jalanan.',
                'description'       => '<p>Topi kasual kanvas untuk gaya jalanan. Bahan canvas cotton tebal dengan bordir logo premium. Adjustable strap untuk kenyamanan.</p>',
                'price'             => 85000,
                'compare_price'     => null,
                'weight'            => 0.1,
                'category'          => 'Aksesoris',
                'tags'              => '',
                'image'             => 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80',
            ],
            [
                'sku'               => 'TSC-015',
                'name'              => 'Tas Selempang Canvas',
                'url_key'           => 'tas-selempang-canvas',
                'short_description' => 'Tas bahu ringan multifungsi.',
                'description'       => '<p>Tas bahu ringan multifungsi. Bahan canvas waterproof dengan resleting YKK. Kompartemen utama + 2 saku kecil untuk HP dan dompet.</p>',
                'price'             => 150000,
                'compare_price'     => null,
                'weight'            => 0.3,
                'category'          => 'Aksesoris',
                'tags'              => 'new-arrival',
                'image'             => 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80',
            ],
        ];

        $bar = $this->output->createProgressBar(count($products));
        $bar->start();

        foreach ($products as $pData) {
            try {
                $catId = $categoryMap[$pData['category']] ?? 1;

                // Determine if product is new or featured
                $isNew = str_contains($pData['tags'], 'new-arrival') ? 1 : 0;
                $isFeatured = str_contains($pData['tags'], 'sale') ? 1 : 0;

                // Create base product
                $product = $productRepository->create([
                    'type'                => 'simple',
                    'attribute_family_id' => 1,
                    'sku'                 => $pData['sku'],
                ]);

                // Build update data
                $updateData = [
                    'channel'              => 'default',
                    'locale'               => 'en',
                    'sku'                  => $pData['sku'],
                    'name'                 => $pData['name'],
                    'url_key'              => $pData['url_key'],
                    'short_description'    => $pData['short_description'],
                    'description'          => $pData['description'],
                    'price'                => $pData['price'],
                    'weight'               => $pData['weight'],
                    'status'               => 1,
                    'visible_individually' => 1,
                    'new'                  => $isNew,
                    'featured'             => $isFeatured,
                    'channels'             => [1],
                    'categories'           => [1, $catId],
                    'inventories'          => [1 => 50],
                ];

                // Set compare at price if exists
                if ($pData['compare_price']) {
                    $updateData['compare_at_price'] = $pData['compare_price'];
                    // Bagisto uses special_price for discounted items
                    $updateData['special_price'] = $pData['price'];
                    $updateData['price'] = $pData['compare_price'];
                }

                $product = $productRepository->update($updateData, $product->id);

                // Download and save image if exists
                if (! empty($pData['image'])) {
                    try {
                        $this->info("Downloading image for {$pData['name']}...");
                        $response = Http::get($pData['image']);
                        if ($response->successful()) {
                            $ext = 'jpg';
                            if (str_contains($pData['image'], 'webp')) {
                                $ext = 'webp';
                            }
                            $filename = Str::random(40) . '.' . $ext;
                            $path = 'product/' . $product->id . '/' . $filename;

                            Storage::disk('public')->put($path, $response->body());

                            ProductImage::create([
                                'product_id' => $product->id,
                                'path'       => $path,
                                'type'       => 'images',
                                'position'   => 1,
                            ]);
                            $this->info("✓ Image saved: " . $path);
                        } else {
                            $this->error("✗ Failed to download image (HTTP " . $response->status() . ")");
                        }
                    } catch (\Exception $imageEx) {
                        $this->error("✗ Error downloading image: " . $imageEx->getMessage());
                    }
                }

                $this->newLine();
                $this->info("✓ {$pData['name']} - Rp " . number_format($pData['price'], 0, ',', '.'));
            } catch (\Exception $e) {
                $this->newLine();
                $this->error("✗ {$pData['name']}: " . $e->getMessage());
            }

            $bar->advance();
        }

        $bar->finish();
        $this->newLine(2);
        $this->info("=== Katalog berhasil diisi: " . count($products) . " produk ===");
    }
}
