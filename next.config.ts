import type { NextConfig } from "next";

const remotePatterns: NonNullable<NonNullable<NextConfig["images"]>["remotePatterns"]> = [];

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
if (strapiUrl) {
  try {
    const parsed = new URL(strapiUrl);
    remotePatterns.push({
      protocol: parsed.protocol.replace(":", "") as "http" | "https",
      hostname: parsed.hostname,
      port: parsed.port || undefined,
    });
  } catch {
    // Malformed URL in environment
  }
}

const cdnDomain = process.env.NEXT_PUBLIC_CDN_DOMAIN;
if (cdnDomain) {
  const cleanDomain = cdnDomain.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  remotePatterns.push({
    protocol: "https",
    hostname: cleanDomain,
  });
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
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
