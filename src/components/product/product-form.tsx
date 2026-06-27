"use client";

import { useState } from "react";
import { Product } from "@/lib/types";
import { VariantSelector } from "@/components/product/variant-selector";
import { SizeGuide } from "@/components/product/size-guide";
import { useCart } from "@/lib/context/cart-context";
import { formatPrice } from "@/lib/utils";

interface ProductFormProps {
  product: Product;
}

export function ProductForm({ product }: ProductFormProps) {
  const { addItem } = useCart();
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    // Default to the first value of each option
    const defaults: Record<string, string> = {};
    product.options.forEach((opt) => {
      if (opt.values.length > 0) {
        defaults[opt.name] = opt.values[0];
      }
    });
    return defaults;
  });

  const handleOptionChange = (name: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [name]: value }));
  };

  // Find the selected variant
  const selectedVariant = product.variants.find((variant) =>
    variant.selectedOptions.every(
      (opt) => selectedOptions[opt.name] === opt.value
    )
  ) || product.variants[0];

  const [isAdding, setIsAdding] = useState(false);
  const [isBuying, setIsBuying] = useState(false);

  const handleAddToCart = async () => {
    if (selectedVariant && selectedVariant.availableForSale) {
      setIsAdding(true);
      try {
        await addItem(selectedVariant.id, 1);
      } catch (error) {
        console.error("Failed to add to cart", error);
      } finally {
        setIsAdding(false);
      }
    }
  };

  const handleBuyNow = async () => {
    if (selectedVariant && selectedVariant.availableForSale) {
      setIsBuying(true);
      try {
        const updatedCart = await addItem(selectedVariant.id, 1);
        if (updatedCart?.checkoutUrl) {
          window.location.href = updatedCart.checkoutUrl;
        } else {
          alert("Gagal mengalihkan ke checkout. Silakan coba lagi.");
        }
      } catch (error) {
        console.error("Failed to buy now", error);
      } finally {
        setIsBuying(false);
      }
    }
  };

  // Deterministic simulated stock warning (1 to 5)
  const getSimulatedStock = (id: string) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    return (Math.abs(hash) % 5) + 1;
  };

  const isAvailable = selectedVariant?.availableForSale;

  return (
    <div className="flex flex-col">
      <h1 className="font-display text-4xl md:text-5xl uppercase tracking-wider mb-2">
        {product.title}
      </h1>
      
      <div className="flex items-center gap-3 mb-8">
        {selectedVariant?.compareAtPrice ? (
          <>
            <span className="text-brand-red font-bold text-2xl">
              {formatPrice(selectedVariant.price, selectedVariant.currencyCode)}
            </span>
            <span className="text-muted-foreground line-through text-lg">
              {formatPrice(selectedVariant.compareAtPrice, selectedVariant.currencyCode)}
            </span>
          </>
        ) : (
          <span className="font-bold text-2xl">
            {formatPrice(selectedVariant?.price || 0, selectedVariant?.currencyCode)}
          </span>
        )}
      </div>

      <div className="mb-8">
        <VariantSelector 
          options={product.options} 
          selectedOptions={selectedOptions} 
          onOptionChange={handleOptionChange} 
          availableForSale={isAvailable}
        />
      </div>

      <div className="flex justify-between items-center mb-6">
        <SizeGuide product={product} />
      </div>

      {isAvailable && (
        <p className="text-xs font-semibold text-brand-red mb-4 animate-pulse-slow">
          🔥 Stok terbatas! Tersisa {getSimulatedStock(selectedVariant.id)} item lagi di gudang.
        </p>
      )}

      {isAvailable ? (
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleAddToCart}
            disabled={isAdding || isBuying}
            className="flex-1 bg-transparent hover:bg-brand-black hover:text-white dark:hover:bg-white dark:hover:text-black border border-brand-black dark:border-white text-brand-black dark:text-white disabled:opacity-50 disabled:cursor-not-allowed h-14 font-bold uppercase tracking-widest text-sm transition-colors rounded-none cursor-pointer"
          >
            {isAdding ? "Menambahkan..." : "Tambah ke Keranjang"}
          </button>
          <button
            onClick={handleBuyNow}
            disabled={isAdding || isBuying}
            className="flex-1 bg-brand-black hover:bg-brand-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed h-14 font-bold uppercase tracking-widest text-sm transition-colors rounded-none cursor-pointer"
          >
            {isBuying ? "Memproses..." : "Beli Sekarang"}
          </button>
        </div>
      ) : (
        <button
          disabled
          className="w-full bg-gray-300 dark:bg-gray-800 text-gray-500 dark:text-gray-600 disabled:cursor-not-allowed h-14 font-bold uppercase tracking-widest text-sm transition-colors rounded-none"
        >
          Sold Out
        </button>
      )}

      <div className="mt-8 prose prose-sm dark:prose-invert text-muted-foreground" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
    </div>
  );
}

