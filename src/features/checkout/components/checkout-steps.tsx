import { Check } from "lucide-react";

import { toFaDigits } from "@/lib/format";
import { cn } from "@/lib/utils";

const steps = ["سبد خرید", "اطلاعات و پرداخت", "ثبت سفارش"];

/** Purchase progress indicator (cart → checkout → success). */
export function CheckoutSteps({ current }: { current: 1 | 2 | 3 }) {
  return (
    <nav aria-label="مراحل خرید">
      <ol className="flex items-center gap-2 text-xs sm:text-sm">
        {steps.map((label, i) => {
          const n = i + 1;
          const done = n < current;
          const active = n === current;
          return (
            <li
              key={label}
              className="flex items-center gap-2"
              aria-current={active ? "step" : undefined}
            >
              <span
                className={cn(
                  "grid h-7 w-7 place-items-center rounded-full border text-xs font-bold tabular-nums",
                  done && "border-success bg-success text-success-foreground",
                  active && "border-primary bg-primary text-primary-foreground",
                  !done && !active && "border-border text-muted-foreground",
                )}
              >
                {done ? (
                  <Check className="h-4 w-4" aria-hidden="true" />
                ) : (
                  toFaDigits(n)
                )}
              </span>
              <span
                className={cn(
                  "hidden sm:inline",
                  active ? "font-bold" : "text-muted-foreground",
                )}
              >
                {label}
              </span>
              {n < steps.length && (
                <span
                  className="h-px w-6 bg-border sm:w-10"
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
