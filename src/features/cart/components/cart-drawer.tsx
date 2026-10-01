"use client";

import Link from "next/link";
import { ShoppingBag, ShoppingCart } from "lucide-react";

import { CartLineItem } from "@/features/cart/components/cart-line-item";
import { FreeShippingProgress } from "@/features/cart/components/free-shipping-progress";
import { OrderSummaryRows } from "@/features/cart/components/order-summary-rows";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toFaDigits } from "@/lib/format";
import { cartLineKey } from "@/features/cart/lib/cart-lines";
import { useCart } from "@/features/cart/store/cart-store";

/** Header cart icon + slide-in mini cart. */
export function CartButton() {
  const { totalItems, openCart } = useCart();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={openCart}
      className="relative"
      aria-label={`سبد خرید، ${toFaDigits(totalItems)} کالا`}
    >
      <ShoppingCart className="size-5!" aria-hidden="true" />
      {totalItems > 0 && (
        <span className="absolute -top-0.5 -inset-s-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground ring-2 ring-background tabular-nums">
          {toFaDigits(totalItems)}
        </span>
      )}
    </Button>
  );
}

export function CartDrawer() {
  const { items, isOpen, closeCart, subtotal, totalDiscount, totalItems } =
    useCart();

  return (
    <Sheet open={isOpen} onOpenChange={(o) => !o && closeCart()}>
      <SheetContent
        side="left"
        className="flex w-full flex-col gap-0 p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-border p-4 text-start">
          <SheetTitle className="text-base">
            سبد خرید{" "}
            {totalItems > 0 && (
              <span className="text-sm font-normal text-muted-foreground">
                ({toFaDigits(totalItems)} کالا)
              </span>
            )}
          </SheetTitle>
          <SheetDescription className="sr-only">
            خلاصه کالاهای سبد خرید
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 items-center p-6">
            <EmptyState
              icon={ShoppingBag}
              title="سبد خرید شما خالی است"
              description="محصولات مورد علاقه‌تان را پیدا کنید و به سبد اضافه کنید."
              className="w-full border-0 bg-transparent"
            >
              <Button asChild onClick={closeCart}>
                <Link href="/products">شروع خرید</Link>
              </Button>
            </EmptyState>
          </div>
        ) : (
          <>
            <FreeShippingProgress variant="drawer" />

            <ul className="flex-1 divide-y divide-border overflow-y-auto px-4">
              {items.map((item) => (
                <li key={cartLineKey(item)} className="py-4">
                  <CartLineItem item={item} compact />
                </li>
              ))}
            </ul>

            <SheetFooter className="flex-col gap-3 border-t border-border bg-card p-4 sm:flex-col sm:justify-start">
              <OrderSummaryRows
                values={{
                  subtotal: subtotal + totalDiscount,
                  discount: totalDiscount,
                  total: subtotal,
                }}
              />
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" asChild onClick={closeCart}>
                  <Link href="/cart">مشاهده سبد</Link>
                </Button>
                <Button asChild onClick={closeCart}>
                  <Link href="/checkout">ادامه و پرداخت</Link>
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
