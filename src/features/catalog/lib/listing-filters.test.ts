import { describe, expect, it } from "vitest";

import {
  buildClearFiltersHref,
  buildListingHref,
  parseFilters,
  queryListing,
} from "@/features/catalog/lib/listing-filters";
import type { Product } from "@/features/catalog/types";

const make = (id: string, over: Partial<Product> = {}): Product => ({
  id,
  slug: id,
  title: `محصول ${id}`,
  brand: "مُدا",
  categoryId: "women",
  price: 100000,
  rating: 4,
  reviewCount: 1,
  images: ["/x.svg"],
  status: "in-stock",
  shortDescription: "",
  description: "",
  specs: [],
  createdAt: "2026-01-01T00:00:00Z",
  ...over,
});

describe("parseFilters", () => {
  it("falls back to defaults for invalid values instead of trusting the URL", () => {
    const f = parseFilters(new URLSearchParams("sort=evil&page=-4&min=abc"));
    expect(f.sort).toBe("popular");
    expect(f.page).toBe(1);
    expect(f.min).toBeUndefined();
  });

  it("only accepts whole page numbers", () => {
    expect(parseFilters(new URLSearchParams("page=2.7")).page).toBe(2);
    expect(parseFilters(new URLSearchParams("page=0.5")).page).toBe(1);
    expect(parseFilters(new URLSearchParams("page=Infinity")).page).toBe(1);
  });
});

describe("queryListing", () => {
  const products = Array.from({ length: 30 }, (_, i) =>
    make(`p${i}`, {
      price: (i + 1) * 10000,
      status: i === 0 ? "out-of-stock" : "in-stock",
    }),
  );

  it("paginates, clamps the page and sinks out-of-stock items", () => {
    const r = queryListing(
      products,
      new URLSearchParams("sort=price-asc&page=99"),
      () => "زنانه",
    );
    expect(r.totalPages).toBe(3);
    expect(r.page).toBe(3);
    expect(r.items.at(-1)?.id).toBe("p0");
  });

  it("filters by price and builds chips", () => {
    const r = queryListing(
      products,
      new URLSearchParams("min=100000&max=150000"),
      () => "زنانه",
    );
    expect(r.total).toBe(6);
    expect(r.activeCount).toBe(1);
    expect(r.chips.map((c) => c.key)).toEqual(["price"]);
  });
});

describe("href builders", () => {
  it("resets pagination on filter change and keeps scope keys on clear", () => {
    const current = new URLSearchParams("q=کیف&brand=a&page=3");
    expect(buildListingHref("/search", current, { brand: null })).toBe(
      `/search?q=${encodeURIComponent("کیف")}`,
    );
    expect(buildClearFiltersHref("/search", current)).toBe(
      `/search?q=${encodeURIComponent("کیف")}`,
    );
  });
});
