import { Badge } from "@/components/ui/badge";
import type { ProductBadge, ProductStatus } from "@/features/catalog/types";
import { cn } from "@/lib/utils";

const badgeConfig: Record<ProductBadge, { label: string; className: string }> =
  {
    new: {
      label: "جدید",
      className: "bg-info text-info-foreground hover:bg-info",
    },
    sale: {
      label: "حراج",
      className: "bg-sale text-sale-foreground hover:bg-sale",
    },
    bestseller: {
      label: "پرفروش",
      className: "bg-warning text-warning-foreground hover:bg-warning",
    },
    limited: {
      label: "محدود",
      className: "bg-primary text-primary-foreground hover:bg-primary",
    },
  };

export function ProductBadgeTag({
  badge,
  className,
}: {
  badge: ProductBadge;
  className?: string;
}) {
  const config = badgeConfig[badge];
  return (
    <Badge
      className={cn(
        "border-0 text-[11px] font-bold",
        config.className,
        className,
      )}
    >
      {config.label}
    </Badge>
  );
}

const statusConfig: Record<
  ProductStatus,
  { label: string; className: string } | null
> = {
  "in-stock": null, // shown implicitly by an enabled add-to-cart
  "low-stock": {
    label: "تنها چند عدد باقی مانده",
    className:
      "border-warning/40 bg-warning/10 text-warning-foreground dark:text-warning",
  },
  "out-of-stock": {
    label: "ناموجود",
    className: "border-border bg-muted text-muted-foreground",
  },
};

export function StockStatusBadge({
  status,
  className,
}: {
  status: ProductStatus;
  className?: string;
}) {
  const config = statusConfig[status];
  if (!config) return null;
  return (
    <Badge
      variant="outline"
      className={cn("text-[11px] font-medium", config.className, className)}
    >
      {config.label}
    </Badge>
  );
}
