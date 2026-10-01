import { cn } from "@/lib/utils";

type Tone = "neutral" | "info" | "warning" | "success" | "danger";

const toneClass: Record<Tone, string> = {
  neutral: "bg-muted text-muted-foreground",
  info: "bg-info/12 text-info",
  warning: "bg-warning/15 text-warning-foreground dark:text-warning",
  success: "bg-success/12 text-success",
  danger: "bg-destructive/12 text-destructive",
};

/** Soft pill with a leading dot; colour is never the only signal (label text always shown). */
export function StatusBadge({
  tone,
  children,
  className,
}: {
  tone: Tone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium",
        toneClass[tone],
        className,
      )}
    >
      <span
        className="h-1.5 w-1.5 rounded-full bg-current"
        aria-hidden="true"
      />
      {children}
    </span>
  );
}
