import type { Metadata } from "next";

import {
  LegalPage,
  legalMetadata,
} from "@/features/content/components/legal-page";

export const metadata: Metadata = legalMetadata("return-policy");

export default function ReturnPolicyPage() {
  return <LegalPage slug="return-policy" />;
}
