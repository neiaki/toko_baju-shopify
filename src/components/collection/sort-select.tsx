"use client";

export function SortSelect() {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground hidden sm:inline-block">
        Urutkan
      </span>
      <div className="relative">
        <select 
          className="appearance-none bg-transparent border border-border py-2 pl-4 pr-10 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
          defaultValue="featured"
        >
          <option value="featured">Rekomendasi</option>
          <option value="newest">Terbaru</option>
          <option value="price-asc">Harga: Rendah ke Tinggi</option>
          <option value="price-desc">Harga: Tinggi ke Rendah</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
