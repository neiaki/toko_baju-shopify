export const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "";
export const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || "";

interface ShopifyFetchParams {
  query: string;
  variables?: object;
  cache?: RequestCache;
  tags?: string[];
}

interface ShopifyFetchResponse<T> {
  status: number;
  body: {
    data?: T;
    errors?: Array<{ message: string }>;
  };
}

export async function shopifyFetch<T>({
  query,
  variables,
  cache = "no-store", // changed from force-cache to see live updates
  tags,
}: ShopifyFetchParams): Promise<ShopifyFetchResponse<T>> {
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    throw new Error(
      "Missing Shopify environment variables. Please check your .env.local file."
    );
  }

  const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`;

  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables }),
      }),
      cache,
      ...(tags && { next: { tags } }),
    });

    const body = await result.json();

    if (body.errors) {
      const err = body.errors[0];
      throw new Error(err.message || 'Unknown Shopify API error');
    }

    return {
      status: result.status,
      body,
    };
  } catch (error: any) {
    console.error("Error connecting to Shopify API:", error.message || error);
    throw error;
  }
}
