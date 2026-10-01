import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  description?: string;
  /** "View all" link */
  href?: string;
  linkLabel?: string;
  as?: "h2" | "h3";
  /** id for aria-labelledby on the parent section */
  id?: string;
  className?: string;
  children?: React.ReactNode;
}

/** Consistent section header: title, optional description, optional view-all link. */
export function SectionHeading({
  title,
  description,
  href,
  linkLabel = "مشاهده همه",
  as: Tag = "h2",
  id,
  className,
  children,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-5 flex items-end justify-between gap-4", className)}>
      <div className="min-w-0">
        <Tag id={id} className="text-lg font-bold text-foreground md:text-xl">
          {title}
        </Tag>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
            {description}
          </p>
        )}
      </div>
      {children}
      {href && (
        <Link
          href={href}
          className="flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline focus-visible:underline"
        >
          {linkLabel}
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
