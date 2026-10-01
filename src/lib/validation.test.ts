import { describe, expect, it } from "vitest";

import { digitsOf, isIranMobile } from "@/lib/validation";

describe("digit normalisation", () => {
  it("normalises Persian and Arabic-Indic digits", () => {
    expect(digitsOf("۰۹۱۲-۳۴۵ ٦٧٨٩")).toBe("09123456789");
    expect(isIranMobile("۰۹۱۲۳۴۵۶۷۸۹")).toBe(true);
    expect(isIranMobile("08123456789")).toBe(false);
  });
});
