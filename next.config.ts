import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'https://expense-tracker-backend-nn7qef4jd-anshvarshney20-8532s-projects.vercel.app/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;
