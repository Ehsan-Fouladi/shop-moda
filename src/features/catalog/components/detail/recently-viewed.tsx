"use client";

import * as z from "zod/mini";

import { SectionHeading } from "@/components/shared/section-heading";
import { ProductCarousel } from "@/features/catalog/components/product-carousel";
import { productSummarySchema } from "@/features/catalog/schemas/product-summary-schema";
import type { ProductSummary } from "@/features/catalog/types";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useEffect } from "react";

const KEY = "moda-recently-viewed";
const MAX_ITEMS = 12;
const historySchema = z.array(productSummarySchema).check(z.maxLength(50));
const validateHistory = (value: unknown) => {
  const parsed = historySchema.safeParse(value);
  return parsed.success ? parsed.data : null;
};

interface RecentlyViewedProps {
  current: ProductSummary;
  /** Mock history shown on a first visit (server-provided). */
  fallback: ProductSummary[];
}

/**
 * Records the current product and shows previously viewed ones. Summaries are stored in
 * localStorage (validated on read), so no client-side catalog lookup is needed.
 */
export function RecentlyViewed({ current, fallback }: RecentlyViewedProps) {
  const [history, setHistory] = useLocalStorage(KEY, validateHistory, fallback);

  // Record this visit; the current product moves to the front of the history.
  useEffect(() => {
    setHistory((prev) =>
      [current, ...prev.filter((p) => p.id !== current.id)].slice(0, MAX_ITEMS),
    );
  }, [current, setHistory]);

  // Derived: everything viewed except the product on screen.
  const items = history.filter((p) => p.id !== current.id);
  if (!items.length) return null;

  return (
    <section aria-labelledby="recently-viewed" className="mt-14">
      <SectionHeading id="recently-viewed" title="بازدیدهای اخیر شما" />
      <ProductCarousel products={items} label="بازدیدهای اخیر" compact />
    </section>
  );
}
