import { shopifyFetch } from './client';
import { Collection, Product } from '../types';
import { getProducts } from './products';

const getCollectionQuery = `
  query getCollection($handle: String!, $country: CountryCode) @inContext(country: $country) {
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

export async function getCollectionByHandle(handle: string, country?: string): Promise<Collection | undefined> {
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
    variables: { handle, country },
  });

  return reshapeCollection(res.body.data?.collection);
}

export async function getProductsForCollection(handle: string, country?: string): Promise<Product[]> {
  const { getProductsByType, getProductsByTag, getProducts } = await import('./products');
  
  if (handle === 'all') return getProducts(undefined, country);
  if (handle === 'kaos') return getProductsByType('Kaos', country);
  if (handle === 'kemeja') return getProductsByType('Kemeja', country);
  if (handle === 'celana') return getProductsByType('Celana', country);
  if (handle === 'aksesoris') return getProductsByType('Aksesoris', country);
  if (handle === 'sale') return getProductsByTag('sale', country);
  if (handle === 'new-arrivals') return getProductsByTag('new-arrival', country);
  
  const res = await shopifyFetch<any>({
    query: getCollectionQuery,
    variables: { handle, country },
  });

  const shopifyCollection = res.body.data?.collection;
  if (!shopifyCollection) return [];

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
      currencyCode: v.node.price.currencyCode,
      inventoryQuantity: 10,
      availableForSale: v.node.availableForSale,
      selectedOptions: [],
    })) || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}
