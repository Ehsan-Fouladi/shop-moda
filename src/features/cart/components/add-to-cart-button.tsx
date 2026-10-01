"use client";

import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/features/cart/store/cart-store";
import type { ProductSummary } from "@/features/catalog/types";

/** Quick add (first colour/size) used on product cards; opens the cart drawer. */
export function AddToCartButton({
  product,
  className,
}: {
  product: ProductSummary;
  className?: string;
}) {
  const { addItem, openCart } = useCart();
  const outOfStock = product.status === "out-of-stock";
  return (
    <Button
      variant={outOfStock ? "outline" : "default"}
      size="sm"
      // Cards can be ~115px wide on small phones: let the label wrap instead of overflowing.
      className={cn(
        "h-auto min-h-9 whitespace-normal py-1.5 text-balance leading-5",
        className,
      )}
      disabled={outOfStock}
      aria-disabled={outOfStock}
      onClick={(e) => {
        e.preventDefault();
        addItem(product, {
          selectedColor: product.colors?.[0]?.name,
          selectedSize: product.sizes?.[0],
        });
        openCart();
      }}
    >
      <ShoppingCart className="h-4 w-4" aria-hidden="true" />
      {outOfStock ? "ناموجود" : "افزودن به سبد خرید"}
    </Button>
  );
}
