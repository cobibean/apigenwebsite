import React from "react";

export type Provider = "local" | "builder" | "storyblok" | "plasmic";
export type RichTextNode = unknown;

/**
 * Only this function should render rich text.
 * Providers get wired here by the adapter (not in sections).
 */
export function renderRichText(provider: Provider, data: RichTextNode) {
  switch (provider) {
    case "storyblok":
      // Example: return <StoryblokRichText content={data as any} />;
      return null; // wired when Storyblok adapter is enabled
    case "builder":
      // Map Builder blocks to elements here
      return null; // wired when Builder adapter is enabled
    case "plasmic":
      // Provide mapping or wrapper here
      return null; // wired when Plasmic adapter is enabled
    default:
      // Safe fallback for Local JSON (e.g., array of paragraphs)
      if (Array.isArray(data)) {
        return (data as unknown as Array<unknown>).map((p, i) => <p key={i}>{String(p)}</p>);
      }
      return null;
  }
}
