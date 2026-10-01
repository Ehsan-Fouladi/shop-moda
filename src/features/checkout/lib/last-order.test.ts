import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  readLastOrder,
  saveLastOrder,
} from "@/features/checkout/lib/last-order";
import type { OrderSnapshot } from "@/features/checkout/schemas/order-snapshot-schema";

const snapshot: OrderSnapshot = {
  id: "MD-140750",
  placedAt: "2026-09-01T10:00:00.000Z",
  name: "سارا محمدی",
  email: "sara@example.com",
  shippingMethod: "express",
  payment: "cod",
  items: [
    { title: "کیف", image: "/images/bag.jpg", quantity: 1, price: 500000 },
  ],
  totals: {
    listSubtotal: 500000,
    productDiscount: 0,
    couponDiscount: 0,
    discount: 0,
    shipping: 0,
    tax: 0,
    total: 500000,
  },
};

beforeEach(() => {
  const store = new Map<string, string>();
  vi.stubGlobal("sessionStorage", {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
  });
});
afterEach(() => vi.unstubAllGlobals());

describe("last order handoff", () => {
  it("round-trips a valid snapshot", () => {
    saveLastOrder(snapshot);
    expect(readLastOrder()).toEqual(snapshot);
  });

  it("rejects tampered or malformed data instead of rendering it", () => {
    sessionStorage.setItem(
      "moda-last-order",
      JSON.stringify({
        ...snapshot,
        items: [{ ...snapshot.items[0], image: "javascript:alert(1)" }],
      }),
    );
    expect(readLastOrder()).toBeNull();
    sessionStorage.setItem("moda-last-order", "{not json");
    expect(readLastOrder()).toBeNull();
  });

  it("returns null when nothing was stored", () => {
    expect(readLastOrder()).toBeNull();
  });
});
