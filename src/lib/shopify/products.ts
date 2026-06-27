import { shopifyFetch } from './client';
import { Product } from '../types';

export interface PaginatedProducts {
  products: Product[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string | null;
  };
}

const getProductQuery = `
  query getProduct($handle: String!, $country: CountryCode) @inContext(country: $country) {
    product(handle: $handle) {
      id
      title
      handle
      descriptionHtml
      productType
      tags
      images(first: 5) {
        edges {
          node {
            id
            url
            altText
          }
        }
      }
      options {
        id
        name
        values
      }
      variants(first: 50) {
        edges {
          node {
            id
            title
            sku
            availableForSale
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;

const getProductsQuery = `
  query getProducts($query: String, $first: Int = 10, $country: CountryCode) @inContext(country: $country) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          handle
          descriptionHtml
          productType
          tags
          images(first: 1) {
            edges {
              node {
                id
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                availableForSale
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

// Helper to reshape Shopify response into our internal Product type
function reshapeProduct(shopifyProduct: any): Product | undefined {
  if (!shopifyProduct) return undefined;

  return {
    id: shopifyProduct.id,
    title: shopifyProduct.title,
    handle: shopifyProduct.handle,
    descriptionHtml: shopifyProduct.descriptionHtml,
    productType: shopifyProduct.productType,
    tags: shopifyProduct.tags,
    status: 'active', // Assuming active if available via Storefront API
    images: shopifyProduct.images?.edges.map(({ node }: any) => ({
      id: node.id,
      src: node.url,
      alt: node.altText || shopifyProduct.title,
    })) || [],
    options: shopifyProduct.options?.map((opt: any) => ({
      id: opt.id,
      name: opt.name,
      values: opt.values,
    })) || [],
    variants: shopifyProduct.variants?.edges.map(({ node }: any) => ({
      id: node.id,
      productId: shopifyProduct.id,
      title: node.title,
      sku: node.sku || '',
      price: parseFloat(node.price.amount),
      compareAtPrice: node.compareAtPrice ? parseFloat(node.compareAtPrice.amount) : null,
      currencyCode: node.price.currencyCode,
      inventoryQuantity: 10, // Storefront API doesn't expose raw quantity, we rely on availableForSale
      availableForSale: node.availableForSale,
      selectedOptions: node.selectedOptions,
    })) || [],
    createdAt: new Date().toISOString(), // Optional
    updatedAt: new Date().toISOString(), // Optional
  };
}

export async function getProductByHandle(handle: string, country?: string): Promise<Product | undefined> {
  const res = await shopifyFetch<any>({
    query: getProductQuery,
    variables: { handle, country },
  });

  return reshapeProduct(res.body.data?.product);
}

export async function getProducts(query?: string, country?: string): Promise<Product[]> {
  const res = await shopifyFetch<any>({
    query: getProductsQuery,
    variables: { query, first: 12, country },
  });

  const products = res.body.data?.products?.edges.map(({ node }: any) => reshapeProduct(node));
  return products?.filter((p: Product | undefined) => p !== undefined) || [];
}

export async function getProductsByTag(tag: string, country?: string): Promise<Product[]> {
  return getProducts(`tag:${tag}`, country);
}

export async function getProductsByType(type: string, country?: string): Promise<Product[]> {
  return getProducts(`product_type:${type}`, country);
}

export async function searchProducts(query: string, country?: string): Promise<Product[]> {
  return getProducts(`title:${query}*`, country);
}

// ===================== Paginated API =====================

const getProductsPaginatedQuery = `
  query getProductsPaginated($query: String, $first: Int = 12, $after: String, $country: CountryCode) @inContext(country: $country) {
    products(first: $first, query: $query, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          handle
          descriptionHtml
          productType
          tags
          images(first: 1) {
            edges {
              node {
                id
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                availableForSale
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function getProductsPaginated(
  query?: string,
  country?: string,
  first: number = 12,
  after?: string
): Promise<PaginatedProducts> {
  const res = await shopifyFetch<any>({
    query: getProductsPaginatedQuery,
    variables: { query, first, after: after || null, country },
  });

  const data = res.body.data?.products;
  const products = data?.edges
    .map(({ node }: any) => reshapeProduct(node))
    .filter((p: Product | undefined): p is Product => p !== undefined) || [];

  return {
    products,
    pageInfo: {
      hasNextPage: data?.pageInfo?.hasNextPage ?? false,
      endCursor: data?.pageInfo?.endCursor ?? null,
    },
  };
}

export async function getProductsByTagPaginated(
  tag: string,
  country?: string,
  first?: number,
  after?: string
): Promise<PaginatedProducts> {
  return getProductsPaginated(`tag:${tag}`, country, first, after);
}

export async function getProductsByTypePaginated(
  type: string,
  country?: string,
  first?: number,
  after?: string
): Promise<PaginatedProducts> {
  return getProductsPaginated(`product_type:${type}`, country, first, after);
}
