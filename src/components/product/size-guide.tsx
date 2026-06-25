"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Ruler } from "lucide-react";
import { Product } from "@/lib/types";

interface SizeGuideProps {
  product: Product;
}

export function SizeGuide({ product }: SizeGuideProps) {
  const type = product.productType?.toLowerCase() || "";
  const title = product.title?.toLowerCase() || "";
  
  const isPants = type.includes("celana") || title.includes("jeans") || title.includes("denim");

  // Uniqlo pants measurements (approximate body size mapping)
  const pantsSizes = [
    { size: "28", waist: "71", hip: "90", thigh: "29", weight: "50-55" },
    { size: "29", waist: "73.5", hip: "92.5", thigh: "29.5", weight: "55-60" },
    { size: "30", waist: "76", hip: "95", thigh: "30", weight: "60-65" },
    { size: "31", waist: "78.5", hip: "97.5", thigh: "30.5", weight: "65-70" },
    { size: "32", waist: "81.5", hip: "100", thigh: "31", weight: "70-75" },
    { size: "33", waist: "84", hip: "102.5", thigh: "31.5", weight: "75-80" },
    { size: "34", waist: "86.5", hip: "105", thigh: "32", weight: "80-85" },
    { size: "36", waist: "91.5", hip: "110", thigh: "33", weight: "85-95" },
  ];

  // Uniqlo standard tops/shirts measurements
  const defaultSizes = [
    { size: "XS", chest: "86-90", waist: "68-72", hip: "86-90", weight: "45-55" },
    { size: "S", chest: "90-94", waist: "72-76", hip: "90-94", weight: "55-62" },
    { size: "M", chest: "94-98", waist: "76-80", hip: "94-98", weight: "62-70" },
    { size: "L", chest: "98-102", waist: "80-84", hip: "98-102", weight: "70-78" },
    { size: "XL", chest: "102-106", waist: "84-88", hip: "102-106", weight: "78-85" },
    { size: "XXL", chest: "106-112", waist: "88-94", hip: "106-112", weight: "85-95" },
  ];

  const currentSizes = isPants ? pantsSizes : defaultSizes;

  return (
    <Dialog>
      <DialogTrigger render={<button className="text-sm font-medium underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2" />}>
        <Ruler className="w-4 h-4" />
        Panduan Ukuran
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl uppercase tracking-wider">
            Panduan Ukuran
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <p className="text-sm text-muted-foreground mb-4">
            Semua ukuran dalam sentimeter (cm). Ukur badan Anda dan cocokkan
            dengan tabel di bawah. (Berdasarkan panduan standar Uniqlo)
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left py-3 px-2 font-semibold uppercase tracking-wider text-xs">
                    {isPants ? "Size (Inchi)" : "Ukuran"}
                  </th>
                  <th className="text-center py-3 px-2 font-semibold uppercase tracking-wider text-xs">
                    {isPants ? "L. Pinggang" : "Dada"}
                  </th>
                  <th className="text-center py-3 px-2 font-semibold uppercase tracking-wider text-xs">
                    {isPants ? "L. Pinggul" : "Pinggang"}
                  </th>
                  <th className="text-center py-3 px-2 font-semibold uppercase tracking-wider text-xs">
                    {isPants ? "L. Paha" : "Pinggul"}
                  </th>
                  <th className="text-center py-3 px-2 font-semibold uppercase tracking-wider text-xs">
                    Berat (kg)
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentSizes.map((row) => (
                  <tr
                    key={row.size}
                    className="border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50/50 dark:hover:bg-gray-900/50 transition-colors"
                  >
                    <td className="py-3 px-2 font-bold">{row.size}</td>
                    <td className="py-3 px-2 text-center text-muted-foreground">
                      {isPants ? (row as any).waist : (row as any).chest}
                    </td>
                    <td className="py-3 px-2 text-center text-muted-foreground">
                      {row.waist}
                    </td>
                    <td className="py-3 px-2 text-center text-muted-foreground">
                      {isPants ? (row as any).thigh : (row as any).hip}
                    </td>
                    <td className="py-3 px-2 text-center text-muted-foreground">
                      {row.weight}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900/50 text-sm text-muted-foreground space-y-2 border border-border/50">
            <p className="font-medium text-foreground">Tips Memilih Ukuran:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Untuk fit yang lebih longgar, pilih 1 ukuran lebih besar</li>
              {isPants ? (
                <li>Jika ukuran pinggang Anda berada di antara dua ukuran, pilih ukuran yang lebih besar untuk kenyamanan ekstra</li>
              ) : (
                <li>Untuk kaos oversize, pilih 2 ukuran lebih besar</li>
              )}
              <li>Ukur badan tanpa pakaian untuk hasil terbaik</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
