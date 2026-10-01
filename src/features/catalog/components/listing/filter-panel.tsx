"use client";

import { Check, Star } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useListingNavigation } from "@/features/catalog/components/listing/listing-navigation";
import {
  formatNumber,
  formatPrice,
  toFaDigits,
  toLatinDigits,
} from "@/lib/format";
import type {
  Facets,
  ListingFilters,
} from "@/features/catalog/lib/listing-filters";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface FilterPanelProps {
  facets: Facets;
  filters: ListingFilters;
  hideCategory?: boolean;
  idPrefix: string;
}

const toggleIn = (arr: string[], v: string) =>
  arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
const joinOrNull = (arr: string[]) => (arr.length ? arr.join(",") : null);

/** All listing filters. Rendered in the desktop sidebar and inside the mobile sheet. */
export function FilterPanel({
  facets,
  filters,
  hideCategory,
  idPrefix,
}: FilterPanelProps) {
  const { update: onChange } = useListingNavigation();
  const defaultOpen = [
    "category",
    "brand",
    "price",
    "size",
    "color",
    "rating",
    "availability",
  ];

  return (
    <div className="space-y-1">
      <div className="space-y-3 border-b border-border pb-4">
        <SwitchRow
          id={`${idPrefix}-stock`}
          label="فقط کالاهای موجود"
          checked={filters.inStock}
          onCheckedChange={(v) => onChange({ stock: v ? "1" : null })}
        />
        <SwitchRow
          id={`${idPrefix}-sale`}
          label="فقط کالاهای تخفیف‌دار"
          checked={filters.onSale}
          onCheckedChange={(v) => onChange({ sale: v ? "1" : null })}
        />
      </div>

      <Accordion type="multiple" defaultValue={defaultOpen}>
        {!hideCategory && facets.categories.length > 1 && (
          <FilterSection
            value="category"
            title="دسته‌بندی"
            count={filters.categories.length}
          >
            <CheckList
              idPrefix={`${idPrefix}-cat`}
              options={facets.categories.map((c) => ({
                value: c.id,
                label: c.name,
              }))}
              selected={filters.categories}
              onToggle={(v) =>
                onChange({
                  category: joinOrNull(toggleIn(filters.categories, v)),
                })
              }
            />
          </FilterSection>
        )}

        <FilterSection value="brand" title="برند" count={filters.brands.length}>
          <BrandList
            idPrefix={`${idPrefix}-brand`}
            brands={facets.brands}
            selected={filters.brands}
            onToggle={(v) =>
              onChange({ brand: joinOrNull(toggleIn(filters.brands, v)) })
            }
          />
        </FilterSection>

        <FilterSection
          value="price"
          title="محدوده قیمت"
          count={filters.min !== undefined || filters.max !== undefined ? 1 : 0}
        >
          <PriceRange
            key={`${filters.min ?? ""}-${filters.max ?? ""}`}
            idPrefix={idPrefix}
            min={facets.priceMin}
            max={facets.priceMax}
            value={[
              filters.min ?? facets.priceMin,
              filters.max ?? facets.priceMax,
            ]}
            onCommit={([lo, hi]) =>
              onChange({
                min: lo > facets.priceMin ? String(lo) : null,
                max: hi < facets.priceMax ? String(hi) : null,
              })
            }
          />
        </FilterSection>

        {(facets.clothingSizes.length > 0 ||
          facets.numericSizes.length > 0) && (
          <FilterSection value="size" title="سایز" count={filters.sizes.length}>
            {facets.clothingSizes.length > 0 && (
              <SizeChips
                label="پوشاک"
                sizes={facets.clothingSizes}
                selected={filters.sizes}
                onToggle={(v) =>
                  onChange({ size: joinOrNull(toggleIn(filters.sizes, v)) })
                }
              />
            )}
            {facets.numericSizes.length > 0 && (
              <SizeChips
                label="کفش، شلوار و کمربند"
                sizes={facets.numericSizes}
                selected={filters.sizes}
                onToggle={(v) =>
                  onChange({ size: joinOrNull(toggleIn(filters.sizes, v)) })
                }
              />
            )}
          </FilterSection>
        )}

        {facets.colors.length > 0 && (
          <FilterSection
            value="color"
            title="رنگ"
            count={filters.colors.length}
          >
            <ul className="grid grid-cols-2 gap-1.5">
              {facets.colors.map((c) => {
                const active = filters.colors.includes(c.id);
                return (
                  <li key={c.id}>
                    <button
                      type="button"
                      aria-pressed={active}
                      onClick={() =>
                        onChange({
                          color: joinOrNull(toggleIn(filters.colors, c.id)),
                        })
                      }
                      className={cn(
                        "flex w-full items-center gap-2 rounded-lg border px-2 py-1.5 text-xs transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring",
                        active
                          ? "border-primary bg-accent text-accent-foreground"
                          : "border-transparent hover:bg-muted",
                      )}
                    >
                      <span
                        className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-black/10 dark:border-white/20"
                        style={{ background: c.hex }}
                        aria-hidden="true"
                      >
                        {active && (
                          <Check
                            className={cn(
                              "h-3 w-3",
                              c.id === "white" || c.id === "beige"
                                ? "text-black"
                                : "text-white",
                            )}
                          />
                        )}
                      </span>
                      {c.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </FilterSection>
        )}

        <FilterSection
          value="rating"
          title="امتیاز کاربران"
          count={filters.rating ? 1 : 0}
        >
          <fieldset>
            <legend className="sr-only">حداقل امتیاز</legend>
            <ul className="space-y-1">
              {[4.5, 4, 3].map((r) => {
                const active = filters.rating === r;
                return (
                  <li key={r}>
                    <button
                      type="button"
                      aria-pressed={active}
                      onClick={() =>
                        onChange({ rating: active ? null : String(r) })
                      }
                      className={cn(
                        "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring",
                        active
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-muted",
                      )}
                    >
                      <Star
                        className="h-4 w-4 fill-rating text-rating"
                        aria-hidden="true"
                      />
                      {toFaDigits(r)} و بالاتر
                    </button>
                  </li>
                );
              })}
            </ul>
          </fieldset>
        </FilterSection>
      </Accordion>
    </div>
  );
}

function FilterSection({
  value,
  title,
  count,
  children,
}: {
  value: string;
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <AccordionItem value={value} className="border-border">
      <AccordionTrigger className="py-3.5 text-sm font-bold hover:no-underline">
        <span className="flex items-center gap-2">
          {title}
          {count > 0 && (
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1.5 text-[10px] text-primary-foreground tabular-nums">
              {toFaDigits(count)}
            </span>
          )}
        </span>
      </AccordionTrigger>
      <AccordionContent className="pb-4">{children}</AccordionContent>
    </AccordionItem>
  );
}

function SwitchRow({
  id,
  label,
  checked,
  onCheckedChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <Label htmlFor={id} className="cursor-pointer text-sm font-medium">
        {label}
      </Label>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

function CheckList({
  idPrefix,
  options,
  selected,
  onToggle,
}: {
  idPrefix: string;
  options: { value: string; label: string }[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <ul className="space-y-2.5">
      {options.map((o, i) => (
        <li key={o.value} className="flex items-center gap-2.5">
          <Checkbox
            id={`${idPrefix}-${i}`}
            checked={selected.includes(o.value)}
            onCheckedChange={() => onToggle(o.value)}
          />
          <Label
            htmlFor={`${idPrefix}-${i}`}
            className="cursor-pointer text-sm font-normal"
          >
            {o.label}
          </Label>
        </li>
      ))}
    </ul>
  );
}

function BrandList({
  idPrefix,
  brands,
  selected,
  onToggle,
}: {
  idPrefix: string;
  brands: string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  const [query, setQuery] = useState("");
  const visible = brands.filter((b) => b.includes(query.trim()));
  return (
    <div className="space-y-3">
      {brands.length > 6 && (
        <>
          <label htmlFor={`${idPrefix}-search`} className="sr-only">
            جستجوی برند
          </label>
          <Input
            id={`${idPrefix}-search`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجوی برند…"
            className="h-9 text-sm"
          />
        </>
      )}
      <div className="max-h-52 overflow-y-auto pe-1">
        {visible.length ? (
          <CheckList
            idPrefix={idPrefix}
            options={visible.map((b) => ({ value: b, label: b }))}
            selected={selected}
            onToggle={onToggle}
          />
        ) : (
          <p className="text-xs text-muted-foreground">برندی یافت نشد.</p>
        )}
      </div>
    </div>
  );
}

function SizeChips({
  label,
  sizes,
  selected,
  onToggle,
}: {
  label: string;
  sizes: string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="mb-3 last:mb-0">
      <p className="mb-2 text-xs text-muted-foreground">{label}</p>
      <ul className="flex flex-wrap gap-1.5">
        {sizes.map((s) => {
          const active = selected.includes(s);
          return (
            <li key={s}>
              <button
                type="button"
                aria-pressed={active}
                onClick={() => onToggle(s)}
                className={cn(
                  "h-9 min-w-11 rounded-lg border px-2.5 text-xs font-medium tabular-nums transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-foreground/40",
                )}
              >
                {toFaDigits(s)}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function PriceRange({
  idPrefix,
  min,
  max,
  value,
  onCommit,
}: {
  idPrefix: string;
  min: number;
  max: number;
  value: [number, number];
  onCommit: (v: [number, number]) => void;
}) {
  // Parent remounts this component (via `key`) when the committed range changes, so no sync effect is needed.
  const [range, setRange] = useState<[number, number]>(value);
  const toRange = (v: number[]): [number, number] => [v[0] ?? min, v[1] ?? max];

  const commitInput = (i: 0 | 1, raw: string) => {
    const digits = toLatinDigits(raw).replace(/\D/g, "");
    const n = digits ? Number(digits) : i === 0 ? min : max;
    const next: [number, number] =
      i === 0
        ? [Math.min(n, range[1]), range[1]]
        : [range[0], Math.max(n, range[0])];
    setRange(next);
    onCommit(next);
  };

  return (
    <div className="space-y-4">
      <Slider
        min={min}
        max={max}
        step={50000}
        value={range}
        onValueChange={(v) => setRange(toRange(v))}
        onValueCommit={(v) => onCommit(toRange(v))}
        minStepsBetweenThumbs={1}
        aria-label="محدوده قیمت"
        className="py-2"
      />
      <div className="grid grid-cols-2 gap-2">
        {(
          [
            [0, "از"],
            [1, "تا"],
          ] as const
        ).map(([i, lbl]) => (
          <div key={lbl} className="space-y-1">
            <Label
              htmlFor={`${idPrefix}-price-${i}`}
              className="text-xs text-muted-foreground"
            >
              {lbl} (تومان)
            </Label>
            <Input
              id={`${idPrefix}-price-${i}`}
              inputMode="numeric"
              key={range[i]}
              defaultValue={formatNumber(range[i])}
              onBlur={(e) => commitInput(i, e.currentTarget.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && commitInput(i, e.currentTarget.value)
              }
              className="h-9 text-center text-xs tabular-nums"
            />
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground">
        {formatPrice(range[0])} تا {formatPrice(range[1])}
      </p>
    </div>
  );
}
