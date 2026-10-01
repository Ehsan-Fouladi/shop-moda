import { ProductReviews } from "@/features/catalog/components/detail/product-reviews";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toFaDigits } from "@/lib/format";
import type { Product, Review } from "@/features/catalog/types";

/** Description / specifications / reviews tabs below the main product area. */
interface ProductInfoTabsProps {
  product: Product;
  reviews: Review[];
  ratingDistribution: Record<1 | 2 | 3 | 4 | 5, number>;
}

export function ProductInfoTabs({
  product,
  reviews,
  ratingDistribution,
}: ProductInfoTabsProps) {
  const tabClass =
    "relative h-12 rounded-none border-b-2 border-transparent bg-transparent px-4 text-sm font-medium text-muted-foreground shadow-none data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none";

  return (
    <Tabs defaultValue="description" id="reviews" className="scroll-mt-40">
      <TabsList className="no-scrollbar h-auto w-full justify-start gap-2 overflow-x-auto rounded-none border-b border-border bg-transparent p-0">
        <TabsTrigger value="description" className={tabClass}>
          توضیحات
        </TabsTrigger>
        <TabsTrigger value="specs" className={tabClass}>
          مشخصات
        </TabsTrigger>
        <TabsTrigger value="reviews" className={tabClass}>
          دیدگاه‌ها{" "}
          <span className="ms-1 rounded-full bg-muted px-1.5 text-[11px] tabular-nums">
            {toFaDigits(product.reviewCount)}
          </span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="pt-6">
        <h2 className="mb-3 text-h3 font-bold">معرفی محصول</h2>
        <p className="max-w-3xl text-body leading-8 text-foreground/85">
          {product.description}
        </p>
        <div className="mt-6 grid max-w-3xl gap-3 sm:grid-cols-3">
          {[
            ["شست‌وشو", "شست‌وشو با آب سرد و دست؛ از سفیدکننده استفاده نکنید."],
            [
              "نگهداری",
              "دور از نور مستقیم خورشید و روی چوب‌لباسی نگهداری شود.",
            ],
            ["اتو", "اتو با حرارت ملایم و از پشت پارچه."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-lg bg-muted/60 p-4">
              <h3 className="text-sm font-bold">{t}</h3>
              <p className="mt-1 text-xs leading-6 text-muted-foreground">
                {d}
              </p>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="specs" className="pt-6">
        <h2 className="mb-3 text-h3 font-bold">مشخصات فنی</h2>
        <dl className="max-w-3xl divide-y divide-border overflow-hidden rounded-xl border border-border">
          {[{ label: "برند", value: product.brand }, ...product.specs].map(
            (s) => (
              <div
                key={s.label}
                className="grid grid-cols-[140px_1fr] sm:grid-cols-[200px_1fr]"
              >
                <dt className="bg-muted/60 p-3.5 text-sm text-muted-foreground">
                  {s.label}
                </dt>
                <dd className="p-3.5 text-sm font-medium">{s.value}</dd>
              </div>
            ),
          )}
          {product.sizes && (
            <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[200px_1fr]">
              <dt className="bg-muted/60 p-3.5 text-sm text-muted-foreground">
                سایزهای موجود
              </dt>
              <dd className="p-3.5 text-sm font-medium tabular-nums">
                {product.sizes.map(toFaDigits).join("، ")}
              </dd>
            </div>
          )}
        </dl>
      </TabsContent>

      <TabsContent value="reviews" className="pt-6">
        <h2 className="mb-4 text-h3 font-bold">امتیاز و دیدگاه کاربران</h2>
        <ProductReviews
          product={product}
          reviews={reviews}
          distribution={ratingDistribution}
        />
      </TabsContent>
    </Tabs>
  );
}
