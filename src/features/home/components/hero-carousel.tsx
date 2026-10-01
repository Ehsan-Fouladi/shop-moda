"use client";

import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { toFaDigits } from "@/lib/format";
import { cn } from "@/lib/utils";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

export interface HeroSlide {
  id: string;
  /** Plain-text title, used for the slide's accessible name */
  title: string;
  /** Server-rendered slide body (image + copy) */
  content: React.ReactNode;
}

interface HeroCarouselProps {
  label: string;
  slides: HeroSlide[];
  /** Static content rendered beside the controls on every slide */
  aside?: React.ReactNode;
  /** Autoplay delay per slide, in ms */
  interval?: number;
}

const SWIPE_THRESHOLD = 48;

function subscribeVisibility(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}

/**
 * Crossfading hero carousel. All slides share one grid cell, so the height is that of the tallest
 * slide and never shifts. Autoplay pauses while the mouse is over the controls, while keyboard focus
 * is inside the carousel, in hidden tabs and via the pause button, and starts paused when the user
 * prefers reduced motion. Hovering the (full-bleed) slide itself or clicking/tapping a control does
 * not pause it — the cursor usually rests over the hero and mouse/touch focus lingers on the button.
 * RTL: "next" is toward the left.
 */
export function HeroCarousel({
  label,
  slides,
  aside,
  interval = 3000,
}: HeroCarouselProps) {
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [playPreference, setPlayPreference] = useState<boolean | null>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const reducedMotion = usePrefersReducedMotion();
  const pageVisible = useSyncExternalStore(
    subscribeVisibility,
    () => !document.hidden,
    () => true,
  );

  const autoplay = reducedMotion ?? !playPreference;
  const rotating = autoplay && !hovered && !focused && pageVisible && count > 1;

  const go = useCallback(
    (step: number) => setIndex((i) => (i + step + count) % count),
    [count],
  );

  // Re-armed on every slide change, so manual navigation restarts the full interval.
  useEffect(() => {
    if (!rotating) return;
    const timer = window.setTimeout(() => go(1), interval);
    return () => window.clearTimeout(timer);
  }, [rotating, index, interval, go]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") go(1);
    else if (e.key === "ArrowRight") go(-1);
    else return;
    e.preventDefault();
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    const touch = e.changedTouches[0];
    if (!start || !touch) return;
    const dx = touch.clientX - start.x;
    if (
      Math.abs(dx) < SWIPE_THRESHOLD ||
      Math.abs(dx) < Math.abs(touch.clientY - start.y)
    )
      return;
    go(dx > 0 ? 1 : -1); // RTL: swiping right reveals the next slide
  };

  const controlButton =
    "grid h-9 w-9 place-items-center rounded-full text-foreground transition-colors hover:bg-muted hover:text-primary focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      className="relative isolate overflow-hidden bg-muted"
      // Only keyboard focus pauses; mouse/touch focus on a control must not stop rotation.
      onFocus={(e) => setFocused(e.target.matches(":focus-visible"))}
      onBlur={(e) =>
        !e.currentTarget.contains(e.relatedTarget) && setFocused(false)
      }
      onTouchStart={(e) => {
        const touch = e.touches[0];
        touchStart.current = touch
          ? { x: touch.clientX, y: touch.clientY }
          : null;
      }}
      onTouchEnd={onTouchEnd}
    >
      <div className="grid" aria-live={rotating ? "off" : "polite"}>
        {slides.map((slide, i) => {
          const active = i === index;
          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${toFaDigits(i + 1)} از ${toFaDigits(count)}: ${slide.title}`}
              aria-hidden={!active}
              inert={!active}
              className={cn(
                "col-start-1 row-start-1 transition-[opacity,visibility] duration-700 ease-out motion-reduce:transition-none",
                active ? "visible opacity-100" : "invisible opacity-0",
              )}
            >
              {slide.content}
            </div>
          );
        })}
      </div>

      {count > 1 && (
        <div className="container relative flex items-center justify-between gap-4 pb-6 md:absolute md:inset-x-0 md:bottom-0 md:pb-16">
          {aside}
          <div
            className="ms-auto flex items-center rounded-full border border-border bg-background/85 p-1 shadow-card backdrop-blur-sm"
            onKeyDown={onKeyDown}
            onPointerEnter={(e) =>
              e.pointerType === "mouse" && setHovered(true)
            }
            onPointerLeave={() => setHovered(false)}
          >
            <button
              type="button"
              className={controlButton}
              onClick={() => go(-1)}
              aria-label="اسلاید قبلی"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="flex items-center">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  className="group grid h-9 min-w-7 place-items-center rounded-full focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
                  onClick={() => setIndex(i)}
                  aria-label={`نمایش اسلاید ${toFaDigits(i + 1)}: ${slide.title}`}
                  aria-current={i === index ? "true" : undefined}
                >
                  <span
                    className={cn(
                      "block h-2 rounded-full transition-all duration-300 motion-reduce:transition-none",
                      i === index
                        ? "w-6 bg-primary"
                        : "w-2 bg-foreground/30 group-hover:bg-foreground/60",
                    )}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              className={controlButton}
              onClick={() => go(1)}
              aria-label="اسلاید بعدی"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className={controlButton}
              onClick={() => setPlayPreference(!autoplay)}
              aria-label={
                autoplay ? "توقف نمایش خودکار اسلایدها" : "پخش خودکار اسلایدها"
              }
            >
              {autoplay ? (
                <Pause className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Play className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
