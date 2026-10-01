"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  CreditCard,
  Heart,
  LayoutDashboard,
  LogOut,
  MapPin,
  Package,
  Settings,
  User,
  type LucideIcon,
} from "lucide-react";

import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { dashboardNav } from "@/config/navigation";
import { useNotifications } from "@/features/account/store/notifications-store";
import type { UserProfile } from "@/features/account/types";
import { toFaDigits } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/features/wishlist/store/wishlist-store";

const icons: Record<string, LucideIcon> = {
  "layout-dashboard": LayoutDashboard,
  package: Package,
  heart: Heart,
  user: User,
  "map-pin": MapPin,
  "credit-card": CreditCard,
  bell: Bell,
  settings: Settings,
};

/** Dashboard links with their icon, active state (for the current path) and count badge. */
function useDashboardNavItems() {
  const pathname = usePathname();
  const { count } = useWishlist();
  const { unreadCount } = useNotifications();
  const badges: Record<string, number> = {
    "/dashboard/wishlist": count,
    "/dashboard/notifications": unreadCount,
  };
  return dashboardNav.map((item) => ({
    ...item,
    Icon: icons[item.icon] ?? LayoutDashboard,
    active:
      item.href === "/dashboard"
        ? pathname === item.href
        : pathname.startsWith(item.href),
    badge: badges[item.href] ?? 0,
  }));
}

/** Desktop sidebar: profile card + vertical nav + logout. */
export function DashboardSidebar({ user: currentUser }: { user: UserProfile }) {
  const navItems = useDashboardNavItems();
  const router = useRouter();
  return (
    <aside
      className="hidden lg:block lg:sticky lg:top-36 lg:self-start"
      aria-label="منوی حساب کاربری"
    >
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex items-center gap-3 border-b border-border bg-linear-to-l from-accent/60 to-card p-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary text-sm font-bold text-primary-foreground">
              {currentUser.initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate font-bold">
              {currentUser.firstName} {currentUser.lastName}
            </p>
            <p className="text-xs text-muted-foreground">
              {currentUser.loyaltyTier} • عضو از{" "}
              {new Intl.DateTimeFormat("fa-IR", { year: "numeric" }).format(
                new Date(currentUser.memberSince),
              )}
            </p>
          </div>
        </div>
        <nav className="p-2">
          <ul className="space-y-0.5">
            {navItems.map(({ Icon, active, badge: n, ...item }) => {
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                      active
                        ? "bg-accent font-bold text-accent-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-[18px] w-[18px]",
                        active && "text-primary",
                      )}
                      aria-hidden="true"
                    />
                    <span className="flex-1">{item.title}</span>
                    {n > 0 && (
                      <span className="grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground tabular-nums">
                        {toFaDigits(n)}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
            <li className="mt-1 border-t border-border pt-1">
              <ConfirmDialog
                trigger={
                  <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-destructive hover:bg-destructive/10">
                    <LogOut className="h-[18px] w-[18px]" aria-hidden="true" />{" "}
                    خروج از حساب
                  </button>
                }
                title="خروج از حساب کاربری"
                description="آیا می‌خواهید از حساب کاربری خود خارج شوید؟"
                confirmLabel="خروج"
                destructive
                onConfirm={() => router.push("/login")}
              />
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

/** Mobile/tablet: horizontally scrolling pill tabs replacing the sidebar. */
export function DashboardMobileNav() {
  const navItems = useDashboardNavItems();
  return (
    <nav aria-label="منوی حساب کاربری" className="-mx-4 mb-5 lg:hidden">
      <ul className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-1">
        {navItems.map(({ Icon, active, badge: n, ...item }) => {
          return (
            <li key={item.href} className="shrink-0">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm transition-colors",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground",
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {item.title}
                {n > 0 && (
                  <span
                    className={cn(
                      "text-[10px] font-bold tabular-nums",
                      active ? "opacity-90" : "text-primary",
                    )}
                  >
                    {toFaDigits(n)}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
