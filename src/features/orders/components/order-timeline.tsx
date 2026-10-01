import { Check } from "lucide-react";

import { formatDateFa } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { TimelineStep } from "@/features/orders/types";

/** Order progress. Horizontal on md+, vertical on mobile. */
export function OrderTimeline({
  steps,
  cancelled = false,
}: {
  steps: TimelineStep[];
  cancelled?: boolean;
}) {
  return (
    <ol className="flex flex-col gap-0 md:flex-row" aria-label="مراحل سفارش">
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        return (
          <li
            key={s.label}
            className="relative flex gap-3 pb-6 last:pb-0 md:flex-1 md:flex-col md:items-center md:pb-0 md:text-center"
            aria-current={s.current ? "step" : undefined}
          >
            {!last && (
              <span
                className={cn(
                  "absolute inset-s-[15px] top-8 h-[calc(100%-2rem)] w-0.5 md:inset-s-[calc(50%+18px)] md:top-[15px] md:h-0.5 md:w-[calc(100%-36px)]",
                  steps[i + 1]?.done
                    ? cancelled
                      ? "bg-destructive"
                      : "bg-success"
                    : "bg-border",
                )}
                aria-hidden="true"
              />
            )}
            <span
              className={cn(
                "relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border-2",
                s.done
                  ? cancelled && last
                    ? "border-destructive bg-destructive text-destructive-foreground"
                    : "border-success bg-success text-success-foreground"
                  : "border-border bg-card",
                s.current && !cancelled && "ring-4 ring-success/20",
              )}
            >
              {s.done ? (
                <Check className="h-4 w-4" aria-hidden="true" />
              ) : (
                <span
                  className="h-2 w-2 rounded-full bg-border"
                  aria-hidden="true"
                />
              )}
            </span>
            <span className="md:mt-2">
              <span
                className={cn(
                  "block text-sm",
                  s.done ? "font-bold" : "text-muted-foreground",
                )}
              >
                {s.label}
              </span>
              <span className="block text-xs text-muted-foreground">
                {s.date ? formatDateFa(s.date) : "—"}
                <span className="sr-only">
                  {s.done ? " (انجام شده)" : " (در انتظار)"}
                </span>
              </span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
