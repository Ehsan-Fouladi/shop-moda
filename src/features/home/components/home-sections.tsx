import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Quote, Zap } from "lucide-react";

import { Countdown } from "@/features/home/components/countdown";
import { NewsletterForm } from "@/components/shared/newsletter-form";
import { ProductCard } from "@/features/catalog/components/product-card";
import { ProductCarousel } from "@/features/catalog/components/product-carousel";
import { RatingStars } from "@/features/catalog/components/rating-stars";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { collections } from "@/features/catalog/data/collections";
import { brands } from "@/features/catalog/data/brands";
import { categories } from "@/features/catalog/data/categories";
import { testimonials } from "@/features/content/data/testimonials";
import { onSale, products } from "@/features/catalog/data/products";
import { toFaDigits } from "@/lib/format";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Categories                                                          */
/* ------------------------------------------------------------------ */

export function CategoryRail() {
  const top = categories.filter((c) => !c.parentId);
  return (
    <section aria-labelledby="home-categories" className="container py-section">
      <SectionHeading
        id="home-categories"
        title="خرید بر اساس دسته‌بندی"
        description="هر چیزی که برای استایل روزانه لازم دارید"
        href="/products"
        linkLabel="همه محصولات"
      />
      <ul className="no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0 lg:grid-cols-7">
        {top.map((c) => {
          const count = products.filter((p) => p.categoryId === c.id).length;
          return (
            <li key={c.id} className="w-24 shrink-0 snap-start sm:w-auto">
              <Link
                href={`/category/${c.slug}`}
                className="group flex flex-col items-center gap-2.5 rounded-xl text-center"
              >
                <span className="product-surface relative aspect-square w-full overflow-hidden rounded-full border border-border ring-primary/40 ring-offset-2 ring-offset-background transition group-hover:ring-2">
                  {c.image && (
                    <Image
                      src={c.image}
                      alt="category-image"
                      draggable="false"
                      fill
                      sizes="(min-width: 1024px) 150px, 96px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </span>
                <span>
                  <span className="block text-sm font-bold group-hover:text-primary">
                    {c.name}
                  </span>
                  <span className="block text-[11px] text-muted-foreground">
                    {toFaDigits(count)} محصول
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Special offers (countdown band)                                     */
/* ------------------------------------------------------------------ */

export function SpecialOffers() {
  return (
    <section aria-labelledby="home-offers" className="container">
      <div className="overflow-hidden rounded-2xl bg-primary p-4 sm:p-6 lg:grid lg:grid-cols-[220px_1fr] lg:gap-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4 text-primary-foreground lg:mb-0 lg:flex-col lg:items-start lg:justify-center">
          <div>
            <p className="flex items-center gap-1.5 text-xs font-medium opacity-80">
              <Zap className="h-4 w-4" aria-hidden="true" /> فقط تا پایان امروز
            </p>
            <h2 id="home-offers" className="mt-1 text-h2 font-extrabold">
              پیشنهاد ویژه روز
            </h2>
          </div>
          <Countdown />
          <Button variant="contrast" size="sm" asChild className="lg:mt-2">
            <Link href="/products?sale=1">
              همه پیشنهادها <ArrowLeft aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <div className="min-w-0 rounded-xl bg-background p-3">
          <ProductCarousel
            products={onSale}
            label="محصولات پیشنهاد ویژه"
            compact
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Promo banners                                                       */
/* ------------------------------------------------------------------ */

const promos = [
  {
    image: "/images/editorial/editorial-accessories.jpg",
    alt: "کیف چرمی، ساعت و عینک آفتابی روی سطح سنگی",
    eyebrow: "اکسسوری",
    title: "جزئیاتی که استایل را کامل می‌کند",
    text: "کیف، ساعت و عینک با تا ۳۰٪ تخفیف",
    href: "/category/accessories",
    cta: "خرید اکسسوری",
  },
  {
    image: "/images/editorial/editorial-beauty.jpg",
    alt: "محصولات مراقبت پوست و عطر در نور ملایم",
    eyebrow: "زیبایی و مراقبت",
    title: "مراقبت روزانه، درخشش همیشگی",
    text: "محصولات مراقبت پوست و عطرهای پاییزی",
    href: "/category/beauty",
    cta: "خرید محصولات زیبایی",
  },
];

export function PromoBanners() {
  return (
    <section
      aria-label="پیشنهادهای ویژه دسته‌ها"
      className="container py-section"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {promos.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="group relative isolate flex min-h-[240px] items-end overflow-hidden rounded-2xl sm:min-h-[300px]"
          >
            <Image
              src={p.image}
              alt={p.alt}
              draggable="false"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="-z-10 object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span
              className="absolute inset-0 -z-10 bg-linear-to-t from-black/75 via-black/25 to-transparent"
              aria-hidden="true"
            />
            <span className="p-5 text-white sm:p-7">
              <span className="text-label opacity-85">{p.eyebrow}</span>
              <span className="mt-1 block text-xl font-extrabold leading-8 sm:text-2xl">
                {p.title}
              </span>
              <span className="mt-1 block text-sm opacity-85">{p.text}</span>
              <span className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-sm font-bold text-neutral-900 transition group-hover:gap-2.5">
                {p.cta} <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Seasonal collection                                                 */
/* ------------------------------------------------------------------ */

export function SeasonalCollection() {
  const c = collections.autumn;
  const items = c.productIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean)
    .slice(0, 4) as typeof products;
  return (
    <section aria-labelledby="home-seasonal" className="bg-muted/60 py-section">
      <div className="container grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-stretch">
        <div className="relative isolate flex min-h-[360px] flex-col justify-end overflow-hidden rounded-2xl p-6 text-white sm:p-8">
          <Image
            src="/images/products/wool-long-coat-1.jpg"
            alt="پالتو بلند پشمی از کالکشن پاییزه"
            draggable="false"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="-z-10 object-cover"
          />
          <span
            className="absolute inset-0 -z-10 bg-linear-to-t from-black/80 via-black/20 to-transparent"
            aria-hidden="true"
          />
          <p className="text-label opacity-85">کالکشن فصل</p>
          <h2 id="home-seasonal" className="mt-1 text-h1 font-extrabold">
            {c.title}
          </h2>
          <p className="mt-2 max-w-sm text-sm leading-7 opacity-90">
            {c.description} پالتو، بافت و رنگ‌های گرم برای روزهای خنک پیش رو.
          </p>
          <Button variant="contrast" asChild className="mt-5 w-fit">
            <Link href="/products?collection=autumn">
              مشاهده کالکشن <ArrowLeft aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:gap-4">
          {items.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} compact />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Men editorial                                                       */
/* ------------------------------------------------------------------ */

export function MenEditorial() {
  const picks = [
    { label: "پیراهن", href: "/category/men/shirts" },
    { label: "پولوشرت", href: "/category/men/tshirts" },
    { label: "شلوار کتان", href: "/category/men/pants" },
    { label: "کت و ژاکت", href: "/category/men/jackets" },
  ];
  return (
    <section aria-labelledby="home-men" className="container py-section">
      <div className="grid overflow-hidden rounded-2xl border border-border bg-card md:grid-cols-2">
        <div className="relative min-h-[380px] md:min-h-[520px]">
          <Image
            src="/images/editorial/editorial-men.jpg"
            alt="مرد با پیراهن و شلوار کتان در استایل اداری"
            draggable="false"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-top"
          />
        </div>
        <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
          <p className="text-label text-primary">ژورنال مُدا — استایل مردانه</p>
          <h2
            id="home-men"
            className="mt-2 text-h1 font-extrabold leading-normal"
          >
            ساده، مرتب و همیشه آماده
          </h2>
          <p className="mt-4 text-body leading-8 text-muted-foreground">
            یک پیراهن خوش‌دوخت، شلوار کتان و کفش چرم؛ فرمول ساده‌ای که از جلسه
            کاری تا دورهمی عصرانه جواب می‌دهد. منتخب ما برای کمد لباس مردانه این
            فصل را ببینید.
          </p>
          <ul
            className="mt-6 flex flex-wrap gap-2"
            aria-label="دسته‌های مردانه"
          >
            {picks.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className="inline-flex rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-primary hover:text-primary"
                >
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button asChild size="lg" className="mt-8 w-fit">
            <Link href="/category/men">
              خرید پوشاک مردانه <ArrowLeft aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Brand & style discovery                                             */
/* ------------------------------------------------------------------ */

const styleTiles: { key: keyof typeof collections; tone: string }[] = [
  { key: "office", tone: "from-slate-500/15" },
  { key: "casual", tone: "from-amber-500/15" },
  { key: "classic", tone: "from-rose-500/15" },
  { key: "autumn", tone: "from-orange-500/15" },
];

export function BrandDiscovery() {
  return (
    <section aria-labelledby="home-brands" className="container py-section">
      <SectionHeading
        id="home-brands"
        title="کشف برندها و استایل‌ها"
        description="برندهای منتخب مُدا و کالکشن‌هایی بر اساس سبک زندگی شما"
      />
      <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {brands.map((b) => {
          const count = products.filter((p) => p.brand === b.name).length;
          return (
            <li key={b.id}>
              <Link
                href={`/products?brand=${encodeURIComponent(b.name)}`}
                className="flex h-20 flex-col items-center justify-center rounded-xl border border-border bg-card transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <span className="text-lg font-extrabold tracking-tight">
                  {b.name}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {count ? `${toFaDigits(count)} محصول` : "به‌زودی در مُدا"}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <ul className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {styleTiles.map(({ key, tone }) => {
          const c = collections[key];
          return (
            <li key={key}>
              <Link
                href={`/products?collection=${key}`}
                className={cn(
                  "group flex h-full flex-col justify-between gap-3 rounded-xl border border-border bg-linear-to-br to-card p-4 transition hover:border-primary/40",
                  tone,
                )}
              >
                <span>
                  <span className="block font-bold">{c.title}</span>
                  <span className="mt-1 line-clamp-2 block text-xs leading-5 text-muted-foreground">
                    {c.description}
                  </span>
                </span>
                <span className="flex items-center gap-1 text-xs font-medium text-primary">
                  {toFaDigits(c.productIds.length)} محصول{" "}
                  <ArrowLeft
                    className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

export function Testimonials() {
  return (
    <section
      aria-labelledby="home-testimonials"
      className="container pb-section"
    >
      <SectionHeading id="home-testimonials" title="تجربه مشتریان مُدا" />
      <ul className="grid gap-4 md:grid-cols-3">
        {testimonials.map((t) => (
          <li key={t.id}>
            <figure className="flex h-full flex-col rounded-xl border border-border bg-card p-5">
              <Quote className="h-7 w-7 text-primary/30" aria-hidden="true" />
              <blockquote className="mt-2 flex-1 text-sm leading-7">
                {t.quote}
              </blockquote>
              <figcaption className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-4">
                <span className="flex items-center gap-3">
                  <span
                    className="grid h-10 w-10 place-items-center rounded-full bg-accent text-sm font-bold text-accent-foreground"
                    aria-hidden="true"
                  >
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm font-bold">{t.name}</span>
                    <span className="block text-xs text-muted-foreground">
                      {t.role}
                    </span>
                  </span>
                </span>
                <RatingStars rating={t.rating} showValue={false} />
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Newsletter                                                          */
/* ------------------------------------------------------------------ */

export function NewsletterBand() {
  return (
    <section aria-labelledby="home-newsletter" className="container pb-section">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-linear-to-l from-accent via-accent/50 to-card p-6 sm:p-10">
        <div
          className="pointer-events-none absolute -inset-s-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-2xl"
          aria-hidden="true"
        />
        <div className="relative grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <h2 id="home-newsletter" className="text-h2 font-extrabold">
              اول از همه باخبر شوید
            </h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              با عضویت در خبرنامه مُدا، از کالکشن‌های تازه، حراج‌های فصلی و
              کدهای تخفیف اختصاصی زودتر مطلع شوید. هر زمان بخواهید می‌توانید لغو
              عضویت کنید.
            </p>
          </div>
          <NewsletterForm idPrefix="home" />
        </div>
      </div>
    </section>
  );
}
