import * as z from "zod/mini";

import { emailField, minText, requiredText } from "@/lib/form-schema";

export type formContactData = z.infer<typeof contactSchema>;

export const contactSchema = z.object({
  name: minText(2, "نام و نام خانوادگی را وارد کنید."),
  email: emailField("ایمیل معتبر وارد کنید."),
  phone: z.optional(z.string()),
  order: z.optional(z.string()),
  subject: requiredText("موضوع پیام را انتخاب کنید."),
  message: minText(10, "متن پیام باید حداقل ۱۰ کاراکتر باشد."),
});
