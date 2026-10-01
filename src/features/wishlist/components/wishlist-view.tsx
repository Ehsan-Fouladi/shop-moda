"use client";

import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

import { EmptyState } from "@/components/shared/empty-state";
import { ProductCard } from "@/features/catalog/components/product-card";
import { Button } from "@/components/ui/button";
import { toFaDigits } from "@/lib/format";
import { useCart } from "@/features/cart/store/cart-store";
import { useWishlist } from "@/features/wishlist/store/wishlist-store";

/** `recommendations` is a server-rendered slot shown when the wishlist is empty. */
export function WishlistView({
  recommendations,
}: {
  recommendations: React.ReactNode;
}) {
  const { items } = useWishlist();
  const { addItem, openCart } = useCart();
  const available = items.filter((p) => p.status !== "out-of-stock");

  if (!items.length) {
    return (
      <>
        <EmptyState
          icon={Heart}
          title="لیست علاقه‌مندی‌های شما خالی است"
          description="با زدن آیکون قلب روی هر محصول، آن را برای بعد ذخیره کنید تا از تخفیف‌هایش هم باخبر شوید."
          className="py-16"
        >
          <Button asChild>
            <Link href="/products">کشف محصولات</Link>
          </Button>
        </EmptyState>
        <h2 className="mb-3 mt-10 text-base font-bold">شاید بپسندید</h2>
        {recommendations}
      </>
    );
  }

  const addAll = () => {
    available.forEach((p) =>
      addItem(p, {
        selectedColor: p.colors?.[0]?.name,
        selectedSize: p.sizes?.[0],
      }),
    );
    toast.success(`${toFaDigits(available.length)} کالا به سبد خرید اضافه شد`);
    openCart();
  };

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-3 ps-4">
        <p className="text-sm text-muted-foreground">
          {toFaDigits(items.length)} کالا • {toFaDigits(available.length)} کالای
          موجود
        </p>
        <Button size="sm" onClick={addAll} disabled={!available.length}>
          <ShoppingCart aria-hidden="true" /> افزودن همه به سبد
        </Button>
      </div>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
        {items.map((p) => (
          <li key={p.id}>
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </>
  );
}
