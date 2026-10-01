import { Ruler } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { SizeChart } from "@/features/catalog/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function SizeGuideDialog({ chart: sizeChart }: { chart: SizeChart }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          <Ruler className="h-3.5 w-3.5" aria-hidden="true" /> راهنمای سایز
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>راهنمای انتخاب سایز</DialogTitle>
          <DialogDescription className="leading-7">
            اندازه‌ها بر حسب سانتی‌متر هستند. اگر اندازه شما بین دو سایز است،
            سایز بزرگ‌تر را انتخاب کنید.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-x-auto rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/60">
                {sizeChart.headers.map((h) => (
                  <TableHead
                    key={h}
                    className="whitespace-nowrap font-bold text-foreground"
                  >
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sizeChart.rows.map((row) => (
                <TableRow key={row[0]}>
                  {row.map((cell, i) => (
                    <TableCell
                      key={i}
                      className={i === 0 ? "font-bold" : "tabular-nums"}
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="grid gap-3 rounded-lg bg-muted/60 p-4 text-sm leading-7 sm:grid-cols-3">
          <p>
            <b>دور سینه:</b> متر را زیر بغل و دور پهن‌ترین قسمت سینه بگیرید.
          </p>
          <p>
            <b>دور کمر:</b> باریک‌ترین قسمت کمر، کمی بالاتر از ناف.
          </p>
          <p>
            <b>دور باسن:</b> پهن‌ترین قسمت باسن با پاهای جفت.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
