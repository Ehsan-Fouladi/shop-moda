"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

interface CarouselRailProps {
  label: string;
  className?: string;
  /** `<li>` items */
  children: React.ReactNode;
}

/**
 * Horizontal, scroll-snapping rail (native scrolling = touch friendly).
 * Arrow buttons page through items; RTL-aware (next = toward the inline end).
 * Items are passed as children so they can be server-rendered.
 */
export function CarouselRail({
  label,
  className,
  children,
}: CarouselRailProps) {
  const ref = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const pos = Math.abs(el.scrollLeft); // RTL scrollLeft is 0 → negative
    setCanPrev(pos > 4);
    setCanNext(pos + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    const el = ref.current;
    el?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    // In RTL, moving "next" means scrolling toward negative scrollLeft
    el.scrollBy({ left: -dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  const btn =
    "absolute top-[38%] z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-border bg-card/95 text-foreground shadow-card-hover backdrop-blur-sm transition-opacity hover:text-primary focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-0 md:grid";

  return (
    <div
      className={cn("relative", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <button
        type="button"
        className={cn(btn, "-inset-s-4")}
        onClick={() => scroll(-1)}
        disabled={!canPrev}
        aria-label="موارد قبلی"
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>
      <ul
        ref={ref}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-2 sm:gap-4 md:mx-0 md:scroll-px-0 md:px-0"
      >
        {children}
      </ul>
      <button
        type="button"
        className={cn(btn, "-inset-e-4")}
        onClick={() => scroll(1)}
        disabled={!canNext}
        aria-label="موارد بعدی"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
