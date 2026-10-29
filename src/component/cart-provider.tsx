"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type CartItem = {
  productId: string;
  quantity: number;
};

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== "object" || value === null) return false;

  const item = value as Record<string, unknown>;
  return (
    typeof item.productId === "string" &&
    Number.isSafeInteger(item.quantity) &&
    Number(item.quantity) > 0
  );
}

type CartContextType = {
  items: CartItem[];
  ready: boolean;
  addItem: (productId: string, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
};

const CartContext = createContext<CartContextType | null>(null);
const STORAGE_KEY = "ebakes-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed: unknown = JSON.parse(saved);
          if (!Array.isArray(parsed) || !parsed.every(isCartItem)) {
            throw new Error("Saved cart data has an invalid format.");
          }
          setItems(parsed);
        }
      } catch (error) {
        console.error("Failed to restore the shopping cart.", error);
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch (removeError) {
          console.error("Failed to clear the saved shopping cart.", removeError);
        }
      } finally {
        setReady(true);
      }
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (ready) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch (error) {
        console.error("Failed to save the shopping cart.", error);
      }
    }
  }, [items, ready]);

  const addItem = useCallback((productId: string, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.productId === productId);

      if (existing) {
        return current.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...current, { productId, quantity }];
    });
  }, []);

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity < 1) return;

      setItems((current) =>
        current.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        )
      );
    },
    []
  );

  const removeItem = useCallback((productId: string) => {
    setItems((current) =>
      current.filter((item) => item.productId !== productId)
    );
  }, []);

  return (
    <CartContext.Provider
      value={{ items, ready, addItem, updateQuantity, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
