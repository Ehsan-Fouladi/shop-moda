import type { Metadata } from "next";

import { DashboardHeader } from "@/features/account/components/dashboard-ui";
import { ProductCarousel } from "@/features/catalog/components/product-carousel";
import { bestSellers } from "@/features/catalog/data/products";
import { WishlistView } from "@/features/wishlist/components/wishlist-view";

export const metadata: Metadata = { title: "علاقه‌مندی‌ها" };

export default function WishlistPage() {
  return (
    <>
      <DashboardHeader
        title="علاقه‌مندی‌ها"
        description="محصولاتی که برای بعد ذخیره کرده‌اید"
      />
      <WishlistView
        recommendations={
          <ProductCarousel
            products={bestSellers}
            label="محصولات پیشنهادی"
            compact
          />
        }
      />
    </>
  );
}
