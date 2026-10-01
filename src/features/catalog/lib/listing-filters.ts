import type { Product } from "@/features/catalog/types";
import { formatPrice, toFaDigits } from "@/lib/format";

/**
 * Pure, URL-driven listing logic shared by the server (querying) and the client
 * (building hrefs). When a real API exists, the same params can be forwarded to it.
 */

export const PAGE_SIZE = 12;

export type SortKey =
  "popular" | "newest" | "price-asc" | "price-desc" | "rating";

export const sortOptions: readonly { value: SortKey; label: string }[] = [
  { value: "popular", label: "محبوب‌ترین" },
  { value: "newest", label: "جدیدترین" },
  { value: "price-asc", label: "ارزان‌ترین" },
  { value: "price-desc", label: "گران‌ترین" },
  { value: "rating", label: "بیشترین امتیاز" },
];

/** Color families: many product color names map to a few filterable swatches. */
const colorFamilies: {
  id: string;
  label: string;
  hex: string;
  match: string[];
}[] = [
  { id: "black", label: "مشکی", hex: "#1C1C1E", match: ["مشکی"] },
  { id: "white", label: "سفید", hex: "#F5F5F4", match: ["سفید"] },
  { id: "gray", label: "طوسی", hex: "#8E8E93", match: ["طوسی", "نقره"] },
  { id: "navy", label: "سرمه‌ای", hex: "#27324A", match: ["سرمه"] },
  { id: "blue", label: "آبی", hex: "#7FA6D0", match: ["آبی", "فیروزه"] },
  {
    id: "brown",
    label: "قهوه‌ای",
    hex: "#7A5236",
    match: ["قهوه", "عسلی", "شتری", "خاکی"],
  },
  {
    id: "pink",
    label: "صورتی",
    hex: "#E8A0B4",
    match: ["صورتی", "نود", "رزگلد"],
  },
  {
    id: "red",
    label: "قرمز و زرشکی",
    hex: "#8E2B3A",
    match: ["زرشکی", "شرابی", "لاکی"],
  },
  { id: "green", label: "سبز", hex: "#5C6445", match: ["زیتون", "سبز"] },
  {
    id: "beige",
    label: "کرم و طلایی",
    hex: "#D9C3A0",
    match: ["کرم", "طلایی", "میل"],
  },
  { id: "purple", label: "بنفش", hex: "#5B3A5E", match: ["بنفش"] },
];

const CLOTHING_SIZES = ["S", "M", "L", "XL", "2XL"];

export interface ListingFilters {
  categories: string[];
  brands: string[];
  sizes: string[];
  colors: string[];
  min?: number;
  max?: number;
  rating?: number;
  inStock: boolean;
  onSale: boolean;
  sort: SortKey;
  page: number;
}

/** A URL update: `null` removes the key. */
export type FilterUpdate = Record<string, string | null>;

type ParamsLike = { get(key: string): string | null };

function isSortKey(value: string | null): value is SortKey {
  return sortOptions.some((o) => o.value === value);
}

const list = (v: string | null) => (v ? v.split(",").filter(Boolean) : []);
const num = (v: string | null) =>
  v && !Number.isNaN(Number(v)) ? Number(v) : undefined;

/** Page numbers are positive integers; anything else (`1.5`, `abc`, `-2`) falls back safely. */
function parsePage(v: string | null): number {
  const n = num(v);
  return n !== undefined && Number.isFinite(n) ? Math.max(1, Math.floor(n)) : 1;
}

export function parseFilters(params: ParamsLike): ListingFilters {
  const sort = params.get("sort");
  return {
    categories: list(params.get("category")),
    brands: list(params.get("brand")),
    sizes: list(params.get("size")),
    colors: list(params.get("color")),
    min: num(params.get("min")),
    max: num(params.get("max")),
    rating: num(params.get("rating")),
    inStock: params.get("stock") === "1",
    onSale: params.get("sale") === "1",
    sort: isSortKey(sort) ? sort : "popular",
    page: parsePage(params.get("page")),
  };
}

function countActiveFilters(f: ListingFilters): number {
  return (
    f.categories.length +
    f.brands.length +
    f.sizes.length +
    f.colors.length +
    (f.min !== undefined || f.max !== undefined ? 1 : 0) +
    (f.rating ? 1 : 0) +
    (f.inStock ? 1 : 0) +
    (f.onSale ? 1 : 0)
  );
}

function matchesColor(product: Product, colorIds: string[]) {
  if (!colorIds.length) return true;
  const families = colorFamilies.filter((c) => colorIds.includes(c.id));
  return (product.colors ?? []).some((pc) =>
    families.some((fam) => fam.match.some((m) => pc.name.includes(m))),
  );
}

function applyFilters(products: Product[], f: ListingFilters): Product[] {
  const filtered = products.filter((p) => {
    if (f.categories.length && !f.categories.includes(p.categoryId))
      return false;
    if (f.brands.length && !f.brands.includes(p.brand)) return false;
    if (f.sizes.length && !(p.sizes ?? []).some((s) => f.sizes.includes(s)))
      return false;
    if (!matchesColor(p, f.colors)) return false;
    if (f.min !== undefined && p.price < f.min) return false;
    if (f.max !== undefined && p.price > f.max) return false;
    if (f.rating && p.rating < f.rating) return false;
    if (f.inStock && p.status === "out-of-stock") return false;
    if (f.onSale && !p.oldPrice) return false;
    return true;
  });

  const sorted = [...filtered];
  switch (f.sort) {
    case "newest":
      sorted.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
      break;
    case "price-asc":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    default:
      sorted.sort((a, b) => (b.soldCount ?? 0) - (a.soldCount ?? 0));
  }
  // Out-of-stock items always sink to the end
  sorted.sort(
    (a, b) =>
      Number(a.status === "out-of-stock") - Number(b.status === "out-of-stock"),
  );
  return sorted;
}

/** Facet values available within a product scope. */
export function getFacets(
  products: Product[],
  categoryName: (id: string) => string,
) {
  const brands = Array.from(new Set(products.map((p) => p.brand))).sort(
    (a, b) => a.localeCompare(b, "fa"),
  );
  const categories = Array.from(new Set(products.map((p) => p.categoryId))).map(
    (id) => ({ id, name: categoryName(id) }),
  );
  const allSizes = Array.from(new Set(products.flatMap((p) => p.sizes ?? [])));
  const clothingSizes = CLOTHING_SIZES.filter((s) => allSizes.includes(s));
  const numericSizes = allSizes
    .filter((s) => !CLOTHING_SIZES.includes(s))
    .sort((a, b) => Number(a) - Number(b));
  const colors = colorFamilies.filter((fam) =>
    products.some((p) =>
      (p.colors ?? []).some((c) => fam.match.some((m) => c.name.includes(m))),
    ),
  );
  const prices = products.map((p) => p.price);
  const priceMin = prices.length
    ? Math.floor(Math.min(...prices) / 100000) * 100000
    : 0;
  const priceMax = prices.length
    ? Math.ceil(Math.max(...prices) / 100000) * 100000
    : 0;
  return {
    brands,
    categories,
    clothingSizes,
    numericSizes,
    colors,
    priceMin,
    priceMax,
  };
}

export type Facets = ReturnType<typeof getFacets>;

export interface FilterChip {
  key: string;
  label: string;
  remove: FilterUpdate;
}

/** Removable chips describing the active filters. */
function buildFilterChips(
  filters: ListingFilters,
  facets: Facets,
): FilterChip[] {
  const chips: FilterChip[] = [];
  const without = (arr: string[], v: string) =>
    arr.filter((x) => x !== v).join(",") || null;
  const categoryName = (id: string) =>
    facets.categories.find((c) => c.id === id)?.name ?? id;
  filters.categories.forEach((c) =>
    chips.push({
      key: `c-${c}`,
      label: categoryName(c),
      remove: { category: without(filters.categories, c) },
    }),
  );
  filters.brands.forEach((b) =>
    chips.push({
      key: `b-${b}`,
      label: b,
      remove: { brand: without(filters.brands, b) },
    }),
  );
  filters.sizes.forEach((s) =>
    chips.push({
      key: `s-${s}`,
      label: `سایز ${toFaDigits(s)}`,
      remove: { size: without(filters.sizes, s) },
    }),
  );
  filters.colors.forEach((c) =>
    chips.push({
      key: `co-${c}`,
      label: colorFamilies.find((f) => f.id === c)?.label ?? c,
      remove: { color: without(filters.colors, c) },
    }),
  );
  if (filters.min !== undefined || filters.max !== undefined)
    chips.push({
      key: "price",
      label: `${formatPrice(filters.min ?? facets.priceMin)} تا ${formatPrice(filters.max ?? facets.priceMax)}`,
      remove: { min: null, max: null },
    });
  if (filters.rating)
    chips.push({
      key: "rating",
      label: `امتیاز ${toFaDigits(filters.rating)}+`,
      remove: { rating: null },
    });
  if (filters.inStock)
    chips.push({ key: "stock", label: "فقط موجود", remove: { stock: null } });
  if (filters.onSale)
    chips.push({ key: "sale", label: "تخفیف‌دار", remove: { sale: null } });
  return chips;
}

/** Keys that define the listing *scope* and survive "clear all filters". */
const SCOPE_KEYS = ["q", "collection"];

/** Applies an update to the current query and returns the new href. Filter changes reset pagination. */
export function buildListingHref(
  pathname: string,
  current: URLSearchParams,
  update: FilterUpdate,
  resetPage = true,
): string {
  const next = new URLSearchParams(current.toString());
  Object.entries(update).forEach(([k, v]) =>
    v === null || v === "" ? next.delete(k) : next.set(k, v),
  );
  if (resetPage && !("page" in update)) next.delete("page");
  const qs = next.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

export function buildClearFiltersHref(
  pathname: string,
  current: URLSearchParams,
): string {
  const keep = new URLSearchParams();
  SCOPE_KEYS.forEach((k) => {
    const v = current.get(k);
    if (v) keep.set(k, v);
  });
  const qs = keep.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

/** Everything a listing page needs, computed in one pass on the server. */
export function queryListing(
  products: Product[],
  params: URLSearchParams,
  categoryName: (id: string) => string,
) {
  const filters = parseFilters(params);
  const facets = getFacets(products, categoryName);
  const results = applyFilters(products, filters);
  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const page = Math.min(filters.page, totalPages);
  return {
    filters,
    facets,
    total: results.length,
    page,
    totalPages,
    items: results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    activeCount: countActiveFilters(filters),
    chips: buildFilterChips(filters, facets),
  };
}
