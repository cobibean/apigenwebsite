import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  css: { postcss: null },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    globals: true,
    include: ["tests/**/*.test.{ts,tsx}"],
    css: false,
  },
});


