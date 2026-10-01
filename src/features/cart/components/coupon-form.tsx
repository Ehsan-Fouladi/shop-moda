"use client";

import { CheckCircle2, TicketPercent, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/features/cart/store/cart-store";
import { useState } from "react";

/** Coupon input with loading, error and applied states (mock codes: MODA10, WELCOME). */
export function CouponForm({ idPrefix }: { idPrefix: string }) {
  const { coupon, applyCoupon, removeCoupon } = useCart();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputId = `${idPrefix}-coupon`;

  if (coupon) {
    return (
      <div
        className="flex items-center justify-between gap-2 rounded-lg border border-success/30 bg-success/10 p-3 text-sm"
        role="status"
      >
        <span className="flex items-center gap-2 text-success">
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>
            کد <b dir="ltr">{coupon.code}</b> اعمال شد
            <span className="block text-xs opacity-80">{coupon.label}</span>
          </span>
        </span>
        <button
          type="button"
          onClick={removeCoupon}
          className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-card hover:text-destructive"
          aria-label="حذف کد تخفیف"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    );
  }

  // Not a <form>: this widget is also rendered inside the checkout form (nested forms are invalid HTML).
  const submit = () => {
    setLoading(true);
    setTimeout(() => {
      setError(applyCoupon(code));
      setLoading(false);
    }, 500);
  };

  return (
    <div role="group" aria-labelledby={`${inputId}-label`}>
      <label
        id={`${inputId}-label`}
        htmlFor={inputId}
        className="mb-1.5 flex items-center gap-1.5 text-label"
      >
        <TicketPercent className="h-4 w-4 text-primary" aria-hidden="true" /> کد
        تخفیف
      </label>
      <div className="flex gap-2">
        <Input
          id={inputId}
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setError(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              submit();
            }
          }}
          placeholder="مثلاً MODA10"
          dir="ltr"
          className="text-start uppercase placeholder:normal-case"
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : `${inputId}-hint`}
        />
        <Button
          type="button"
          variant="outline"
          loading={loading}
          onClick={submit}
          className="shrink-0"
        >
          اعمال
        </Button>
      </div>
      {error ? (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="mt-1.5 text-xs text-destructive"
        >
          {error}
        </p>
      ) : (
        <p
          id={`${inputId}-hint`}
          className="mt-1.5 text-xs text-muted-foreground"
        >
          کدهای آزمایشی: MODA10 یا WELCOME
        </p>
      )}
    </div>
  );
}
