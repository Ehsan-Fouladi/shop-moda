import { CartButton } from "@/features/cart/components/cart-drawer";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Logo } from "@/components/layout/logo";
import { MegaMenu } from "@/components/layout/mega-menu";
import { MobileNav } from "@/components/layout/mobile-nav";
import { UserMenu } from "@/components/layout/user-menu";
import { WishlistLink } from "@/features/wishlist/components/wishlist-link";
import {
  SearchProvider,
  SearchTrigger,
} from "@/features/search/components/search-dialog";
import { getSearchIndex } from "@/features/search/data/search-index";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { categories } from "@/features/catalog/data/categories";
import { Suspense } from "react";

/**
 * Global site header.
 * Mobile: menu · logo · search/cart + full-width search row.
 * Desktop: logo · prominent search · account/wishlist/cart + category mega menu.
 */
export function SiteHeader() {
  const menuCategories = categories.map(
    ({ slug, name, image, description }) => ({
      slug,
      name,
      image,
      description,
    }),
  );
  return (
    <>
      <AnnouncementBar />
      <SearchProvider index={getSearchIndex()}>
        <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/85">
          <div className="container flex h-16 items-center gap-3 lg:h-[72px] lg:gap-6">
            <Suspense fallback={null}>
              <MobileNav />
            </Suspense>
            <Logo className="shrink-0" />

            <div className="mx-auto hidden w-full max-w-xl md:block">
              <SearchTrigger />
            </div>

            <div className="ms-auto flex items-center gap-0.5 md:ms-0">
              <div className="md:hidden">
                <SearchTrigger variant="icon" />
              </div>
              <ThemeToggle className="hidden sm:inline-flex" />
              <WishlistLink />
              <div className="hidden sm:block">
                <UserMenu />
              </div>
              <span
                className="mx-1 hidden h-6 w-px bg-border sm:block"
                aria-hidden="true"
              />
              <CartButton />
            </div>
          </div>

          <div className="container hidden lg:block">
            <Suspense fallback={null}>
              <MegaMenu categories={menuCategories} />
            </Suspense>
          </div>
        </header>
      </SearchProvider>
    </>
  );
}
