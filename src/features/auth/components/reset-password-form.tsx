"use client";

import Link from "next/link";
import { CheckCircle2, KeyRound } from "lucide-react";
import { FormField, fieldAria } from "@/components/shared/form-field";
import { PasswordInput } from "@/components/shared/password-input";
import { Button } from "@/components/ui/button";
import { AuthHeader } from "@/features/auth/components/auth-header";
import { NewPasswordField } from "@/features/auth/components/new-password-field";
import {
  formRestPasswordData,
  resetPasswordSchema,
} from "@/features/auth/schemas/auth-schemas";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";

export function ResetPasswordForm() {
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<formRestPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      confirm: "",
      password: "",
    },
  });

  if (done) {
    return (
      <div className="text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/15 text-success">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </span>
        <h1 className="mt-5 text-h1">رمز عبور تغییر کرد</h1>
        <p
          className="mt-3 text-sm leading-7 text-muted-foreground"
          role="status"
        >
          اکنون می‌توانید با رمز عبور جدید وارد حساب کاربری خود شوید.
        </p>
        <Button asChild size="lg" className="mt-8 w-full">
          <Link href="/login">ورود به حساب</Link>
        </Button>
      </div>
    );
  }

  const onSubmit = async (data: formRestPasswordData) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 900));
    toast.success("گذرواژه شما با موفقیت تغییر کرد لطف مجدد وارد شوید");
    setDone(true);
  };

  return (
    <>
      <AuthHeader
        icon={<KeyRound className="h-6 w-6" aria-hidden="true" />}
        title="تعیین رمز عبور جدید"
        description="رمز عبور جدیدی انتخاب کنید که قبلاً از آن استفاده نکرده‌اید."
      />
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <NewPasswordField
              id="reset-password"
              name={field.name}
              label="رمز عبور جدید"
              value={field.value}
              onChange={field.onChange}
              error={errors.password?.message}
            />
          )}
        />
        <FormField
          id="reset-confirm"
          label="تکرار رمز عبور جدید"
          error={errors.confirm?.message}
        >
          <PasswordInput
            autoComplete="new-password"
            {...register("confirm")}
            {...fieldAria("reset-confirm", errors.confirm?.message)}
          />
        </FormField>
        <Button
          type="submit"
          size="lg"
          className="w-full"
          loading={isSubmitting}
        >
          ذخیره رمز عبور
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
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
