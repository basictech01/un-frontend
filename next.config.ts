import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      // Azure Blob Storage for uploaded images
      {
        protocol: 'https',
        hostname: 'uttrakhandnews.blob.core.windows.net',
      },
    ],
  },

};

export default nextConfig;
