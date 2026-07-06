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
};

export default nextConfig;
