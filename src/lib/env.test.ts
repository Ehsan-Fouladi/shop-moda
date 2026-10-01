import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("publicEnv", () => {
  it("defaults the site URL and strips trailing slashes", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://shop.example.com/");
    expect((await import("@/lib/env")).publicEnv.NEXT_PUBLIC_SITE_URL).toBe(
      "https://shop.example.com",
    );
    vi.resetModules();
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    expect((await import("@/lib/env")).publicEnv.NEXT_PUBLIC_SITE_URL).toBe(
      "https://moda.example.ir",
    );
  });

  it("fails fast on an invalid URL", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "not a url");
    await expect(import("@/lib/env")).rejects.toThrow();
  });
});
