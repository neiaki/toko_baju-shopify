"use client";

import { useSearchParams } from "next/navigation";
import { searchProducts } from "@/lib/data/products";
import { ProductCard } from "@/components/shared/product-card";
import { Suspense } from "react";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const results = query ? searchProducts(query) : [];

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 min-h-[60vh]">
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl md:text-5xl uppercase tracking-wider mb-4">
          Hasil Pencarian
        </h1>
        {query ? (
          <p className="text-muted-foreground text-lg">
            {results.length} hasil untuk <span className="font-semibold text-foreground">"{query}"</span>
          </p>
        ) : (
          <p className="text-muted-foreground text-lg">
            Masukkan kata kunci pencarian
          </p>
        )}
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
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

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-20 text-center">Memuat...</div>}>
      <SearchResults />
    </Suspense>
  );
}
