import { searchProducts } from "@/lib/shopify/products";
import { ProductCard } from "@/components/shared/product-card";
import { SortSelect } from "@/components/collection/sort-select";

import { cookies } from "next/headers";

export default async function SearchPage(props: { 
  searchParams: Promise<{ q: string; sort?: string; category?: string }> 
}) {
  const searchParams = await props.searchParams;
  const cookieStore = await cookies();
  const country = cookieStore.get("x-country")?.value || "ID";
  const query = searchParams.q || "";
  
  const rawResults = query ? await searchProducts(query, country) : [];

  // Extract unique categories from search results for dynamic filter tags
  const availableCategories = Array.from(new Set(rawResults.map(p => p.productType).filter(Boolean)));

  // Apply category filtering
  const activeCategory = searchParams.category || "";
  const results = activeCategory 
    ? rawResults.filter(p => p.productType?.toLowerCase() === activeCategory.toLowerCase())
    : rawResults;

  // Apply sorting (in-place)
  const sort = searchParams.sort || "featured";
  if (sort === "newest") {
    results.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  } else if (sort === "price-asc") {
    results.sort((a, b) => (a.variants[0]?.price || 0) - (b.variants[0]?.price || 0));
  } else if (sort === "price-desc") {
    results.sort((a, b) => (b.variants[0]?.price || 0) - (a.variants[0]?.price || 0));
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 min-h-[60vh]">
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl md:text-5xl uppercase tracking-wider mb-4">
          Hasil Pencarian
        </h1>
        {query ? (
          <p className="text-muted-foreground text-lg">
            {results.length} hasil untuk <span className="font-semibold text-foreground">&ldquo;{query}&rdquo;</span>
          </p>
        ) : (
          <p className="text-muted-foreground text-lg">
            Masukkan kata kunci pencarian
          </p>
        )}
      </div>

      {/* Dynamic Category Filters */}
      {query && availableCategories.length > 1 && (
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          <a 
            href={`/search?q=${encodeURIComponent(query)}${sort !== "featured" ? `&sort=${sort}` : ""}`}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider border rounded-none transition-colors ${
              !activeCategory 
                ? 'bg-brand-black text-white dark:bg-white dark:text-black border-brand-black dark:border-white' 
                : 'border-border text-muted-foreground hover:border-foreground/50'
            }`}
          >
            Semua
          </a>
          {availableCategories.map(cat => (
            <a 
              key={cat}
              href={`/search?q=${encodeURIComponent(query)}&category=${encodeURIComponent(cat)}${sort !== "featured" ? `&sort=${sort}` : ""}`}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider border rounded-none transition-colors ${
                activeCategory?.toLowerCase() === cat.toLowerCase()
                  ? 'bg-brand-black text-white dark:bg-white dark:text-black border-brand-black dark:border-white' 
                  : 'border-border text-muted-foreground hover:border-foreground/50'
              }`}
            >
              {cat}
            </a>
          ))}
        </div>
      )}

      {results.length > 0 ? (
        <div className="space-y-6">
          <div className="flex justify-end items-center pb-4 border-b border-border">
            <SortSelect />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ) : (
        query && (
          <div className="text-center py-20 bg-secondary/30 border border-border">
            <h3 className="text-xl font-medium mb-2">Tidak ada produk ditemukan</h3>
            <p className="text-muted-foreground mb-6">
              Kami tidak dapat menemukan apa pun yang cocok dengan pencarian Anda. Coba kata kunci yang berbeda.
            </p>
            <div className="flex justify-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">Pencarian populer:</span>
              {["Kaos Hitam", "Kemeja Flannel", "Celana Cargo", "Oversize"].map(term => (
                <a key={term} href={`/search?q=${term}`} className="text-sm font-medium hover:underline">
                  {term}
                </a>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
}

