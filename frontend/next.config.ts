import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'robohash.org',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
