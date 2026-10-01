import Image from "next/image";
import Link from "next/link";
import { ArrowRight, RotateCcw, ShieldCheck, Truck } from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";

/** Split auth shell: form column (start) + editorial image panel (end, desktop only). */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <div className="flex flex-col">
        <header className="flex items-center justify-between p-4 sm:p-6">
          <Logo />
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Link
              href="/"
              className="inline-flex h-10 items-center gap-1.5 rounded-md px-3 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" /> بازگشت به
              فروشگاه
            </Link>
          </div>
        </header>
        <main
          id="main-content"
          tabIndex={-1}
          className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6"
        >
          <div className="w-full max-w-md">{children}</div>
        </main>
        <footer className="p-6 text-center text-xs text-muted-foreground">
          ورود شما به معنای پذیرش{" "}
          <Link
            href="/terms"
            className="underline-offset-4 hover:text-foreground hover:underline"
          >
            قوانین
          </Link>{" "}
          و{" "}
          <Link
            href="/privacy-policy"
            className="underline-offset-4 hover:text-foreground hover:underline"
          >
            حریم خصوصی
          </Link>{" "}
          مُداست.
        </footer>
      </div>

      <aside
        className="relative hidden overflow-hidden lg:block"
        aria-hidden="true"
      >
        {/* Lazy: the panel is display:none below lg, so phones never download it; on desktop it is in view and loads right away. */}
        <Image
          src="/images/editorial/hero-autumn.jpg"
          alt="hero-autumn"
          draggable="false"
          fill
          sizes="50vw"
          className="object-cover object-left"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-10 text-white xl:p-14">
          <p className="text-label opacity-80">کالکشن پاییز ۱۴۰۵</p>
          <p className="mt-2 max-w-md text-3xl font-extrabold leading-normal">
            استایل خودت را پیدا کن، ما بقیه‌اش را انجام می‌دهیم.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm opacity-90">
            <li className="flex items-center gap-1.5">
              <Truck className="h-4 w-4" /> ارسال سریع
            </li>
            <li className="flex items-center gap-1.5">
              <RotateCcw className="h-4 w-4" /> ۷ روز بازگشت
            </li>
            <li className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" /> ضمانت اصالت
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
