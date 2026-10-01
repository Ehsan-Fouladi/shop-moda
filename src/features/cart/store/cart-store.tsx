"use client";

import { toast } from "sonner";

import {
  calculateTotals,
  validateCoupon,
  type Coupon,
  type ShippingMethod,
} from "@/features/cart/lib/pricing";
import {
  addLine,
  removeLine,
  setLineQuantity,
  summarizeLines,
  type LineVariant,
} from "@/features/cart/lib/cart-lines";
import type { CartItem } from "@/features/cart/types";
import type { ProductSummary } from "@/features/catalog/types";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface AddItemOptions extends LineVariant {
  quantity?: number;
}

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  totalDiscount: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: ProductSummary, options?: AddItemOptions) => void;
  removeItem: (product: ProductSummary, options?: AddItemOptions) => void;
  updateQuantity: (
    product: ProductSummary,
    quantity: number,
    options?: AddItemOptions,
  ) => void;
  clearCart: () => void;
  coupon: Coupon | null;
  /** Returns an error message, or null on success */
  applyCoupon: (code: string) => string | null;
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

/** `initialItems` comes from the server (today a mock seed, later the persisted cart). */
export function CartProvider({
  initialItems,
  children,
}: {
  initialItems: CartItem[];
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback(
    (product: ProductSummary, options?: AddItemOptions) => {
      setItems((prev) =>
        addLine(prev, product, options?.quantity ?? 1, options),
      );
      toast.success("به سبد خرید اضافه شد", {
        description: product.title,
      });
    },
    [],
  );

  const removeItem = useCallback(
    (product: ProductSummary, options?: AddItemOptions) => {
      setItems((prev) => removeLine(prev, product.id, options));
      toast.info("از سبد خرید حذف شد", { description: product.title });
    },
    [],
  );

  const updateQuantity = useCallback(
    (product: ProductSummary, quantity: number, options?: AddItemOptions) => {
      setItems((prev) => setLineQuantity(prev, product.id, quantity, options));
    },
    [],
  );

  const clearCart = useCallback(() => setItems([]), []);

  const { totalItems, subtotal, totalDiscount } = summarizeLines(items);

  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const applyCoupon = useCallback(
    (code: string) => {
      const result = validateCoupon(code, subtotal);
      if (!result.ok) return result.error;
      setCoupon(result.coupon);
      return null;
    },
    [subtotal],
  );
  const removeCoupon = useCallback(() => setCoupon(null), []);

  const value = useMemo(
    () => ({
      items,
      totalItems,
      subtotal,
      totalDiscount,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      coupon,
      applyCoupon,
      removeCoupon,
    }),
    [
      items,
      totalItems,
      subtotal,
      totalDiscount,
      isOpen,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      coupon,
      applyCoupon,
      removeCoupon,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

/** Derived price breakdown for the current cart. */
export function useCartTotals(shippingMethod: ShippingMethod = "standard") {
  const { subtotal, totalDiscount, coupon } = useCart();
  return calculateTotals({
    listSubtotal: subtotal + totalDiscount,
    subtotal,
    coupon,
    shippingMethod,
  });
}
