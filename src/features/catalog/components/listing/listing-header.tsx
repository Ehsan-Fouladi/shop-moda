import {
  PageBreadcrumb,
  type BreadcrumbEntry,
} from "@/components/shared/page-breadcrumb";
import { toFaDigits } from "@/lib/format";

interface ListingHeaderProps {
  title: string;
  description?: string;
  count?: number;
  breadcrumb: BreadcrumbEntry[];
  children?: React.ReactNode;
}

/** Page header for listing routes: breadcrumb, H1, description, product count. */
export function ListingHeader({
  title,
  description,
  count,
  breadcrumb,
  children,
}: ListingHeaderProps) {
  return (
    <header className="mb-6">
      <PageBreadcrumb items={breadcrumb} />
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="max-w-3xl">
          <h1 className="text-h1">{title}</h1>
          {description && (
            <p className="mt-2 text-body text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        {count !== undefined && (
          <p className="text-sm text-muted-foreground">
            <span className="font-bold text-foreground tabular-nums">
              {toFaDigits(count)}
            </span>{" "}
            محصول
          </p>
        )}
      </div>
      {children}
    </header>
  );
}
