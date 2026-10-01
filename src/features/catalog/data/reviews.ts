import "server-only";

import type { Review } from "@/features/catalog/types";

/**
 * Mock reviews (UI demo content). The same pool is shown for every product;
 * a real API will return product-specific reviews.
 */
const reviews: Review[] = [
  {
    id: "r-1",
    author: "مریم ک.",
    rating: 5,
    title: "کیفیت دوخت عالی",
    body: "جنس پارچه دقیقاً مثل توضیحات بود و دوخت‌ها تمیز هستند. سایز M برای قد ۱۶۵ کاملاً مناسب بود. بسته‌بندی هم خیلی مرتب رسید.",
    createdAt: "2026-09-12T10:00:00Z",
    verifiedPurchase: true,
  },
  {
    id: "r-2",
    author: "نگار ر.",
    rating: 4,
    title: "رنگ کمی روشن‌تر از عکس",
    body: "در کل راضی هستم. رنگ از نزدیک کمی روشن‌تر از عکس سایت است ولی زیباست. ارسال دو روزه انجام شد.",
    createdAt: "2026-09-03T10:00:00Z",
    verifiedPurchase: true,
  },
  {
    id: "r-3",
    author: "علی م.",
    rating: 5,
    title: "ارزش خرید دارد",
    body: "با توجه به تخفیف جشنواره، قیمت خیلی مناسبی داشت. برای هدیه خریدم و طرف مقابل خیلی خوشش آمد.",
    createdAt: "2026-08-27T10:00:00Z",
    verifiedPurchase: false,
  },
  {
    id: "r-4",
    author: "سحر ا.",
    rating: 3,
    title: "سایزبندی کمی کوچک",
    body: "کیفیت خوب است اما سایزبندی کمی کوچک‌تر از استاندارد است. پیشنهاد می‌کنم یک سایز بزرگ‌تر انتخاب کنید. تعویض سایز بدون مشکل انجام شد.",
    createdAt: "2026-08-15T10:00:00Z",
    verifiedPurchase: true,
  },
];

/** Mock distribution for the rating breakdown bars (percent per star). */
const ratingDistribution: Record<1 | 2 | 3 | 4 | 5, number> = {
  5: 68,
  4: 20,
  3: 7,
  2: 3,
  1: 2,
};

interface ProductReviewsData {
  reviews: Review[];
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
}

/** Reviews for a product (mock: the same pool for every product). */
export function getProductReviews(_productId: string): ProductReviewsData {
  return { reviews, distribution: ratingDistribution };
}
