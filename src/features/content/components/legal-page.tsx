import Link from "next/link";
import { CalendarDays, FileText, MessageCircle } from "lucide-react";

import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { Button } from "@/components/ui/button";
import { legalDocuments } from "@/features/content/data/legal";
import { formatDateFa, toFaDigits } from "@/lib/format";
import { cn } from "@/lib/utils";

const siblings = [
  { slug: "terms", href: "/terms" },
  { slug: "privacy-policy", href: "/privacy-policy" },
  { slug: "return-policy", href: "/return-policy" },
  { slug: "shipping-policy", href: "/shipping-policy" },
];

/** Shared long-form policy layout: sticky table of contents + readable article column. */
export function LegalPage({ slug }: { slug: string }) {
  const doc = legalDocuments[slug];
  return (
    <div className="container pb-section">
      <PageBreadcrumb items={[{ label: doc.title }]} />
      <header className="mb-8 rounded-2xl border border-border bg-linear-to-l from-accent/60 to-card p-6 sm:p-8">
        <FileText className="h-8 w-8 text-primary" aria-hidden="true" />
        <h1 className="mt-3 text-h1">{doc.title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
          {doc.description}
        </p>
        <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays className="h-4 w-4" aria-hidden="true" /> آخرین
          به‌روزرسانی:{" "}
          <time dateTime={doc.updatedAt}>{formatDateFa(doc.updatedAt)}</time>
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="lg:sticky lg:top-36 lg:self-start">
          <nav
            aria-label="فهرست مطالب"
            className="rounded-xl border border-border bg-card p-4"
          >
            <p className="mb-3 text-sm font-bold">فهرست مطالب</p>
            <ol className="space-y-1 text-sm">
              {doc.sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="flex gap-2 rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <span className="tabular-nums text-primary">
                      {toFaDigits(i + 1)}.
                    </span>{" "}
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <nav
            aria-label="سایر قوانین"
            className="mt-4 hidden rounded-xl border border-border bg-card p-4 lg:block"
          >
            <p className="mb-3 text-sm font-bold">سایر صفحات</p>
            <ul className="space-y-1 text-sm">
              {siblings.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={s.href}
                    aria-current={s.slug === slug ? "page" : undefined}
                    className={cn(
                      "block rounded-md px-2 py-1.5 hover:bg-muted",
                      s.slug === slug
                        ? "font-bold text-primary"
                        : "text-muted-foreground",
                    )}
                  >
                    {legalDocuments[s.slug]?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <article className="max-w-3xl">
          {doc.sections.map((s, i) => (
            <section
              key={s.id}
              id={s.id}
              className="scroll-mt-36 border-b border-border py-6 first:pt-0 last:border-0"
            >
              <h2 className="text-h3 font-bold">
                <span className="text-primary tabular-nums">
                  {toFaDigits(i + 1)}.{" "}
                </span>
                {s.title}
              </h2>
              {s.paragraphs.map((p, j) => (
                <p
                  key={j}
                  className="mt-3 text-body leading-8 text-foreground/85"
                >
                  {p}
                </p>
              ))}
              {s.list && (
                <ul className="mt-3 list-disc space-y-2 ps-6 text-body leading-7 text-foreground/85 marker:text-primary">
                  {s.list.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <div className="mt-6 flex flex-col items-start gap-4 rounded-xl bg-muted/60 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-sm">
              <MessageCircle
                className="h-5 w-5 text-primary"
                aria-hidden="true"
              />{" "}
              سؤالی درباره این صفحه دارید؟
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/faq">سؤالات متداول</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/contact">تماس با پشتیبانی</Link>
              </Button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

export function legalMetadata(slug: string) {
  const doc = legalDocuments[slug];
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: `/${slug}` },
  };
}
