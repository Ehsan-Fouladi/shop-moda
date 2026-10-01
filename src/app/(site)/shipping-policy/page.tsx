import type { Metadata } from "next";

import {
  LegalPage,
  legalMetadata,
} from "@/features/content/components/legal-page";

export const metadata: Metadata = legalMetadata("shipping-policy");

export default function ShippingPolicyPage() {
  return <LegalPage slug="shipping-policy" />;
}
