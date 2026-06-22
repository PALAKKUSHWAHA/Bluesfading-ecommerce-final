import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CartItem, Product, User, Order, Coupon } from '@/types';

const MOCK_COUPONS: Coupon[] = [
  { code: 'WELCOME10', discountPercent: 10 },
  { code: 'FIRSTORDER', discountFlat: 10.00, minAmount: 30.00 },
  { code: 'SUMMER20', discountPercent: 20 },
];

interface AppContextValue {
  wishlist: string[];
  cart: CartItem[];
  recentlyViewed: string[];
  recentSearches: string[];
  orders: Order[];
  appliedCoupon: Coupon | null;
  user: User | null;
  themeMode: 'light' | 'dark' | 'system';
  setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
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
  
  // New extensions
  addToRecentlyViewed: (productId: string) => void;
  clearRecentlyViewed: () => void;
  addToRecentSearches: (query: string) => void;
  removeFromRecentSearches: (query: string) => void;
  clearRecentSearches: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  addOrder: (orderData: Omit<Order, 'id' | 'date' | 'status'>) => Order;
  login: (username: string, email: string) => void;
  signup: (username: string, email: string) => void;
  logout: () => void;
  isLoaded: boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>('system');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from AsyncStorage on mount
  useEffect(() => {
    async function loadStorage() {
      try {
        const [
          savedCart,
          savedWishlist,
          savedRecentlyViewed,
          savedRecentSearches,
          savedOrders,
          savedUser,
          savedTheme,
        ] = await Promise.all([
          AsyncStorage.getItem('@cart'),
          AsyncStorage.getItem('@wishlist'),
          AsyncStorage.getItem('@recently_viewed'),
          AsyncStorage.getItem('@recent_searches'),
          AsyncStorage.getItem('@orders'),
          AsyncStorage.getItem('@user'),
          AsyncStorage.getItem('@theme'),
        ]);

        if (savedCart) setCart(JSON.parse(savedCart));
        if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
        if (savedRecentlyViewed) setRecentlyViewed(JSON.parse(savedRecentlyViewed));
        if (savedRecentSearches) setRecentSearches(JSON.parse(savedRecentSearches));
        if (savedOrders) setOrders(JSON.parse(savedOrders));
        if (savedUser) setUser(JSON.parse(savedUser));
        if (savedTheme) setThemeMode(JSON.parse(savedTheme) as 'light' | 'dark' | 'system');
      } catch (e) {
        console.error('Failed to load application state from AsyncStorage:', e);
      } finally {
        setIsLoaded(true);
      }
    }
    loadStorage();
  }, []);

  // Save changes to AsyncStorage
  useEffect(() => {
    if (!isLoaded) return;
    AsyncStorage.setItem('@cart', JSON.stringify(cart)).catch(console.error);
  }, [cart, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    AsyncStorage.setItem('@wishlist', JSON.stringify(wishlist)).catch(console.error);
  }, [wishlist, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    AsyncStorage.setItem('@recently_viewed', JSON.stringify(recentlyViewed)).catch(console.error);
  }, [recentlyViewed, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    AsyncStorage.setItem('@recent_searches', JSON.stringify(recentSearches)).catch(console.error);
  }, [recentSearches, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    AsyncStorage.setItem('@orders', JSON.stringify(orders)).catch(console.error);
  }, [orders, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    if (user) {
      AsyncStorage.setItem('@user', JSON.stringify(user)).catch(console.error);
    } else {
      AsyncStorage.removeItem('@user').catch(console.error);
    }
  }, [user, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    AsyncStorage.setItem('@theme', JSON.stringify(themeMode)).catch(console.error);
  }, [themeMode, isLoaded]);

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

  // Extensions
  const addToRecentlyViewed = useCallback((productId: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, 10);
    });
  }, []);

  const clearRecentlyViewed = useCallback(() => setRecentlyViewed([]), []);

  const addToRecentSearches = useCallback((query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((q) => q.toLowerCase() !== trimmed.toLowerCase());
      return [trimmed, ...filtered].slice(0, 5);
    });
  }, []);

  const removeFromRecentSearches = useCallback((query: string) => {
    setRecentSearches((prev) => prev.filter((q) => q !== query));
  }, []);

  const clearRecentSearches = useCallback(() => setRecentSearches([]), []);

  const applyCoupon = useCallback((code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const coupon = MOCK_COUPONS.find((c) => c.code === cleanCode);
    if (!coupon) {
      return { success: false, message: 'Invalid coupon code' };
    }
    if (coupon.minAmount && cartTotal < coupon.minAmount) {
      return {
        success: false,
        message: `Min. order amount for this coupon is $${coupon.minAmount.toFixed(2)}`,
      };
    }
    setAppliedCoupon(coupon);
    return { success: true, message: 'Coupon applied successfully' };
  }, [cartTotal]);

  const removeCoupon = useCallback(() => setAppliedCoupon(null), []);

  const addOrder = useCallback((orderData: Omit<Order, 'id' | 'date' | 'status'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `ord_${Math.random().toString(36).substr(2, 9)}`,
      date: new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      status: 'confirmed',
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  }, []);

  const login = useCallback((username: string, email: string) => {
    setUser({ username, email });
  }, []);

  const signup = useCallback((username: string, email: string) => {
    setUser({ username, email });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setOrders([]);
  }, []);

  const value = useMemo(
    () => ({
      wishlist,
      cart,
      recentlyViewed,
      recentSearches,
      orders,
      appliedCoupon,
      user,
      themeMode,
      setThemeMode,
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
      addToRecentlyViewed,
      clearRecentlyViewed,
      addToRecentSearches,
      removeFromRecentSearches,
      clearRecentSearches,
      applyCoupon,
      removeCoupon,
      addOrder,
      login,
      signup,
      logout,
      isLoaded,
    }),
    [
      wishlist,
      cart,
      recentlyViewed,
      recentSearches,
      orders,
      appliedCoupon,
      user,
      themeMode,
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
      addToRecentlyViewed,
      clearRecentlyViewed,
      addToRecentSearches,
      removeFromRecentSearches,
      clearRecentSearches,
      applyCoupon,
      removeCoupon,
      addOrder,
      login,
      signup,
      logout,
      isLoaded,
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
