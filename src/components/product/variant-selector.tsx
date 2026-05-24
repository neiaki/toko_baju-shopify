"use client";

import { cn } from "@/lib/utils";

interface VariantSelectorProps {
  options: { id: string; name: string; values: string[] }[];
  selectedOptions: Record<string, string>;
  onOptionChange: (name: string, value: string) => void;
  availableForSale?: boolean;
}

const COLOR_MAP: Record<string, string> = {
  Hitam: "#0A0A0A",
  Putih: "#FAFAFA",
  "Abu-abu": "#9CA3AF",
  Navy: "#1E3A5F",
  Olive: "#6B7B3A",
  Merah: "#E53E3E",
  Biru: "#3B82F6",
  Cream: "#F5F0E8",
  Coklat: "#8B6914",
  Hijau: "#22C55E",
  Kuning: "#ECC94B",
  Maroon: "#7F1D1D",
};

export function VariantSelector({
  options,
  selectedOptions,
  onOptionChange,
}: VariantSelectorProps) {
  return (
    <div className="space-y-6">
      {options.map((option) => (
        <div key={option.id}>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium uppercase tracking-wider">
              {option.name}
            </label>
            {selectedOptions[option.name] && (
              <span className="text-sm text-muted-foreground">
                {selectedOptions[option.name]}
              </span>
            )}
          </div>

          {option.name === "Warna" ? (
            /* Color Swatches */
            <div className="flex flex-wrap gap-2">
              {option.values.map((value) => {
                const color = COLOR_MAP[value] || "#CBD5E1";
                const isSelected = selectedOptions[option.name] === value;
                const isLight =
                  value === "Putih" || value === "Cream" || value === "Kuning";

                return (
                  <button
                    key={value}
                    onClick={() => onOptionChange(option.name, value)}
                    className={cn(
                      "relative w-10 h-10 rounded-full transition-all duration-200",
                      isSelected
                        ? "ring-2 ring-offset-2 ring-brand-black dark:ring-white"
                        : "hover:ring-2 hover:ring-offset-1 hover:ring-gray-300"
                    )}
                    style={{ backgroundColor: color }}
                    title={value}
                    aria-label={`Warna ${value}`}
                  >
                    {isSelected && (
                      <span
                        className={cn(
                          "absolute inset-0 flex items-center justify-center text-xs font-bold",
                          isLight ? "text-brand-black" : "text-white"
                        )}
                      >
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            /* Size Buttons */
            <div className="flex flex-wrap gap-2">
              {option.values.map((value) => {
                const isSelected = selectedOptions[option.name] === value;

                return (
                  <button
                    key={value}
                    onClick={() => onOptionChange(option.name, value)}
                    className={cn(
                      "min-w-[48px] h-12 px-4 border text-sm font-medium uppercase tracking-wider transition-all duration-200",
                      isSelected
                        ? "bg-brand-black text-white border-brand-black dark:bg-white dark:text-brand-black dark:border-white"
                        : "bg-transparent border-gray-300 hover:border-brand-black dark:hover:border-white"
                    )}
                    aria-label={`Ukuran ${value}`}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
