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
  // Configuração para evitar erros durante o build quando variáveis de ambiente não estão disponíveis
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? '',
  },
};

export default nextConfig;
