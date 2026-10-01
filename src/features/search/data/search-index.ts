import "server-only";

import { categories } from "@/features/catalog/data/categories";
import { products } from "@/features/catalog/data/products";
import type { SearchIndex } from "@/features/search/types";

/** Built on the server and passed to the search dialog as props (no catalog in client bundles). */
export function getSearchIndex(): SearchIndex {
  return {
    products: products.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      brand: p.brand,
      price: p.price,
      image: p.images[0],
    })),
    categories: categories.map((c) => ({
      id: c.id,
      slug: c.slug,
      name: c.name,
    })),
  };
}
