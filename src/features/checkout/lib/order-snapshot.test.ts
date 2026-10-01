import { describe, expect, it } from "vitest";

import type { Address } from "@/features/account/types";
import { calculateTotals } from "@/features/cart/lib/pricing";
import type { CartItem } from "@/features/cart/types";
import { buildOrderSnapshot } from "@/features/checkout/lib/order-snapshot";
import { orderSnapshotSchema } from "@/features/checkout/schemas/order-snapshot-schema";

const saved: Address = {
  id: "a1",
  title: "خانه",
  receiver: "سارا",
  phone: "09120000000",
  province: "تهران",
  city: "تهران",
  street: "سعادت‌آباد، پلاک ۱۸",
  postalCode: "1234567890",
  isDefault: true,
};
const items: CartItem[] = [
  {
    product: {
      id: "p",
      slug: "p",
      title: "کیف",
      brand: "مُدا",
      price: 200000,
      rating: 4,
      reviewCount: 1,
      images: ["/images/p.jpg"],
      status: "in-stock",
    },
    quantity: 2,
  },
];
const base = {
  values: {
    firstName: "سارا",
    lastName: "محمدی",
    email: "s@e.com",
    phone: "09120000000",
  },
  addresses: [saved],
  items,
  shippingMethod: "standard" as const,
  payment: "card" as const,
  totals: calculateTotals({
    listSubtotal: 400000,
    subtotal: 400000,
    coupon: null,
  }),
};

describe("buildOrderSnapshot", () => {
  it("builds a valid snapshot with the saved address", () => {
    const s = buildOrderSnapshot(
      { ...base, addressId: "a1" },
      new Date("2026-09-01T10:00:00Z"),
    );
    expect(orderSnapshotSchema.safeParse(s).success).toBe(true);
    expect(s).toMatchObject({
      name: "سارا محمدی",
      placedAt: "2026-09-01T10:00:00.000Z",
      address: "تهران، تهران، سعادت‌آباد، پلاک ۱۸",
    });
    expect(s.id).toMatch(/^MD-\d{6}$/);
    expect(s.items).toEqual([
      { title: "کیف", image: "/images/p.jpg", quantity: 2, price: 200000 },
    ]);
  });

  it("prefers a newly entered address", () => {
    const values = {
      ...base.values,
      province: "اصفهان",
      city: "اصفهان",
      address: "خیابان چهارباغ",
    };
    expect(
      buildOrderSnapshot({ ...base, values, addressId: "new" }).address,
    ).toBe("اصفهان، اصفهان، خیابان چهارباغ");
  });
});
