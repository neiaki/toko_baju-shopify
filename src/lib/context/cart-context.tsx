'use client';

// =============================================================================
// TOKO FASHION — Cart Context
// React Context + useReducer with localStorage persistence
// =============================================================================

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { Cart, CartItem } from '@/lib/types';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'toko-fashion-cart';
const VALID_DISCOUNT_CODE = 'DISKON10';
const DISCOUNT_PERCENTAGE = 0.1; // 10 %

// ---------------------------------------------------------------------------
// Action Types
// ---------------------------------------------------------------------------

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { variantId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { variantId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'APPLY_DISCOUNT'; payload: { code: string } }
  | { type: 'HYDRATE'; payload: Cart };

// ---------------------------------------------------------------------------
// Initial State
// ---------------------------------------------------------------------------

const initialCart: Cart = {
  items: [],
  totalQuantity: 0,
  subtotal: 0,
  discountCode: null,
  discountAmount: 0,
};

// ---------------------------------------------------------------------------
// Derived totals helper
// ---------------------------------------------------------------------------

function recalculate(cart: Cart): Cart {
  const totalQuantity = cart.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const discountAmount =
    cart.discountCode === VALID_DISCOUNT_CODE
      ? Math.round(subtotal * DISCOUNT_PERCENTAGE)
      : 0;

  return { ...cart, totalQuantity, subtotal, discountAmount };
}

// ---------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------

function cartReducer(state: Cart, action: CartAction): Cart {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(
        (i) => i.variantId === action.payload.variantId,
      );

      let items: CartItem[];
      if (existing) {
        items = state.items.map((i) =>
          i.variantId === action.payload.variantId
            ? { ...i, quantity: i.quantity + action.payload.quantity }
            : i,
        );
      } else {
        items = [...state.items, action.payload];
      }

      return recalculate({ ...state, items });
    }

    case 'REMOVE_ITEM': {
      const items = state.items.filter(
        (i) => i.variantId !== action.payload.variantId,
      );
      return recalculate({ ...state, items });
    }

    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        const items = state.items.filter(
          (i) => i.variantId !== action.payload.variantId,
        );
        return recalculate({ ...state, items });
      }

      const items = state.items.map((i) =>
        i.variantId === action.payload.variantId
          ? { ...i, quantity: action.payload.quantity }
          : i,
      );
      return recalculate({ ...state, items });
    }

    case 'CLEAR_CART':
      return { ...initialCart };

    case 'APPLY_DISCOUNT': {
      const code = action.payload.code.toUpperCase().trim();
      if (code === VALID_DISCOUNT_CODE) {
        return recalculate({ ...state, discountCode: code });
      }
      // Invalid code — keep state but clear any previous discount
      return recalculate({ ...state, discountCode: null });
    }

    case 'HYDRATE':
      return recalculate(action.payload);

    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface CartContextValue {
  cart: Cart;
  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  applyDiscount: (code: string) => boolean;
  /** Subtotal minus discount */
  total: number;
}

const CartContext = createContext<CartContextValue | null>(null);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  // Hydrate from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: Cart = JSON.parse(stored);
        dispatch({ type: 'HYDRATE', payload: parsed });
      }
    } catch {
      // Silently ignore corrupt data
    }
  }, []);

  // Persist to localStorage on every cart change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // localStorage full or unavailable — ignore
    }
  }, [cart]);

  // ---- Stable action callbacks ----

  const addItem = useCallback(
    (item: CartItem) => dispatch({ type: 'ADD_ITEM', payload: item }),
    [],
  );

  const removeItem = useCallback(
    (variantId: string) =>
      dispatch({ type: 'REMOVE_ITEM', payload: { variantId } }),
    [],
  );

  const updateQuantity = useCallback(
    (variantId: string, quantity: number) =>
      dispatch({ type: 'UPDATE_QUANTITY', payload: { variantId, quantity } }),
    [],
  );

  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), []);

  const applyDiscount = useCallback(
    (code: string): boolean => {
      const isValid = code.toUpperCase().trim() === VALID_DISCOUNT_CODE;
      dispatch({ type: 'APPLY_DISCOUNT', payload: { code } });
      return isValid;
    },
    [],
  );

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

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a <CartProvider>');
  }
  return ctx;
}
