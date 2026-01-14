import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/photos/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
  // Transpile Sanity packages for Next.js
  transpilePackages: ['sanity', '@sanity/ui', '@sanity/icons'],
  // 301 redirects for URL migration
  async redirects() {
    return [
      {
        source: '/programmes',
        destination: '/yoga',
        permanent: true,
      },
      {
        source: '/programmes/:path*',
        destination: '/yoga/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
