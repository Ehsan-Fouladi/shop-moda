import { Headphones, RotateCcw, ShieldCheck, Truck } from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "ارسال رایگان",
    text: "برای سفارش‌های بالای ۵۰۰ هزار تومان",
  },
  {
    icon: RotateCcw,
    title: "۷ روز ضمانت بازگشت",
    text: "تعویض یا مرجوعی بدون دردسر",
  },
  {
    icon: ShieldCheck,
    title: "ضمانت اصالت کالا",
    text: "مستقیم از برندها و نمایندگی‌ها",
  },
  {
    icon: Headphones,
    title: "پشتیبانی ۷ روز هفته",
    text: "از ۹ صبح تا ۱۰ شب پاسخگو هستیم",
  },
];

export function BenefitsStrip({ className }: { className?: string }) {
  return (
    <section aria-label="مزایای خرید از مُدا" className={className}>
      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {benefits.map(({ icon: Icon, title, text }) => (
          <li
            key={title}
            className="flex flex-col items-start gap-2.5 rounded-xl border border-border bg-card p-3 sm:flex-row sm:items-center sm:gap-3 sm:p-4"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent text-primary">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-bold">{title}</span>
              <span className="block text-xs leading-5 text-muted-foreground">
                {text}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
