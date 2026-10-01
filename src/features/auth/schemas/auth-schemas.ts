import * as z from "zod/mini";

import {
  MIN_PASSWORD_SCORE,
  passwordScore,
} from "@/features/auth/lib/password-rules";
import {
  acceptedCheckbox,
  emailField,
  iranMobileField,
  minText,
} from "@/lib/form-schema";
import { EMAIL_RE, isIranMobile } from "@/lib/validation";

const strongPassword = z
  .string()
  .check(
    z.refine(
      (v) => passwordScore(v) >= MIN_PASSWORD_SCORE,
      "رمز عبور قوی‌تری انتخاب کنید.",
    ),
  );
const CONFIRM_MISMATCH = "تکرار رمز عبور مطابقت ندارد.";

export type formLoginData = z.infer<typeof loginSchema>;
export type formRegisterData = z.infer<typeof registerSchema>;
export type formForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
export type formRestPasswordData = z.infer<typeof resetPasswordSchema>;
export type formChangePasswordData = z.infer<typeof changePasswordSchema>;

export const loginSchema = z.object({
  identifier: z.string().check(
    z.trim(),
    z.refine(
      (v) => EMAIL_RE.test(v) || isIranMobile(v),
      "ایمیل یا شماره موبایل معتبر وارد کنید.",
    ),
  ),
  password: z
    .string()
    .check(z.minLength(6, "رمز عبور را وارد کنید (حداقل ۶ کاراکتر).")),
  remember: z.boolean(),
});

export const registerSchema = z
  .object({
    name: minText(3, "نام و نام خانوادگی را وارد کنید."),
    phone: iranMobileField("شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود."),
    email: emailField("ایمیل معتبر وارد کنید."),
    password: strongPassword,
    confirm: z.string(),
    terms: acceptedCheckbox("پذیرش قوانین الزامی است."),
    newsletter: z.boolean(),
  })
  .check(
    z.refine((v) => v.confirm === v.password, {
      path: ["confirm"],
      message: CONFIRM_MISMATCH,
    }),
  );

export const forgotPasswordSchema = z.object({
  email: emailField("ایمیل معتبر وارد کنید."),
});

export const resetPasswordSchema = z
  .object({ password: strongPassword, confirm: z.string() })
  .check(
    z.refine((v) => v.confirm === v.password, {
      path: ["confirm"],
      message: CONFIRM_MISMATCH,
    }),
  );

export const changePasswordSchema = z
  .object({
    current: z.string().check(z.minLength(6, "رمز عبور فعلی را وارد کنید.")),
    new: strongPassword,
    confirm: z.string(),
  })
  .check(
    z.refine((v) => v.confirm === v.new, {
      path: ["confirm"],
      message: CONFIRM_MISMATCH,
    }),
  );
