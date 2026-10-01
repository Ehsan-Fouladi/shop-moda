import * as z from "zod/mini";

import {
  emailField,
  iranMobileField,
  minText,
  requiredText,
} from "@/lib/form-schema";
import { normalizeAmountInput } from "@/features/account/lib/wallet-top-up";
import { formatPrice } from "@/lib/format";
import { digitsOf } from "@/lib/validation";

export type formPaymentCard = z.infer<typeof paymentCardSchema>;
export type formWalletTopUpData = z.infer<typeof walletTopUpSchema>;
export type formAddressData = z.infer<typeof addressSchema>;
export type formProfileData = z.infer<typeof profileSchema>;

export const profileSchema = z.object({
  firstName: requiredText("نام را وارد کنید."),
  lastName: requiredText("نام خانوادگی را وارد کنید."),
  email: emailField("ایمیل معتبر وارد کنید."),
  phone: iranMobileField("شماره موبایل معتبر وارد کنید."),
  birthDate: z.optional(z.string()),
  gender: z.optional(z.enum(["female", "male", "none"])),
});

export const addressSchema = z.object({
  title: requiredText("عنوان آدرس را وارد کنید."),
  receiver: requiredText("نام گیرنده را وارد کنید."),
  phone: iranMobileField("شماره موبایل معتبر وارد کنید."),
  province: requiredText("استان را انتخاب کنید."),
  city: requiredText("شهر را وارد کنید."),
  street: minText(10, "آدرس کامل را وارد کنید."),
  postalCode: requiredText("کد پستی را وارد کنید."),
  isDefault: z.boolean(),
});

export const paymentCardSchema = z.object({
  number: z
    .pipe(z.string(), z.transform(digitsOf))
    .check(z.refine((v) => v.length === 16, "شماره کارت باید ۱۶ رقم باشد.")),
  holder: requiredText("نام دارنده کارت را وارد کنید."),
  exp: z
    .string()
    .check(z.trim(), z.regex(/^\d{2}\/\d{2}$/, "به شکل MM/YY وارد کنید.")),
});

/** Wallet top-up limits, in Toman. */
export const WALLET_TOP_UP_MIN = 10_000;
export const WALLET_TOP_UP_MAX = 50_000_000;

export const walletTopUpSchema = z.object({
  amount: z.pipe(z.string(), z.transform(normalizeAmountInput)).check(
    z.minLength(1, "مبلغ شارژ را وارد کنید."),
    z.regex(/^\d*$/, "مبلغ را فقط با عدد و به تومان وارد کنید."),
    z.refine(
      (v) => Number(v) >= WALLET_TOP_UP_MIN,
      `حداقل مبلغ شارژ ${formatPrice(WALLET_TOP_UP_MIN)} است.`,
    ),
    z.refine(
      (v) => Number(v) <= WALLET_TOP_UP_MAX,
      `حداکثر مبلغ شارژ ${formatPrice(WALLET_TOP_UP_MAX)} است.`,
    ),
  ),
});
