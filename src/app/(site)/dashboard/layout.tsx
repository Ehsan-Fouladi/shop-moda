import type { Metadata } from "next";

import {
  DashboardMobileNav,
  DashboardSidebar,
} from "@/features/account/components/dashboard-nav";
import { currentUser, notifications } from "@/features/account/data/account";
import { NotificationsProvider } from "@/features/account/store/notifications-store";

export const metadata: Metadata = {
  title: { default: "حساب کاربری", template: "%s | حساب کاربری مُدا" },
  robots: { index: false, follow: false },
};

/** Account area shell: sidebar on desktop, scrollable tabs on mobile. */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NotificationsProvider initialNotifications={notifications}>
      <div className="container py-6 pb-section">
        <div className="grid gap-6 lg:grid-cols-[272px_1fr]">
          <DashboardSidebar user={currentUser} />
          <div className="min-w-0">
            <DashboardMobileNav />
            {children}
          </div>
        </div>
      </div>
    </NotificationsProvider>
  );
}
