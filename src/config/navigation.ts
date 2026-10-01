import type { NavItem, NavLink } from "@/config/types";

/** Rotating announcement bar messages */
export const announcements = [
  "ارسال رایگان برای سفارش‌های بالای ۵۰۰ هزار تومان",
  "جشنواره پاییزه: تا ۴۰٪ تخفیف روی کالکشن جدید",
  "۷ روز ضمانت بازگشت کالا بدون قید و شرط",
];
export const mainNav: NavItem[] = [
  {
    title: "زنانه",
    href: "/category/women",
    megaColumns: [
      {
        title: "پوشاک",
        links: [
          { title: "مانتو و پالتو", href: "/category/women/coats" },
          { title: "پیراهن و لباس مجلسی", href: "/category/women/dresses" },
          { title: "شومیز و بلوز", href: "/category/women/blouses" },
          { title: "شلوار و دامن", href: "/category/women/pants-skirts" },
          { title: "تی‌شرت", href: "/category/women/tshirts" },
        ],
      },
      {
        title: "کفش و کیف",
        links: [
          { title: "کفش زنانه", href: "/category/shoes?gender=women" },
          { title: "کفش پاشنه‌دار", href: "/category/shoes/formal" },
          { title: "کیف دستی", href: "/category/bags?gender=women" },
          { title: "کیف دوشی", href: "/category/bags/shoulder" },
        ],
      },
      {
        title: "پیشنهاد ویژه",
        links: [
          { title: "کالکشن پاییزه", href: "/products?collection=autumn" },
          { title: "استایل اداری", href: "/products?collection=office" },
          { title: "تخفیف‌های زنانه", href: "/products?category=women&sale=1" },
        ],
      },
    ],
  },
  {
    title: "مردانه",
    href: "/category/men",
    megaColumns: [
      {
        title: "پوشاک",
        links: [
          { title: "پیراهن", href: "/category/men/shirts" },
          { title: "تی‌شرت و پولوشرت", href: "/category/men/tshirts" },
          { title: "شلوار و جین", href: "/category/men/pants" },
          { title: "کت و ژاکت", href: "/category/men/jackets" },
          { title: "هودی و سویشرت", href: "/category/men/hoodies" },
        ],
      },
      {
        title: "کفش و اکسسوری",
        links: [
          { title: "کفش مردانه", href: "/category/shoes?gender=men" },
          { title: "کفش رسمی", href: "/category/shoes/formal" },
          { title: "کمربند", href: "/category/accessories/belts" },
          { title: "ساعت مچی", href: "/category/accessories/watches" },
        ],
      },
      {
        title: "پیشنهاد ویژه",
        links: [
          { title: "کالکشن کلاسیک", href: "/products?collection=classic" },
          { title: "استایل روزمره", href: "/products?collection=casual" },
          { title: "تخفیف‌های مردانه", href: "/products?category=men&sale=1" },
        ],
      },
    ],
  },
  {
    title: "کفش",
    href: "/category/shoes",
    megaColumns: [
      {
        title: "انواع کفش",
        links: [
          { title: "کتانی و اسنیکر", href: "/category/shoes/sneakers" },
          { title: "کفش رسمی", href: "/category/shoes/formal" },
          { title: "نیم‌بوت و بوت", href: "/category/shoes/boots" },
          { title: "صندل", href: "/category/shoes/sandals" },
        ],
      },
      {
        title: "برندهای محبوب",
        links: [
          { title: "نارین", href: "/products?brand=نارین" },
          { title: "کاوه", href: "/products?brand=کاوه" },
          { title: "روجا", href: "/products?brand=روجا" },
        ],
      },
    ],
  },
  {
    title: "کیف",
    href: "/category/bags",
    megaColumns: [
      {
        title: "انواع کیف",
        links: [
          { title: "کیف دستی", href: "/category/bags/handbags" },
          { title: "کیف دوشی", href: "/category/bags/shoulder" },
          { title: "کوله‌پشتی", href: "/category/bags/backpacks" },
          { title: "کیف پول", href: "/category/bags/wallets" },
        ],
      },
    ],
  },
  {
    title: "اکسسوری",
    href: "/category/accessories",
    megaColumns: [
      {
        title: "اکسسوری",
        links: [
          { title: "ساعت مچی", href: "/category/accessories/watches" },
          { title: "عینک آفتابی", href: "/category/accessories/sunglasses" },
          { title: "شال و روسری", href: "/category/accessories/scarves" },
          { title: "زیورآلات", href: "/category/accessories/jewelry" },
          { title: "کمربند", href: "/category/accessories/belts" },
        ],
      },
    ],
  },
  {
    title: "زیبایی و سلامت",
    href: "/category/beauty",
    megaColumns: [
      {
        title: "زیبایی",
        links: [
          { title: "مراقبت پوست", href: "/category/beauty/skincare" },
          { title: "آرایش", href: "/category/beauty/makeup" },
          { title: "عطر و ادکلن", href: "/category/beauty/perfume" },
          { title: "مراقبت مو", href: "/category/beauty/haircare" },
        ],
      },
    ],
  },
  {
    title: "ورزشی",
    href: "/category/sport",
    megaColumns: [
      {
        title: "ورزش",
        links: [
          { title: "لباس ورزشی", href: "/category/sport/clothing" },
          { title: "کفش ورزشی", href: "/category/sport/shoes" },
          { title: "تجهیزات ورزشی", href: "/category/sport/equipment" },
        ],
      },
    ],
  },
  {
    title: "تخفیف‌ها",
    href: "/products?sale=1",
    highlight: true,
  },
];
export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "راهنمای خرید",
    links: [
      { title: "نحوه ثبت سفارش", href: "/faq?category=orders" },
      { title: "رویه ارسال سفارش", href: "/shipping-policy" },
      { title: "شرایط بازگشت کالا", href: "/return-policy" },
      { title: "راهنمای سایز", href: "/faq?category=products" },
      { title: "سؤالات متداول", href: "/faq" },
    ],
  },
  {
    title: "خدمات مشتریان",
    links: [
      { title: "تماس با ما", href: "/contact" },
      { title: "پیگیری سفارش", href: "/dashboard/orders" },
      { title: "حریم خصوصی", href: "/privacy-policy" },
      { title: "شرایط و قوانین", href: "/terms" },
      { title: "گزارش مشکل", href: "/contact" },
    ],
  },
  {
    title: "با مُدا",
    links: [
      { title: "درباره ما", href: "/about" },
      { title: "فروش در مُدا", href: "/contact" },
      { title: "فرصت‌های شغلی", href: "/about" },
      { title: "وبلاگ مُدا", href: "/about" },
    ],
  },
];
export const dashboardNav: { title: string; href: string; icon: string }[] = [
  { title: "نمای کلی", href: "/dashboard", icon: "layout-dashboard" },
  { title: "سفارش‌ها", href: "/dashboard/orders", icon: "package" },
  { title: "علاقه‌مندی‌ها", href: "/dashboard/wishlist", icon: "heart" },
  { title: "پروفایل", href: "/dashboard/profile", icon: "user" },
  { title: "آدرس‌ها", href: "/dashboard/addresses", icon: "map-pin" },
  {
    title: "روش‌های پرداخت",
    href: "/dashboard/payment-methods",
    icon: "credit-card",
  },
  { title: "اعلان‌ها", href: "/dashboard/notifications", icon: "bell" },
  { title: "تنظیمات", href: "/dashboard/settings", icon: "settings" },
];
