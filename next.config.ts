import type { NextConfig } from "next";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
let strapiPattern: { protocol?: "http" | "https"; hostname: string; port?: string } | null = null;

if (strapiUrl) {
  try {
    const parsed = new URL(strapiUrl);
    strapiPattern = {
      protocol: parsed.protocol.replace(":", "") as "http" | "https",
      hostname: parsed.hostname,
      port: parsed.port || undefined,
    };
  } catch {
    // Malformed URL in environment
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d2919ce8l80osk.cloudfront.net",
      },
      ...(strapiPattern ? [strapiPattern] : []),
      {
        protocol: "http",
        hostname: "arium-strapi-alb-dev-1719989505.ap-south-1.elb.amazonaws.com",
      },
    ],
  },
  experimental: {
    agentFeedback: true,
  },
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
