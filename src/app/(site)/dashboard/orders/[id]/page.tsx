import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CreditCard,
  Headphones,
  MapPin,
  Truck,
} from "lucide-react";

import { OrderSummaryRows } from "@/features/cart/components/order-summary-rows";
import { OrderActions } from "@/features/orders/components/order-actions";
import { Panel } from "@/features/account/components/dashboard-ui";
import { OrderTimeline } from "@/features/orders/components/order-timeline";
import {
  OrderStatusBadge,
  PaymentStatusBadge,
} from "@/features/orders/components/order-status-badge";
import { getOrder, orders } from "@/features/orders/data/orders";
import { getOrderTimeline } from "@/features/orders/lib/order-timeline";
import { products } from "@/features/catalog/data/products";
import { formatDateFa, formatPrice, toFaDigits } from "@/lib/format";

type Props = { params: Promise<{ id: string }> };

/** All params are known at build time; unknown ones 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return orders.map((o) => ({ id: o.id }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  return { title: `سفارش ${params.id}` };
}

export default async function OrderDetailsPage(props: Props) {
  const params = await props.params;
  const order = getOrder(params.id);
  if (!order) notFound();
  const productHref = (title: string) => {
    const p = products.find((x) => x.title === title);
    return p ? `/product/${p.slug}` : undefined;
  };

  return (
    <div className="space-y-5">
      <Link
        href="/dashboard/orders"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowRight className="h-4 w-4" aria-hidden="true" /> بازگشت به سفارش‌ها
      </Link>

      <header className="flex flex-wrap items-start justify-between gap-4 rounded-xl border border-border bg-card p-5">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-h2 font-extrabold">
              سفارش{" "}
              <span dir="ltr" className="tabular-nums">
                {order.id}
              </span>
            </h1>
            <OrderStatusBadge status={order.status} />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            ثبت‌شده در{" "}
            <time dateTime={order.placedAt}>
              {formatDateFa(order.placedAt, "full")}
            </time>{" "}
            • {toFaDigits(order.items.length)} قلم کالا
          </p>
        </div>
        <OrderActions status={order.status} />
      </header>

      <Panel title="وضعیت سفارش" id="od-status">
        <div className="p-5">
          <OrderTimeline
            steps={getOrderTimeline(order)}
            cancelled={order.status === "cancelled"}
          />
          {order.status === "shipped" && (
            <p className="mt-6 flex items-center gap-2 rounded-lg bg-info/10 p-3 text-sm text-info">
              <Truck className="h-5 w-5 shrink-0" aria-hidden="true" /> کد
              رهگیری پست: <b className="tabular-nums">۲۰۴۸۷۵۶۳۱۲</b>
            </p>
          )}
        </div>
      </Panel>

      <div className="grid gap-5 xl:grid-cols-[1fr_340px]">
        <Panel title="کالاهای سفارش" id="od-items">
          <ul className="divide-y divide-border">
            {order.items.map((item, i) => {
              const href = productHref(item.title);
              return (
                <li key={i} className="flex items-center gap-4 p-4">
                  <span className="product-surface relative h-24 w-20 shrink-0 overflow-hidden rounded-lg border border-border/60">
                    <Image
                      src={item.image}
                      alt="order"
                      draggable="false"
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    {href ? (
                      <Link
                        href={href}
                        className="line-clamp-2 text-sm font-medium hover:text-primary"
                      >
                        {item.title}
                      </Link>
                    ) : (
                      <p className="line-clamp-2 text-sm font-medium">
                        {item.title}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-muted-foreground">
                      تعداد: {toFaDigits(item.quantity)} • قیمت واحد:{" "}
                      <span className="tabular-nums">
                        {formatPrice(item.price)}
                      </span>
                    </p>
                  </div>
                  <p className="text-sm font-bold tabular-nums">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </li>
              );
            })}
          </ul>
        </Panel>

        <div className="space-y-5">
          <Panel title="خلاصه پرداخت" id="od-summary">
            <div className="p-5">
              <OrderSummaryRows
                values={{
                  subtotal: order.subtotal,
                  discount: order.discount,
                  shipping: order.shippingCost,
                  tax: order.tax,
                  total: order.total,
                }}
              />
            </div>
          </Panel>
          <Panel>
            <dl className="divide-y divide-border text-sm">
              <div className="flex gap-3 p-4">
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
                <div>
                  <dt className="text-xs text-muted-foreground">آدرس تحویل</dt>
                  <dd className="mt-1 leading-6">{order.shippingAddress}</dd>
                </div>
              </div>
              <div className="flex gap-3 p-4">
                <CreditCard
                  className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
                <div className="flex-1">
                  <dt className="text-xs text-muted-foreground">روش پرداخت</dt>
                  <dd className="mt-1 flex flex-wrap items-center justify-between gap-2">
                    {order.paymentMethod}{" "}
                    <PaymentStatusBadge status={order.paymentStatus} />
                  </dd>
                </div>
              </div>
              {order.estimatedDelivery && (
                <div className="flex gap-3 p-4">
                  <Truck
                    className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs text-muted-foreground">
                      {order.status === "delivered"
                        ? "تاریخ تحویل"
                        : "تحویل تخمینی"}
                    </dt>
                    <dd className="mt-1">
                      {formatDateFa(order.estimatedDelivery)}
                    </dd>
                  </div>
                </div>
              )}
            </dl>
          </Panel>
          <Link
            href="/contact"
            className="flex items-center gap-3 rounded-xl border border-dashed border-border p-4 text-sm hover:border-primary/40"
          >
            <Headphones className="h-5 w-5 text-primary" aria-hidden="true" />
            <span>
              مشکلی در این سفارش دارید؟{" "}
              <b className="text-primary">تماس با پشتیبانی</b>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
