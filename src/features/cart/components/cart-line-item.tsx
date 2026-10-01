"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Trash2 } from "lucide-react";

import { QuantitySelector } from "@/components/shared/quantity-selector";
import { Button } from "@/components/ui/button";
import { formatNumber, formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useCart } from "@/features/cart/store/cart-store";
import { useWishlist } from "@/features/wishlist/store/wishlist-store";
import type { CartItem } from "@/features/cart/types";

interface CartLineItemProps {
  item: CartItem;
  compact?: boolean;
  /** First row on the cart page, where its image is the LCP element */
  eager?: boolean;
}

/** One cart row — used by both the cart drawer (compact) and cart page. */
export function CartLineItem({
  item,
  compact = false,
  eager = false,
}: CartLineItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { has, toggle } = useWishlist();
  const { product, quantity, selectedColor, selectedSize } = item;
  const opts = { selectedColor, selectedSize };
  const wishlisted = has(product.id);

  return (
    <article className="flex gap-3 sm:gap-4">
      <Link
        href={`/product/${product.slug}`}
        className={cn(
          "product-surface relative shrink-0 overflow-hidden rounded-lg border border-border/60",
          compact ? "h-24 w-20" : "h-32 w-26 sm:h-36 sm:w-28",
        )}
      >
        <Image
          src={product.images[0]}
          alt={product.title}
          draggable="false"
          fill
          loading={eager ? "eager" : "lazy"}
          sizes="112px"
          className="object-cover"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[11px] text-muted-foreground">{product.brand}</p>
            <h3
              className={cn(
                "line-clamp-2 font-medium leading-6",
                compact ? "text-[13px]" : "text-sm",
              )}
            >
              <Link
                href={`/product/${product.slug}`}
                className="hover:text-primary"
              >
                {product.title}
              </Link>
            </h3>
          </div>
          {!compact && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
              onClick={() => removeItem(product, opts)}
              aria-label={`حذف ${product.title} از سبد خرید`}
            >
              <Trash2 aria-hidden="true" />
            </Button>
          )}
        </div>

        {(selectedColor || selectedSize) && (
          <p className="mt-1 flex flex-wrap gap-x-3 text-xs text-muted-foreground">
            {selectedColor && <span>رنگ: {selectedColor}</span>}
            {selectedSize && <span>سایز: {selectedSize}</span>}
          </p>
        )}

        <div className="mt-auto flex flex-wrap items-end justify-between gap-2 pt-2">
          <QuantitySelector
            size="sm"
            value={quantity}
            onChange={(q) => updateQuantity(product, q, opts)}
            onRemove={() => removeItem(product, opts)}
          />
          <div className="text-end">
            {product.oldPrice && (
              <p className="text-[11px] text-sale tabular-nums">
                {formatNumber((product.oldPrice - product.price) * quantity)}{" "}
                تخفیف
              </p>
            )}
            <p className="text-sm font-bold tabular-nums">
              {formatPrice(product.price * quantity)}
            </p>
          </div>
        </div>

        {!compact && (
          <button
            type="button"
            onClick={() => {
              if (!wishlisted) toggle(product);
              removeItem(product, opts);
            }}
            className="mt-2 flex items-center gap-1 self-start text-xs text-muted-foreground hover:text-primary"
          >
            <Heart
              className={cn(
                "h-3.5 w-3.5",
                wishlisted && "fill-primary text-primary",
              )}
              aria-hidden="true"
            />
            {wishlisted
              ? "حذف از سبد (در علاقه‌مندی‌ها موجود است)"
              : "انتقال به علاقه‌مندی‌ها"}
          </button>
        )}
      </div>
    </article>
  );
}
