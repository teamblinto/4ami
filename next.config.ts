import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // Commented out to allow API routes to work
  output: 'standalone', // Enable standalone output for Docker
  images: {
    unoptimized: true,
  },
  // Handle font loading issues during build
  experimental: {
    optimizePackageImports: ['@next/font'],
  },
  /* config options here */
};

export default nextConfig;
