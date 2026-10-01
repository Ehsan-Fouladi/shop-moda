"use client";

import {
  MapPin,
  MapPinOff,
  Pencil,
  Phone,
  Plus,
  Star,
  Trash2,
  User,
} from "lucide-react";
import { toast } from "sonner";

import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { EmptyState } from "@/components/shared/empty-state";
import { FormField, fieldAria } from "@/components/shared/form-field";
import {
  formatAddress,
  removeAddress,
  setDefaultAddress,
  upsertAddress,
} from "@/features/account/lib/address-book";
import {
  addressSchema,
  formAddressData,
} from "@/features/account/schemas/account-schemas";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { iranProvinces } from "@/constants/iran-provinces";
import { cn } from "@/lib/utils";
import type { Address } from "@/features/account/types";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

/** Address book with add/edit dialog, delete confirmation and default toggle (local state only). */
export function AddressesView({
  initialAddresses: seed,
}: {
  initialAddresses: Address[];
}) {
  const [list, setList] = useState<Address[]>(seed);
  const [editing, setEditing] = useState<Address | "new" | null>(null);

  const save = (a: Address) => {
    setList((prev) => upsertAddress(prev, a));
    toast.success(editing === "new" ? "آدرس جدید اضافه شد" : "آدرس ویرایش شد");
    setEditing(null);
  };

  const remove = (id: string) => {
    setList((prev) => removeAddress(prev, id));
    toast.info("آدرس حذف شد");
  };

  const setDefault = (id: string) => {
    setList((prev) => setDefaultAddress(prev, id));
    toast.success("آدرس پیش‌فرض تغییر کرد");
  };

  return (
    <>
      <div className="mb-4 flex justify-end">
        <Button onClick={() => setEditing("new")}>
          <Plus aria-hidden="true" /> افزودن آدرس جدید
        </Button>
      </div>

      {list.length ? (
        <ul className="grid gap-4 md:grid-cols-2">
          {list.map((a) => (
            <li key={a.id}>
              <article
                className={cn(
                  "flex h-full flex-col rounded-xl border bg-card p-5",
                  a.isDefault
                    ? "border-primary ring-1 ring-primary"
                    : "border-border",
                )}
              >
                <header className="flex items-center justify-between gap-2">
                  <h3 className="flex items-center gap-2 font-bold">
                    <MapPin
                      className="h-5 w-5 text-primary"
                      aria-hidden="true"
                    />{" "}
                    {a.title}
                  </h3>
                  {a.isDefault && (
                    <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
                      پیش‌فرض
                    </span>
                  )}
                </header>
                <p className="mt-3 flex-1 text-sm leading-7">
                  {formatAddress(a)}
                </p>
                <dl className="mt-3 space-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-3.5 w-3.5" aria-hidden="true" />
                    <dt className="sr-only">گیرنده</dt>
                    <dd>{a.receiver}</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                    <dt className="sr-only">تلفن</dt>
                    <dd className="tabular-nums">{a.phone}</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <dt>کد پستی:</dt>
                    <dd className="tabular-nums">{a.postalCode}</dd>
                  </div>
                </dl>
                <footer className="mt-4 flex flex-wrap items-center gap-1 border-t border-border pt-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditing(a)}
                  >
                    <Pencil aria-hidden="true" /> ویرایش
                  </Button>
                  <ConfirmDialog
                    trigger={
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 aria-hidden="true" /> حذف
                      </Button>
                    }
                    title="حذف آدرس"
                    description={`آدرس «${a.title}» حذف شود؟ این عمل قابل بازگشت نیست.`}
                    confirmLabel="حذف"
                    destructive
                    onConfirm={() => remove(a.id)}
                  />
                  {!a.isDefault && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ms-auto"
                      onClick={() => setDefault(a.id)}
                    >
                      <Star aria-hidden="true" /> پیش‌فرض کن
                    </Button>
                  )}
                </footer>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          icon={MapPinOff}
          title="هنوز آدرسی ثبت نکرده‌اید"
          description="برای سریع‌تر شدن خرید، آدرس‌های پرکاربرد خود را ذخیره کنید."
        >
          <Button onClick={() => setEditing("new")}>
            <Plus aria-hidden="true" /> افزودن آدرس
          </Button>
        </EmptyState>
      )}

      <AddressDialog
        key={editing === "new" ? "new" : (editing?.id ?? "closed")}
        value={editing}
        onClose={() => setEditing(null)}
        onSave={save}
      />
    </>
  );
}

function AddressDialog({
  value,
  onClose,
  onSave,
}: {
  value: Address | "new" | null;
  onClose: () => void;
  onSave: (a: Address) => void;
}) {
  const initial = value && value !== "new" ? value : null;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<formAddressData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      title: initial?.title ?? "",
      receiver: initial?.receiver ?? "",
      phone: initial?.phone ?? "",
      province: initial?.province ?? "",
      city: initial?.city ?? "",
      street: initial?.street ?? "",
      postalCode: initial?.postalCode ?? "",
      isDefault: initial?.isDefault ?? false,
    },
  });

  const onSubmit = async (data: formAddressData) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 900));
    const savedAddress: Address = {
      id: initial?.id ?? `a-${Date.now()}`,
      ...data,
    };
    onSave(savedAddress);
  };

  return (
    <Dialog open={value !== null} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {initial ? "ویرایش آدرس" : "افزودن آدرس جدید"}
          </DialogTitle>
          <DialogDescription>
            اطلاعات گیرنده و محل تحویل را دقیق وارد کنید.
          </DialogDescription>
        </DialogHeader>
        <form
          id="address-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="grid gap-4 sm:grid-cols-2"
        >
          <FormField
            required
            id="ad-title"
            label="عنوان آدرس"
            error={errors.title?.message}
          >
            <Input
              placeholder="مثلاً خانه"
              {...register("title")}
              {...fieldAria("ad-title", errors.title?.message)}
            />
          </FormField>
          <FormField
            required
            id="ad-receiver"
            label="نام گیرنده"
            error={errors.receiver?.message}
          >
            <Input
              {...register("receiver")}
              {...fieldAria("ad-receiver", errors.receiver?.message)}
            />
          </FormField>
          <FormField
            required
            id="ad-phone"
            label="موبایل گیرنده"
            error={errors.phone?.message}
          >
            <Input
              type="tel"
              dir="ltr"
              className="text-start"
              {...register("phone")}
              {...fieldAria("ad-phone", errors.phone?.message)}
            />
          </FormField>
          <FormField
            required
            id="ad-province"
            label="استان"
            error={errors.province?.message}
          >
            <Controller
              name="province"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    {...fieldAria("ad-province", errors.province?.message)}
                  >
                    <SelectValue placeholder="انتخاب استان" />
                  </SelectTrigger>
                  <SelectContent>
                    {iranProvinces.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>
          <FormField
            required
            id="ad-city"
            label="شهر"
            error={errors.city?.message}
          >
            <Input
              {...register("city")}
              {...fieldAria("ad-city", errors.city?.message)}
            />
          </FormField>
          <FormField
            required
            id="ad-postalCode"
            label="کد پستی"
            error={errors.postalCode?.message}
          >
            <Input
              dir="ltr"
              className="text-start"
              inputMode="numeric"
              {...register("postalCode")}
              {...fieldAria("ad-postalCode", errors.postalCode?.message)}
            />
          </FormField>
          <FormField
            required
            id="ad-street"
            label="آدرس کامل"
            error={errors.street?.message}
            className="sm:col-span-2"
          >
            <Textarea
              rows={3}
              placeholder="خیابان، کوچه، پلاک، واحد"
              {...register("street")}
              {...fieldAria("ad-street", errors.street?.message)}
            />
          </FormField>
          <div className="flex items-center gap-2 sm:col-span-2">
            <Controller
              name="isDefault"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="ad-default"
                  name="isDefault"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label htmlFor="ad-default" className="font-normal">
              به‌عنوان آدرس پیش‌فرض ذخیره شود
            </Label>
          </div>
        </form>
        <DialogFooter className="gap-2">
          <Button variant="ghost" onClick={onClose}>
            انصراف
          </Button>
          <Button type="submit" form="address-form" loading={isSubmitting}>
            ذخیره آدرس
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
