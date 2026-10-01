import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Gem, Handshake, HeartHandshake, Leaf } from "lucide-react";

import { BenefitsStrip } from "@/components/shared/benefits-strip";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { aboutStats, aboutValues, team } from "@/features/content/data/about";

export const metadata: Metadata = {
  title: "درباره ما",
  description:
    "مُدا فروشگاه آنلاین مد و پوشاک با برندهای منتخب، ارسال سریع و ضمانت بازگشت کالاست. با داستان، ارزش‌ها و تیم ما آشنا شوید.",
  alternates: { canonical: "/about" },
};

const valueIcons = [Gem, Handshake, HeartHandshake, Leaf];

const milestones = [
  { year: "۱۳۹۸", text: "شروع کار با ۱۲ برند ایرانی و یک انبار کوچک در تهران" },
  {
    year: "۱۴۰۰",
    text: "راه‌اندازی ارسال به سراسر کشور و ضمانت ۷ روزه بازگشت کالا",
  },
  {
    year: "۱۴۰۲",
    text: "افتتاح استودیوی عکاسی اختصاصی و راهنمای سایز دقیق برای هر محصول",
  },
  { year: "۱۴۰۵", text: "بیش از ۱۲۰ برند منتخب و ۲۵۰ هزار مشتری راضی" },
];

export default function AboutPage() {
  return (
    <div className="pb-section">
      <div className="container">
        <PageBreadcrumb items={[{ label: "درباره ما" }]} />
      </div>

      <section
        aria-labelledby="about-title"
        className="container grid items-center gap-8 lg:grid-cols-2"
      >
        <div>
          <p className="text-label text-primary">داستان مُدا</p>
          <h1
            id="about-title"
            className="mt-2 text-h1 font-extrabold md:text-display"
          >
            مد را ساده، مطمئن و در دسترس می‌کنیم
          </h1>
          <p className="mt-4 text-body leading-8 text-muted-foreground">
            مُدا با یک ایده ساده شروع شد: خرید آنلاین لباس باید به اندازه خرید
            از بوتیک محبوب محله‌تان لذت‌بخش و مطمئن باشد. امروز با همکاری
            برندهای منتخب ایرانی و بین‌المللی، مجموعه‌ای از پوشاک، کفش، کیف،
            اکسسوری و محصولات زیبایی را با تصاویر واقعی، راهنمای سایز دقیق و
            پشتیبانی واقعاً پاسخگو ارائه می‌کنیم.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href="/products">مشاهده محصولات</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">تماس با ما</Link>
            </Button>
          </div>
        </div>
        <div className="relative grid grid-cols-2 gap-3">
          <div className="relative aspect-3/4 overflow-hidden rounded-2xl">
            <Image
              src="/images/editorial/hero-autumn.jpg"
              alt="استایل پاییزه مُدا"
              draggable="false"
              fill
              loading="eager"
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover object-left"
            />
          </div>
          <div className="relative mt-10 aspect-3/4 overflow-hidden rounded-2xl">
            <Image
              src="/images/editorial/editorial-men.jpg"
              alt="استایل مردانه مُدا"
              draggable="false"
              fill
              loading="eager"
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </section>

      <section aria-label="مُدا در یک نگاه" className="container mt-section">
        <dl className="grid grid-cols-2 gap-3 rounded-2xl bg-primary p-6 text-primary-foreground sm:p-8 lg:grid-cols-4">
          {aboutStats.map((s) => (
            <div key={s.label} className="flex flex-col text-center">
              <dt className="order-2 text-sm opacity-85">{s.label}</dt>
              <dd className="text-2xl font-extrabold tabular-nums sm:text-3xl">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="about-values" className="container mt-section">
        <SectionHeading
          id="about-values"
          title="ارزش‌های ما"
          description="اصولی که هر تصمیم ما را شکل می‌دهند"
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {aboutValues.map((v, i) => {
            const Icon = valueIcons[i % valueIcons.length];
            return (
              <li
                key={v.title}
                className="rounded-xl border border-border bg-card p-5"
              >
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-accent text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-bold">{v.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {v.text}
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <section
        aria-labelledby="about-timeline"
        className="container mt-section grid gap-8 lg:grid-cols-[1fr_1.4fr]"
      >
        <div>
          <SectionHeading
            id="about-timeline"
            title="مسیری که آمده‌ایم"
            description="از یک انبار کوچک تا یکی از فروشگاه‌های محبوب مد آنلاین"
          />
        </div>
        <ol className="relative space-y-6 border-s-2 border-border ps-6">
          {milestones.map((m) => (
            <li key={m.year} className="relative">
              <span
                className="absolute inset-s-[-31px] top-1 h-3.5 w-3.5 rounded-full border-2 border-background bg-primary"
                aria-hidden="true"
              />
              <p className="text-sm font-extrabold text-primary tabular-nums">
                {m.year}
              </p>
              <p className="mt-1 text-body leading-7">{m.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="about-team" className="container mt-section">
        <SectionHeading
          id="about-team"
          title="تیم مُدا"
          description="آدم‌هایی که هر روز برای تجربه بهتر خرید شما کار می‌کنند"
        />
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {team.map((m) => (
            <li
              key={m.name}
              className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center"
            >
              <span
                className="grid h-20 w-20 place-items-center rounded-full bg-linear-to-br from-primary to-primary/60 text-xl font-bold text-primary-foreground"
                aria-hidden="true"
              >
                {m.initials}
              </span>
              <h3 className="mt-4 font-bold">{m.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{m.role}</p>
            </li>
          ))}
        </ul>
      </section>

      <BenefitsStrip className="container mt-section" />
    </div>
  );
}
