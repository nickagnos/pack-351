import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { ROUTES } from './src/routes.js';

// Vite copies public/ verbatim, which would publish our internal notes alongside the site
// (photos/PHOTOS.md, ranks/README.md, hero/README.md). Those docs are written for whoever
// maintains this repo - asset provenance, Brand Center web_ids, licensing rules and
// replacement gotchas - not something to serve to families. They stay in public/ because
// that's where they're useful (next to the folder you drop photos into); this just keeps
// them out of the build.
function stripDocsFromBuild() {
  let outDir;
  return {
    name: 'strip-docs-from-build',
    apply: 'build',
    // Read off the resolved config rather than hardcoding 'dist': `npm run build` runs vite
    // twice, and the second pass writes the SSR bundle to dist-ssr. A hardcoded path would
    // have that pass walk the finished client build a second time.
    configResolved(config) { outDir = path.resolve(config.root, config.build.outDir); },
    closeBundle() {
      const walk = (dir) => {
        if (!fs.existsSync(dir)) return;
        for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
          const p = path.join(dir, e.name);
          if (e.isDirectory()) walk(p);
          else if (e.name.toLowerCase().endsWith('.md')) fs.rmSync(p);
        }
      };
      walk(outDir);
    },
  };
}

// The dev server has no equivalent of prerender.js, so /about is just a URL with no file
// behind it and Vite would 404 it. This serves the single dev index.html for every known
// route, which is exactly what GitHub Pages does with the prerendered about.html - and only
// the server-side url is rewritten, so the browser still sees /about and main.jsx derives
// the right page from it. Without this, dev and production would disagree about whether the
// site's own URLs resolve.
function devCleanUrls() {
  const slugs = new Set(ROUTES.map(r => r.slug));
  return {
    name: 'dev-clean-urls',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const [pathname] = (req.url || '/').split('?');
        if (slugs.has(pathname.replace(/^\/+/, '').replace(/\/+$/, ''))) req.url = '/index.html';
        next();
      });
    },
  };
}

// No `base` here on purpose: the site is served from the root of its own domain
// (https://pack351tx.org/), so Vite's default base of '/' is correct, and dev,
// preview, and production all agree. Runtime asset URLs still go through
// src/asset.js (import.meta.env.BASE_URL) rather than hardcoding '/', so a future
// move back under a subpath is a one-line change here and nowhere else.
export default defineConfig({
  plugins: [react(), devCleanUrls(), stripDocsFromBuild()],
});
