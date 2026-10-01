import type { Metadata } from "next";
import Link from "next/link";
import { SearchX } from "lucide-react";

import { SearchBar } from "@/features/search/components/search-bar";
import { ProductListing } from "@/features/catalog/components/listing/product-listing";
import { RecordRecentSearch } from "@/features/search/components/recent-searches";
import { SearchSuggestions } from "@/features/search/components/search-suggestions";
import { getSearchIndex } from "@/features/search/data/search-index";
import { EmptyState } from "@/components/shared/empty-state";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { ProductCarousel } from "@/features/catalog/components/product-carousel";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { bestSellers, searchProducts } from "@/features/catalog/data/products";
import { toFaDigits } from "@/lib/format";
import { firstParam } from "@/lib/search-params";

export async function generateMetadata(
  props: PageProps<"/search">,
): Promise<Metadata> {
  const q = firstParam((await props.searchParams).q)?.trim();
  return {
    title: q ? `نتایج جستجو برای «${q}»` : "جستجو",
    description:
      "جستجو در میان پوشاک، کفش، کیف، اکسسوری و محصولات زیبایی مُدا.",
    alternates: { canonical: "/search" },
    // Search result pages should not be indexed
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage(props: PageProps<"/search">) {
  const searchParams = await props.searchParams;
  const q = firstParam(searchParams.q)?.trim() ?? "";
  const results = q ? searchProducts(q) : [];
  const { categories } = getSearchIndex();

  return (
    <div className="container pb-section">
      <PageBreadcrumb items={[{ label: "جستجو" }]} />
      {q && <RecordRecentSearch query={q} />}

      <header className="mb-6 rounded-2xl border border-border bg-card p-5 md:p-8">
        <h1 className="mb-4 text-h2 md:text-h1">
          {q ? (
            <>
              نتایج جستجو برای <span className="text-primary">«{q}»</span>
            </>
          ) : (
            "جستجو در مُدا"
          )}
        </h1>
        <SearchBar
          defaultValue={q}
          autoFocusId="search-page-input"
          className="max-w-2xl"
        />
        {q && (
          <p className="mt-3 text-sm text-muted-foreground" aria-live="polite">
            <b className="text-foreground tabular-nums">
              {toFaDigits(results.length)}
            </b>{" "}
            کالا پیدا شد
          </p>
        )}
      </header>

      {!q && (
        <>
          <SearchSuggestions categories={categories} />
          <section aria-labelledby="search-reco" className="mt-10">
            <SectionHeading
              id="search-reco"
              title="پیشنهاد مُدا برای شما"
              href="/products"
            />
            <ProductCarousel products={bestSellers} label="محصولات پیشنهادی" />
          </section>
        </>
      )}

      {q && results.length > 0 && (
        <>
          <ProductListing
            products={results}
            searchParams={searchParams}
            basePath="/search"
          />
        </>
      )}

      {q && results.length === 0 && (
        <>
          <EmptyState
            icon={SearchX}
            title={`نتیجه‌ای برای «${q}» پیدا نشد`}
            description="املای عبارت را بررسی کنید، از کلمات کلی‌تر استفاده کنید یا یکی از جستجوهای پیشنهادی زیر را امتحان کنید."
          >
            <Button asChild>
              <Link href="/products">مشاهده همه محصولات</Link>
            </Button>
          </EmptyState>
          <div className="mt-8">
            <SearchSuggestions categories={categories} />
          </div>
          <section aria-labelledby="search-reco-empty" className="mt-10">
            <SectionHeading
              id="search-reco-empty"
              title="شاید این‌ها را بپسندید"
              href="/products"
            />
            <ProductCarousel products={bestSellers} label="محصولات پیشنهادی" />
          </section>
        </>
      )}
    </div>
  );
}
