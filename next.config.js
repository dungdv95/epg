/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_API_ROOT:
      process.env.NEXT_PUBLIC_API_ROOT ?? "NEXT_PUBLIC_API_ROOT",
    NEXT_PUBLIC_CONNECT_INTERNAL_ROOT_URL:
      process.env.NEXT_PUBLIC_CONNECT_INTERNAL_ROOT_URL,
    NEXT_PUBLIC_CONNECT_INTERNAL_CLIENT_ID:
      process.env.NEXT_PUBLIC_CONNECT_INTERNAL_CLIENT_ID,
    NEXT_PUBLIC_CLIENT_SECRET: process.env.NEXT_PUBLIC_CLIENT_SECRET,
  },
};

module.exports = nextConfig;
