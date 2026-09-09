import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CartItem, FoodItem, OrderDetails, PromoCode, ToastNotification } from '../types';
import { PROMO_CODES } from '../data/foodItems';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: FoodItem) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getItemQuantity: (id: string) => number;
  totalItemsCount: number;
  subtotal: number;
  deliveryFee: number;
  gst: number;
  discount: number;
  totalAmount: number;
  appliedPromo: PromoCode | null;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  lastConfirmedOrder: OrderDetails | null;
  setLastConfirmedOrder: (order: OrderDetails | null) => void;
  isOrderTrackingOpen: boolean;
  setIsOrderTrackingOpen: (open: boolean) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  activeToast: ToastNotification | null;
  showToast: (title: string, message: string, image?: string) => void;
  hideToast: () => void;
  selectedDish: FoodItem | null;
  setSelectedDish: (item: FoodItem | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'biterush_cart_v1';
const PROMO_STORAGE_KEY = 'biterush_promo_v1';
const FAVS_STORAGE_KEY = 'biterush_favorites_v1';
const ACTIVE_ORDER_STORAGE_KEY = 'biterush_active_order_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [];
  });

  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(() => {
    try {
      const saved = localStorage.getItem(PROMO_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return null;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return ['it-1', 'as-1', 'it-3']; // Default favorites for inspiration
  });

  const [lastConfirmedOrder, setLastConfirmedOrderState] = useState<OrderDetails | null>(() => {
    try {
      const saved = localStorage.getItem(ACTIVE_ORDER_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return null;
  });

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState<boolean>(false);
  const [selectedDish, setSelectedDish] = useState<FoodItem | null>(null);
  const [activeToast, setActiveToast] = useState<ToastNotification | null>(null);

  const setLastConfirmedOrder = (order: OrderDetails | null) => {
    setLastConfirmedOrderState(order);
    try {
      if (order) {
        localStorage.setItem(ACTIVE_ORDER_STORAGE_KEY, JSON.stringify(order));
      } else {
        localStorage.removeItem(ACTIVE_ORDER_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  };

  const showToast = useCallback((title: string, message: string, image?: string) => {
    const newToast: ToastNotification = {
      id: String(Date.now()),
      title,
      message,
      image,
    };
    setActiveToast(newToast);
  }, []);

  const hideToast = useCallback(() => {
    setActiveToast(null);
  }, []);

  // Auto-hide toast after 3.2 seconds
  useEffect(() => {
    if (!activeToast) return;
    const timer = setTimeout(() => {
      setActiveToast(null);
    }, 3200);
    return () => clearTimeout(timer);
  }, [activeToast]);

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not save cart to localStorage', e);
    }
  }, [cart]);

  // Sync promo to localStorage
  useEffect(() => {
    try {
      if (appliedPromo) {
        localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify(appliedPromo));
      } else {
        localStorage.removeItem(PROMO_STORAGE_KEY);
      }
    } catch (e) {
      console.warn('Could not save promo to localStorage', e);
    }
  }, [appliedPromo]);

  // Sync favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(FAVS_STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.warn('Could not save favorites to localStorage', e);
    }
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        return prev.filter((item) => item !== id);
      } else {
        showToast('Saved to Favorites ❤️', 'Added to your bookmarked collection');
        return [...prev, id];
      }
    });
  };

  const isFavorite = (id: string): boolean => {
    return favorites.includes(id);
  };

  const getItemQuantity = (id: string): number => {
    const found = cart.find((item) => item.id === id);
    return found ? found.quantity : 0;
  };

  const addToCart = (food: FoodItem) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === food.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...food, quantity: 1 }];
    });
    showToast(`Added ${food.name}`, `Added 1 item to your cart`, food.image);
  };

  const increaseQuantity = (id: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: string) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === id);
      if (!existing) return prevCart;
      if (existing.quantity <= 1) {
        return prevCart.filter((item) => item.id !== id);
      }
      return prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Delivery fee logic: ₹40 standard, free over ₹400 or with FREEBIE code
  const isFreeDelivery = subtotal >= 400 || appliedPromo?.code === 'FREEBIE';
  const deliveryFee = subtotal === 0 ? 0 : isFreeDelivery ? 0 : 40;

  // 5% GST on food subtotal
  const gst = subtotal === 0 ? 0 : Math.round(subtotal * 0.05);

  // Discount calculation
  let discount = 0;
  if (appliedPromo && subtotal >= appliedPromo.minOrderAmount) {
    if (appliedPromo.discountPercentage > 0) {
      const rawDiscount = (subtotal * appliedPromo.discountPercentage) / 100;
      discount = Math.round(Math.min(rawDiscount, appliedPromo.maxDiscount));
    }
  }

  const totalAmount = Math.max(0, subtotal + deliveryFee + gst - discount);

  const applyPromo = (code: string): { success: boolean; message: string } => {
    const clean = code.trim().toUpperCase();
    const promo = PROMO_CODES.find((p) => p.code === clean);

    if (!promo) {
      return { success: false, message: 'Invalid promo code. Try BITERUSH50 or COLLEGEFEST' };
    }

    if (subtotal < promo.minOrderAmount) {
      return {
        success: false,
        message: `Min order of ₹${promo.minOrderAmount} required for ${promo.code}`,
      };
    }

    setAppliedPromo(promo);
    return { success: true, message: `Promo ${promo.code} applied successfully!` };
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        getItemQuantity,
        totalItemsCount,
        subtotal,
        deliveryFee,
        gst,
        discount,
        totalAmount,
        appliedPromo,
        applyPromo,
        removePromo,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        lastConfirmedOrder,
        setLastConfirmedOrder,
        isOrderTrackingOpen,
        setIsOrderTrackingOpen,
        favorites,
        toggleFavorite,
        isFavorite,
        activeToast,
        showToast,
        hideToast,
        selectedDish,
        setSelectedDish,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

