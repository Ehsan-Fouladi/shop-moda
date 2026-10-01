import "server-only";

import type {
  Address,
  AppNotification,
  PaymentMethod,
  UserProfile,
} from "@/features/account/types";

/** Mock signed-in customer (UI only — no authentication). */
export const currentUser: UserProfile = {
  firstName: "سارا",
  lastName: "محمدی",
  email: "sara.mohammadi@example.com",
  phone: "۰۹۱۲۳۴۵۶۷۸۹",
  birthDate: "1994-05-18",
  initials: "سم",
  memberSince: "2023-03-10T00:00:00Z",
  loyaltyTier: "مشتری طلایی",
};

export const addresses: Address[] = [
  {
    id: "a-1",
    title: "خانه",
    receiver: "سارا محمدی",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    province: "تهران",
    city: "تهران",
    street: "سعادت‌آباد، خیابان سرو غربی، کوچه نسترن، پلاک ۱۸، واحد ۴",
    postalCode: "۱۹۹۸۷۶۵۴۳۲",
    isDefault: true,
  },
  {
    id: "a-2",
    title: "محل کار",
    receiver: "سارا محمدی",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    province: "تهران",
    city: "تهران",
    street: "خیابان ولیعصر، بالاتر از پارک ساعی، ساختمان آرین، طبقه ۶",
    postalCode: "۱۵۱۱۸۴۳۲۱۰",
    isDefault: false,
  },
  {
    id: "a-3",
    title: "منزل پدری",
    receiver: "مهین رضایی",
    phone: "۰۹۱۳۱۱۱۲۲۳۳",
    province: "اصفهان",
    city: "اصفهان",
    street: "خیابان چهارباغ بالا، کوچه ارغوان، پلاک ۷",
    postalCode: "۸۱۶۴۹۵۳۲۱۱",
    isDefault: false,
  },
];

/** Current Moda wallet balance, in Toman. */
export const walletBalance = 185000;

export const paymentMethods: PaymentMethod[] = [
  {
    id: "pm-1",
    brand: "shaparak",
    last4: "۴۲۱۸",
    expiry: "۰۶/۰۷",
    holder: "سارا محمدی",
    isDefault: true,
  },
  {
    id: "pm-2",
    brand: "visa",
    last4: "۹۰۳۱",
    expiry: "۱۱/۲۸",
    holder: "SARA MOHAMMADI",
    isDefault: false,
  },
  {
    id: "pm-3",
    brand: "mastercard",
    last4: "۷۷۶۴",
    expiry: "۰۳/۲۷",
    holder: "SARA MOHAMMADI",
    isDefault: false,
  },
];

/** Instant the mock notifications are relative to; also the "now" for their relative times, so the
 * prerendered text and the hydrated client render agree however long ago the page was built. */
export const notificationsAsOf = Date.now();
const hoursAgo = (h: number) =>
  new Date(notificationsAsOf - h * 3600000).toISOString();

export const notifications: AppNotification[] = [
  {
    id: "n-1",
    title: "سفارش MD-140582 ارسال شد",
    body: "سفارش شما تحویل پست شد و تا فردا به دستتان می‌رسد. کد رهگیری: ۲۰۴۸۷۵۶۳۱۲",
    category: "order",
    createdAt: hoursAgo(2),
    read: false,
  },
  {
    id: "n-2",
    title: "کالای مورد علاقه شما تخفیف خورد",
    body: "«ساعت مچی استیل مینیمال بند فلزی» که در علاقه‌مندی‌هایتان است، تا پایان هفته با قیمت ویژه عرضه می‌شود.",
    category: "wishlist",
    createdAt: hoursAgo(9),
    read: false,
  },
  {
    id: "n-3",
    title: "جشنواره پاییزه شروع شد",
    body: "تا ۴۰٪ تخفیف روی کالکشن جدید پاییزه؛ فقط تا پایان مهرماه.",
    category: "promo",
    createdAt: hoursAgo(30),
    read: false,
  },
  {
    id: "n-4",
    title: "پرداخت سفارش MD-140417 تأیید شد",
    body: "پرداخت شما با موفقیت انجام شد و سفارش در حال آماده‌سازی است.",
    category: "order",
    createdAt: hoursAgo(52),
    read: true,
  },
  {
    id: "n-5",
    title: "ورود از دستگاه جدید",
    body: "ورود به حساب شما از یک مرورگر جدید در تهران انجام شد. اگر این شما نبودید، رمز عبور خود را تغییر دهید.",
    category: "system",
    createdAt: hoursAgo(80),
    read: true,
  },
  {
    id: "n-6",
    title: "سفارش MD-139950 تحویل شد",
    body: "امیدواریم از خرید خود راضی باشید. با ثبت نظر، به انتخاب بهتر دیگران کمک کنید.",
    category: "order",
    createdAt: hoursAgo(400),
    read: true,
  },
];
