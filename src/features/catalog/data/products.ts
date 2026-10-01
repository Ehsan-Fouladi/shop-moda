import "server-only";

import type { Product } from "@/features/catalog/types";

/**
 * Products with studio photography (`-1` full view, `-2` closer detail, both 800×1000).
 * The rest still use illustrated placeholders until their photography exists.
 */
const PHOTOGRAPHED = new Set([
  "wool-long-coat",
  "floral-midi-dress",
  "poplin-blouse",
  "men-slim-shirt",
  "premium-polo",
  "chino-pants",
  "aurora-running-shoes",
  "leather-sneakers-men",
  "luna-heels",
  "leather-shoulder-bag",
  "urban-backpack",
  "minimal-steel-watch",
  "uv-sunglasses",
  "hydrating-face-cream",
  "amber-perfume",
  "sports-leggings",
]);

const img = (slug: string) =>
  PHOTOGRAPHED.has(slug)
    ? [`/images/products/${slug}-1.jpg`, `/images/products/${slug}-2.jpg`]
    : [
        `/images/products/${slug}-1.jpg`,
        `/images/products/${slug}-2.jpg`,
        `/images/products/${slug}-3.jpg`,
      ];

/**
 * Mock catalog — UI only. Shapes mirror a future API response
 * so real data can replace this file without touching components.
 */
export const products: Product[] = [
  {
    id: "p-01",
    slug: "wool-long-coat",
    title: "پالتو بلند زنانه پشمی مدل پاییزه",
    brand: "پرنیان",
    categoryId: "women",
    price: 2480000,
    oldPrice: 3100000,
    rating: 4.7,
    reviewCount: 128,
    subcategory: "coats",
    gender: "women",
    images: img("wool-long-coat"),
    badge: "bestseller",
    status: "in-stock",
    colors: [
      { name: "شتری", hex: "#C19A6B" },
      { name: "مشکی", hex: "#1C1C1E" },
      { name: "طوسی", hex: "#8E8E93" },
    ],
    sizes: ["S", "M", "L", "XL"],
    shortDescription:
      "پالتو بلند با پارچه پشمی درجه یک، آستر کامل و برش کلاسیک",
    description:
      "پالتو بلند زنانه پرنیان از پشم فشرده با آستر ویسکوز تولید شده است. برش کلاسیک و یقه انگلیسی، همراه با کمربند همرنگ، ظاهری شیک و گرم برای روزهای سرد سال می‌سازد. دو جیب مایل در طرفین و یک جیب داخلی دارد.",
    specs: [
      { label: "جنس رویه", value: "۷۰٪ پشم، ۳۰٪ پلی‌استر" },
      { label: "آستر", value: "ویسکوز" },
      { label: "قد کار", value: "بلند (تا زیر زانو)" },
      { label: "نوع یقه", value: "انگلیسی" },
      { label: "کشور تولید", value: "ایران" },
    ],
    soldCount: 340,
    createdAt: "2026-08-12T10:00:00Z",
  },
  {
    id: "p-02",
    slug: "floral-midi-dress",
    title: "پیراهن میدی گل‌دار یقه گرد",
    brand: "روجا",
    categoryId: "women",
    price: 1150000,
    rating: 4.4,
    reviewCount: 76,
    subcategory: "dresses",
    gender: "women",
    images: img("floral-midi-dress"),
    badge: "new",
    status: "in-stock",
    colors: [
      { name: "صورتی گلدار", hex: "#E8A0B4" },
      { name: "آبی گلدار", hex: "#9DB8D9" },
    ],
    sizes: ["S", "M", "L"],
    shortDescription: "پیراهن میدی با چاپ گل‌دار و پارچه ویسکوز سبک و خنک",
    description:
      "پیراهن میدی روجا با پارچه ویسکوز لطیف و چاپ گل‌دار ظریف، انتخابی ایده‌آل برای استفاده روزمره و مهمانی‌های دوستانه است. برش کمردار با دامن کلوش و آستین سه‌ربع طراحی شده است.",
    specs: [
      { label: "جنس پارچه", value: "۱۰۰٪ ویسکوز" },
      { label: "قد", value: "میدی" },
      { label: "آستین", value: "سه‌ربع" },
      { label: "کشور تولید", value: "ایران" },
    ],
    soldCount: 210,
    createdAt: "2026-09-02T10:00:00Z",
  },
  {
    id: "p-03",
    slug: "poplin-blouse",
    title: "شومیز زنانه پاپلین آستین‌دار",
    brand: "آوا",
    categoryId: "women",
    price: 785000,
    oldPrice: 980000,
    rating: 4.2,
    reviewCount: 54,
    subcategory: "blouses",
    gender: "women",
    images: img("poplin-blouse"),
    badge: "sale",
    status: "in-stock",
    colors: [
      { name: "سفید", hex: "#F5F5F4" },
      { name: "سرمه‌ای", hex: "#27324A" },
      { name: "سبز زیتونی", hex: "#6B7A4F" },
    ],
    sizes: ["S", "M", "L", "XL"],
    shortDescription: "شومیز پاپلین نخی با برش آزاد و دکمه‌خور کامل",
    description:
      "شومیز پاپلین آوا از نخ پنبه‌ای با بافت ظریف تولید شده و برای استفاده روزمره و محیط کار مناسب است. برش آزاد، سرشانه افتاده و دکمه‌خور کامل دارد.",
    specs: [
      { label: "جنس پارچه", value: "۱۰۰٪ پنبه پاپلین" },
      { label: "نوع برش", value: "آزاد (Oversize)" },
      { label: "کشور تولید", value: "ایران" },
    ],
    soldCount: 180,
    createdAt: "2026-07-20T10:00:00Z",
  },
  {
    id: "p-04",
    slug: "men-slim-shirt",
    title: "پیراهن مردانه اسلیم فیت نخی",
    brand: "کاج",
    categoryId: "men",
    price: 690000,
    rating: 4.5,
    reviewCount: 92,
    subcategory: "shirts",
    gender: "men",
    images: img("men-slim-shirt"),
    status: "in-stock",
    colors: [
      { name: "سفید", hex: "#F5F5F4" },
      { name: "آبی آسمانی", hex: "#A7C4DE" },
      { name: "مشکی", hex: "#1C1C1E" },
    ],
    sizes: ["M", "L", "XL", "2XL"],
    shortDescription: "پیراهن اسلیم فیت با یقه کلاسیک و پارچه نخی ضد چروک",
    description:
      "پیراهن مردانه کاج با برش اسلیم فیت و پارچه نخی با فناوری ضد چروک، برای محیط کار و موقعیت‌های رسمی طراحی شده است. یقه کلاسیک و سرآستین دکمه‌دار دارد.",
    specs: [
      { label: "جنس پارچه", value: "۹۷٪ پنبه، ۳٪ الاستین" },
      { label: "نوع برش", value: "اسلیم فیت" },
      { label: "یقه", value: "کلاسیک" },
      { label: "کشور تولید", value: "ایران" },
    ],
    soldCount: 260,
    createdAt: "2026-06-15T10:00:00Z",
  },
  {
    id: "p-05",
    slug: "premium-polo",
    title: "پولوشرت مردانه پنبه پریمیوم",
    brand: "ژیوار",
    categoryId: "men",
    price: 545000,
    rating: 4.6,
    reviewCount: 143,
    subcategory: "tshirts",
    gender: "men",
    images: img("premium-polo"),
    badge: "bestseller",
    status: "in-stock",
    colors: [
      { name: "سرمه‌ای", hex: "#27324A" },
      { name: "طوسی ملانژ", hex: "#9A9AA0" },
      { name: "زرشکی", hex: "#7A2E3A" },
      { name: "سفید", hex: "#F5F5F4" },
    ],
    sizes: ["M", "L", "XL", "2XL"],
    shortDescription: "پولوشرت با پنبه شانه‌شده، یقه سه دکمه و دوخت تقویتی",
    description:
      "پولوشرت ژیوار از پنبه شانه‌شده پریمیوم با بافت پیکه تولید شده است. یقه مقاوم در برابر شل شدن، سه دکمه صدفی و چاک کناری برای راحتی بیشتر دارد.",
    specs: [
      { label: "جنس پارچه", value: "۱۰۰٪ پنبه شانه‌شده" },
      { label: "بافت", value: "پیکه" },
      { label: "کشور تولید", value: "ایران" },
    ],
    soldCount: 520,
    createdAt: "2026-05-01T10:00:00Z",
  },
  {
    id: "p-06",
    slug: "chino-pants",
    title: "شلوار کتان مردانه استرچ مدل چینو",
    brand: "باران",
    categoryId: "men",
    price: 890000,
    oldPrice: 1120000,
    rating: 4.3,
    reviewCount: 67,
    subcategory: "pants",
    gender: "men",
    images: img("chino-pants"),
    badge: "sale",
    status: "low-stock",
    colors: [
      { name: "خاکی", hex: "#B8A380" },
      { name: "سرمه‌ای", hex: "#27324A" },
      { name: "زیتونی", hex: "#5C6445" },
    ],
    sizes: ["30", "32", "34", "36", "38"],
    shortDescription: "شلوار چینو با پارچه استرچ و برش راسته مدرن",
    description:
      "شلوار چینو باران با پارچه کتان استرچ و برش راسته، راحتی و ظاهر مرتب را با هم ارائه می‌کند. دو جیب کج در جلو و دو جیب دکمه‌دار در پشت دارد.",
    specs: [
      { label: "جنس پارچه", value: "۹۸٪ پنبه، ۲٪ الاستین" },
      { label: "برش", value: "راسته مدرن" },
      { label: "کشور تولید", value: "ایران" },
    ],
    soldCount: 150,
    createdAt: "2026-08-01T10:00:00Z",
  },
  {
    id: "p-07",
    slug: "aurora-running-shoes",
    title: "کفش رانینگ زنانه مدل اورورا",
    brand: "نارین",
    categoryId: "shoes",
    price: 2350000,
    rating: 4.8,
    reviewCount: 201,
    subcategory: "sneakers",
    gender: "women",
    images: img("aurora-running-shoes"),
    badge: "bestseller",
    status: "in-stock",
    colors: [
      { name: "صورتی/سفید", hex: "#E9B8C4" },
      { name: "مشکی/نقره‌ای", hex: "#3A3A3E" },
    ],
    sizes: ["36", "37", "38", "39", "40"],
    shortDescription: "کفش رانینگ با زیره فوم سبک و رویه مش تنفس‌پذیر",
    description:
      "کفش رانینگ اورورا با زیره فوم جاذب ضربه و رویه مهندسی‌شده مش، برای دویدن‌های روزمره و پیاده‌روی طولانی طراحی شده است. وزن سبک و پاشنه ۸ میلی‌متری اختلاف دارد.",
    specs: [
      { label: "رویه", value: "مش مهندسی‌شده" },
      { label: "زیره", value: "فوم EVA" },
      { label: "کاربری", value: "رانینگ / پیاده‌روی" },
      { label: "وزن (سایز ۳۸)", value: "۲۴۰ گرم" },
    ],
    soldCount: 610,
    createdAt: "2026-04-10T10:00:00Z",
  },
  {
    id: "p-08",
    slug: "leather-sneakers-men",
    title: "کفش اسنیکر مردانه چرم طبیعی",
    brand: "کاوه",
    categoryId: "shoes",
    price: 1980000,
    oldPrice: 2450000,
    rating: 4.5,
    reviewCount: 88,
    subcategory: "sneakers",
    gender: "men",
    images: img("leather-sneakers-men"),
    badge: "sale",
    status: "in-stock",
    colors: [
      { name: "سفید", hex: "#EFEFEF" },
      { name: "مشکی", hex: "#232326" },
      { name: "عسلی", hex: "#B07C4F" },
    ],
    sizes: ["40", "41", "42", "43", "44", "45"],
    shortDescription: "اسنیکر مینیمال با چرم طبیعی و زیره لاستیکی مقاوم",
    description:
      "اسنیکر چرم کاوه با رویه چرم طبیعی گاوی، آستر چرمی و زیره لاستیکی دوخته‌شده تولید شده است. طراحی مینیمال آن با استایل رسمی و کژوال قابل ست شدن است.",
    specs: [
      { label: "جنس رویه", value: "چرم طبیعی گاوی" },
      { label: "آستر", value: "چرم طبیعی" },
      { label: "زیره", value: "لاستیک دوخته‌شده" },
      { label: "کشور تولید", value: "ایران" },
    ],
    soldCount: 290,
    createdAt: "2026-03-22T10:00:00Z",
  },
  {
    id: "p-09",
    slug: "luna-heels",
    title: "کفش پاشنه‌دار زنانه مدل لونا",
    brand: "روجا",
    categoryId: "shoes",
    price: 1320000,
    rating: 4.1,
    reviewCount: 45,
    subcategory: "formal",
    gender: "women",
    images: img("luna-heels"),
    badge: "new",
    status: "in-stock",
    colors: [
      { name: "مشکی", hex: "#1E1E22" },
      { name: "نود", hex: "#D8B49A" },
    ],
    sizes: ["36", "37", "38", "39", "40"],
    shortDescription: "کفش پاشنه ۷ سانتی‌متری با پنجه نرم و طراحی مجلسی",
    description:
      "کفش پاشنه‌دار لونا با پاشنه ۷ سانتی‌متری مخروطی و کفی طبی نرم، تعادل و راحتی را در مجالس طولانی حفظ می‌کند. رویه از جنس ساتن مات با بندی ظریف روی مچ است.",
    specs: [
      { label: "ارتفاع پاشنه", value: "۷ سانتی‌متر" },
      { label: "جنس رویه", value: "ساتن مات" },
      { label: "کفی", value: "طبی نرم" },
    ],
    soldCount: 95,
    createdAt: "2026-09-10T10:00:00Z",
  },
  {
    id: "p-10",
    slug: "leather-shoulder-bag",
    title: "کیف دوشی زنانه چرم مدل ترنج",
    brand: "پرنیان",
    categoryId: "bags",
    price: 1750000,
    rating: 4.6,
    reviewCount: 112,
    subcategory: "shoulder",
    gender: "women",
    images: img("leather-shoulder-bag"),
    badge: "bestseller",
    status: "in-stock",
    colors: [
      { name: "عسلی", hex: "#A9744F" },
      { name: "مشکی", hex: "#222226" },
      { name: "شرابی", hex: "#6E2B38" },
    ],
    shortDescription: "کیف دوشی چرم طبیعی با بند قابل تنظیم و یراق طلایی",
    description:
      "کیف دوشی ترنج از چرم طبیعی با بافت نرم تولید شده است. بند دوشی قابل تنظیم و قابل جدا شدن، یراق‌آلات طلایی و جیب‌های متعدد داخلی دارد.",
    specs: [
      { label: "جنس", value: "چرم طبیعی" },
      { label: "ابعاد", value: "۲۴ × ۱۶ × ۸ سانتی‌متر" },
      { label: "بند", value: "دوشی قابل تنظیم" },
      { label: "کشور تولید", value: "ایران" },
    ],
    soldCount: 380,
    createdAt: "2026-06-28T10:00:00Z",
  },
  {
    id: "p-11",
    slug: "urban-backpack",
    title: "کوله‌پشتی چرم مدل شهری",
    brand: "کاوه",
    categoryId: "bags",
    price: 2150000,
    oldPrice: 2600000,
    rating: 4.4,
    reviewCount: 63,
    subcategory: "backpacks",
    gender: "unisex",
    images: img("urban-backpack"),
    badge: "sale",
    status: "in-stock",
    colors: [
      { name: "قهوه‌ای", hex: "#6F4A33" },
      { name: "مشکی", hex: "#232326" },
    ],
    shortDescription: "کوله شهری با جای لپ‌تاپ ۱۵ اینچ و چرم وگن مقاوم",
    description:
      "کوله‌پشتی شهری کاوه از چرم وگن مقاوم در برابر آب تولید شده و محفظه ضربه‌گیر لپ‌تاپ ۱۵ اینچ، جیب‌های سازمان‌دهنده و بند دوشی پددار دارد.",
    specs: [
      { label: "جنس", value: "چرم وگن ضدآب" },
      { label: "محفظه لپ‌تاپ", value: "تا ۱۵ اینچ" },
      { label: "حجم", value: "۱۸ لیتر" },
    ],
    soldCount: 170,
    createdAt: "2026-07-30T10:00:00Z",
  },
  {
    id: "p-12",
    slug: "minimal-steel-watch",
    title: "ساعت مچی استیل مینیمال بند فلزی",
    brand: "ارغوان",
    categoryId: "accessories",
    price: 3450000,
    rating: 4.9,
    reviewCount: 156,
    subcategory: "watches",
    gender: "unisex",
    images: img("minimal-steel-watch"),
    badge: "limited",
    status: "low-stock",
    colors: [
      { name: "نقره‌ای", hex: "#C9CCD1" },
      { name: "طلایی رزگلد", hex: "#D9A08C" },
    ],
    shortDescription: "ساعت کوارتز با صفحه مینیمال، شیشه سافایر و بند استیل",
    description:
      "ساعت مچی ارغوان با موتور کوارتز ژاپنی، شیشه ضدخش سافایر و بند استیل ضدزنگ ۳۱۶L ساخته شده است. صفحه مینیمال با عقربه‌های باریک و مقاومت در برابر آب تا ۵ اتمسفر دارد.",
    specs: [
      { label: "موتور", value: "کوارتز ژاپنی" },
      { label: "شیشه", value: "سافایر" },
      { label: "بند", value: "استیل ۳۱۶L" },
      { label: "مقاومت آب", value: "۵ اتمسفر" },
      { label: "قطر صفحه", value: "۳۸ میلی‌متر" },
    ],
    soldCount: 240,
    createdAt: "2026-08-20T10:00:00Z",
  },
  {
    id: "p-13",
    slug: "uv-sunglasses",
    title: "عینک آفتابی محافظ UV400 مدل کلاسیک",
    brand: "آوا",
    categoryId: "accessories",
    price: 980000,
    oldPrice: 1250000,
    rating: 4.0,
    reviewCount: 39,
    subcategory: "sunglasses",
    gender: "unisex",
    images: img("uv-sunglasses"),
    badge: "sale",
    status: "in-stock",
    colors: [
      { name: "مشکی/دودی", hex: "#2A2A2E" },
      { name: "عسلی/قهوه‌ای", hex: "#8A5A38" },
    ],
    shortDescription: "فریم استات سبک با لنز پلاریزه و محافظت کامل UV400",
    description:
      "عینک آفتابی کلاسیک آوا با فریم استات ایتالیایی سبک و لنز پلاریزه UV400 تولید شده است. همراه با کیف هارد و دستمال میکروفایبر عرضه می‌شود.",
    specs: [
      { label: "لنز", value: "پلاریزه UV400" },
      { label: "فریم", value: "استات" },
      { label: "اقلام همراه", value: "کیف هارد، دستمال" },
    ],
    soldCount: 120,
    createdAt: "2026-05-18T10:00:00Z",
  },
  {
    id: "p-14",
    slug: "hydrating-face-cream",
    title: "کرم آبرسان صورت ۵۰ میلی‌لیتر",
    brand: "گلسا",
    categoryId: "beauty",
    price: 465000,
    oldPrice: 590000,
    rating: 4.7,
    reviewCount: 324,
    subcategory: "skincare",
    gender: "unisex",
    images: img("hydrating-face-cream"),
    badge: "bestseller",
    status: "in-stock",
    shortDescription:
      "آبرسان با هیالورونیک اسید، مناسب انواع پوست و بدون پارابن",
    description:
      "کرم آبرسان گلسا با هیالورونیک اسید و سرامید، رطوبت پوست را تا ۷۲ ساعت حفظ می‌کند. بافت سبک و غیرچرب آن زیر آرایش قابل استفاده است و فاقد پارابن و الکل است.",
    specs: [
      { label: "حجم", value: "۵۰ میلی‌لیتر" },
      { label: "نوع پوست", value: "انواع پوست" },
      { label: "مواد مؤثره", value: "هیالورونیک اسید، سرامید" },
      { label: "فاقد", value: "پارابن، الکل" },
    ],
    soldCount: 890,
    createdAt: "2026-02-14T10:00:00Z",
  },
  {
    id: "p-15",
    slug: "amber-perfume",
    title: "ادو پرفیوم بلندمدت مدل امبر",
    brand: "آترین",
    categoryId: "beauty",
    price: 1890000,
    rating: 4.8,
    reviewCount: 187,
    subcategory: "perfume",
    gender: "unisex",
    images: img("amber-perfume"),
    badge: "new",
    status: "in-stock",
    colors: [
      { name: "۵۰ میل", hex: "#C9A227" },
      { name: "۱۰۰ میل", hex: "#8C6D2F" },
    ],
    shortDescription: "رایحه گرم و تلخ با نت‌های کهربا، وانیل و چوب صندل",
    description:
      "ادو پرفیوم امبر با غلظت ۲۰٪ اسانس و ماندگاری بالای ۸ ساعت تولید شده است. نت ابتدایی ترنج و فلفل صورتی، نت میانی گل یاس و نت پایه کهربا، وانیل و چوب صندل است.",
    specs: [
      { label: "غلظت", value: "ادو پرفیوم (۲۰٪)" },
      { label: "طبع رایحه", value: "گرم و تلخ" },
      { label: "ماندگاری", value: "بیش از ۸ ساعت" },
      { label: "حجم", value: "۵۰ / ۱۰۰ میلی‌لیتر" },
    ],
    soldCount: 430,
    createdAt: "2026-09-05T10:00:00Z",
  },
  {
    id: "p-16",
    slug: "sports-leggings",
    title: "لگینگ ورزشی زنانه های‌ویست",
    brand: "نارین",
    categoryId: "sport",
    price: 620000,
    rating: 4.5,
    reviewCount: 149,
    subcategory: "clothing",
    gender: "women",
    images: img("sports-leggings"),
    status: "in-stock",
    colors: [
      { name: "مشکی", hex: "#1F1F23" },
      { name: "سرمه‌ای", hex: "#2C3A55" },
      { name: "بنفش بادمجانی", hex: "#5B3A5E" },
    ],
    sizes: ["S", "M", "L", "XL"],
    shortDescription: "لگینگ های‌ویست با پارچه جذب‌کننده رطوبت و کاملاً مات",
    description:
      "لگینگ ورزشی نارین با پارچه چهارطرفه کشسان و فناوری جذب رطوبت، برای تمرین، یوگا و دویدن مناسب است. کمر های‌ویست پهن و پارچه کاملاً مات دارد.",
    specs: [
      { label: "جنس", value: "۷۸٪ نایلون، ۲۲٪ اسپاندکس" },
      { label: "کشسانی", value: "چهارطرفه" },
      { label: "ویژگی", value: "جذب رطوبت، مات" },
    ],
    soldCount: 470,
    createdAt: "2026-08-25T10:00:00Z",
  },
  {
    id: "p-17",
    slug: "silk-scarf",
    title: "شال و روسری ابریشم طرح سنتی",
    brand: "مه‌دوز",
    categoryId: "accessories",
    price: 385000,
    rating: 4.3,
    reviewCount: 58,
    subcategory: "scarves",
    gender: "women",
    images: img("minimal-steel-watch"),
    status: "in-stock",
    colors: [
      { name: "فیروزه‌ای", hex: "#3FA7A0" },
      { name: "لاکی", hex: "#9E2B25" },
      { name: "کرم", hex: "#E6D9C3" },
    ],
    shortDescription: "روسری ابریشم طبیعی با چاپ طرح سنتی ایرانی و لبه دست‌دوز",
    description:
      "روسری مه‌دوز از ابریشم طبیعی با چاپ دیجیتال طرح‌های سنتی ایرانی تولید شده است. لبه‌ها دست‌دوز است و در ابعاد ۹۰×۹۰ سانتی‌متر عرضه می‌شود.",
    specs: [
      { label: "جنس", value: "ابریشم طبیعی" },
      { label: "ابعاد", value: "۹۰ × ۹۰ سانتی‌متر" },
      { label: "لبه", value: "دست‌دوز" },
    ],
    soldCount: 130,
    createdAt: "2026-07-08T10:00:00Z",
  },
  {
    id: "p-18",
    slug: "classic-leather-belt",
    title: "کمربند چرم کلاسیک مردانه",
    brand: "کاوه",
    categoryId: "accessories",
    price: 540000,
    oldPrice: 680000,
    rating: 4.2,
    reviewCount: 71,
    subcategory: "belts",
    gender: "men",
    images: img("minimal-steel-watch"),
    badge: "sale",
    status: "out-of-stock",
    colors: [
      { name: "مشکی", hex: "#202024" },
      { name: "قهوه‌ای", hex: "#5E4030" },
    ],
    sizes: ["95", "100", "105", "110"],
    shortDescription:
      "کمربند چرم طبیعی با سگک فلزی مینیمال و عرض ۳.۵ سانتی‌متر",
    description:
      "کمربند کلاسیک کاوه از چرم طبیعی گاوی با دباغی گیاهی تولید شده است. سگک فلزی مینیمال با آبکاری ضدخش و عرض استاندارد ۳.۵ سانتی‌متر دارد.",
    specs: [
      { label: "جنس", value: "چرم طبیعی گاوی" },
      { label: "عرض", value: "۳.۵ سانتی‌متر" },
      { label: "سگک", value: "فلزی ضدخش" },
    ],
    soldCount: 200,
    createdAt: "2026-04-02T10:00:00Z",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, limit);
}

export const bestSellers = products
  .filter((p) => p.badge === "bestseller")
  .slice(0, 8);

export const newArrivals = [...products]
  .sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
  .slice(0, 8);

export const onSale = products.filter((p) => p.oldPrice).slice(0, 8);

export function getProductsByCategory(
  categoryId: string,
  subcategory?: string,
): Product[] {
  return products.filter(
    (p) =>
      p.categoryId === categoryId &&
      (!subcategory || p.subcategory === subcategory),
  );
}

export function searchProducts(query: string): Product[] {
  const q = query.trim();
  if (!q) return [];
  const terms = q.split(/\s+/);
  return products.filter((p) => {
    const haystack = `${p.title} ${p.brand} ${p.shortDescription}`;
    return terms.some((t) => haystack.includes(t));
  });
}

/** Mock "featured" editorial selection for the homepage. */
export const featuredProducts = [
  "p-01",
  "p-10",
  "p-12",
  "p-15",
  "p-08",
  "p-02",
  "p-05",
  "p-17",
].flatMap((id) => products.filter((p) => p.id === id));

/** Mock "recently viewed" history shown on a first visit. */
export function getDefaultRecentlyViewed(): Product[] {
  const slugs = [
    "minimal-steel-watch",
    "leather-shoulder-bag",
    "floral-midi-dress",
    "premium-polo",
    "silk-scarf",
  ];
  return slugs.flatMap((slug) => products.filter((p) => p.slug === slug));
}
