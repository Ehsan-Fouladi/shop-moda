"use client";

import { useTheme } from "next-themes";
import { Check, Monitor, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsClient } from "@/hooks/use-is-client";
import { cn } from "@/lib/utils";

const options = [
  { value: "light", label: "روشن", Icon: Sun },
  { value: "dark", label: "تیره", Icon: Moon },
  { value: "system", label: "مطابق سیستم", Icon: Monitor },
] as const;

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const mounted = useIsClient();

  const CurrentIcon =
    options.find((o) => o.value === (mounted ? theme : "system"))?.Icon ??
    Monitor;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("shrink-0 text-foreground", className)}
          aria-label="تغییر پوسته نمایش"
        >
          <CurrentIcon className="h-5 w-5" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        {options.map(({ value, label, Icon }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => setTheme(value)}
            className="flex items-center justify-between gap-2"
            aria-checked={mounted && theme === value}
          >
            <span className="flex items-center gap-2">
              <Icon
                className="h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
              {label}
            </span>
            {mounted && theme === value ? (
              <Check className="h-4 w-4 text-primary" aria-hidden="true" />
            ) : (
              <span className="sr-only">(انتخاب نشده)</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
