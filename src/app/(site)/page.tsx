import type { Metadata } from "next";

import { BenefitsStrip } from "@/components/shared/benefits-strip";
import { JsonLd } from "@/components/shared/json-ld";
import { HeroSection } from "@/features/home/components/hero-section";
import {
  BrandDiscovery,
  CategoryRail,
  MenEditorial,
  NewsletterBand,
  PromoBanners,
  SeasonalCollection,
  SpecialOffers,
  Testimonials,
} from "@/features/home/components/home-sections";
import { ProductCarousel } from "@/features/catalog/components/product-carousel";
import { ProductGrid } from "@/features/catalog/components/product-grid";
import { SectionHeading } from "@/components/shared/section-heading";
import { siteConfig } from "@/config/site";
import {
  bestSellers,
  featuredProducts,
  newArrivals,
} from "@/features/catalog/data/products";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} | ${siteConfig.tagline}` },
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.svg`,
  };

  return (
    <>
      <JsonLd data={orgJsonLd} />
      <HeroSection />
      <BenefitsStrip className="container mt-6 md:-mt-8 md:relative md:z-10" />
      <CategoryRail />
      <SpecialOffers />

      <section aria-labelledby="home-new" className="container py-section">
        <SectionHeading
          id="home-new"
          title="تازه‌ها"
          description="جدیدترین محصولات اضافه‌شده به مُدا"
          href="/products?sort=newest"
        />
        <ProductCarousel products={newArrivals} label="محصولات تازه" />
      </section>

      <PromoBanners />

      <section aria-labelledby="home-best" className="container pb-section">
        <SectionHeading
          id="home-best"
          title="پرفروش‌ترین‌ها"
          description="محبوب‌ترین انتخاب‌های مشتریان در این ماه"
          href="/products?sort=popular"
        />
        <ProductCarousel products={bestSellers} label="محصولات پرفروش" />
      </section>

      <SeasonalCollection />
      <MenEditorial />

      <section aria-labelledby="home-featured" className="container pb-section">
        <SectionHeading
          id="home-featured"
          title="منتخب سردبیر مُدا"
          description="قطعه‌هایی که تیم استایل ما این هفته پیشنهاد می‌کند"
          href="/products"
        />
        <ProductGrid
          products={featuredProducts}
          columns="grid-cols-2 md:grid-cols-4"
        />
      </section>

      <BrandDiscovery />
      <Testimonials />
      <NewsletterBand />
    </>
  );
}
