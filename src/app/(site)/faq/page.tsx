import type { Metadata } from "next";
import Link from "next/link";
import { Headphones } from "lucide-react";

import { FaqBrowser } from "@/features/content/components/faq-browser";
import { JsonLd } from "@/components/shared/json-ld";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { firstParam } from "@/lib/search-params";
import { faqCategories, faqs } from "@/features/content/data/faqs";

export const metadata: Metadata = {
  title: "سؤالات متداول",
  description:
    "پاسخ پرسش‌های رایج درباره سفارش، ارسال، پرداخت، بازگشت کالا و حساب کاربری در مُدا.",
  alternates: { canonical: "/faq" },
};

export default async function FaqPage(props: PageProps<"/faq">) {
  // Read on the server so the filtered list is in the HTML (no client-only Suspense fallback / layout shift).
  const requested = firstParam((await props.searchParams).category);
  const activeCategory =
    requested && faqCategories.some((c) => c.id === requested)
      ? requested
      : "all";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  return (
    <div className="container pb-section">
      <JsonLd data={jsonLd} />
      <PageBreadcrumb items={[{ label: "سؤالات متداول" }]} />
      <header className="mb-8 text-center">
        <h1 className="text-h1">سؤالات متداول</h1>
        <p className="mx-auto mt-2 max-w-xl text-body leading-8 text-muted-foreground">
          پاسخ رایج‌ترین پرسش‌های مشتریان را اینجا گردآوری کرده‌ایم.
        </p>
      </header>
      <FaqBrowser
        faqs={faqs}
        categories={faqCategories}
        activeCategory={activeCategory}
      />
      <aside className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-4 rounded-2xl bg-muted/60 p-6 text-center sm:flex-row sm:text-start">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-accent text-primary">
          <Headphones className="h-6 w-6" aria-hidden="true" />
        </span>
        <div className="flex-1">
          <h2 className="font-bold">پاسخ خود را پیدا نکردید؟</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            پشتیبانی مُدا {siteConfig.workingHours} پاسخگوی شماست:{" "}
            <a
              href={siteConfig.phoneHref}
              dir="ltr"
              className="font-medium text-foreground hover:text-primary"
            >
              {siteConfig.phone}
            </a>
          </p>
        </div>
        <Button asChild>
          <Link href="/contact">ارسال پیام</Link>
        </Button>
      </aside>
    </div>
  );
}
