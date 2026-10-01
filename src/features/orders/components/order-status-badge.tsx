import { StatusBadge } from "@/components/shared/status-badge";
import {
  orderStatusMeta,
  paymentStatusMeta,
} from "@/features/orders/lib/order-status";
import type { OrderStatus, PaymentStatus } from "@/features/orders/types";

export function OrderStatusBadge({
  status,
  className,
}: {
  status: OrderStatus;
  className?: string;
}) {
  const m = orderStatusMeta[status];
  return (
    <StatusBadge tone={m.tone} className={className}>
      {m.label}
    </StatusBadge>
  );
}

export function PaymentStatusBadge({
  status,
  className,
}: {
  status: PaymentStatus;
  className?: string;
}) {
  const m = paymentStatusMeta[status];
  return (
    <StatusBadge tone={m.tone} className={className}>
      {m.label}
    </StatusBadge>
  );
}
