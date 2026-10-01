import type { Metadata } from "next";

import { CartView } from "@/features/cart/components/cart-view";
import { CheckoutSteps } from "@/features/checkout/components/checkout-steps";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { ProductCarousel } from "@/features/catalog/components/product-carousel";
import { bestSellers } from "@/features/catalog/data/products";

export const metadata: Metadata = {
  title: "سبد خرید",
  description:
    "مشاهده و ویرایش کالاهای سبد خرید، اعمال کد تخفیف و ادامه فرایند خرید در مُدا.",
  alternates: { canonical: "/cart" },
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <div className="container pb-28 lg:pb-section">
      <PageBreadcrumb items={[{ label: "سبد خرید" }]} />
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-h1">سبد خرید</h1>
        <CheckoutSteps current={1} />
      </header>
      <CartView
        recommendations={
          <ProductCarousel products={bestSellers} label="محصولات پرفروش" />
        }
      />
    </div>
  );
}
