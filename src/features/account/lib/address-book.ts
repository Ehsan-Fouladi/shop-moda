import type { Address } from "@/features/account/types";

/** One-line postal address as shown on cards and in order summaries. */
export function formatAddress({
  province,
  city,
  street,
}: Pick<Address, "province" | "city" | "street">): string {
  return `${province}، ${city}، ${street}`;
}

/** Adds or replaces an address. A default address (or the only one) becomes the sole default. */
export function upsertAddress(list: Address[], address: Address): Address[] {
  const next = list.some((a) => a.id === address.id)
    ? list.map((a) => (a.id === address.id ? address : a))
    : [...list, address];
  return address.isDefault || next.length === 1
    ? next.map((a) => ({ ...a, isDefault: a.id === address.id }))
    : next;
}

/** Removes an address; if the default was removed, the first remaining address becomes default. */
export function removeAddress(list: Address[], id: string): Address[] {
  const next = list.filter((a) => a.id !== id);
  return next.length && !next.some((a) => a.isDefault)
    ? next.map((a, i) => (i === 0 ? { ...a, isDefault: true } : a))
    : next;
}

export function setDefaultAddress(list: Address[], id: string): Address[] {
  return list.map((a) => ({ ...a, isDefault: a.id === id }));
}
