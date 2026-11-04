"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
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

type CartMutation =
  | { type: "add"; productId: string; quantity: number }
  | { type: "update"; productId: string; quantity: number }
  | { type: "remove"; productId: string };

function applyMutation(items: CartItem[], mutation: CartMutation): CartItem[] {
  if (mutation.type === "remove") {
    return items.filter((item) => item.productId !== mutation.productId);
  }

  const existing = items.find((item) => item.productId === mutation.productId);

  if (mutation.type === "update") {
    if (mutation.quantity < 1) return items;
    return items.map((item) =>
      item.productId === mutation.productId
        ? { ...item, quantity: mutation.quantity }
        : item
    );
  }

  if (existing) {
    return items.map((item) =>
      item.productId === mutation.productId
        ? { ...item, quantity: item.quantity + mutation.quantity }
        : item
    );
  }

  return [
    ...items,
    { productId: mutation.productId, quantity: mutation.quantity },
  ];
}

const CartContext = createContext<CartContextType | null>(null);
const STORAGE_KEY = "ebakes-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const readyRef = useRef(false);
  const pendingMutations = useRef<CartMutation[]>([]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      let restoredItems: CartItem[] = [];

      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed: unknown = JSON.parse(saved);
          if (!Array.isArray(parsed) || !parsed.every(isCartItem)) {
            throw new Error("Saved cart data has an invalid format.");
          }
          restoredItems = parsed;
        }
      } catch (error) {
        console.error("Failed to restore the shopping cart.", error);
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch (removeError) {
          console.error("Failed to clear the saved shopping cart.", removeError);
        }
      } finally {
        setItems(
          pendingMutations.current.reduce(applyMutation, restoredItems)
        );
        pendingMutations.current = [];
        readyRef.current = true;
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

  const dispatchMutation = useCallback((mutation: CartMutation) => {
    if (!readyRef.current) pendingMutations.current.push(mutation);
    setItems((current) => applyMutation(current, mutation));
  }, []);

  const addItem = useCallback(
    (productId: string, quantity = 1) => {
      dispatchMutation({ type: "add", productId, quantity });
    },
    [dispatchMutation]
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      dispatchMutation({ type: "update", productId, quantity });
    },
    [dispatchMutation]
  );

  const removeItem = useCallback(
    (productId: string) => {
      dispatchMutation({ type: "remove", productId });
    },
    [dispatchMutation]
  );

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
