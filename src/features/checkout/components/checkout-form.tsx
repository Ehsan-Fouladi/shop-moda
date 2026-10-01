"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Banknote,
  CreditCard,
  Lock,
  MapPin,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  Controller,
  useForm,
  type FieldErrors as RhfFieldErrors,
  type Resolver,
} from "react-hook-form";

import { CouponForm } from "@/features/cart/components/coupon-form";
import {
  OrderSummaryRows,
  summaryFromTotals,
} from "@/features/cart/components/order-summary-rows";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import {
  CheckboxField,
  FormField,
  fieldAria,
} from "@/components/shared/form-field";
import type { Address, UserProfile } from "@/features/account/types";
import { formatAddress } from "@/features/account/lib/address-book";
import { saveLastOrder } from "@/features/checkout/lib/last-order";
import { buildOrderSnapshot } from "@/features/checkout/lib/order-snapshot";
import {
  isPaymentOption,
  paymentOptionMeta,
} from "@/features/checkout/lib/payment-options";
import {
  createCheckoutSchema,
  paymentOptions,
  type PaymentOption,
} from "@/features/checkout/schemas/checkout-schema";
import { parseForm } from "@/lib/form-schema";
import { iranProvinces } from "@/constants/iran-provinces";
import { formatPrice, toFaDigits } from "@/lib/format";
import {
  SHIPPING_METHODS,
  isShippingMethod,
  qualifiesForFreeShipping,
  shippingMethods,
  type ShippingMethod,
} from "@/features/cart/lib/pricing";
import { cartLineKey } from "@/features/cart/lib/cart-lines";
import { cn } from "@/lib/utils";
import { useCart, useCartTotals } from "@/features/cart/store/cart-store";
import { useState } from "react";

const paymentIcons: Record<PaymentOption, LucideIcon> = {
  card: CreditCard,
  cod: Banknote,
  installment: Wallet,
};

/** Every control the checkout form registers, including the UI-only fields (country, card extras). */
type CheckoutFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  /** Chosen saved address id, or "new" for the inline new-address form. */
  addressId: string;
  country: string;
  province: string;
  city: string;
  postalCode: string;
  address: string;
  receiverPhone: string;
  shipping: ShippingMethod;
  payment: PaymentOption;
  cardNumber: string;
  exp: string;
  cvv: string;
  terms: boolean;
};

/**
 * Bridges the existing zod schema + `parseForm` (which returns errors in on-screen order) into a
 * react-hook-form resolver. Address fields are required only for a new address and the card number
 * only for card payment, so the schema is rebuilt from the current values on every validation pass.
 */
const checkoutResolver: Resolver<CheckoutFormValues> = (values) => {
  const schema = createCheckoutSchema({
    newAddress: values.addressId === "new",
    payByCard: values.payment === "card",
  });
  const result = parseForm(schema, values);
  if (result.success) return { values, errors: {} };

  const errors = {} as RhfFieldErrors<CheckoutFormValues>;
  for (const [key, message] of Object.entries(result.errors)) {
    errors[key as keyof CheckoutFormValues] = { type: "validation", message };
  }
  return { values: {}, errors };
};

export function CheckoutForm({
  user: currentUser,
  addresses,
}: {
  user: UserProfile;
  addresses: Address[];
}) {
  const router = useRouter();
  const { items, totalItems, subtotal, coupon, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: checkoutResolver,
    shouldFocusError: false,
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      phone: currentUser.phone,
      addressId: addresses.find((a) => a.isDefault)?.id ?? "new",
      country: "iran",
      province: "",
      city: "",
      postalCode: "",
      address: "",
      receiverPhone: "",
      shipping: "standard",
      payment: "card",
      cardNumber: "",
      exp: "",
      cvv: "",
      terms: false,
    },
  });
  const shipping = watch("shipping");
  const payment = watch("payment");
  const addressId = watch("addressId");
  const totals = useCartTotals(shipping);

  if (items.length === 0 && !submitting) {
    return (
      <EmptyState
        icon={ShoppingBag}
        title="سبد خرید شما خالی است"
        description="برای ادامه فرایند خرید، ابتدا کالایی به سبد خرید اضافه کنید."
        className="py-20"
      >
        <Button size="lg" asChild>
          <Link href="/products">مشاهده محصولات</Link>
        </Button>
      </EmptyState>
    );
  }

  const onSubmit = handleSubmit((values) => {
    console.log(values);
    const newAddress = values.addressId === "new";
    // UI-only: simulate submission, store a snapshot for the success page.
    setSubmitting(true);
    const snapshot = buildOrderSnapshot({
      values: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        // Only a newly entered address is stored; a saved one is resolved from `addressId`.
        province: newAddress ? values.province : undefined,
        city: newAddress ? values.city : undefined,
        address: newAddress ? values.address : undefined,
      },
      addressId: values.addressId,
      addresses,
      items,
      shippingMethod: values.shipping,
      payment: values.payment,
      totals,
    });
    setTimeout(() => {
      saveLastOrder(snapshot);
      clearCart();
      router.push("/checkout/success");
    }, 1200);
  });

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px]"
    >
      <div className="space-y-5">
        {/* 1. Customer */}
        <Section
          step={1}
          title="اطلاعات خریدار"
          aside={
            <Link
              href="/login"
              className="text-xs text-primary hover:underline"
            >
              حساب دیگری دارید؟ ورود
            </Link>
          }
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              id="co-firstName"
              label="نام"
              error={errors.firstName?.message}
            >
              <Input
                {...register("firstName")}
                autoComplete="given-name"
                {...fieldAria("co-firstName", errors.firstName?.message)}
              />
            </FormField>
            <FormField
              id="co-lastName"
              label="نام خانوادگی"
              error={errors.lastName?.message}
            >
              <Input
                {...register("lastName")}
                autoComplete="family-name"
                {...fieldAria("co-lastName", errors.lastName?.message)}
              />
            </FormField>
            <FormField
              id="co-email"
              label="ایمیل"
              error={errors.email?.message}
            >
              <Input
                {...register("email")}
                type="email"
                dir="ltr"
                autoComplete="email"
                className="text-start"
                {...fieldAria("co-email", errors.email?.message)}
              />
            </FormField>
            <FormField
              id="co-phone"
              label="شماره موبایل"
              error={errors.phone?.message}
            >
              <Input
                {...register("phone")}
                type="tel"
                dir="ltr"
                autoComplete="tel"
                className="text-start"
                {...fieldAria("co-phone", errors.phone?.message)}
              />
            </FormField>
          </div>
        </Section>

        {/* 2. Address */}
        <Section step={2} title="آدرس تحویل">
          <Controller
            control={control}
            name="addressId"
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                name={field.name}
                className="grid gap-3"
                aria-label="انتخاب آدرس"
              >
                {addresses.map((a) => (
                  <OptionCard
                    key={a.id}
                    id={`addr-${a.id}`}
                    value={a.id}
                    selected={field.value === a.id}
                  >
                    <MapPin
                      className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2 text-sm font-bold">
                        {a.title}
                        {a.isDefault && (
                          <span className="rounded bg-accent px-1.5 py-0.5 text-[10px] text-accent-foreground">
                            پیش‌فرض
                          </span>
                        )}
                      </span>
                      <span className="mt-1 block text-xs leading-6 text-muted-foreground">
                        {formatAddress(a)}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        گیرنده: {a.receiver} • {a.phone}
                      </span>
                    </span>
                  </OptionCard>
                ))}
                <OptionCard
                  id="addr-new"
                  value="new"
                  selected={field.value === "new"}
                >
                  <Plus
                    className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-bold text-primary">
                    ارسال به آدرس جدید
                  </span>
                </OptionCard>
              </RadioGroup>
            )}
          />

          {addressId === "new" && (
            <fieldset className="mt-5 grid gap-4 rounded-xl border border-dashed border-border p-4 sm:grid-cols-2">
              <legend className="px-2 text-sm font-bold">آدرس جدید</legend>
              <FormField id="co-country" label="کشور">
                <Controller
                  control={control}
                  name="country"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger {...fieldAria("co-country")}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="iran">ایران</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormField>
              <FormField
                id="co-province"
                label="استان"
                error={errors.province?.message}
              >
                <Controller
                  control={control}
                  name="province"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        {...fieldAria("co-province", errors.province?.message)}
                      >
                        <SelectValue placeholder="انتخاب استان" />
                      </SelectTrigger>
                      <SelectContent>
                        {iranProvinces.map((p) => (
                          <SelectItem key={p} value={p}>
                            {p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormField>
              <FormField id="co-city" label="شهر" error={errors.city?.message}>
                <Input
                  {...register("city")}
                  autoComplete="address-level2"
                  {...fieldAria("co-city", errors.city?.message)}
                />
              </FormField>
              <FormField
                id="co-postalCode"
                label="کد پستی"
                error={errors.postalCode?.message}
              >
                <Input
                  {...register("postalCode")}
                  inputMode="numeric"
                  dir="ltr"
                  className="text-start"
                  autoComplete="postal-code"
                  placeholder="۱۰ رقم بدون خط تیره"
                  {...fieldAria("co-postalCode", errors.postalCode?.message)}
                />
              </FormField>
              <FormField
                id="co-address"
                label="آدرس کامل"
                error={errors.address?.message}
                className="sm:col-span-2"
              >
                <Textarea
                  {...register("address")}
                  rows={3}
                  className="min-h-[88px]"
                  placeholder="خیابان، کوچه، پلاک، واحد"
                  autoComplete="street-address"
                  {...fieldAria("co-address", errors.address?.message)}
                />
              </FormField>
              <FormField
                id="co-receiverPhone"
                label="شماره تماس گیرنده (اختیاری)"
              >
                <Input
                  {...register("receiverPhone")}
                  {...fieldAria("co-receiverPhone")}
                  type="tel"
                  dir="ltr"
                  className="text-start"
                />
              </FormField>
            </fieldset>
          )}
        </Section>

        {/* 3. Shipping */}
        <Section step={3} title="روش ارسال">
          <Controller
            control={control}
            name="shipping"
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={(v) => isShippingMethod(v) && field.onChange(v)}
                name={field.name}
                className="grid gap-3 sm:grid-cols-2"
                aria-label="روش ارسال"
              >
                {SHIPPING_METHODS.map((key) => {
                  const m = shippingMethods[key];
                  const free =
                    key === "standard" &&
                    qualifiesForFreeShipping(subtotal, coupon);
                  const Icon = key === "express" ? Zap : Truck;
                  return (
                    <OptionCard
                      key={key}
                      id={`ship-${key}`}
                      value={key}
                      selected={field.value === key}
                    >
                      <Icon
                        className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span className="flex-1">
                        <span className="block text-sm font-bold">
                          {m.label}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          {m.eta}
                        </span>
                      </span>
                      <span
                        className={cn(
                          "text-sm font-bold tabular-nums",
                          free && "text-success",
                        )}
                      >
                        {free ? "رایگان" : formatPrice(m.price)}
                      </span>
                    </OptionCard>
                  );
                })}
              </RadioGroup>
            )}
          />
        </Section>

        {/* 4. Payment */}
        <Section step={4} title="روش پرداخت">
          <Controller
            control={control}
            name="payment"
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={(v) => isPaymentOption(v) && field.onChange(v)}
                name={field.name}
                className="grid gap-3"
                aria-label="روش پرداخت"
              >
                {paymentOptions.map((key) => {
                  const Icon = paymentIcons[key];
                  return (
                    <OptionCard
                      key={key}
                      id={`pay-${key}`}
                      value={key}
                      selected={field.value === key}
                    >
                      <Icon
                        className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span className="flex-1">
                        <span className="block text-sm font-bold">
                          {paymentOptionMeta[key].title}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          {paymentOptionMeta[key].description}
                        </span>
                      </span>
                    </OptionCard>
                  );
                })}
              </RadioGroup>
            )}
          />
          {/* Below the options, so switching method never shifts the option being clicked */}
          {payment === "card" && (
            <div className="mt-3 grid gap-4 rounded-xl bg-muted/50 p-4 sm:grid-cols-4">
              <FormField
                id="co-cardNumber"
                label="شماره کارت"
                error={errors.cardNumber?.message}
                className="sm:col-span-2"
              >
                <Input
                  {...register("cardNumber")}
                  inputMode="numeric"
                  dir="ltr"
                  placeholder="0000 0000 0000 0000"
                  autoComplete="cc-number"
                  className="text-start tracking-widest"
                  {...fieldAria("co-cardNumber", errors.cardNumber?.message)}
                />
              </FormField>
              <FormField id="co-exp" label="تاریخ انقضا">
                <Input
                  {...register("exp")}
                  {...fieldAria("co-exp")}
                  dir="ltr"
                  placeholder="MM/YY"
                  autoComplete="cc-exp"
                  className="text-start"
                />
              </FormField>
              <FormField id="co-cvv" label="CVV2">
                <Input
                  {...register("cvv")}
                  {...fieldAria("co-cvv")}
                  dir="ltr"
                  inputMode="numeric"
                  placeholder="•••"
                  autoComplete="cc-csc"
                  className="text-start"
                />
              </FormField>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground sm:col-span-4">
                <Lock className="h-3.5 w-3.5" aria-hidden="true" /> این فرم
                نمایشی است؛ هیچ اطلاعات کارتی ارسال یا ذخیره نمی‌شود.
              </p>
            </div>
          )}
        </Section>
      </div>

      {/* Order summary */}
      <aside
        aria-label="خلاصه سفارش"
        className="lg:sticky lg:top-36 lg:self-start"
      >
        <div className="space-y-5 rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold">خلاصه سفارش</h2>
            <Link href="/cart" className="text-xs text-primary hover:underline">
              ویرایش سبد
            </Link>
          </div>
          <ul
            className="max-h-64 space-y-3 overflow-y-auto pe-1"
            aria-label={`${toFaDigits(totalItems)} کالا`}
          >
            {items.map((i) => (
              <li key={cartLineKey(i)} className="flex items-center gap-3">
                <span
                  className="product-surface relative h-16 shrink-0 overflow-hidden rounded-md border border-border/60"
                  style={{ width: 52 }}
                >
                  <Image
                    src={i.product.images[0]}
                    alt="order-image"
                    draggable="false"
                    fill
                    sizes="52px"
                    className="object-cover"
                  />
                  <span className="absolute top-0 inset-e-0 grid h-5 min-w-5 place-items-center rounded-es-md bg-foreground px-1 text-[10px] font-bold text-background tabular-nums">
                    {toFaDigits(i.quantity)}
                  </span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="line-clamp-1 text-xs font-medium">
                    {i.product.title}
                  </span>
                  <span className="block text-[11px] text-muted-foreground">
                    {[
                      i.selectedColor,
                      i.selectedSize && `سایز ${toFaDigits(i.selectedSize)}`,
                    ]
                      .filter(Boolean)
                      .join(" • ")}{" "}
                    • تعداد {toFaDigits(i.quantity)}
                  </span>
                </span>
                <span className="text-xs font-bold tabular-nums">
                  {formatPrice(i.product.price * i.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <CouponForm idPrefix="checkout" />
          <OrderSummaryRows values={summaryFromTotals(totals, coupon?.code)} />
          <Controller
            control={control}
            name="terms"
            render={({ field }) => (
              <CheckboxField
                id="co-terms"
                name={field.name}
                error={errors.terms?.message}
                labelClassName="text-xs"
                checked={field.value}
                onCheckedChange={field.onChange}
                label={
                  <>
                    <Link
                      href="/terms"
                      className="text-primary hover:underline"
                    >
                      قوانین و مقررات
                    </Link>{" "}
                    و{" "}
                    <Link
                      href="/privacy-policy"
                      className="text-primary hover:underline"
                    >
                      حریم خصوصی
                    </Link>{" "}
                    مُدا را می‌پذیرم.
                  </>
                }
              />
            )}
          />
          <Button
            type="submit"
            size="lg"
            className="h-auto min-h-12 w-full whitespace-normal py-2 sm:whitespace-nowrap"
            loading={submitting}
          >
            {!submitting && <Lock aria-hidden="true" />}
            {submitting
              ? "در حال ثبت سفارش…"
              : `ثبت سفارش و پرداخت ${formatPrice(totals.total)}`}
          </Button>
          {Object.keys(errors).length > 0 && (
            <p
              role="alert"
              className="rounded-lg bg-destructive/10 p-2.5 text-center text-xs text-destructive"
            >
              لطفاً خطاهای فرم را برطرف کنید.
            </p>
          )}
        </div>
        <div className="mt-4 flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-xs leading-6 text-muted-foreground">
          <ShieldCheck
            className="h-6 w-6 shrink-0 text-success"
            aria-hidden="true"
          />
          پرداخت شما از طریق درگاه رسمی و رمزنگاری‌شده انجام می‌شود. مُدا به
          اطلاعات کارت شما دسترسی ندارد.
        </div>
      </aside>
    </form>
  );
}

function Section({
  step,
  title,
  aside,
  children,
}: {
  step: number;
  title: string;
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section
      className="rounded-xl border border-border bg-card p-5"
      aria-labelledby={`co-step-${step}`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2
          id={`co-step-${step}`}
          className="flex items-center gap-2.5 text-base font-bold"
        >
          <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-xs text-primary-foreground tabular-nums">
            {toFaDigits(step)}
          </span>
          {title}
        </h2>
        {aside}
      </div>
      {children}
    </section>
  );
}

function OptionCard({
  id,
  value,
  selected,
  children,
}: {
  id: string;
  value: string;
  selected: boolean;
  children: React.ReactNode;
}) {
  return (
    <Label
      htmlFor={id}
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-xl border p-4 font-normal transition-colors",
        selected
          ? "border-primary bg-accent/50 ring-1 ring-primary"
          : "border-border hover:border-foreground/30",
      )}
    >
      <RadioGroupItem id={id} value={value} className="mt-0.5" />
      {children}
    </Label>
  );
}

// export function CheckoutForm({ user: currentUser, addresses }: { user: UserProfile; addresses: Address[] }) {
//   const router = useRouter();
//   const { items, totalItems, subtotal, coupon, clearCart } = useCart();
//   const [shipping, setShipping] = React.useState<ShippingMethod>("standard");
//   const [payment, setPayment] = React.useState<PaymentOption>("card");
//   const [addressId, setAddressId] = React.useState<string>(addresses.find((a) => a.isDefault)?.id ?? "new");
//   const [province, setProvince] = React.useState("");
//   const [errors, setErrors] = React.useState<FieldErrors>({});
//   const [submitting, setSubmitting] = React.useState(false);
//   const totals = useCartTotals(shipping);

//   if (items.length === 0 && !submitting) {
//     return (
//       <EmptyState icon={ShoppingBag} title="سبد خرید شما خالی است" description="برای ادامه فرایند خرید، ابتدا کالایی به سبد خرید اضافه کنید." className="py-20">
//         <Button size="lg" asChild><Link href="/products">مشاهده محصولات</Link></Button>
//       </EmptyState>
//     );
//   }

//   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const schema = createCheckoutSchema({ newAddress: addressId === "new", payByCard: payment === "card" });
//     const result = parseForm(schema, { ...formDataToRecord(new FormData(e.currentTarget)), province });
//     setErrors(result.errors);
//     if (!result.success) return focusFirstError(result.errors, "co");

//     // UI-only: simulate submission, store a snapshot for the success page.
//     setSubmitting(true);
//     const snapshot = buildOrderSnapshot({ values: result.data, addressId, addresses, items, shippingMethod: shipping, payment, totals });
//     setTimeout(() => {
//       saveLastOrder(snapshot);
//       clearCart();
//       router.push("/checkout/success");
//     }, 1200);
//   };

//   return (
//     <form onSubmit={onSubmit} noValidate className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px]">
//       <div className="space-y-5">
//         {/* 1. Customer */}
//         <Section step={1} title="اطلاعات خریدار" aside={<Link href="/login" className="text-xs text-primary hover:underline">حساب دیگری دارید؟ ورود</Link>}>
//           <div className="grid gap-4 sm:grid-cols-2">
//             <FormField id="co-firstName" label="نام" error={errors.firstName}>
//               <Input name="firstName" defaultValue={currentUser.firstName} autoComplete="given-name" {...fieldAria("co-firstName", errors.firstName)} />
//             </FormField>
//             <FormField id="co-lastName" label="نام خانوادگی" error={errors.lastName}>
//               <Input name="lastName" defaultValue={currentUser.lastName} autoComplete="family-name" {...fieldAria("co-lastName", errors.lastName)} />
//             </FormField>
//             <FormField id="co-email" label="ایمیل" error={errors.email}>
//               <Input name="email" type="email" dir="ltr" defaultValue={currentUser.email} autoComplete="email" className="text-start" {...fieldAria("co-email", errors.email)} />
//             </FormField>
//             <FormField id="co-phone" label="شماره موبایل" error={errors.phone}>
//               <Input name="phone" type="tel" dir="ltr" defaultValue={currentUser.phone} autoComplete="tel" className="text-start" {...fieldAria("co-phone", errors.phone)} />
//             </FormField>
//           </div>
//         </Section>

//         {/* 2. Address */}
//         <Section step={2} title="آدرس تحویل">
//           <RadioGroup value={addressId} onValueChange={setAddressId} className="grid gap-3" aria-label="انتخاب آدرس">
//             {addresses.map((a) => (
//               <OptionCard key={a.id} id={`addr-${a.id}`} value={a.id} selected={addressId === a.id}>
//                 <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
//                 <span className="min-w-0 flex-1">
//                   <span className="flex items-center gap-2 text-sm font-bold">
//                     {a.title}
//                     {a.isDefault && <span className="rounded bg-accent px-1.5 py-0.5 text-[10px] text-accent-foreground">پیش‌فرض</span>}
//                   </span>
//                   <span className="mt-1 block text-xs leading-6 text-muted-foreground">
//                     {formatAddress(a)}
//                   </span>
//                   <span className="block text-xs text-muted-foreground">گیرنده: {a.receiver} • {a.phone}</span>
//                 </span>
//               </OptionCard>
//             ))}
//             <OptionCard id="addr-new" value="new" selected={addressId === "new"}>
//               <Plus className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
//               <span className="text-sm font-bold text-primary">ارسال به آدرس جدید</span>
//             </OptionCard>
//           </RadioGroup>

//           {addressId === "new" && (
//             <fieldset className="mt-5 grid gap-4 rounded-xl border border-dashed border-border p-4 sm:grid-cols-2">
//               <legend className="px-2 text-sm font-bold">آدرس جدید</legend>
//               <FormField id="co-country" label="کشور">
//                 <Select defaultValue="iran" name="country">
//                   <SelectTrigger {...fieldAria("co-country")}><SelectValue /></SelectTrigger>
//                   <SelectContent><SelectItem value="iran">ایران</SelectItem></SelectContent>
//                 </Select>
//               </FormField>
//               <FormField id="co-province" label="استان" error={errors.province}>
//                 <Select value={province} onValueChange={setProvince}>
//                   <SelectTrigger {...fieldAria("co-province", errors.province)}><SelectValue placeholder="انتخاب استان" /></SelectTrigger>
//                   <SelectContent>
//                     {iranProvinces.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
//                   </SelectContent>
//                 </Select>
//               </FormField>
//               <FormField id="co-city" label="شهر" error={errors.city}>
//                 <Input name="city" autoComplete="address-level2" {...fieldAria("co-city", errors.city)} />
//               </FormField>
//               <FormField id="co-postalCode" label="کد پستی" error={errors.postalCode}>
//                 <Input name="postalCode" inputMode="numeric" dir="ltr" className="text-start" autoComplete="postal-code" placeholder="۱۰ رقم بدون خط تیره" {...fieldAria("co-postalCode", errors.postalCode)} />
//               </FormField>
//               <FormField id="co-address" label="آدرس کامل" error={errors.address} className="sm:col-span-2">
//                 <Textarea name="address" rows={3} className="min-h-[88px]" placeholder="خیابان، کوچه، پلاک، واحد" autoComplete="street-address" {...fieldAria("co-address", errors.address)} />
//               </FormField>
//               <FormField id="co-receiverPhone" label="شماره تماس گیرنده (اختیاری)">
//                 <Input {...fieldAria("co-receiverPhone")} name="receiverPhone" type="tel" dir="ltr" className="text-start" />
//               </FormField>
//             </fieldset>
//           )}
//         </Section>

//         {/* 3. Shipping */}
//         <Section step={3} title="روش ارسال">
//           <RadioGroup value={shipping} onValueChange={(v) => isShippingMethod(v) && setShipping(v)} className="grid gap-3 sm:grid-cols-2" aria-label="روش ارسال">
//             {SHIPPING_METHODS.map((key) => {
//               const m = shippingMethods[key];
//               const free = key === "standard" && qualifiesForFreeShipping(subtotal, coupon);
//               const Icon = key === "express" ? Zap : Truck;
//               return (
//                 <OptionCard key={key} id={`ship-${key}`} value={key} selected={shipping === key}>
//                   <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
//                   <span className="flex-1">
//                     <span className="block text-sm font-bold">{m.label}</span>
//                     <span className="block text-xs text-muted-foreground">{m.eta}</span>
//                   </span>
//                   <span className={cn("text-sm font-bold tabular-nums", free && "text-success")}>
//                     {free ? "رایگان" : formatPrice(m.price)}
//                   </span>
//                 </OptionCard>
//               );
//             })}
//           </RadioGroup>
//         </Section>

//         {/* 4. Payment */}
//         <Section step={4} title="روش پرداخت">
//           <RadioGroup value={payment} onValueChange={(v) => isPaymentOption(v) && setPayment(v)} className="grid gap-3" aria-label="روش پرداخت">
//             {paymentOptions.map((key) => {
//               const Icon = paymentIcons[key];
//               return (
//                 <OptionCard key={key} id={`pay-${key}`} value={key} selected={payment === key}>
//                   <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
//                   <span className="flex-1">
//                     <span className="block text-sm font-bold">{paymentOptionMeta[key].title}</span>
//                     <span className="block text-xs text-muted-foreground">{paymentOptionMeta[key].description}</span>
//                   </span>
//                 </OptionCard>
//               );
//             })}
//           </RadioGroup>
//           {/* Below the options, so switching method never shifts the option being clicked */}
//           {payment === "card" && (
//             <div className="mt-3 grid gap-4 rounded-xl bg-muted/50 p-4 sm:grid-cols-4">
//               <FormField id="co-cardNumber" label="شماره کارت" error={errors.cardNumber} className="sm:col-span-2">
//                 <Input name="cardNumber" inputMode="numeric" dir="ltr" placeholder="0000 0000 0000 0000" autoComplete="cc-number" className="text-start tracking-widest" {...fieldAria("co-cardNumber", errors.cardNumber)} />
//               </FormField>
//               <FormField id="co-exp" label="تاریخ انقضا">
//                 <Input {...fieldAria("co-exp")} name="exp" dir="ltr" placeholder="MM/YY" autoComplete="cc-exp" className="text-start" />
//               </FormField>
//               <FormField id="co-cvv" label="CVV2">
//                 <Input {...fieldAria("co-cvv")} name="cvv" dir="ltr" inputMode="numeric" placeholder="•••" autoComplete="cc-csc" className="text-start" />
//               </FormField>
//               <p className="flex items-center gap-1.5 text-xs text-muted-foreground sm:col-span-4">
//                 <Lock className="h-3.5 w-3.5" aria-hidden="true" /> این فرم نمایشی است؛ هیچ اطلاعات کارتی ارسال یا ذخیره نمی‌شود.
//               </p>
//             </div>
//           )}
//         </Section>
//       </div>

//       {/* Order summary */}
//       <aside aria-label="خلاصه سفارش" className="lg:sticky lg:top-36 lg:self-start">
//         <div className="space-y-5 rounded-xl border border-border bg-card p-5">
//           <div className="flex items-center justify-between">
//             <h2 className="text-base font-bold">خلاصه سفارش</h2>
//             <Link href="/cart" className="text-xs text-primary hover:underline">ویرایش سبد</Link>
//           </div>
//           <ul className="max-h-64 space-y-3 overflow-y-auto pe-1" aria-label={`${toFaDigits(totalItems)} کالا`}>
//             {items.map((i) => (
//               <li key={cartLineKey(i)} className="flex items-center gap-3">
//                 <span className="product-surface relative h-16 shrink-0 overflow-hidden rounded-md border border-border/60" style={{ width: 52 }}>
//                   <Image src={i.product.images[0]} alt="order-image" draggable="false" fill sizes="52px" className="object-cover" />
//                   <span className="absolute top-0 inset-e-0 grid h-5 min-w-5 place-items-center rounded-es-md bg-foreground px-1 text-[10px] font-bold text-background tabular-nums">
//                     {toFaDigits(i.quantity)}
//                   </span>
//                 </span>
//                 <span className="min-w-0 flex-1">
//                   <span className="line-clamp-1 text-xs font-medium">{i.product.title}</span>
//                   <span className="block text-[11px] text-muted-foreground">
//                     {[i.selectedColor, i.selectedSize && `سایز ${toFaDigits(i.selectedSize)}`].filter(Boolean).join(" • ")} {" "}• تعداد {toFaDigits(i.quantity)}
//                   </span>
//                 </span>
//                 <span className="text-xs font-bold tabular-nums">{formatPrice(i.product.price * i.quantity)}</span>
//               </li>
//             ))}
//           </ul>
//           <CouponForm idPrefix="checkout" />
//           <OrderSummaryRows values={summaryFromTotals(totals, coupon?.code)} />
//           <CheckboxField
//             id="co-terms"
//             name="terms"
//             error={errors.terms}
//             labelClassName="text-xs"
//             label={
//               <>
//                 <Link href="/terms" className="text-primary hover:underline">قوانین و مقررات</Link> و{" "}
//                 <Link href="/privacy-policy" className="text-primary hover:underline">حریم خصوصی</Link> مُدا را می‌پذیرم.
//               </>
//             }
//           />
//           <Button type="submit" size="lg" className="h-auto min-h-12 w-full whitespace-normal py-2 sm:whitespace-nowrap" loading={submitting}>
//             {!submitting && <Lock aria-hidden="true" />}
//             {submitting ? "در حال ثبت سفارش…" : `ثبت سفارش و پرداخت ${formatPrice(totals.total)}`}
//           </Button>
//           {Object.keys(errors).length > 0 && (
//             <p role="alert" className="rounded-lg bg-destructive/10 p-2.5 text-center text-xs text-destructive">
//               لطفاً خطاهای فرم را برطرف کنید.
//             </p>
//           )}
//         </div>
//         <div className="mt-4 flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-xs leading-6 text-muted-foreground">
//           <ShieldCheck className="h-6 w-6 shrink-0 text-success" aria-hidden="true" />
//           پرداخت شما از طریق درگاه رسمی و رمزنگاری‌شده انجام می‌شود. مُدا به اطلاعات کارت شما دسترسی ندارد.
//         </div>
//       </aside>
//     </form>
//   );
// }
