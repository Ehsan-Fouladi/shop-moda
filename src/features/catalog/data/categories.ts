import "server-only";

import type { Category } from "@/features/catalog/types";

/** Central category tree — drives navigation, category pages, filters and breadcrumbs. */
export const categories: Category[] = [
  {
    id: "women",
    slug: "women",
    name: "زنانه",
    description:
      "از مانتو و پالتوی پاییزه تا پیراهن‌های میدی و شومیزهای روزمره؛ کالکشن زنانه مُدا با پارچه‌های باکیفیت و برش‌های به‌روز برای هر موقعیت انتخاب شده است.",
    image: "/images/products/wool-long-coat-1.jpg",
    featured: true,
    subcategories: [
      { slug: "coats", name: "مانتو و پالتو" },
      { slug: "dresses", name: "پیراهن و لباس مجلسی" },
      { slug: "blouses", name: "شومیز و بلوز" },
      { slug: "pants-skirts", name: "شلوار و دامن" },
      { slug: "tshirts", name: "تی‌شرت" },
    ],
  },
  {
    id: "men",
    slug: "men",
    name: "مردانه",
    description:
      "پیراهن‌های رسمی، پولوشرت، شلوار چینو و کت؛ پوشاک مردانه مُدا با تمرکز بر دوخت دقیق و ترکیب راحتی با ظاهری مرتب.",
    image: "/images/products/men-slim-shirt-1.jpg",
    featured: true,
    subcategories: [
      { slug: "shirts", name: "پیراهن" },
      { slug: "tshirts", name: "تی‌شرت و پولوشرت" },
      { slug: "pants", name: "شلوار و جین" },
      { slug: "jackets", name: "کت و ژاکت" },
      { slug: "hoodies", name: "هودی و سویشرت" },
    ],
  },
  {
    id: "shoes",
    slug: "shoes",
    name: "کفش",
    description:
      "کتانی و اسنیکر، کفش رسمی، نیم‌بوت و صندل؛ کفش‌هایی که هم راحت‌اند و هم استایل شما را کامل می‌کنند.",
    image: "/images/products/luna-heels-1.jpg",
    featured: true,
    subcategories: [
      { slug: "sneakers", name: "کتانی و اسنیکر" },
      { slug: "formal", name: "کفش رسمی و مجلسی" },
      { slug: "boots", name: "نیم‌بوت و بوت" },
      { slug: "sandals", name: "صندل" },
    ],
  },
  {
    id: "bags",
    slug: "bags",
    name: "کیف",
    description:
      "کیف دستی، دوشی، کوله‌پشتی و کیف پول از چرم طبیعی و وگن؛ طراحی کاربردی با جزئیات ظریف.",
    image: "/images/products/leather-shoulder-bag-1.jpg",
    featured: true,
    subcategories: [
      { slug: "handbags", name: "کیف دستی" },
      { slug: "shoulder", name: "کیف دوشی" },
      { slug: "backpacks", name: "کوله‌پشتی" },
      { slug: "wallets", name: "کیف پول" },
    ],
  },
  {
    id: "accessories",
    slug: "accessories",
    name: "اکسسوری",
    description:
      "ساعت، عینک آفتابی، شال و روسری، زیورآلات و کمربند؛ جزئیاتی که یک استایل ساده را خاص می‌کنند.",
    image: "/images/editorial/editorial-accessories.jpg",
    featured: true,
    subcategories: [
      { slug: "watches", name: "ساعت مچی" },
      { slug: "sunglasses", name: "عینک آفتابی" },
      { slug: "scarves", name: "شال و روسری" },
      { slug: "jewelry", name: "زیورآلات" },
      { slug: "belts", name: "کمربند" },
    ],
  },
  {
    id: "beauty",
    slug: "beauty",
    name: "زیبایی و سلامت",
    description:
      "مراقبت پوست و مو، لوازم آرایش و عطرهای اصل با ضمانت اصالت کالا و تاریخ انقضای معتبر.",
    image: "/images/editorial/editorial-beauty.jpg",
    featured: true,
    subcategories: [
      { slug: "skincare", name: "مراقبت پوست" },
      { slug: "makeup", name: "آرایش" },
      { slug: "perfume", name: "عطر و ادکلن" },
      { slug: "haircare", name: "مراقبت مو" },
    ],
  },
  {
    id: "sport",
    slug: "sport",
    name: "ورزشی",
    description:
      "لباس، کفش و تجهیزات ورزشی برای تمرین، یوگا، دویدن و سبک زندگی فعال.",
    image: "/images/products/sports-leggings-1.jpg",
    featured: true,
    subcategories: [
      { slug: "clothing", name: "لباس ورزشی" },
      { slug: "shoes", name: "کفش ورزشی" },
      { slug: "equipment", name: "تجهیزات ورزشی" },
    ],
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryName(id: string): string {
  return categories.find((c) => c.id === id)?.name ?? "";
}

/**
 * Resolves `/category/[category]/[sub?]` path segments; null for unknown or over-long paths.
 * Used by the category layout (404 before streaming) and the page.
 */
type Subcategory = NonNullable<Category["subcategories"]>[number];

export function resolveCategoryPath(
  slug: string[],
): { category: Category; sub?: Subcategory } | null {
  const [catSlug, subSlug, ...rest] = slug;
  if (rest.length) return null;
  const category = getCategory(catSlug);
  if (!category) return null;
  const sub = subSlug
    ? category.subcategories?.find((s) => s.slug === subSlug)
    : undefined;
  if (subSlug && !sub) return null;
  return { category, sub };
}
