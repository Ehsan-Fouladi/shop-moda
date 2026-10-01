import { toLatinDigits } from "@/lib/format";

/*
 * Plain validation predicates (no schema library), safe for any bundle — e.g. the footer
 * newsletter form that renders on every page. Zod-based builders live in `lib/form-schema.ts`.
 * Persian/Arabic digits are normalised before numeric checks.
 */

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Digits only (after Persian/Arabic → Latin normalisation). */
export const digitsOf = (v: string) => toLatinDigits(v).replace(/\D/g, "");

/** 11-digit Iranian mobile number (09xxxxxxxxx), Latin or Persian digits. */
export const isIranMobile = (v: string) => /^09\d{9}$/.test(digitsOf(v));

export type FieldErrors = Record<string, string>;

/** FormData → plain object of string values (files are ignored). */
export function formDataToRecord(data: FormData): Record<string, string> {
  const out: Record<string, string> = {};
  data.forEach((value, key) => {
    if (typeof value === "string") out[key] = value;
  });
  return out;
}
