import "server-only";

import type { SizeChart } from "@/features/catalog/types";

/** Size chart shown in the product size-guide dialog. */
export const sizeChart: SizeChart = {
  headers: [
    "سایز",
    "دور سینه (cm)",
    "دور کمر (cm)",
    "دور باسن (cm)",
    "قد لباس (cm)",
  ],
  rows: [
    ["S", "۸۶–۹۰", "۶۸–۷۲", "۹۲–۹۶", "۱۰۵"],
    ["M", "۹۰–۹۴", "۷۲–۷۶", "۹۶–۱۰۰", "۱۰۸"],
    ["L", "۹۴–۱۰۰", "۷۶–۸۲", "۱۰۰–۱۰۶", "۱۱۱"],
    ["XL", "۱۰۰–۱۰۶", "۸۲–۸۸", "۱۰۶–۱۱۲", "۱۱۴"],
    ["2XL", "۱۰۶–۱۱۲", "۸۸–۹۴", "۱۱۲–۱۱۸", "۱۱۷"],
  ],
};
