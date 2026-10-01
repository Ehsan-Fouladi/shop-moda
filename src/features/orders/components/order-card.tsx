import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { OrderStatusBadge } from "@/features/orders/components/order-status-badge";
import { isActiveOrder } from "@/features/orders/lib/order-status";
import type { Order } from "@/features/orders/types";
import { formatDateFa, formatPrice, toFaDigits } from "@/lib/format";

/** Compact order row/card used in overview and orders list. */
export function OrderCard({ order }: { order: Order }) {
  const count = order.items.reduce((s, i) => s + i.quantity, 0);
  return (
    <article className="rounded-xl border border-border bg-card transition hover:border-primary/30">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          <h3 className="font-bold tabular-nums" dir="ltr">
            {order.id}
          </h3>
          <time
            dateTime={order.placedAt}
            className="text-xs text-muted-foreground"
          >
            {formatDateFa(order.placedAt)}
          </time>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>
      <div className="flex flex-wrap items-center gap-4 p-4">
        <ul className="flex" aria-label={`${toFaDigits(count)} کالا`}>
          {order.items.slice(0, 4).map((i, idx) => (
            <li
              key={idx}
              className="product-surface relative -ms-3 h-16 overflow-hidden rounded-lg border-2 border-card first:ms-0"
              style={{ width: 52 }}
            >
              <Image
                src={i.image}
                alt={i.title}
                draggable="false"
                fill
                sizes="52px"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
        <dl className="flex flex-1 flex-wrap gap-x-6 gap-y-1 text-sm">
          <div>
            <dt className="text-xs text-muted-foreground">تعداد کالا</dt>
            <dd className="font-medium tabular-nums">{toFaDigits(count)}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">مبلغ کل</dt>
            <dd className="font-bold tabular-nums">
              {formatPrice(order.total)}
            </dd>
          </div>
          {order.estimatedDelivery && isActiveOrder(order.status) && (
            <div>
              <dt className="text-xs text-muted-foreground">تحویل تخمینی</dt>
              <dd className="font-medium">
                {formatDateFa(order.estimatedDelivery)}
              </dd>
            </div>
          )}
        </dl>
        <Link
          href={`/dashboard/orders/${order.id}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          جزئیات سفارش <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">{order.id}</span>
        </Link>
      </div>
    </article>
  );
}
