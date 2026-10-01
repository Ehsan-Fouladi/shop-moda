import {
  paymentOptions,
  type PaymentOption,
} from "@/features/checkout/schemas/checkout-schema";

export function isPaymentOption(value: string): value is PaymentOption {
  return (paymentOptions as readonly string[]).includes(value);
}

/** Checkout option copy (`title`, `description`) and the short label on the success page. */
export const paymentOptionMeta: Record<
  PaymentOption,
  { title: string; description: string; summaryLabel: string }
> = {
  card: {
    title: "پرداخت اینترنتی با کارت بانکی",
    description: "همه کارت‌های عضو شتاب — درگاه امن شاپرک",
    summaryLabel: "کارت بانکی — درگاه شاپرک",
  },
  cod: {
    title: "پرداخت در محل",
    description: "پرداخت با کارتخوان هنگام تحویل — ویژه تهران و کرج",
    summaryLabel: "پرداخت در محل",
  },
  installment: {
    title: "خرید اقساطی / کیف پول",
    description: "پرداخت در ۴ قسط بدون کارمزد از طریق سرویس‌های همکار",
    summaryLabel: "خرید اقساطی",
  },
};
