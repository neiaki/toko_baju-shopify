import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { getCollectionByHandle, getProductsForCollectionPaginated } from "@/lib/shopify/collections";
import { ProductCard } from "@/components/shared/product-card";
import { FilterSidebar } from "@/components/collection/filter-sidebar";
import { SortSelect } from "@/components/collection/sort-select";
import { LoadMoreButton } from "@/components/collection/load-more-button";

import { cookies } from "next/headers";
import { Metadata } from "next";

export async function generateMetadata(props: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const params = await props.params;
  const cookieStore = await cookies();
  const country = cookieStore.get("x-country")?.value || "ID";
  
  if (params.handle === "all") {
    return {
      title: "Semua Koleksi | NEki Store",
      description: "Lihat semua koleksi pakaian streetwear urban terbaik dari NEki Store.",
    };
  }

  const collection = await getCollectionByHandle(params.handle, country);
  if (!collection) return {};

  const cleanDescription = collection.description?.replace(/<[^>]*>?/gm, '').substring(0, 160) || "Koleksi streetwear premium dari NEki Store.";

  return {
    title: `${collection.title} | NEki Store`,
    description: cleanDescription,
    openGraph: {
      title: collection.title,
      description: cleanDescription,
    }
  };
}

export default async function CollectionPage(props: { 
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ 
    minPrice?: string; 
    maxPrice?: string; 
    category?: string; 
    size?: string; 
    color?: string; 
    sort?: string;
  }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const cookieStore = await cookies();
  const country = cookieStore.get("x-country")?.value || "ID";

  const collection = await getCollectionByHandle(params.handle, country);
  
  if (!collection && params.handle !== "all") {
    notFound();
  }

  const title = collection ? collection.title : "Semua Koleksi";
  const description = collection ? collection.description : "Lihat semua koleksi pakaian streetwear urban terbaik dari NEki Store.";
  
  const { products: initialProducts, pageInfo } = await getProductsForCollectionPaginated(params.handle, country, 12);

  // Apply filters
  const minPrice = searchParams.minPrice ? Number(searchParams.minPrice) : 0;
  const maxPrice = searchParams.maxPrice ? Number(searchParams.maxPrice) : Infinity;
  const activeCategories = searchParams.category ? searchParams.category.split(",") : [];
  const activeSizes = searchParams.size ? searchParams.size.split(",").map(s => s.toUpperCase()) : [];
  const activeColors = searchParams.color ? searchParams.color.split(",").map(c => c.toLowerCase()) : [];

  const displayProducts = initialProducts.filter((product) => {
    // 1. Price Filter (check if any variant is within price range)
    const matchesPrice = product.variants.some((v) => v.price >= minPrice && v.price <= maxPrice);

    // 2. Category Filter
    const matchesCategory = !activeCategories.length || activeCategories.some(
      (cat) => product.productType?.toLowerCase() === cat.toLowerCase()
    );

    // 3. Size Filter
    const matchesSize = !activeSizes.length || product.variants.some((v) => 
      v.selectedOptions.some(
        (opt) => 
          (opt.name.toLowerCase() === "size" || opt.name.toLowerCase() === "ukuran") && 
          activeSizes.includes(opt.value.toUpperCase())
      )
    );

    // 4. Color Filter
    const matchesColor = !activeColors.length || product.variants.some((v) => 
      v.selectedOptions.some(
        (opt) => 
          (opt.name.toLowerCase() === "color" || opt.name.toLowerCase() === "warna") && 
          activeColors.includes(opt.value.toLowerCase())
      )
    );

    return matchesPrice && matchesCategory && matchesSize && matchesColor;
  });

  // Apply sorting (in-place)
  const sort = searchParams.sort || "featured";
  if (sort === "newest") {
    displayProducts.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  } else if (sort === "price-asc") {
    displayProducts.sort((a, b) => (a.variants[0]?.price || 0) - (b.variants[0]?.price || 0));
  } else if (sort === "price-desc") {
    displayProducts.sort((a, b) => (b.variants[0]?.price || 0) - (a.variants[0]?.price || 0));
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <div className="mb-10 md:mb-16">
        <Breadcrumb items={[
          { label: 'Koleksi', href: '/collections/all' },
          { label: title },
        ]} />
        <h1 className="font-display text-4xl md:text-6xl uppercase tracking-wider mb-4">
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground max-w-2xl text-lg">
            {description}
          </p>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        {/* Sidebar Filter */}
        <FilterSidebar 
          categories={["Kaos", "Kemeja", "Celana", "Aksesoris"]}
          sizes={["S", "M", "L", "XL", "XXL"]}
          colors={["Hitam", "Putih", "Navy", "Olive", "Abu-abu"]}
        />

        {/* Product Grid */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b">
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
              {displayProducts.length} Produk
            </p>
            <div className="hidden md:block">
              <SortSelect />
            </div>
          </div>

          {/* Grid */}
          {displayProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                {displayProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Load More */}
              <LoadMoreButton
                handle={params.handle}
                initialCursor={pageInfo.endCursor}
                hasMore={pageInfo.hasNextPage}
              />
            </>
          ) : (
            <div className="py-20 text-center">
              <h3 className="text-xl font-medium mb-2">Tidak ada produk</h3>
              <p className="text-muted-foreground">Coba ubah filter Anda untuk menemukan apa yang Anda cari.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
