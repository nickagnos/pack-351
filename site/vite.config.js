import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

// Vite copies public/ verbatim, which would publish our internal notes alongside the site
// (PHOTOS-NEEDED.md, ranks/README.md, scroll-world/README.md). Those docs are written for
// whoever maintains this repo, and PHOTOS-NEEDED.md in particular spells out that every
// image is AI-generated placeholder art - not something to serve to families. They stay in
// public/ because that's where they're useful (next to the folder you drop photos into);
// this just keeps them out of the build.
function stripDocsFromBuild() {
  return {
    name: 'strip-docs-from-build',
    apply: 'build',
    closeBundle() {
      const dist = path.resolve(__dirname, 'dist');
      const walk = (dir) => {
        if (!fs.existsSync(dir)) return;
        for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
          const p = path.join(dir, e.name);
          if (e.isDirectory()) walk(p);
          else if (e.name.toLowerCase().endsWith('.md')) fs.rmSync(p);
        }
      };
      walk(dist);
    },
  };
}

// No `base` here on purpose: the site is served from the root of its own domain
// (https://pack351tx.org/), so Vite's default base of '/' is correct, and dev,
// preview, and production all agree. Runtime asset URLs still go through
// src/asset.js (import.meta.env.BASE_URL) rather than hardcoding '/', so a future
// move back under a subpath is a one-line change here and nowhere else.
export default defineConfig({
  plugins: [react(), stripDocsFromBuild()],
});
