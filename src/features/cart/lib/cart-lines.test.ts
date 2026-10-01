import { describe, expect, it } from "vitest";

import {
  MAX_LINE_QUANTITY,
  addLine,
  cartLineKey,
  removeLine,
  setLineQuantity,
  summarizeLines,
} from "@/features/cart/lib/cart-lines";
import type { Product } from "@/features/catalog/types";

const product = {
  id: "p-1",
  slug: "p-1",
  title: "پیراهن",
  brand: "مُدا",
  price: 100000,
  rating: 4,
  reviewCount: 2,
  images: ["/a.svg"],
  status: "in-stock",
  description: "full description must not reach the cart",
} as const satisfies Partial<Product>;

describe("cart lines", () => {
  it("stores only the product summary", () => {
    const [line] = addLine([], product, 1);
    expect(line.product).not.toHaveProperty("description");
  });

  it("merges the same variant and caps the quantity", () => {
    let items = addLine([], product, 4, { selectedSize: "M" });
    items = addLine(items, product, 9, { selectedSize: "M" });
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(MAX_LINE_QUANTITY);
  });

  it("keeps different variants as separate lines", () => {
    const items = addLine(
      addLine([], product, 1, { selectedSize: "M" }),
      product,
      1,
      { selectedSize: "L" },
    );
    expect(items).toHaveLength(2);
    expect(removeLine(items, "p-1", { selectedSize: "L" })).toHaveLength(1);
  });

  it("removes a line when the quantity drops below one", () => {
    const items = addLine([], product, 2);
    expect(setLineQuantity(items, "p-1", 0)).toEqual([]);
    expect(setLineQuantity(items, "p-1", 50)[0].quantity).toBe(
      MAX_LINE_QUANTITY,
    );
  });

  it("summarises count, subtotal and product discount", () => {
    const items = addLine(
      addLine([], { ...product, oldPrice: 150000 }, 2, { selectedSize: "M" }),
      product,
      1,
      { selectedSize: "L" },
    );
    expect(summarizeLines(items)).toEqual({
      totalItems: 3,
      subtotal: 300000,
      totalDiscount: 100000,
    });
    expect(new Set(items.map(cartLineKey)).size).toBe(2);
  });
});
