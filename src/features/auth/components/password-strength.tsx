import {
  passwordRules,
  passwordScore,
} from "@/features/auth/lib/password-rules";
import { cn } from "@/lib/utils";

const levels = [
  { label: "خیلی ضعیف", bar: "bg-destructive" },
  { label: "ضعیف", bar: "bg-destructive" },
  { label: "متوسط", bar: "bg-warning" },
  { label: "خوب", bar: "bg-info" },
  { label: "قوی", bar: "bg-success" },
];

/** Visual strength meter + checklist (UI heuristic only). */
export function PasswordStrength({
  value,
  id,
}: {
  value: string;
  id?: string;
}) {
  const score = passwordScore(value);
  const level = levels[score];
  return (
    <div id={id} className="space-y-2" aria-live="polite">
      <div className="flex gap-1" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full bg-muted transition-colors",
              value && i < score && level.bar,
            )}
          />
        ))}
      </div>
      {value && (
        <p className="text-xs">
          قدرت رمز عبور: <b>{level.label}</b>
        </p>
      )}
      <ul className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
        {passwordRules.map((r) => {
          const ok = r.test(value);
          return (
            <li
              key={r.label}
              className={cn("flex items-center gap-1.5", ok && "text-success")}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  ok ? "bg-success" : "bg-border",
                )}
                aria-hidden="true"
              />
              {r.label}
              <span className="sr-only">
                {ok ? "(رعایت شده)" : "(رعایت نشده)"}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
