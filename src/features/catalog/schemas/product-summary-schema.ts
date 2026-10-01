import * as z from "zod/mini";

const nonNegative = () => z.number().check(z.nonnegative());

/** Validates product summaries read back from browser storage (never trust persisted JSON). */
export const productSummarySchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  brand: z.string(),
  price: nonNegative(),
  oldPrice: z.optional(nonNegative()),
  rating: z.number().check(z.gte(0), z.lte(5)),
  reviewCount: z.int().check(z.nonnegative()),
  images: z.array(z.string().check(z.startsWith("/"))).check(z.minLength(1)),
  badge: z.optional(z.enum(["new", "sale", "bestseller", "limited"])),
  status: z.enum(["in-stock", "low-stock", "out-of-stock"]),
  colors: z.optional(z.array(z.object({ name: z.string(), hex: z.string() }))),
  sizes: z.optional(z.array(z.string())),
});
