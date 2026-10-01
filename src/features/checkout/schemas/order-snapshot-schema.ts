import * as z from "zod/mini";

import { SHIPPING_METHODS, type Totals } from "@/features/cart/lib/pricing";
import { paymentOptions } from "@/features/checkout/schemas/checkout-schema";

/** The order summary handed from checkout to the success page via sessionStorage. */
export const orderSnapshotSchema = z.object({
  id: z.string(),
  placedAt: z.iso.datetime(),
  name: z.string(),
  email: z.string(),
  phone: z.optional(z.string()),
  address: z.optional(z.string()),
  shippingMethod: z.enum(SHIPPING_METHODS),
  payment: z.enum(paymentOptions),
  items: z.array(
    z.object({
      title: z.string(),
      image: z.string().check(z.startsWith("/")),
      quantity: z.int().check(z.positive()),
      price: z.number(),
    }),
  ),
  totals: z.object({
    listSubtotal: z.number(),
    productDiscount: z.number(),
    couponDiscount: z.number(),
    discount: z.number(),
    shipping: z.number(),
    tax: z.number(),
    total: z.number(),
  }) satisfies z.ZodMiniType<Totals>,
});
export type OrderSnapshot = z.infer<typeof orderSnapshotSchema>;
