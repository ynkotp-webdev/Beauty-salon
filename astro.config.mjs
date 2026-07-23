// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Public production URL — used for canonical links, sitemap and Open Graph tags.
  site: 'https://ynkotp-webdev.github.io',
  // The site is served from a GitHub Pages project subpath, not the domain root.
  base: '/Beauty-salon',
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    // Inline small stylesheets to shave a request off the critical path.
    inlineStylesheets: 'auto',
  },
  // Smooth, native-feeling client-side navigation without hijacking the scroll.
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
});
