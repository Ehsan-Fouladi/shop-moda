"use client";

import { Direction } from "radix-ui";

import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/features/cart/store/cart-store";
import type { CartItem } from "@/features/cart/types";
import type { ProductSummary } from "@/features/catalog/types";
import { WishlistProvider } from "@/features/wishlist/store/wishlist-store";

interface ProvidersProps {
  initialCart: CartItem[];
  initialWishlist: ProductSummary[];
  children: React.ReactNode;
}

/**
 * App-wide client providers (UI state only). Initial cart/wishlist state is loaded on the server.
 * Direction.Provider makes every Radix primitive (menus, tabs, sliders, radio groups, keyboard
 * arrows) behave correctly in RTL.
 */
export function Providers({
  initialCart,
  initialWishlist,
  children,
}: ProvidersProps) {
  return (
    <Direction.Provider dir="rtl">
      <TooltipProvider delayDuration={200}>
        <WishlistProvider initialItems={initialWishlist}>
          <CartProvider initialItems={initialCart}>{children}</CartProvider>
        </WishlistProvider>
      </TooltipProvider>
    </Direction.Provider>
  );
}
