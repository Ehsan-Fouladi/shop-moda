import { Suspense } from "react";
import type { Metadata } from "next";

import { DashboardHeader } from "@/features/account/components/dashboard-ui";
import { OrdersList } from "@/features/orders/components/orders-list";
import { orders } from "@/features/orders/data/orders";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = { title: "سفارش‌ها" };

export default function OrdersPage() {
  return (
    <>
      <DashboardHeader
        title="سفارش‌های من"
        description="وضعیت، جزئیات و سابقه همه سفارش‌های شما"
      />
      {/* min-h-dvh: the footer stays below the fold until the list replaces this fallback (no layout shift) */}
      <Suspense
        fallback={
          <div className="min-h-dvh space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-36 w-full rounded-xl" />
            ))}
          </div>
        }
      >
        <OrdersList orders={orders} />
      </Suspense>
    </>
  );
}
