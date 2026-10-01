import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // min-h-dvh keeps the footer below the fold while this briefly shows, so the swap causes no layout shift.
  return (
    <div className="min-h-dvh space-y-5" aria-busy="true">
      <span className="sr-only">در حال بارگذاری…</span>
      <Skeleton className="h-8 w-48" />
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-48 w-full rounded-xl" />
      <Skeleton className="h-36 w-full rounded-xl" />
    </div>
  );
}
