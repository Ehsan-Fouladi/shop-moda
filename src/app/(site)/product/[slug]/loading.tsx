import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // min-h-dvh keeps the footer below the fold while this briefly shows, so the swap causes no layout shift.
  return (
    <div className="container min-h-dvh pb-section" aria-busy="true">
      <span className="sr-only">در حال بارگذاری محصول…</span>
      <Skeleton className="my-5 h-3 w-64" />
      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex gap-3">
          <div className="hidden w-20 flex-col gap-2 md:flex">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="aspect-4/5 w-full" />
            ))}
          </div>
          <Skeleton className="aspect-4/5 flex-1 rounded-2xl" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-11 w-60" />
          <Skeleton className="h-11 w-72" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
