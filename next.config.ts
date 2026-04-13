import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'privana-website-images.s3.amazonaws.com'
      }
    ]
  }
};

export default nextConfig;
