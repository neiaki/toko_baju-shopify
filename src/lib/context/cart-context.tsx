'use client';

// =============================================================================
// NEki Store — Shopify Cart Context
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
  updateCartBuyerIdentity,
  applyDiscountCodes,
} from '@/lib/shopify/cart';

const STORAGE_KEY = 'neki-store-cart-id';

// ---------------------------------------------------------------------------
// Cookie Helpers
// ---------------------------------------------------------------------------
function setCookie(name: string, value: string, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return undefined;
}

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
      currencyCode: node.merchandise.price.currencyCode,
    };
  }) || [];

  return {
    cartId: shopifyCart.id,
    checkoutUrl: shopifyCart.checkoutUrl,
    items,
    totalQuantity: shopifyCart.totalQuantity,
    subtotal: parseFloat(shopifyCart.cost.subtotalAmount.amount),
    currencyCode: shopifyCart.cost.totalAmount.currencyCode,
    discountCode: shopifyCart.discountCodes?.[0]?.applicable ? shopifyCart.discountCodes[0].code : null,
    discountAmount: shopifyCart.discountCodes?.[0]?.applicable
      ? Math.max(0, parseFloat(shopifyCart.cost.subtotalAmount.amount) - parseFloat(shopifyCart.cost.totalAmount.amount))
      : 0,
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
  applyDiscount: (code: string) => Promise<boolean>;
  total: number;
  currency: 'IDR' | 'USD';
  setCurrency: (currency: 'IDR' | 'USD') => Promise<void>;
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

  const [currency, setCurrencyState] = useState<'IDR' | 'USD'>('IDR');

  // Load existing cart and currency from localStorage/cookies on mount
  useEffect(() => {
    const initializeCart = async () => {
      let storedCurrency = getCookie('x-currency') as 'IDR' | 'USD';
      if (!storedCurrency || (storedCurrency !== 'IDR' && storedCurrency !== 'USD')) {
        storedCurrency = 'IDR';
        setCookie('x-currency', 'IDR');
        setCookie('x-country', 'ID');
      }
      setCurrencyState(storedCurrency);

      const cartId = localStorage.getItem(STORAGE_KEY);
      if (cartId) {
        try {
          const shopifyCart = await getCart(cartId);
          if (shopifyCart) {
            const cartCurrency = shopifyCart.cost.totalAmount.currencyCode;
            if (cartCurrency !== storedCurrency) {
              const countryCode = storedCurrency === 'IDR' ? 'ID' : 'US';
              const updatedCart = await updateCartBuyerIdentity(cartId, countryCode);
              if (updatedCart) {
                setCart(reshapeCart(updatedCart));
                return;
              }
            }
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

  const changeCurrency = useCallback(
    async (newCurrency: 'IDR' | 'USD') => {
      const countryCode = newCurrency === 'IDR' ? 'ID' : 'US';
      setCookie('x-currency', newCurrency);
      setCookie('x-country', countryCode);
      setCurrencyState(newCurrency);

      if (cart.cartId) {
        try {
          const updatedCart = await updateCartBuyerIdentity(cart.cartId, countryCode);
          if (updatedCart) {
            setCart(reshapeCart(updatedCart));
          }
        } catch (e) {
          console.error('Failed to update cart buyer identity:', e);
        }
      }

      // Refresh Next.js server/page components to update pricing based on cookie
      window.location.reload();
    },
    [cart.cartId]
  );

  const addItem = useCallback(
    async (variantId: string, quantity: number) => {
      let currentCartId = cart.cartId;
      let shopifyCart;
      const currentCountry = currency === 'IDR' ? 'ID' : 'US';

      if (!currentCartId) {
        shopifyCart = await createCart(currentCountry);
        currentCartId = shopifyCart.id;
        localStorage.setItem(STORAGE_KEY, currentCartId!);
        // Add lines to the newly created cart
        shopifyCart = await addToCart(currentCartId!, [{ merchandiseId: variantId, quantity }]);
      } else {
        shopifyCart = await addToCart(currentCartId, [{ merchandiseId: variantId, quantity }]);
      }

      setCart(reshapeCart(shopifyCart));
    },
    [cart.cartId, currency]
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
      const shopifyCart = await updateCart(cart.cartId, [{ id: lineId, quantity }]);
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

  const applyDiscount = useCallback(async (code: string): Promise<boolean> => {
    if (!cart.cartId) return false;
    try {
      const updatedCart = await applyDiscountCodes(cart.cartId, [code]);
      if (updatedCart) {
        setCart(reshapeCart(updatedCart));
        const applied = updatedCart.discountCodes?.some(
          (dc: any) => dc.applicable && dc.code.toLowerCase() === code.toLowerCase()
        );
        return !!applied;
      }
      return false;
    } catch (e) {
      console.error('Failed to apply discount:', e);
      return false;
    }
  }, [cart.cartId]);

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
        currency,
        setCurrency: changeCurrency,
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
