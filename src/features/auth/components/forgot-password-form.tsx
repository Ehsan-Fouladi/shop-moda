"use client";

import Link from "next/link";
import { toast } from "sonner";
import { KeyRound, MailCheck } from "lucide-react";

import { FormField, fieldAria } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthHeader } from "@/features/auth/components/auth-header";
import {
  forgotPasswordSchema,
  formForgotPasswordData,
} from "@/features/auth/schemas/auth-schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export function ForgotPasswordForm() {
  const [sentTo, setSentTo] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<formForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  if (sentTo) {
    return (
      <div className="text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/15 text-success">
          <MailCheck className="h-8 w-8" aria-hidden="true" />
        </span>
        <h1 className="mt-5 text-h1">ایمیل خود را بررسی کنید</h1>
        <p
          className="mt-3 text-sm leading-7 text-muted-foreground"
          role="status"
        >
          اگر حسابی با{" "}
          <b dir="ltr" className="text-foreground">
            {sentTo}
          </b>{" "}
          وجود داشته باشد، لینک بازیابی رمز عبور تا چند دقیقه دیگر ارسال می‌شود.
          پوشه اسپم را هم بررسی کنید.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <Button asChild size="lg">
            <Link href="/reset-password">ادامه (نمایش صفحه تغییر رمز)</Link>
          </Button>
          <Button variant="ghost" onClick={() => setSentTo(null)}>
            ارسال مجدد لینک
          </Button>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: formForgotPasswordData) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setSentTo(data.email);
    toast.success("لینک بازیابی رمز عبور ارسال شد.");
  };

  return (
    <>
      <AuthHeader
        icon={<KeyRound className="h-6 w-6" aria-hidden="true" />}
        title="بازیابی رمز عبور"
        description="ایمیل حساب کاربری خود را وارد کنید تا لینک تعیین رمز عبور جدید برایتان ارسال شود."
      />
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <FormField
          id="forgot-email"
          label="ایمیل"
          error={errors.email?.message}
        >
          <Input
            type="email"
            dir="ltr"
            className="text-start"
            autoComplete="email"
            {...register("email")}
            {...fieldAria("forgot-email", errors.email?.message)}
          />
        </FormField>
        <Button
          type="submit"
          size="lg"
          className="w-full"
          loading={isSubmitting}
        >
          ارسال لینک بازیابی
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        رمز خود را به یاد آوردید؟{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          بازگشت به ورود
        </Link>
      </p>
    </>
  );
}
