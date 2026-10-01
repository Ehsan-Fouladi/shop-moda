"use client";

import { toast } from "sonner";
import { AlertCircle, Heart, PackageSearch, ShoppingCart } from "lucide-react";

import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { EmptyState } from "@/components/shared/empty-state";
import { PriceDisplay } from "@/features/catalog/components/price-display";
import {
  ProductBadgeTag,
  StockStatusBadge,
} from "@/features/catalog/components/product-badges";
import { ProductCardSkeleton } from "@/features/catalog/components/product-skeletons";
import { QuantitySelector } from "@/components/shared/quantity-selector";
import { RatingStars } from "@/features/catalog/components/rating-stars";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="mb-4 text-h3">{title}</h3>
      {children}
    </div>
  );
}

/** `productGridSample` is a server-rendered ProductGrid, so no catalog data ships in this client bundle. */
export function ComponentShowcase({
  productGridSample,
}: {
  productGridSample: React.ReactNode;
}) {
  const [qty, setQty] = useState(1);

  return (
    <section aria-labelledby="components" className="space-y-6">
      <h2 id="components" className="text-h2">
        کامپوننت‌ها
      </h2>

      <div className="grid gap-6 lg:grid-cols-2">
        <Block title="دکمه‌ها و حالت‌ها">
          <div className="flex flex-wrap gap-3">
            <Button>اصلی</Button>
            <Button variant="contrast">کنتراست</Button>
            <Button variant="outline">حاشیه‌دار</Button>
            <Button variant="secondary">ثانویه</Button>
            <Button variant="ghost">شبح</Button>
            <Button variant="link">پیوند</Button>
            <Button variant="destructive">حذف</Button>
            <Button loading>در حال ارسال</Button>
            <Button disabled>غیرفعال</Button>
            <Button size="sm">
              <ShoppingCart aria-hidden="true" /> کوچک
            </Button>
            <Button size="lg">بزرگ</Button>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="outline" aria-label="علاقه‌مندی">
                  <Heart aria-hidden="true" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>افزودن به علاقه‌مندی‌ها</TooltipContent>
            </Tooltip>
          </div>
        </Block>

        <Block title="فرم‌ها">
          <form
            className="grid gap-4 sm:grid-cols-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="space-y-1.5">
              <Label htmlFor="ds-name">نام</Label>
              <Input id="ds-name" placeholder="مثلاً سارا" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ds-email">ایمیل (خطا)</Label>
              <Input
                id="ds-email"
                dir="ltr"
                defaultValue="sara@"
                aria-invalid="true"
                aria-describedby="ds-email-err"
              />
              <p id="ds-email-err" className="text-caption text-destructive">
                ایمیل معتبر نیست.
              </p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ds-city">شهر</Label>
              <Select>
                <SelectTrigger id="ds-city">
                  <SelectValue placeholder="انتخاب کنید" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tehran">تهران</SelectItem>
                  <SelectItem value="isfahan">اصفهان</SelectItem>
                  <SelectItem value="shiraz">شیراز</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ds-disabled">غیرفعال</Label>
              <Input id="ds-disabled" disabled placeholder="قابل ویرایش نیست" />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="ds-terms" defaultChecked />
              <Label htmlFor="ds-terms">قوانین را می‌پذیرم</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="ds-notify" defaultChecked />
              <Label htmlFor="ds-notify">اعلان‌های سفارش</Label>
            </div>
            <fieldset className="sm:col-span-2">
              <legend className="mb-2 text-label">روش ارسال</legend>
              <RadioGroup defaultValue="standard" className="flex gap-6">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="standard" id="ds-std" />
                  <Label htmlFor="ds-std">عادی</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="express" id="ds-exp" />
                  <Label htmlFor="ds-exp">اکسپرس</Label>
                </div>
              </RadioGroup>
            </fieldset>
          </form>
        </Block>

        <Block title="قیمت، امتیاز، نشان‌ها، تعداد">
          <div className="space-y-4">
            <PriceDisplay price={2480000} oldPrice={3100000} size="lg" />
            <RatingStars rating={4.6} reviewCount={128} size="md" />
            <div className="flex flex-wrap gap-2">
              <ProductBadgeTag badge="new" />
              <ProductBadgeTag badge="sale" />
              <ProductBadgeTag badge="bestseller" />
              <ProductBadgeTag badge="limited" />
              <StockStatusBadge status="low-stock" />
              <StockStatusBadge status="out-of-stock" />
            </div>
            <QuantitySelector
              value={qty}
              onChange={setQty}
              onRemove={() => setQty(1)}
            />
          </div>
        </Block>

        <Block title="تب، آکاردئون، اعلان، دیالوگ">
          <Tabs defaultValue="desc">
            <TabsList>
              <TabsTrigger value="desc">توضیحات</TabsTrigger>
              <TabsTrigger value="specs">مشخصات</TabsTrigger>
              <TabsTrigger value="reviews">نظرات</TabsTrigger>
            </TabsList>
            <TabsContent
              value="desc"
              className="text-body text-muted-foreground"
            >
              توضیحات محصول در این بخش.
            </TabsContent>
            <TabsContent
              value="specs"
              className="text-body text-muted-foreground"
            >
              جدول مشخصات فنی.
            </TabsContent>
            <TabsContent
              value="reviews"
              className="text-body text-muted-foreground"
            >
              نظرات کاربران.
            </TabsContent>
          </Tabs>
          <Accordion type="single" collapsible className="mt-3">
            <AccordionItem value="a">
              <AccordionTrigger>زمان ارسال سفارش چقدر است؟</AccordionTrigger>
              <AccordionContent>
                سفارش‌ها ظرف ۱ تا ۳ روز کاری ارسال می‌شوند.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Alert className="mt-4">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            <AlertTitle>توجه</AlertTitle>
            <AlertDescription>این یک پیام اطلاع‌رسانی است.</AlertDescription>
          </Alert>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => toast.success("با موفقیت ذخیره شد")}
            >
              نمایش توست
            </Button>
            <ConfirmDialog
              trigger={<Button variant="outline">دیالوگ تأیید</Button>}
              title="حذف آدرس"
              description="آیا از حذف این آدرس مطمئن هستید؟ این عمل قابل بازگشت نیست."
              confirmLabel="حذف"
              destructive
              onConfirm={() => toast.info("آدرس حذف شد")}
            />
          </div>
        </Block>
      </div>

      <Block title="کارت محصول و اسکلتون">
        {productGridSample}
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          <ProductCardSkeleton />
        </div>
      </Block>

      <EmptyState
        icon={PackageSearch}
        title="نتیجه‌ای یافت نشد"
        description="فیلترها را تغییر دهید یا عبارت دیگری جستجو کنید."
      >
        <Button variant="outline">حذف فیلترها</Button>
      </EmptyState>
    </section>
  );
}
