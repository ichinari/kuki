import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // /api/* へのリクエストを Hono サーバーへ転送
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8787/api/:path*",
      },
    ];
  },
};

export default nextConfig;
