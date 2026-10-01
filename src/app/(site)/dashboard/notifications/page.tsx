import type { Metadata } from "next";

import { DashboardHeader } from "@/features/account/components/dashboard-ui";
import { NotificationsView } from "@/features/account/components/notifications-view";
import { notificationsAsOf } from "@/features/account/data/account";

export const metadata: Metadata = { title: "اعلان‌ها" };

export default function Page() {
  return (
    <>
      <DashboardHeader
        title="اعلان‌ها"
        description="پیام‌های مربوط به سفارش، تخفیف‌ها و امنیت حساب"
      />
      <NotificationsView now={notificationsAsOf} />
    </>
  );
}
