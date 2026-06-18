'use client';

// =============================================================================
// TOKO FASHION — Shopify Cart Context
// =============================================================================

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { Cart, CartItem } from '@/lib/types';
import {
  createCart,
  getCart,
  addToCart,
  removeFromCart,
  updateCart,
} from '@/lib/shopify/cart';

const STORAGE_KEY = 'toko-fashion-cart-id';

// ---------------------------------------------------------------------------
// Helper to reshape Shopify Cart into our internal Cart type
// ---------------------------------------------------------------------------
function reshapeCart(shopifyCart: any): Cart {
  if (!shopifyCart) {
    return {
      items: [],
      totalQuantity: 0,
      subtotal: 0,
      discountCode: null,
      discountAmount: 0,
    };
  }

  const items = shopifyCart.lines?.edges.map(({ node }: any): CartItem => {
    return {
      id: node.id,
      productId: node.merchandise.product.id,
      variantId: node.merchandise.id,
      title: node.merchandise.product.title,
      variantTitle: node.merchandise.title !== 'Default Title' ? node.merchandise.title : '',
      price: parseFloat(node.merchandise.price.amount),
      compareAtPrice: null, // Shopify Cart API doesn't return compareAtPrice natively in cart lines
      quantity: node.quantity,
      image: node.merchandise.image?.url || '',
      handle: node.merchandise.product.handle,
    };
  }) || [];

  return {
    cartId: shopifyCart.id,
    checkoutUrl: shopifyCart.checkoutUrl,
    items,
    totalQuantity: shopifyCart.totalQuantity,
    subtotal: parseFloat(shopifyCart.cost.subtotalAmount.amount),
    discountCode: null,
    discountAmount: 0, // In full Shopify, discount logic involves cart discount codes
  };
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface CartContextValue {
  cart: Cart;
  addItem: (variantId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  applyDiscount: (code: string) => boolean;
  total: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>({
    items: [],
    totalQuantity: 0,
    subtotal: 0,
    discountCode: null,
    discountAmount: 0,
  });

  // Load existing cart from localStorage on mount
  useEffect(() => {
    const initializeCart = async () => {
      const cartId = localStorage.getItem(STORAGE_KEY);
      if (cartId) {
        try {
          const shopifyCart = await getCart(cartId);
          if (shopifyCart) {
            setCart(reshapeCart(shopifyCart));
          } else {
            localStorage.removeItem(STORAGE_KEY);
          }
        } catch (e) {
          console.error('Failed to fetch cart:', e);
        }
      }
    };
    initializeCart();
  }, []);

  const addItem = useCallback(
    async (variantId: string, quantity: number) => {
      let currentCartId = cart.cartId;
      let shopifyCart;

      if (!currentCartId) {
        shopifyCart = await createCart();
        currentCartId = shopifyCart.id;
        localStorage.setItem(STORAGE_KEY, currentCartId!);
        // Add lines to the newly created cart
        shopifyCart = await addToCart(currentCartId!, [{ merchandiseId: variantId, quantity }]);
      } else {
        shopifyCart = await addToCart(currentCartId, [{ merchandiseId: variantId, quantity }]);
      }

      setCart(reshapeCart(shopifyCart));
    },
    [cart.cartId]
  );

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cart.cartId) return;
      const shopifyCart = await removeFromCart(cart.cartId, [lineId]);
      setCart(reshapeCart(shopifyCart));
    },
    [cart.cartId]
  );

  const updateQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart.cartId) return;
      if (quantity <= 0) {
        return removeItem(lineId);
      }
      const shopifyCart = await updateCart(cart.cartId, [{ id: lineId, quantity, merchandiseId: '' }]); // merchandiseId not strictly needed for update if using lineId
      setCart(reshapeCart(shopifyCart));
    },
    [cart.cartId, removeItem]
  );

  const clearCart = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setCart({
      items: [],
      totalQuantity: 0,
      subtotal: 0,
      discountCode: null,
      discountAmount: 0,
    });
  }, []);

  const applyDiscount = useCallback((code: string): boolean => {
    // In a real headless implementation, use cartDiscountCodesUpdate mutation
    console.log('Discount mock applied', code);
    return false;
  }, []);

  const total = cart.subtotal - cart.discountAmount;

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        applyDiscount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a <CartProvider>');
  }
  return ctx;
}
