"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpLeft, Clock, Flame, Search, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRecentSearches } from "@/features/search/hooks/use-recent-searches";
import {
  searchHref,
  trendingSearches,
} from "@/features/search/lib/search-terms";
import type { SearchIndex } from "@/features/search/types";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

/**
 * Search overlay: full-screen on mobile, centered modal on desktop.
 * Shows recent + trending searches and instant product & category suggestions from a small
 * server-built index.
 */
function SearchDialog({
  index,
  open,
  onOpenChange,
}: {
  index: SearchIndex;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const { recent, add, clear } = useRecentSearches();

  const q = query.trim();
  const productMatches = q
    ? index.products
        .filter((p) => p.title.includes(q) || p.brand.includes(q))
        .slice(0, 5)
    : [];
  const categoryMatches = q
    ? index.categories.filter((c) => c.name.includes(q)).slice(0, 3)
    : [];

  const go = (term: string) => {
    const t = term.trim();
    if (!t) return;
    add(t);
    onOpenChange(false);
    setQuery("");
    router.push(searchHref(t));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "flex max-w-2xl flex-col gap-0 overflow-hidden p-0 [&>button:last-child]:hidden",
          "max-sm:inset-0 max-sm:h-dvh max-sm:max-w-none max-sm:translate-x-0 max-sm:translate-y-0 max-sm:rounded-none max-sm:border-0",
          "sm:top-[12%] sm:translate-y-0 sm:rounded-xl",
        )}
      >
        <DialogTitle className="sr-only">جستجو در محصولات</DialogTitle>
        <DialogDescription className="sr-only">
          عبارت مورد نظر را وارد کنید تا پیشنهادها نمایش داده شوند
        </DialogDescription>

        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            go(query);
          }}
          className="flex items-center gap-2 border-b border-border px-4"
        >
          <Search
            className="h-5 w-5 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
          <label htmlFor="search-dialog-input" className="sr-only">
            عبارت جستجو
          </label>
          <input
            id="search-dialog-input"
            type="search"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="نام محصول، برند یا دسته‌بندی…"
            className="h-14 flex-1 bg-transparent text-base outline-hidden placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden"
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="rounded-md p-1 text-muted-foreground hover:bg-muted"
              aria-label="پاک کردن عبارت"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-md px-2 py-1 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            انصراف
          </button>
        </form>

        <div className="max-h-[70vh] flex-1 overflow-y-auto p-4 max-sm:max-h-none">
          {!q ? (
            <div className="space-y-6">
              {recent.length > 0 && (
                <section aria-labelledby="recent-searches">
                  <div className="mb-3 flex items-center justify-between">
                    <h2
                      id="recent-searches"
                      className="flex items-center gap-2 text-sm font-bold"
                    >
                      <Clock
                        className="h-4 w-4 text-muted-foreground"
                        aria-hidden="true"
                      />
                      جستجوهای اخیر
                    </h2>
                    <button
                      type="button"
                      onClick={clear}
                      className="text-xs text-destructive hover:underline"
                    >
                      پاک کردن همه
                    </button>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {recent.map((r) => (
                      <li key={r}>
                        <button
                          type="button"
                          onClick={() => go(r)}
                          className="rounded-full border border-border px-3 py-1.5 text-xs transition-colors hover:border-primary hover:text-primary"
                        >
                          {r}
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              <section aria-labelledby="trending-searches">
                <h2
                  id="trending-searches"
                  className="mb-3 flex items-center gap-2 text-sm font-bold"
                >
                  <Flame className="h-4 w-4 text-sale" aria-hidden="true" />
                  جستجوهای پرطرفدار
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {trendingSearches.map((t) => (
                    <li key={t}>
                      <button
                        type="button"
                        onClick={() => go(t)}
                        className="rounded-full bg-muted px-3 py-1.5 text-xs transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        {t}
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          ) : productMatches.length === 0 && categoryMatches.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              پیشنهادی برای «{q}» پیدا نشد. برای جستجوی کامل Enter را بزنید.
            </p>
          ) : (
            <div className="space-y-5">
              {categoryMatches.length > 0 && (
                <section aria-labelledby="cat-suggestions">
                  <h2
                    id="cat-suggestions"
                    className="mb-2 text-xs font-bold text-muted-foreground"
                  >
                    دسته‌بندی‌ها
                  </h2>
                  <ul>
                    {categoryMatches.map((c) => (
                      <li key={c.id}>
                        <Link
                          href={`/category/${c.slug}`}
                          onClick={() => onOpenChange(false)}
                          className="flex items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-muted"
                        >
                          <span>
                            {q} در <b className="text-primary">{c.name}</b>
                          </span>
                          <ArrowUpLeft
                            className="h-4 w-4 text-muted-foreground"
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              {productMatches.length > 0 && (
                <section aria-labelledby="prod-suggestions">
                  <h2
                    id="prod-suggestions"
                    className="mb-2 text-xs font-bold text-muted-foreground"
                  >
                    محصولات
                  </h2>
                  <ul className="space-y-1">
                    {productMatches.map((p) => (
                      <li key={p.id}>
                        <Link
                          href={`/product/${p.slug}`}
                          onClick={() => onOpenChange(false)}
                          className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted"
                        >
                          <span className="product-surface relative h-14 w-12 shrink-0 overflow-hidden rounded-md">
                            <Image
                              src={p.image}
                              alt="product-slug"
                              draggable="false"
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-medium">
                              {p.title}
                            </span>
                            <span className="block text-xs text-muted-foreground">
                              {p.brand}
                            </span>
                          </span>
                          <span className="shrink-0 text-xs font-bold tabular-nums">
                            {formatPrice(p.price)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              <button
                type="button"
                onClick={() => go(query)}
                className="w-full rounded-lg border border-dashed border-border py-2.5 text-sm text-primary hover:bg-accent"
              >
                مشاهده همه نتایج «{q}»
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

const SearchContext = createContext<(() => void) | null>(null);

/**
 * Owns the single search dialog and the ⌘K / Ctrl+K shortcut for everything inside it.
 * (Previously each trigger mounted its own dialog + shortcut listener, so Ctrl+K opened two.)
 */
export function SearchProvider({
  index,
  children,
}: {
  index: SearchIndex;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openSearch = useCallback(() => setOpen(true), []);

  return (
    <SearchContext.Provider value={openSearch}>
      {children}
      <SearchDialog index={index} open={open} onOpenChange={setOpen} />
    </SearchContext.Provider>
  );
}

function useOpenSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx)
    throw new Error("SearchTrigger must be used within <SearchProvider>");
  return ctx;
}

/** Input-styled trigger (desktop) or icon button (mobile) that opens the search overlay. */
export function SearchTrigger({
  variant = "bar",
}: {
  variant?: "bar" | "icon";
}) {
  const openSearch = useOpenSearch();

  return variant === "bar" ? (
    <button
      type="button"
      onClick={openSearch}
      className="flex h-11 w-full items-center gap-3 rounded-lg border border-transparent bg-muted px-3.5 text-sm text-muted-foreground transition-colors hover:border-border focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
      aria-haspopup="dialog"
    >
      <Search className="h-4.5 w-4.5" aria-hidden="true" />
      <span className="flex-1 text-start">جستجو در مُدا…</span>
      <kbd
        className="hidden rounded border border-border bg-card px-1.5 py-0.5 font-sans text-[10px] xl:inline"
        dir="ltr"
      >
        Ctrl K
      </kbd>
    </button>
  ) : (
    <button
      type="button"
      onClick={openSearch}
      className="grid h-10 w-10 place-items-center rounded-lg text-foreground hover:bg-muted focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
      aria-label="جستجو"
      aria-haspopup="dialog"
    >
      <Search className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
