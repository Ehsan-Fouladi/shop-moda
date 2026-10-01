import { describe, expect, it } from "vitest";

import { timeAgoFa, toFaDigits, toLatinDigits } from "@/lib/format";

describe("digit conversion", () => {
  it("converts Persian and Arabic-Indic digits to Latin", () => {
    expect(toLatinDigits("۱۲۳٤٥٦ abc")).toBe("123456 abc");
  });

  it("round-trips with toFaDigits", () => {
    expect(toLatinDigits(toFaDigits(9876543210))).toBe("9876543210");
  });
});
describe("timeAgoFa", () => {
  it("is relative to the given reference instant, not the current clock", () => {
    const asOf = Date.parse("2026-01-01T12:00:00Z");
    const twoHoursBefore = new Date(asOf - 2 * 3600000).toISOString();
    expect(timeAgoFa(twoHoursBefore, asOf)).toBe(
      new Intl.RelativeTimeFormat("fa-IR", { numeric: "auto" }).format(
        -2,
        "hour",
      ),
    );
    expect(timeAgoFa(twoHoursBefore, asOf + 5 * 3600000)).not.toBe(
      timeAgoFa(twoHoursBefore, asOf),
    );
  });
});
