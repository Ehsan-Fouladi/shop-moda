import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

import { HeroCarousel, type HeroSlide } from "./hero-carousel";

const stats = [
  { value: "+۱۲", label: "برند منتخب" },
  { value: "۷ روز", label: "ضمانت بازگشت" },
  { value: "۴٫۷", label: "رضایت مشتریان" },
];

interface HeroSlideData {
  id: string;
  image: string;
  alt: string;
  eyebrow: string;
  /** Title split around the highlighted phrase */
  title: [before: string, highlight: string, after: string];
  text: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}

/** Every image is 3:2 with the subject on its left, leaving the start (right) side for copy. */
const slides: HeroSlideData[] = [
  {
    id: "autumn",
    image: "/images/editorial/hero-autumn.jpg",
    alt: "مدل با پالتوی پاییزه در فضای شهری",
    eyebrow: "کالکشن پاییز ۱۴۰۵",
    title: ["پاییز را ", "به سبک خودت", " بپوش"],
    text: "پالتوهای پشمی، بافت‌های نرم و اکسسوری‌های گرم‌رنگ؛ کالکشن تازه مُدا با برندهای منتخب ایرانی و تا ۴۰٪ تخفیف ویژه آغاز فصل.",
    primary: {
      label: "خرید کالکشن پاییزه",
      href: "/products?collection=autumn",
    },
    secondary: { label: "مشاهده تخفیف‌ها", href: "/products?sale=1" },
  },
  {
    id: "men",
    image: "/images/editorial/hero-men.jpg",
    alt: "مرد با پالتوی شتری و یقه‌اسکی کرم در خیابانی پاییزی",
    eyebrow: "استایل مردانه",
    title: ["کلاسیک، ", "گرم و ماندگار", ""],
    text: "پالتوهای پشمی، بافت‌های یقه‌اسکی و شلوارهای پارچه‌ای خوش‌دوخت؛ انتخاب‌هایی که هر سال دوباره سراغشان می‌روید.",
    primary: { label: "خرید پوشاک مردانه", href: "/category/men" },
    secondary: { label: "کالکشن کلاسیک", href: "/products?collection=classic" },
  },
  {
    id: "knit",
    image: "/images/editorial/hero-knit.jpg",
    alt: "زن با پلیور بافت کرم و شال زرشکی کنار پنجره",
    eyebrow: "تازه‌های فصل",
    title: ["گرمای ", "روزهای سرد", " را حس کن"],
    text: "بافت‌های نرم، شال‌های پشمی و لباس‌های راحت برای خانه و بیرون؛ محصولات تازه هر هفته به مُدا اضافه می‌شوند.",
    primary: { label: "استایل روزمره", href: "/products?collection=casual" },
    secondary: { label: "جدیدترین محصولات", href: "/products?sort=newest" },
  },
];

function HeroSlideContent({
  slide,
  isFirst,
}: {
  slide: HeroSlideData;
  isFirst: boolean;
}) {
  const Heading = isFirst ? "h1" : "h2";
  const [before, highlight, after] = slide.title;
  return (
    <div className="relative">
      {/* Mobile: the 3:2 box matches the photos, so nothing is cropped and the height is known up front */}
      <div className="relative aspect-3/2 md:absolute md:inset-0 md:aspect-auto">
        <Image
          src={slide.image}
          alt={slide.alt}
          draggable="false"
          fill
          sizes="100vw"
          // Only the first slide is the LCP candidate; the others load lazily behind it.
          loading={isFirst ? "eager" : "lazy"}
          fetchPriority={isFirst ? "high" : "auto"}
          className="object-cover md:object-left"
        />
        {/* Mobile: fade into the copy below */}
        <div
          className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-background to-transparent md:hidden"
          aria-hidden="true"
        />
        {/* Desktop: fade from the start (right) edge */}
        <div
          className="absolute inset-0 hidden bg-linear-to-l from-background via-background/85 to-transparent md:block md:via-35% md:to-65%"
          aria-hidden="true"
        />
      </div>

      <div className="container relative -mt-6 pb-5 md:mt-0 md:flex md:min-h-[560px] md:items-center md:pb-32 md:pt-16 lg:min-h-[620px]">
        <div className="max-w-xl motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700">
          <p className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-background/80 px-3 py-1 text-label text-primary backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />{" "}
            {slide.eyebrow}
          </p>
          <Heading className="mt-4 text-[2rem] font-extrabold leading-[1.35] tracking-tight sm:text-display lg:text-[3.25rem]">
            {before}
            <span className="text-primary">{highlight}</span>
            {after}
          </Heading>
          <p className="mt-4 max-w-md text-body leading-8 text-muted-foreground">
            {slide.text}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button size="lg" asChild className="min-w-40">
              <Link href={slide.primary.href}>
                {slide.primary.label} <ArrowLeft aria-hidden="true" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="bg-background/70 backdrop-blur-sm"
            >
              <Link href={slide.secondary.href}>{slide.secondary.label}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Full-bleed editorial hero carousel; copy sits on the start (right) side over a gradient. */
export function HeroSection() {
  return (
    <HeroCarousel
      label="کالکشن‌های ویژه مُدا"
      slides={slides.map<HeroSlide>((slide, i) => ({
        id: slide.id,
        title: slide.title.join("").trim(),
        content: <HeroSlideContent slide={slide} isFirst={i === 0} />,
      }))}
      aside={
        // The benefits strip right below repeats these on phones, so they start at `sm`.
        <dl className="hidden gap-10 sm:flex">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-2xl font-extrabold tabular-nums">
                {s.value}
              </dd>
              <dd className="text-xs text-muted-foreground" aria-hidden="true">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      }
    />
  );
}
