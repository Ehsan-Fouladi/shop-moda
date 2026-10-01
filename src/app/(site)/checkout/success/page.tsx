import type { Metadata } from "next";

import { CheckoutSteps } from "@/features/checkout/components/checkout-steps";
import { OrderSuccessView } from "@/features/checkout/components/order-success-view";
import { getDemoOrderSnapshot } from "@/features/checkout/data/demo-order";

export const metadata: Metadata = {
  title: "سفارش ثبت شد",
  robots: { index: false, follow: false },
};

export default function OrderSuccessPage() {
  return (
    <div className="container py-8 pb-section">
      <div className="mb-8 flex justify-center">
        <CheckoutSteps current={3} />
      </div>
      <OrderSuccessView fallback={getDemoOrderSnapshot()} />
    </div>
  );
}
