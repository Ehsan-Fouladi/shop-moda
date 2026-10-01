"use client";

import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toFaDigits } from "@/lib/format";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  /** Show a delete button when the minimum is reached */
  onRemove?: () => void;
  size?: "sm" | "md";
  className?: string;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 10,
  onRemove,
  size = "md",
  className,
}: QuantitySelectorProps) {
  const btnSize = size === "sm" ? "h-7 w-7" : "h-9 w-9";
  const atMin = value <= min;
  const atMax = value >= max;

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg border border-input bg-card",
        className,
      )}
      role="group"
      aria-label="انتخاب تعداد"
    >
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          btnSize,
          "rounded-e-none text-foreground hover:text-primary",
        )}
        onClick={() => onChange(value + 1)}
        disabled={atMax}
        aria-label="افزایش تعداد"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </Button>
      <span
        className={cn(
          "min-w-8 text-center font-medium tabular-nums",
          size === "sm" ? "text-sm" : "text-base",
        )}
        aria-live="polite"
      >
        {toFaDigits(value)}
      </span>
      {atMin && onRemove ? (
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            btnSize,
            "rounded-s-none text-destructive hover:text-destructive hover:bg-destructive/10",
          )}
          onClick={onRemove}
          aria-label="حذف از سبد خرید"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            btnSize,
            "rounded-s-none text-foreground hover:text-primary",
          )}
          onClick={() => onChange(value - 1)}
          disabled={atMin}
          aria-label="کاهش تعداد"
        >
          <Minus className="h-4 w-4" aria-hidden="true" />
        </Button>
      )}
    </div>
  );
}
