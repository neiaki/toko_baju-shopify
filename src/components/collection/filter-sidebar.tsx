"use client";

import { useState } from "react";
import { Filter, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/lib/context/cart-context";

interface FilterSidebarProps {
  categories: string[];
  sizes: string[];
  colors: string[];
}

function FilterContent({ categories, sizes, colors }: FilterSidebarProps) {
  const { currency } = useCart();
  return (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Kategori</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-3 cursor-pointer group">
              <div className="w-4 h-4 border border-gray-300 dark:border-gray-700 flex items-center justify-center group-hover:border-brand-black dark:group-hover:border-white transition-colors">
                <div className="w-2 h-2 bg-transparent"></div>
              </div>
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Ukuran</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              className="min-w-[40px] h-10 border border-gray-300 dark:border-gray-700 text-sm flex items-center justify-center hover:border-brand-black dark:hover:border-white transition-colors"
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Warna</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => {
            const bgColors: Record<string, string> = {
              Hitam: "#000",
              Putih: "#fff",
              Navy: "#1e3a8a",
              Olive: "#4d7c0f",
              Merah: "#b91c1c",
              "Abu-abu": "#9ca3af",
            };
            return (
              <button
                key={color}
                className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700 hover:ring-2 ring-offset-1 ring-brand-black dark:ring-white transition-all"
                style={{ backgroundColor: bgColors[color] || "#ccc" }}
                title={color}
              />
            );
          })}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Harga</h3>
        <div className="space-y-4">
          <input type="range" min="0" max={currency === "IDR" ? 1000000 : 100} className="w-full accent-brand-black dark:accent-white" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{currency === "IDR" ? "Rp 0" : "$0"}</span>
            <span>{currency === "IDR" ? "Rp 1.000.000+" : "$100+"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FilterSidebar({ categories, sizes, colors }: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Filter */}
      <div className="md:hidden w-full mb-6">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger render={<button className="w-full flex items-center justify-center gap-2 border py-3 font-semibold uppercase tracking-wider text-sm hover:bg-secondary transition-colors" />}>
            <Filter className="w-4 h-4" />
            Filter & Sort
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-sm">
            <SheetHeader className="text-left border-b pb-4 mb-6">
              <SheetTitle className="font-display tracking-wider text-2xl">Filter</SheetTitle>
            </SheetHeader>
            <div className="overflow-y-auto h-[calc(100vh-120px)] pb-10">
              <FilterContent categories={categories} sizes={sizes} colors={colors} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t">
              <button 
                onClick={() => setIsOpen(false)}
                className="w-full bg-brand-black text-white dark:bg-white dark:text-black py-3 font-bold uppercase tracking-wider text-sm"
              >
                Terapkan Filter
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filter */}
      <div className="hidden md:block w-[250px] flex-shrink-0">
        <div className="sticky top-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl tracking-wider">Filter</h2>
            <button className="text-xs text-muted-foreground underline hover:text-foreground">Reset</button>
          </div>
          <FilterContent categories={categories} sizes={sizes} colors={colors} />
        </div>
      </div>
    </>
  );
}
