"use client";

import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import * as z from "zod/mini";
import { zodResolver } from "@hookform/resolvers/zod";
import { fieldAria } from "./form-field";
import { useState } from "react";

const newsletterSchema = z.object({
  email: z.string().check(z.email("لطفاً یک ایمیل معتبر وارد کنید.")),
});

type formNewsletterData = z.infer<typeof newsletterSchema>;

/** Newsletter signup — UI only: validates format client-side and shows a success state. */
export function NewsletterForm({
  idPrefix,
  className,
}: {
  idPrefix: string;
  className?: string;
}) {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<formNewsletterData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const inputId = `${idPrefix}-newsletter-email`;

  const onSubmit = async (data: formNewsletterData) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <p
        className={cn(
          "flex items-center gap-2 rounded-lg bg-success/10 p-3 text-sm text-success",
          className,
        )}
        role="status"
      >
        <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
        عضویت شما با موفقیت ثبت شد.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={cn("space-y-1.5", className)}
    >
      <label htmlFor={inputId} className="sr-only">
        ایمیل
      </label>
      <div className="flex gap-2">
        <Input
          type="email"
          dir="ltr"
          placeholder="email@example.com"
          className="text-start placeholder:text-end"
          {...register("email")}
          {...fieldAria(inputId, errors.email?.message)}
        />
        <Button type="submit" loading={isSubmitting} className="shrink-0">
          عضویت
        </Button>
      </div>
      {errors.email?.message && (
        <p
          id={`${inputId}-error`}
          className="text-xs text-destructive"
          role="alert"
        >
          {errors.email.message}
        </p>
      )}
    </form>
  );
}
