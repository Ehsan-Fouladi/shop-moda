import type { Metadata } from "next";
import Link from "next/link";
import {
  Clock,
  Mail,
  MapPin,
  MessageCircleQuestion,
  Phone,
} from "lucide-react";

import { ContactForm } from "@/features/content/components/contact-form";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { siteConfig } from "@/config/site";
import { faqs } from "@/features/content/data/faqs";

export const metadata: Metadata = {
  title: "تماس با ما",
  description:
    "راه‌های ارتباط با پشتیبانی مُدا: تلفن، ایمیل، آدرس دفتر مرکزی و فرم ارسال پیام.",
  alternates: { canonical: "/contact" },
};

const channels = [
  {
    icon: Phone,
    title: "تلفن پشتیبانی",
    value: siteConfig.phone,
    href: siteConfig.phoneHref,
    ltr: true,
  },
  {
    icon: Mail,
    title: "ایمیل",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    ltr: true,
  },
  { icon: Clock, title: "ساعات پاسخگویی", value: siteConfig.workingHours },
  { icon: MapPin, title: "دفتر مرکزی", value: siteConfig.address },
];

export default function ContactPage() {
  return (
    <div className="container pb-section">
      <PageBreadcrumb items={[{ label: "تماس با ما" }]} />
      <header className="mb-8 max-w-2xl">
        <h1 className="text-h1">تماس با ما</h1>
        <p className="mt-2 text-body leading-8 text-muted-foreground">
          سؤال، پیشنهاد یا مشکلی دارید؟ تیم پشتیبانی مُدا آماده پاسخگویی است.
          پیش از ارسال پیام، شاید پاسخ خود را در سؤالات متداول پیدا کنید.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">
        <aside className="space-y-4">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {channels.map(({ icon: Icon, title, value, href, ltr }) => (
              <li
                key={title}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-muted-foreground">
                    {title}
                  </span>
                  {href ? (
                    <a
                      href={href}
                      dir={ltr ? "ltr" : undefined}
                      className="mt-0.5 block break-all text-sm font-bold hover:text-primary"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="mt-0.5 block text-sm font-bold leading-6">
                      {value}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>

          {/* Stylised map placeholder (no external map service) */}
          <div
            className="relative h-48 overflow-hidden rounded-xl border border-border bg-muted"
            role="img"
            aria-label={`موقعیت دفتر مرکزی: ${siteConfig.address}`}
          >
            <svg
              className="absolute inset-0 h-full w-full text-border"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="map-grid"
                  width="32"
                  height="32"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M32 0H0V32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#map-grid)" />
              <path
                d="M-10 120 C 80 90, 160 150, 420 70"
                stroke="currentColor"
                strokeWidth="14"
                fill="none"
              />
              <path
                d="M180 -10 L 220 260"
                stroke="currentColor"
                strokeWidth="10"
                fill="none"
              />
            </svg>
            <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg ring-8 ring-primary/20">
              <MapPin className="h-5 w-5" aria-hidden="true" />
            </span>
          </div>

          <div className="rounded-xl bg-muted/60 p-4">
            <p className="flex items-center gap-2 text-sm font-bold">
              <MessageCircleQuestion
                className="h-5 w-5 text-primary"
                aria-hidden="true"
              />{" "}
              پرسش‌های پرتکرار
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {faqs.slice(0, 4).map((f) => (
                <li key={f.id}>
                  <Link
                    href={`/faq?category=${f.category}`}
                    className="text-muted-foreground hover:text-primary"
                  >
                    {f.question}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section
          aria-labelledby="contact-form-title"
          className="rounded-2xl border border-border bg-card p-5 sm:p-8 flex flex-col justify-center"
        >
          <h2 id="contact-form-title" className="text-h3 font-bold">
            ارسال پیام
          </h2>
          <p className="mb-6 mt-1 text-sm text-muted-foreground">
            فیلدهای ستاره‌دار الزامی هستند.
          </p>
          <ContactForm />
        </section>
      </div>
    </div>
  );
}
