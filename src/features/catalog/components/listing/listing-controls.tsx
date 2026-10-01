"use client";

import { ArrowDownUp, Check, SlidersHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { FilterPanel } from "@/features/catalog/components/listing/filter-panel";
import { useListingNavigation } from "@/features/catalog/components/listing/listing-navigation";
import { ProductGridSkeleton } from "@/features/catalog/components/product-skeletons";
import {
  sortOptions,
  type Facets,
  type FilterChip,
  type ListingFilters,
  type SortKey,
} from "@/features/catalog/lib/listing-filters";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { toFaDigits } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useState } from "react";

/*
 * Client islands of the product listing. The listing itself (filtering, sorting, pagination,
 * grid) is rendered on the server; these components only turn user input into URL updates.
 */

const sortUpdate = (value: SortKey) => ({
  sort: value === "popular" ? null : value,
});

/** Text-style "clear all" action (sidebar header, chip row). */
export function ClearFiltersLink({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { clearAll } = useListingNavigation();
  return (
    <button type="button" onClick={clearAll} className={className}>
      {children}
    </button>
  );
}

/** Primary button used in the "no results" empty state. */
export function ClearFiltersButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const { clearAll } = useListingNavigation();
  return <Button onClick={clearAll}>{children}</Button>;
}

export function SortButtons({ sort }: { sort: SortKey }) {
  const { update } = useListingNavigation();
  return (
    <div
      className="hidden items-center gap-1 lg:flex"
      role="group"
      aria-label="مرتب‌سازی"
    >
      <span className="me-2 flex items-center gap-1.5 text-sm font-bold">
        <ArrowDownUp className="h-4 w-4" aria-hidden="true" /> مرتب‌سازی:
      </span>
      {sortOptions.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={sort === o.value}
          onClick={() => update(sortUpdate(o.value))}
          className={cn(
            "rounded-md px-2.5 py-1.5 text-sm transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring",
            sort === o.value
              ? "bg-accent font-bold text-accent-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function ActiveFilterChips({ chips }: { chips: FilterChip[] }) {
  const { update, clearAll } = useListingNavigation();
  if (chips.length === 0) return null;
  return (
    <ul
      className="mb-4 flex flex-wrap items-center gap-2"
      aria-label="فیلترهای فعال"
    >
      {chips.map((c) => (
        <li key={c.key}>
          <button
            type="button"
            onClick={() => update(c.remove)}
            className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-accent px-3 py-1 text-xs text-accent-foreground transition-colors hover:border-primary"
            aria-label={`حذف فیلتر ${c.label}`}
          >
            {c.label}
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </li>
      ))}
      <li>
        <button
          type="button"
          onClick={clearAll}
          className="px-2 text-xs font-medium text-destructive hover:underline"
        >
          پاک کردن همه
        </button>
      </li>
    </ul>
  );
}

interface MobileListingControlsProps {
  facets: Facets;
  filters: ListingFilters;
  activeCount: number;
  total: number;
  hideCategory?: boolean;
}

/** Mobile filter + sort buttons and their bottom sheets. */
export function MobileListingControls({
  facets,
  filters,
  activeCount,
  total,
  hideCategory,
}: MobileListingControlsProps) {
  const { update, clearAll } = useListingNavigation();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <>
      <div className="grid w-full grid-cols-2 gap-2 lg:hidden">
        <Button
          variant="outline"
          onClick={() => setFiltersOpen(true)}
          className="justify-center"
        >
          <SlidersHorizontal aria-hidden="true" /> فیلترها
          {activeCount > 0 && (
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] text-primary-foreground">
              {toFaDigits(activeCount)}
            </span>
          )}
        </Button>
        <Button
          variant="outline"
          onClick={() => setSortOpen(true)}
          className="justify-center"
        >
          <ArrowDownUp aria-hidden="true" />{" "}
          {sortOptions.find((o) => o.value === filters.sort)?.label}
        </Button>
      </div>

      <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
        <SheetContent
          side="bottom"
          className="flex h-[88dvh] flex-col gap-0 rounded-t-2xl p-0"
        >
          <SheetHeader className="border-b border-border p-4 text-start">
            <SheetTitle>فیلترها</SheetTitle>
            <SheetDescription className="sr-only">
              فیلتر کردن فهرست محصولات
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-4">
            <FilterPanel
              facets={facets}
              filters={filters}
              hideCategory={hideCategory}
              idPrefix="mob"
            />
          </div>
          <SheetFooter className="grid grid-cols-2 gap-2 border-t border-border p-4">
            <Button
              variant="outline"
              onClick={clearAll}
              disabled={activeCount === 0}
            >
              حذف فیلترها
            </Button>
            <Button onClick={() => setFiltersOpen(false)}>
              مشاهده {toFaDigits(total)} کالا
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet open={sortOpen} onOpenChange={setSortOpen}>
        <SheetContent side="bottom" className="rounded-t-2xl p-0">
          <SheetHeader className="border-b border-border p-4 text-start">
            <SheetTitle>مرتب‌سازی بر اساس</SheetTitle>
            <SheetDescription className="sr-only">
              ترتیب نمایش محصولات را انتخاب کنید
            </SheetDescription>
          </SheetHeader>
          <ul className="p-2 pb-6">
            {sortOptions.map((o) => (
              <li key={o.value}>
                <button
                  type="button"
                  aria-pressed={filters.sort === o.value}
                  onClick={() => {
                    update(sortUpdate(o.value));
                    setSortOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-3.5 text-sm",
                    filters.sort === o.value
                      ? "font-bold text-primary"
                      : "hover:bg-muted",
                  )}
                >
                  {o.label}
                  {filters.sort === o.value && (
                    <Check className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </>
  );
}

/** Shows a skeleton grid while the next filtered page is rendering on the server. */
export function PendingResults({
  skeletonCount,
  columns,
  children,
}: {
  skeletonCount: number;
  columns: string;
  children: React.ReactNode;
}) {
  const { isPending } = useListingNavigation();
  return isPending ? (
    <ProductGridSkeleton count={skeletonCount} columns={columns} />
  ) : (
    <>{children}</>
  );
}

/**
 * Routes plain clicks on the (server-rendered, crawlable) pagination links through the listing
 * transition, so the results skeleton shows while the next page renders, then brings the top of
 * the results into view. Runs in the capture phase so next/link sees `defaultPrevented` and
 * stands down; modified clicks (new tab/window) keep the browser default.
 */
export function ListingPagination({
  scrollTargetId,
  children,
}: {
  scrollTargetId: string;
  children: React.ReactNode;
}) {
  const { navigate } = useListingNavigation();
  const reducedMotion = usePrefersReducedMotion();

  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    )
      return;
    const link =
      e.target instanceof Element
        ? e.target.closest<HTMLAnchorElement>("a[href]")
        : null;
    if (!link || !e.currentTarget.contains(link) || link.target) return;
    e.preventDefault();
    if (link.getAttribute("aria-current") === "page") return;
    navigate(link.getAttribute("href") ?? "");
    document.getElementById(scrollTargetId)?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return <div onClickCapture={onClickCapture}>{children}</div>;
}
