import "server-only";

import { products } from "@/features/catalog/data/products";
import { toProductSummary } from "@/features/catalog/lib/product-summary";
import type { ProductSummary } from "@/features/catalog/types";

const SEED_IDS = ["p-12", "p-07", "p-15"];

/** Mock seed so the wishlist UI is explorable immediately (stands in for a saved wishlist). */
export function getInitialWishlist(): ProductSummary[] {
  return SEED_IDS.flatMap((id) => {
    const p = products.find((x) => x.id === id);
    return p ? [toProductSummary(p)] : [];
  });
}
