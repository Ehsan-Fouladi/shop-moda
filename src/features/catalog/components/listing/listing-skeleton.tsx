import { ProductGridSkeleton } from "@/features/catalog/components/product-skeletons";
import { Skeleton } from "@/components/ui/skeleton";

/** Loading state for listing routes (used by loading.tsx and Suspense fallbacks). */
export function ListingSkeleton({
  withHeader = false,
}: {
  withHeader?: boolean;
}) {
  return (
    <div className="container pb-section" aria-busy="true" aria-live="polite">
      <span className="sr-only">در حال بارگذاری محصولات…</span>
      {withHeader && (
        <div className="py-6">
          <Skeleton className="mb-3 h-3 w-40" />
          <Skeleton className="mb-2 h-8 w-64" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>
      )}
      <div className="grid gap-6 lg:grid-cols-[272px_1fr]">
        <div className="hidden space-y-4 rounded-xl border border-border bg-card p-4 lg:block">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          ))}
        </div>
        <div>
          <Skeleton className="mb-4 h-10 w-full" />
          <ProductGridSkeleton
            count={8}
            columns="grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
          />
        </div>
      </div>
    </div>
  );
}
