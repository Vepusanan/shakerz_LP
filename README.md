# Shakerz website foundation

Static Astro website for https://shakerz.lk. The homepage is a technical verification page, not an approved brand design. No backend, analytics, external fonts, or deployment credentials are required.

## Start

Use Node **22.23.1** (`.node-version`) and pnpm **12.8.1** (pinned in `package.json`).

```sh
pnpm install --frozen-lockfile
pnpm dev --background
pnpm astro dev status
pnpm astro dev logs
pnpm astro dev stop
```

Open the URL reported by Astro (normally http://localhost:4321). `pnpm dev` also supports normal foreground use.

```sh
pnpm check          # Astro + strict TypeScript
pnpm lint           # Astro, TS and React hooks
pnpm format:check
pnpm format         # apply formatting
pnpm build
pnpm preview        # serve dist locally
pnpm validate       # checks, lint, format check and build
```

## Architecture

```text
src/
  assets/{images,fonts}/       Imported, optimized assets; approved fonts later
  components/
    common/                   SEO.astro, ResponsiveImage.astro
    layout/                   Future static chrome
    sections/                 Future static page sections
    interactive/              InteractionCheck.tsx (only hydrated island)
    ui/                       Future small reusable primitives
  content/                    Future content collections, when needed
  data/                       Verified brand/menu data
  layouts/BaseLayout.astro
  lib/
    animations/reveal.ts      Browser-only GSAP + ScrollTrigger lifecycle
    seo/config.ts             Defaults, local-business JSON-LD, safe serialization
    utils/
  pages/                      index.astro, 404.astro, robots.txt.ts
  styles/global.css
  types/
public/
  favicon/                    Approved favicon assets later
  media/                      Assets that do not need transformation
  _headers                    Cloudflare Pages response headers
```

Astro produces HTML at build time. Tailwind 4 generates CSS through its official Vite plugin; no legacy `@astrojs/tailwind` integration is used. React is reserved for stateful interaction, currently one `client:visible` island. Prefer `client:idle` for nonurgent widgets and `client:load` only when immediate interaction is essential. Never hydrate a page-sized React shell. Lucide uses named imports within the existing island.

GSAP and ScrollTrigger are dynamically imported after hydration. `reveal(element, onScroll)` returns a cleanup function immediately, handles cancellation while imports are pending, and reverts owned animations/triggers on unmount. Use it from a React effect and return its cleanup. `gsap.matchMedia` also responds when the reduced-motion preference changes. Animations only translate the optional control; essential content is never hidden. JavaScript-disabled visitors retain all static content and an explanation of the disabled demo.

## Images, fonts and responsive styles

Import raster images from `src/assets/images` and render `ResponsiveImage` with descriptive `alt` and a layout-accurate `sizes` value. It uses Astro Assets `Picture`, AVIF/WebP sources, JPEG fallback, explicit dimensions and lazy loading by default. Set `priority` only on the main above-the-fold hero image to enable eager loading and high fetch priority. For transparent art, use Astro `Picture` directly with PNG fallback. Do not place optimizable product photography in `public`.

No photography or brand font was invented for this setup. The wrapper is type-checked; actual image output must be verified when source images arrive. Use licensed, subsetted local WOFF2 files with `font-display: swap`, sensible fallback metrics, and preload only a critical face. Current system fonts require no network request. Neutral colors are provisional. Tailwind's mobile-first breakpoints, flexible container, fluid heading size and shared spacing establish the layout foundation.

Targets: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1. These require measurement against real content, representative phones and slower networks; setup checks do not establish field performance. Avoid autoplay media and third-party scripts. Keep small hover effects in CSS and honor reduced motion for future effects.

## SEO

`BaseLayout` accepts title, description, optional social image/alt, noindex and structured data. Canonicals derive from the configured production origin and pathname, excluding query strings. Titles, descriptions, Open Graph and Twitter cards are rendered in static HTML. Sitemap and robots.txt use the same origin. The 404 route is noindex and excluded from the sitemap; its static output also prevents Cloudflare's implicit SPA fallback.

The local-business schema uses only the supplied name, category, Jaffna and Sri Lanka. Add verified address, contact details, opening hours and approved social imagery before launch. Incomplete business data does not qualify this foundation for every rich result. No invented business information is included. Keep preview deployments out of search using Cloudflare preview controls; review indexing before publishing the placeholder.

## Cloudflare Pages (not deployed)

After explicit deployment approval:

1. Connect the Git repository to **Cloudflare Pages**, using the Astro framework preset.
2. Set root directory to the repository root, build command to `pnpm build`, output directory to `dist`.
3. Use the v3 build system and set `NODE_VERSION=22.23.1`, `PNPM_VERSION=12.8.1`; install from the committed pnpm lockfile. No runtime variables are required. For a custom CI pipeline, run `pnpm install --frozen-lockfile` before `pnpm validate`.
4. Review a preview deployment, then attach `shakerz.lk` through Pages custom domains and verify HTTPS and redirects.
5. Confirm headers, canonical metadata, sitemap and actual 404 responses in the deployed environment.

Static output needs no Cloudflare adapter or Worker. `public/_headers` gives only fingerprinted `/_astro/*` assets a one-year immutable browser cache. HTML and unversioned media retain Pages' default revalidation behavior. Do not add blanket immutable caching. `pnpm preview` is a local static preview and does not emulate Cloudflare headers.

## Configuration and sources

Configuration lives in `astro.config.mjs`, `tsconfig.json`, `eslint.config.js`, `.prettierrc.json`, `.prettierignore`, `.node-version`, `.env.example`, `.gitignore` and `package.json`; `pnpm-lock.yaml` records exact resolutions. Preserve the existing Git repository. No commits or deployments are made by setup.

Official references: [Astro styling](https://docs.astro.build/en/guides/styling/), [Astro React](https://docs.astro.build/en/guides/integrations-guide/react/), [Astro images](https://docs.astro.build/en/guides/images/), [GSAP matchMedia](<https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/>), [Cloudflare Pages Astro](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/), [Pages headers](https://developers.cloudflare.com/pages/configuration/headers/).
