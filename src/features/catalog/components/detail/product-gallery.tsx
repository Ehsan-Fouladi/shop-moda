"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, ZoomIn } from "lucide-react";

import { ProductBadgeTag } from "@/features/catalog/components/product-badges";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { discountPercent, toFaDigits } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Product } from "@/features/catalog/types";
import { useRef, useState } from "react";

/**
 * Product gallery.
 * Desktop: vertical thumbnails + main image with hover zoom, click opens a lightbox.
 * Mobile: swipeable scroll-snap slides with position indicators.
 */
export function ProductGallery({ product }: { product: Product }) {
  const images = product.images;
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const [lightbox, setLightbox] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const percent = discountPercent(product.price, product.oldPrice);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setZoom({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const onTrackScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setActive(Math.round(Math.abs(el.scrollLeft) / el.clientWidth));
  };

  const go = (i: number) => setActive((i + images.length) % images.length);

  const alt = (i: number) =>
    `${product.title} — تصویر ${toFaDigits(i + 1)} از ${toFaDigits(images.length)}`;

  return (
    <div className="lg:sticky lg:top-36">
      {/* Desktop */}
      <div className="hidden gap-3 md:flex">
        <ul
          className="flex w-20 shrink-0 flex-col gap-2"
          aria-label="تصاویر کوچک محصول"
        >
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`نمایش تصویر ${toFaDigits(i + 1)}`}
                aria-current={active === i}
                className={cn(
                  "product-surface relative block aspect-4/5 w-full overflow-hidden rounded-lg border-2 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring",
                  active === i
                    ? "border-primary"
                    : "border-transparent opacity-75 hover:opacity-100",
                )}
              >
                <Image
                  src={src}
                  alt="smile-image"
                  draggable="false"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>

        <div className="relative flex-1">
          <div
            className="product-surface relative aspect-4/5 cursor-zoom-in overflow-hidden rounded-2xl border border-border/60"
            onMouseMove={onMove}
            onMouseLeave={() => setZoom(null)}
            onClick={() => setLightbox(true)}
          >
            <Image
              src={images[active]}
              alt={alt(active)}
              draggable="false"
              fill
              // Same `sizes` as the mobile slide below, so both resolve to one URL (one download).
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 40vw, (min-width: 768px) 60vw, 100vw"
              className="object-cover transition-transform duration-200 ease-out"
              style={
                zoom
                  ? {
                      transform: "scale(1.9)",
                      transformOrigin: `${zoom.x}% ${zoom.y}%`,
                    }
                  : undefined
              }
            />
          </div>
          <div className="pointer-events-none absolute top-4 inset-s-4 flex flex-col items-start gap-2">
            {product.badge && <ProductBadgeTag badge={product.badge} />}
            {percent > 0 && (
              <span className="rounded-md bg-sale px-2 py-0.5 text-xs font-bold text-sale-foreground">
                {toFaDigits(percent)}٪ تخفیف
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => setLightbox(true)}
            className="absolute bottom-4 inset-e-4 flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-2 text-xs font-medium shadow-card backdrop-blur-sm hover:bg-card focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Expand className="h-4 w-4" aria-hidden="true" /> نمایش بزرگ
          </button>
          <p className="pointer-events-none absolute bottom-4 inset-s-4 hidden items-center gap-1 rounded-full bg-card/80 px-2.5 py-1.5 text-[11px] text-muted-foreground backdrop-blur-sm lg:flex">
            <ZoomIn className="h-3.5 w-3.5" aria-hidden="true" /> برای
            بزرگ‌نمایی نشانگر را روی تصویر ببرید
          </p>
        </div>
      </div>

      {/* Mobile swipe */}
      <div className="relative -mx-4 md:hidden">
        <div
          ref={trackRef}
          onScroll={onTrackScroll}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
        >
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setLightbox(true)}
              className="product-surface relative aspect-4/5 w-full shrink-0 snap-center"
              aria-label={`بزرگ‌نمایی تصویر ${toFaDigits(i + 1)}`}
            >
              <Image
                src={src}
                alt={alt(i)}
                draggable="false"
                fill
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                sizes="(min-width: 1024px) 40vw, (min-width: 768px) 60vw, 100vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
        <div className="pointer-events-none absolute top-3 inset-s-4 flex flex-col items-start gap-2">
          {product.badge && <ProductBadgeTag badge={product.badge} />}
          {percent > 0 && (
            <span className="rounded-md bg-sale px-2 py-0.5 text-xs font-bold text-sale-foreground">
              {toFaDigits(percent)}٪
            </span>
          )}
        </div>
        <div
          className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5"
          aria-hidden="true"
        >
          {images.map((src, i) => (
            <span
              key={src}
              className={cn(
                "h-1.5 rounded-full bg-foreground/30 transition-all",
                active === i ? "w-5 bg-primary" : "w-1.5",
              )}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={lightbox} onOpenChange={setLightbox}>
        <DialogContent className="max-w-3xl gap-0 overflow-hidden p-0 max-sm:h-dvh max-sm:max-w-none max-sm:rounded-none">
          <DialogTitle className="sr-only">{product.title}</DialogTitle>
          <DialogDescription className="sr-only">
            گالری تصاویر محصول
          </DialogDescription>
          <div className="product-surface relative aspect-4/5 max-h-[80dvh] w-full max-sm:h-full max-sm:max-h-none max-sm:aspect-auto">
            <Image
              src={images[active]}
              alt={alt(active)}
              draggable="false"
              fill
              sizes="768px"
              className="object-contain"
            />
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(active - 1)}
                  className="absolute top-1/2 inset-s-3 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-card/90 shadow-card hover:text-primary"
                  aria-label="تصویر قبلی"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(active + 1)}
                  className="absolute top-1/2 inset-e-3 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-card/90 shadow-card hover:text-primary"
                  aria-label="تصویر بعدی"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
              </>
            )}
            <p className="absolute bottom-3 inset-x-0 text-center text-xs text-muted-foreground tabular-nums">
              {toFaDigits(active + 1)} / {toFaDigits(images.length)}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
