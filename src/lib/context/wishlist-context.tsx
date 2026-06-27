'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export interface WishlistItem {
  handle: string;
  title: string;
  image: string;
  price: number;
  currencyCode?: string;
}

interface WishlistContextValue {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (handle: string) => void;
  isInWishlist: (handle: string) => boolean;
  toggleWishlist: (item: WishlistItem) => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

const STORAGE_KEY = 'neki-store-wishlist';

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setWishlist(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse wishlist from localStorage:', e);
      }
    }
  }, []);

  const addToWishlist = useCallback((item: WishlistItem) => {
    setWishlist((prev) => {
      if (prev.some((i) => i.handle === item.handle)) return prev;
      const next = [...prev, item];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const removeFromWishlist = useCallback((handle: string) => {
    setWishlist((prev) => {
      const next = prev.filter((i) => i.handle !== handle);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isInWishlist = useCallback((handle: string) => {
    return wishlist.some((item) => item.handle === handle);
  }, [wishlist]);

  const toggleWishlist = useCallback((item: WishlistItem) => {
    setWishlist((prev) => {
      const exists = prev.some((i) => i.handle === item.handle);
      let next;
      if (exists) {
        next = prev.filter((i) => i.handle !== item.handle);
      } else {
        next = [...prev, item];
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error('useWishlist must be used within a <WishlistProvider>');
  }
  return ctx;
}
