import { Wallet } from "lucide-react";

import { Panel } from "@/features/account/components/dashboard-ui";
import { formatPrice } from "@/lib/format";

/** Moda wallet balance card, shared by the payment-methods page and the top-up flow. */
export function WalletBalance({
  balance,
  action,
}: {
  balance: number;
  action?: React.ReactNode;
}) {
  return (
    <Panel>
      <div className="flex flex-wrap items-center gap-4 p-5">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-primary">
          <Wallet className="h-6 w-6" aria-hidden="true" />
        </span>
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">موجودی کیف پول مُدا</p>
          <p className="text-xl font-extrabold tabular-nums">
            {formatPrice(balance)}
          </p>
        </div>
        {action}
      </div>
    </Panel>
  );
}
