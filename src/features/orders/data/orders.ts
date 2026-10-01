import "server-only";

import { products } from "@/features/catalog/data/products";
import type { Order } from "@/features/orders/types";

/** Order line thumbnails come from the catalog, so they always match the product's current image. */
function img(slug: string): string {
  const image = products.find((p) => p.slug === slug)?.images[0];
  if (!image) throw new Error(`orders mock: unknown product "${slug}"`);
  return image;
}

const orderData: Order[] = [
  {
    id: "MD-140582",
    placedAt: "2026-09-20T14:20:00Z",
    items: [
      {
        title: "پالتو بلند زنانه پشمی مدل پاییزه",
        image: img("wool-long-coat"),
        quantity: 1,
        price: 2480000,
      },
      {
        title: "شال و روسری ابریشم طرح سنتی",
        image: img("silk-scarf"),
        quantity: 1,
        price: 385000,
      },
    ],
    subtotal: 3485000,
    discount: 620000,
    shippingCost: 0,
    tax: 257850,
    total: 3122850,
    status: "shipped",
    paymentStatus: "paid",
    paymentMethod: "کارت بانکی — درگاه شاپرک",
    shippingAddress:
      "تهران، سعادت‌آباد، خیابان سرو غربی، کوچه نسترن، پلاک ۱۸، واحد ۴",
    estimatedDelivery: "2026-09-25T12:00:00Z",
  },
  {
    id: "MD-140417",
    placedAt: "2026-09-14T09:05:00Z",
    items: [
      {
        title: "کفش رانینگ زنانه مدل اورورا",
        image: img("aurora-running-shoes"),
        quantity: 1,
        price: 2350000,
      },
    ],
    subtotal: 2350000,
    discount: 0,
    shippingCost: 0,
    tax: 211500,
    total: 2561500,
    status: "processing",
    paymentStatus: "paid",
    paymentMethod: "کارت بانکی — درگاه شاپرک",
    shippingAddress:
      "تهران، سعادت‌آباد، خیابان سرو غربی، کوچه نسترن، پلاک ۱۸، واحد ۴",
    estimatedDelivery: "2026-09-26T12:00:00Z",
  },
  {
    id: "MD-139950",
    placedAt: "2026-08-29T18:40:00Z",
    items: [
      {
        title: "کرم آبرسان صورت ۵۰ میلی‌لیتر",
        image: img("hydrating-face-cream"),
        quantity: 2,
        price: 465000,
      },
      {
        title: "ادو پرفیوم بلندمدت مدل امبر",
        image: img("amber-perfume"),
        quantity: 1,
        price: 1890000,
      },
    ],
    subtotal: 3070000,
    discount: 250000,
    shippingCost: 0,
    tax: 253800,
    total: 3073800,
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "پرداخت در محل",
    shippingAddress:
      "تهران، خیابان ولیعصر، بالاتر از پارک ساعی، ساختمان آرین، طبقه ۶",
  },
  {
    id: "MD-139214",
    placedAt: "2026-08-02T11:15:00Z",
    items: [
      {
        title: "پیراهن میدی گل‌دار یقه گرد",
        image: img("floral-midi-dress"),
        quantity: 1,
        price: 1150000,
      },
      {
        title: "کیف دوشی زنانه چرم مدل ترنج",
        image: img("leather-shoulder-bag"),
        quantity: 1,
        price: 1750000,
      },
      {
        title: "کفش پاشنه‌دار زنانه مدل لونا",
        image: img("luna-heels"),
        quantity: 1,
        price: 1320000,
      },
    ],
    subtotal: 4220000,
    discount: 0,
    shippingCost: 0,
    tax: 379800,
    total: 4599800,
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "کارت بانکی — درگاه شاپرک",
    shippingAddress:
      "تهران، سعادت‌آباد، خیابان سرو غربی، کوچه نسترن، پلاک ۱۸، واحد ۴",
  },
  {
    id: "MD-138760",
    placedAt: "2026-07-11T16:30:00Z",
    items: [
      {
        title: "عینک آفتابی محافظ UV400 مدل کلاسیک",
        image: img("uv-sunglasses"),
        quantity: 1,
        price: 980000,
      },
    ],
    subtotal: 1250000,
    discount: 270000,
    shippingCost: 49000,
    tax: 88200,
    total: 1117200,
    status: "cancelled",
    paymentStatus: "refunded",
    paymentMethod: "کارت بانکی — درگاه شاپرک",
    shippingAddress:
      "تهران، خیابان ولیعصر، بالاتر از پارک ساعی، ساختمان آرین، طبقه ۶",
  },
  {
    id: "MD-140601",
    placedAt: "2026-09-23T20:10:00Z",
    items: [
      {
        title: "پولوشرت مردانه پنبه پریمیوم",
        image: img("premium-polo"),
        quantity: 2,
        price: 545000,
      },
    ],
    subtotal: 1090000,
    discount: 0,
    shippingCost: 49000,
    tax: 98100,
    total: 1237100,
    status: "pending",
    paymentStatus: "unpaid",
    paymentMethod: "پرداخت در محل",
    shippingAddress:
      "تهران، سعادت‌آباد، خیابان سرو غربی، کوچه نسترن، پلاک ۱۸، واحد ۴",
    estimatedDelivery: "2026-09-28T12:00:00Z",
  },
];

/** Newest first. */
export const orders: Order[] = [...orderData].sort(
  (a, b) => +new Date(b.placedAt) - +new Date(a.placedAt),
);

export function getOrder(id: string): Order | undefined {
  return orders.find((o) => o.id === id);
}
