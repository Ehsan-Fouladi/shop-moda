"use client";

import { useTheme } from "next-themes";
import { Laptop, Moon, Sun, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Panel } from "@/features/account/components/dashboard-ui";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useIsClient } from "@/hooks/use-is-client";
import { cn } from "@/lib/utils";

const themes = [
  { id: "light", label: "روشن", icon: Sun },
  { id: "dark", label: "تیره", icon: Moon },
  { id: "system", label: "مطابق سیستم", icon: Laptop },
];

const notificationPrefs = [
  {
    id: "orders",
    title: "وضعیت سفارش‌ها",
    desc: "ثبت، ارسال و تحویل سفارش",
    default: true,
    locked: true,
  },
  {
    id: "wishlist",
    title: "تخفیف علاقه‌مندی‌ها",
    desc: "وقتی کالای مورد علاقه‌تان تخفیف می‌خورد",
    default: true,
  },
  {
    id: "promo",
    title: "پیشنهادها و جشنواره‌ها",
    desc: "کدهای تخفیف و حراج‌های فصلی",
    default: false,
  },
  {
    id: "newsletter",
    title: "خبرنامه هفتگی",
    desc: "کالکشن‌های تازه و مطالب ژورنال مُدا",
    default: true,
  },
];

function SettingRow({
  id,
  title,
  desc,
  children,
}: {
  id: string;
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4">
      <div>
        <Label htmlFor={id} className="text-sm font-medium">
          {title}
        </Label>
        {desc && (
          <p id={`${id}-desc`} className="mt-0.5 text-xs text-muted-foreground">
            {desc}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

export function SettingsView() {
  const { theme, setTheme } = useTheme();
  const mounted = useIsClient();

  return (
    <div className="space-y-5">
      <Panel title="ظاهر" id="st-appearance">
        <div className="p-5">
          <p className="mb-3 text-sm text-muted-foreground">
            پوسته مورد نظر خود را انتخاب کنید؛ انتخاب شما در این مرورگر ذخیره
            می‌شود.
          </p>
          <div
            role="radiogroup"
            aria-label="پوسته"
            className="grid grid-cols-3 gap-3"
          >
            {themes.map(({ id, label, icon: Icon }) => {
              const selected = mounted && theme === id;
              return (
                <button
                  key={id}
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setTheme(id)}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-xl border p-4 text-sm transition",
                    selected
                      ? "border-primary bg-accent/50 font-bold ring-1 ring-primary"
                      : "border-border hover:border-foreground/30",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-6 w-6",
                      selected ? "text-primary" : "text-muted-foreground",
                    )}
                    aria-hidden="true"
                  />
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </Panel>

      <Panel title="اعلان‌ها" id="st-notifications">
        <div className="divide-y divide-border">
          {notificationPrefs.map((p) => (
            <SettingRow
              key={p.id}
              id={`st-${p.id}`}
              title={p.title}
              desc={p.locked ? `${p.desc} — همیشه فعال` : p.desc}
            >
              <Switch
                id={`st-${p.id}`}
                defaultChecked={p.default}
                disabled={p.locked}
                aria-describedby={`st-${p.id}-desc`}
                onCheckedChange={() => toast.success("تنظیمات ذخیره شد")}
              />
            </SettingRow>
          ))}
          <SettingRow
            id="st-channel"
            title="کانال دریافت"
            desc="اعلان‌های تبلیغاتی از چه راهی ارسال شوند؟"
          >
            <Select defaultValue="sms">
              <SelectTrigger
                id="st-channel"
                className="w-36"
                aria-describedby="st-channel-desc"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sms">پیامک</SelectItem>
                <SelectItem value="email">ایمیل</SelectItem>
                <SelectItem value="both">پیامک و ایمیل</SelectItem>
              </SelectContent>
            </Select>
          </SettingRow>
        </div>
      </Panel>

      <Panel title="حریم خصوصی و امنیت" id="st-privacy">
        <div className="divide-y divide-border">
          <SettingRow
            id="st-2fa"
            title="ورود دو مرحله‌ای"
            desc="ارسال کد تأیید به موبایل هنگام ورود از دستگاه جدید"
          >
            <Switch
              id="st-2fa"
              defaultChecked
              aria-describedby="st-2fa-desc"
              onCheckedChange={() => toast.success("تنظیمات ذخیره شد")}
            />
          </SettingRow>
          <SettingRow
            id="st-personal"
            title="پیشنهادهای شخصی‌سازی‌شده"
            desc="استفاده از سابقه بازدید برای پیشنهاد محصولات"
          >
            <Switch
              id="st-personal"
              defaultChecked
              aria-describedby="st-personal-desc"
              onCheckedChange={() => toast.success("تنظیمات ذخیره شد")}
            />
          </SettingRow>
          <SettingRow id="st-language" title="زبان" desc="زبان رابط کاربری">
            <Select defaultValue="fa">
              <SelectTrigger
                id="st-language"
                className="w-36"
                aria-describedby="st-language-desc"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fa">فارسی</SelectItem>
              </SelectContent>
            </Select>
          </SettingRow>
        </div>
      </Panel>

      <section
        aria-labelledby="st-danger"
        className="rounded-xl border border-destructive/40 bg-destructive/5 p-5"
      >
        <h2 id="st-danger" className="font-bold text-destructive">
          حذف حساب کاربری
        </h2>
        <p className="mt-1 text-sm leading-7 text-muted-foreground">
          با حذف حساب، سابقه سفارش‌ها، آدرس‌ها و علاقه‌مندی‌های شما برای همیشه
          پاک می‌شود و قابل بازیابی نیست.
        </p>
        <ConfirmDialog
          trigger={
            <Button variant="destructive" size="sm" className="mt-4">
              <Trash2 aria-hidden="true" /> درخواست حذف حساب
            </Button>
          }
          title="حذف دائمی حساب کاربری"
          description="آیا مطمئن هستید؟ این عمل قابل بازگشت نیست و همه اطلاعات حساب شما پاک خواهد شد."
          confirmLabel="بله، حذف شود"
          destructive
          onConfirm={() =>
            toast.info("درخواست حذف حساب ثبت شد", {
              description: "در نسخه نمایشی هیچ اطلاعاتی حذف نمی‌شود.",
            })
          }
        />
      </section>
    </div>
  );
}
