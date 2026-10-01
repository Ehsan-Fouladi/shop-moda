import { CarouselRail } from "@/components/shared/carousel-rail";
import { ProductCard } from "@/features/catalog/components/product-card";
import type { ProductSummary } from "@/features/catalog/types";

interface ProductCarouselProps {
  products: ProductSummary[];
  label: string;
  className?: string;
  compact?: boolean;
}

/** Product rail: server-renderable cards inside the interactive carousel rail. */
export function ProductCarousel({
  products,
  label,
  className,
  compact = false,
}: ProductCarouselProps) {
  return (
    <CarouselRail label={label} className={className}>
      {products.map((p) => (
        <li
          key={p.id}
          className="w-[46%] shrink-0 snap-start sm:w-[31%] lg:w-[23.5%] xl:w-[19%]"
        >
          <ProductCard product={p} compact={compact} className="h-full" />
        </li>
      ))}
    </CarouselRail>
  );
}
