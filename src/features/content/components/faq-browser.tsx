"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SearchX, Search } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { FaqCategory, FaqItem } from "@/features/content/types";
import { toFaDigits } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useState } from "react";

/** Searchable, category-filtered FAQ. Category is kept in the URL (?category=). */
interface FaqBrowserProps {
  faqs: FaqItem[];
  categories: FaqCategory[];
  /** Category from the URL (`?category=`), resolved by the page on the server; "all" when absent */
  activeCategory: string;
}

export function FaqBrowser({
  faqs,
  categories: faqCategories,
  activeCategory: active,
}: FaqBrowserProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  const setCategory = (id: string) => {
    router.replace(
      id === "all"
        ? pathname
        : `${pathname}?category=${encodeURIComponent(id)}`,
      { scroll: false },
    );
  };

  const q = query.trim();
  const list = faqs.filter(
    (f) =>
      (active === "all" || f.category === active) &&
      (!q || f.question.includes(q) || f.answer.includes(q)),
  );
  const tabs = [{ id: "all", name: "همه" }, ...faqCategories];

  return (
    <div>
      <div className="relative mx-auto max-w-xl">
        <label htmlFor="faq-search" className="sr-only">
          جستجو در سؤالات
        </label>
        <Search
          className="pointer-events-none absolute inset-s-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          id="faq-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="سؤال خود را جستجو کنید… مثلاً «ارسال»"
          className="h-12 ps-10 text-base"
        />
      </div>

      <div
        role="tablist"
        aria-label="دسته‌بندی سؤالات"
        className="no-scrollbar -mx-4 mt-6 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
      >
        {tabs.map((t) => {
          const count =
            t.id === "all"
              ? faqs.length
              : faqs.filter((f) => f.category === t.id).length;
          const selected = active === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={selected}
              onClick={() => setCategory(t.id)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm transition-colors",
                selected
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:border-foreground/30",
              )}
            >
              {t.name}{" "}
              <span className="tabular-nums opacity-70">
                ({toFaDigits(count)})
              </span>
            </button>
          );
        })}
      </div>

      <div
        className="mx-auto mt-8 max-w-3xl"
        role="tabpanel"
        aria-live="polite"
      >
        {list.length ? (
          <Accordion type="single" collapsible className="space-y-3">
            {list.map((f) => (
              <AccordionItem
                key={f.id}
                value={f.id}
                className="rounded-xl border border-border bg-card px-5 data-[state=open]:border-primary/40"
              >
                <AccordionTrigger className="py-4 text-sm font-bold hover:no-underline sm:text-base">
                  {f.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-8 text-muted-foreground">
                  {f.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <EmptyState
            icon={SearchX}
            title="سؤالی پیدا نشد"
            description="عبارت دیگری را امتحان کنید یا سؤال خود را مستقیماً از پشتیبانی بپرسید."
          >
            <Button
              variant="outline"
              onClick={() => {
                setQuery("");
                setCategory("all");
              }}
            >
              نمایش همه سؤالات
            </Button>
            <Button asChild>
              <Link href="/contact">تماس با پشتیبانی</Link>
            </Button>
          </EmptyState>
        )}
      </div>
    </div>
  );
}
