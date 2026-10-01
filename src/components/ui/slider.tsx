"use client";

import * as React from "react";
import { Slider as SliderPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

/** Supports single and range values — renders one thumb per value. */
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(
  (
    { className, value, defaultValue, "aria-label": ariaLabel, ...props },
    ref,
  ) => {
    const count = (value ?? defaultValue ?? [0]).length;
    return (
      <SliderPrimitive.Root
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className,
        )}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-muted">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        {Array.from({ length: count }).map((_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            aria-label={
              count > 1
                ? `${ariaLabel ?? ""} ${i === 0 ? "حداقل" : "حداکثر"}`
                : ariaLabel
            }
            className="block h-5 w-5 rounded-full border-2 border-primary bg-card shadow-xs transition-transform hover:scale-110 focus-visible:outline-hidden focus-visible:ring-4 focus-visible:ring-ring/25 disabled:pointer-events-none disabled:opacity-50"
          />
        ))}
      </SliderPrimitive.Root>
    );
  },
);
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
