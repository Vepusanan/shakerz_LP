# Setup verification — 20 October 2026

## Executed successfully

- Node 22.23.1 and pnpm 12.8.1 environment inspection; existing Git repository preserved.
- Official minimal Astro scaffold and dependency installation.
- `pnpm install --frozen-lockfile`: successful reproducible install.
- `pnpm check`: 12 files, zero errors, warnings or hints.
- `pnpm lint`: successful.
- `pnpm format:check`: successful.
- `pnpm build`: static output; index.html, 404.html, robots.txt, sitemap-index.xml and sitemap-0.xml generated.
- `pnpm peers check`: no peer dependency issues.
- `pnpm dev --background` and status: running at http://localhost:4321.
- `pnpm preview --host 127.0.0.1 --port 4322`: successfully served production output.
- HTTP checks: homepage, robots.txt and both production sitemap files returned 200; unknown production route returned 404.
- Static HTML assertions: production canonical, description, Open Graph and Twitter metadata, one h1, one visible-hydrated React island, parseable local-business JSON-LD.
- Output inspection: 404 excluded from sitemap; Cloudflare headers copied correctly; no Worker/server runtime output.
- Safari visual inspection: homepage, Tailwind styles, Lucide icon, React control and initial count rendered.

## Limits and follow-up

- Browser click automation failed with the computer-control tool error `noWindowsAvailable`; the React click result and animation playback were not conclusively verified. Browser console, mobile viewport, reduced-motion switching and JavaScript-disabled behavior were not runtime-tested. Source code includes the required fallbacks and cleanup.
- GSAP and ScrollTrigger successfully resolve and bundle. Production behavior still needs browser interaction verification.
- The sitemap is generated during build, so its absence on the development server is expected; production preview passed.
- Image wrapper is type-checked, but no actual image transform was exercised because no brand imagery was supplied. No brand font, favicon or social preview image was fabricated. Browsers may request missing favicon/apple-touch assets until approved icons are added.
- Core Web Vitals and throttled-network results were not measured. The documented targets are not guarantees.
- Cloudflare configuration is prepared but not deployed or remotely tested. Verify cache headers on Pages after deployment approval.
- TypeScript 6.0.3 is selected for Astro checker and TypeScript ESLint compatibility. ESLint 10 is used with the current Astro plugin; incompatible optional jsx-a11y was omitted rather than retaining deprecated ESLint 9. Accessibility still requires browser/manual review.

## Exact installed direct dependencies

| Package                   | Version | Group           |
| ------------------------- | ------- | --------------- |
| @astrojs/react            | 7.1.0   | dependencies    |
| @astrojs/sitemap          | 3.7.4   | dependencies    |
| astro                     | 7.4.0   | dependencies    |
| gsap                      | 3.15.0  | dependencies    |
| lucide-react              | 1.59.0  | dependencies    |
| react                     | 19.3.1  | dependencies    |
| react-dom                 | 19.3.1  | dependencies    |
| @astrojs/check            | 0.9.10  | devDependencies |
| @eslint/js                | 10.0.1  | devDependencies |
| @tailwindcss/vite         | 4.3.3   | devDependencies |
| @types/react              | 19.3.0  | devDependencies |
| @types/react-dom          | 19.3.0  | devDependencies |
| eslint                    | 10.13.0 | devDependencies |
| eslint-config-prettier    | 10.1.8  | devDependencies |
| eslint-plugin-astro       | 3.2.1   | devDependencies |
| eslint-plugin-react-hooks | 7.1.1   | devDependencies |
| globals                   | 17.13.0 | devDependencies |
| prettier                  | 3.9.10  | devDependencies |
| prettier-plugin-astro     | 1.1.1   | devDependencies |
| tailwindcss               | 4.3.3   | devDependencies |
| typescript                | 6.0.3   | devDependencies |
| typescript-eslint         | 8.71.2  | devDependencies |
