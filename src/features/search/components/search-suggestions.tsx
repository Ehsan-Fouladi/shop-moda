import Link from "next/link";
import { Flame } from "lucide-react";

import { RecentSearchesCard } from "@/features/search/components/recent-searches";
import {
  searchHref,
  trendingSearches,
} from "@/features/search/lib/search-terms";
import type { SearchIndex } from "@/features/search/types";

/** Recent searches, trending searches and category shortcuts for the search page. */
export function SearchSuggestions({
  categories,
}: {
  categories: SearchIndex["categories"];
}) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <RecentSearchesCard />

      <section
        aria-labelledby="sp-trend"
        className="rounded-xl border border-border bg-card p-4"
      >
        <h2
          id="sp-trend"
          className="mb-3 flex items-center gap-2 text-sm font-bold"
        >
          <Flame className="h-4 w-4 text-sale" aria-hidden="true" /> جستجوهای
          پرطرفدار
        </h2>
        <ul className="flex flex-wrap gap-2">
          {trendingSearches.map((t) => (
            <li key={t}>
              <Link
                href={searchHref(t)}
                className="block rounded-full bg-muted px-3 py-1.5 text-xs transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {t}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="sp-cats"
        className="rounded-xl border border-border bg-card p-4"
      >
        <h2 id="sp-cats" className="mb-3 text-sm font-bold">
          جستجو در دسته‌بندی‌ها
        </h2>
        <ul className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <li key={c.id}>
              <Link
                href={`/category/${c.slug}`}
                className="block rounded-full border border-border px-3 py-1.5 text-xs transition-colors hover:border-primary hover:text-primary"
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
