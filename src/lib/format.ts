/**
 * Persian formatting helpers (UI-only — no business logic).
 */

const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/** Convert Latin digits in a string to Persian digits. */
export function toFaDigits(input: string | number): string {
  return String(input).replace(/\d/g, (d) => FA_DIGITS[Number(d)]);
}

/** Convert Persian (۰-۹) and Arabic-Indic (٠-٩) digits to Latin digits — normalises user input. */
export function toLatinDigits(input: string): string {
  return input
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660));
}

/** Group a number with separators and Persian digits: 1234567 → ۱,۲۳۴,۵۶۷ */
export function formatNumber(value: number): string {
  return toFaDigits(new Intl.NumberFormat("en-US").format(value));
}

/** Format a price in Toman: 1234567 → ۱,۲۳۴,۵۶۷ تومان */
export function formatPrice(value: number): string {
  return `${formatNumber(Math.round(value))} تومان`;
}

/** Discount percentage between old and current price: 25 → ۲۵٪ */
export function discountPercent(price: number, oldPrice?: number): number {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

/** Format an ISO date as a Persian (Jalali) date string. */
export function formatDateFa(
  iso: string,
  style: "full" | "medium" | "short" = "medium",
): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  if (style === "short") {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  }
  if (style === "full") {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    }).format(date);
  }
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/**
 * Short relative time in Persian (e.g. ۲ ساعت پیش) for notifications. Pass the server's `now`
 * when the text is prerendered, so server and client produce the same string.
 */
export function timeAgoFa(iso: string, now: number = Date.now()): string {
  const rtf = new Intl.RelativeTimeFormat("fa-IR", { numeric: "auto" });
  const diffMs = new Date(iso).getTime() - now;
  const minutes = Math.round(diffMs / 60000);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  if (Math.abs(days) >= 1) return rtf.format(days, "day");
  if (Math.abs(hours) >= 1) return rtf.format(hours, "hour");
  return rtf.format(minutes, "minute");
}
