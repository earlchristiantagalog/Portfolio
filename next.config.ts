import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingExcludes: {
    "/*": [".env*", ".clerk/**/*", ".idea/**/*", "database/**/*"],
  },
};

export default nextConfig;
