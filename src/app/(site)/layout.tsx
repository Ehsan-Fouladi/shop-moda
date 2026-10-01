import { CartDrawer } from "@/features/cart/components/cart-drawer";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Suspense } from "react";

/** Storefront shell: header, main landmark, footer, cart drawer, mobile bottom nav. */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
      <CartDrawer />
      <Suspense fallback={null}>
        <MobileBottomNav />
      </Suspense>
    </div>
  );
}
