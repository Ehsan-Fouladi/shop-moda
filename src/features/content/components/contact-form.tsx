"use client";

import { CheckCircle2, Send } from "lucide-react";

import { FormField, fieldAria } from "@/components/shared/form-field";
import {
  contactSchema,
  formContactData,
} from "@/features/content/schemas/contact-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const subjects = [
  "پیگیری سفارش",
  "بازگشت و تعویض کالا",
  "سؤال درباره محصول",
  "همکاری و فروش در مُدا",
  "پیشنهاد یا انتقاد",
  "سایر موارد",
];

/** UI-only contact form: client validation, loading and success states. */
export function ContactForm() {
  const [isSent, setIsSent] = useState<boolean>(false);

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<formContactData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      order: "",
      subject: "",
      message: "",
    },
  });

  if (isSent) {
    return (
      <div
        className="flex flex-col items-center gap-3 rounded-xl bg-success/10 p-8 text-center"
        role="status"
      >
        <CheckCircle2 className="h-12 w-12 text-success" aria-hidden="true" />
        <h3 className="text-lg font-bold">پیام شما دریافت شد</h3>
        <p className="max-w-sm text-sm leading-7 text-muted-foreground">
          کارشناسان پشتیبانی حداکثر تا ۲۴ ساعت کاری آینده از طریق ایمیل یا تلفن
          با شما تماس می‌گیرند.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            (reset(), setIsSent(false));
          }}
        >
          ارسال پیام دیگر
        </Button>
      </div>
    );
  }

  const onSubmit = async (data: formContactData) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsSent(true);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="grid gap-4 sm:grid-cols-2"
    >
      <FormField
        id="contact-name"
        label="نام و نام خانوادگی"
        required
        error={errors.name?.message}
      >
        <Input
          autoComplete="name"
          {...register("name")}
          {...fieldAria("contact-name", errors.name?.message)}
        />
      </FormField>
      <FormField
        id="contact-email"
        label="ایمیل"
        required
        error={errors.email?.message}
      >
        <Input
          type="email"
          dir="ltr"
          className="text-start"
          autoComplete="email"
          {...register("email")}
          {...fieldAria("contact-email", errors.email?.message)}
        />
      </FormField>
      <FormField
        id="contact-phone"
        label="شماره تماس"
        hint="اختیاری — برای تماس سریع‌تر"
      >
        <Input
          type="tel"
          dir="ltr"
          className="text-start"
          autoComplete="tel"
          {...register("phone")}
          {...fieldAria("contact-phone", null, true)}
        />
      </FormField>
      <FormField
        id="contact-subject"
        label="موضوع"
        required
        error={errors.subject?.message}
      >
        <Controller
          name="subject"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                {...fieldAria("contact-subject", errors.subject?.message)}
              >
                <SelectValue placeholder="انتخاب کنید" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </FormField>
      <FormField
        id="contact-order"
        label="شماره سفارش"
        hint="در صورت مرتبط بودن با سفارش"
        className="sm:col-span-2"
      >
        <Input
          dir="ltr"
          className="text-start"
          placeholder="MD-140582"
          {...register("order")}
          {...fieldAria("contact-order", null, true)}
        />
      </FormField>
      <FormField
        id="contact-message"
        label="متن پیام"
        required
        error={errors.message?.message}
        className="sm:col-span-2"
      >
        <Textarea
          rows={5}
          className="min-h-[140px]"
          {...register("message")}
          {...fieldAria("contact-message", errors.message?.message)}
        />
      </FormField>
      <div className="sm:col-span-2">
        <Button
          type="submit"
          size="lg"
          loading={isSubmitting}
          className="w-full sm:w-auto"
        >
          {!isSubmitting && <Send aria-hidden="true" />} ارسال پیام
        </Button>
      </div>
    </form>
  );
}
