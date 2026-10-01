import Link from "next/link";
import { ChevronLeft, Home } from "lucide-react";

import { cn } from "@/lib/utils";

export interface BreadcrumbEntry {
  label: string;
  href?: string;
}

/**
 * Semantic RTL breadcrumb (nav > ol). The last item is the current page.
 * Structure is ready for BreadcrumbList JSON-LD later.
 */
export function PageBreadcrumb({
  items,
  className,
}: {
  items: BreadcrumbEntry[];
  className?: string;
}) {
  const all: BreadcrumbEntry[] = [{ label: "خانه", href: "/" }, ...items];
  return (
    <nav aria-label="مسیر صفحه" className={cn("py-4", className)}>
      <ol className="no-scrollbar flex items-center gap-1.5 overflow-x-auto whitespace-nowrap text-xs text-muted-foreground">
        {all.map((item, i) => {
          const last = i === all.length - 1;
          return (
            <li
              key={`${item.label}-${i}`}
              className="flex items-center gap-1.5"
            >
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="flex items-center gap-1 transition-colors hover:text-primary"
                >
                  {i === 0 && (
                    <Home className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? "page" : undefined}
                  className={cn(last && "font-medium text-foreground")}
                >
                  {item.label}
                </span>
              )}
              {!last && (
                <ChevronLeft
                  className="h-3.5 w-3.5 shrink-0 opacity-60"
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
