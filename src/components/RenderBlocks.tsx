"use client";
import React from "react";
import { LazyMotion, m, domAnimation, useReducedMotion } from "framer-motion";
import type { Block } from "@/lib/content-source";
import { getBlock } from "@/lib/registry";

type Props = {
  blocks: Block[];
};

export default function RenderBlocks({ blocks }: Props) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <LazyMotion features={domAnimation} strict>
      {blocks?.map((block, index) => {
        const Component = getBlock(block.type);
        const variant = (block as any).variant as string | undefined;
        if (!Component) {
          return (
            <m.section
              key={index}
              data-block={block.type}
              data-variant={variant || ""}
              aria-live="polite"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                padding: 16,
                border: "1px dashed var(--border)",
                background: "color-mix(in oklab, var(--bg) 92%, var(--fg))",
              }}
            >
              <strong>Unknown block type:</strong> {block.type}
            </m.section>
          );
        }
        const element = Component({ ...(block.props || {}), children: block.children });
        return (
          <m.div
            key={index}
            data-block={block.type}
            data-variant={variant || ""}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {element}
            {Array.isArray(block.children) && block.children.length > 0 && (
              <RenderBlocks blocks={block.children} />
            )}
          </m.div>
        );
      })}
    </LazyMotion>
  );
}


