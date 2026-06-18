import { notFound } from "next/navigation";
import { getProductByHandle, getProductsByType } from "@/lib/shopify/products";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductForm } from "@/components/product/product-form";
import { ProductTabs } from "@/components/product/product-tabs";
import { ProductCard } from "@/components/shared/product-card";
import { SectionHeader } from "@/components/shared/section-header";

export default async function ProductPage(props: { params: Promise<{ handle: string }> }) {
  const params = await props.params;
  const product = await getProductByHandle(params.handle);

  if (!product) {
    notFound();
  }

  // Get related products (same type, excluding current)
  const allRelated = await getProductsByType(product.productType);
  const relatedProducts = allRelated
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Breadcrumb could go here */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mb-20">
        {/* Left: Image Gallery */}
        <div className="md:sticky md:top-24 h-max">
          <ProductGallery images={product.images} />
        </div>

        {/* Right: Product Info & Form */}
        <div className="flex flex-col">
          <ProductForm product={product} />
          
          <div className="mt-12 pt-12 border-t border-border">
            <ProductTabs descriptionHtml={product.descriptionHtml} />
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 md:py-20 border-t border-border">
          <SectionHeader 
            title="Anda Mungkin Suka" 
            className="mb-10 text-center items-center justify-center"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
