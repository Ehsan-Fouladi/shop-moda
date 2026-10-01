/**
 * Environment variables, validated once at import time.
 *
 * The app has no secrets today (UI-only, no backend). Only public, non-sensitive values live
 * here; they are inlined into the client bundle, so they must be referenced statically as
 * `process.env.NEXT_PUBLIC_*`. Server-only secrets would get a separate module guarded by
 * `import "server-only"`.
 *
 * Validation uses the platform `URL` parser rather than zod on purpose: this module is reached
 * from client components in the root layout, so it must not pull a schema library into the
 * shared bundle.
 */

const DEFAULT_SITE_URL = "https://moda.example.ir";

function parseSiteUrl(value: string | undefined): string {
  if (!value) return DEFAULT_SITE_URL;
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error(
      `Invalid NEXT_PUBLIC_SITE_URL: "${value}" is not an absolute URL.`,
    );
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error(
      `Invalid NEXT_PUBLIC_SITE_URL: "${value}" must use http(s).`,
    );
  }
  return url.origin + url.pathname.replace(/\/+$/, "");
}

export const publicEnv = {
  /** Canonical origin for metadata, sitemap, robots and JSON-LD (no trailing slash). */
  NEXT_PUBLIC_SITE_URL: parseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
} as const;
