"use client";

import { Bell, Heart, Package, Truck } from "lucide-react";

import { StatCard } from "@/features/account/components/dashboard-ui";
import { useNotifications } from "@/features/account/store/notifications-store";
import { toFaDigits } from "@/lib/format";
import { useWishlist } from "@/features/wishlist/store/wishlist-store";

export function OverviewStats({
  orderCount,
  activeOrderCount: active,
}: {
  orderCount: number;
  activeOrderCount: number;
}) {
  const { count } = useWishlist();
  const { unreadCount: unread } = useNotifications();
  return (
    <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      <StatCard
        icon={Package}
        label="کل سفارش‌ها"
        value={toFaDigits(orderCount)}
        href="/dashboard/orders"
      />
      <StatCard
        icon={Truck}
        label="سفارش‌های جاری"
        value={toFaDigits(active)}
        href="/dashboard/orders?status=active"
        tone="info"
      />
      <StatCard
        icon={Heart}
        label="علاقه‌مندی‌ها"
        value={toFaDigits(count)}
        href="/dashboard/wishlist"
        tone="warning"
      />
      <StatCard
        icon={Bell}
        label="اعلان خوانده‌نشده"
        value={toFaDigits(unread)}
        href="/dashboard/notifications"
        tone="success"
      />
    </div>
  );
}
