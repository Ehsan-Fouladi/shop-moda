import Link from "next/link";
import { SearchX } from "lucide-react";

import { SearchBar } from "@/features/search/components/search-bar";
import { Button } from "@/components/ui/button";
import { categories } from "@/features/catalog/data/categories";

/** 404 body: explanation, search, category shortcuts, primary CTAs. */
export function NotFoundContent() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 py-12 text-center">
      <span className="grid h-24 w-24 place-items-center rounded-full bg-accent text-accent-foreground">
        <SearchX className="h-11 w-11" aria-hidden="true" />
      </span>
      <p className="text-display font-extrabold text-primary tabular-nums">
        ۴۰۴
      </p>
      <h1 className="text-h2">صفحه مورد نظر پیدا نشد</h1>
      <p className="max-w-md text-body leading-8 text-muted-foreground">
        ممکن است آدرس را اشتباه وارد کرده باشید، یا این صفحه یا محصول حذف یا
        جابه‌جا شده باشد. از جستجو یا دسته‌بندی‌های زیر کمک بگیرید.
      </p>
      <div className="w-full max-w-md">
        <SearchBar />
      </div>
      <ul
        className="flex flex-wrap justify-center gap-2"
        aria-label="دسته‌بندی‌های پرطرفدار"
      >
        {categories
          .filter((c) => !c.parentId)
          .map((c) => (
            <li key={c.id}>
              <Link
                href={`/category/${c.slug}`}
                className="inline-flex rounded-full border border-border bg-card px-3.5 py-1.5 text-sm hover:border-primary hover:text-primary"
              >
                {c.name}
              </Link>
            </li>
          ))}
      </ul>
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <Button size="lg" asChild>
          <Link href="/">بازگشت به صفحه اصلی</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/products">مشاهده محصولات</Link>
        </Button>
      </div>
    </div>
  );
}
