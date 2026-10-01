"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  CheckboxField,
  FormField,
  fieldAria,
} from "@/components/shared/form-field";
import { PasswordInput } from "@/components/shared/password-input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthHeader } from "@/features/auth/components/auth-header";
import { NewPasswordField } from "@/features/auth/components/new-password-field";
import { SocialAuthButtons } from "@/features/auth/components/social-auth-buttons";
import {
  formRegisterData,
  registerSchema,
} from "@/features/auth/schemas/auth-schemas";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function RegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<formRegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirm: "",
      terms: false,
      newsletter: false,
    },
  });

  const passwordValue = useWatch({
    control,
    name: "password",
    defaultValue: "",
  });

  const onSubmit = async (data: formRegisterData) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setTimeout(() => {
      toast.success("ثبت نام شما با موفقیت انجام شد");
      router.push("/dashboard");
    }, 900);
  };

  return (
    <>
      <AuthHeader
        title="ساخت حساب کاربری"
        description={
          <>
            قبلاً ثبت‌نام کرده‌اید؟{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              وارد شوید
            </Link>
          </>
        }
      />
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <FormField
          id="reg-name"
          label="نام و نام خانوادگی"
          required
          error={errors.name?.message}
        >
          <Input
            autoComplete="name"
            {...register("name")}
            {...fieldAria("reg-name", errors.name?.message)}
          />
        </FormField>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            id="reg-phone"
            label="شماره موبایل"
            required
            error={errors.phone?.message}
          >
            <Input
              type="tel"
              dir="ltr"
              className="text-start"
              autoComplete="tel"
              placeholder="09123456789"
              {...register("phone")}
              {...fieldAria("reg-phone", errors.phone?.message)}
            />
          </FormField>
          <FormField
            id="reg-email"
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
              {...fieldAria("reg-email", errors.email?.message)}
            />
          </FormField>
        </div>
        <NewPasswordField
          id="reg-password"
          name="password"
          label="رمز عبور"
          required
          value={passwordValue}
          onChange={(val) =>
            setValue("password", val, { shouldValidate: true })
          }
          error={errors.password?.message}
        />
        <FormField
          id="reg-confirm"
          label="تکرار رمز عبور"
          required
          error={errors.confirm?.message}
        >
          <PasswordInput
            autoComplete="new-password"
            {...register("confirm")}
            {...fieldAria("reg-confirm", errors.confirm?.message)}
          />
        </FormField>
        <Controller
          name="terms"
          control={control}
          render={({ field }) => (
            <CheckboxField
              id="reg-terms"
              name="terms"
              error={errors.terms?.message}
              checked={Boolean(field.value)}
              onCheckedChange={field.onChange}
              label={
                <>
                  <Link href="/terms" className="text-primary hover:underline">
                    قوانین و مقررات
                  </Link>{" "}
                  مُدا را خوانده‌ام و می‌پذیرم.
                </>
              }
            />
          )}
        />
        <div className="flex items-center gap-2">
          <Controller
            name="newsletter"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="reg-news"
                name="newsletter"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="reg-news" className="font-normal">
            دریافت پیشنهادهای ویژه و خبرنامه
          </Label>
        </div>
        <Button
          type="submit"
          size="lg"
          className="w-full"
          loading={isSubmitting}
        >
          ثبت‌نام
        </Button>
      </form>
      <SocialAuthButtons />
    </>
  );
}
