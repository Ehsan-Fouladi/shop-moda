import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { DashboardHeader } from "@/features/account/components/dashboard-ui";
import { WalletTopUpForm } from "@/features/account/components/wallet-top-up-form";
import { walletBalance } from "@/features/account/data/account";

export const metadata: Metadata = { title: "افزایش موجودی کیف پول" };

export default function Page() {
  return (
    <div className="space-y-5">
      <Link
        href="/dashboard/payment-methods"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowRight className="h-4 w-4" aria-hidden="true" /> بازگشت به روش‌های
        پرداخت
      </Link>
      <div>
        <DashboardHeader
          title="افزایش موجودی کیف پول"
          description="مبلغ دلخواه را انتخاب کنید و از طریق درگاه بانکی پرداخت کنید."
        />
        <WalletTopUpForm balance={walletBalance} />
      </div>
    </div>
  );
}
