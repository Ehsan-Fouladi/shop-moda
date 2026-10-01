import type { Metadata } from "next";

import { CheckoutForm } from "@/features/checkout/components/checkout-form";
import { CheckoutSteps } from "@/features/checkout/components/checkout-steps";
import { addresses, currentUser } from "@/features/account/data/account";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";

export const metadata: Metadata = {
  title: "تکمیل خرید",
  description:
    "ثبت اطلاعات خریدار، آدرس تحویل، روش ارسال و پرداخت برای تکمیل سفارش در مُدا.",
  alternates: { canonical: "/checkout" },
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <div className="container pb-section">
      <PageBreadcrumb
        items={[{ label: "سبد خرید", href: "/cart" }, { label: "تکمیل خرید" }]}
      />
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-h1">تکمیل خرید</h1>
        <CheckoutSteps current={2} />
      </header>
      <CheckoutForm user={currentUser} addresses={addresses} />
    </div>
  );
}
