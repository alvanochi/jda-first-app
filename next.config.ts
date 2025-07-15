import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.lospec.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
