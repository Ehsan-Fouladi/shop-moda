import type { Product, ProductSummary } from "@/features/catalog/types";

export function toProductSummary(p: Product | ProductSummary): ProductSummary {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    brand: p.brand,
    price: p.price,
    oldPrice: p.oldPrice,
    rating: p.rating,
    reviewCount: p.reviewCount,
    images: p.images,
    badge: p.badge,
    status: p.status,
    colors: p.colors,
    sizes: p.sizes,
  };
}
