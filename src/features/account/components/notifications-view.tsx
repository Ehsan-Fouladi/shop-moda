"use client";

import {
  BellOff,
  CheckCheck,
  Heart,
  Megaphone,
  Package,
  ShieldAlert,
  Trash2,
  type LucideIcon,
} from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/features/account/store/notifications-store";
import { timeAgoFa, toFaDigits } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { NotificationCategory } from "@/features/account/types";
import { useState } from "react";

const meta: Record<
  NotificationCategory,
  { label: string; icon: LucideIcon; tone: string }
> = {
  order: { label: "سفارش", icon: Package, tone: "bg-info/12 text-info" },
  promo: { label: "تخفیف", icon: Megaphone, tone: "bg-sale/10 text-sale" },
  wishlist: {
    label: "علاقه‌مندی",
    icon: Heart,
    tone: "bg-accent text-primary",
  },
  system: {
    label: "امنیت",
    icon: ShieldAlert,
    tone: "bg-warning/15 text-warning-foreground dark:text-warning",
  },
};

/** `now` is the reference instant for relative times (from the server, so hydration matches). */
export function NotificationsView({ now }: { now: number }) {
  const {
    notifications: list,
    unreadCount: unread,
    markRead,
    markAllRead,
    remove,
  } = useNotifications();
  const [filter, setFilter] = useState<"all" | "unread" | NotificationCategory>(
    "all",
  );
  const shown = list.filter((n) =>
    filter === "all"
      ? true
      : filter === "unread"
        ? !n.read
        : n.category === filter,
  );
  const filters: { id: typeof filter; label: string }[] = [
    { id: "all", label: "همه" },
    { id: "unread", label: `خوانده‌نشده (${toFaDigits(unread)})` },
    ...(Object.keys(meta) as NotificationCategory[]).map((k) => ({
      id: k,
      label: meta[k].label,
    })),
  ];

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div
          role="tablist"
          aria-label="فیلتر اعلان‌ها"
          className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0"
        >
          {filters.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-sm",
                filter === f.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <Button
          variant="ghost"
          size="sm"
          disabled={!unread}
          onClick={markAllRead}
        >
          <CheckCheck aria-hidden="true" /> علامت‌گذاری همه به‌عنوان خوانده‌شده
        </Button>
      </div>

      <div role="tabpanel" aria-live="polite">
        {shown.length ? (
          <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
            {shown.map((n) => {
              const m = meta[n.category];
              const Icon = m.icon;
              return (
                <li
                  key={n.id}
                  className={cn(
                    "group relative flex gap-3 p-4 transition-colors",
                    !n.read && "bg-accent/30",
                  )}
                >
                  <span
                    className={cn(
                      "grid h-10 w-10 shrink-0 place-items-center rounded-full",
                      m.tone,
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className={cn(
                          "text-sm",
                          !n.read ? "font-bold" : "font-medium",
                        )}
                      >
                        {!n.read && (
                          <span
                            className="me-1.5 inline-block h-2 w-2 rounded-full bg-primary align-middle"
                            aria-hidden="true"
                          />
                        )}
                        {n.title}
                        {!n.read && (
                          <span className="sr-only"> (خوانده‌نشده)</span>
                        )}
                      </h3>
                      <time
                        dateTime={n.createdAt}
                        className="shrink-0 text-xs text-muted-foreground"
                      >
                        {timeAgoFa(n.createdAt, now)}
                      </time>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {n.body}
                    </p>
                    <div className="mt-2 flex gap-1">
                      {!n.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-xs"
                          onClick={() => markRead(n.id)}
                        >
                          خوانده شد
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-xs text-muted-foreground hover:text-destructive"
                        onClick={() => remove(n.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />{" "}
                        حذف
                      </Button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <EmptyState
            icon={BellOff}
            title="اعلانی وجود ندارد"
            description={
              filter === "unread"
                ? "همه اعلان‌ها را خوانده‌اید."
                : "اعلان جدیدی در این بخش ندارید."
            }
          />
        )}
      </div>
    </>
  );
}
