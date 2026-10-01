import type { Metadata } from "next";

import { ComponentShowcase } from "@/features/design-system/components/component-showcase";
import { ProductGrid } from "@/features/catalog/components/product-grid";
import { products } from "@/features/catalog/data/products";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";

export const metadata: Metadata = {
  title: "سیستم طراحی",
  description:
    "توکن‌های رنگ، تایپوگرافی و کامپوننت‌های پایه رابط کاربری مُدا در پوسته روشن و تیره.",
  alternates: { canonical: "/design-system" },
  robots: { index: false, follow: false },
};

const colorTokens = [
  ["background", "پس‌زمینه"],
  ["card", "کارت / سطح"],
  ["surface-elevated", "سطح برجسته"],
  ["muted", "خنثی"],
  ["primary", "اصلی (توت)"],
  ["secondary", "ثانویه"],
  ["accent", "تأکید"],
  ["sale", "حراج"],
  ["rating", "امتیاز"],
  ["success", "موفقیت"],
  ["warning", "هشدار"],
  ["destructive", "خطا"],
  ["info", "اطلاع"],
  ["border", "حاشیه"],
] as const;

const typeScale = [
  ["text-display", "Display — نمایش", "مد، سبک زندگی"],
  ["text-h1", "H1 — تیتر اصلی", "کالکشن پاییزه مُدا"],
  ["text-h2", "H2 — تیتر بخش", "پرفروش‌ترین‌ها"],
  ["text-h3", "H3 — زیرتیتر", "پالتو بلند زنانه پشمی"],
  [
    "text-body",
    "Body — متن",
    "پارچه پشمی درجه یک با آستر کامل و برش کلاسیک برای روزهای سرد.",
  ],
  ["text-label", "Label — برچسب", "نام و نام خانوادگی"],
  [
    "text-caption",
    "Caption — توضیح",
    "ارسال رایگان برای سفارش‌های بالای ۵۰۰ هزار تومان",
  ],
  ["text-price", "Price — قیمت", "۲,۴۸۰,۰۰۰ تومان"],
] as const;

export default function DesignSystemPage() {
  return (
    <div className="container pb-section">
      <PageBreadcrumb items={[{ label: "سیستم طراحی" }]} />
      <header className="mb-10">
        <h1 className="text-h1">سیستم طراحی مُدا</h1>
        <p className="mt-2 max-w-2xl text-body text-muted-foreground">
          توکن‌ها و کامپوننت‌های پایه. پوسته را از سربرگ تغییر دهید تا هر دو
          حالت روشن و تیره را بررسی کنید.
        </p>
      </header>

      <section aria-labelledby="colors" className="mb-12">
        <h2 id="colors" className="mb-4 text-h2">
          رنگ‌ها
        </h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {colorTokens.map(([token, label]) => (
            <li
              key={token}
              className="overflow-hidden rounded-lg border border-border bg-card"
            >
              <span
                className="block h-16 border-b border-border"
                style={{ background: `hsl(var(--${token}))` }}
              />
              <span className="block p-2">
                <span className="block text-xs font-bold">{label}</span>
                <code
                  className="block text-[10px] text-muted-foreground"
                  dir="ltr"
                >
                  --{token}
                </code>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="type" className="mb-12">
        <h2 id="type" className="mb-4 text-h2">
          تایپوگرافی — ایران‌سنس
        </h2>
        <ul className="divide-y divide-border rounded-xl border border-border bg-card">
          {typeScale.map(([cls, name, sample]) => (
            <li
              key={cls}
              className="grid gap-1 p-4 md:grid-cols-[200px_1fr] md:items-center"
            >
              <span className="text-caption text-muted-foreground">{name}</span>
              <span className={cls}>{sample}</span>
            </li>
          ))}
        </ul>
      </section>

      <ComponentShowcase
        productGridSample={
          <ProductGrid
            products={products.slice(15, 18)}
            columns="grid-cols-2 md:grid-cols-4"
            className="mb-0"
          />
        }
      />
    </div>
  );
}
