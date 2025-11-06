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
  // Rewrite /reset-password to /forgot-password/reset to handle email links
  async rewrites() {
    return [
      {
        source: '/reset-password',
        destination: '/forgot-password/reset',
      },
    ];
  },
  /* config options here */
};

export default nextConfig;
