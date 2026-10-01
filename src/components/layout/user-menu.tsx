"use client";

import Link from "next/link";
import {
  Bell,
  ChevronDown,
  Heart,
  LayoutDashboard,
  LogOut,
  MapPin,
  Package,
  User,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWishlist } from "@/features/wishlist/store/wishlist-store";

/**
 * Account menu. Mock "signed-in" user so dashboard surfaces are explorable.
 * Real auth will replace the static user later — UI only for now.
 */
const mockUser = {
  name: "سارا محمدی",
  email: "sara@example.com",
  initials: "سم",
};

export function UserMenu() {
  const { count: wishlistCount } = useWishlist();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-10 gap-2 px-2 text-foreground"
          aria-label="حساب کاربری"
        >
          <Avatar className="h-7 w-7 border border-border">
            <AvatarFallback className="bg-accent text-xs font-bold text-accent-foreground">
              {mockUser.initials}
            </AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-medium lg:block">
            {mockUser.name}
          </span>
          <ChevronDown
            className="hidden h-4 w-4 text-muted-foreground lg:block"
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel>
          <span className="block text-sm font-bold">{mockUser.name}</span>
          <span
            className="block text-xs font-normal text-muted-foreground"
            dir="ltr"
          >
            {mockUser.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/dashboard">
              <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
              داشبورد
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/orders">
              <Package className="h-4 w-4" aria-hidden="true" />
              سفارش‌های من
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/wishlist">
              <Heart className="h-4 w-4" aria-hidden="true" />
              علاقه‌مندی‌ها
              {wishlistCount > 0 && (
                <span className="ms-auto text-xs text-muted-foreground tabular-nums">
                  {wishlistCount.toLocaleString("fa-IR")}
                </span>
              )}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/addresses">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              آدرس‌ها
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/notifications">
              <Bell className="h-4 w-4" aria-hidden="true" />
              اعلان‌ها
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/profile">
              <User className="h-4 w-4" aria-hidden="true" />
              ویرایش پروفایل
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/login">
            <LogOut className="h-4 w-4" aria-hidden="true" />
            خروج از حساب
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
