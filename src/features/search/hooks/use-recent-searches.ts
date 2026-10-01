"use client";

import {
  DEFAULT_RECENT_SEARCHES,
  MAX_RECENT_SEARCHES,
} from "@/features/search/lib/search-terms";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useCallback } from "react";

const KEY = "moda-recent-searches";

/** Accepts at most 20 non-empty terms of ≤100 chars; anything else resets to the default list. */
function validateRecentSearches(value: unknown): string[] | null {
  if (!Array.isArray(value) || value.length > 20) return null;
  return value.every(
    (t): t is string =>
      typeof t === "string" && t.trim().length > 0 && t.length <= 100,
  )
    ? value
    : null;
}

/** One recent-searches list shared by the search dialog and the search page (localStorage). */
export function useRecentSearches() {
  const [recent, setRecent] = useLocalStorage(
    KEY,
    validateRecentSearches,
    DEFAULT_RECENT_SEARCHES,
  );

  const add = useCallback(
    (term: string) => {
      const t = term.trim();
      if (t)
        setRecent((prev) =>
          [t, ...prev.filter((r) => r !== t)].slice(0, MAX_RECENT_SEARCHES),
        );
    },
    [setRecent],
  );
  const remove = useCallback(
    (term: string) => setRecent((prev) => prev.filter((r) => r !== term)),
    [setRecent],
  );
  const clear = useCallback(() => setRecent(() => []), [setRecent]);

  return { recent, add, remove, clear };
}
