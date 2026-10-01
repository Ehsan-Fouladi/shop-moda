import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/** Loading placeholder mirroring ProductCard's layout. */
export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border/60 bg-card">
      <Skeleton className="aspect-4/5 w-full rounded-none" />
      <div className="space-y-2 p-4">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-9 w-full rounded-lg" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({
  count = 8,
  columns = "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  className,
}: {
  count?: number;
  columns?: string;
  className?: string;
}) {
  return (
    <ul
      className={cn("grid gap-4", columns, className)}
      aria-busy="true"
      aria-label="در حال بارگذاری"
    >
      {Array.from({ length: count }).map((_, i) => (
        <li key={i}>
          <ProductCardSkeleton />
        </li>
      ))}
    </ul>
  );
}
