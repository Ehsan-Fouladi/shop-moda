import type { Metadata } from "next";

import { DashboardHeader } from "@/features/account/components/dashboard-ui";
import { AddressesView } from "@/features/account/components/addresses-view";
import { addresses } from "@/features/account/data/account";

export const metadata: Metadata = { title: "آدرس‌ها" };

export default function Page() {
  return (
    <>
      <DashboardHeader
        title="آدرس‌ها"
        description="آدرس‌های تحویل سفارش را مدیریت کنید"
      />
      <AddressesView initialAddresses={addresses} />
    </>
  );
}
