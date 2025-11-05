## Architecture Overview

The project is driven by the Next.js App Router and a content-sourcing abstraction that feeds modular page sections. The flowchart below highlights how requests move through the system and where key pieces live in the repository.

```mermaid
flowchart TD
    Visitor["Visitor request"] --> AppRouter["Next.js App Router\nsrc/app"]
    AppRouter --> Layout["RootLayout\nsrc/app/layout.tsx"]
    Layout --> Header["Header & navigation components\nsrc/components/navigation/*"]
    Layout --> FetchMenu["Fetch menu via content source\nsrc/providers/local.ts"]
    FetchMenu --> MenuJSON["Menu data\nsrc/content/menu.json"]
    Layout --> Footer["Footer section\nsrc/sections/Footer.tsx"]
    AppRouter --> Page["Route handlers & pages\nsrc/app/[...slug]/page.tsx"]
    Page --> DraftMode["Draft mode toggle\nnext/headers"]
    Page --> ContentSource["Content source interface\nsrc/lib/content-source.ts"]
    ContentSource --> LocalProvider["Local JSON provider\nsrc/providers/local.ts"]
    LocalProvider --> PagesJSON["Page blocks & SEO data\nsrc/content/pages.json"]
    ContentSource -. "planned" .-> Storyblok["Storyblok provider\nsrc/providers/storyblok.ts"]
    ContentSource -. "planned" .-> Builder["Builder.io provider\nsrc/providers/builder.ts"]
    Page --> RenderBlocks["RenderBlocks iterator\nsrc/components/RenderBlocks.tsx"]
    RenderBlocks --> Registry["Block registry\nsrc/lib/registry.tsx"]
    Registry --> Sections["Section components\nsrc/sections/*"]
    Sections --> UI["Shared UI components\nsrc/components/*"]
    Sections --> Styles["Tailwind CSS & module styles\nsrc/styles\nsrc/app/globals.css"]
    Page --> SEO["SEO helpers\nsrc/lib/seo.ts\nsrc/lib/seoDefaults.ts"]
```

**Notes**
- Draft mode keeps the same rendering pipeline but flags providers to return preview content when available.
- Additional providers (Storyblok, Builder) are scaffolded for future integration through the shared `ContentSource` contract.
- Section components remain presentation-focused and can be composed in Storybook for isolated iteration.
