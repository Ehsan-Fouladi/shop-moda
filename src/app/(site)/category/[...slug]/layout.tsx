import { notFound } from "next/navigation";

import { resolveCategoryPath } from "@/features/catalog/data/categories";
import { Suspense } from "react";

/**
 * Validates the category path before anything streams. The page reads `searchParams` (so it is
 * rendered per request) and sits under `loading.tsx`; calling `notFound()` only in the page would
 * send the skeleton with HTTP 200 first. The layout is outside that loading boundary, so unknown
 * paths get a real 404 status.
 */

type Validations = {
  params: Promise<{ slug: string[] }>;
  children: React.ReactNode;
};

async function CategoryValidator({ params, children }: Validations) {
  const { slug } = await params;
  if (!resolveCategoryPath(slug)) {
    notFound();
  }
  return <>{children}</>;
}

export default function CategoryLayout({
  children,
  params,
}: LayoutProps<"/category/[...slug]">) {
  return (
    <Suspense fallback={null}>
      <CategoryValidator params={params}>{children}</CategoryValidator>
    </Suspense>
  );
}
