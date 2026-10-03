import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development" ? true : false;

export default {
  /* config options here */
  compiler: {
    removeConsole: !isDevelopment,
  },
  experimental: {
    turbopackRustReactCompiler: true,
    optimizePackageImports: ["lucide-react", "lenis"],
  },
  images: {
    formats: ["image/webp"],
    unoptimized: !isDevelopment,
  },
  productionBrowserSourceMaps: isDevelopment,
  reactStrictMode: isDevelopment,
  poweredByHeader: isDevelopment,
  reactCompiler: true,
  // basePath: isDevelopment ? "" : "/shop-moda",
  // output: "export",
  // cacheComponents: true,
} as NextConfig;
