import * as z from "zod/mini";

import {
  acceptedCheckbox,
  emailField,
  minText,
  requiredText,
} from "@/lib/form-schema";
import { digitsOf } from "@/lib/validation";

export const paymentOptions = ["card", "cod", "installment"] as const;
export type PaymentOption = (typeof paymentOptions)[number];

const notRequired = z.optional(z.string());

/**
 * Checkout validation. Address fields apply only to a new address and the card number only to
 * card payment (otherwise they are optional and never fail); fields are declared in on-screen
 * order so the first error gets focus.
 */
export function createCheckoutSchema({
  newAddress,
  payByCard,
}: {
  newAddress: boolean;
  payByCard: boolean;
}) {
  return z.object({
    firstName: requiredText("نام را وارد کنید."),
    lastName: requiredText("نام خانوادگی را وارد کنید."),
    email: emailField("ایمیل معتبر وارد کنید."),
    phone: z.string().check(
      z.trim(),
      z.refine(
        (v) => digitsOf(v).length >= 10,
        "شماره موبایل معتبر وارد کنید.",
      ),
    ),
    province: newAddress ? requiredText("استان را انتخاب کنید.") : notRequired,
    city: newAddress ? requiredText("شهر را وارد کنید.") : notRequired,
    address: newAddress ? minText(10, "آدرس کامل را وارد کنید.") : notRequired,
    postalCode: newAddress
      ? requiredText("کد پستی را وارد کنید.")
      : notRequired,
    cardNumber: payByCard
      ? z
          .string()
          .check(
            z.refine(
              (v) => digitsOf(v).length >= 16,
              "شماره کارت ۱۶ رقمی را وارد کنید.",
            ),
          )
      : notRequired,
    terms: acceptedCheckbox("برای ثبت سفارش، پذیرش قوانین الزامی است."),
  });
}
