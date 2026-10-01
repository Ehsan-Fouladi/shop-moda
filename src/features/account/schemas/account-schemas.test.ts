import { describe, expect, it } from "vitest";

import {
  addressSchema,
  paymentCardSchema,
  profileSchema,
  walletTopUpSchema,
} from "@/features/account/schemas/account-schemas";
import { parseForm } from "@/lib/form-schema";

describe("paymentCardSchema", () => {
  it("normalises Persian digits and separators to 16 Latin digits", () => {
    const r = parseForm(paymentCardSchema, {
      number: "۶۰۳۷ ۹۹۷۱-۲۳۴۵ ۶۷۸۹",
      holder: "سارا",
      exp: "08/29",
    });
    expect(r.success && r.data.number).toBe("6037997123456789");
  });

  it("reports each invalid field with the original messages", () => {
    const r = parseForm(paymentCardSchema, {
      number: "1234",
      holder: " ",
      exp: "8/2029",
    });
    expect(r.errors).toEqual({
      number: "شماره کارت باید ۱۶ رقم باشد.",
      holder: "نام دارنده کارت را وارد کنید.",
      exp: "به شکل MM/YY وارد کنید.",
    });
  });
});

describe("addressSchema / profileSchema", () => {
  it("requires an 11-digit 09 mobile and a full street address", () => {
    const r = parseForm(addressSchema, {
      title: "خانه",
      receiver: "سارا",
      phone: "0912",
      province: "تهران",
      city: "تهران",
      street: "کوتاه",
      postalCode: "1",
    });
    expect(Object.keys(r.errors)).toEqual(["phone", "street"]);
  });

  it("trims values on success", () => {
    const r = parseForm(profileSchema, {
      firstName: " سارا ",
      lastName: "محمدی",
      email: "s@e.com",
      phone: "۰۹۱۲۳۴۵۶۷۸۹",
    });
    expect(r.success && r.data.firstName).toBe("سارا");
  });
});

describe("walletTopUpSchema", () => {
  it("normalises Persian digits and separators", () => {
    const r = parseForm(walletTopUpSchema, { amount: "۲۵۰٬۰۰۰" });
    expect(r.success && r.data.amount).toBe("250000");
  });

  it("rejects empty, non-numeric and out-of-range amounts with the first relevant message", () => {
    expect(parseForm(walletTopUpSchema, { amount: " " }).errors.amount).toBe(
      "مبلغ شارژ را وارد کنید.",
    );
    expect(parseForm(walletTopUpSchema, { amount: "12.5" }).errors.amount).toBe(
      "مبلغ را فقط با عدد و به تومان وارد کنید.",
    );
    expect(parseForm(walletTopUpSchema, { amount: "9999" }).errors.amount).toBe(
      "حداقل مبلغ شارژ ۱۰,۰۰۰ تومان است.",
    );
    expect(
      parseForm(walletTopUpSchema, { amount: "50000001" }).errors.amount,
    ).toBe("حداکثر مبلغ شارژ ۵۰,۰۰۰,۰۰۰ تومان است.");
  });
});
