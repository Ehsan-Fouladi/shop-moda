import { toLatinDigits } from "@/lib/format";

/** Accepts Persian/Latin digits with optional thousands separators or spaces; yields the remaining characters (digits when valid). */
export function normalizeAmountInput(value: string): string {
  return toLatinDigits(value).replace(/[\s,٬،]/g, "");
}

/** The amount typed so far, or null while it is not a plain number (validation happens on submit). */
export function parseAmountInput(value: string): number | null {
  const digits = normalizeAmountInput(value);
  return /^\d+$/.test(digits) ? Number(digits) : null;
}

/**
 * Integration seam for wallet top-ups.
 *
 * The storefront has no payment backend yet, so this never pretends a payment happened: it
 * reports the gateway as unavailable and the UI tells the user their balance is unchanged.
 * When a backend exists, replace the body with the call that creates a payment session and
 * return its gateway URL — the form already redirects on `{ ok: true }`.
 */
export type WalletTopUpResult =
  | { ok: true; redirectUrl: string }
  | { ok: false; error: "gateway-unavailable" };

export async function requestWalletTopUp(
  _amount: number,
): Promise<WalletTopUpResult> {
  return { ok: false, error: "gateway-unavailable" };
}
