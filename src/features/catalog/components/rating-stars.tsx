import { Star } from "lucide-react";

import { toFaDigits } from "@/lib/format";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
  /** Show the numeric score next to the stars */
  showValue?: boolean;
  className?: string;
}

/** Read-only star rating with half-star precision and an accessible label. */
export function RatingStars({
  rating,
  reviewCount,
  size = "sm",
  showValue = true,
  className,
}: RatingStarsProps) {
  const starSize = size === "sm" ? "h-3.5 w-3.5" : "h-[18px] w-[18px]";
  const percent = Math.max(0, Math.min(100, (rating / 5) * 100));

  return (
    <div
      className={cn("flex flex-wrap items-center gap-x-1 gap-y-0.5", className)}
      role="img"
      aria-label={`امتیاز ${toFaDigits(rating.toFixed(1))} از ۵${
        reviewCount !== undefined
          ? ` بر اساس ${toFaDigits(reviewCount)} نظر`
          : ""
      }`}
    >
      <span className="relative inline-flex" aria-hidden="true">
        <span className="flex gap-0.5 text-muted-foreground/35">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={cn(starSize, "fill-current")} />
          ))}
        </span>
        <span
          className="absolute inset-0 flex gap-0.5 overflow-hidden text-rating"
          style={{ width: `${percent}%` }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={cn(starSize, "shrink-0 fill-current")} />
          ))}
        </span>
      </span>
      {showValue && (
        <span
          className={cn(
            "font-medium tabular-nums",
            size === "sm" ? "text-xs" : "text-sm",
          )}
        >
          {toFaDigits(rating.toFixed(1))}
        </span>
      )}
      {reviewCount !== undefined && (
        <span
          className={cn(
            "text-muted-foreground",
            size === "sm" ? "text-xs" : "text-sm",
          )}
        >
          ({toFaDigits(reviewCount)})
        </span>
      )}
    </div>
  );
}
