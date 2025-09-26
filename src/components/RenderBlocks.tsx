"use client";
import React from "react";
import type { Block } from "@/lib/content-source";
import { getBlock } from "@/lib/registry";
import Appear from "@/components/motion/Appear";

type Props = {
  blocks: Block[];
  preview?: boolean;
};

export default function RenderBlocks({ blocks, preview }: Props) {
  return (
    <>
      {blocks?.map((block, index) => {
        const Component = getBlock(block.type);
        const variant = (block as { variant?: string }).variant;
        if (!Component) {
          if (process.env.NODE_ENV !== "production") {
            // eslint-disable-next-line no-console
            console.warn(`[RenderBlocks] Unknown block type: ${block.type}`);
          }
          return (
            <section
              key={index}
              data-block={block.type}
              data-variant={variant || ""}
              aria-live="polite"
              style={{
                padding: 16,
                border: "1px dashed var(--border)",
                background: "color-mix(in oklab, var(--bg) 92%, var(--fg))",
              }}
            >
              <strong>Unknown block type:</strong> {block.type}
            </section>
          );
        }

        // Never wrap legal/footer/header in motion here; sections handle any motion internally.
        const noWrapper = block.type === "Footer" || block.type === "Disclaimer" || block.type === "Header";
        const element = Component({ ...(block.props || {}), children: block.children, preview });

        if (noWrapper) {
          return (
            <div key={index} data-block={block.type} data-variant={variant || ""}>
              {element}
              {Array.isArray(block.children) && block.children.length > 0 && (
                <RenderBlocks blocks={block.children} preview={preview} />
              )}
            </div>
          );
        }

        return (
          <Appear key={index} preview={preview}>
            <div data-block={block.type} data-variant={variant || ""}>
              {element}
              {Array.isArray(block.children) && block.children.length > 0 && (
                <RenderBlocks blocks={block.children} preview={preview} />
              )}
            </div>
          </Appear>
        );
      })}
    </>
  );
}


