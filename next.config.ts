import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i0.wp.com' },
      { protocol: 'https', hostname: 'www.historiadealagoas.com.br' },
      { protocol: 'https', hostname: 'banner.historiadealagoas.com.br' },
      { protocol: 'https', hostname: 'secure.gravatar.com' },
    ],
  },
  reactStrictMode: true,

};

export default nextConfig;
