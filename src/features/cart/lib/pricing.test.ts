import { describe, expect, it } from "vitest";

import {
  FREE_SHIPPING_THRESHOLD,
  calculateTotals,
  couponDiscount,
  estimatedDelivery,
  findCoupon,
  freeShippingProgress,
  qualifiesForFreeShipping,
  shippingMethods,
  validateCoupon,
} from "@/features/cart/lib/pricing";

describe("coupons", () => {
  it("normalises codes and respects caps and minimums", () => {
    const moda10 = findCoupon(" moda10 ");
    expect(moda10?.code).toBe("MODA10");
    expect(couponDiscount(moda10 ?? null, 5_000_000)).toBe(300000);
    expect(couponDiscount(findCoupon("WELCOME") ?? null, 300000)).toBe(0);
  });
});

describe("calculateTotals", () => {
  it("gives free standard shipping above the threshold", () => {
    const t = calculateTotals({
      listSubtotal: FREE_SHIPPING_THRESHOLD,
      subtotal: FREE_SHIPPING_THRESHOLD,
      coupon: null,
    });
    expect(t.shipping).toBe(0);
  });

  it("always charges express shipping", () => {
    const t = calculateTotals({
      listSubtotal: 900000,
      subtotal: 800000,
      coupon: null,
      shippingMethod: "express",
    });
    expect(t.shipping).toBe(shippingMethods.express.price);
    expect(t.productDiscount).toBe(100000);
  });
});

describe("validateCoupon", () => {
  it("returns the same messages as before for each failure", () => {
    expect(validateCoupon("  ", 100000)).toEqual({
      ok: false,
      error: "کد تخفیف را وارد کنید.",
    });
    expect(validateCoupon("NOPE", 100000)).toEqual({
      ok: false,
      error: "کد تخفیف معتبر نیست یا منقضی شده است.",
    });
    expect(validateCoupon("welcome", 300000)).toEqual({
      ok: false,
      error: "مبلغ سبد خرید برای استفاده از این کد کافی نیست.",
    });
    expect(validateCoupon("moda10", 300000)).toMatchObject({
      ok: true,
      coupon: { code: "MODA10" },
    });
  });
});

describe("free shipping", () => {
  it("uses the amount after the coupon, consistent with calculateTotals", () => {
    const moda10 = findCoupon("MODA10") ?? null;
    const subtotal = 520000; // 468,000 after MODA10
    expect(qualifiesForFreeShipping(subtotal, null)).toBe(true);
    expect(qualifiesForFreeShipping(subtotal, moda10)).toBe(false);
    const progress = freeShippingProgress(subtotal, moda10);
    expect(progress.remaining).toBe(32000);
    expect(progress.percent).toBeCloseTo(93.6);
    expect(
      calculateTotals({ listSubtotal: subtotal, subtotal, coupon: moda10 })
        .shipping,
    ).toBe(shippingMethods.standard.price);
    expect(freeShippingProgress(FREE_SHIPPING_THRESHOLD * 2, null)).toEqual({
      remaining: 0,
      percent: 100,
    });
  });

  it("estimates delivery from the shipping method", () => {
    expect(estimatedDelivery("2026-09-01T10:00:00.000Z", "standard")).toBe(
      "2026-09-04T10:00:00.000Z",
    );
    expect(estimatedDelivery("2026-09-01T10:00:00.000Z", "express")).toBe(
      "2026-09-02T10:00:00.000Z",
    );
  });
});
