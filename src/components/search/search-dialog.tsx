"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search as SearchIcon, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { searchProducts } from "@/lib/data/products";
import { ProductCard } from "@/components/shared/product-card";

export function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const results = query.length > 1 ? searchProducts(query).slice(0, 4) : [];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={<button className="p-2 hover:opacity-70 transition-opacity" aria-label="Cari" />}>
        <SearchIcon className="w-5 h-5 md:w-6 md:h-6" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden rounded-none border-none shadow-2xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Cari Produk</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSearch} className="relative flex items-center p-4 border-b">
          <SearchIcon className="w-5 h-5 text-muted-foreground mr-3" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari kaos, kemeja, celana..."
            className="flex-1 border-0 shadow-none focus-visible:ring-0 text-lg rounded-none bg-transparent"
            autoFocus
          />
          <kbd className="hidden sm:inline-flex h-6 items-center gap-1 rounded border bg-muted px-2 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </form>

        <div className="max-h-[60vh] overflow-y-auto">
          {query.length > 1 ? (
            results.length > 0 ? (
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Produk ({results.length})
                  </h3>
                  <button 
                    onClick={handleSearch}
                    className="text-xs font-semibold uppercase tracking-widest hover:underline"
                  >
                    Lihat Semua
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {results.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-muted-foreground">
                Tidak ada hasil untuk &quot;{query}&quot;
              </div>
            )
          ) : (
            <div className="p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Pencarian Populer
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Kaos Hitam", "Kemeja Flannel", "Celana Cargo", "Oversize"].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setQuery(term);
                    }}
                    className="px-3 py-1.5 bg-secondary text-sm hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors rounded-sm"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
