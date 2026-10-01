import "server-only";

/** Curated collections referenced by navigation (mock product selections). */
export const collections: Record<
  string,
  { title: string; description: string; productIds: string[] }
> = {
  autumn: {
    title: "کالکشن پاییزه",
    description: "گرم، لایه‌لایه و خوش‌رنگ؛ منتخب محصولات فصل پاییز.",
    productIds: ["p-01", "p-03", "p-06", "p-10", "p-17", "p-12"],
  },
  office: {
    title: "استایل اداری",
    description: "پوشاک و اکسسوری رسمی و راحت برای محیط کار.",
    productIds: ["p-03", "p-04", "p-09", "p-10", "p-12", "p-18"],
  },
  classic: {
    title: "کالکشن کلاسیک",
    description: "انتخاب‌های ماندگار که هیچ‌وقت از مد نمی‌افتند.",
    productIds: ["p-04", "p-05", "p-08", "p-12", "p-18", "p-13"],
  },
  casual: {
    title: "استایل روزمره",
    description: "راحت، ساده و شیک برای هر روز هفته.",
    productIds: ["p-05", "p-06", "p-07", "p-11", "p-16", "p-02"],
  },
};
