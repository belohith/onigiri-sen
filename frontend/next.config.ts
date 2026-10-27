import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // onigirisen.com is the primary domain. Send every onigirisen.jp request
  // (with or without www) to the same path on www.onigirisen.com with a 301.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "(?:www\\.)?onigirisen\\.jp" }],
        destination: "https://www.onigirisen.com/:path*",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
