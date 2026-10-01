import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  id: string;
  label: React.ReactNode;
  error?: string | null;
  hint?: React.ReactNode;
  required?: boolean;
  className?: string;
  /** Extra element aligned to the end of the label row (e.g. "forgot password" link) */
  labelAside?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Label + control + hint/error wrapper. Pair with `fieldAria(id, error)` on the control
 * so the error is announced and linked via aria-describedby.
 */
export function FormField({
  id,
  label,
  error,
  hint,
  required,
  className,
  labelAside,
  children,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={id}>
          {label}
          {required && (
            <span className="ms-0.5 text-destructive" aria-hidden="true">
              *
            </span>
          )}
        </Label>
        {labelAside}
      </div>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function fieldAria(id: string, error?: string | null, hasHint = false) {
  return {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error
      ? `${id}-error`
      : hasHint
        ? `${id}-hint`
        : undefined,
  } as const;
}

/** Focuses the first invalid field (ids follow the `${prefix}-${field}` convention). */
export function focusFirstError(
  errors: Record<string, string>,
  prefix: string,
): void {
  const first = Object.keys(errors)[0];
  if (first) document.getElementById(`${prefix}-${first}`)?.focus();
}

/** Checkbox with an inline label (e.g. accepting the terms) and its validation error. */
export function CheckboxField({
  id,
  name,
  label,
  error,
  labelClassName,
  checked,
  onCheckedChange,
}: {
  id: string;
  name: string;
  label: React.ReactNode;
  error?: string | null;
  labelClassName?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}) {
  return (
    <div>
      <div className="flex items-start gap-2">
        <Checkbox
          id={id}
          name={name}
          value="1"
          className="mt-0.5"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          checked={checked}
          onCheckedChange={onCheckedChange}
        />
        <Label
          htmlFor={id}
          className={cn("font-normal leading-6", labelClassName)}
        >
          {label}
        </Label>
      </div>
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1 text-xs text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  );
}
