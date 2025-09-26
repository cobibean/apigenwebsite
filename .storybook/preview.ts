import type { Preview } from "@storybook/react";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    a11y: { disable: false },
    layout: "fullscreen",
  },
};

export default preview;


