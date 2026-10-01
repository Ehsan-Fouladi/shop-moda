"use client";

import { toFaDigits } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Fragment, useEffect, useState } from "react";

/** Rolling countdown to the next midnight (Tehran-agnostic, UI only). Renders dashes until mounted to avoid hydration mismatch. */
export function Countdown({
  className,
  tone = "onPrimary",
}: {
  className?: string;
  tone?: "onPrimary" | "default";
}) {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(24, 0, 0, 0);
      setLeft(Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000)));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const parts =
    left === null
      ? ["--", "--", "--"]
      : [
          Math.floor(left / 3600),
          Math.floor((left % 3600) / 60),
          left % 60,
        ].map((n) => toFaDigits(String(n).padStart(2, "0")));
  const labels = ["ساعت", "دقیقه", "ثانیه"];

  return (
    <div
      className={cn("flex items-center gap-1.5", className)}
      dir="ltr"
      role="timer"
      aria-label="زمان باقی‌مانده تا پایان پیشنهاد"
    >
      {parts.map((p, i) => (
        <Fragment key={labels[i]}>
          {i > 0 && (
            <span
              className={cn(
                "font-bold",
                tone === "onPrimary"
                  ? "text-primary-foreground/70"
                  : "text-muted-foreground",
              )}
              aria-hidden="true"
            >
              :
            </span>
          )}
          <span
            className={cn(
              "grid h-10 w-10 place-items-center rounded-lg text-base font-bold tabular-nums",
              tone === "onPrimary"
                ? "bg-primary-foreground text-primary dark:bg-foreground dark:text-background"
                : "bg-foreground text-background",
            )}
            aria-label={`${p} ${labels[i]}`}
          >
            {p}
          </span>
        </Fragment>
      ))}
    </div>
  );
}
