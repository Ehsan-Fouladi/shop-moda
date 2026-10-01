import type { Metadata } from "next";

import { Logo } from "@/components/layout/logo";
import { NotFoundContent } from "@/components/layout/not-found-content";

export const metadata: Metadata = {
  title: "صفحه پیدا نشد",
  description: "صفحه‌ای که به دنبال آن هستید وجود ندارد یا جابه‌جا شده است.",
  robots: { index: false },
};

/** Fallback for unmatched URLs (rendered outside the storefront shell). */
export default function NotFound() {
  return (
    <main
      id="main-content"
      className="container flex min-h-dvh flex-col items-center justify-center py-10"
    >
      <Logo />
      <NotFoundContent />
    </main>
  );
}
