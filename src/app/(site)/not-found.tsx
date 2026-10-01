import type { Metadata } from "next";

import { NotFoundContent } from "@/components/layout/not-found-content";

export const metadata: Metadata = {
  title: "صفحه پیدا نشد",
  robots: { index: false },
};

export default function SiteNotFound() {
  return (
    <div className="container pb-section">
      <NotFoundContent />
    </div>
  );
}
