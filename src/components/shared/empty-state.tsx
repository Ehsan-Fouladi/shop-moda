import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

/** Shared empty / no-results / error-style placeholder. */
export function EmptyState({
  icon: Icon,
  title,
  description,
  children,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-card/50 px-6 py-14 text-center",
        className,
      )}
    >
      <span className="grid h-16 w-16 place-items-center rounded-full bg-muted text-muted-foreground">
        <Icon className="h-7 w-7" aria-hidden="true" />
      </span>
      <h3 className="text-base font-bold text-foreground">{title}</h3>
      {description && (
        <p className="max-w-md text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      )}
      {children && (
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          {children}
        </div>
      )}
    </div>
  );
}
