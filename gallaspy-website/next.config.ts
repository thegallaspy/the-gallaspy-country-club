import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: { "/api/mobile/members-locker": ["./private-assets/falcon-society/collection/*.png"] },
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