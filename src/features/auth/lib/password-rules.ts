import { toFaDigits } from "@/lib/format";

/** Password strength rules shown in the strength meter and used by password schemas. */
export const passwordRules = [
  {
    test: (v: string) => v.length >= 8,
    label: `حداقل ${toFaDigits(8)} کاراکتر`,
  },
  {
    test: (v: string) => /[A-Z]/.test(v) && /[a-z]/.test(v),
    label: "حروف بزرگ و کوچک انگلیسی",
  },
  { test: (v: string) => /\d/.test(v), label: "حداقل یک عدد" },
  {
    test: (v: string) => /[^A-Za-z0-9]/.test(v),
    label: "یک نماد مانند ! یا @",
  },
] as const;

/** Number of satisfied rules (0–4). */
export function passwordScore(v: string): number {
  return passwordRules.filter((r) => r.test(v)).length;
}

/** Minimum score accepted for new passwords. */
export const MIN_PASSWORD_SCORE = 3;
