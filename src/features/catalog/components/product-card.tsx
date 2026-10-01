import Link from "next/link";

import { PriceDisplay } from "@/features/catalog/components/price-display";
import {
  ProductBadgeTag,
  StockStatusBadge,
} from "@/features/catalog/components/product-badges";
import { ProductImage } from "@/features/catalog/components/product-image";
import { RatingStars } from "@/features/catalog/components/rating-stars";
import { AddToCartButton } from "@/features/cart/components/add-to-cart-button";
import { toProductSummary } from "@/features/catalog/lib/product-summary";
import type { ProductSummary } from "@/features/catalog/types";
import { WishlistToggleButton } from "@/features/wishlist/components/wishlist-toggle-button";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: ProductSummary;
  /** Hide the add-to-cart button (e.g. tight carousels) */
  compact?: boolean;
  /** First-row card on a listing: its image is an LCP candidate */
  priority?: boolean;
  className?: string;
}

/**
 * The canonical product card used in grids, carousels and wishlists.
 * Clean fashion-commerce layout: image first, minimal metadata.
 * Server-renderable: only the wishlist and add-to-cart buttons are client islands, and they
 * receive a product summary rather than the full product.
 */
export function ProductCard({
  product,
  compact = false,
  priority = false,
  className,
}: ProductCardProps) {
  const summary = toProductSummary(product);
  const href = `/product/${product.slug}`;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition-all duration-200 hover:shadow-card-hover hover:border-border",
        className,
      )}
    >
      <Link href={href} className="relative block" aria-label={product.title}>
        <ProductImage
          src={product.images[0]}
          alt={product.title}
          priority={priority}
          className="transition-transform duration-300 group-hover:scale-[1.02]"
        />
        {/* Second image on hover (desktop) */}
        {product.images[1] && (
          <ProductImage
            src={product.images[1]}
            alt=""
            className="absolute inset-0 hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block"
          />
        )}
        {product.badge && (
          <ProductBadgeTag
            badge={product.badge}
            className="absolute top-3 start-3 z-10"
          />
        )}
      </Link>

      {/* Wishlist */}
      <WishlistToggleButton
        product={summary}
        className={cn(
          "absolute top-2.5 end-2.5 z-10 grid h-9 w-9 place-items-center rounded-full bg-card/90 shadow-xs backdrop-blur-sm transition-colors",
          "hover:bg-card focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        )}
      />

      <div className="flex flex-1 flex-col gap-1.5 p-3 md:p-4">
        <span className="text-[11px] font-medium text-muted-foreground">
          {product.brand}
        </span>
        <h3 className="line-clamp-2 text-sm leading-6 font-medium text-card-foreground">
          <Link
            href={href}
            className="hover:text-primary focus-visible:text-primary"
          >
            {product.title}
          </Link>
        </h3>

        <RatingStars
          rating={product.rating}
          reviewCount={product.reviewCount}
          className="mt-0.5"
        />

        <StockStatusBadge status={product.status} className="mt-1 self-start" />

        <div className="mt-auto pt-2">
          <PriceDisplay
            price={product.price}
            oldPrice={product.oldPrice}
            size="sm"
            layout="column"
          />
        </div>

        {!compact && (
          <AddToCartButton product={summary} className="mt-3 w-full gap-2" />
        )}
      </div>
    </article>
  );
}
