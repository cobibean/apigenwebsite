import React from "react";
import type { Block } from "./content-source";
import JourneyRow from "@/sections/JourneyRow";
import Hero from "@/sections/Hero";
import LogoCloud from "@/sections/LogoCloud";
import FeatureGrid from "@/sections/FeatureGrid";
import Stats from "@/sections/Stats";
import BrandGrid from "@/sections/BrandGrid";
import CTA from "@/sections/CTA";
import NewsList from "@/sections/NewsList";
import DocList from "@/sections/DocList";
import Disclaimer from "@/sections/Disclaimer";
import Footer from "@/sections/Footer";
import MissionSection_1 from "@/sections/MissionSection_1";

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

// Journey section
registerBlock("Journey", (props) => <JourneyRow {...(props as Record<string, unknown>)} />);
registerBlock("Hero", (props) => <Hero {...(props as Record<string, unknown>)} />);
registerBlock("LogoCloud", (props) => <LogoCloud {...(props as Record<string, unknown>)} />);
registerBlock("FeatureGrid", (props) => <FeatureGrid {...(props as Record<string, unknown>)} />);
registerBlock("Stats", (props) => <Stats {...(props as Record<string, unknown>)} />);
registerBlock("BrandGrid", (props) => <BrandGrid {...(props as Record<string, unknown>)} />);
registerBlock("CTA", (props) => <CTA {...(props as Record<string, unknown>)} />);
registerBlock("NewsList", (props) => <NewsList {...(props as Record<string, unknown>)} />);
registerBlock("DocList", (props) => <DocList {...(props as Record<string, unknown>)} />);
registerBlock("Disclaimer", (props) => <Disclaimer {...(props as Record<string, unknown>)} />);
registerBlock("Footer", (props) => <Footer {...(props as Record<string, unknown>)} />);
registerBlock("MissionSection_1", (props) => <MissionSection_1 {...(props as Record<string, unknown>)} />);


