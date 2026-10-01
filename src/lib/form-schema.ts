import * as z from "zod/mini";

import { EMAIL_RE, isIranMobile, type FieldErrors } from "@/lib/validation";

/*
 * Zod field builders and form parsing shared by every feature form schema.
 * Uses the tree-shakable `zod/mini` API (≈5 kB gzip vs ≈25 kB for classic zod) because every
 * schema here runs in the browser. Kept separate from `lib/validation.ts` so zod only ships
 * with routes that render a form.
 */

/* ---------- field builders ---------- */

export const requiredText = (message: string) =>
  z.string().check(z.trim(), z.minLength(1, message));
export const minText = (min: number, message: string) =>
  z.string().check(z.trim(), z.minLength(min, message));
export const emailField = (message: string) =>
  z.string().check(z.trim(), z.regex(EMAIL_RE, message));
export const iranMobileField = (message: string) =>
  z.string().check(z.trim(), z.refine(isIranMobile, message));
/**
 * Checkbox submitted via FormData: present (with its `value`, "on" by default) when checked,
 * absent otherwise. Any non-empty value counts as checked, matching the original `!!data.get()`.
 */
export const acceptedCheckbox = (message: string) =>
  z
    .unknown()
    .check(z.refine((v) => v === true || v === "true" || v === "on", message));

/* ---------- form helpers ---------- */

/** First error message per top-level field, in schema order. */
function toFieldErrors(error: {
  issues: readonly { path: readonly PropertyKey[]; message: string }[];
}): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!(key in errors)) errors[key] = issue.message;
  }
  return errors;
}

type FormParseResult<T> =
  | { success: true; data: T; errors: FieldErrors }
  | { success: false; errors: FieldErrors };

/** Re-orders errors to follow the schema's field order (refinement errors land on their field). */
function orderByShape(errors: FieldErrors, schema: z.ZodMiniType): FieldErrors {
  if (!(schema instanceof z.ZodMiniObject)) return errors;
  const order = Object.keys(schema.shape);
  const rank = (k: string) =>
    order.includes(k) ? order.indexOf(k) : order.length;
  return Object.fromEntries(
    Object.entries(errors).sort(([a], [b]) => rank(a) - rank(b)),
  );
}

/**
 * Validates form input with a schema and returns field errors in a UI-friendly shape.
 * Error keys follow on-screen (schema) order so callers can focus the first invalid field.
 */
export function parseForm<S extends z.ZodMiniType>(
  schema: S,
  input: unknown,
): FormParseResult<z.output<S>> {
  const result = schema.safeParse(input);
  return result.success
    ? { success: true, data: result.data, errors: {} }
    : {
        success: false,
        errors: orderByShape(toFieldErrors(result.error), schema),
      };
}
