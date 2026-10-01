import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductGallery } from "@/features/catalog/components/detail/product-gallery";
import { ProductInfoTabs } from "@/features/catalog/components/detail/product-info-tabs";
import { ProductPurchasePanel } from "@/features/catalog/components/detail/product-purchase-panel";
import { RecentlyViewed } from "@/features/catalog/components/detail/recently-viewed";
import { SizeGuideDialog } from "@/features/catalog/components/detail/size-guide-dialog";
import { JsonLd } from "@/components/shared/json-ld";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { ProductCarousel } from "@/features/catalog/components/product-carousel";
import { SectionHeading } from "@/components/shared/section-heading";
import { siteConfig } from "@/config/site";
import { getCategory } from "@/features/catalog/data/categories";
import {
  bestSellers,
  getDefaultRecentlyViewed,
  getProduct,
  getRelatedProducts,
  products,
} from "@/features/catalog/data/products";
import { getProductReviews } from "@/features/catalog/data/reviews";
import { sizeChart } from "@/features/catalog/data/size-chart";
import { toProductSummary } from "@/features/catalog/lib/product-summary";

/** All params are known at build time; unknown ones 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/product/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) return { title: "محصول پیدا نشد" };
  const url = `/product/${product.slug}`;
  const title = `${product.title} | ${product.brand}`;
  return {
    title,
    description: product.shortDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title,
      description: product.shortDescription,
      url,
      images: [{ url: product.images[0], alt: product.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: product.shortDescription,
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage(props: PageProps<"/product/[slug]">) {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) notFound();
  const category = getCategory(product.categoryId);
  const sub = category?.subcategories?.find(
    (s) => s.slug === product.subcategory,
  );
  const related = getRelatedProducts(product, 8);
  const recommended = bestSellers.filter(
    (p) => p.id !== product.id && !related.some((r) => r.id === p.id),
  );
  const { reviews, distribution } = getProductReviews(product.id);

  /* Structured data (factual catalog fields only — no ratings are asserted). */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    sku: product.id,
    image: product.images.map((i) => `${siteConfig.url}${i}`),
    brand: { "@type": "Brand", name: product.brand },
    offers: {
      "@type": "Offer",
      priceCurrency: "IRR",
      price: product.price * 10,
      availability:
        product.status === "out-of-stock"
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
      url: `${siteConfig.url}/product/${product.slug}`,
    },
  };

  return (
    <div className="container pb-28 lg:pb-section">
      <JsonLd data={jsonLd} />
      <PageBreadcrumb
        items={[
          ...(category
            ? [{ label: category.name, href: `/category/${category.slug}` }]
            : []),
          ...(category && sub
            ? [
                {
                  label: sub.name,
                  href: `/category/${category.slug}/${sub.slug}`,
                },
              ]
            : []),
          { label: product.title },
        ]}
      />

      <article className="grid gap-6 md:grid-cols-2 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
        <ProductGallery product={product} />
        <ProductPurchasePanel
          product={product}
          category={
            category ? { slug: category.slug, name: category.name } : undefined
          }
          sizeGuide={
            product.categoryId !== "beauty" ? (
              <SizeGuideDialog chart={sizeChart} />
            ) : undefined
          }
        />
      </article>

      <div className="mt-14">
        <ProductInfoTabs
          product={product}
          reviews={reviews}
          ratingDistribution={distribution}
        />
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related" className="mt-14">
          <SectionHeading
            id="related"
            title="محصولات مشابه"
            href={category ? `/category/${category.slug}` : "/products"}
          />
          <ProductCarousel products={related} label="محصولات مشابه" />
        </section>
      )}

      <section aria-labelledby="recommended" className="mt-14">
        <SectionHeading
          id="recommended"
          title="پیشنهاد مُدا برای شما"
          description="بر اساس محبوب‌ترین انتخاب‌های مشتریان"
          href="/products"
        />
        <ProductCarousel products={recommended} label="محصولات پیشنهادی" />
      </section>

      <RecentlyViewed
        current={toProductSummary(product)}
        fallback={getDefaultRecentlyViewed().map(toProductSummary)}
      />
    </div>
  );
}
