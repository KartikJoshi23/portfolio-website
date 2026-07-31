/* ==========================================================
 * NEXT.CONFIG.TS — Blueprint Section 3.4.3
 * Image optimization configuration
 * ========================================================== */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Blueprint Section 3.4.3 — Image optimization formats
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Force revalidation on resume PDF so CDN never serves a stale copy
  async headers() {
    return [
      {
        source: "/Kartik_Resume.pdf",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
