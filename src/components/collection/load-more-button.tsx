"use client";

import { useState, useTransition } from "react";
import { ProductCard } from "@/components/shared/product-card";
import { loadMoreProducts } from "@/app/collections/[handle]/actions";
import type { Product } from "@/lib/types";

interface LoadMoreButtonProps {
  handle: string;
  initialCursor: string | null;
  hasMore: boolean;
}

export function LoadMoreButton({
  handle,
  initialCursor,
  hasMore,
}: LoadMoreButtonProps) {
  const [additionalProducts, setAdditionalProducts] = useState<Product[]>([]);
  const [cursor, setCursor] = useState<string | null>(initialCursor);
  const [hasNextPage, setHasNextPage] = useState(hasMore);
  const [isPending, startTransition] = useTransition();

  if (!hasNextPage && additionalProducts.length === 0) {
    return null;
  }

  const handleLoadMore = () => {
    if (!cursor) return;

    startTransition(async () => {
      const result = await loadMoreProducts(handle, cursor);
      setAdditionalProducts((prev) => [...prev, ...result.products]);
      setCursor(result.pageInfo.endCursor);
      setHasNextPage(result.pageInfo.hasNextPage);
    });
  };

  return (
    <>
      {/* Render additional products in the same grid style */}
      {additionalProducts.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mt-4 md:mt-6 lg:mt-8">
          {additionalProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Load More button */}
      {hasNextPage && (
        <div className="mt-16 flex justify-center">
          <button
            onClick={handleLoadMore}
            disabled={isPending}
            className="border-2 border-brand-black dark:border-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-brand-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <span className="inline-flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Memuat...
              </span>
            ) : (
              "Muat Lebih Banyak"
            )}
          </button>
        </div>
      )}
    </>
  );
}
