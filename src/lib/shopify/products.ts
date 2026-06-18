import { shopifyFetch } from './client';
import { Product } from '../types';

const getProductQuery = `
  query getProduct($handle: String!) {
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
  query getProducts($query: String, $first: Int = 10) {
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
      inventoryQuantity: 10, // Storefront API doesn't expose raw quantity, we rely on availableForSale
      availableForSale: node.availableForSale,
      selectedOptions: node.selectedOptions,
    })) || [],
    createdAt: new Date().toISOString(), // Optional
    updatedAt: new Date().toISOString(), // Optional
  };
}

export async function getProductByHandle(handle: string): Promise<Product | undefined> {
  const res = await shopifyFetch<any>({
    query: getProductQuery,
    variables: { handle },
  });

  return reshapeProduct(res.body.data?.product);
}

export async function getProducts(query?: string): Promise<Product[]> {
  const res = await shopifyFetch<any>({
    query: getProductsQuery,
    variables: { query, first: 12 },
  });

  const products = res.body.data?.products?.edges.map(({ node }: any) => reshapeProduct(node));
  return products?.filter((p: Product | undefined) => p !== undefined) || [];
}

export async function getProductsByTag(tag: string): Promise<Product[]> {
  return getProducts(`tag:${tag}`);
}

export async function getProductsByType(type: string): Promise<Product[]> {
  return getProducts(`product_type:${type}`);
}

export async function searchProducts(query: string): Promise<Product[]> {
  return getProducts(`title:${query}*`);
}
