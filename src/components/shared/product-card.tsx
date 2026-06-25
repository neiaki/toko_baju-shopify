"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const isSale = product.tags.includes("sale");
  const isNew = product.tags.includes("new-arrival");
  const isSoldOut = product.variants.length > 0 && !product.variants[0].availableForSale;

  const currentPrice = product.variants[0]?.price || 0;
  const compareAtPrice = product.variants[0]?.compareAtPrice;

  return (
    <div className={cn("group flex flex-col", className)}>
      <Link href={`/products/${product.handle}`} className="relative block aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-gray-900 border border-border">
        {/* Badges */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1.5">
          {isSoldOut && (
            <span className="bg-gray-500 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
              Sold Out
            </span>
          )}
          {!isSoldOut && isNew && (
            <span className="bg-brand-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
              New
            </span>
          )}
          {!isSoldOut && isSale && (
            <span className="bg-brand-red text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
              Sale
            </span>
          )}
        </div>

        {/* Images */}
        <div className="relative w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
          {product.images[0]?.src ? (
            <>
              <Image
                src={product.images[0].src}
                alt={product.images[0].alt || product.title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className={cn(
                  "object-cover transition-opacity duration-500",
                  product.images.length > 1 ? "group-hover:opacity-0" : ""
                )}
              />
              {product.images.length > 1 && product.images[1]?.src && (
                <Image
                  src={product.images[1].src}
                  alt={product.images[1].alt || product.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:scale-105 transform"
                />
              )}
            </>
          ) : (
            <span className="text-muted-foreground text-xs uppercase tracking-widest font-medium">No Image</span>
          )}
        </div>

        {/* Quick Add Overlay */}
        {!isSoldOut && (
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <button className="w-full bg-brand-black/90 hover:bg-brand-black text-white dark:bg-white/90 dark:hover:bg-white dark:text-brand-black py-3 text-xs font-bold uppercase tracking-wider backdrop-blur-sm transition-colors">
              Quick Add
            </button>
          </div>
        )}
      </Link>

      <div className="mt-4 flex flex-col flex-1">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">
          {product.productType}
        </p>
        <Link href={`/products/${product.handle}`} className="hover:underline underline-offset-4">
          <h3 className="font-medium text-sm text-foreground line-clamp-1">{product.title}</h3>
        </Link>
        <div className="mt-1 flex items-center gap-2">
          {isSale && compareAtPrice ? (
            <>
              <span className="text-brand-red font-semibold text-sm">
                {formatPrice(currentPrice, product.variants[0]?.currencyCode)}
              </span>
              <span className="text-muted-foreground line-through text-xs">
                {formatPrice(compareAtPrice, product.variants[0]?.currencyCode)}
              </span>
            </>
          ) : (
            <span className="font-semibold text-sm text-foreground">
              {formatPrice(currentPrice, product.variants[0]?.currencyCode)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
