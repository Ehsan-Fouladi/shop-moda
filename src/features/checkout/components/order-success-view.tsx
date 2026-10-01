"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CalendarClock,
  CheckCircle2,
  Copy,
  CreditCard,
  MapPin,
  Package,
  Truck,
} from "lucide-react";
import { toast } from "sonner";

import {
  parseLastOrder,
  readLastOrderRaw,
} from "@/features/checkout/lib/last-order";
import { paymentOptionMeta } from "@/features/checkout/lib/payment-options";
import type { OrderSnapshot } from "@/features/checkout/schemas/order-snapshot-schema";
import {
  OrderSummaryRows,
  summaryFromTotals,
} from "@/features/cart/components/order-summary-rows";
import { Button } from "@/components/ui/button";
import { formatDateFa, formatPrice, toFaDigits } from "@/lib/format";
import {
  estimatedDelivery,
  shippingMethods,
} from "@/features/cart/lib/pricing";
import { useMemo, useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/** `fallback` is shown when the page is opened directly (no fresh checkout in this session). */
export function OrderSuccessView({ fallback }: { fallback: OrderSnapshot }) {
  // sessionStorage is client-only: the server snapshot (undefined) renders the skeleton,
  // so SSR and hydration match; the stored order is read right after hydration.
  const raw = useSyncExternalStore(
    noopSubscribe,
    readLastOrderRaw,
    () => undefined,
  );
  const order = useMemo(
    () => (raw === undefined ? null : (parseLastOrder(raw) ?? fallback)),
    [raw, fallback],
  );

  if (!order) {
    return (
      <div
        className="mx-auto h-[520px] max-w-3xl animate-pulse rounded-2xl bg-muted"
        aria-busy="true"
        aria-label="در حال بارگذاری"
      />
    );
  }

  const eta = estimatedDelivery(order.placedAt, order.shippingMethod);
  const copy = () => {
    navigator.clipboard?.writeText(order.id).then(
      () => toast.success("شماره سفارش کپی شد"),
      () => {},
    );
  };

  return (
    <div className="mx-auto max-w-3xl">
      <section
        className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 text-center sm:p-10"
        aria-labelledby="success-title"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-success/10 to-transparent"
          aria-hidden="true"
        />
        <span className="relative mx-auto grid h-20 w-20 place-items-center rounded-full bg-success/15 text-success motion-safe:animate-in motion-safe:zoom-in-50 motion-safe:duration-500">
          <CheckCircle2 className="h-11 w-11" aria-hidden="true" />
        </span>
        <h1 id="success-title" className="relative mt-5 text-h1">
          سفارش شما با موفقیت ثبت شد
        </h1>
        <p className="relative mx-auto mt-2 max-w-md text-sm leading-7 text-muted-foreground">
          {order.name} عزیز، از خرید شما سپاسگزاریم. جزئیات سفارش به{" "}
          <span dir="ltr">{order.email}</span> ارسال شد و وضعیت آن را می‌توانید
          از حساب کاربری پیگیری کنید.
        </p>
        <div className="relative mt-5 inline-flex items-center gap-2 rounded-xl border border-dashed border-primary/40 bg-accent/40 px-4 py-2.5">
          <span className="text-sm text-muted-foreground">شماره سفارش:</span>
          <b className="text-lg tabular-nums" dir="ltr">
            {order.id}
          </b>
          <button
            onClick={copy}
            className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-card hover:text-foreground"
            aria-label="کپی شماره سفارش"
          >
            <Copy className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <dl className="relative mt-8 grid gap-3 text-start sm:grid-cols-3">
          {[
            { icon: CalendarClock, t: "تحویل تخمینی", v: formatDateFa(eta) },
            {
              icon: Truck,
              t: "روش ارسال",
              v: shippingMethods[order.shippingMethod].label,
            },
            {
              icon: CreditCard,
              t: "روش پرداخت",
              v: paymentOptionMeta[order.payment].summaryLabel,
            },
          ].map(({ icon: Icon, t, v }) => (
            <div
              key={t}
              className="flex items-start gap-3 rounded-xl bg-muted/50 p-4"
            >
              <Icon
                className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                aria-hidden="true"
              />
              <div>
                <dt className="text-xs text-muted-foreground">{t}</dt>
                <dd className="mt-0.5 text-sm font-bold">{v}</dd>
              </div>
            </div>
          ))}
        </dl>
      </section>

      <div className="mt-6 grid gap-6 md:grid-cols-[1fr_300px]">
        <section
          className="rounded-2xl border border-border bg-card p-5"
          aria-labelledby="success-items"
        >
          <h2
            id="success-items"
            className="mb-4 flex items-center gap-2 text-base font-bold"
          >
            <Package className="h-5 w-5 text-primary" aria-hidden="true" />{" "}
            کالاهای سفارش ({toFaDigits(order.items.length)})
          </h2>
          <ul className="divide-y divide-border">
            {order.items.map((i, idx) => (
              <li key={idx} className="flex items-center gap-3 py-3">
                <span
                  className="product-surface relative h-16 shrink-0 overflow-hidden rounded-md border border-border/60"
                  style={{ width: 52 }}
                >
                  <Image
                    src={i.image}
                    alt="order"
                    draggable="false"
                    fill
                    sizes="52px"
                    className="object-cover"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="line-clamp-1 text-sm font-medium">
                    {i.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    تعداد: {toFaDigits(i.quantity)}
                  </span>
                </span>
                <span className="text-sm font-bold tabular-nums">
                  {formatPrice(i.price * i.quantity)}
                </span>
              </li>
            ))}
          </ul>
          {order.address && (
            <p className="mt-4 flex items-start gap-2 rounded-lg bg-muted/50 p-3 text-xs leading-6 text-muted-foreground">
              <MapPin className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />{" "}
              {order.address}
            </p>
          )}
        </section>
        <section
          className="h-fit rounded-2xl border border-border bg-card p-5"
          aria-label="مبلغ سفارش"
        >
          <OrderSummaryRows values={summaryFromTotals(order.totals)} />
        </section>
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button size="lg" asChild>
          <Link href="/dashboard/orders">پیگیری سفارش</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/products">ادامه خرید</Link>
        </Button>
      </div>
    </div>
  );
}
