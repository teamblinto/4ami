import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // Commented out to allow API routes to work
  images: {
    unoptimized: true,
  },
  /* config options here */
};

export default nextConfig;
