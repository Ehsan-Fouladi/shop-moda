"use client";

import { Heart } from "lucide-react";

import type { ProductSummary } from "@/features/catalog/types";
import { useWishlist } from "@/features/wishlist/store/wishlist-store";
import { cn } from "@/lib/utils";

/** Heart toggle overlaid on product cards. */
export function WishlistToggleButton({
  product,
  className,
}: {
  product: ProductSummary;
  className?: string;
}) {
  const { has, toggle } = useWishlist();
  const wishlisted = has(product.id);
  return (
    <button
      type="button"
      onClick={() => toggle(product)}
      aria-pressed={wishlisted}
      aria-label={
        wishlisted ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"
      }
      className={cn(
        className,
        wishlisted ? "text-primary" : "text-muted-foreground",
      )}
    >
      <Heart
        className={cn("h-4.5 w-4.5", wishlisted && "fill-current")}
        aria-hidden="true"
      />
    </button>
  );
}
