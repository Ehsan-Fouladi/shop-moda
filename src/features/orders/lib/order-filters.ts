import { isActiveOrder } from "@/features/orders/lib/order-status";
import type { Order, OrderStatus } from "@/features/orders/types";

/** Status tabs of the orders list (`?status=` values). */
export const orderTabs = [
  { id: "all", label: "همه", match: () => true },
  { id: "active", label: "جاری", match: isActiveOrder },
  { id: "delivered", label: "تحویل شده", match: (s) => s === "delivered" },
  { id: "cancelled", label: "لغو شده", match: (s) => s === "cancelled" },
] as const satisfies readonly {
  id: string;
  label: string;
  match: (s: OrderStatus) => boolean;
}[];

type OrderTab = (typeof orderTabs)[number];

/** The tab for a `?status=` value; unknown or missing values fall back to "all". */
export function parseOrderTab(value: string | null): OrderTab {
  return orderTabs.find((t) => t.id === value) ?? orderTabs[0];
}

export function countOrders(orders: Order[], tab: OrderTab): number {
  return orders.filter((o) => tab.match(o.status)).length;
}

/** Orders in the tab matching the query by order number (case-insensitive) or item title. */
export function filterOrders(
  orders: Order[],
  tab: OrderTab,
  query: string,
): Order[] {
  const q = query.trim();
  const needle = q.toUpperCase();
  return orders.filter(
    (o) =>
      tab.match(o.status) &&
      (!needle ||
        o.id.includes(needle) ||
        o.items.some((i) => i.title.includes(q))),
  );
}
