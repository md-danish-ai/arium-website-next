<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# 🚨 Project Strict Development Rules & Architecture Guidelines

All AI agents and developers working in this repository MUST strictly follow these rules without exception.

---

## 1. The 4-Layer Canonical Contract & Pure 1-to-1 Mappers

The codebase strictly enforces an identical **1-to-1 Canonical Key Contract** across 4 layers:

1. **Live Strapi CMS API** (raw payload)
2. **Fallback Data Layer** (`data/*.data.ts`)
3. **Mapper Layer** (`services/mappers/*.mapper.ts`)
4. **UI Component Props** (`types/content.types.ts` & component signatures)

### Strict Mapper Rule: Strictly 2 Sources Only

Inside mapper functions, there are strictly two sources: dynamic CMS data and static fallback data.

- **Mandatory Pattern:**
  ```typescript
  const title = (raw?.title as string) || fallback.title;
  const description = (raw?.description as string) || fallback.description;
  ```
- **STRICTLY FORBIDDEN:**
  ```typescript
  // ❌ FORBIDDEN: Legacy alias chaining / key jungle
  const title = raw?.title || raw?.heading || raw?.Heading || fallback.title;
  ```
- **No Backward-Compatibility Aliases:** All legacy keys (`heading`, `ctaText`, `buttonText`, `cards`, `pointers`, `stats`, `personName`) have been eliminated. Only use the canonical key.

---

## 2. Component Purity & Prop Standards

1. **100% Pure Presentational UI:**
   - Components in `components/ui-common/*` and `components/ui-component/*` are purely presentational.
   - **Zero API calls**, **zero raw Strapi object traversing**, and **zero hardcoded fallback data arrays** inside component files.
2. **NO Static Copy in Prop Parameter Defaults:**
   - Components must NOT define hardcoded fallback copy or image paths in prop defaults:
     ```tsx
     // ❌ FORBIDDEN
     export default function HomeHero({
       title = "Build with clarity across right-of-ways...", // NEVER DO THIS
       description = "Comprehensive telecom infrastructure...", // NEVER DO THIS
     }: HomeHeroProps);
     ```
   - Fallbacks are centralized in `data/*.data.ts` and already resolved by the mapper.
   - Components must directly destructure clean props:
     ```tsx
     // ✅ CORRECT
     export default function HomeHero({
       title,
       description,
       font_color,
       background_color,
       scroll_text,
     }: HomeHeroProps);
     ```
3. **No Redundant Display Variables:**
   - Do NOT create redundant intermediate variables like `const displayTitle = title || "..."` inside components.

---

## 3. Zero Redundancy & Component Reuse

1. **Always Reuse Existing Common Sections:**
   - **Testimonials:** Always reuse `SharedTestimonials` (`@ui-common/SharedTestimonials`). Domain-specific duplicate testimonials (`CareersTestimonials`, `CommunityTestimonials`, `RightOfWayTestimonials`, `PrivateVenuesTestimonials`) are deprecated.
   - **CTA Sections:** Always reuse `SubPageCTA` or `CtaWithGraphic` (`@ui-common`).
   - **Process / Steps:** Always reuse `ProcessSection` (`@ui-common/ProcessSection`).
   - **Hero Sections:** Always reuse `HeroBanner` or `SubPageHero` (`@ui-common`).
2. **Widget Renderer Deduplication:**
   - Do NOT create domain-specific widget renderers when a common renderer already exists in `components/ui-widget/renderers/common/` (e.g. `SubPageCTARenderer`, `ProcessRenderer`, `GlobalTestimonialsRenderer`).
   - Centralize all widget registrations in `components/ui-widget/registry.ts`.

---

## 4. UI, Responsive Layouts & Graphic Fitting

1. **Standard Container:**
   - Always wrap section content in `<Container>` from `@ui-layout/SectionContainer` for standardized responsive max-width and padding.
2. **Side Graphic Responsiveness:**
   - Side illustrations (wireframe torus, connection globe, etc.) must remain **right-aligned across all viewports** (desktop, tablet, and mobile).
   - **Mobile jump hacks are strictly forbidden:** Do not jump graphics to bottom-center or add artificial huge bottom padding (e.g. `max-md:pb-[270px]`, `bottom-[-110px]`).
   - On smaller screens (tablet/mobile), reduce graphic opacity (e.g. `opacity-20 sm:opacity-25 md:opacity-40 lg:opacity-65`) to preserve text legibility.
3. **SVG Rotated Bounding Box Fitting:**
   - When rotating elements inside a container with `overflow-hidden`:
     - Calculate the rotated bounding box height: $H_{visual} = H_{elem} \times (\cos\theta + AR \times \sin\theta)$.
     - Never set an inner element to `h-full` and rotate it, or its top and bottom curves will be sliced flat by `overflow-hidden`.
     - Scale the inner element (e.g. `h-[68%]-h-[70%]` for $AR \approx 1.33$ at $\sim 28^\circ\text{–}30^\circ$) so the rotated curve tangents touch the top and bottom edges without being cut off.

---

## 5. TypeScript, Aliases & Quality Standards

1. **Path Aliases Only:**
   - Strictly use configured TypeScript path aliases:
     - `@ui-common`, `@ui-element`, `@ui-widget`, `@ui-layout`, `@ui-svg`
     - `@services/mappers`, `@data`, `@lib`, `@utils`, `@types`
   - Never use long relative traversal paths (`../../../`).
2. **Zero Type Errors & No `any`:**
   - Codebase must compile with 0 errors via `npx tsc --noEmit`.
   - Never use `any`. Always define or use strong types in `types/`.
3. **Mandatory Post-Edit Verification:**
   - Always run Prettier formatting: `npm run format` (or `nr format`).
   - Always verify type safety: `npx tsc --noEmit`.
