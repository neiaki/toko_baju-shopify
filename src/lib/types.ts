// =============================================================================
// TOKO FASHION — Type Definitions
// Follows Shopify data schema for products, collections, and cart
// =============================================================================

export interface ProductImage {
  id: string;
  src: string;
  alt: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  title: string;
  sku: string;
  price: number;
  compareAtPrice: number | null;
  inventoryQuantity: number;
  availableForSale: boolean;
  selectedOptions: { name: string; value: string }[];
}

export interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  descriptionHtml: string;
  productType: string;
  tags: string[];
  status: 'active' | 'draft' | 'archived';
  images: ProductImage[];
  options: ProductOption[];
  variants: ProductVariant[];
  createdAt: string;
  updatedAt: string;
}

export interface Collection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: string;
  productIds: string[];
}

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  title: string;
  variantTitle: string;
  price: number;
  compareAtPrice: number | null;
  quantity: number;
  image: string;
  handle: string;
}

export interface Cart {
  items: CartItem[];
  totalQuantity: number;
  subtotal: number;
  discountCode: string | null;
  discountAmount: number;
  cartId?: string;
  checkoutUrl?: string;
}
