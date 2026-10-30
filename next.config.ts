import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d2919ce8l80osk.cloudfront.net",
      },
      {
        protocol: "http",
        hostname: "arium-strapi-alb-dev-1719989505.ap-south-1.elb.amazonaws.com",
      },
    ],
  },
  experimental: {
    agentFeedback: true,
  },
  // cacheComponents: true,
  // partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
