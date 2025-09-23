import React from "react";
import type { Block } from "./content-source";

// Type for a block component: receives props and optional children blocks
export type BlockComponent = (props: Record<string, unknown> & { children?: Block[] }) => React.ReactNode;

// Registry mapping type -> component function
const registry = new Map<string, BlockComponent>();

export function registerBlock(type: string, component: BlockComponent) {
  registry.set(type, component);
}

export function getBlock(type: string): BlockComponent | undefined {
  return registry.get(type);
}

export function getRegistry() {
  return registry;
}

// Placeholder example block for safety in development
registerBlock("Dev.Placeholder", ({ children, ...props }) => {
  return (
    <section data-block="Dev.Placeholder" className="p-6 border" style={{ borderColor: "var(--border)" }}>
      <pre style={{ fontFamily: "var(--font-mono)" }}>{JSON.stringify(props, null, 2)}</pre>
      {Array.isArray(children) && children.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <em>Child blocks will render here.</em>
        </div>
      )}
    </section>
  );
});


