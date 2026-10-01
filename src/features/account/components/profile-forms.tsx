"use client";

import { Camera, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { PasswordInput } from "@/components/shared/password-input";
import { NewPasswordField } from "@/features/auth/components/new-password-field";
import {
  changePasswordSchema,
  formChangePasswordData,
} from "@/features/auth/schemas/auth-schemas";
import {
  formProfileData,
  profileSchema,
} from "@/features/account/schemas/account-schemas";
import type { UserProfile } from "@/features/account/types";
import { Panel } from "@/features/account/components/dashboard-ui";
import { FormField, fieldAria } from "@/components/shared/form-field";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function ProfileForm({ user: currentUser }: { user: UserProfile }) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<formProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: currentUser.firstName ?? "",
      lastName: currentUser.lastName ?? "",
      phone: currentUser.phone ?? "",
      email: currentUser.email ?? "",
      birthDate: currentUser.birthDate ?? "۱۳۷۳/۰۲/۲۸",
      gender: "female",
    },
  });

  const onSubmit = async (data: formProfileData) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 800));
    reset(data);
    toast.success("اطلاعات حساب ذخیره شد");
  };

  return (
    <Panel title="اطلاعات شخصی" id="pf-title">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-5">
        <div className="mb-6 flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-primary text-xl font-bold text-primary-foreground">
                {currentUser.initials}
              </AvatarFallback>
            </Avatar>
            <button
              type="button"
              className="absolute -bottom-1 -inset-e-1 grid h-8 w-8 place-items-center rounded-full border-2 border-card bg-foreground text-background"
              aria-label="تغییر تصویر پروفایل"
              onClick={() =>
                toast.info("بارگذاری تصویر در نسخه نمایشی فعال نیست")
              }
            >
              <Camera className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <div>
            <p className="font-bold">
              {currentUser.firstName} {currentUser.lastName}
            </p>
            <p className="text-xs text-muted-foreground">
              JPG یا PNG، حداکثر ۲ مگابایت
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            required
            id="pf-firstName"
            label="نام"
            error={errors.firstName?.message}
          >
            <Input
              autoComplete="given-name"
              {...register("firstName")}
              {...fieldAria("pf-firstName", errors.firstName?.message)}
            />
          </FormField>
          <FormField
            required
            id="pf-lastName"
            label="نام خانوادگی"
            error={errors.lastName?.message}
          >
            <Input
              autoComplete="family-name"
              {...register("lastName")}
              {...fieldAria("pf-lastName", errors.lastName?.message)}
            />
          </FormField>
          <FormField
            required
            id="pf-email"
            label="ایمیل"
            error={errors.email?.message}
          >
            <Input
              type="email"
              dir="ltr"
              className="text-start"
              autoComplete="email"
              {...register("email")}
              {...fieldAria("pf-email", errors.email?.message)}
            />
          </FormField>
          <FormField
            required
            id="pf-phone"
            label="شماره موبایل"
            error={errors.phone?.message}
            hint="برای تغییر، کد تأیید پیامک می‌شود"
          >
            <Input
              type="tel"
              dir="ltr"
              className="text-start"
              autoComplete="tel"
              {...register("phone")}
              {...fieldAria("pf-phone", errors.phone?.message, true)}
            />
          </FormField>
          <FormField
            id="pf-birth"
            label="تاریخ تولد"
            hint="برای دریافت هدیه تولد"
          >
            <Input
              dir="ltr"
              className="text-start"
              {...register("birthDate")}
              {...fieldAria("pf-birth", null, true)}
            />
          </FormField>
          <fieldset className="space-y-2">
            <legend className="text-sm font-medium">جنسیت</legend>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex gap-5 pt-2"
                >
                  {[
                    ["female", "زن"],
                    ["male", "مرد"],
                    ["none", "ترجیح می‌دهم نگویم"],
                  ].map(([v, l]) => (
                    <div key={v} className="flex items-center gap-2">
                      <RadioGroupItem value={v} id={`pf-g-${v}`} />
                      <Label htmlFor={`pf-g-${v}`} className="font-normal">
                        {l}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
          </fieldset>
        </div>
        <div className="mt-6 flex justify-end gap-2 border-t border-border pt-5">
          <Button
            type="reset"
            variant="ghost"
            disabled={!isDirty || isSubmitting}
            onClick={() => reset()}
          >
            انصراف
          </Button>
          <Button type="submit" loading={isSubmitting} disabled={!isDirty}>
            ذخیره تغییرات
          </Button>
        </div>
      </form>
    </Panel>
  );
}

export function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<formChangePasswordData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      current: "",
      confirm: "",
      new: "",
    },
  });

  const onSubmit = async (data: formChangePasswordData) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 800));
    (reset(), toast.success("رمز عبور با موفقیت تغییر کرد"));
  };

  return (
    <Panel title="تغییر رمز عبور" id="pw-title">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="grid gap-4 p-5 md:grid-cols-2"
      >
        <FormField
          id="pw-current"
          label="رمز عبور فعلی"
          error={errors.current?.message}
          className="md:col-span-2 md:max-w-sm"
        >
          <PasswordInput
            autoComplete="current-password"
            {...register("current")}
            {...fieldAria("pw-current", errors.current?.message)}
          />
        </FormField>
        <div className="space-y-3">
          <Controller
            name="new"
            control={control}
            render={({ field }) => (
              <NewPasswordField
                id="pw-new"
                name="new"
                label="رمز عبور جدید"
                value={field.value}
                onChange={field.onChange}
                error={errors.new?.message}
              />
            )}
          />
        </div>
        <FormField
          id="pw-confirm"
          label="تکرار رمز عبور جدید"
          error={errors.confirm?.message}
        >
          <PasswordInput
            autoComplete="new-password"
            {...register("confirm")}
            {...fieldAria("pw-confirm", errors.confirm?.message)}
          />
        </FormField>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5 md:col-span-2">
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-success" aria-hidden="true" />{" "}
            آخرین تغییر رمز: ۳ ماه پیش
          </p>
          <Button type="submit" loading={isSubmitting}>
            تغییر رمز عبور
          </Button>
        </div>
      </form>
    </Panel>
  );
}
