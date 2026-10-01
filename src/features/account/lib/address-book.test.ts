import { describe, expect, it } from "vitest";

import {
  formatAddress,
  removeAddress,
  setDefaultAddress,
  upsertAddress,
} from "@/features/account/lib/address-book";
import type { Address } from "@/features/account/types";

const make = (id: string, isDefault = false): Address => ({
  id,
  title: id,
  receiver: "سارا",
  phone: "09120000000",
  province: "تهران",
  city: "تهران",
  street: "خیابان ولیعصر",
  postalCode: "1234567890",
  isDefault,
});
const defaults = (list: Address[]) =>
  list.filter((a) => a.isDefault).map((a) => a.id);

describe("address book", () => {
  it("formats the one-line address", () => {
    expect(formatAddress(make("a"))).toBe("تهران، تهران، خیابان ولیعصر");
  });

  it("makes the first address default and moves the default on upsert", () => {
    expect(defaults(upsertAddress([], make("a")))).toEqual(["a"]);
    const list = [make("a", true), make("b")];
    expect(defaults(upsertAddress(list, make("c", true)))).toEqual(["c"]);
    expect(upsertAddress(list, { ...make("b"), title: "کار" })[1].title).toBe(
      "کار",
    );
    expect(defaults(upsertAddress(list, make("c")))).toEqual(["a"]);
  });

  it("promotes the first remaining address when the default is removed", () => {
    const list = [make("a", true), make("b"), make("c")];
    expect(defaults(removeAddress(list, "a"))).toEqual(["b"]);
    expect(defaults(removeAddress(list, "c"))).toEqual(["a"]);
    expect(removeAddress([make("a", true)], "a")).toEqual([]);
  });

  it("sets a single default", () => {
    expect(
      defaults(setDefaultAddress([make("a", true), make("b")], "b")),
    ).toEqual(["b"]);
  });
});
