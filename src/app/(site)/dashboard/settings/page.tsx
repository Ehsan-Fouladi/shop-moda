import type { Metadata } from "next";

import { DashboardHeader } from "@/features/account/components/dashboard-ui";
import { SettingsView } from "@/features/account/components/settings-view";

export const metadata: Metadata = { title: "تنظیمات" };

export default function Page() {
  return (
    <>
      <DashboardHeader
        title="تنظیمات"
        description="ظاهر، اعلان‌ها و حریم خصوصی حساب کاربری"
      />
      <SettingsView />
    </>
  );
}
