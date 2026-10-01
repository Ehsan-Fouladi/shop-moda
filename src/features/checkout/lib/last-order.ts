import {
  orderSnapshotSchema,
  type OrderSnapshot,
} from "@/features/checkout/schemas/order-snapshot-schema";

const LAST_ORDER_KEY = "moda-last-order";

export function saveLastOrder(snapshot: OrderSnapshot): void {
  try {
    sessionStorage.setItem(LAST_ORDER_KEY, JSON.stringify(snapshot));
  } catch {
    // storage unavailable → success page falls back to the demo order
  }
}

/** Raw stored value (a stable string, safe as a `useSyncExternalStore` snapshot). */
export function readLastOrderRaw(): string | null {
  try {
    return sessionStorage.getItem(LAST_ORDER_KEY);
  } catch {
    return null;
  }
}

/** Validates a stored snapshot; returns null when missing or malformed. */
export function parseLastOrder(raw: string | null): OrderSnapshot | null {
  if (!raw) return null;
  try {
    const parsed = orderSnapshotSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

export function readLastOrder(): OrderSnapshot | null {
  return parseLastOrder(readLastOrderRaw());
}
