import type { Metadata } from "next";

import {
  LegalPage,
  legalMetadata,
} from "@/features/content/components/legal-page";

export const metadata: Metadata = legalMetadata("privacy-policy");

export default function PrivacyPolicyPage() {
  return <LegalPage slug="privacy-policy" />;
}
