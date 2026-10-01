import type { ProductSummary } from "@/features/catalog/types";
import { cn } from "@/lib/utils";

import { ProductCard } from "@/features/catalog/components/product-card";

interface ProductGridProps {
  products: ProductSummary[];
  /** Tailwind column classes per breakpoint */
  columns?: string;
  className?: string;
  compact?: boolean;
  /** Leading cards whose images load eagerly (use only when the grid starts above the fold) */
  priorityCount?: number;
}

/** Responsive product grid: 2 cols mobile → 3 tablet → 4/5 desktop. */
export function ProductGrid({
  products,
  columns = "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
  className,
  compact = false,
  priorityCount = 0,
}: ProductGridProps) {
  return (
    <ul className={cn("grid gap-3 sm:gap-4", columns, className)}>
      {products.map((product, i) => (
        <li key={product.id}>
          <ProductCard
            product={product}
            compact={compact}
            priority={i < priorityCount}
            className="h-full"
          />
        </li>
      ))}
    </ul>
  );
}
