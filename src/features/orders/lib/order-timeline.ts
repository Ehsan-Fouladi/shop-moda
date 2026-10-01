import type { Order, OrderStatus, TimelineStep } from "@/features/orders/types";

/** Build a UI timeline from an order's status (mock dates). */
export function getOrderTimeline(order: Order): TimelineStep[] {
  const steps = [
    "ثبت سفارش",
    "تأیید پرداخت",
    "آماده‌سازی",
    "تحویل به پست",
    "تحویل به مشتری",
  ];
  if (order.status === "cancelled") {
    return [
      { label: "ثبت سفارش", date: order.placedAt, done: true },
      {
        label: "لغو سفارش و استرداد وجه",
        date: order.placedAt,
        done: true,
        current: true,
      },
    ];
  }
  const reached: Record<Exclude<OrderStatus, "cancelled">, number> = {
    pending: 0,
    processing: 2,
    shipped: 3,
    delivered: 4,
  };
  const idx = reached[order.status];
  return steps.map((label, i) => ({
    label,
    date:
      i <= idx
        ? new Date(
            new Date(order.placedAt).getTime() + i * 86400000 * 0.8,
          ).toISOString()
        : undefined,
    done: i <= idx,
    current: i === idx,
  }));
}
