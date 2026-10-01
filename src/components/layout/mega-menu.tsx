"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Percent } from "lucide-react";

import { mainNav } from "@/config/navigation";
import { cn } from "@/lib/utils";
import type { MegaMenuColumn, NavItem } from "@/config/types";
import type { Category } from "@/features/catalog/types";
import { useRef, useState } from "react";

/** The slice of category data the mega-menu promo card needs (keeps the full catalog off the client). */
type MegaMenuCategory = Pick<
  Category,
  "slug" | "name" | "image" | "description"
>;

/**
 * Desktop category navigation with mega menus.
 * Opens on hover (with intent delay) and on click/keyboard; Escape closes.
 */
export function MegaMenu({ categories }: { categories: MegaMenuCategory[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const pathname = usePathname();

  // Close on navigation (state adjusted during render instead of an effect).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpenIndex(null);
  }

  const open = (i: number) => {
    clearTimeout(closeTimer.current);
    setOpenIndex(i);
  };
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenIndex(null), 120);
  };

  return (
    <nav
      aria-label="دسته‌بندی‌های اصلی"
      className="relative"
      onMouseLeave={scheduleClose}
      onKeyDown={(e) => e.key === "Escape" && setOpenIndex(null)}
    >
      <ul className="flex items-center gap-1">
        {mainNav.map((item, i) => {
          const hasMenu = !!item.megaColumns?.length;
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const isOpen = openIndex === i;
          return (
            <li
              key={item.href}
              onMouseEnter={() => (hasMenu ? open(i) : scheduleClose())}
            >
              {hasMenu ? (
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex h-11 items-center rounded-s-md ps-3 pe-1 text-sm font-medium transition-colors hover:text-primary",
                      isActive || isOpen
                        ? "text-primary"
                        : "text-foreground/85",
                    )}
                  >
                    {item.title}
                  </Link>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`mega-${i}`}
                    aria-label={`زیرمنوی ${item.title}`}
                    onClick={() => (isOpen ? setOpenIndex(null) : open(i))}
                    className={cn(
                      "grid h-11 w-6 place-items-center rounded-e-md text-muted-foreground transition-colors hover:text-primary focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring",
                      isOpen && "text-primary",
                    )}
                  >
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform",
                        isOpen && "rotate-180",
                      )}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex h-11 items-center gap-1.5 rounded-md px-3 text-sm font-medium transition-colors",
                    item.highlight
                      ? "text-sale hover:text-sale/80"
                      : "text-foreground/85 hover:text-primary",
                  )}
                >
                  {item.highlight && (
                    <Percent className="h-4 w-4" aria-hidden="true" />
                  )}
                  {item.title}
                </Link>
              )}
              {/* Active underline */}
              <span
                aria-hidden="true"
                className={cn(
                  "mx-3 block h-0.5 rounded-full bg-primary transition-transform duration-200 origin-center",
                  isOpen ? "scale-x-100" : "scale-x-0",
                )}
              />
            </li>
          );
        })}
      </ul>

      {mainNav.map((item, i) =>
        item.megaColumns ? (
          <MegaPanel
            key={item.href}
            id={`mega-${i}`}
            item={item}
            columns={item.megaColumns}
            category={categories.find(
              (c) => c.slug === item.href.split("/").pop(),
            )}
            open={openIndex === i}
            onMouseEnter={() => open(i)}
          />
        ) : null,
      )}
    </nav>
  );
}

function MegaPanel({
  id,
  item,
  columns,
  category,
  open,
  onMouseEnter,
}: {
  id: string;
  item: NavItem;
  columns: MegaMenuColumn[];
  category: MegaMenuCategory | undefined;
  open: boolean;
  onMouseEnter: () => void;
}) {
  return (
    <div
      id={id}
      hidden={!open}
      onMouseEnter={onMouseEnter}
      className="absolute inset-x-0 top-full z-40 pt-0 animate-fade-in"
    >
      <div className="grid grid-cols-12 gap-8 rounded-b-xl border border-t-0 border-border bg-popover p-7 shadow-card-hover">
        <div className="col-span-8 grid grid-cols-3 gap-6">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-3 border-s-2 border-primary ps-2 text-sm font-bold text-foreground">
                {col.title}
              </p>
              <ul className="space-y-1">
                {col.links.map((link) => (
                  <li key={link.href + link.title}>
                    <Link
                      href={link.href}
                      className="block rounded-md py-1.5 text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:text-primary"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {category?.image && (
          <Link
            href={item.href}
            className="group col-span-4 overflow-hidden rounded-lg border border-border/60"
          >
            <div className="product-surface relative aspect-16/10">
              <Image
                src={category.image}
                alt="category-image"
                draggable="false"
                fill
                sizes="360px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <p className="text-sm font-bold text-foreground">
                همه محصولات {category.name}
              </p>
              <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
                {category.description}
              </p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
