"use client";

import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";

/**
 * Password input with an accessible show/hide toggle. The field is forced LTR while the page is RTL,
 * so the toggle and its reserved padding use physical `left` to stay on the same side.
 */
export function PasswordInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <Input
        type={visible ? "text" : "password"}
        dir="ltr"
        className={cn("pl-11 text-start", className)}
        {...props}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute left-1 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
        aria-label={visible ? "پنهان کردن رمز عبور" : "نمایش رمز عبور"}
        aria-pressed={visible}
      >
        {visible ? (
          <EyeOff className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Eye className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
