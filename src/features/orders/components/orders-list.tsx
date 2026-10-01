"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PackageOpen, Search } from "lucide-react";

import { OrderCard } from "@/features/orders/components/order-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  countOrders,
  filterOrders,
  orderTabs,
  parseOrderTab,
} from "@/features/orders/lib/order-filters";
import { toFaDigits } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Order } from "@/features/orders/types";
import { useState } from "react";

export function OrdersList({ orders }: { orders: Order[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const tab = parseOrderTab(params.get("status"));
  const [q, setQ] = useState("");
  const list = filterOrders(orders, tab, q);

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="tablist"
          aria-label="وضعیت سفارش"
          className="no-scrollbar flex gap-1 overflow-x-auto rounded-lg bg-muted p-1"
        >
          {orderTabs.map((t) => {
            const n = countOrders(orders, t);
            const selected = t.id === tab.id;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={selected}
                onClick={() =>
                  router.replace(
                    t.id === "all" ? pathname : `${pathname}?status=${t.id}`,
                    { scroll: false },
                  )
                }
                className={cn(
                  "shrink-0 rounded-md px-3 py-1.5 text-sm transition",
                  selected
                    ? "bg-card font-bold shadow-xs"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t.label}{" "}
                <span className="tabular-nums text-xs opacity-70">
                  {toFaDigits(n)}
                </span>
              </button>
            );
          })}
        </div>
        <div className="relative sm:w-64">
          <label htmlFor="orders-search" className="sr-only">
            جستجوی سفارش
          </label>
          <Search
            className="pointer-events-none absolute inset-s-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="orders-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="شماره سفارش یا نام کالا"
            className="ps-9"
          />
        </div>
      </div>

      <div role="tabpanel" aria-live="polite">
        {list.length ? (
          <ul className="space-y-3">
            {list.map((o) => (
              <li key={o.id}>
                <OrderCard order={o} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            icon={PackageOpen}
            title={
              q ? "سفارشی با این مشخصات پیدا نشد" : "سفارشی در این بخش ندارید"
            }
            description="وضعیت دیگری را انتخاب کنید یا از فروشگاه دیدن کنید."
          >
            <Button asChild>
              <Link href="/products">رفتن به فروشگاه</Link>
            </Button>
          </EmptyState>
        )}
      </div>
    </>
  );
}
