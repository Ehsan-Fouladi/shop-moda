"use client";

import { Truck } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { formatPrice } from "@/lib/format";
import { freeShippingProgress } from "@/features/cart/lib/pricing";
import { useCart } from "@/features/cart/store/cart-store";

/** Wording differs per surface: short in the mini cart, a full sentence on the cart page. */
const copy = {
  drawer: {
    remaining: (amount: React.ReactNode) => <>{amount} تا ارسال رایگان</>,
    done: "ارسال این سفارش رایگان است",
  },
  page: {
    remaining: (amount: React.ReactNode) => (
      <>با افزودن {amount} دیگر، ارسال عادی رایگان می‌شود.</>
    ),
    done: "ارسال عادی این سفارش رایگان است.",
  },
} as const;

/** Progress towards free standard shipping (after the coupon discount, like the totals). */
export function FreeShippingProgress({
  variant,
}: {
  variant: keyof typeof copy;
}) {
  const { subtotal, coupon } = useCart();
  const { remaining, percent } = freeShippingProgress(subtotal, coupon);
  const text = copy[variant];

  return (
    <div className="border-b border-border bg-muted/40 px-4 py-3">
      <p className="mb-2 flex items-center gap-2 text-xs">
        <Truck className="h-4 w-4 text-primary" aria-hidden="true" />
        {remaining > 0 ? (
          <span>
            {text.remaining(
              <b className="tabular-nums">{formatPrice(remaining)}</b>,
            )}
          </span>
        ) : (
          <span className="font-medium text-success">{text.done}</span>
        )}
      </p>
      <Progress
        value={percent}
        className="h-1.5"
        aria-label="پیشرفت تا ارسال رایگان"
      />
    </div>
  );
}
