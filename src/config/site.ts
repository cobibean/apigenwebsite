export const SITE_NAME = "Apigen";
// Update to your canonical production origin (no trailing slash)
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export function isProductionEnv() {
  const vercelEnv = process.env.VERCEL_ENV;
  return vercelEnv === "production" || process.env.NODE_ENV === "production";
}


