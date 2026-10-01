import "server-only";

import type { OrderSnapshot } from "@/features/checkout/schemas/order-snapshot-schema";
import { orders } from "@/features/orders/data/orders";

/** Fallback for the success page when opened directly (no fresh checkout in this session). */
export function getDemoOrderSnapshot(): OrderSnapshot {
  const o = orders[0];
  return {
    id: o.id,
    placedAt: o.placedAt,
    name: "سارا محمدی",
    email: "sara.mohammadi@example.com",
    address: o.shippingAddress,
    shippingMethod: "standard",
    payment: "card",
    items: o.items,
    totals: {
      listSubtotal: o.subtotal,
      productDiscount: o.discount,
      couponDiscount: 0,
      discount: o.discount,
      shipping: o.shippingCost,
      tax: o.tax,
      total: o.total,
    },
  };
}
