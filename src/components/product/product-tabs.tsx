"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from "@/lib/types";

interface ProductTabsProps {
  product: Product;
}

function getMaterialDetails(product: Product) {
  const type = product.productType?.toLowerCase() || "";
  const title = product.title?.toLowerCase() || "";
  
  if (type.includes("celana") || title.includes("jeans") || title.includes("denim")) {
    return {
      komposisi: "Premium Stretch Denim (98% Cotton, 2% Spandex)",
      berat: "12-14 Oz Denim (Tebal, kokoh & stretch)",
      jahit: "Chainstitch hem & reinforced stress points di area saku",
      fitting: "Slim Fit / Tapered Fit yang modern dan sangat nyaman",
    };
  }
  
  if (type.includes("kemeja") || title.includes("flanel") || title.includes("shirt") || title.includes("jaket")) {
    return {
      komposisi: "Premium Cotton Flannel / Corduroy",
      berat: "Medium weight fabric (Lembut, hangat & tidak gatal)",
      jahit: "Single needle tailoring dengan clean seams di bagian dalam",
      fitting: "Regular Fit / Casual Fit cocok untuk layering luar",
    };
  }
  
  // Default (Kaos/T-shirt/Aksesoris)
  return {
    komposisi: "100% Premium Cotton Combed 30s",
    berat: "180-220 GSM (Sejuk, menyerap keringat & tebal sedang)",
    jahit: "Double needle stitch pada kerah, ujung lengan & bawah",
    fitting: "Oversized Fit / Regular Fit sesuai standar lokal",
  };
}

export function ProductTabs({ product }: ProductTabsProps) {
  const specs = getMaterialDetails(product);

  return (
    <Tabs defaultValue="description" className="w-full flex flex-col">
      <TabsList variant="line" className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 gap-0">
        <TabsTrigger
          value="description"
          className="rounded-none border-b-2 border-transparent data-active:border-brand-black dark:data-active:border-white data-active:bg-transparent data-active:shadow-none px-6 py-3 font-medium uppercase tracking-wider text-xs"
        >
          Deskripsi
        </TabsTrigger>
        <TabsTrigger
          value="material"
          className="rounded-none border-b-2 border-transparent data-active:border-brand-black dark:data-active:border-white data-active:bg-transparent data-active:shadow-none px-6 py-3 font-medium uppercase tracking-wider text-xs"
        >
          Detail Material
        </TabsTrigger>
        <TabsTrigger
          value="care"
          className="rounded-none border-b-2 border-transparent data-active:border-brand-black dark:data-active:border-white data-active:bg-transparent data-active:shadow-none px-6 py-3 font-medium uppercase tracking-wider text-xs"
        >
          Panduan Perawatan
        </TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="mt-6">
        <div
          className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed"
          dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
        />
      </TabsContent>

      <TabsContent value="material" className="mt-6">
        <div className="space-y-4 text-sm text-muted-foreground">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border border-border/50">
              <h4 className="font-semibold text-foreground mb-2 uppercase tracking-wider text-xs">
                Komposisi
              </h4>
              <p>{specs.komposisi}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border border-border/50">
              <h4 className="font-semibold text-foreground mb-2 uppercase tracking-wider text-xs">
                Berat Kain
              </h4>
              <p>{specs.berat}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border border-border/50">
              <h4 className="font-semibold text-foreground mb-2 uppercase tracking-wider text-xs">
                Teknik Jahit
              </h4>
              <p>{specs.jahit}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border border-border/50">
              <h4 className="font-semibold text-foreground mb-2 uppercase tracking-wider text-xs">
                Fitting
              </h4>
              <p>{specs.fitting}</p>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="care" className="mt-6">
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 border border-border/50">
            <span className="text-lg">🧺</span>
            <div>
              <p className="font-medium text-foreground">Cuci</p>
              <p>Cuci dengan mesin pada suhu maksimal 30°C. Gunakan detergen lembut.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 border border-border/50">
            <span className="text-lg">🔄</span>
            <div>
              <p className="font-medium text-foreground">Balik Saat Mencuci</p>
              <p>Balik pakaian sebelum dicuci untuk menjaga keawetan print/sablon atau warna benang.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 border border-border/50">
            <span className="text-lg">☀️</span>
            <div>
              <p className="font-medium text-foreground">Pengeringan</p>
              <p>Jemur di tempat teduh, hindari paparan sinar matahari langsung agar warna tidak pudar.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 border border-border/50">
            <span className="text-lg">🔥</span>
            <div>
              <p className="font-medium text-foreground">Setrika</p>
              <p>Setrika pada suhu rendah-sedang. Hindari menyetrika langsung pada sablon/print.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 border border-border/50">
            <span className="text-lg">🚫</span>
            <div>
              <p className="font-medium text-foreground">Hindari</p>
              <p>Jangan gunakan pemutih pakaian keras. Jangan dry clean.</p>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
