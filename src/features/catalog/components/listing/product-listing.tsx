import Link from "next/link";
import { PackageOpen, SearchX, SlidersHorizontal } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { PaginationNav } from "@/components/shared/pagination-nav";
import { Button } from "@/components/ui/button";
import { FilterPanel } from "@/features/catalog/components/listing/filter-panel";
import {
  ActiveFilterChips,
  ClearFiltersButton,
  ClearFiltersLink,
  ListingPagination,
  MobileListingControls,
  PendingResults,
  SortButtons,
} from "@/features/catalog/components/listing/listing-controls";
import { ListingNavigationProvider } from "@/features/catalog/components/listing/listing-navigation";
import { ProductGrid } from "@/features/catalog/components/product-grid";
import { getCategoryName } from "@/features/catalog/data/categories";
import {
  PAGE_SIZE,
  buildListingHref,
  queryListing,
} from "@/features/catalog/lib/listing-filters";
import type { Product } from "@/features/catalog/types";
import { toFaDigits } from "@/lib/format";
import {
  toURLSearchParams,
  type SearchParamsRecord,
} from "@/lib/search-params";

interface ProductListingProps {
  /** Products in scope for this page (category, search results, collection…) */
  products: Product[];
  /** The page's awaited `searchParams` — filters, sort and page live in the URL. */
  searchParams: SearchParamsRecord;
  /** Route path used to build crawlable pagination links. */
  basePath: string;
  hideCategoryFilter?: boolean;
  /** Custom empty-scope content (e.g. an empty subcategory) */
  emptyScope?: React.ReactNode;
}

const GRID_COLS = "grid-cols-2 md:grid-cols-3 xl:grid-cols-4";

/**
 * Complete listing experience: sidebar filters, sorting, chips, grid, pagination, states.
 * Filtering/sorting/pagination run on the server; only the controls are client islands.
 */
export function ProductListing({
  products,
  searchParams,
  basePath,
  hideCategoryFilter,
  emptyScope,
}: ProductListingProps) {
  if (products.length === 0) {
    return (
      <>
        {emptyScope ?? (
          <EmptyState
            icon={PackageOpen}
            title="هنوز محصولی در این بخش وجود ندارد"
            description="به‌زودی محصولات جدید به این بخش اضافه می‌شوند. فعلاً می‌توانید سایر محصولات را ببینید."
          >
            <Button asChild>
              <Link href="/products">مشاهده همه محصولات</Link>
            </Button>
          </EmptyState>
        )}
      </>
    );
  }

  const params = toURLSearchParams(searchParams);
  const {
    filters,
    facets,
    total,
    page,
    totalPages,
    items,
    activeCount,
    chips,
  } = queryListing(products, params, getCategoryName);

  return (
    <ListingNavigationProvider>
      <div className="grid gap-6 lg:grid-cols-[272px_1fr]">
        {/* Desktop sidebar */}
        <aside aria-label="فیلترها" className="hidden lg:block">
          <div className="sticky top-36 max-h-[calc(100dvh-10rem)] overflow-y-auto rounded-xl border border-border bg-card p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-base font-bold">
                <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />{" "}
                فیلترها
              </h2>
              {activeCount > 0 && (
                <ClearFiltersLink className="text-xs font-medium text-primary hover:underline">
                  حذف همه
                </ClearFiltersLink>
              )}
            </div>
            <FilterPanel
              facets={facets}
              filters={filters}
              hideCategory={hideCategoryFilter}
              idPrefix="desk"
            />
          </div>
        </aside>

        <div
          id="listing-results"
          className="min-w-0 scroll-mt-24 lg:scroll-mt-40"
        >
          {/* Toolbar */}
          <div className="mb-4 flex flex-wrap items-center gap-3 border-b border-border pb-3">
            <MobileListingControls
              facets={facets}
              filters={filters}
              activeCount={activeCount}
              total={total}
              hideCategory={hideCategoryFilter}
            />
            <SortButtons sort={filters.sort} />
            <p
              className="ms-auto text-sm text-muted-foreground"
              aria-live="polite"
            >
              <b className="text-foreground tabular-nums">
                {toFaDigits(total)}
              </b>{" "}
              کالا
            </p>
          </div>

          <ActiveFilterChips chips={chips} />

          <PendingResults
            skeletonCount={Math.min(PAGE_SIZE, Math.max(items.length, 4))}
            columns={GRID_COLS}
          >
            {total === 0 ? (
              <EmptyState
                icon={SearchX}
                title="کالایی با این فیلترها پیدا نشد"
                description="فیلترهای انتخاب‌شده را کمتر کنید یا محدوده قیمت را تغییر دهید."
              >
                <ClearFiltersButton>حذف همه فیلترها</ClearFiltersButton>
              </EmptyState>
            ) : (
              <>
                <h2 className="sr-only">فهرست محصولات</h2>
                <ProductGrid
                  products={items}
                  columns={GRID_COLS}
                  priorityCount={2}
                />
                <ListingPagination scrollTargetId="listing-results">
                  <PaginationNav
                    className="mt-10"
                    page={page}
                    totalPages={totalPages}
                    hrefFor={(p) =>
                      buildListingHref(
                        basePath,
                        params,
                        { page: p === 1 ? null : String(p) },
                        false,
                      )
                    }
                  />
                </ListingPagination>
              </>
            )}
          </PendingResults>
        </div>
      </div>
    </ListingNavigationProvider>
  );
}
