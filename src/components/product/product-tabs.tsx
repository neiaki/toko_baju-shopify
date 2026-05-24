"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductTabsProps {
  descriptionHtml: string;
}

export function ProductTabs({ descriptionHtml }: ProductTabsProps) {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 gap-0">
        <TabsTrigger
          value="description"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand-black dark:data-[state=active]:border-white data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 font-medium uppercase tracking-wider text-xs"
        >
          Deskripsi
        </TabsTrigger>
        <TabsTrigger
          value="material"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand-black dark:data-[state=active]:border-white data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 font-medium uppercase tracking-wider text-xs"
        >
          Detail Material
        </TabsTrigger>
        <TabsTrigger
          value="care"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand-black dark:data-[state=active]:border-white data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 font-medium uppercase tracking-wider text-xs"
        >
          Panduan Perawatan
        </TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="mt-6">
        <div
          className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed"
          dangerouslySetInnerHTML={{ __html: descriptionHtml }}
        />
      </TabsContent>

      <TabsContent value="material" className="mt-6">
        <div className="space-y-4 text-sm text-muted-foreground">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-900">
              <h4 className="font-semibold text-foreground mb-2 uppercase tracking-wider text-xs">
                Komposisi
              </h4>
              <p>100% Premium Cotton Combed 30s</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-900">
              <h4 className="font-semibold text-foreground mb-2 uppercase tracking-wider text-xs">
                Berat Kain
              </h4>
              <p>220 GSM (Gramasi tinggi, tebal & nyaman)</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-900">
              <h4 className="font-semibold text-foreground mb-2 uppercase tracking-wider text-xs">
                Teknik Jahit
              </h4>
              <p>Double stitch pada bagian kerah dan lengan</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-900">
              <h4 className="font-semibold text-foreground mb-2 uppercase tracking-wider text-xs">
                Label
              </h4>
              <p>Woven label premium dengan heat transfer tag</p>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="care" className="mt-6">
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900">
            <span className="text-lg">🧺</span>
            <div>
              <p className="font-medium text-foreground">Cuci</p>
              <p>Cuci dengan mesin pada suhu maksimal 30°C. Gunakan detergen lembut.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900">
            <span className="text-lg">🔄</span>
            <div>
              <p className="font-medium text-foreground">Balik Saat Mencuci</p>
              <p>Balik pakaian sebelum dicuci untuk menjaga print/sablon.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900">
            <span className="text-lg">☀️</span>
            <div>
              <p className="font-medium text-foreground">Pengeringan</p>
              <p>Jemur di tempat teduh, hindari sinar matahari langsung.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900">
            <span className="text-lg">🔥</span>
            <div>
              <p className="font-medium text-foreground">Setrika</p>
              <p>Setrika pada suhu rendah-sedang. Hindari menyetrika langsung pada sablon.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900">
            <span className="text-lg">🚫</span>
            <div>
              <p className="font-medium text-foreground">Hindari</p>
              <p>Jangan gunakan pemutih. Jangan dry clean.</p>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
