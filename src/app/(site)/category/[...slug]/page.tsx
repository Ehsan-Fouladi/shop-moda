import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PackageOpen } from "lucide-react";

import { ProductListing } from "@/features/catalog/components/listing/product-listing";
import { EmptyState } from "@/components/shared/empty-state";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { Button } from "@/components/ui/button";
import { resolveCategoryPath } from "@/features/catalog/data/categories";
import { getProductsByCategory } from "@/features/catalog/data/products";
import { toFaDigits } from "@/lib/format";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string[] }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const r = resolveCategoryPath(slug);
  if (!r) return { title: "دسته‌بندی پیدا نشد" };
  const title = r.sub
    ? `${r.sub.name} ${r.category.name}`
    : `خرید ${r.category.name}`;
  const canonical = `/category/${slug.join("/")}`;
  return {
    title,
    description: r.category.description,
    alternates: { canonical },
    openGraph: {
      title,
      description: r.category.description,
      url: canonical,
      images: r.category.image ? [r.category.image] : undefined,
    },
  };
}

/** Reusable category layout: hero, description, subcategories, filters, grid, pagination. */
export default async function CategoryPage(props: PageProps) {
  const [{ slug }, searchParams] = await Promise.all([
    props.params,
    props.searchParams ?? Promise.resolve({}),
  ]);
  const r = resolveCategoryPath(slug);
  if (!r) notFound(); // unreachable in practice: layout.tsx 404s unknown paths first
  const { category, sub } = r;
  const items = getProductsByCategory(category.id, sub?.slug);
  const allInCategory = getProductsByCategory(category.id);
  const title = sub ? sub.name : category.name;

  return (
    <div className="container pb-section">
      <PageBreadcrumb
        items={
          sub
            ? [
                { label: category.name, href: `/category/${category.slug}` },
                { label: sub.name },
              ]
            : [{ label: category.name }]
        }
      />

      {/* Category hero */}
      <header className="relative mb-6 overflow-hidden rounded-2xl border border-border bg-linear-to-l from-accent via-card to-card">
        <div className="grid items-center md:grid-cols-[1fr_320px] lg:grid-cols-[1fr_420px]">
          <div className="p-6 md:p-10">
            <p className="mb-2 text-label text-primary">
              دسته‌بندی {category.name}
            </p>
            <h1 className="text-h1 md:text-display">{title}</h1>
            <p className="mt-3 max-w-xl text-body text-muted-foreground">
              {category.description}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              <b className="text-foreground tabular-nums">
                {toFaDigits(items.length)}
              </b>{" "}
              محصول در این بخش
            </p>
          </div>
          {category.image && (
            <div className="product-surface relative hidden h-full min-h-60 md:block">
              {/* Lazy: hidden below md, so phones skip the download; in view on desktop, so it loads right away. */}
              <Image
                src={category.image}
                alt={`محصولات ${category.name}`}
                draggable="false"
                fill
                sizes="420px"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </header>

      {/* Subcategories */}
      {category.subcategories && (
        <nav aria-label={`زیردسته‌های ${category.name}`} className="mb-6">
          <ul className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
            <li>
              <Link
                href={`/category/${category.slug}`}
                aria-current={!sub ? "page" : undefined}
                className={cn(
                  "flex h-10 items-center whitespace-nowrap rounded-full border px-4 text-sm transition-colors",
                  !sub
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:border-primary hover:text-primary",
                )}
              >
                همه {category.name}
                <span className="ms-1.5 text-xs opacity-75 tabular-nums">
                  ({toFaDigits(allInCategory.length)})
                </span>
              </Link>
            </li>
            {category.subcategories.map((s) => {
              const active = sub?.slug === s.slug;
              const n = allInCategory.filter(
                (p) => p.subcategory === s.slug,
              ).length;
              return (
                <li key={s.slug}>
                  <Link
                    href={`/category/${category.slug}/${s.slug}`}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex h-10 items-center whitespace-nowrap rounded-full border px-4 text-sm transition-colors",
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card hover:border-primary hover:text-primary",
                    )}
                  >
                    {s.name}
                    <span className="ms-1.5 text-xs opacity-75 tabular-nums">
                      ({toFaDigits(n)})
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      <ProductListing
        products={items}
        searchParams={searchParams}
        basePath={`/category/${slug.join("/")}`}
        hideCategoryFilter
        emptyScope={
          <EmptyState
            icon={PackageOpen}
            title={`فعلاً محصولی در «${title}» موجود نیست`}
            description="محصولات این بخش به‌زودی اضافه می‌شوند. می‌توانید سایر محصولات این دسته را ببینید یا از اعلان موجودی باخبر شوید."
          >
            <Button asChild>
              <Link href={`/category/${category.slug}`}>
                همه محصولات {category.name}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/products">مشاهده فروشگاه</Link>
            </Button>
          </EmptyState>
        }
      />
    </div>
  );
}
