import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { toFaDigits } from "@/lib/format";
import { cn } from "@/lib/utils";

interface PaginationNavProps {
  page: number;
  totalPages: number;
  /** Builds the href for a page — keeps pagination crawlable (real links) */
  hrefFor: (page: number) => string;
  className?: string;
}

function pageWindow(page: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "…")[] = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(total - 1, page + 1);
  if (start > 2) pages.push("…");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push("…");
  pages.push(total);
  return pages;
}

/**
 * Accessible, RTL pagination using real (crawlable) links. Scroll is left to the caller: the
 * product listing intercepts these clicks to run them through its pending transition.
 */
export function PaginationNav({
  page,
  totalPages,
  hrefFor,
  className,
}: PaginationNavProps) {
  if (totalPages <= 1) return null;
  const itemClass =
    "inline-flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm font-medium tabular-nums transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <nav
      aria-label="صفحه‌بندی"
      className={cn("flex justify-center", className)}
    >
      <ul className="flex items-center gap-1.5">
        <li>
          {page > 1 ? (
            <Link
              href={hrefFor(page - 1)}
              scroll={false}
              className={cn(
                itemClass,
                "gap-1 border-border bg-card hover:border-primary hover:text-primary",
              )}
              rel="prev"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">قبلی</span>
            </Link>
          ) : (
            <span
              className={cn(
                itemClass,
                "gap-1 border-border text-muted-foreground opacity-50",
              )}
              aria-disabled="true"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">قبلی</span>
            </span>
          )}
        </li>
        {pageWindow(page, totalPages).map((p, i) =>
          p === "…" ? (
            <li
              key={`e-${i}`}
              className="px-1 text-muted-foreground"
              aria-hidden="true"
            >
              …
            </li>
          ) : (
            <li key={p}>
              <Link
                href={hrefFor(p)}
                scroll={false}
                aria-current={p === page ? "page" : undefined}
                aria-label={`صفحه ${toFaDigits(p)}`}
                className={cn(
                  itemClass,
                  p === page
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:border-primary hover:text-primary",
                )}
              >
                {toFaDigits(p)}
              </Link>
            </li>
          ),
        )}
        <li>
          {page < totalPages ? (
            <Link
              href={hrefFor(page + 1)}
              scroll={false}
              className={cn(
                itemClass,
                "gap-1 border-border bg-card hover:border-primary hover:text-primary",
              )}
              rel="next"
            >
              <span className="hidden sm:inline">بعدی</span>
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : (
            <span
              className={cn(
                itemClass,
                "gap-1 border-border text-muted-foreground opacity-50",
              )}
              aria-disabled="true"
            >
              <span className="hidden sm:inline">بعدی</span>
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
