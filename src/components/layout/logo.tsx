import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  invert = false,
}: {
  className?: string;
  invert?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — صفحه اصلی`}
      className={cn("flex items-center gap-2", className)}
    >
      {/* Original wordmark: berry diamond + Persian name + Latin caption */}
      <span
        aria-hidden="true"
        className={cn(
          "grid h-9 w-9 place-items-center rounded-lg bg-primary",
          invert && "bg-card",
        )}
      >
        <svg
          viewBox="0 0 24 24"
          className={cn(
            "h-5 w-5",
            invert ? "text-primary" : "text-primary-foreground",
          )}
          fill="currentColor"
        >
          <path d="M12 2.5 21.5 12 12 21.5 2.5 12Z" opacity="0.9" />
          <path
            d="M12 7 17 12 12 17 7 12Z"
            className={invert ? "text-card" : "text-primary"}
            fill="currentColor"
            opacity="0.55"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-xl font-bold tracking-tight",
            invert ? "text-card" : "text-foreground",
          )}
        >
          {siteConfig.name}
        </span>
        <span
          className={cn(
            "mt-1 text-[10px] font-medium tracking-[0.35em]",
            invert ? "text-card/70" : "text-muted-foreground",
          )}
        >
          MODA
        </span>
      </span>
    </Link>
  );
}
