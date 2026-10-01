"use client";

import Link from "next/link";
import {
  ArrowRight,
  Lock,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";

import { CartLineItem } from "@/features/cart/components/cart-line-item";
import { CouponForm } from "@/features/cart/components/coupon-form";
import { FreeShippingProgress } from "@/features/cart/components/free-shipping-progress";
import {
  OrderSummaryRows,
  summaryFromTotals,
} from "@/features/cart/components/order-summary-rows";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { EmptyState } from "@/components/shared/empty-state";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { formatPrice, toFaDigits } from "@/lib/format";
import { cartLineKey } from "@/features/cart/lib/cart-lines";
import { useCart, useCartTotals } from "@/features/cart/store/cart-store";

/** `recommendations` is a server-rendered slot shown when the cart is empty. */
export function CartView({
  recommendations,
}: {
  recommendations: React.ReactNode;
}) {
  const { items, totalItems, clearCart, coupon } = useCart();
  const totals = useCartTotals();

  if (items.length === 0) {
    return (
      <>
        <EmptyState
          icon={ShoppingBag}
          title="سبد خرید شما خالی است"
          description="می‌توانید برای مشاهده محصولات بیشتر به صفحات زیر بروید یا از پیشنهادهای ویژه ما دیدن کنید."
          className="py-20"
        >
          <Button size="lg" asChild>
            <Link href="/products">شروع خرید</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/dashboard/wishlist">علاقه‌مندی‌ها</Link>
          </Button>
        </EmptyState>
        <section aria-labelledby="cart-reco" className="mt-12">
          <SectionHeading
            id="cart-reco"
            title="پرفروش‌ترین‌های مُدا"
            href="/products"
          />
          {recommendations}
        </section>
      </>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <section aria-labelledby="cart-items" className="min-w-0">
        <div className="rounded-xl border border-border bg-card">
          <header className="flex items-center justify-between border-b border-border p-4">
            <h2 id="cart-items" className="text-base font-bold">
              کالاهای سبد{" "}
              <span className="text-sm font-normal text-muted-foreground">
                ({toFaDigits(totalItems)} کالا)
              </span>
            </h2>
            <ConfirmDialog
              trigger={
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 aria-hidden="true" /> حذف همه
                </Button>
              }
              title="خالی کردن سبد خرید"
              description="همه کالاها از سبد خرید شما حذف می‌شوند. آیا مطمئن هستید؟"
              confirmLabel="حذف همه"
              destructive
              onConfirm={clearCart}
            />
          </header>

          <FreeShippingProgress variant="page" />

          <ul className="divide-y divide-border px-4">
            {items.map((item, i) => (
              <li key={cartLineKey(item)} className="py-5">
                <CartLineItem item={item} eager={i === 0} />
              </li>
            ))}
          </ul>
        </div>

        <Button variant="ghost" asChild className="mt-4">
          <Link href="/products">
            <ArrowRight aria-hidden="true" /> ادامه خرید
          </Link>
        </Button>
      </section>

      <aside
        aria-label="خلاصه سفارش"
        className="lg:sticky lg:top-36 lg:self-start"
      >
        <div className="space-y-5 rounded-xl border border-border bg-card p-5">
          <h2 className="text-base font-bold">خلاصه سفارش</h2>
          <OrderSummaryRows values={summaryFromTotals(totals, coupon?.code)} />
          {totals.discount > 0 && (
            <p className="rounded-lg bg-sale/10 p-2.5 text-center text-xs font-medium text-sale">
              سود شما از این خرید:{" "}
              <span className="tabular-nums">
                {formatPrice(totals.discount)}
              </span>
            </p>
          )}
          <CouponForm idPrefix="cart" />
          <Button size="lg" asChild className="hidden w-full lg:flex">
            <Link href="/checkout">
              <Lock aria-hidden="true" /> ادامه فرایند خرید
            </Link>
          </Button>
          <p className="text-center text-[11px] leading-5 text-muted-foreground">
            کالاهای موجود در سبد رزرو نشده‌اند؛ برای ثبت سفارش، مراحل خرید را
            تکمیل کنید.
          </p>
        </div>
        <ul className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] text-muted-foreground">
          {[
            { icon: ShieldCheck, t: "پرداخت امن" },
            { icon: RotateCcw, t: "۷ روز بازگشت" },
            { icon: Truck, t: "ارسال سریع" },
          ].map(({ icon: Icon, t }) => (
            <li
              key={t}
              className="flex flex-col items-center gap-1 rounded-lg border border-border bg-card p-3"
            >
              <Icon className="h-5 w-5 text-primary" aria-hidden="true" /> {t}
            </li>
          ))}
        </ul>
      </aside>

      {/* Mobile sticky checkout */}
      <div className="fixed inset-x-0 bottom-16 z-30 border-t border-border bg-background/95 p-3 backdrop-blur-sm lg:hidden">
        <div className="container flex items-center gap-3 px-0">
          <div className="flex-1">
            <p className="text-[11px] text-muted-foreground">
              مبلغ قابل پرداخت
            </p>
            <p className="text-base font-bold tabular-nums">
              {formatPrice(totals.total)}
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/checkout">ادامه خرید</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
