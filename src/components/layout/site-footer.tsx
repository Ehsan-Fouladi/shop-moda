import Link from "next/link";
import {
  Clock,
  Headphones,
  Mail,
  MapPin,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { NewsletterForm } from "@/components/shared/newsletter-form";
import { siteConfig } from "@/config/site";
import { footerNav } from "@/config/navigation";

const trustItems = [
  { icon: Truck, title: "ارسال سریع", text: "تحویل ۱ تا ۳ روز کاری" },
  { icon: RotateCcw, title: "۷ روز بازگشت", text: "بدون قید و شرط" },
  { icon: ShieldCheck, title: "ضمانت اصالت", text: "تضمین اصل بودن کالا" },
  { icon: Headphones, title: "پشتیبانی", text: "۷ روز هفته پاسخگو" },
];

function SocialIcon({ name }: { name: "instagram" | "telegram" | "x" }) {
  const paths: Record<typeof name, React.ReactNode> = {
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </>
    ),
    telegram: (
      <path d="m21.5 4.5-3 15c-.2 1-.8 1.2-1.6.8l-4.5-3.3-2.2 2.1c-.2.2-.4.4-.9.4l.3-4.6 8.4-7.6c.4-.3-.1-.5-.6-.2L7 13.6l-4.5-1.4c-1-.3-1-1 .2-1.4L20.2 3.6c.8-.3 1.5.2 1.3.9Z" />
    ),
    x: <path d="M4 4l16 16M20 4 4 20" />,
  };
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4.5 w-4.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

const socialLabels = {
  instagram: "اینستاگرام",
  telegram: "تلگرام",
  x: "ایکس",
} as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card pb-20 lg:pb-0">
      {/* Trust strip */}
      <div className="border-b border-border">
        <ul className="container grid grid-cols-2 gap-4 py-6 md:grid-cols-4">
          {trustItems.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-bold">{title}</span>
                <span className="block text-xs text-muted-foreground">
                  {text}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="container grid gap-10 py-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground">
            {siteConfig.name}، فروشگاه اینترنتی مد و پوشاک؛ جایی برای کشف استایل
            شخصی شما با کالکشن‌هایی منتخب از پوشاک، کفش، کیف، اکسسوری و محصولات
            زیبایی.
          </p>
          <address className="mt-5 space-y-2.5 text-sm not-italic text-muted-foreground">
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {siteConfig.address}
            </p>
            <p className="flex items-center gap-2">
              <Headphones className="h-4 w-4 shrink-0" aria-hidden="true" />
              <a
                href={siteConfig.phoneHref}
                className="hover:text-primary"
                dir="ltr"
              >
                {siteConfig.phone}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-primary"
              >
                {siteConfig.email}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
              {siteConfig.workingHours}
            </p>
          </address>
        </div>

        <nav
          aria-label="پیوندهای پانویس"
          className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5"
        >
          {footerNav.map((group) => (
            <div key={group.title}>
              <h2 className="mb-4 text-sm font-bold">{group.title}</h2>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="lg:col-span-3">
          <h2 className="mb-2 text-sm font-bold">عضویت در خبرنامه</h2>
          <p className="mb-4 text-sm leading-6 text-muted-foreground">
            از تخفیف‌ها و کالکشن‌های جدید زودتر از همه باخبر شوید.
          </p>
          <NewsletterForm idPrefix="footer" />
          <h2 className="mb-3 mt-6 text-sm font-bold">ما را دنبال کنید</h2>
          <ul className="flex gap-2">
            {(
              Object.keys(
                siteConfig.social,
              ) as (keyof typeof siteConfig.social)[]
            ).map((key) => (
              <li key={key}>
                <a
                  href={siteConfig.social[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={socialLabels[key]}
                  className="grid h-10 w-10 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <SocialIcon name={key} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container flex flex-col items-center justify-between gap-3 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>© ۱۴۰۵ — تمامی حقوق برای فروشگاه {siteConfig.name} محفوظ است.</p>
          <ul className="flex items-center gap-2" aria-label="نمادهای اعتماد">
            {["نماد اعتماد", "ساماندهی", "اتحادیه"].map((t) => (
              <li
                key={t}
                className="grid h-12 w-12 place-items-center rounded-lg border border-border bg-background text-[9px] leading-4 text-center"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
