import type { Metadata } from "next";

import {
  LegalPage,
  legalMetadata,
} from "@/features/content/components/legal-page";

export const metadata: Metadata = legalMetadata("terms");

export default function TermsPage() {
  return <LegalPage slug="terms" />;
}
