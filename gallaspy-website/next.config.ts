import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/mercury-match",
        destination: "/talaria-cup",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;