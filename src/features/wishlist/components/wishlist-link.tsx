"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

import { toFaDigits } from "@/lib/format";
import { useWishlist } from "@/features/wishlist/store/wishlist-store";

export function WishlistLink() {
  const { count } = useWishlist();
  return (
    <Link
      href="/dashboard/wishlist"
      className="relative grid h-10 w-10 place-items-center rounded-lg text-foreground transition-colors hover:bg-muted focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={`علاقه‌مندی‌ها، ${toFaDigits(count)} کالا`}
    >
      <Heart className="h-5 w-5" aria-hidden="true" />
      {count > 0 && (
        <span className="absolute top-0.5 inset-s-0.5 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-foreground px-1 text-[10px] font-bold text-background ring-2 ring-background tabular-nums">
          {toFaDigits(count)}
        </span>
      )}
    </Link>
  );
}
