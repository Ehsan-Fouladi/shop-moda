import type { Metadata } from "next";

import { ListingHeader } from "@/features/catalog/components/listing/listing-header";
import { ProductListing } from "@/features/catalog/components/listing/product-listing";
import { collections } from "@/features/catalog/data/collections";
import { products } from "@/features/catalog/data/products";
import { firstParam, type SearchParamsRecord } from "@/lib/search-params";

function resolveScope(searchParams: SearchParamsRecord) {
  const collectionSlug = firstParam(searchParams.collection);
  const collection =
    collectionSlug && Object.hasOwn(collections, collectionSlug)
      ? collections[collectionSlug]
      : undefined;
  if (collection) {
    return {
      collectionSlug,
      title: collection.title,
      description: collection.description,
      items: products.filter((p) => collection.productIds.includes(p.id)),
    };
  }
  if (firstParam(searchParams.sale) === "1") {
    return {
      title: "تخفیف‌های ویژه",
      description:
        "محصولات تخفیف‌دار مُدا؛ پوشاک، کفش، کیف و اکسسوری با قیمت ویژه.",
      items: products,
    };
  }
  return {
    title: "همه محصولات",
    description:
      "مجموعه کامل پوشاک، کفش، کیف، اکسسوری و محصولات زیبایی مُدا از برندهای منتخب.",
    items: products,
  };
}

export async function generateMetadata(
  props: PageProps<"/products">,
): Promise<Metadata> {
  const scope = resolveScope(await props.searchParams);
  const canonical =
    "collectionSlug" in scope
      ? `/products?collection=${scope.collectionSlug}`
      : "/products";
  return {
    title: scope.title,
    description: scope.description,
    alternates: { canonical },
    openGraph: {
      title: scope.title,
      description: scope.description,
      url: canonical,
    },
  };
}

export default async function ProductsPage(props: PageProps<"/products">) {
  const searchParams = await props.searchParams;
  const scope = resolveScope(searchParams);
  return (
    <div className="container pb-section">
      <ListingHeader
        title={scope.title}
        description={scope.description}
        breadcrumb={
          "collectionSlug" in scope
            ? [{ label: "فروشگاه", href: "/products" }, { label: scope.title }]
            : [{ label: scope.title }]
        }
      />
      <ProductListing
        products={scope.items}
        searchParams={searchParams}
        basePath="/products"
      />
    </div>
  );
}
