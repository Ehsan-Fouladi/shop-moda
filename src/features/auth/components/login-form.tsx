"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { toast } from "sonner";

import { FormField, fieldAria } from "@/components/shared/form-field";
import { PasswordInput } from "@/components/shared/password-input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthHeader } from "@/features/auth/components/auth-header";
import { SocialAuthButtons } from "@/features/auth/components/social-auth-buttons";
import {
  formLoginData,
  loginSchema,
} from "@/features/auth/schemas/auth-schemas";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<formLoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
      remember: true,
    },
  });

  const onSubmit = async (data: formLoginData) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setTimeout(() => {
      toast.success("خوش آمدید، سارا!");
      router.push("/dashboard");
    }, 900);
  };

  return (
    <>
      <AuthHeader
        icon={<LogIn className="h-6 w-6" aria-hidden="true" />}
        title="ورود به حساب کاربری"
        description={
          <>
            حساب کاربری ندارید؟{" "}
            <Link
              href="/register"
              className="font-medium text-primary hover:underline"
            >
              ثبت‌نام کنید
            </Link>
          </>
        }
      />
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <FormField
          id="login-identifier"
          label="ایمیل یا شماره موبایل"
          error={errors.identifier?.message}
        >
          <Input
            dir="ltr"
            className="text-start"
            autoComplete="username"
            placeholder="09123456789"
            {...register("identifier")}
            {...fieldAria("login-identifier", errors.identifier?.message)}
          />
        </FormField>
        <FormField
          id="login-password"
          label="رمز عبور"
          error={errors.password?.message}
          labelAside={
            <Link
              href="/forgot-password"
              className="text-xs text-primary hover:underline"
            >
              رمز عبور را فراموش کرده‌اید؟
            </Link>
          }
        >
          <PasswordInput
            autoComplete="current-password"
            {...register("password")}
            {...fieldAria("login-password", errors.password?.message)}
          />
        </FormField>
        <div className="flex items-center gap-2">
          <Controller
            name="remember"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="login-remember"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="login-remember" className="font-normal">
            مرا به خاطر بسپار
          </Label>
        </div>
        <Button
          type="submit"
          size="lg"
          className="w-full"
          loading={isSubmitting}
        >
          ورود
        </Button>
      </form>
      <SocialAuthButtons />
    </>
  );
}
