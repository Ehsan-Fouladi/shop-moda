import type { ProductSummary } from "@/features/catalog/types";

export interface CartItem {
  product: ProductSummary;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}
