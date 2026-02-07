import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  // Turbopack is now the default bundler in Next.js 16
  experimental: {
    // Cache Components for PPR (can be enabled later)
    // cacheComponents: true,
  },
};

export default nextConfig;
