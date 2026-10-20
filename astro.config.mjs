import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://shakerz.lk',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    react(),
    sitemap({ filter: (page) => !page.endsWith('/404/') }),
  ],
  vite: { plugins: [tailwindcss()] },
});
