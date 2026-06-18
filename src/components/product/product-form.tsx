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
              {formatPrice(selectedVariant.price)}
            </span>
            <span className="text-muted-foreground line-through text-lg">
              {formatPrice(selectedVariant.compareAtPrice)}
            </span>
          </>
        ) : (
          <span className="font-bold text-2xl">
            {formatPrice(selectedVariant?.price || 0)}
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
        <SizeGuide />
      </div>

      <button
        onClick={handleAddToCart}
        disabled={!isAvailable || isAdding}
        className="w-full bg-brand-black hover:bg-brand-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed h-14 font-bold uppercase tracking-widest text-sm transition-colors"
      >
        {isAdding ? "Menambahkan..." : isAvailable ? "Tambah ke Keranjang" : "Sold Out"}
      </button>

      <div className="mt-8 prose prose-sm dark:prose-invert text-muted-foreground" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
    </div>
  );
}
