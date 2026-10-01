import type { OrderStatus, PaymentStatus } from "@/features/orders/types";

export const orderStatusMeta: Record<
  OrderStatus,
  { label: string; tone: "neutral" | "info" | "warning" | "success" | "danger" }
> = {
  pending: { label: "در انتظار تأیید", tone: "neutral" },
  processing: { label: "در حال آماده‌سازی", tone: "warning" },
  shipped: { label: "ارسال شده", tone: "info" },
  delivered: { label: "تحویل شده", tone: "success" },
  cancelled: { label: "لغو شده", tone: "danger" },
};
export const paymentStatusMeta: Record<
  PaymentStatus,
  { label: string; tone: "success" | "warning" | "neutral" }
> = {
  paid: { label: "پرداخت شده", tone: "success" },
  unpaid: { label: "در انتظار پرداخت", tone: "warning" },
  refunded: { label: "مسترد شده", tone: "neutral" },
};

const activeOrderStatuses: readonly OrderStatus[] = [
  "pending",
  "processing",
  "shipped",
];

/** An order is "active" (جاری) until it is delivered or cancelled. */
export function isActiveOrder(status: OrderStatus): boolean {
  return activeOrderStatuses.includes(status);
}

/** Cancellation is possible until the order has been shipped. */
export function canCancelOrder(status: OrderStatus): boolean {
  return status === "pending" || status === "processing";
}

export function canRequestReturn(status: OrderStatus): boolean {
  return status === "delivered";
}

/** Finished orders (delivered or cancelled) offer "buy again". */
export function canReorder(status: OrderStatus): boolean {
  return status === "delivered" || status === "cancelled";
}
