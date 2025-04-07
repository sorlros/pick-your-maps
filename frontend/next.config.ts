import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'robohash.org',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost:8080',
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
