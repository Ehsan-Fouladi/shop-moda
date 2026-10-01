import { describe, expect, it } from "vitest";

import {
  countOrders,
  filterOrders,
  parseOrderTab,
} from "@/features/orders/lib/order-filters";
import type { Order, OrderStatus } from "@/features/orders/types";

const order = (id: string, status: OrderStatus, title: string): Order => ({
  id,
  placedAt: "2026-09-01T10:00:00Z",
  items: [{ title, image: "/images/p.jpg", quantity: 1, price: 100000 }],
  subtotal: 100000,
  discount: 0,
  shippingCost: 0,
  tax: 0,
  total: 100000,
  status,
  paymentStatus: "paid",
  paymentMethod: "کارت",
  shippingAddress: "تهران",
});
const orders = [
  order("MD-1", "pending", "مانتو"),
  order("MD-2", "shipped", "کیف چرم"),
  order("MD-3", "delivered", "کفش"),
  order("MD-4", "cancelled", "کیف دستی"),
];

describe("order filters", () => {
  it("falls back to the all tab", () => {
    expect(parseOrderTab(null).id).toBe("all");
    expect(parseOrderTab("bogus").id).toBe("all");
    expect(parseOrderTab("active").id).toBe("active");
  });

  it("counts and filters by tab and query", () => {
    expect(countOrders(orders, parseOrderTab("active"))).toBe(2);
    expect(
      filterOrders(orders, parseOrderTab("all"), " md-3 ").map((o) => o.id),
    ).toEqual(["MD-3"]);
    expect(
      filterOrders(orders, parseOrderTab("all"), "کیف").map((o) => o.id),
    ).toEqual(["MD-2", "MD-4"]);
    expect(
      filterOrders(orders, parseOrderTab("active"), "کیف").map((o) => o.id),
    ).toEqual(["MD-2"]);
  });
});
