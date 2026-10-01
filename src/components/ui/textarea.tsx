import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-base leading-7 placeholder:text-muted-foreground/80 hover:border-muted-foreground/40 focus-visible:outline-hidden focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/20 aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-50 md:text-sm md:leading-5",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
