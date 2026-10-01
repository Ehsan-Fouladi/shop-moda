import { describe, expect, it } from "vitest";

import { createCheckoutSchema } from "@/features/checkout/schemas/checkout-schema";
import { parseForm } from "@/lib/form-schema";

describe("createCheckoutSchema", () => {
  const base = {
    firstName: "سارا",
    lastName: "محمدی",
    email: "s@e.com",
    phone: "09123456789",
    terms: "1",
  };

  it("only requires address fields for a new address", () => {
    expect(
      parseForm(
        createCheckoutSchema({ newAddress: false, payByCard: false }),
        base,
      ).success,
    ).toBe(true);
    const r = parseForm(
      createCheckoutSchema({ newAddress: true, payByCard: false }),
      base,
    );
    expect(Object.keys(r.errors)).toEqual([
      "province",
      "city",
      "address",
      "postalCode",
    ]);
  });

  it("orders errors as on screen (card number before terms)", () => {
    const r = parseForm(
      createCheckoutSchema({ newAddress: false, payByCard: true }),
      { ...base, terms: undefined, cardNumber: "1234" },
    );
    expect(Object.keys(r.errors)).toEqual(["cardNumber", "terms"]);
  });
});
