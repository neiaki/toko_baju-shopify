"use client";

import { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/lib/context/cart-context";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface FilterSidebarProps {
  categories: string[];
  sizes: string[];
  colors: string[];
}

function FilterContent({ categories, sizes, colors }: FilterSidebarProps) {
  const { currency } = useCart();
  const maxAllowedPrice = currency === "IDR" ? 1000000 : 100;
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Get initial values from URL
  const minPriceParam = searchParams.get("minPrice");
  const maxPriceParam = searchParams.get("maxPrice");
  const activeCategories = searchParams.get("category")?.split(",") || [];
  const activeSizes = searchParams.get("size")?.split(",") || [];
  const activeColors = searchParams.get("color")?.split(",") || [];

  const [minPrice, setMinPrice] = useState(minPriceParam ? Number(minPriceParam) : 0);
  const [maxPrice, setMaxPrice] = useState(maxPriceParam ? Number(maxPriceParam) : maxAllowedPrice);

  const [prevMinParam, setPrevMinParam] = useState(minPriceParam);
  if (minPriceParam !== prevMinParam) {
    setPrevMinParam(minPriceParam);
    setMinPrice(minPriceParam ? Number(minPriceParam) : 0);
  }

  const [prevMaxParam, setPrevMaxParam] = useState(maxPriceParam);
  if (maxPriceParam !== prevMaxParam) {
    setPrevMaxParam(maxPriceParam);
    setMaxPrice(maxPriceParam ? Number(maxPriceParam) : maxAllowedPrice);
  }

  const updateUrl = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, val]) => {
      if (val === null || val === "") {
        params.delete(key);
      } else {
        params.set(key, val);
      }
    });
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Debounce the price URL update to prevent spamming server transitions while sliding/typing
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentMin = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : 0;
      const currentMax = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : maxAllowedPrice;
      
      if (minPrice !== currentMin || maxPrice !== currentMax) {
        updateUrl({
          minPrice: minPrice > 0 ? String(minPrice) : null,
          maxPrice: maxPrice < maxAllowedPrice ? String(maxPrice) : null,
        });
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [minPrice, maxPrice, maxAllowedPrice]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (!isNaN(val)) setMinPrice(val);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (!isNaN(val)) setMaxPrice(val);
  };

  const toggleCategory = (cat: string) => {
    const next = activeCategories.includes(cat)
      ? activeCategories.filter(c => c !== cat)
      : [...activeCategories, cat];
    updateUrl({ category: next.length ? next.join(",") : null });
  };

  const toggleSize = (size: string) => {
    const next = activeSizes.includes(size)
      ? activeSizes.filter(s => s !== size)
      : [...activeSizes, size];
    updateUrl({ size: next.length ? next.join(",") : null });
  };

  const toggleColor = (color: string) => {
    const next = activeColors.includes(color)
      ? activeColors.filter(c => c !== color)
      : [...activeColors, color];
    updateUrl({ color: next.length ? next.join(",") : null });
  };

  return (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Kategori</h3>
        <div className="space-y-2">
          {categories.map((category) => {
            const isChecked = activeCategories.includes(category);
            return (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className="flex items-center gap-3 text-left w-full cursor-pointer group"
              >
                <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                  isChecked 
                    ? "border-brand-black bg-brand-black text-white dark:border-white dark:bg-white dark:text-black" 
                    : "border-gray-300 dark:border-gray-700 group-hover:border-brand-black dark:group-hover:border-white"
                }`}>
                  {isChecked && <div className="w-1.5 h-1.5 bg-white dark:bg-black rounded-full" />}
                </div>
                <span className={`text-sm transition-colors ${
                  isChecked ? "text-foreground font-medium" : "text-muted-foreground group-hover:text-foreground"
                }`}>
                  {category}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Ukuran</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => {
            const isActive = activeSizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`min-w-[40px] h-10 border text-sm flex items-center justify-center transition-colors ${
                  isActive
                    ? "border-brand-black bg-brand-black text-white dark:border-white dark:bg-white dark:text-black font-bold"
                    : "border-gray-300 dark:border-gray-700 hover:border-brand-black dark:hover:border-white text-muted-foreground"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Warna</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => {
            const isActive = activeColors.includes(color);
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
                onClick={() => toggleColor(color)}
                className={`w-8 h-8 rounded-full border transition-all ${
                  isActive
                    ? "ring-2 ring-offset-2 ring-brand-black dark:ring-white scale-110"
                    : "border-gray-300 dark:border-gray-700 hover:scale-105"
                }`}
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
          <input 
            type="range" 
            min="0" 
            max={maxAllowedPrice} 
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-brand-black dark:accent-white" 
          />
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <label className="text-xs text-muted-foreground mb-1 block">Min</label>
              <div className="relative">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                  {currency === "IDR" ? "Rp" : "$"}
                </span>
                <input 
                  type="number" 
                  value={minPrice}
                  onChange={handleMinChange}
                  className="w-full border border-gray-300 dark:border-gray-700 bg-transparent py-1.5 pl-7 pr-2 text-sm focus:outline-none focus:border-brand-black dark:focus:border-white transition-colors" 
                />
              </div>
            </div>
            <span className="text-muted-foreground self-end pb-2">-</span>
            <div className="flex-1">
              <label className="text-xs text-muted-foreground mb-1 block">Max</label>
              <div className="relative">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                  {currency === "IDR" ? "Rp" : "$"}
                </span>
                <input 
                  type="number" 
                  value={maxPrice}
                  onChange={handleMaxChange}
                  className="w-full border border-gray-300 dark:border-gray-700 bg-transparent py-1.5 pl-7 pr-2 text-sm focus:outline-none focus:border-brand-black dark:focus:border-white transition-colors" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FilterSidebar({ categories, sizes, colors }: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const resetAll = () => {
    router.push(pathname, { scroll: false });
  };

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
            <button 
              onClick={resetAll}
              className="text-xs text-muted-foreground underline hover:text-foreground"
            >
              Reset
            </button>
          </div>
          <FilterContent categories={categories} sizes={sizes} colors={colors} />
        </div>
      </div>
    </>
  );
}
