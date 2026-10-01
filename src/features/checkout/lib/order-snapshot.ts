import { formatAddress } from "@/features/account/lib/address-book";
import type { Address } from "@/features/account/types";
import type { ShippingMethod, Totals } from "@/features/cart/lib/pricing";
import type { CartItem } from "@/features/cart/types";
import type { PaymentOption } from "@/features/checkout/schemas/checkout-schema";
import type { OrderSnapshot } from "@/features/checkout/schemas/order-snapshot-schema";

interface CheckoutValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  /** Present only when a new address was entered. */
  province?: string;
  city?: string;
  address?: string;
}

interface SnapshotInput {
  values: CheckoutValues;
  /** Id of the chosen saved address, or "new". */
  addressId: string;
  addresses: Address[];
  items: CartItem[];
  shippingMethod: ShippingMethod;
  payment: PaymentOption;
  totals: Totals;
}

/** Delivery address line: the newly entered address, or the chosen saved one. */
function deliveryAddress({
  values,
  addressId,
  addresses,
}: SnapshotInput): string | undefined {
  const { province, city, address } = values;
  if (province !== undefined && city !== undefined && address !== undefined)
    return formatAddress({ province, city, street: address });
  const saved = addresses.find((a) => a.id === addressId);
  return saved && formatAddress(saved);
}

/** UI-only order record handed to the success page (no order is actually placed). */
export function buildOrderSnapshot(
  input: SnapshotInput,
  now: Date = new Date(),
): OrderSnapshot {
  const { values, items, shippingMethod, payment, totals } = input;
  return {
    id: `MD-${Math.floor(140700 + Math.random() * 200)}`,
    placedAt: now.toISOString(),
    name: `${values.firstName} ${values.lastName}`,
    email: values.email,
    phone: values.phone,
    address: deliveryAddress(input),
    shippingMethod,
    payment,
    items: items.map((i) => ({
      title: i.product.title,
      image: i.product.images[0],
      quantity: i.quantity,
      price: i.product.price,
    })),
    totals,
  };
}
