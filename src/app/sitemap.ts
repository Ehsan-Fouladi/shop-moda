export const dynamic = "force-static";

import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { categories } from "@/features/catalog/data/categories";
import { products } from "@/features/catalog/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => `${siteConfig.url}${p}`;
  const staticPages = [
    "",
    "/products",
    "/about",
    "/contact",
    "/faq",
    "/terms",
    "/privacy-policy",
    "/return-policy",
    "/shipping-policy",
  ];
  return [
    ...staticPages.map((p) => ({
      url: u(p || "/"),
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : 0.6,
    })),
    ...categories.flatMap((c) => [
      {
        url: u(`/category/${c.slug}`),
        changeFrequency: "daily" as const,
        priority: 0.8,
      },
      ...(c.subcategories ?? []).map((s) => ({
        url: u(`/category/${c.slug}/${s.slug}`),
        changeFrequency: "daily" as const,
        priority: 0.7,
      })),
    ]),
    ...products.map((p) => ({
      url: u(`/product/${p.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
