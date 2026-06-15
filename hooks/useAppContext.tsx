import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { CartItem, Product } from '@/types';

interface AppContextValue {
  wishlist: string[];
  cart: CartItem[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  isInCart: (productId: string) => boolean;
  getCartQuantity: (productId: string) => number;
  cartTotal: number;
  cartItemCount: number;
  clearCart: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const isInWishlist = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist]
  );

  const toggleWishlist = useCallback((product: Product) => {
    setWishlist((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlist((prev) => prev.filter((id) => id !== productId));
  }, []);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateCartQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const isInCart = useCallback(
    (productId: string) => cart.some((item) => item.product.id === productId),
    [cart]
  );

  const getCartQuantity = useCallback(
    (productId: string) =>
      cart.find((item) => item.product.id === productId)?.quantity ?? 0,
    [cart]
  );

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cart]
  );

  const cartItemCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const clearCart = useCallback(() => setCart([]), []);

  const value = useMemo(
    () => ({
      wishlist,
      cart,
      searchQuery,
      setSearchQuery,
      isInWishlist,
      toggleWishlist,
      removeFromWishlist,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      isInCart,
      getCartQuantity,
      cartTotal,
      cartItemCount,
      clearCart,
    }),
    [
      wishlist,
      cart,
      searchQuery,
      isInWishlist,
      toggleWishlist,
      removeFromWishlist,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      isInCart,
      getCartQuantity,
      cartTotal,
      cartItemCount,
      clearCart,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
