import { discountPercent, formatNumber, formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

interface PriceDisplayProps {
  price: number;
  oldPrice?: number;
  size?: "sm" | "md" | "lg";
  /** Stack old price/discount above (column) or beside (row) the current price */
  layout?: "column" | "row";
  className?: string;
}

/**
 * Canonical price presentation: current price in Toman, struck old price
 * and a discount pill — the same component everywhere prices appear.
 */
export function PriceDisplay({
  price,
  oldPrice,
  size = "md",
  layout = "row",
  className,
}: PriceDisplayProps) {
  const percent = discountPercent(price, oldPrice);

  const priceClass = cn(
    "font-bold tabular-nums text-foreground",
    size === "sm" && "text-sm",
    size === "md" && "text-base md:text-lg",
    size === "lg" && "text-xl md:text-2xl",
  );

  return (
    <div
      className={cn(
        "flex items-center gap-x-2 gap-y-1",
        layout === "column" ? "flex-col items-end" : "flex-row flex-wrap",
        className,
      )}
    >
      {layout === "column" && percent > 0 && (
        <span className="flex items-center gap-2">
          {oldPrice && (
            <span className="text-xs text-muted-foreground line-through tabular-nums">
              {formatNumber(oldPrice)}
            </span>
          )}
          <span className="rounded-md bg-sale px-1.5 py-0.5 text-[11px] font-bold text-sale-foreground tabular-nums">
            {formatNumber(percent)}٪
          </span>
        </span>
      )}
      <span className={priceClass}>{formatPrice(price)}</span>
      {layout === "row" && oldPrice && (
        <span className="text-xs text-muted-foreground line-through tabular-nums">
          {formatNumber(oldPrice)}
        </span>
      )}
      {layout === "row" && percent > 0 && (
        <span className="rounded-md bg-sale px-1.5 py-0.5 text-[11px] font-bold text-sale-foreground tabular-nums">
          {formatNumber(percent)}٪ تخفیف
        </span>
      )}
    </div>
  );
}
