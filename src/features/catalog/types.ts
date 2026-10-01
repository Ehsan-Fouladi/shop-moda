export type ProductStatus = "in-stock" | "low-stock" | "out-of-stock";

export type ProductBadge = "new" | "sale" | "bestseller" | "limited";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  brand: string;
  categoryId: string;
  /** Subcategory slug within the category (e.g. "coats") */
  subcategory?: string;
  /** Target audience used by filters */
  gender?: "women" | "men" | "unisex";
  /** Price in Toman */
  price: number;
  /** Price before discount in Toman */
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  badge?: ProductBadge;
  status: ProductStatus;
  colors?: ProductColor[];
  sizes?: string[];
  shortDescription: string;
  description: string;
  specs: ProductSpec[];
  soldCount?: number;
  createdAt: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image?: string;
  parentId?: string;
  featured?: boolean;
  subcategories?: { slug: string; name: string }[];
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  createdAt: string;
  verifiedPurchase: boolean;
}

/**
 * The client-safe slice of a product: everything a card, cart line or wishlist entry renders.
 * Passing summaries (instead of full products with descriptions/specs) keeps RSC payloads and
 * browser storage small.
 */
export type ProductSummary = Pick<
  Product,
  | "id"
  | "slug"
  | "title"
  | "brand"
  | "price"
  | "oldPrice"
  | "rating"
  | "reviewCount"
  | "images"
  | "badge"
  | "status"
  | "colors"
  | "sizes"
>;

export interface SizeChart {
  headers: string[];
  rows: string[][];
}
