import { notFound } from "next/navigation";
import { getCollectionByHandle, getProductsForCollection } from "@/lib/data/collections";
import { ProductCard } from "@/components/shared/product-card";
import { FilterSidebar } from "@/components/collection/filter-sidebar";
import { SortSelect } from "@/components/collection/sort-select";

export default async function CollectionPage(props: { params: Promise<{ handle: string }> }) {
  const params = await props.params;
  const collection = getCollectionByHandle(params.handle);
  
  if (!collection && params.handle !== "all") {
    notFound();
  }

  const title = collection ? collection.title : "Semua Koleksi";
  const description = collection ? collection.description : "Lihat semua koleksi pakaian streetwear urban terbaik dari Toko Fashion.";
  const products = collection ? getProductsForCollection(params.handle) : getProductsForCollection("all"); // Mock 'all' by getting all or default. In mock data, all collections combined or just import products.
  
  // Since we don't have a real DB, just fetch products using a mock
  // If handle is 'all', we should show all products, but for this demo let's use a workaround or assume getProductsForCollection handles it
  const displayProducts = params.handle === "all" ? (await import("@/lib/data/products")).products : products;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <div className="mb-10 md:mb-16">
        {/* Breadcrumb could go here */}
        <h1 className="font-display text-4xl md:text-6xl uppercase tracking-wider mb-4">
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground max-w-2xl text-lg">
            {description}
          </p>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        {/* Sidebar Filter */}
        <FilterSidebar 
          categories={["Kaos", "Kemeja", "Celana", "Aksesoris"]}
          sizes={["S", "M", "L", "XL", "XXL"]}
          colors={["Hitam", "Putih", "Navy", "Olive", "Abu-abu"]}
        />

        {/* Product Grid */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b">
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
              {displayProducts.length} Produk
            </p>
            <div className="hidden md:block">
              <SortSelect />
            </div>
          </div>

          {/* Grid */}
          {displayProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {displayProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <h3 className="text-xl font-medium mb-2">Tidak ada produk</h3>
              <p className="text-muted-foreground">Coba ubah filter Anda untuk menemukan apa yang Anda cari.</p>
            </div>
          )}

          {/* Pagination Mock */}
          {displayProducts.length > 12 && (
            <div className="mt-16 flex justify-center">
              <button className="border-2 border-brand-black dark:border-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-brand-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                Muat Lebih Banyak
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
