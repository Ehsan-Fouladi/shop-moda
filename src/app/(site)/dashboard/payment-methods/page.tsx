import type { Metadata } from "next";

import { DashboardHeader } from "@/features/account/components/dashboard-ui";
import { PaymentMethodsView } from "@/features/account/components/payment-methods-view";
import { paymentMethods, walletBalance } from "@/features/account/data/account";

export const metadata: Metadata = { title: "روش‌های پرداخت" };

export default function Page() {
  return (
    <>
      <DashboardHeader
        title="روش‌های پرداخت"
        description="کارت‌های بانکی و کیف پول مُدا"
      />
      <PaymentMethodsView
        initialMethods={paymentMethods}
        walletBalance={walletBalance}
      />
    </>
  );
}
