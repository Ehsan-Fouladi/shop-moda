import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, CreditCard, Gift, MapPin, UserRound } from "lucide-react";

import {
  DashboardHeader,
  Panel,
} from "@/features/account/components/dashboard-ui";
import { OrderCard } from "@/features/orders/components/order-card";
import { OrderTimeline } from "@/features/orders/components/order-timeline";
import { OverviewStats } from "@/features/account/components/overview-stats";
import { ProductCarousel } from "@/features/catalog/components/product-carousel";
import { OrderStatusBadge } from "@/features/orders/components/order-status-badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  addresses,
  currentUser,
  paymentMethods,
} from "@/features/account/data/account";
import { orders } from "@/features/orders/data/orders";
import { isActiveOrder } from "@/features/orders/lib/order-status";
import { getOrderTimeline } from "@/features/orders/lib/order-timeline";
import { bestSellers } from "@/features/catalog/data/products";
import { formatDateFa, formatPrice, toFaDigits } from "@/lib/format";

export const metadata: Metadata = { title: "نمای کلی" };

export default function DashboardOverviewPage() {
  const tracking = orders.find(
    (o) => o.status === "shipped" || o.status === "processing",
  );
  const recent = orders.slice(0, 3);
  const defaultAddress = addresses.find((a) => a.isDefault);
  const defaultCard = paymentMethods.find((p) => p.isDefault);
  const spent = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((s, o) => s + o.total, 0);
  const nextTier = 15000000;

  return (
    <div className="space-y-6">
      <DashboardHeader
        title={`سلام، ${currentUser.firstName} عزیز`}
        description="خلاصه‌ای از فعالیت‌ها و سفارش‌های اخیر شما"
      />
      <OverviewStats
        orderCount={orders.length}
        activeOrderCount={orders.filter((o) => isActiveOrder(o.status)).length}
      />

      {tracking && (
        <Panel
          id="ov-tracking"
          title="پیگیری سفارش جاری"
          action={
            <Link
              href={`/dashboard/orders/${tracking.id}`}
              className="text-sm text-primary hover:underline"
            >
              جزئیات
            </Link>
          }
        >
          <div className="p-5">
            <div className="mb-6 flex flex-wrap items-center gap-3 text-sm">
              <b className="tabular-nums" dir="ltr">
                {tracking.id}
              </b>
              <OrderStatusBadge status={tracking.status} />
              {tracking.estimatedDelivery && (
                <span className="text-muted-foreground">
                  تحویل تخمینی:{" "}
                  <b className="text-foreground">
                    {formatDateFa(tracking.estimatedDelivery)}
                  </b>
                </span>
              )}
            </div>
            <OrderTimeline steps={getOrderTimeline(tracking)} />
          </div>
        </Panel>
      )}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
        <section aria-labelledby="ov-recent" className="min-w-0">
          <div className="mb-3 flex items-center justify-between">
            <h2 id="ov-recent" className="text-base font-bold">
              سفارش‌های اخیر
            </h2>
            <Link
              href="/dashboard/orders"
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              همه سفارش‌ها{" "}
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <ul className="space-y-3">
            {recent.map((o) => (
              <li key={o.id}>
                <OrderCard order={o} />
              </li>
            ))}
          </ul>
        </section>

        <div className="space-y-4">
          <Panel>
            <div className="p-5">
              <p className="flex items-center gap-2 text-sm font-bold">
                <Gift className="h-5 w-5 text-primary" aria-hidden="true" />{" "}
                باشگاه مشتریان — {currentUser.loyaltyTier}
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                مجموع خرید شما:{" "}
                <b className="text-foreground tabular-nums">
                  {formatPrice(spent)}
                </b>
              </p>
              <Progress
                value={Math.min(100, (spent / nextTier) * 100)}
                className="mt-3 h-2"
                aria-label="پیشرفت تا سطح بعدی"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                {toFaDigits(
                  Math.max(0, Math.round((nextTier - spent) / 1000000)),
                )}{" "}
                میلیون تومان تا سطح «الماسی» و ارسال رایگان همیشگی
              </p>
            </div>
          </Panel>

          <Panel title="اطلاعات حساب" id="ov-account">
            <ul className="divide-y divide-border text-sm">
              <li>
                <Link
                  href="/dashboard/profile"
                  className="flex items-center gap-3 px-5 py-3.5 hover:bg-muted/50"
                >
                  <UserRound
                    className="h-5 w-5 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium">
                      {currentUser.firstName} {currentUser.lastName}
                    </span>
                    <span
                      className="block truncate text-xs text-muted-foreground"
                      dir="ltr"
                    >
                      {currentUser.email}
                    </span>
                  </span>
                  <ChevronLeft
                    className="h-4 w-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                </Link>
              </li>
              {defaultAddress && (
                <li>
                  <Link
                    href="/dashboard/addresses"
                    className="flex items-center gap-3 px-5 py-3.5 hover:bg-muted/50"
                  >
                    <MapPin
                      className="h-5 w-5 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium">
                        آدرس پیش‌فرض: {defaultAddress.title}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {defaultAddress.city}، {defaultAddress.street}
                      </span>
                    </span>
                    <ChevronLeft
                      className="h-4 w-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              )}
              {defaultCard && (
                <li>
                  <Link
                    href="/dashboard/payment-methods"
                    className="flex items-center gap-3 px-5 py-3.5 hover:bg-muted/50"
                  >
                    <CreditCard
                      className="h-5 w-5 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <span className="flex-1">
                      <span className="block font-medium">کارت پیش‌فرض</span>
                      <span
                        className="block text-xs text-muted-foreground tabular-nums"
                        dir="ltr"
                      >
                        •••• {defaultCard.last4}
                      </span>
                    </span>
                    <ChevronLeft
                      className="h-4 w-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              )}
            </ul>
          </Panel>
        </div>
      </div>

      <section aria-labelledby="ov-reco">
        <div className="mb-3 flex items-center justify-between">
          <h2 id="ov-reco" className="text-base font-bold">
            پیشنهاد برای شما
          </h2>
          <Button variant="link" asChild className="px-0">
            <Link href="/products">مشاهده همه</Link>
          </Button>
        </div>
        <ProductCarousel
          products={bestSellers}
          label="محصولات پیشنهادی"
          compact
        />
      </section>
    </div>
  );
}
