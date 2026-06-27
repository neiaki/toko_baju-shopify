"use server";

import { cookies } from "next/headers";
import { getProductsForCollectionPaginated } from "@/lib/shopify/collections";
import type { PaginatedProducts } from "@/lib/shopify/products";

export async function loadMoreProducts(
  handle: string,
  cursor: string
): Promise<PaginatedProducts> {
  const cookieStore = await cookies();
  const country = cookieStore.get("x-country")?.value || "ID";

  return getProductsForCollectionPaginated(handle, country, 12, cursor);
}
