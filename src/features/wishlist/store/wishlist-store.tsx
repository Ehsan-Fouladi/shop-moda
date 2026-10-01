"use client";

import { toast } from "sonner";

import { toProductSummary } from "@/features/catalog/lib/product-summary";
import type { ProductSummary } from "@/features/catalog/types";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface WishlistContextValue {
  items: ProductSummary[];
  count: number;
  has: (productId: string) => boolean;
  toggle: (product: ProductSummary) => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

/** Stores product summaries (not just ids) so the wishlist page needs no client-side catalog. */
export function WishlistProvider({
  initialItems,
  children,
}: {
  initialItems: ProductSummary[];
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<ProductSummary[]>(initialItems);

  // Decide from the current render's items and toast outside the state updater:
  // updaters must stay pure (StrictMode runs them twice, which double-fired the toast).
  const toggle = useCallback(
    (product: ProductSummary) => {
      if (items.some((p) => p.id === product.id)) {
        setItems((prev) => prev.filter((p) => p.id !== product.id));
        toast.info("از علاقه‌مندی‌ها حذف شد", { description: product.title });
      } else {
        setItems((prev) =>
          prev.some((p) => p.id === product.id)
            ? prev
            : [...prev, toProductSummary(product)],
        );
        toast.success("به علاقه‌مندی‌ها اضافه شد", {
          description: product.title,
        });
      }
    },
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      count: items.length,
      has: (productId: string) => items.some((p) => p.id === productId),
      toggle,
    }),
    [items, toggle],
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx)
    throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
}
