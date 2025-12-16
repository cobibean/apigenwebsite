import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/**",
      },
    ],
  },
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    // Work around Next/Webpack ESM interop issues with @supabase/supabase-js wrapper.mjs.
    config.resolve.alias["@supabase/supabase-js"] = "@supabase/supabase-js/dist/module/index.js";
    return config;
  },
};

export default nextConfig;
