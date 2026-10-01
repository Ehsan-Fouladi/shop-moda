/**
 * Presentational price calculations shared by cart, checkout and order success.
 * UI-only approximations — real totals will come from the backend.
 */

export const FREE_SHIPPING_THRESHOLD = 500000;
const TAX_RATE = 0.1;

export const SHIPPING_METHODS = ["standard", "express"] as const;
export type ShippingMethod = (typeof SHIPPING_METHODS)[number];

export function isShippingMethod(value: string): value is ShippingMethod {
  return (SHIPPING_METHODS as readonly string[]).includes(value);
}

/** `deliveryDays` drives the estimated delivery date shown after checkout. */
export const shippingMethods: Record<
  ShippingMethod,
  { label: string; eta: string; price: number; deliveryDays: number }
> = {
  standard: {
    label: "ارسال عادی",
    eta: "۲ تا ۴ روز کاری",
    price: 49000,
    deliveryDays: 3,
  },
  express: {
    label: "ارسال اکسپرس",
    eta: "تحویل فردا (تهران و کرج)",
    price: 89000,
    deliveryDays: 1,
  },
};

export interface Coupon {
  code: string;
  label: string;
  type: "percent" | "fixed";
  value: number;
  maxDiscount?: number;
  minSubtotal?: number;
}

/** Mock coupons for demonstrating success/error states. */
const coupons: Coupon[] = [
  {
    code: "MODA10",
    label: "۱۰٪ تخفیف (تا سقف ۳۰۰ هزار تومان)",
    type: "percent",
    value: 10,
    maxDiscount: 300000,
  },
  {
    code: "WELCOME",
    label: "۱۰۰ هزار تومان تخفیف خرید اول",
    type: "fixed",
    value: 100000,
    minSubtotal: 400000,
  },
];

export function findCoupon(code: string): Coupon | undefined {
  return coupons.find((c) => c.code === code.trim().toUpperCase());
}

export function couponDiscount(
  coupon: Coupon | null,
  subtotal: number,
): number {
  if (!coupon) return 0;
  if (coupon.minSubtotal && subtotal < coupon.minSubtotal) return 0;
  const raw =
    coupon.type === "percent" ? (subtotal * coupon.value) / 100 : coupon.value;
  return Math.round(Math.min(raw, coupon.maxDiscount ?? raw, subtotal));
}

type CouponResult = { ok: true; coupon: Coupon } | { ok: false; error: string };

/** Validates a code against the current cart subtotal (selling prices). */
export function validateCoupon(code: string, subtotal: number): CouponResult {
  if (!code.trim()) return { ok: false, error: "کد تخفیف را وارد کنید." };
  const coupon = findCoupon(code);
  if (!coupon)
    return { ok: false, error: "کد تخفیف معتبر نیست یا منقضی شده است." };
  if (couponDiscount(coupon, subtotal) === 0)
    return {
      ok: false,
      error: "مبلغ سبد خرید برای استفاده از این کد کافی نیست.",
    };
  return { ok: true, coupon };
}

/** Standard shipping is free once the amount after the coupon discount reaches the threshold. */
function amountAfterCoupon(subtotal: number, coupon: Coupon | null): number {
  return subtotal - couponDiscount(coupon, subtotal);
}

export function qualifiesForFreeShipping(
  subtotal: number,
  coupon: Coupon | null,
): boolean {
  return amountAfterCoupon(subtotal, coupon) >= FREE_SHIPPING_THRESHOLD;
}

/** Amount left until free standard shipping and the matching progress (0–100). */
export function freeShippingProgress(
  subtotal: number,
  coupon: Coupon | null,
): { remaining: number; percent: number } {
  const amount = amountAfterCoupon(subtotal, coupon);
  return {
    remaining: Math.max(0, FREE_SHIPPING_THRESHOLD - amount),
    percent: Math.min(100, (amount / FREE_SHIPPING_THRESHOLD) * 100),
  };
}

/** Delivery estimate for an order placed at `placedAt` (ISO) with the given method. */
export function estimatedDelivery(
  placedAt: string,
  method: ShippingMethod,
): string {
  return new Date(
    new Date(placedAt).getTime() +
      shippingMethods[method].deliveryDays * 86400000,
  ).toISOString();
}

export interface Totals {
  /** Sum of list (pre-discount) prices */
  listSubtotal: number;
  productDiscount: number;
  couponDiscount: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
}

export function calculateTotals({
  listSubtotal,
  subtotal,
  coupon,
  shippingMethod = "standard",
}: {
  listSubtotal: number;
  subtotal: number;
  coupon: Coupon | null;
  shippingMethod?: ShippingMethod;
}): Totals {
  const cDiscount = couponDiscount(coupon, subtotal);
  const afterDiscount = subtotal - cDiscount;
  const shipping =
    subtotal === 0
      ? 0
      : shippingMethod === "express"
        ? shippingMethods.express.price
        : qualifiesForFreeShipping(subtotal, coupon)
          ? 0
          : shippingMethods.standard.price;
  const tax = Math.round(afterDiscount * TAX_RATE);
  const productDiscount = listSubtotal - subtotal;
  return {
    listSubtotal,
    productDiscount,
    couponDiscount: cDiscount,
    discount: productDiscount + cDiscount,
    shipping,
    tax,
    total: afterDiscount + shipping + tax,
  };
}
