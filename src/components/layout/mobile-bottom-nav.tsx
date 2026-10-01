"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, ShoppingCart, User, Heart } from "lucide-react";

import { toFaDigits } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useCart } from "@/features/cart/store/cart-store";

const items = [
  { href: "/", label: "خانه", icon: Home },
  { href: "/products", label: "دسته‌بندی", icon: LayoutGrid },
  { href: "/cart", label: "سبد خرید", icon: ShoppingCart, badge: true },
  { href: "/dashboard/wishlist", label: "علاقه‌مندی", icon: Heart },
  { href: "/dashboard", label: "حساب من", icon: User },
];

/** Thumb-friendly bottom navigation on mobile/tablet (hidden on desktop). */
export function MobileBottomNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  return (
    <nav
      aria-label="ناوبری پایین صفحه"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm lg:hidden"
    >
      <ul className="grid grid-cols-5">
        {items.map(({ href, label, icon: Icon, badge }) => {
          const active =
            href === "/"
              ? pathname === "/"
              : pathname === href ||
                (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex h-16 flex-col items-center justify-center gap-1 text-[11px] transition-colors",
                  active
                    ? "font-bold text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span className="relative">
                  <Icon
                    className={cn("h-5 w-5", active && "fill-primary/15")}
                    aria-hidden="true"
                  />
                  {badge && totalItems > 0 && (
                    <span className="absolute -top-1.5 -inset-s-2 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground tabular-nums">
                      {toFaDigits(totalItems)}
                    </span>
                  )}
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
