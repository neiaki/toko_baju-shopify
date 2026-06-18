<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class MigrateShopifyProducts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:migrate-shopify-products';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $domain = env('NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN', 'toko-baju-ala-ala.myshopify.com');
        $token = env('NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN', 'b94608bc520f9b6178dbf5dd01237f19');
        $url = "https://{$domain}/api/2024-01/graphql.json";
        
        $query = '
        {
          products(first: 50) {
            edges {
              node {
                id title handle descriptionHtml productType tags
                variants(first: 1) {
                  edges { node { sku price { amount } } }
                }
              }
            }
          }
        }';

        $response = \Illuminate\Support\Facades\Http::withHeaders([
            'X-Shopify-Storefront-Access-Token' => $token,
            'Content-Type' => 'application/json'
        ])->post($url, ['query' => $query]);

        $data = $response->json();
        
        if (!isset($data['data']['products']['edges'])) {
            $this->error('Failed to fetch products or no products found.');
            return;
        }

        $products = $data['data']['products']['edges'];
        $productRepository = app(\Webkul\Product\Repositories\ProductRepository::class);

        foreach ($products as $edge) {
            $node = $edge['node'];
            $sku = $node['variants']['edges'][0]['node']['sku'] ?? 'SKU-' . uniqid();
            $price = $node['variants']['edges'][0]['node']['price']['amount'] ?? 0;
            $title = $node['title'];
            $handle = $node['handle'];

            $this->info("Migrating: {$title}");

            // Create base product
            $product = $productRepository->create([
                'type' => 'simple',
                'attribute_family_id' => 1,
                'sku' => $sku
            ]);

            // Update attributes
            $updateData = [
                'channel' => 'default',
                'locale' => 'en',
                'sku' => $sku,
                'name' => $title,
                'url_key' => $handle,
                'short_description' => strip_tags($node['descriptionHtml']),
                'description' => $node['descriptionHtml'],
                'price' => $price,
                'weight' => 1,
                'status' => 1,
                'visible_individually' => 1,
                'channels' => [1],
                'inventories' => [1 => 10], // Source id 1 is usually default
                'categories' => [1],
            ];

            try {
                $productRepository->update($updateData, $product->id);
                $this->info("Success: {$title}");
            } catch (\Exception $e) {
                $this->error("Failed to update attributes for {$title}: " . $e->getMessage());
            }
        }
        
        $this->info('Migration completed.');
    }
}
