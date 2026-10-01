import type { CartItem } from "@/features/cart/types";
import { toProductSummary } from "@/features/catalog/lib/product-summary";
import type { ProductStatus, ProductSummary } from "@/features/catalog/types";

/** Maximum quantity per cart line (UI rule). */
export const MAX_LINE_QUANTITY = 10;
/** Lower per-purchase cap for low-stock products. */
export const LOW_STOCK_MAX_QUANTITY = 3;

/** How many units can be chosen on the product page. */
export function maxPurchaseQuantity(status: ProductStatus): number {
  return status === "low-stock" ? LOW_STOCK_MAX_QUANTITY : MAX_LINE_QUANTITY;
}

export interface LineVariant {
  selectedColor?: string;
  selectedSize?: string;
}

/** A cart line is identified by product + chosen variant. */
function lineKey(
  id: string,
  { selectedColor, selectedSize }: LineVariant = {},
): string {
  return `${id}|${selectedColor ?? ""}|${selectedSize ?? ""}`;
}

const isLine = (item: CartItem, productId: string, variant?: LineVariant) =>
  lineKey(item.product.id, item) === lineKey(productId, variant);

/** Adds a product; an existing line with the same variant is merged (capped at the maximum). */
export function addLine(
  items: CartItem[],
  product: ProductSummary,
  quantity: number,
  variant: LineVariant = {},
): CartItem[] {
  const existing = items.find((i) => isLine(i, product.id, variant));
  if (existing) {
    return items.map((i) =>
      i === existing
        ? { ...i, quantity: Math.min(i.quantity + quantity, MAX_LINE_QUANTITY) }
        : i,
    );
  }
  return [
    ...items,
    {
      product: toProductSummary(product),
      quantity,
      selectedColor: variant.selectedColor,
      selectedSize: variant.selectedSize,
    },
  ];
}

export function removeLine(
  items: CartItem[],
  productId: string,
  variant?: LineVariant,
): CartItem[] {
  return items.filter((i) => !isLine(i, productId, variant));
}

/** Sets a line's quantity; below 1 removes the line. */
export function setLineQuantity(
  items: CartItem[],
  productId: string,
  quantity: number,
  variant?: LineVariant,
): CartItem[] {
  return items.flatMap((i) => {
    if (!isLine(i, productId, variant)) return [i];
    if (quantity < 1) return [];
    return [{ ...i, quantity: Math.min(quantity, MAX_LINE_QUANTITY) }];
  });
}

/** Stable React key for a cart line (product + variant). */
export function cartLineKey(item: CartItem): string {
  return lineKey(item.product.id, item);
}

/** Item count, selling-price subtotal and product (list − selling) discount of the cart. */
export function summarizeLines(items: CartItem[]): {
  totalItems: number;
  subtotal: number;
  totalDiscount: number;
} {
  return items.reduce(
    (acc, { product, quantity }) => ({
      totalItems: acc.totalItems + quantity,
      subtotal: acc.subtotal + product.price * quantity,
      totalDiscount:
        acc.totalDiscount +
        ((product.oldPrice ?? product.price) - product.price) * quantity,
    }),
    { totalItems: 0, subtotal: 0, totalDiscount: 0 },
  );
}
