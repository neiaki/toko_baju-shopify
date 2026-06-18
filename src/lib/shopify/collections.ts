import { shopifyFetch } from './client';
import { Collection, Product } from '../types';
import { getProducts } from './products';

const getCollectionQuery = `
  query getCollection($handle: String!) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      image {
        url
      }
      products(first: 50) {
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
  }
`;

function reshapeCollection(shopifyCollection: any): Collection | undefined {
  if (!shopifyCollection) return undefined;
  
  return {
    id: shopifyCollection.id,
    title: shopifyCollection.title,
    handle: shopifyCollection.handle,
    description: shopifyCollection.description,
    image: shopifyCollection.image?.url || '',
    productIds: shopifyCollection.products?.edges.map(({ node }: any) => node.id) || [],
  };
}

export async function getCollectionByHandle(handle: string): Promise<Collection | undefined> {
  const virtualCollections: Record<string, Collection> = {
    'all': { id: 'all', title: 'Semua Koleksi', handle: 'all', description: 'Semua produk terbaik kami.', image: '', productIds: [] },
    'kaos': { id: 'kaos', title: 'Kaos', handle: 'kaos', description: 'Koleksi Kaos', image: '', productIds: [] },
    'kemeja': { id: 'kemeja', title: 'Kemeja', handle: 'kemeja', description: 'Koleksi Kemeja', image: '', productIds: [] },
    'celana': { id: 'celana', title: 'Celana', handle: 'celana', description: 'Koleksi Celana', image: '', productIds: [] },
    'aksesoris': { id: 'aksesoris', title: 'Aksesoris', handle: 'aksesoris', description: 'Aksesoris Tambahan', image: '', productIds: [] },
    'sale': { id: 'sale', title: 'Sale', handle: 'sale', description: 'Produk Diskon', image: '', productIds: [] },
    'new-arrivals': { id: 'new-arrivals', title: 'New Arrivals', handle: 'new-arrivals', description: 'Koleksi Terbaru', image: '', productIds: [] },
  };

  if (virtualCollections[handle]) {
    return virtualCollections[handle];
  }

  const res = await shopifyFetch<any>({
    query: getCollectionQuery,
    variables: { handle },
  });

  return reshapeCollection(res.body.data?.collection);
}

export async function getProductsForCollection(handle: string): Promise<Product[]> {
  const { getProductsByType, getProductsByTag, getProducts } = await import('./products');
  
  if (handle === 'all') return getProducts();
  if (handle === 'kaos') return getProductsByType('Kaos');
  if (handle === 'kemeja') return getProductsByType('Kemeja');
  if (handle === 'celana') return getProductsByType('Celana');
  if (handle === 'aksesoris') return getProductsByType('Aksesoris');
  if (handle === 'sale') return getProductsByTag('sale');
  if (handle === 'new-arrivals') return getProductsByTag('new-arrival');
  
  const res = await shopifyFetch<any>({
    query: getCollectionQuery,
    variables: { handle },
  });

  const shopifyCollection = res.body.data?.collection;
  if (!shopifyCollection) return [];

  // Re-use the reshape logic from products (import dynamically or recreate minimally)
  // For simplicity, we assume we fetch products with enough details.
  // In a real app, you'd export reshapeProduct from products.ts and use it here.
  const { getProductByHandle } = await import('./products');
  
  // To get full product objects, we can either expand the collection query, 
  // or fetch them. For now, since the query above doesn't fetch all variants,
  // it might be simpler to just query products by collection handle in Shopify:
  // query: `collection:${handle}` but Storefront API doesn't support query by collection handle directly in products query sometimes.
  
  // We will return a simplified reshape here:
  return shopifyCollection.products.edges.map(({ node }: any) => ({
    id: node.id,
    title: node.title,
    handle: node.handle,
    descriptionHtml: node.descriptionHtml,
    productType: node.productType,
    tags: node.tags,
    status: 'active',
    images: node.images?.edges.map((img: any) => ({
      id: img.node.id,
      src: img.node.url,
      alt: img.node.altText || node.title,
    })) || [],
    options: [],
    variants: node.variants?.edges.map((v: any) => ({
      id: v.node.id,
      productId: node.id,
      title: 'Default',
      sku: '',
      price: parseFloat(v.node.price.amount),
      compareAtPrice: v.node.compareAtPrice ? parseFloat(v.node.compareAtPrice.amount) : null,
      inventoryQuantity: 10,
      availableForSale: v.node.availableForSale,
      selectedOptions: [],
    })) || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}
