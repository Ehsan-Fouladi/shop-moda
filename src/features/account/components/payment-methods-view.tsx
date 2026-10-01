"use client";

import Link from "next/link";
import { CreditCard, Lock, Plus, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { EmptyState } from "@/components/shared/empty-state";
import { FormField, fieldAria } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { WalletBalance } from "@/features/account/components/wallet-balance";
import {
  formPaymentCard,
  paymentCardSchema,
} from "@/features/account/schemas/account-schemas";
import { toFaDigits } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { PaymentMethod } from "@/features/account/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const brandStyle: Record<
  PaymentMethod["brand"],
  { label: string; bg: string }
> = {
  shaparak: {
    label: "کارت شتاب",
    bg: "from-[hsl(340_60%_30%)] to-[hsl(340_55%_48%)]",
  },
  visa: { label: "VISA", bg: "from-[hsl(222_47%_22%)] to-[hsl(222_45%_40%)]" },
  mastercard: {
    label: "Mastercard",
    bg: "from-[hsl(20_10%_16%)] to-[hsl(25_12%_32%)]",
  },
};

function CardVisual({ card }: { card: PaymentMethod }) {
  const s = brandStyle[card.brand];
  return (
    <div
      className={cn(
        "relative aspect-[1.6/1] overflow-hidden rounded-2xl bg-linear-to-br p-5 text-white shadow-lg",
        s.bg,
      )}
    >
      <span
        className="absolute -inset-e-10 -top-10 h-40 w-40 rounded-full bg-white/10"
        aria-hidden="true"
      />
      <span
        className="absolute -bottom-16 -inset-s-6 h-40 w-40 rounded-full bg-white/5"
        aria-hidden="true"
      />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <span
            className="h-8 w-11 rounded-md bg-linear-to-br from-amber-200 to-amber-400/80"
            aria-hidden="true"
          />
          <span className="text-sm font-bold tracking-wide" dir="ltr">
            {s.label}
          </span>
        </div>
        <p
          className="text-lg font-medium tracking-[0.2em] tabular-nums"
          dir="ltr"
        >
          •••• •••• •••• {card.last4}
        </p>
        <div className="flex items-end justify-between text-xs" dir="ltr">
          <span className="uppercase opacity-90">{card.holder}</span>
          <span className="tabular-nums opacity-90">{card.expiry}</span>
        </div>
      </div>
    </div>
  );
}

export function PaymentMethodsView({
  initialMethods: seed,
  walletBalance,
}: {
  initialMethods: PaymentMethod[];
  walletBalance: number;
}) {
  const [cards, setCards] = useState<PaymentMethod[]>(seed);
  const [adding, setAdding] = useState<boolean>(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<formPaymentCard>({
    resolver: zodResolver(paymentCardSchema),
    defaultValues: {
      number: "",
      holder: "",
      exp: "",
    },
  });

  const handleOpenChange = (open: boolean) => {
    setAdding(open);
    if (!open) reset();
  };

  const onSubmit = async (data: formPaymentCard) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 900));
    const num = data.number.replace(/\s+/g, "");
    const brand: PaymentMethod["brand"] = num.startsWith("4")
      ? "visa"
      : num.startsWith("5")
        ? "mastercard"
        : "shaparak";

    const newCard: PaymentMethod = {
      id: `pm-${Date.now()}`,
      brand,
      last4: toFaDigits(num.slice(-4)),
      expiry: toFaDigits(data.exp),
      holder: data.holder,
      isDefault: cards.length === 0,
    };
    setCards((prev) => [...prev, newCard]);
    handleOpenChange(false);
    toast.success("کارت جدید ذخیره شد");
  };

  return (
    <div className="space-y-6">
      <WalletBalance
        balance={walletBalance}
        action={
          <Button variant="outline" asChild>
            <Link href="/dashboard/payment-methods/top-up">افزایش موجودی</Link>
          </Button>
        }
      />

      <section aria-labelledby="pm-cards">
        <div className="mb-3 flex items-center justify-between">
          <h2 id="pm-cards" className="text-base font-bold">
            کارت‌های ذخیره‌شده
          </h2>
          <Button size="sm" onClick={() => handleOpenChange(true)}>
            <Plus aria-hidden="true" /> افزودن کارت
          </Button>
        </div>
        {cards.length ? (
          <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {cards.map((c) => (
              <li key={c.id} className="space-y-2">
                <CardVisual card={c} />
                <div className="flex items-center justify-between gap-2">
                  {c.isDefault ? (
                    <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
                      پیش‌فرض
                    </span>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setCards((all) =>
                          all.map((x) => ({ ...x, isDefault: x.id === c.id })),
                        );
                        toast.success("کارت پیش‌ فرض تغییر کرد");
                      }}
                    >
                      <Star aria-hidden="true" /> پیش‌ فرض کن
                    </Button>
                  )}
                  <ConfirmDialog
                    trigger={
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        aria-label={`حذف کارت ${c.last4}`}
                      >
                        <Trash2 aria-hidden="true" /> حذف
                      </Button>
                    }
                    title="حذف کارت"
                    description={`کارت منتهی به ${c.last4} از حساب شما حذف شود؟`}
                    confirmLabel="حذف کارت"
                    destructive
                    onConfirm={() => {
                      setCards((all) => {
                        const n = all.filter((x) => x.id !== c.id);
                        if (n.length && !n.some((x) => x.isDefault))
                          n[0] = { ...n[0], isDefault: true };
                        return n;
                      });
                      toast.info("کارت حذف شد");
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            icon={CreditCard}
            title="کارتی ذخیره نشده است"
            description="با ذخیره کارت، پرداخت‌های بعدی سریع‌تر انجام می‌شود."
          >
            <Button onClick={() => setAdding(true)}>
              <Plus aria-hidden="true" /> افزودن کارت
            </Button>
          </EmptyState>
        )}
      </section>

      <p className="flex items-start gap-2 rounded-xl bg-muted/60 p-4 text-xs leading-6 text-muted-foreground">
        <Lock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        مُدا شماره کامل کارت، CVV2 و رمز دوم شما را ذخیره نمی‌کند. کارت‌ها
        به‌صورت توکن امن نزد درگاه پرداخت نگهداری می‌شوند.
      </p>

      <Dialog open={adding} onOpenChange={setAdding}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>افزودن کارت جدید</DialogTitle>
            <DialogDescription>
              این فرم نمایشی است و اطلاعاتی ارسال نمی‌شود.
            </DialogDescription>
          </DialogHeader>
          <form
            id="card-form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="grid gap-4 sm:grid-cols-2"
          >
            <FormField
              required
              id="pm-number"
              label="شماره کارت"
              error={errors.number?.message}
              className="sm:col-span-2"
            >
              <Input
                inputMode="numeric"
                dir="ltr"
                placeholder="0000 0000 0000 0000"
                className="text-start tracking-widest"
                autoComplete="cc-number"
                {...register("number")}
                {...fieldAria("pm-number", errors.number?.message)}
              />
            </FormField>
            <FormField
              required
              id="pm-holder"
              label="نام دارنده کارت"
              error={errors.holder?.message}
            >
              <Input
                autoComplete="cc-name"
                {...register("holder")}
                {...fieldAria("pm-holder", errors.holder?.message)}
              />
            </FormField>
            <FormField
              required
              id="pm-exp"
              label="تاریخ انقضا"
              error={errors.exp?.message}
            >
              <Input
                dir="ltr"
                placeholder="MM/YY"
                className="text-start"
                autoComplete="cc-exp"
                {...register("exp")}
                {...fieldAria("pm-exp", errors.exp?.message)}
              />
            </FormField>
          </form>
          <DialogFooter className="gap-2">
            <Button variant="ghost" onClick={() => handleOpenChange(false)}>
              انصراف
            </Button>
            <Button type="submit" form="card-form" loading={isSubmitting}>
              ذخیره کارت
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
