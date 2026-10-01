"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Check,
  CircleAlert,
  Heart,
  PackageCheck,
  RotateCcw,
  Share2,
  ShieldCheck,
  ShoppingCart,
  Store,
  Truck,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { PriceDisplay } from "@/features/catalog/components/price-display";
import { QuantitySelector } from "@/components/shared/quantity-selector";
import { RatingStars } from "@/features/catalog/components/rating-stars";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice, toFaDigits } from "@/lib/format";
import { cn } from "@/lib/utils";
import {
  LOW_STOCK_MAX_QUANTITY,
  maxPurchaseQuantity,
} from "@/features/cart/lib/cart-lines";
import { FREE_SHIPPING_THRESHOLD } from "@/features/cart/lib/pricing";
import { useCart } from "@/features/cart/store/cart-store";
import { useWishlist } from "@/features/wishlist/store/wishlist-store";
import type { Category, Product } from "@/features/catalog/types";
import { useState } from "react";

/** Mock: sizes that are sold out for demo of the disabled state. */
const SOLD_OUT_SIZES = new Set(["XL", "45", "110"]);

interface ProductPurchasePanelProps {
  product: Product;
  category?: Pick<Category, "slug" | "name">;
  /** Server-rendered size guide (omitted for categories without sizing). */
  sizeGuide?: React.ReactNode;
}

export function ProductPurchasePanel({
  product,
  category,
  sizeGuide,
}: ProductPurchasePanelProps) {
  const router = useRouter();
  const { addItem, openCart } = useCart();
  const { has, toggle } = useWishlist();
  const [color, setColor] = useState(product.colors?.[0]?.name);
  const [size, setSize] = useState<string | undefined>(undefined);
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [adding, setAdding] = useState(false);

  const outOfStock = product.status === "out-of-stock";
  const sizes = product.sizes ?? [];
  const needsSize = sizes.length > 0;
  const wishlisted = has(product.id);

  const validate = () => {
    if (needsSize && !size) {
      setSizeError(true);
      document
        .getElementById("size-selector")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    return true;
  };

  const handleAdd = () => {
    if (!validate()) return;
    setAdding(true);
    setTimeout(() => {
      addItem(product, {
        quantity: qty,
        selectedColor: color,
        selectedSize: size,
      });
      setAdding(false);
      openCart();
    }, 450);
  };

  const handleBuyNow = () => {
    if (!validate()) return;
    addItem(product, {
      quantity: qty,
      selectedColor: color,
      selectedSize: size,
    });
    router.push("/checkout");
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: product.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("پیوند محصول کپی شد");
      }
    } catch {
      /* user cancelled */
    }
  };

  const actions = (
    <div className="grid grid-cols-[1fr_auto] gap-2">
      <Button
        size="lg"
        onClick={handleAdd}
        disabled={outOfStock}
        loading={adding}
        className="w-full"
      >
        {!adding && <ShoppingCart aria-hidden="true" />}
        {outOfStock ? "ناموجود" : "افزودن به سبد خرید"}
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="w-12 px-0"
        onClick={() => toggle(product)}
        aria-pressed={wishlisted}
        aria-label={
          wishlisted ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"
        }
      >
        <Heart
          className={cn(wishlisted && "fill-primary text-primary")}
          aria-hidden="true"
        />
      </Button>
    </div>
  );

  return (
    <div className="space-y-5">
      {/* Title block */}
      <div>
        <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <Link
            href={`/products?brand=${encodeURIComponent(product.brand)}`}
            className="font-bold text-primary hover:underline"
          >
            {product.brand}
          </Link>
          {category && (
            <>
              <span className="text-border" aria-hidden="true">
                |
              </span>
              <Link
                href={`/category/${category.slug}`}
                className="text-muted-foreground hover:text-primary"
              >
                {category.name}
              </Link>
            </>
          )}
        </div>
        <h1 className="text-h2 leading-9 md:text-h1 md:leading-[2.6rem]">
          {product.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <RatingStars rating={product.rating} size="md" />
          <a
            href="#reviews"
            className="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
          >
            {toFaDigits(product.reviewCount)} دیدگاه
          </a>
          {product.soldCount && (
            <span className="text-sm text-muted-foreground">
              •{" "}
              <b className="text-foreground tabular-nums">
                {toFaDigits(product.soldCount)}
              </b>{" "}
              خرید موفق
            </span>
          )}
        </div>
        <p className="mt-3 text-body text-muted-foreground">
          {product.shortDescription}
        </p>
      </div>

      <Separator />

      {/* Price + stock */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <PriceDisplay
          price={product.price}
          oldPrice={product.oldPrice}
          size="lg"
        />
        <StockStatus status={product.status} />
      </div>

      {/* Color */}
      {product.colors && product.colors.length > 0 && (
        <fieldset>
          <legend className="mb-2.5 text-sm">
            <span className="font-bold">رنگ:</span>{" "}
            <span className="text-muted-foreground">{color}</span>
          </legend>
          <div
            className="flex flex-wrap gap-2.5"
            role="radiogroup"
            aria-label="انتخاب رنگ"
          >
            {product.colors.map((c) => {
              const selected = color === c.name;
              return (
                <button
                  key={c.name}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  aria-label={c.name}
                  title={c.name}
                  onClick={() => setColor(c.name)}
                  className={cn(
                    "grid h-11 w-11 place-items-center rounded-full border-2 p-0.5 transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    selected
                      ? "border-primary"
                      : "border-transparent hover:border-border",
                  )}
                >
                  <span
                    className="grid h-full w-full place-items-center rounded-full border border-black/10 dark:border-white/15"
                    style={{ background: c.hex }}
                  >
                    {selected && (
                      <Check
                        className="h-4 w-4 mix-blend-difference text-white"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      {/* Size */}
      {needsSize && (
        <fieldset id="size-selector">
          <div className="mb-2.5 flex items-center justify-between">
            <legend className="text-sm">
              <span className="font-bold">سایز:</span>{" "}
              <span className="text-muted-foreground">
                {size ? toFaDigits(size) : "انتخاب کنید"}
              </span>
            </legend>
            {sizeGuide}
          </div>
          <div
            className="flex flex-wrap gap-2"
            role="radiogroup"
            aria-label="انتخاب سایز"
            aria-describedby={sizeError ? "size-error" : undefined}
          >
            {sizes.map((s) => {
              const soldOut = SOLD_OUT_SIZES.has(s);
              const selected = size === s;
              return (
                <button
                  key={s}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  disabled={soldOut}
                  onClick={() => {
                    setSize(s);
                    setSizeError(false);
                  }}
                  className={cn(
                    "relative h-11 min-w-12 rounded-lg border px-3 text-sm font-medium tabular-nums transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring",
                    selected &&
                      "border-primary bg-primary text-primary-foreground",
                    !selected &&
                      !soldOut &&
                      "border-border bg-card hover:border-foreground/50",
                    soldOut &&
                      "cursor-not-allowed border-dashed border-border text-muted-foreground/60 line-through",
                    sizeError &&
                      !selected &&
                      !soldOut &&
                      "border-destructive/60",
                  )}
                >
                  {toFaDigits(s)}
                  {soldOut && <span className="sr-only"> (ناموجود)</span>}
                </button>
              );
            })}
          </div>
          {sizeError && (
            <p
              id="size-error"
              role="alert"
              className="mt-2 flex items-center gap-1 text-xs text-destructive"
            >
              <CircleAlert className="h-3.5 w-3.5" aria-hidden="true" /> لطفاً
              سایز را انتخاب کنید.
            </p>
          )}
        </fieldset>
      )}

      {/* Quantity */}
      {!outOfStock && (
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold" id="qty-label">
            تعداد:
          </span>
          <QuantitySelector
            value={qty}
            onChange={setQty}
            max={maxPurchaseQuantity(product.status)}
          />
          {product.status === "low-stock" && (
            <span className="text-xs text-warning-foreground dark:text-warning">
              حداکثر {toFaDigits(LOW_STOCK_MAX_QUANTITY)} عدد
            </span>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="space-y-2">
        {actions}
        {!outOfStock ? (
          <Button
            size="lg"
            variant="contrast"
            className="w-full"
            onClick={handleBuyNow}
          >
            <Zap aria-hidden="true" /> خرید فوری
          </Button>
        ) : (
          <Button
            size="lg"
            variant="outline"
            className="w-full"
            onClick={() =>
              toast.success("موجود شدن این کالا به شما اطلاع داده می‌شود")
            }
          >
            موجود شد خبرم کن
          </Button>
        )}
        <button
          type="button"
          onClick={handleShare}
          className="mx-auto flex items-center gap-1.5 py-1 text-sm text-muted-foreground hover:text-primary"
        >
          <Share2 className="h-4 w-4" aria-hidden="true" /> اشتراک‌گذاری
        </button>
      </div>

      {/* Shipping & returns */}
      <ul className="divide-y divide-border rounded-xl border border-border bg-card text-sm">
        <InfoRow
          icon={Truck}
          title="ارسال رایگان"
          text={`برای سفارش‌های بالای ${formatPrice(FREE_SHIPPING_THRESHOLD)} — تحویل ۱ تا ۳ روز کاری`}
        />
        <InfoRow
          icon={RotateCcw}
          title="۷ روز ضمانت بازگشت"
          text="بازگشت بدون قید و شرط در صورت سالم بودن کالا و برچسب‌ها"
        />
        <InfoRow
          icon={ShieldCheck}
          title="ضمانت اصالت کالا"
          text="تأمین مستقیم از برند یا نمایندگی رسمی"
        />
        <InfoRow
          icon={Store}
          title={`فروشنده: ${product.brand}`}
          text="عملکرد عالی • ۹۸٪ رضایت مشتریان"
        />
      </ul>

      {/* Mobile sticky purchase bar */}
      <div className="fixed inset-x-0 bottom-16 z-30 border-t border-border bg-background/95 p-3 backdrop-blur-sm lg:hidden">
        <div className="container flex items-center gap-3 px-0">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] text-muted-foreground">
              {product.title}
            </p>
            <p className="text-sm font-bold tabular-nums">
              {formatPrice(product.price)}
            </p>
          </div>
          <Button
            onClick={handleAdd}
            disabled={outOfStock}
            loading={adding}
            className="shrink-0"
          >
            {outOfStock ? "ناموجود" : "افزودن به سبد"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function StockStatus({ status }: { status: Product["status"] }) {
  const map = {
    "in-stock": {
      icon: PackageCheck,
      text: "موجود در انبار",
      cls: "text-success bg-success/10",
    },
    "low-stock": {
      icon: CircleAlert,
      text: "تنها چند عدد باقی مانده",
      cls: "text-warning-foreground bg-warning/10 dark:text-warning",
    },
    "out-of-stock": {
      icon: CircleAlert,
      text: "ناموجود",
      cls: "text-muted-foreground bg-muted",
    },
  } as const;
  const { icon: Icon, text, cls } = map[status];
  return (
    <p
      className={cn(
        "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        cls,
      )}
    >
      <Icon className="h-4 w-4" aria-hidden="true" /> {text}
    </p>
  );
}

function InfoRow({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <li className="flex items-start gap-3 p-3.5">
      <Icon
        className="mt-0.5 h-5 w-5 shrink-0 text-primary"
        aria-hidden="true"
      />
      <span>
        <span className="block font-bold">{title}</span>
        <span className="block text-xs leading-6 text-muted-foreground">
          {text}
        </span>
      </span>
    </li>
  );
}
