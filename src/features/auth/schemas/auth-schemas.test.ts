import { describe, expect, it } from "vitest";

import { registerSchema } from "@/features/auth/schemas/auth-schemas";
import { parseForm } from "@/lib/form-schema";

describe("registerSchema", () => {
  it("reports every invalid field at once, including the confirm mismatch", () => {
    const r = parseForm(registerSchema, {
      name: "",
      phone: "1",
      email: "x",
      password: "weak",
      confirm: "other",
    });
    expect(r.success).toBe(false);
    expect(Object.keys(r.errors)).toEqual([
      "name",
      "phone",
      "email",
      "password",
      "confirm",
      "terms",
    ]);
  });

  it("accepts a valid registration", () => {
    const r = parseForm(registerSchema, {
      name: "سارا محمدی",
      phone: "۰۹۱۲۳۴۵۶۷۸۹",
      email: "sara@example.com",
      password: "Str0ng!pass",
      confirm: "Str0ng!pass",
      terms: "1", // the checkbox submits value="1"
    });
    expect(r.success).toBe(true);
  });
});

describe("acceptedCheckbox semantics", () => {
  it("treats any submitted checkbox value as checked and absence as unchecked", () => {
    const base = {
      name: "سارا محمدی",
      phone: "09123456789",
      email: "s@e.com",
      password: "Str0ng!pass",
      confirm: "Str0ng!pass",
    };
    expect(parseForm(registerSchema, { ...base, terms: "on" }).success).toBe(
      true,
    );
    expect(parseForm(registerSchema, { ...base, terms: "1" }).success).toBe(
      true,
    );
    expect(parseForm(registerSchema, base).errors).toEqual({
      terms: "پذیرش قوانین الزامی است.",
    });
  });
});
