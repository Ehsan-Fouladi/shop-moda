"use client";

import Link from "next/link";
import { Printer, RotateCcw, ShoppingCart, XCircle } from "lucide-react";
import { toast } from "sonner";

import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Button } from "@/components/ui/button";
import {
  canCancelOrder,
  canReorder,
  canRequestReturn,
} from "@/features/orders/lib/order-status";
import type { OrderStatus } from "@/features/orders/types";
import { useState } from "react";

/** Contextual order actions — UI only, nothing is submitted. */
export function OrderActions({ status }: { status: OrderStatus }) {
  const [cancelled, setCancelled] = useState(false);
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" onClick={() => window.print()}>
        <Printer aria-hidden="true" /> چاپ فاکتور
      </Button>
      {canCancelOrder(status) && !cancelled && (
        <ConfirmDialog
          trigger={
            <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:text-destructive"
            >
              <XCircle aria-hidden="true" /> لغو سفارش
            </Button>
          }
          title="لغو سفارش"
          description="در صورت لغو، مبلغ پرداختی ظرف ۷۲ ساعت کاری به حساب شما بازگردانده می‌شود. ادامه می‌دهید؟"
          confirmLabel="لغو سفارش"
          destructive
          onConfirm={() => {
            setCancelled(true);
            toast.success("درخواست لغو سفارش ثبت شد");
          }}
        />
      )}
      {canRequestReturn(status) && (
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            toast.info("درخواست مرجوعی ثبت شد", {
              description: "کارشناسان ما برای هماهنگی با شما تماس می‌گیرند.",
            })
          }
        >
          <RotateCcw aria-hidden="true" /> درخواست مرجوعی
        </Button>
      )}
      {canReorder(status) && (
        <Button size="sm" asChild>
          <Link href="/products">
            <ShoppingCart aria-hidden="true" /> خرید مجدد
          </Link>
        </Button>
      )}
    </div>
  );
}
