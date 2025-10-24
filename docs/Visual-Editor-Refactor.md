# Refactoring to a Visual Editor (Builder/Storyblok)

## Overview
This site renders pages via a block registry and a `ContentSource` adapter. To switch from Local JSON to a visual editor, implement a provider adapter and wire it in `layout.tsx`.

## Steps
1. Choose provider
   - Builder or Storyblok. Create `src/providers/builder.ts` or `src/providers/storyblok.ts` implementing `ContentSource`.

2. Implement adapter (ContentSource)
   - `getPage(slug: string[], opts?: { preview?: boolean }): Promise<PageData | null>`
     - Map provider page/entry → `{ title, seo, blocks }`
   - `getMenu(): Promise<Array<{ label: string; href: string }>>`
     - Map provider navigation → `{ label, href }[]`

3. Map blocks
   - Normalize provider components to local `Block` shape `{ type, props, children? }`.
   - Ensure `type` matches keys registered in `src/lib/registry.tsx` (e.g., `Hero`, `FeatureGrid`, etc.).

4. Rich text
   - Add provider case in `src/lib/rich-text.tsx` and render rich text safely.

5. Wire the provider
   - In `src/app/layout.tsx`, replace `localContentSource` import with your provider export.
   - Respect `opts?.preview` to serve drafts (see `/api/preview`).

6. SEO mapping
   - Map provider SEO fields to `PageData.seo` consumed by `src/lib/seo.ts`.

7. Optional: Storybook
   - Reinstall Storybook deps, re-add selective `.stories.tsx` for key blocks.

## Testing checklist
- `npm run build` passes
- Home/About render solely from provider blocks
- Images include alt + dimensions; links use `AppLink`
- Preview route serves draft content when enabled
