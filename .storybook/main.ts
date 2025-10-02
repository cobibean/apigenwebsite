import type { StorybookConfig } from "@storybook/react-vite";
import path from "node:path";

const config: StorybookConfig = {
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-a11y", "@storybook/addon-docs"],
  viteFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "../src"),
      "next/image": path.resolve(__dirname, "./next-image-stub.tsx"),
      "next/link": path.resolve(__dirname, "./next-link-stub.tsx"),
    };
    // Use automatic JSX runtime to avoid needing global React in SB
    config.esbuild = {
      ...(config as any).esbuild,
      jsx: "automatic",
      jsxImportSource: "react",
    } as any;
    return config;
  },
};

export default config;


