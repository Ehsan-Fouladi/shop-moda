import "server-only";

import type { CartItem } from "@/features/cart/types";
import { products } from "@/features/catalog/data/products";
import { toProductSummary } from "@/features/catalog/lib/product-summary";

const byId = (id: string) => {
  const product = products.find((p) => p.id === id);
  if (!product) throw new Error(`Seed cart references unknown product "${id}"`);
  return toProductSummary(product);
};

/** Mock seed so the cart UI can be explored immediately (stands in for a persisted cart). */
export function getInitialCart(): CartItem[] {
  return [
    {
      product: byId("p-01"),
      quantity: 1,
      selectedColor: "شتری",
      selectedSize: "M",
    },
    { product: byId("p-14"), quantity: 2 },
  ];
}
