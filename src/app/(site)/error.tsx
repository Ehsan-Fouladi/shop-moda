"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

/** Segment error boundary: friendly message + retry. */
export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="container flex flex-col items-center gap-5 py-20 text-center"
      role="alert"
    >
      <span className="grid h-24 w-24 place-items-center rounded-full bg-destructive/10 text-destructive">
        <AlertTriangle className="h-11 w-11" aria-hidden="true" />
      </span>
      <h1 className="text-h2">مشکلی پیش آمد</h1>
      <p className="max-w-md text-body leading-8 text-muted-foreground">
        در نمایش این صفحه خطایی رخ داد. لطفاً دوباره تلاش کنید؛ اگر مشکل ادامه
        داشت با پشتیبانی تماس بگیرید.
      </p>
      {error.digest && (
        <p className="text-xs text-muted-foreground">
          کد خطا:{" "}
          <span dir="ltr" className="font-mono">
            {error.digest}
          </span>
        </p>
      )}
      <div className="flex flex-wrap justify-center gap-3">
        <Button size="lg" onClick={reset}>
          <RotateCcw aria-hidden="true" /> تلاش دوباره
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/">صفحه اصلی</Link>
        </Button>
        <Button size="lg" variant="ghost" asChild>
          <Link href="/contact">تماس با پشتیبانی</Link>
        </Button>
      </div>
    </div>
  );
}
