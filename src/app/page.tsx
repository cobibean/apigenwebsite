import type { Metadata } from "next";
import Hero from "@/sections/Hero";
import MissionSection_1 from "@/sections/MissionSection_1";
import AboutStory from "@/sections/AboutStory";
import Brands2 from "@/sections/Brands2";
import { brands as defaultBrands } from "@/data/brands";
import CTA from "@/sections/CTA";

export const metadata: Metadata = {
  title: "Apigen | Premium dried cannabis exporter",
  description: "Premium dried cannabis, exported consistently. Ethical, compliant, patient-first.",
};

export default function Home() {
  return (
    <>
      <Hero
        eyebrow="Apigen"
        subtitle="PREMIUM QUALITY DRIED CANNABIS EXPORTER"
        title="Premium dried cannabis, exported consistently."
        copy="Ethical, compliant, patient-first."
        ctaLabel="Get in touch"
        ctaHref="/contact"
      />
      <MissionSection_1 />
      <AboutStory />
      <Brands2 brands={defaultBrands} />
      <CTA />
    </>
  );
}
