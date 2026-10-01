import { FormField, fieldAria } from "@/components/shared/form-field";
import { PasswordInput } from "@/components/shared/password-input";
import { PasswordStrength } from "@/features/auth/components/password-strength";

interface NewPasswordFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
  required?: boolean;
}

/** Controlled new-password input followed by its strength meter (linked via aria-describedby). */
export function NewPasswordField({
  id,
  name,
  label,
  value,
  onChange,
  error,
  required,
}: NewPasswordFieldProps) {
  const strengthId = `${id}-strength`;
  return (
    <>
      <FormField id={id} label={label} required={required} error={error}>
        <PasswordInput
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="new-password"
          {...fieldAria(id, error)}
          aria-describedby={error ? `${id}-error ${strengthId}` : strengthId}
        />
      </FormField>
      <PasswordStrength value={value} id={strengthId} />
    </>
  );
}
