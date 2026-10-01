"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  buildClearFiltersHref,
  buildListingHref,
  type FilterUpdate,
} from "@/features/catalog/lib/listing-filters";
import { createContext, useContext, useMemo, useTransition } from "react";

interface ListingNavigation {
  update: (update: FilterUpdate) => void;
  clearAll: () => void;
  /** Navigate to a prebuilt listing href (e.g. a pagination link) inside the shared transition. */
  navigate: (href: string) => void;
  isPending: boolean;
}

const ListingNavigationContext = createContext<ListingNavigation | null>(null);

/**
 * Shares one transition between every listing control so a single pending state drives
 * the results skeleton while the server renders the next filtered page.
 */
export function ListingNavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const value = useMemo<ListingNavigation>(() => {
    const current = new URLSearchParams(searchParams.toString());
    const go = (href: string) =>
      startTransition(() => router.push(href, { scroll: false }));
    return {
      update: (u) => go(buildListingHref(pathname, current, u)),
      clearAll: () => go(buildClearFiltersHref(pathname, current)),
      navigate: go,
      isPending,
    };
  }, [router, pathname, searchParams, isPending]);

  return (
    <ListingNavigationContext.Provider value={value}>
      {children}
    </ListingNavigationContext.Provider>
  );
}

export function useListingNavigation(): ListingNavigation {
  const ctx = useContext(ListingNavigationContext);
  if (!ctx)
    throw new Error(
      "useListingNavigation must be used within <ListingNavigationProvider>",
    );
  return ctx;
}
