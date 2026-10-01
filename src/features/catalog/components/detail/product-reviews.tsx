"use client";

import { toast } from "sonner";
import {
  BadgeCheck,
  MessageSquarePlus,
  Star,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

import { RatingStars } from "@/features/catalog/components/rating-stars";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { formatDateFa, toFaDigits } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Product, Review } from "@/features/catalog/types";
import { useState } from "react";

/** Rating breakdown + review list + write-review dialog (UI only). */
interface ProductReviewsProps {
  product: Pick<Product, "title" | "rating" | "reviewCount">;
  reviews: Review[];
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
}

export function ProductReviews({
  product,
  reviews,
  distribution: ratingDistribution,
}: ProductReviewsProps) {
  const [sort, setSort] = useState<"newest" | "helpful">("newest");
  const list = [...reviews].sort((a, b) =>
    sort === "newest"
      ? +new Date(b.createdAt) - +new Date(a.createdAt)
      : b.rating - a.rating,
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
      <div className="space-y-5 lg:sticky lg:top-36 lg:self-start">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-end gap-3">
            <p className="text-display leading-none tabular-nums">
              {toFaDigits(product.rating.toFixed(1))}
            </p>
            <div className="pb-1">
              <RatingStars
                rating={product.rating}
                size="md"
                showValue={false}
              />
              <p className="mt-1 text-xs text-muted-foreground">
                از {toFaDigits(product.reviewCount)} دیدگاه
              </p>
            </div>
          </div>
          <ul className="mt-5 space-y-2" aria-label="توزیع امتیازها">
            {([5, 4, 3, 2, 1] as const).map((star) => (
              <li key={star} className="flex items-center gap-2 text-xs">
                <span className="flex w-8 items-center gap-0.5 tabular-nums">
                  {toFaDigits(star)}{" "}
                  <Star
                    className="h-3 w-3 fill-rating text-rating"
                    aria-hidden="true"
                  />
                </span>
                <Progress
                  value={ratingDistribution[star]}
                  className="h-2 flex-1 bg-muted [&>div]:bg-rating"
                  aria-label={`${toFaDigits(star)} ستاره`}
                />
                <span className="w-9 text-end text-muted-foreground tabular-nums">
                  {toFaDigits(ratingDistribution[star])}٪
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-sm font-bold">
            شما هم درباره این کالا دیدگاه ثبت کنید
          </p>
          <p className="mt-1 text-xs leading-6 text-muted-foreground">
            دیدگاه شما پس از بررسی نمایش داده می‌شود.
          </p>
          <WriteReviewDialog productTitle={product.title} />
        </div>
      </div>

      <div>
        <div
          className="mb-4 flex items-center gap-1 border-b border-border pb-3"
          role="group"
          aria-label="مرتب‌سازی دیدگاه‌ها"
        >
          <span className="me-2 text-sm font-bold">مرتب‌سازی:</span>
          {(["newest", "helpful"] as const).map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={sort === k}
              onClick={() => setSort(k)}
              className={cn(
                "rounded-md px-2.5 py-1 text-sm",
                sort === k
                  ? "bg-accent font-bold text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {k === "newest" ? "جدیدترین" : "مفیدترین"}
            </button>
          ))}
        </div>
        <ul className="divide-y divide-border">
          {list.map((r) => (
            <li key={r.id}>
              <article className="py-5">
                <header className="mb-2 flex flex-wrap items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-muted text-xs font-bold">
                      {r.author.slice(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-bold">{r.author}</p>
                    <p className="text-xs text-muted-foreground">
                      <time dateTime={r.createdAt}>
                        {formatDateFa(r.createdAt)}
                      </time>
                    </p>
                  </div>
                  {r.verifiedPurchase && (
                    <span className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-medium text-success">
                      <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />{" "}
                      خریدار
                    </span>
                  )}
                  <RatingStars
                    rating={r.rating}
                    showValue={false}
                    className="ms-auto"
                  />
                </header>
                <h3 className="text-sm font-bold">{r.title}</h3>
                <p className="mt-1.5 text-sm leading-7 text-muted-foreground">
                  {r.body}
                </p>
                <HelpfulButtons />
              </article>
            </li>
          ))}
        </ul>
        <Button
          variant="outline"
          className="mt-2 w-full"
          onClick={() => toast.info("همه دیدگاه‌ها نمایش داده شده است")}
        >
          مشاهده دیدگاه‌های بیشتر
        </Button>
      </div>
    </div>
  );
}

function HelpfulButtons() {
  const [vote, setVote] = useState<"up" | "down" | null>(null);
  return (
    <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
      آیا این دیدگاه مفید بود؟
      <button
        type="button"
        aria-pressed={vote === "up"}
        onClick={() => setVote(vote === "up" ? null : "up")}
        className={cn(
          "flex items-center gap-1 rounded-md px-2 py-1 hover:bg-muted",
          vote === "up" && "text-success",
        )}
      >
        <ThumbsUp className="h-3.5 w-3.5" aria-hidden="true" /> بله
      </button>
      <button
        type="button"
        aria-pressed={vote === "down"}
        onClick={() => setVote(vote === "down" ? null : "down")}
        className={cn(
          "flex items-center gap-1 rounded-md px-2 py-1 hover:bg-muted",
          vote === "down" && "text-destructive",
        )}
      >
        <ThumbsDown className="h-3.5 w-3.5" aria-hidden="true" /> خیر
      </button>
    </div>
  );
}

function WriteReviewDialog({ productTitle }: { productTitle: string }) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) return setError(true);
    setOpen(false);
    setRating(0);
    toast.success("دیدگاه شما ثبت شد و پس از بررسی نمایش داده می‌شود");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-4 w-full">
          <MessageSquarePlus aria-hidden="true" /> ثبت دیدگاه
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>ثبت دیدگاه</DialogTitle>
          <DialogDescription>{productTitle}</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <fieldset>
            <legend className="mb-2 text-label">امتیاز شما</legend>
            <div className="flex gap-1" role="radiogroup" aria-label="امتیاز">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  role="radio"
                  aria-checked={rating === s}
                  aria-label={`${toFaDigits(s)} ستاره`}
                  onClick={() => {
                    setRating(s);
                    setError(false);
                  }}
                  className="rounded p-0.5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Star
                    className={cn(
                      "h-7 w-7",
                      s <= rating
                        ? "fill-rating text-rating"
                        : "text-muted-foreground/40",
                    )}
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>
            {error && (
              <p role="alert" className="mt-1 text-xs text-destructive">
                لطفاً امتیاز را انتخاب کنید.
              </p>
            )}
          </fieldset>
          <div className="space-y-1.5">
            <Label htmlFor="review-title">عنوان دیدگاه</Label>
            <Input id="review-title" required placeholder="مثلاً کیفیت عالی" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="review-body">متن دیدگاه</Label>
            <Textarea
              id="review-body"
              required
              placeholder="تجربه خود از این کالا را بنویسید…"
            />
          </div>
          <DialogFooter>
            <Button type="submit">ارسال دیدگاه</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
