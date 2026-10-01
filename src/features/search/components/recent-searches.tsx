"use client";

import Link from "next/link";
import { Clock, X } from "lucide-react";

import { useRecentSearches } from "@/features/search/hooks/use-recent-searches";
import { searchHref } from "@/features/search/lib/search-terms";
import { useEffect } from "react";

/** Recent-searches card on the search page (browser storage → client component). */
export function RecentSearchesCard() {
  const { recent, remove } = useRecentSearches();

  return (
    <section
      aria-labelledby="sp-recent"
      className="rounded-xl border border-border bg-card p-4"
    >
      <h2
        id="sp-recent"
        className="mb-3 flex items-center gap-2 text-sm font-bold"
      >
        <Clock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />{" "}
        جستجوهای اخیر
      </h2>
      {recent.length ? (
        <ul className="flex flex-wrap gap-2">
          {recent.map((r) => (
            <li
              key={r}
              className="flex items-center rounded-full border border-border ps-3 text-xs"
            >
              <Link href={searchHref(r)} className="py-1.5 hover:text-primary">
                {r}
              </Link>
              <button
                type="button"
                onClick={() => remove(r)}
                className="grid h-7 w-7 place-items-center rounded-full text-muted-foreground hover:text-destructive"
                aria-label={`حذف «${r}» از جستجوهای اخیر`}
              >
                <X className="h-3 w-3" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-muted-foreground">جستجوی اخیری ندارید.</p>
      )}
    </section>
  );
}

/** Invisible helper that records a successful query in recent searches. */
export function RecordRecentSearch({ query }: { query: string }) {
  const { add } = useRecentSearches();
  useEffect(() => {
    add(query);
  }, [add, query]);
  return null;
}
