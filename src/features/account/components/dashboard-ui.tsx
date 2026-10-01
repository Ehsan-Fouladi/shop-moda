import Link from "next/link";
import { ChevronLeft, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/** Page heading used by every dashboard screen. */
export function DashboardHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-h2 font-extrabold">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action}
    </header>
  );
}

/** Bordered surface for dashboard sections. */
export function Panel({
  title,
  action,
  children,
  className,
  id,
}: {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      className={cn("rounded-xl border border-border bg-card", className)}
      aria-labelledby={title ? id : undefined}
    >
      {title && (
        <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
          <h2 id={id} className="text-base font-bold">
            {title}
          </h2>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function StatCard({
  icon: Icon,
  label,
  value,
  href,
  tone = "primary",
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
  tone?: "primary" | "info" | "success" | "warning";
}) {
  const toneClass = {
    primary: "bg-accent text-primary",
    info: "bg-info/12 text-info",
    success: "bg-success/12 text-success",
    warning: "bg-warning/15 text-warning-foreground dark:text-warning",
  }[tone];
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition hover:border-primary/40 hover:shadow-xs"
    >
      <span
        className={cn(
          "grid h-11 w-11 shrink-0 place-items-center rounded-lg",
          toneClass,
        )}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-2xl font-extrabold tabular-nums">
          {value}
        </span>
        <span className="block truncate text-xs text-muted-foreground">
          {label}
        </span>
      </span>
      <ChevronLeft
        className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-x-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}
