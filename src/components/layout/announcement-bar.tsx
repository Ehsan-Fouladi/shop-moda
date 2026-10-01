"use client";

import { X } from "lucide-react";

import { announcements } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

/** Dismissible announcement bar with rotating messages. */
export function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (dismissed) return;
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % announcements.length);
        setVisible(true);
      }, 300);
    }, 2000);
    return () => clearInterval(timer);
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div className="bg-primary text-primary-foreground dark:bg-accent dark:text-accent-foreground">
      <div className="container relative flex h-9 items-center justify-center gap-3">
        <p
          className={cn(
            "truncate px-8 text-center text-xs font-medium transition-opacity duration-300 md:text-[13px]",
            visible ? "opacity-100" : "opacity-0",
          )}
          aria-live="polite"
        >
          {announcements[index]}
        </p>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="بستن نوار اعلان"
          className="absolute end-3 grid h-7 w-7 place-items-center rounded-full text-primary-mut/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-mut focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-foreground/60"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
