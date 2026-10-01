import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/format";
import type { Totals } from "@/features/cart/lib/pricing";
import { cn } from "@/lib/utils";

interface SummaryValues {
  subtotal: number;
  discount?: number;
  couponDiscount?: number;
  couponCode?: string;
  shipping?: number | null;
  tax?: number;
  total: number;
}

/**
 * Canonical price breakdown shared by cart page, cart drawer,
 * checkout, order success and order details.
 */
export function OrderSummaryRows({
  values,
  className,
}: {
  values: SummaryValues;
  className?: string;
}) {
  const {
    subtotal,
    discount = 0,
    couponDiscount = 0,
    couponCode,
    shipping,
    tax,
    total,
  } = values;
  return (
    <dl className={cn("space-y-3 text-sm", className)}>
      <Row label="جمع کالاها" value={formatPrice(subtotal)} />
      {discount > 0 && (
        <Row
          label="تخفیف کالاها"
          value={`− ${formatPrice(discount)}`}
          valueClass="text-sale"
        />
      )}
      {couponDiscount > 0 && (
        <Row
          label={`کد تخفیف${couponCode ? ` (${couponCode})` : ""}`}
          value={`− ${formatPrice(couponDiscount)}`}
          valueClass="text-sale"
        />
      )}
      {shipping !== undefined && (
        <Row
          label="هزینه ارسال"
          value={
            shipping === null
              ? "در مرحله بعد"
              : shipping === 0
                ? "رایگان"
                : formatPrice(shipping)
          }
          valueClass={shipping === 0 ? "text-success" : undefined}
        />
      )}
      {tax !== undefined && (
        <Row label="مالیات بر ارزش افزوده" value={formatPrice(tax)} />
      )}
      <Separator />
      <div className="flex items-center justify-between">
        <dt className="font-bold">مبلغ قابل پرداخت</dt>
        <dd className="text-base font-bold tabular-nums">
          {formatPrice(total)}
        </dd>
      </div>
    </dl>
  );
}

/** Summary rows for a full price breakdown (cart, checkout and the order snapshot). */
export function summaryFromTotals(
  totals: Totals,
  couponCode?: string,
): SummaryValues {
  return {
    subtotal: totals.listSubtotal,
    discount: totals.productDiscount,
    couponDiscount: totals.couponDiscount,
    couponCode,
    shipping: totals.shipping,
    tax: totals.tax,
    total: totals.total,
  };
}

function Row({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={cn("font-medium tabular-nums", valueClass)}>{value}</dd>
    </div>
  );
}
