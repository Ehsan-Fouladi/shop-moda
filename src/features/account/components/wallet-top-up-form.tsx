"use client";

import { AlertCircle, Lock } from "lucide-react";

import { FormField, fieldAria } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Panel } from "@/features/account/components/dashboard-ui";
import { WalletBalance } from "@/features/account/components/wallet-balance";
import {
  parseAmountInput,
  requestWalletTopUp,
} from "@/features/account/lib/wallet-top-up";
import {
  formWalletTopUpData,
  WALLET_TOP_UP_MAX,
  WALLET_TOP_UP_MIN,
  walletTopUpSchema,
} from "@/features/account/schemas/account-schemas";
import { formatNumber, formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const PRESETS = [100_000, 200_000, 500_000, 1_000_000];

const errorMessages = {
  "gateway-unavailable":
    "درگاه پرداخت هنوز به فروشگاه متصل نشده است. مبلغی از حساب شما کسر نشد و موجودی کیف پول تغییری نکرد.",
} as const;

export function WalletTopUpForm({ balance }: { balance: number }) {
  const [gatewayError, setGatewayError] = useState<
    keyof typeof errorMessages | null
  >(null);

  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<formWalletTopUpData>({
    resolver: zodResolver(walletTopUpSchema),
    defaultValues: {
      amount: "",
    },
  });

  const rawAmount = useWatch({ control, name: "amount" });
  const preview = parseAmountInput(rawAmount ?? "");

  const hint = `بین ${formatPrice(WALLET_TOP_UP_MIN)} تا ${formatPrice(WALLET_TOP_UP_MAX)}`;

  const onSubmit = async (data: formWalletTopUpData) => {
    console.log(data);
    setGatewayError(null);
    const parsedAmount = parseAmountInput(data.amount);
    const response = await requestWalletTopUp(parsedAmount!);
    if (response.ok) {
      window.location.assign(response.redirectUrl);
      return;
    }
    setGatewayError(response.error);
  };

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0 space-y-6">
        <WalletBalance balance={balance} />

        <Panel title="مبلغ شارژ" id="wt-title">
          <form
            id="wallet-top-up"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            aria-labelledby="wt-title"
            className="space-y-5 p-5"
          >
            <FormField
              id="wt-amount"
              label="مبلغ دلخواه"
              error={errors.amount?.message}
              hint={hint}
            >
              <div className="relative">
                <Input
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="مثلاً ۲۵۰٬۰۰۰"
                  disabled={isSubmitting}
                  className="pe-16 tabular-nums"
                  {...register("amount", {
                    onChange: () => {
                      if (gatewayError) setGatewayError(null);
                    },
                  })}
                  {...fieldAria("wt-amount", errors.amount?.message, true)}
                />
                <span className="pointer-events-none absolute inset-y-0 end-3 flex items-center text-sm text-muted-foreground">
                  تومان
                </span>
              </div>
            </FormField>

            <div
              role="group"
              aria-label="مبلغ‌های پیشنهادی"
              className="flex flex-wrap gap-2"
            >
              {PRESETS.map((value) => {
                const selected = preview === value;
                return (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={selected}
                    disabled={isSubmitting}
                    onClick={() => {
                      setValue("amount", formatNumber(value), {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                      if (gatewayError) setGatewayError(null);
                    }}
                    className={cn(
                      "rounded-lg border px-3 py-2 text-sm tabular-nums transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                      selected
                        ? "border-primary bg-accent font-bold text-accent-foreground"
                        : "border-border bg-card hover:border-primary hover:text-primary",
                    )}
                  >
                    {formatPrice(value)}
                  </button>
                );
              })}
            </div>

            <p className="flex items-start gap-2 rounded-xl bg-muted/60 p-4 text-xs leading-6 text-muted-foreground">
              <Lock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />{" "}
              پرداخت از طریق درگاه امن شاپرک و با همه کارت‌های عضو شتاب انجام
              می‌شود. پس از پرداخت موفق، مبلغ بلافاصله به کیف پول اضافه می‌شود.
            </p>
          </form>
        </Panel>
      </div>

      <Panel title="خلاصه شارژ" id="wt-summary" className="lg:sticky lg:top-36">
        <dl className="space-y-3 p-5 text-sm">
          <div className="flex items-center justify-between gap-3">
            <dt className="text-muted-foreground">موجودی فعلی</dt>
            <dd className="tabular-nums">{formatPrice(balance)}</dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-muted-foreground">مبلغ شارژ</dt>
            <dd className="tabular-nums">
              {preview ? formatPrice(preview) : "—"}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-border pt-3 font-bold">
            <dt>موجودی پس از شارژ</dt>
            <dd className="tabular-nums text-primary">
              {formatPrice(balance + (preview ?? 0))}
            </dd>
          </div>
        </dl>
        <div className="space-y-3 border-t border-border p-5">
          {gatewayError && (
            <p
              role="alert"
              className="flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-xs leading-6 text-destructive"
            >
              <AlertCircle
                className="mt-0.5 h-4 w-4 shrink-0"
                aria-hidden="true"
              />{" "}
              {errorMessages[gatewayError]}
            </p>
          )}
          <Button
            type="submit"
            form="wallet-top-up"
            size="lg"
            className="w-full"
            loading={isSubmitting}
          >
            {preview
              ? `پرداخت ${formatNumber(preview)} تومان`
              : "پرداخت و افزایش موجودی"}
          </Button>
        </div>
      </Panel>
    </div>
  );
}
